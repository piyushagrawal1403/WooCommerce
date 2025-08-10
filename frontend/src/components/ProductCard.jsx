import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white flex flex-col">
      {/* Title */}
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>

      {/* Price */}
      <p className="text-gray-700 font-medium mb-1">
        ₹{product.price}
        {product.onSale && (
          <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
            On Sale
          </span>
        )}
      </p>

      {/* Stock Status */}
      <p
        className={`text-sm mb-1 ${
          product.stockStatus === "instock" ? "text-green-600" : "text-red-500"
        }`}
      >
        {product.stock_status}
      </p>

      {/* Stock Quantity */}
      {product.stockQuantity !== undefined && (
        <p className="text-xs text-gray-500 mb-2">
          Stock: {product.stockQuantity}
        </p>
      )}

      {/* Category */}
      {product.category && (
        <p className="text-xs bg-gray-100 px-2 py-1 rounded w-fit mb-2">
          {product.category}
        </p>
      )}

      {/* Tags */}
      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
