'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUpload } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-4 py-12">
      <div className="max-w-5xl w-full text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
          Upload, Store & Share Your <span className="text-blue-600">Images</span> Easily
        </h1>
        <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-2xl">
          A fast, secure, and user-friendly platform to manage your image library. No complex setup — just drag, drop, and go!
        </p>

        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            <FaUpload className="w-5 h-5" />
            Upload Now
          </Link>
          <Link
            href="/dashboard/gallery"
            className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            View Gallery
          </Link>
        </div>

        <div className="mt-12">
          <Image
            src="/hero-preview.png"
            alt="Hero preview"
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full max-w-[90vw]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
