import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import { createServer } from 'http';
import { Server } from 'socket.io';

const googleClient = new OAuth2Client('1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'); // Replace with your Google Client ID

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});
const PORT = 3001;
const JWT_SECRET = 'your-secret-key';

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'LinkedOut Backend API' });
});

// Development endpoint to clear unverified accounts
app.delete('/api/dev/clear-unverified', (req, res) => {
  db.run('DELETE FROM users WHERE verified = 0', function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to clear unverified accounts' });
    }
    res.json({ message: `Cleared ${this.changes} unverified accounts` });
  });
});

// Initialize SQLite database
const db = new sqlite3.Database('./users.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    verified BOOLEAN DEFAULT 0,
    verification_token TEXT,
    reset_token TEXT,
    reset_expires DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  // Add missing columns to existing table
  db.run(`ALTER TABLE users ADD COLUMN verified BOOLEAN DEFAULT 0`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.log('Error adding verified column:', err.message);
    }
  });
  
  db.run(`ALTER TABLE users ADD COLUMN verification_token TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.log('Error adding verification_token column:', err.message);
    }
  });
  
  db.run(`ALTER TABLE users ADD COLUMN reset_token TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.log('Error adding reset_token column:', err.message);
    }
  });
  
  db.run(`ALTER TABLE users ADD COLUMN reset_expires DATETIME`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.log('Error adding reset_expires column:', err.message);
    }
  });
  
  db.run(`CREATE TABLE IF NOT EXISTS questionnaires (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    name TEXT,
    role TEXT,
    intent TEXT,
    updates TEXT,
    early_access BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT,
    name TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(user_id, email)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    content TEXT,
    sender TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients (id)
  )`);
});

// Mock email transporter (not real email !! change later>>>)
const transporter = {
  sendMail: async (options) => {
    console.log('Mock email sent:', options);
    return Promise.resolve();
  }
};

app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', 
    [email, hashedPassword, name], 
    function(err) {
      if (err) {
        console.log('DB Error:', err.message);
        return res.status(400).json({ error: err.message.includes('UNIQUE') ? 'Email exists' : 'Registration failed' });
      }
      
      const token = jwt.sign({ userId: this.lastID, email }, JWT_SECRET);
      res.json({ token, user: { id: this.lastID, email, name } });
    }
  );
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!user) {
      return res.status(400).json({ error: 'Account does not exist. Please sign up first.' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  });
});

// Email verification endpoint
app.get('/api/verify/:token', (req, res) => {
  const { token } = req.params;
  
  db.run('UPDATE users SET verified = 1, verification_token = NULL WHERE verification_token = ?', 
    [token], 
    function(err) {
      if (err || this.changes === 0) {
        return res.send('<h1>Invalid or expired verification link</h1>');
      }
      res.send('<h1>Email verified successfully! <a href="http://localhost:5173/login">Click here to log in</a></h1>');
    }
  );
});

// Forgot password endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Email not found' });
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour
    
    db.run('UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?', 
      [resetToken, resetExpires, email], 
      async function(err) {
        if (err) {
          return res.status(500).json({ error: 'Server error' });
        }
        
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        
        try {
          await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Reset your LinkedOut password',
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
          });
          
          res.json({ message: 'Password reset email sent' });
        } catch (emailErr) {
          res.status(500).json({ error: 'Failed to send email' });
        }
      }
    );
  });
});

// Reset password endpoint
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  db.get('SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?', 
    [token, new Date()], 
    async (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run('UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?', 
        [hashedPassword, user.id], 
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Server error' });
          }
          res.json({ message: 'Password reset successful' });
        }
      );
    }
  );
});

// Google login endpoint
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    
    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], function(err, user) {
      if (user) {
        // User exists, log them in
        const jwtToken = jwt.sign({ userId: user.id, email }, JWT_SECRET);
        res.json({ token: jwtToken, user: { id: user.id, email: user.email, name: user.name } });
      } else {
        // Create new user
        db.run('INSERT INTO users (email, name, verified, password) VALUES (?, ?, 1, ?)', 
          [email, name, 'google-oauth'], 
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create user' });
            }
            
            const jwtToken = jwt.sign({ userId: this.lastID, email }, JWT_SECRET);
            res.json({ token: jwtToken, user: { id: this.lastID, email, name } });
          }
        );
      }
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Google token' });
  }
});

// Check questionnaire status
app.get('/api/questionnaire-status', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    db.get('SELECT * FROM questionnaires WHERE user_id = ?', [decoded.userId], (err, questionnaire) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ completed: !!questionnaire });
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Questionnaire submission
app.post('/api/questionnaire', (req, res) => {
  const { name, role, intent, updates, earlyAccess } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const intentStr = Array.isArray(intent) ? intent.join(',') : intent;
    const updatesStr = Array.isArray(updates) ? updates.join(',') : updates;
    
    db.run('INSERT OR REPLACE INTO questionnaires (user_id, name, role, intent, updates, early_access) VALUES (?, ?, ?, ?, ?, ?)',
      [decoded.userId, name, role, intentStr, updatesStr, earlyAccess ? 1 : 0],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to save questionnaire' });
        }
        res.json({ message: 'Questionnaire saved successfully' });
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Add client by email
app.post('/api/clients', (req, res) => {
  const { email } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get client name from users table if exists
    db.get('SELECT name FROM users WHERE email = ?', [email], (userErr, user) => {
      const clientName = user ? user.name : null;
      
      db.run('INSERT INTO clients (user_id, email, name, status) VALUES (?, ?, ?, "active")',
        [decoded.userId, email, clientName, 'active'],
        function(err) {
          if (err && err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Client already added' });
          }
          if (err) {
            console.log('Client insert error:', err);
            return res.status(500).json({ error: 'Failed to add client' });
          }
          res.json({ id: this.lastID, email, name: clientName, status: 'pending' });
        }
      );
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get user's clients
app.get('/api/clients', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    db.all('SELECT * FROM clients WHERE user_id = ? ORDER BY created_at DESC',
      [decoded.userId],
      (err, clients) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch clients' });
        }
        res.json(clients);
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Send message to client
app.post('/api/clients/:id/messages', (req, res) => {
  const { content } = req.body;
  const clientId = req.params.id;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get client info
    db.get('SELECT * FROM clients WHERE id = ? AND user_id = ?', [clientId, decoded.userId], (err, client) => {
      if (err || !client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      // Insert message for sender (outbox)
      db.run('INSERT INTO messages (client_id, content, sender) VALUES (?, ?, "user")',
        [clientId, content],
        function(senderErr) {
          if (senderErr) {
            return res.status(500).json({ error: 'Failed to send message' });
          }
          
          // Find recipient user
          db.get('SELECT * FROM users WHERE email = ?', [client.email], (userErr, recipientUser) => {
            if (recipientUser) {
              // Get sender info
              db.get('SELECT * FROM users WHERE id = ?', [decoded.userId], (senderUserErr, senderUser) => {
                if (senderUser) {
                  // Find or create reverse client for recipient
                  db.get('SELECT id FROM clients WHERE user_id = ? AND email = ?', 
                    [recipientUser.id, senderUser.email], 
                    (findErr, reverseClient) => {
                      if (reverseClient) {
                        // Insert message for recipient (inbox)
                        db.run('INSERT INTO messages (client_id, content, sender) VALUES (?, ?, "client")',
                          [reverseClient.id, content]
                        );
                      } else {
                        // Create reverse client with sender's info for recipient's inbox
                        db.run('INSERT INTO clients (user_id, email, name, status) VALUES (?, ?, ?, "active")',
                          [recipientUser.id, senderUser.email, senderUser.name, 'active'],
                          function() {
                            db.run('INSERT INTO messages (client_id, content, sender) VALUES (?, ?, "client")',
                              [this.lastID, content]
                            );
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          });
          
          const message = {
            id: this.lastID,
            content,
            sender: 'user',
            created_at: new Date().toISOString(),
            client_id: clientId
          };
          
          io.emit('new_message', message);
          res.json(message);
        }
      );
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get messages for client
app.get('/api/clients/:id/messages', (req, res) => {
  const clientId = req.params.id;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    db.all('SELECT m.* FROM messages m JOIN clients c ON m.client_id = c.id WHERE c.id = ? AND c.user_id = ? ORDER BY m.created_at',
      [clientId, decoded.userId],
      (err, messages) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch messages' });
        }
        res.json(messages);
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_client_room', (clientId) => {
    socket.join(`client_${clientId}`);
    console.log(`User ${socket.id} joined client room ${clientId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});