"use client";

import { useCart } from "../context/CartContext";

export default function CardPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div
      dir="rtl"
      className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              مشترياتك
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              سلة التسوق
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              راجع المنتجات قبل إتمام طلبك.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l1.5 11.5A2 2 0 0 0 8.5 17h8.8a2 2 0 0 0 1.9-1.5L21 7H6"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">المنتجات</p>
              <p className="text-lg font-black text-slate-900">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </p>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-white bg-white/80 px-6 py-16 text-center shadow-[0_12px_35px_rgba(30,42,74,0.07)] backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l1.5 11.5A2 2 0 0 0 8.5 17h8.8a2 2 0 0 0 1.9-1.5L21 7H6"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-black text-slate-900">
              سلتك فارغة
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              أضف بعض المنتجات لتظهر هنا قبل إتمام الشراء.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="space-y-4">
              {cart.map((item) => {
                const itemId = item._id ?? item.id;

                return (
                  <div
                    key={String(itemId)}
                    className="flex flex-col gap-4 rounded-3xl border border-white/90 bg-white p-5 shadow-[0_10px_30px_rgba(30,42,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(30,42,74,0.1)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-slate-900 to-emerald-700 text-xl font-black text-white">
                        {item.name?.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-black text-slate-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-400">
                          الكمية: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span className="text-lg font-black text-emerald-700">
                        {item.price * item.quantity}{" "}
                        <span className="text-xs">ر.س</span>
                      </span>
                      <button
                        className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                        onClick={() => removeFromCart(itemId)}
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/90 bg-white p-6 shadow-[0_12px_35px_rgba(30,42,74,0.07)] lg:sticky lg:top-24">
              <p className="text-sm font-bold text-slate-400">ملخص الطلب</p>
              <div className="mt-5 flex items-end justify-between border-b border-slate-100 pb-5">
                <span className="font-bold text-slate-600">الإجمالي</span>
                <span className="text-2xl font-black text-slate-900">
                  {total} <span className="text-sm">ر.س</span>
                </span>
              </div>
              <button
                onClick={() => checkout(cart, total, clearCart)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:bg-emerald-600"
              >
                إتمام الطلب
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



async function checkout(cart, total, clearCart) {
  const items = cart.map((item) => ({
    product: item._id ?? item.id,
    quantity: item.quantity,
  }));

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items,
      totalPrice: total,
    }),
  });

  if (res.ok) {
    clearCart();
    alert("Order created");
  }
}