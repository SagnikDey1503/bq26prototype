// components/GlassRegisterCardNextImage.jsx
import Image from "next/image";
import React from "react";

export default function GlassRegisterCardNextImage() {
  return (
    <div className="relative flex items-start justify-center">
      <div
        className="
          w-[90%] sm:w-[360px]
          -mt-12 sm:-mt-24
          mx-auto
          rounded-2xl
          border border-white/20
          backdrop-blur-md
          bg-clip-padding
          shadow-2xl
          text-center
          px-5 py-4
          mb-15
        "
        role="region"
        aria-label="Register card"
      >
        <p className="text-white/95 mb-4 text-sm sm:text-base">
          Register now for Bioquest 26
        </p>

        <button
          type="button"
          className="
            inline-block
            px-5 py-2
            rounded-full
            bg-emerald-500
            backdrop-blur-md
            border border-emerald-500/30
            text-black text-sm sm:text-base font-medium
            shadow-md
            hover:scale-[1.03] transition-transform duration-150
          "
        >
          REGISTER NOW
        </button>
      </div>
    </div>
  );
}
