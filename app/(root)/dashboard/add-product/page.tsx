"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type ProductForm = {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  features: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductForm>({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    features: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        features: form.features.split(",").map((f) => f.trim()),
      };

      await axios.post("/api/products", productData);
      alert("Product added successfully!");
      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="input bg-base-200-dark input-bordered w-full"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="input bg-base-200-dark input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="textarea bg-base-200-dark textarea-bordered w-full"
          required
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="input bg-base-200-dark bg-base-200-dark input-bordered w-full"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="input bg-base-200-dark input-bordered w-full"
          required
        />

        <input
          type="text"
          name="features"
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={handleChange}
          className="input bg-base-200-dark input-bordered w-full"
          required
        />

        <button
          type="submit"
          className="btn bg-base-100-dark text-white dark:bg-base-100-light dark:text-black w-full mt-4"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
