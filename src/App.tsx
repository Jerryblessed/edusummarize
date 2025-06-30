import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { BoltBadge } from './components/BoltBadge';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { Summarize } from './pages/Summarize';
import { Voice } from './pages/Voice';
import { Store } from './pages/Store';
import { Sponsors } from './pages/Sponsors';
import { Auth } from './pages/Auth';
import { Paywall } from './pages/Paywall';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <BoltBadge />
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/summarize" element={<Summarize />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/store" element={<Store />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/paywall" element={<Paywall />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;