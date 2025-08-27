"use client";
import Image from "next/image";
import { useState } from "react";
import BannerSkeleton from "./BannerSkeleton";

export default function Banner() {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <section className="py-16 ">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 ">
        {/* Left: Text */}
        <div className="flex-1 text-neutral-light dark:text-neutral-dark text-center md:text-left space-y-4">
          {/* Brand Name */}
          <h1 className="text-4xl md:text-5xl font-bold ">Tech Jomi</h1>

          {/* Main Tagline */}
          <p className=" text-lg md:text-xl">
            Your one-stop shop for the latest tech accessories, gadgets, and
            essentials.
          </p>

          {/* Supporting Points */}
          <ul className="list-disc list-inside text-base md:text-lg  space-y-1">
            <li>High-quality products at affordable prices</li>
            <li>Fast shipping and easy returns</li>
            <li>Trusted by tech enthusiasts nationwide</li>
          </ul>

          {/* Call to Action */}
          <div className="mt-4">
            <button className="btn bg-primary-light dark:bg-primary-dark btn-lg text-white dark:text-black rounded-lg">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative w-full h-96 md:h-[600px] shadow-lg overflow-hidden rounded-2xl">
          {!imgLoaded && <BannerSkeleton></BannerSkeleton>}

          {/* Actual Image */}
          <Image
            src="/banner.jpg"
            alt="Tech Accessories"
            fill
            className={`object-cover transition-opacity filter saturate-0 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setImgLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
