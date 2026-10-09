"use client";

import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "تعذر تحميل الإشعارات");
        }

        setList(data);
      } catch (err) {
        console.error(err);
        setError("تعذر تحميل الإشعارات");
      }
    }

    loadNotifications();
  }, []);

  return (
    <div
      dir="rtl"
      className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              مركز التنبيهات
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              إشعاراتك
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              تابع آخر التحديثات المتعلقة بطلباتك بسهولة.
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
                  d="M15 17h5l-1.4-1.6A2 2 0 0 1 18 14.1V11a6 6 0 0 0-12 0v3.1a2 2 0 0 1-.6 1.3L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">الإجمالي</p>
              <p className="text-lg font-black text-slate-900">{list.length}</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
            <p className="font-bold text-red-700">{error}</p>
            <p className="mt-1 text-sm text-red-500">
              يرجى المحاولة مرة أخرى لاحقًا.
            </p>
          </div>
        ) : list.length === 0 ? (
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
                  d="M15 17h5l-1.4-1.6A2 2 0 0 1 18 14.1V11a6 6 0 0 0-12 0v3.1a2 2 0 0 1-.6 1.3L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
                />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-black text-slate-900">
              لا توجد إشعارات حاليًا
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              ستظهر هنا كل التحديثات الجديدة على طلباتك.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((item) => (
              <div
                className={`group flex gap-4 rounded-3xl border p-5 shadow-[0_10px_30px_rgba(30,42,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(30,42,74,0.1)] sm:p-6 ${
                  item.read
                    ? "border-white/80 bg-white/80"
                    : "border-emerald-100 bg-white"
                }`}
                key={item._id}
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.4-1.6A2 2 0 0 1 18 14.1V11a6 6 0 0 0-12 0v3.1a2 2 0 0 1-.6 1.3L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
                    />
                  </svg>
                  {!item.read && (
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <p className="font-bold leading-7 text-slate-800">
                      {item.message}
                    </p>
                    {!item.read && (
                      <span className="w-fit shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                        جديد
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 7v5l3 2" />
                    </svg>
                    {new Date(item.createdAt).toLocaleString("ar-SA")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
