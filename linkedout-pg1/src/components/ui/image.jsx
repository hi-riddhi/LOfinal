import { forwardRef, useState } from 'react';
import './image.css';

const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

export const Image = forwardRef(({ src, fittingType, ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(FALLBACK_IMAGE_URL)
    }
  }

  if (!src) {
    return <div data-empty-image ref={ref} {...props} />
  }

  return (
    <img 
      ref={ref} 
      src={imgSrc || src} 
      onError={handleError}
      data-error-image={hasError}
      {...props} 
    />
  )
})
Image.displayName = 'Image'
