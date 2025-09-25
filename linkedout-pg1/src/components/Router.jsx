import { ScrollToTop } from '@/lib/scroll-to-top';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommunityPage from '@/pages/CommunityPage';
import PastEventsPage from '@/pages/PastEventsPage';
import Header from './Header';

// Auth Pages
import Login from '@/pages/auth/Login';
import AuthSignup from '@/pages/auth/AuthSignup';
import ResetPassword from '@/pages/auth/ResetPassword';
import VerifyEmail from '@/pages/auth/VerifyEmail';
import Questionnaire from '@/pages/auth/Questionnaire';
import Create from '@/pages/auth/Create';

// Layout component that includes ScrollToTop
function LayoutWithHeader() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  );
}

// Layout without the app Header, used for /community so only page 2's navbar shows
function LayoutNoHeader() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithHeader />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/community",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <CommunityPage />,
      },
    ],
  },
  {
    path: "/past-events",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <PastEventsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <AuthSignup />,
      },
    ],
  },
  {
    path: "/reset-password/:token",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/verify",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <Questionnaire />,
      },
    ],
  },
  {
    path: "/create",
    element: <LayoutNoHeader />,
    children: [
      {
        index: true,
        element: <Create />,
      },
    ],
  },
  {
    path: "/write-post",
    element: <Navigate to="/login" replace />,
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}
