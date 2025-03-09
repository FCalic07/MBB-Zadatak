import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 0]); // [minPrice, maxPrice]
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]); // User-selected range

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("./deals.json");
                if (!res.ok) {
                    throw new Error("Failed to fetch deals.json!");
                }
                const data = await res.json();
                const itemsList = data.Deals.Items;

                // Calculate min and max price
                const { min, max } = itemsList.reduce(
                    (acc, item) => {
                        const price = item.Pricing.DiscountedPrice.Amount; // Convert from cents to euros
                        return {
                            min: Math.min(acc.min, price),
                            max: Math.max(acc.max, price),
                        };
                    },
                    { min: Infinity, max: 0 } // Initial values
                );

                setProducts(itemsList);
                setPriceRange([min, max]);
                setSelectedPriceRange([min, max]); // Initialize selected range

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                    item.Pricing.DiscountedPrice.Amount >= selectedPriceRange[0] && item.Pricing.DiscountedPrice.Amount <= selectedPriceRange[1]    
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
    }, [selectedPriceRange])

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Filter filterPrice={setSelectedPriceRange} minMaxPrice={priceRange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28 pt-12">
                {products.map((product) => (
                    <Product key={product.DealID} product={product} />
                ))}
            </div>
        </>
    );
};

export default ProductContainer;
