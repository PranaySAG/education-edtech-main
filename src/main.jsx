import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your global CSS

// Import ClerkProvider
import { ClerkProvider } from '@clerk/clerk-react';

// Get your publishable key from environment variables
// For Vite:
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// For Create React App:
// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const app = PUBLISHABLE_KEY ? (
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignInUrl="/"
    afterSignUpUrl="/"
    afterSignOutUrl="/"
  >
    <App />
  </ClerkProvider>
) : (
  <App />
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
);