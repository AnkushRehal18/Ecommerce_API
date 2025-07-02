import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login.Jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route path='/login' element={<Login />} />

        <Route
          path='/products'
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        {/* Product Details Route */}
        <Route
          path='/product/:id'
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
