import Link from "next/link";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="relative -mx-4 -my-6 min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <section className="grid min-h-[calc(100vh-160px)] items-center gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              تجربة تسوق أبسط وأذكى
            </span>

            <h1 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              كل ما تحتاجه،
              <span className="block bg-linear-to-l from-emerald-600 via-teal-500 to-slate-900 bg-clip-text text-transparent">
                في مكان واحد.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              اكتشف منتجات مختارة بعناية، أضف ما يعجبك إلى سلتك، وتابع طلباتك
              بسهولة مع تجربة مريحة وسريعة من Next Pro.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                اكتشف المنتجات
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
              </Link>
              <Link
                href="/orders"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700"
              >
               انشاء حساب جديد 
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 border-t border-slate-200/80 pt-6 text-sm">
              <div>
                <p className="text-2xl font-black text-slate-900">24/7</p>
                <p className="mt-1 text-slate-500">تجربة متاحة دائمًا</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">سريع</p>
                <p className="mt-1 text-slate-500">تصفح وطلب بسهولة</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">آمن</p>
                <p className="mt-1 text-slate-500">حسابك وطلباتك محفوظة</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mr-auto">
            <div className="absolute -inset-5 rounded-[3rem] bg-linear-to-br from-emerald-300/30 to-blue-300/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-linear-to-br from-[#10233b] via-[#164e63] to-[#10b981] p-5 shadow-[0_30px_80px_rgba(16,53,73,0.24)] sm:p-7">
              <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

              <div className="relative mb-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-900">
                    NP
                  </span>
                  <span className="font-black text-white">Next Pro</span>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                  متجر متكامل
                </span>
              </div>

              <div className="relative rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-7">
                <p className="text-sm font-bold text-emerald-100">
                  ابدأ رحلتك اليوم
                </p>
                <p className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                  تسوق بثقة،
                  <br />
                  واستمتع بالاختيار.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2 space-x-reverse">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#164e63] bg-amber-200 text-xs font-black text-amber-800">
                      أ
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#164e63] bg-blue-200 text-xs font-black text-blue-800">
                      م
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#164e63] bg-pink-200 text-xs font-black text-pink-800">
                      س
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/70">
                    انضم إلى مجتمعنا
                  </p>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs text-white/60">منتجات متنوعة</p>
                  <p className="mt-1 text-lg font-black text-white">
                    اختيارات مميزة
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs text-white/60">تجربة سهلة</p>
                  <p className="mt-1 text-lg font-black text-white">
                    خطوة بخطوة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
