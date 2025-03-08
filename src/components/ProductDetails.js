import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.Details.DealName}</h1>
      <img src={thumbnailUrl} alt={product.Details.DealName} className="w-full h-auto rounded-lg my-4" />
      <p className="text-gray-600 text-lg">Price: {product.Pricing.DiscountedPrice.FormattedString}€</p>
      <p className="mt-2">{product.Details.Description}</p>
    </div>
  );
};

export default ProductDetails;
