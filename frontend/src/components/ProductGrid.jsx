import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  const [page, setPage] = useState(1);
  const perPage = 24;

  const paginatedProducts = products.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(products.length / perPage);

  if (!products || products.length === 0)
    return <div className="text-sm text-gray-500">No products found.</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {paginatedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
