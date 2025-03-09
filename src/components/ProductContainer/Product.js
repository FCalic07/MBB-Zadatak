import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const imageBaseUrl = "https://cdn.mybestbrands.de/";
  const thumbnailUrl = `${imageBaseUrl}${product.Details.Media.ThumbnailImagePath}`;

  const isDiscount = product.Pricing.DiscountedPrice.Amount !== product.Pricing.Price.Amount;

  return (
    <div
      onClick={() => navigate(`/product/${product.DealID}`)}
      className="cursor-pointer p-4 w-full max-w-[250px] transition-all duration-200 hover:bg-gray-100"
    >
      <img
        src={thumbnailUrl}
        alt={product.Details.DealName}
        className="w-full h-48 object-cover"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.Brand.Name}</h2>
        <h2 className="text-lg truncate">{product.Details.DealName}</h2>
        <div className="flex gap-8">
          {isDiscount ? (
            <>
              <h3 className="text-lg text-red-600">{product.Pricing.DiscountedPrice.FormattedString}€</h3>
              <h3 className="text-lg text-gray-600 line-through">{product.Pricing.Price.FormattedString}€</h3>
            </>
          ) : (
            <h3 className="text-lg text-gray-600">{product.Pricing.Price.FormattedString}€</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
