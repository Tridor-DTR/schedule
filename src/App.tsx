import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import Editor from './pages/Editor';
import Admin from './pages/Admin';
import Apply from './pages/Apply';

function AppRoutes() {
  const { state } = useApp();

  return (
    <Routes>
      <Route path="/" element={
        state.isAuthenticated ? (
          <Layout><Navigate to="/schedule" replace /></Layout>
        ) : (
          <Layout><Landing /></Layout>
        )
      } />
      <Route path="/login" element={
        state.isAuthenticated ? <Navigate to="/schedule" replace /> : <Layout><Login /></Layout>
      } />
      <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/editor" element={
        !state.isAuthenticated ? <Navigate to="/login" replace /> : <Layout><Editor /></Layout>
      } />
      <Route path="/admin" element={
        !state.isAuthenticated ? <Navigate to="/login" replace /> : <Layout><Admin /></Layout>
      } />
      <Route path="/apply" element={<Layout><Apply /></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}
