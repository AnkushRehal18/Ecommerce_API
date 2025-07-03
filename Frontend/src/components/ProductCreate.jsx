import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/constants';

const ProductCreate = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        currency: '',
        category: '',
        brand: '',
        sku: '',
        stock_quantity: '',
        images: '',
        tags: '',
        is_active: true,
    });

    const [message, setMessage] = useState('');

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
            ...product,
            price: parseFloat(product.price),
            stock_quantity: parseInt(product.stock_quantity),
            images: product.images.split(',').map(img => img.trim()),
            tags: product.tags.split(',').map(tag => tag.trim())
        };

        try {
            const res = await axios.post( BaseUrl + '/create', payload, {
               withCredentials:true
            });
            setMessage(res.data.message);
            setProduct({
                name: '',
                description: '',
                price: '',
                currency: '',
                category: '',
                brand: '',
                sku: '',
                stock_quantity: '',
                images: '',
                tags: '',
                is_active: true,
            });
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error creating product');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
            
            {message && (
                <p className="mb-4 text-center text-sm text-green-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2 appearance-none" />

                <input type="text" name="currency" placeholder="Currency (e.g., USD)" value={product.currency} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="stock_quantity" placeholder="Stock Quantity" value={product.stock_quantity} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2 appearance-none" />

                <input type="text" name="images" placeholder="Image URLs (comma separated)" value={product.images} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <input type="text" name="tags" placeholder="Tags (comma separated)" value={product.tags} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded px-3 py-2" />

                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="is_active" checked={product.is_active} onChange={handleChange}
                        className="h-4 w-4" />
                    <label className="text-gray-700">Active</label>
                </div>

                <button type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default ProductCreate;
