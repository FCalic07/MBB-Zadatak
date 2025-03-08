import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("./deals.json");
                if(!res.ok){
                    throw new Error("Failed to fetch deals.json!");
                }
                const data = await res.json();

                const itemsList = data.Deals.Items;
                const filteredItems = itemsList.filter((item) => 
                    item.Pricing.LowestPrice.Amount > priceRange[0] * 100 && item.Pricing.LowestPrice.Amount < priceRange[1] * 100     
                );                  
                setProducts(filteredItems);
            }
            catch (error) {
                console.log(error.message);
            }
            finally {
                setLoading(false);
            }

        };

        fetchProducts();
    }, [priceRange])

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
                console.log(error.message);
            }
            finally {
                setLoading(false);
            }

        };


        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
    <>
        <Filter filterPrice={setPriceRange}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28 pt-12">
        {products.map((product) => (
            <Product key={product.DealID} product={product} />
        ))}
        </div>
    </>
    );
};

export default ProductContainer;