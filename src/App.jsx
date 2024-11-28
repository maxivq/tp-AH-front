import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AgregarProducto from './pages/AgregarProducto';
import ProductDetails from './pages/ProductDetails';
import PrivateRoute from './components/PrivateRoute';
import EditProductForm from './components/EditProductForm';
import AuthProvider from './context/AuthContext';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Footer from './components/Footer';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <main className="container-fluid my-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<ProductList />} />
                        <Route path="/productos/:id" element={<ProductDetails />} />
                        <Route path="/editar-producto/:id" element={
                            <PrivateRoute roles={['admin']}>
                                <EditProductForm />
                            </PrivateRoute>
                        } />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/agregar-producto" element={
                            <PrivateRoute roles={['admin']}>
                                <AgregarProducto />
                            </PrivateRoute>
                        } />
                    </Routes>
                </main>
            </Router>
                <Footer />
        </AuthProvider>
    );
};

export default App;