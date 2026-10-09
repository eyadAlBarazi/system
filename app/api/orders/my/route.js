import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookiesStore = await cookies();

    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();

    const orders = await Order.find({
      user: decoded.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
