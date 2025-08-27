"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

// Declare the type directly on the page
type Product = {
  _id?: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get<Product[]>("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-16">Loading products...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                  {product.description}
                </p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <button className="btn w-full bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-lg hover:opacity-90 transition">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
