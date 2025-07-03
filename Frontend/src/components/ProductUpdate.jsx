import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductUpdate = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        currency: '',
        stock_quantity: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            currency: product.currency,
            stock_quantity: parseInt(product.stock_quantity),
            is_active: product.is_active
        };

        try {
            const res = await axios.patch(`http://localhost:3000/update/${id}`, payload, {
                withCredentials: true
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error updating product');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>

            {message && <p className="mb-4 text-center text-green-600">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required className="w-full border px-3 py-2" />

                <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required className="w-full border px-3 py-2" />

                <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="w-full border px-3 py-2" />

                <input type="text" name="currency" value={product.currency} onChange={handleChange} placeholder="Currency" required className="w-full border px-3 py-2" />

                <input type="text" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" required className="w-full border px-3 py-2" />

                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="is_active" checked={product.is_active} onChange={handleChange} className="h-4 w-4" />
                    <label>Active</label>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Update</button>
            </form>
        </div>
    );
};

export default ProductUpdate;
