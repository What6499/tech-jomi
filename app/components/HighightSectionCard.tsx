"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  description:string
};

export default function HighlightSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch only 3 products using the limit query parameter
        const response = await axios.get<Product[]>("/api/products?limit=4");
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-spinner text-primary"></span>
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error py-16">
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        No products to display.
      </div>
    );
  }

  return (
    <>
      <h1 className="font-anton text-6xl font-bold text-center mb-16">
        Highlights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 container gap-6 mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-base-100-light dark:bg-base-200-dark rounded-lg shadow-md  overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200"
          >
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg font-anton">
                  {product.name}
                </h2>
                <p className="text-sm font-anton">{product.brand}</p>
                <p className="mt-2  text-sm line-clamp-3 font-poppins tracking-wide">
                  {product.description}
                </p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <Link href={`products/${product._id}`}>
                  <button className="btn w-full bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-lg hover:opacity-90 transition">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
