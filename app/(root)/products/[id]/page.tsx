"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  features: string[];
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get<Product>(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200-light dark:bg-base-100-dark flex items-center justify-center">
        <div className="text-neutral-light dark:text-neutral-dark">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-200-light dark:bg-base-100-dark flex items-center justify-center">
        <div className="text-neutral-light dark:text-neutral-dark">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200-light dark:bg-base-100-dark text-neutral-light dark:text-neutral-dark">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-base-100 dark:bg-base-200-dark shadow-md border border-gray-300/10 rounded-lg p-8">
          <h1 className="text-4xl md:text-5xl font-bold font-anton mb-6 text-neutral-light dark:text-neutral-dark">
            {product.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <span className="font-anton text-sm uppercase tracking-wider opacity-70">
                  Brand
                </span>
                <p className="text-lg font-poppins">{product.brand}</p>
              </div>

              <div>
                <span className="font-anton text-sm uppercase tracking-wider opacity-70">
                  Category
                </span>
                <p className="text-lg font-poppins">{product.category}</p>
              </div>

              <div>
                <span className="font-anton text-sm uppercase tracking-wider opacity-70">
                  Price
                </span>
                <p className="text-3xl font-bold font-anton">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <span className="font-anton text-sm uppercase tracking-wider opacity-70">
                Description
              </span>
              <p className="text-lg font-poppins leading-relaxed mt-2">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold font-anton mb-4 text-neutral-light dark:text-neutral-dark">
              Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="font-poppins text-neutral-light dark:text-neutral-dark">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
