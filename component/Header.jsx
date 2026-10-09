"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const cartCount = cart.reduce(
    (count, item) => count + (Number(item.quantity) || 0),
    0,
  );

  

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data || null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      clearCart({ preserveStorage: true });
      localStorage.removeItem("cart:guest");
      router.push("/Login");
    }
  };

  const isAdmin = user?.role === "admin";
  const dashboardHref = isAdmin ? "/dashboard/admin" : "/dashboard/user";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 mb-10 w-full border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2 text-xl font-black tracking-tight text-slate-900 transition-opacity hover:opacity-80 sm:text-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm text-white shadow-lg shadow-slate-900/15">
              NP
            </span>
            <span>Next Pro</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-2xl bg-slate-50 p-1 text-sm font-semibold text-slate-600 md:flex">
            <Link
              href="/"
              className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
            >
              الرئيسية
            </Link>
            {!loading && user && (
              <Link
                href={dashboardHref}
                className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
              >
                {isAdmin ? "لوحة الإدارة" : "لوحتي"}
              </Link>
            )}
            {!loading && user && (
              <Link
                href="/profile"
                className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
              >
                الملف الشخصي
              </Link>
            )}
            {!loading && isAdmin && (
              <Link
                href="/dashboard/admin/products"
                className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
              >
                المنتجات
              </Link>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <CartLink count={cartCount} />
            {user && (
              <Link
                href="/notifications"
                className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                الإشعارات
              </Link>
            )}
            {loading ? (
              <span
                className="h-10 w-24 animate-pulse rounded-xl bg-slate-100"
                aria-label="جار التحميل"
              />
            ) : user ? (
              <>
                <div className="flex items-center gap-2 text-right">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                  <div className="leading-tight">
                    <p className="max-w-28 truncate text-sm font-bold text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isAdmin ? "مدير النظام" : "مستخدم"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-slate-950"
                >
                  إنشاء حساب
                </Link>
                <Link
                  href="/Login"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:bg-emerald-600"
                >
                  دخول
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CartLink count={cartCount} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden">
          <Link
            href="/card"
            onClick={closeMobileMenu}
            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <span>السلة</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700">
              {cartCount}
            </span>
          </Link>
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            الرئيسية
          </Link>
          {!loading && user && (
            <>
              <Link
                href={dashboardHref}
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                {isAdmin ? "لوحة الإدارة" : "لوحتي"}
              </Link>
              <Link
                href="/profile"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                الملف الشخصي
              </Link>
              <Link
                href="/notifications"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                الإشعارات
              </Link>
              {isAdmin && (
                <Link
                  href="/dashboard/admin/products"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  إدارة المنتجات
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="mt-2 w-full rounded-xl border border-red-100 px-3 py-3 text-right text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                تسجيل الخروج
              </button>
            </>
          )}
          {!loading && !user && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
              >
                إنشاء حساب
              </Link>
              <Link
                href="/Login"
                onClick={closeMobileMenu}
                className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white"
              >
                دخول
              </Link>
            </div>
          )}
          {loading && (
            <div className="mt-2 h-11 animate-pulse rounded-xl bg-slate-100" />
          )}
        </div>
      )}
    </header>
  );
}

function CartLink({ count }) {
  return (
    <Link
      href="/card"
      aria-label={`السلة، ${count} منتج`}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1 2.5A1.5 1.5 0 0 0 7.8 17H18m-8.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm9 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

export default Header;
