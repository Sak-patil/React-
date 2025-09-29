// src/App.jsx

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import BackgroundParticles from './components/BackgroundParticles.jsx';

// Import all your components
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeatureTabs from './components/FeatureTabs.jsx';
import Solutions from './components/Solutions.jsx';
import TrustSection from './components/TrustSection.jsx';
import Verification from './components/Verification.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';

// Import your app's stylesheet
import './style/App.css';

const VIEWS = {
  HOME: 'home',
  LOGIN: 'login',
  SIGNUP: 'signup',
  DASHBOARD: 'dashboard',
  VERIFICATION: 'verification'
};

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (currentView !== VIEWS.DASHBOARD) {
            setCurrentView(VIEWS.DASHBOARD);
        }
      } else {
        setUser(null);
        setCurrentView(VIEWS.HOME);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleViewChange = (viewName) => {
    setCurrentView(viewName);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const renderContent = () => {
    switch (currentView) {
      case VIEWS.LOGIN:
        return <Login onLoginSuccess={() => setCurrentView(VIEWS.DASHBOARD)} onBackToHome={() => handleViewChange(VIEWS.HOME)} />;
      case VIEWS.SIGNUP:
        return <Signup onSignupSuccess={() => setCurrentView(VIEWS.DASHBOARD)} />;
      case VIEWS.DASHBOARD:
        return <Dashboard />;
      case VIEWS.VERIFICATION:
        return <Verification />;
      case VIEWS.HOME:
      default:
        return (
          <>
            <Hero onDownloadClick={() => handleViewChange(VIEWS.LOGIN)} />
            <FeatureTabs />
            <Solutions />
            <TrustSection />
            <Footer />
          </>
        );
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <BackgroundParticles />
      </div>

      <Navbar
        onHomeClick={() => handleViewChange(user ? VIEWS.DASHBOARD : VIEWS.HOME)}
        onPublicHomeClick={() => handleViewChange(VIEWS.HOME)}
        onLoginClick={() => handleViewChange(VIEWS.LOGIN)}
        onVerifyClick={() => handleViewChange(VIEWS.VERIFICATION)}
        onSignupClick={() => handleViewChange(VIEWS.SIGNUP)}
        onLogout={handleLogout}
        isLoggedIn={!!user}
      />

      <main>
        {renderContent()}
      </main>
    </>
  );
}

export default App;

