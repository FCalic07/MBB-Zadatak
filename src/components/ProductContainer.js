import React, { useState, useEffect } from "react";
import Product from "./Product";

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("./deals.json");
                if(!res.ok){
                    throw new Error("Failed to fetch deals.json!");
                }
                const data = await res.json();

                const itemsList = data.Deals.Items;
                setProducts(itemsList);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }

        };


        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {products.map((product) => (
            <Product key={product.DealID} product={product} />
        ))}
        </div>
    );
};

export default ProductContainer;