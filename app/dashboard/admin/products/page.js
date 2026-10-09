"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      console.log(data);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handelCange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setEditingId(null);
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", price: "", description: "" });

    fetchProducts();
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "" });
    setEditingId(null);
  };

  const handelDelete = async (id) => {
    if (!confirm("هل انت منأكد من الحذف؟")) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const handelEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });

    setEditingId(product._id);
  };

  return (
    <div
      dir="rtl"
      className="min-h-[calc(100vh-80px)] bg-[#f5f7fb] -mx-4 -my-6 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-wide text-[#6172d6]">
              لوحة الإدارة / المخزون
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              إدارة المنتجات
            </h1>
            <p className="mt-2 text-sm text-[#718096]">
              أضف منتجاتك ونظّم تفاصيلها من مكان واحد.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#e4e8f0] bg-white px-4 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0ff] text-lg font-bold text-[#6172d6]">
              {products.length}
            </span>
            <div>
              <p className="text-xs text-[#8490a5]">إجمالي المنتجات</p>
              <p className="font-semibold text-[#172033]">منتج مسجّل</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
          <section className="rounded-3xl border border-[#e4e8f0] bg-white p-5 shadow-[0_12px_35px_rgba(30,42,74,0.06)] sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#172033]">
                  {editingId ? "تعديل المنتج" : "إضافة منتج"}
                </h2>
                <p className="mt-1 text-xs leading-5 text-[#8490a5]">
                  أدخل المعلومات الأساسية للمنتج.
                </p>
              </div>
              <span className="rounded-full bg-[#f1f3f8] px-3 py-1 text-xs font-medium text-[#718096]">
                {editingId ? "تعديل" : "جديد"}
              </span>
            </div>

            <form onSubmit={handelSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#39445a]">
                  اسم المنتج
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handelCange}
                  required
                  placeholder="مثال: سماعات لاسلكية"
                  className="w-full rounded-xl border border-[#e1e6ef] bg-[#fbfcfe] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#aab2c0] focus:border-[#6172d6] focus:ring-4 focus:ring-[#6172d6]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#39445a]">
                  السعر
                </span>
                <div className="relative">
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handelCange}
                    required
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#e1e6ef] bg-[#fbfcfe] px-4 py-3 pl-14 text-sm text-[#172033] outline-none transition placeholder:text-[#aab2c0] focus:border-[#6172d6] focus:ring-4 focus:ring-[#6172d6]/10"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8490a5]">
                    ر.س
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#39445a]">
                  الوصف
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handelCange}
                  required
                  rows="4"
                  placeholder="اكتب وصفًا مختصرًا للمنتج..."
                  className="w-full resize-none rounded-xl border border-[#e1e6ef] bg-[#fbfcfe] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#aab2c0] focus:border-[#6172d6] focus:ring-4 focus:ring-[#6172d6]/10"
                />
              </label>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#6172d6] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#6172d6]/20 transition hover:bg-[#5263c7]"
                >
                  {editingId ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-[#e1e6ef] px-4 py-3 text-sm font-semibold text-[#657187] transition hover:bg-[#f5f7fb]"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#e4e8f0] bg-white shadow-[0_12px_35px_rgba(30,42,74,0.06)]">
            <div className="flex flex-col gap-2 border-b border-[#edf0f5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-[#172033]">
                  قائمة المنتجات
                </h2>
                <p className="mt-1 text-xs text-[#8490a5]">
                  راجع منتجاتك وعدّل بياناتها بسرعة.
                </p>
              </div>
              <span className="w-fit rounded-full bg-[#eef8f2] px-3 py-1 text-xs font-semibold text-[#2f9560]">
                محدّث الآن
              </span>
            </div>

            {isLoading ? (
              <div className="flex min-h-64 items-center justify-center text-sm text-[#8490a5]">
                جارٍ تحميل المنتجات...
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3f8] text-2xl text-[#8490a5]">
                  +
                </div>
                <h3 className="font-bold text-[#39445a]">لا توجد منتجات بعد</h3>
                <p className="mt-1 text-sm text-[#8490a5]">
                  ابدأ بإضافة أول منتج من النموذج.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-right">
                  <thead className="bg-[#fbfcfe] text-xs font-semibold text-[#8490a5]">
                    <tr>
                      <th className="px-6 py-4">المنتج</th>
                      <th className="px-6 py-4">الوصف</th>
                      <th className="px-6 py-4">السعر</th>
                      <th className="px-6 py-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf0f5]">
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="group transition hover:bg-[#fbfcfe]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0ff] text-sm font-bold text-[#6172d6]">
                              {product.name?.charAt(0)}
                            </span>
                            <span className="font-semibold text-[#263248]">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="max-w-xs px-6 py-5 text-sm text-[#8490a5]">
                          <span className="line-clamp-2">
                            {product.description}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-5 text-sm font-bold text-[#263248]">
                          {product.price}{" "}
                          <span className="text-xs font-medium text-[#8490a5]">
                            ر.س
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handelEdit(product)}
                              className="rounded-lg px-3 py-2 text-xs font-semibold text-[#6172d6] transition hover:bg-[#eef0ff]"
                            >
                              تعديل
                            </button>
                            <button
                              type="button"
                              onClick={() => handelDelete(product._id)}
                              className="rounded-lg px-3 py-2 text-xs font-semibold text-[#d75b68] transition hover:bg-[#fff0f1]"
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
