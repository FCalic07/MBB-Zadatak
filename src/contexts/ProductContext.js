import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);

  useEffect(() => {
    const findMinMaxOfProducts = async () => {
        try {
            const res = await fetch("/deals.json");
            if (!res.ok) {
                throw new Error("Failed to fetch deals.json!");
            }
            const data = await res.json();
            const itemsList = data.Deals.Items;

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

            setSelectedPriceRange([min, max]);
            setPriceRange([min, max]);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    findMinMaxOfProducts();
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
                setError(error.message);
                console.log("greska bruda");
            }
            finally {
                setLoading(false);
                console.log("poziv za fetchanje filtrirano");
            }

        };
    fetchProducts();
    }, [selectedPriceRange])

  return (
    <ProductContext.Provider value={{ products, loading, error, priceRange, setSelectedPriceRange }}>
      {children}
    </ProductContext.Provider>
  );
};
