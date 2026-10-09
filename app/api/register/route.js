import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All filds required" },
        { status: 400 },
      );
    }

    await connectDB();

    const userExista = await User.findOne({ email });

    if (userExista) {
      return NextResponse.json(
        { message: "User alreade exists" },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
