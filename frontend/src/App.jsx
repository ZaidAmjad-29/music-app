import React from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import MyPlaylistsPage from "./pages/MyPlaylistsPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchSongsPage from "./pages/SearchSongs";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import AppLayout from "./components/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route element={<AppLayout />}>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlists" element={<MyPlaylistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchSongsPage />} />
          <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
