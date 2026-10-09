"use client";

import { useState, useEffect } from "react";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();

    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function changesStatus(id, status) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  }

  return (
    <div
      dir="rtl"
      className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              لوحة الإدارة
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              إدارة الطلبات
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              راجع طلبات العملاء وحدّث حالتها بسهولة.
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
                  d="M4 7.5 12 4l8 3.5M4 7.5V17l8 3 8-3V7.5M4 7.5l8 3 8-3M12 10.5V20"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">إجمالي الطلبات</p>
              <p className="text-lg font-black text-slate-900">{orders.length}</p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
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
                  d="M4 7.5 12 4l8 3.5M4 7.5V17l8 3 8-3V7.5M4 7.5l8 3 8-3M12 10.5V20"
                />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-black text-slate-900">
              لا توجد طلبات حاليًا
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              ستظهر طلبات العملاء هنا عند إنشاء طلب جديد.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {orders.map((item) => {
              const status = getStatusDetails(item.status);

              return (
                <article
                  className="rounded-3xl border border-white/90 bg-white p-5 shadow-[0_12px_35px_rgba(30,42,74,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(30,42,74,0.12)] sm:p-6"
                  key={item._id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-slate-900 to-emerald-700 text-white shadow-lg shadow-slate-900/10">
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
                            d="M4 7.5 12 4l8 3.5M4 7.5V17l8 3 8-3V7.5M4 7.5l8 3 8-3M12 10.5V20"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          رقم الطلب
                        </p>
                        <p className="mt-0.5 max-w-32 truncate text-sm font-black text-slate-800">
                          #{item._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="my-5 h-px bg-slate-100" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-400">العميل</p>
                      <p className="mt-1 truncate text-sm font-black text-slate-800">
                        {item.user?.name || "غير معروف"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-semibold text-emerald-600/70">
                        الإجمالي
                      </p>
                      <p className="mt-1 text-lg font-black text-emerald-700">
                        {item.totalPrice} <span className="text-xs">ر.س</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
              <button
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                onClick={() => {
                  changesStatus(item._id, "processing");
                }}
              >
                معالجة الطلب
              </button>

              <button
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => {
                  changesStatus(item._id, "shipped");
                }}
              >
                تحديد كمشحون
              </button>

              <button
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                onClick={() => {
                  changesStatus(item._id, "rejected");
                }}
              >
                رفض الطلب
              </button>
            </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusDetails(status) {
  const details = {
    pending: {
      label: "قيد الانتظار",
      className: "bg-amber-50 text-amber-700",
    },
    processing: {
      label: "قيد المعالجة",
      className: "bg-blue-50 text-blue-700",
    },
    shipped: {
      label: "تم الشحن",
      className: "bg-violet-50 text-violet-700",
    },
    delivered: {
      label: "تم التوصيل",
      className: "bg-emerald-50 text-emerald-700",
    },
    cancelled: {
      label: "ملغى",
      className: "bg-red-50 text-red-700",
    },
    rejected: {
      label: "مرفوض",
      className: "bg-red-50 text-red-700",
    },
  };

  return details[status] || {
    label: status || "غير معروف",
    className: "bg-slate-100 text-slate-600",
  };
}
