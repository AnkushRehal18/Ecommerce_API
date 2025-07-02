import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../utils/constants';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/findDetail/${id}`, { withCredentials: true });
            setProduct(res.data.product);
            setError('');
        } catch (err) {
            console.error(err.message);
            setError('Failed to fetch product details');
        }
    };

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    if (!product) {
        return <p className="text-center mt-8">Loading product details...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto my-12 p-6 border border-gray-300 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="mb-2"><b>Description:</b> {product.description}</p>
            <p className="mb-2"><b>Price:</b> {product.price} {product.currency}</p>
            <p className="mb-2"><b>Category:</b> {product.category}</p>
            <p className="mb-2"><b>Brand:</b> {product.brand}</p>
            <p className="mb-2"><b>SKU:</b> {product.sku}</p>
            <p className="mb-2"><b>Stock Quantity:</b> {product.stock_quantity}</p>
            <p className="mb-2"><b>Tags:</b> {product.tags?.join(', ')}</p>
            <p className="mb-2"><b>Active:</b> {product.is_active ? 'Yes' : 'No'}</p>

            {product.images?.length > 0 && (
                <div className="mt-4">
                    <p className="font-medium mb-2">Images:</p>
                    <div className="flex flex-wrap gap-3">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Product"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
