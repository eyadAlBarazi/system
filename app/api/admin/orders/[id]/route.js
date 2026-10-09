import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Notification from "@/models/Notification";



export async function PUT(req, { params }) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    const { id } = await params;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbideen" }, { status: 403 });
    }

    const { status } = await req.json();

    await connectDB();

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    await Notification.create({
      user: order.user,
      message: `تم تحديث حالة طلبك إلى: ${status}`,
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
