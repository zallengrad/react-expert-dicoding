import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Navigation from './components/Navigation';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };


  return (
    <>
      {/* LoadingBar dipindah ke luar kondisi isPreload agar selalu tampil */}
      <div className="sticky top-0 z-50">
        <LoadingBar className="bg-blue-500 h-1" />
      </div>

      {/* Konten utama disembunyikan HANYA saat preload, tapi LoadingBar tetap jalan */}
      {!isPreload && (
        <main className="min-h-screen bg-gray-900 text-white font-sans">
          <Navigation authUser={authUser} signOut={onSignOut} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/new" element={<CreateThreadPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      )}
    </>
  );
}

export default App;

// app.jsx