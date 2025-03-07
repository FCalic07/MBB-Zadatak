import React, { useState } from "react";

const Product = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsHandler = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const imageBaseUrl = "https://cdn.mybestbrands.de/";
  const thumbnailUrl = `${imageBaseUrl}${product.Details.Media.ThumbnailImagePath}`

  return (
    <div className="product">
      <h2>{product.Details.DealName}</h2>
      <h1>Price: {product.Pricing.DiscountedPrice.FormattedString}€</h1>

      <button onClick={toggleDetailsHandler}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
          <img src={thumbnailUrl} alt={product.Details.DealName}/>
      )}
    </div>
  );
};

export default Product;