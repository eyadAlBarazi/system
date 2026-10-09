import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
