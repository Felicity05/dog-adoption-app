import './App.css'
import { LoginPage } from './Pages/LoginPage.tsx'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from './Pages/Layout.tsx';
import AccountPage from './Pages/AccountPage.tsx';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <LoginPage />
                    </Layout>
                } />
                <Route path="/dinger" element={
                    <Layout>
                        <LandingPage />
                    </Layout>
                } />
                <Route path="/account" element={
                    <Layout>
                        <AccountPage />
                    </Layout>} />
            </Routes>
        </Router>
    )
}

export default App
