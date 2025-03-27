import './App.css'
import { LoginPage } from './Pages/LoginPage.tsx'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { DogSearchPage } from "./Pages/DogSearchPage.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from './Pages/Layout.tsx';
import FavoritesPage from './Pages/FavoritesPage.tsx';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <LoginPage />
                    </Layout>
                } />
                <Route path="/search" element={
                    <Layout>
                        <DogSearchPage />
                    </Layout>
                } />
                <Route path="/favorites" element={
                    <Layout>
                        <FavoritesPage />
                    </Layout>} />
            </Routes>
        </Router>
    )
}

export default App
