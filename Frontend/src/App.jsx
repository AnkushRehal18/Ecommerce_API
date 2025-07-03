import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login.Jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import ProductCreate from './components/ProductCreate';
import ProductUpdate from './components/ProductUpdate';


function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}

      <Routes>
        <Route path='/login' element={<Login />} />

        <Route
          path='/createProduct'
          element={
            <ProtectedRoute>
              <ProductCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path='/products'
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/product/:id'
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/updateProduct/:id'
          element={
            <ProtectedRoute>
              <ProductUpdate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
