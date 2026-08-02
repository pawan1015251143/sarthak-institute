import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import DemoExplorer from './components/DemoExplorer/DemoExplorer';
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRoutes />
            {/* Floating WhatsApp Help Chat (9006859138) */}
            <WhatsAppWidget />
            {/* All-in-One Live Demo Explorer — lets the user see & test everything at once */}
            <DemoExplorer />
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
