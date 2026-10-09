"use client";

import React, { useEffect, useState } from "react";
import AdminChart from "@/component/AdminCharts";

const icons = {
  dashboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  products: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="m3 8 9 5 9-5M3 12l9 5 9-5M3 16l9 5 9-5" />
    </svg>
  ),
  trend: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 6-7" />
      <path d="M16 7h4v4" />
    </svg>
  ),
  arrow: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

function Page() {
  const [stats, setStats] = useState(null);

  const fetchState = async () => {
    const res = await fetch("/api/admin/stats");
    const data = await res.json();
    setStats(data);
    console.log(data);
  };

  useEffect(() => {
    fetchState();
  }, []);

  if (!stats) {
    return (
      <div
        dir="rtl"
        className="admin-shell flex min-h-[calc(100vh-152px)] items-center justify-center"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-600 shadow-xl shadow-slate-900/5">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-100 border-t-cyan-500" />
          جاري تجهيز لوحة التحكم...
        </div>
      </div>
    );
  }

  const metricCards = [
    {
      label: "إجمالي المستخدمين",
      value: stats.totalUsers,
      note: "حساب مسجّل",
      icon: icons.users,
      tone: "cyan",
    },
    {
      label: "المنتجات النشطة",
      value: stats.totalProducts,
      note: "منتج في المتجر",
      icon: icons.products,
      tone: "violet",
    },
    {
      label: "إجمالي الطلبات",
      value: stats.order,
      note: "طلب مكتمل",
      icon: icons.trend,
      tone: "orange",
    },
    {
      label: "زيارات المتجر",
      value: stats.visits,
      note: "زيارة هذا الشهر",
      icon: icons.dashboard,
      tone: "green",
    },
  ];

  return (
    <div
      dir="rtl"
      className="admin-shell -mx-4 -my-6 min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <aside className="hidden rounded-[28px] bg-[#101a32] p-4 text-white shadow-2xl shadow-[#101a32]/15 lg:block">
          <div className="mb-9 flex items-center gap-3 px-3 pt-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#b7f5e7] text-lg font-black text-[#10233b]">
              N
            </span>
            <div>
              <p className="text-sm font-bold tracking-wide">NEXT PRO</p>
              <p className="mt-0.5 text-[10px] text-slate-400">ADMIN CONSOLE</p>
            </div>
          </div>
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-slate-500">
            القائمة الرئيسية
          </p>
          <nav className="space-y-2">
            <a
              href="#overview"
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 text-sm font-semibold text-[#b7f5e7] ring-1 ring-white/10"
            >
              {icons.dashboard}
              <span>نظرة عامة</span>
            </a>
            <a
              href="/dashboard/admin/products"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {icons.products}
              <span>المنتجات</span>
            </a>
            <a
              href="#users"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {icons.users}
              <span>المستخدمون</span>
            </a>
          </nav>
          <div className="mt-28 rounded-2xl bg-[#1c2a49] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f9b36d] text-[#45291b]">
              ✦
            </div>
            <p className="text-xs font-bold">كل شيء تحت السيطرة</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-400">
              تابع أداء متجرك واتخذ قرارات أسرع.
            </p>
          </div>
        </aside>

        <main id="overview" className="min-w-0">
          <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#11a994]">
                <span className="h-2 w-2 rounded-full bg-[#11c2a5] shadow-[0_0_0_5px_rgba(17,194,165,0.12)]" />{" "}
                النظام يعمل بكفاءة
              </div>
              <h1 className="text-3xl font-black tracking-tight text-[#15213b] sm:text-4xl">
                صباح الخير، أيها المدير{" "}
                <span className="text-[#f29b5c]">✦</span>
              </h1>
              <p className="mt-2 text-sm text-[#72809a]">
                إليك ملخص متجرك وأهم الأرقام لليوم.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start rounded-2xl border border-[#e2e9f2] bg-white px-3 py-2 shadow-sm sm:self-auto">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9faf6] text-xs font-black text-[#129c89]">
                AD
              </span>
              <div>
                <p className="text-xs font-bold text-[#17243f]">حساب المدير</p>
                <p className="text-[10px] text-[#8c99ad]">آخر دخول: الآن</p>
              </div>
              <span className="mr-2 h-2 w-2 rounded-full bg-[#25c58d]" />
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => (
              <article
                key={card.label}
                className="metric-card rounded-[24px] border border-[#e5ebf3] bg-white p-5 shadow-[0_14px_40px_rgba(34,52,86,0.06)]"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className={`metric-icon ${card.tone}`}>
                    {card.icon}
                  </span>
                  <span className="rounded-full bg-[#ecfaf5] px-2.5 py-1 text-[10px] font-bold text-[#20a77f]">
                    + 12.5%
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#8290a6]">
                  {card.label}
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight text-[#17243f]">
                  {card.value}
                </p>
                <p className="mt-2 text-[11px] text-[#9aa6b8]">{card.note}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <article className="rounded-[28px] border border-[#e5ebf3] bg-white p-5 shadow-[0_14px_40px_rgba(34,52,86,0.05)] sm:p-6">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <h2 className="font-black text-[#17243f]">نظرة على الأداء</h2>
                  <p className="mt-1 text-xs text-[#8b98aa]">
                    حركة المتجر خلال آخر 7 أيام
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-[#e7edf4] px-3 py-2 text-[11px] font-bold text-[#718097] transition hover:bg-[#f7fafc]"
                >
                  هذا الأسبوع⌄
                </button>
              </div>
              <div className="w-full">
                <AdminChart data={stats.usersPerDay} />
              </div>
            </article>

            <article
              id="users"
              className="relative overflow-hidden rounded-[28px] bg-[#15233f] p-6 text-white shadow-[0_18px_45px_rgba(21,35,63,0.18)]"
            >
              <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full border-[18px] border-[#f7ad65]/20" />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-xl bg-white/10 p-2.5 text-[#b7f5e7]">
                    {icons.trend}
                  </span>
                  <span className="text-[10px] font-bold text-[#91a1ba]">
                    ملخص سريع
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-300">
                  معدل نمو المستخدمين
                </p>
                <p className="mt-2 text-5xl font-black tracking-tight text-[#b7f5e7]">
                  12.5<span className="text-2xl">%</span>
                </p>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-[#f7ad65]" />
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                  <span>الهدف الشهري</span>
                  <span className="font-bold text-white">72% مكتمل</span>
                </div>
              </div>
            </article>
          </section>

          <section className="mt-6 rounded-[28px] border border-[#e5ebf3] bg-white p-5 shadow-[0_14px_40px_rgba(34,52,86,0.05)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-[#17243f]">إجراءات سريعة</h2>
                <p className="mt-1 text-xs text-[#8b98aa]">
                  الوصول إلى أكثر المهام استخدامًا
                </p>
              </div>
              <a
                href="/dashboard/admin/products"
                className="flex items-center gap-2 text-xs font-bold text-[#119f8b]"
              >
                إدارة المنتجات {icons.arrow}
              </a>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <a
                href="/dashboard/admin/products"
                className="group flex items-center justify-between rounded-2xl bg-[#f2fbf9] p-4 transition hover:bg-[#e3f7f2]"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-[#263653]">
                  <span className="rounded-xl bg-white p-2 text-[#11ad98] shadow-sm">
                    {icons.products}
                  </span>
                  إضافة منتج جديد
                </span>
                <span className="text-[#9ab8b2] transition group-hover:-translate-x-1">
                  ←
                </span>
              </a>
              <a
                href="#users"
                className="group flex items-center justify-between rounded-2xl bg-[#fff7ef] p-4 transition hover:bg-[#fff0dc]"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-[#263653]">
                  <span className="rounded-xl bg-white p-2 text-[#ee9a55] shadow-sm">
                    {icons.users}
                  </span>
                  مراجعة المستخدمين
                </span>
                <span className="text-[#c5a98d] transition group-hover:-translate-x-1">
                  ←
                </span>
              </a>
              <a
                href="#overview"
                className="group flex items-center justify-between rounded-2xl bg-[#f4f3ff] p-4 transition hover:bg-[#ebeaff]"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-[#263653]">
                  <span className="rounded-xl bg-white p-2 text-[#8275d4] shadow-sm">
                    {icons.trend}
                  </span>
                  تقرير الأداء
                </span>
                <span className="text-[#a8a1cf] transition group-hover:-translate-x-1">
                  ←
                </span>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Page;
