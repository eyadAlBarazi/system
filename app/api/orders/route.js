import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookiesStore = await cookies();

    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { items, totalPrice } = await req.json();

    if (!items || !totalPrice) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    await connectDB();

    const order = await Order.create({
      user: decoded.id,
      items,
      totalPrice,
      status: "pending",
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
