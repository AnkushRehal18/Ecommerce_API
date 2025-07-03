import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const limit = 2;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const search = searchParams.get("search");

        if (search) {
            fetchSearchedProduct(search);
        } else {
            fetchProducts();
        }
    }, [page, searchParams]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(BaseUrl + "/feed", {
                withCredentials: true,
                params: { page, limit }
            });
            setProducts(res.data.product);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to load products');
        }
    };

    const fetchSearchedProduct = async (searchTerm) => {
        try {
            const res = await axios.get(`${BaseUrl}/find/${searchTerm}`, { withCredentials: true });
            setProducts([res.data.product]); 
            setError('');
        } catch (err) {
            console.error(err);
            setProducts([]);
            setError('Product not found');
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-8 px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Product List</h2>

            {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <div className="space-y-6">
                {products.map((p) => (
                    <div key={p._id} className="border border-gray-300 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-2" onClick={() => {
                            // console.log(p._id);
                            navigate(`/product/${p._id}`);
                        }}>{p.name}</h3>
                        <p><b>Description:</b> {p.description}</p>
                        <p><b>Price:</b> {p.price} {p.currency}</p>

                        {p.images?.length > 0 && (
                            <div className="mt-4">
                                <p className="font-medium mb-2">Images:</p>
                                <div className="flex flex-wrap gap-3">
                                    {p.images.map((img, index) => (
                                        <img key={index} src={img} alt="Product" className="w-24 h-24 object-cover rounded-md border" />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={() => navigate(`/updateProduct/${p._id}`)}
                            >
                                Edit Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!searchParams.get("search") && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="font-medium">Page {page}</span>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
