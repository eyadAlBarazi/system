"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Page() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto mb-10 flex w-full max-w-[1500px] flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="w-fit rounded-2xl border border-white/80 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold text-slate-400">المتوفر الآن</p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {products.length}
            <span className="mr-1 text-sm font-semibold text-slate-400">
              منتج
            </span>
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1500px]">
        {loading ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-3xl border border-white bg-white/80 p-4 shadow-sm"
              >
                <div className="h-44 rounded-2xl bg-slate-200" />
                <div className="mt-5 h-5 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-100" />
                <div className="mt-6 h-9 w-1/3 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} addToCart = {addToCart}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

function ProductCard({ product ,addToCart}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_12px_35px_rgba(30,42,74,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(30,42,74,0.13)]">
      <div className="relative m-3 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#10233b] via-[#164e63] to-[#10b981] text-6xl font-black text-white transition duration-500 before:absolute before:-right-10 before:-top-16 before:h-40 before:w-40 before:rounded-full before:bg-white/10 before:blur-2xl after:absolute after:-bottom-20 after:-left-8 after:h-44 after:w-44 after:rounded-full after:bg-emerald-300/20 after:blur-2xl group-hover:scale-[1.02]">
        <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
          {product.name?.charAt(0)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="truncate text-lg font-black text-slate-900">
            {product.name}
          </h3>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            متاح
          </span>
        </div>

        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="text-xl font-black text-slate-900">
            {product.price} ر.س
          </span>

          <button
            onClick={() => {
              addToCart(product);
            }}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
