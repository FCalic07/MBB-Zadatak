import React, { useContext, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";
import { ProductContext } from "../../contexts/ProductContext";

function ProductContainer() {
    const {products, loading, error, priceRange } = useContext(ProductContext);

    useEffect(() => {
        console.log("useEffect without dependencies ran!");
      });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Filter minMaxPrice={priceRange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-28 pt-12">
                {products.map((product) => (
                    <Product key={product.DealID} product={product} />
                ))}
            </div>
        </>
    );
};

export default ProductContainer;
