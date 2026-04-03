import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="861206311662-6df9sfip1vgn7duiecum4dh45u00kh2n.apps.googleusercontent.com">
      <AuthProvider> 
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);