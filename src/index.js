import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LogInProvider } from './contexts/LogInContext';
import { UserDataProvider } from './contexts/UserDataContext';
import { ProfileProvider } from './contexts/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserDataProvider>
      <LogInProvider>
        <ProfileProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProfileProvider>
      </LogInProvider>
    </UserDataProvider>
  </React.StrictMode>
);
