"use client";

import Link from "next/link";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

function Page() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      setMessage({
        text: response.ok ? "تم إنشاء حسابك بنجاح." : data.message,
        type: response.ok ? "success" : "error",
      });

      if (response.ok) setForm(initialForm);
    } catch {
      setMessage({
        text: "تعذر الاتصال بالخادم. حاول مرة أخرى.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      dir="rtl"
      className="relative isolate flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden py-10 sm:py-16"
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)] backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-slate-950 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              مساحة آمنة لبدايتك
            </span>
            <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight">
              ابدأ رحلتك
              <br />
              مع NextPro
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
              أنشئ حسابك الآن واستمتع بتجربة منظمة وسريعة تناسب أهدافك.
            </p>
          </div>
          <p className="text-xs text-slate-400">بياناتك محفوظة بتشفير وأمان.</p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold text-cyan-600">مرحباً بك</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              أنشئ حسابك الجديد
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              املأ البيانات التالية للانضمام إلينا.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                الاسم الكامل
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="مثال: أحمد محمد"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="name@example.com"
                dir="ltr"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="6 أحرف على الأقل"
                dir="ltr"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            {message.text && (
              <p
                role="alert"
                className={`rounded-xl px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  جارٍ إنشاء الحساب...
                </>
              ) : (
                "إنشاء الحساب"
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/Login"
              className="font-bold text-cyan-700 transition hover:text-cyan-900"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Page;
