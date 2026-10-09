"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-152px)] items-center justify-center bg-[#f5f7fb]"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white bg-white px-6 py-4 text-sm font-bold text-slate-500 shadow-xl shadow-slate-900/5">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-100 border-t-emerald-500" />
          جارٍ تجهيز ملفك...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-152px)] items-center justify-center bg-[#f5f7fb] px-4"
      >
        <section className="w-full max-w-lg rounded-[32px] border border-white bg-white p-8 text-center shadow-2xl shadow-slate-900/10 sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-black text-white">
            NP
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            ملفك الشخصي بانتظارك
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            سجّل دخولك للوصول إلى معلومات حسابك ولوحتك الشخصية.
          </p>
          <Link
            href="/Login"
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            تسجيل الدخول
          </Link>
        </section>
      </main>
    );
  }

  const initials = user.name?.slice(0, 2).toUpperCase() || "NP";
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
      })
    : "غير متوفر";

  return (
    <main
      dir="rtl"
      className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              مساحتك الخاصة
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              الملف الشخصي
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              تحكم بتفاصيل حسابك وتابع حضورك في Next Pro.
            </p>
          </div>
          <Link
            href={
              user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"
            }
            className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700"
          >
            العودة إلى اللوحة ←
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          <section className="relative overflow-hidden rounded-[32px] bg-[#10233b] p-6 text-white shadow-2xl shadow-[#10233b]/20 sm:p-8">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 text-3xl font-black shadow-xl backdrop-blur-sm">
                  {initials}
                </span>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1.5 text-[11px] font-bold text-emerald-200">
                  حساب نشط
                </span>
              </div>
              <h2 className="mt-10 text-2xl font-black">{user.name}</h2>
              <p className="mt-2 break-all text-sm text-slate-300">
                {user.email}
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold text-slate-400">
                  نوع الحساب
                </p>
                <p className="mt-1 font-bold text-emerald-200">
                  {user.role === "admin" ? "مدير النظام" : "عضو في Next Pro"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-600">
                  بيانات الحساب
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  معلوماتك الأساسية
                </h2>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-lg text-emerald-700">
                ✦
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="الاسم الكامل" value={user.name} />
              <InfoCard label="البريد الإلكتروني" value={user.email} />
              <InfoCard
                label="نوع العضوية"
                value={user.role === "admin" ? "مدير النظام" : "عضو"}
              />
              <InfoCard label="تاريخ الانضمام" value={joinedDate} />
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                ✓
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">حسابك محمي</p>
                <p className="mt-1 text-xs text-slate-500">
                  بياناتك الشخصية محفوظة بأمان.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-2 truncate text-sm font-bold text-slate-800">
        {value || "غير متوفر"}
      </p>
    </div>
  );
}

export default Profile;
