import Image from "next/image";

export default function Banner() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 ">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left space-y-4">
          {/* Brand Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Tech Jomi
          </h1>

          {/* Main Tagline */}
          <p className="text-secondary text-lg md:text-xl">
            Your one-stop shop for the latest tech accessories, gadgets, and
            essentials.
          </p>

          {/* Supporting Points */}
          <ul className="list-disc list-inside text-base md:text-lg text-neutral space-y-1">
            <li>High-quality products at affordable prices</li>
            <li>Fast shipping and easy returns</li>
            <li>Trusted by tech enthusiasts nationwide</li>
          </ul>

          {/* Call to Action */}
          <div className="mt-4">
            <button className="btn btn-primary btn-lg dark:text-black rounded-lg">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative w-full h-96 md:h-[600px] shadow-2xl overflow-hidden rounded-2xl">
          <Image
            src="/banner.jpg"
            alt="Tech Accessories"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
