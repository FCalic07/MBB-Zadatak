import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShowSizes, ShowDetails } from "./ShowMoreContainers"

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/deals.json");

        if (!res.ok) {
          throw new Error("Failed to fetch deals.json!");
        }
        const data = await res.json();

        const itemsList = data.Deals.Items;
        const product = itemsList.find((product) => product.DealID === Number(id))

        if (!product) {
          throw new Error("Product not found!");
        }
        setProduct(product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const imageBaseUrl = "https://cdn.mybestbrands.de/";
  const thumbnailUrl = `${imageBaseUrl}${product.Details.Media.ThumbnailImagePath}`;

  const isDiscount = product.Pricing.DiscountedPrice.Amount !== product.Pricing.Price.Amount;

  return (
    <div className="flex px-28 pt-28">

      <div className="flex w-3/5 h-full justify-center flex-shrink-0">
        <img
          src={thumbnailUrl}
          alt={product.Details.DealName}
          className="w-[60%] h-auto object-cover"
        />
      </div>
  
      <div className="flex w-2/5 h-full flex-col gap-1">
        <h1 className="text-2xl font-bold">{product.Brand.Name}</h1>
  
        <p className="text-gray-500 mb-6">{product.Details.DealName}</p>
  
        <div className="flex gap-4 mb-2">
        {isDiscount ? (
            <>
              <h2 className="text-xl font-bold text-red-600">{product.Pricing.DiscountedPrice.FormattedString}€</h2>
              <h2 className="text-l text-gray-400">|</h2>
              <h2 className="text-xl font-bold text-gray-400 line-through">{product.Pricing.Price.FormattedString}€</h2>
            </>
          ) : (
            <h2 className="text-xl font-bold">{product.Pricing.Price.FormattedString}€</h2>
          )}
        </div>
  
        <a href={product.Details.Links.DealTargetUrl} className="flex justify-center px-6 py-3 bg-black text-white font-semibold transition duration-200 hover:bg-gray-800">
          BUY NOW
        </a>
  
        <ShowSizes product={product}/>

        <ShowDetails product={product}/>

      </div>
    </div>
  );
  
};

export default ProductDetails;
