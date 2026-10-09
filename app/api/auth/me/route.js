import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET() {
    try{
        const cookiesStore = await cookies();

        const token  = await cookiesStore.get('token')?.value;

        if(!token){
            return NextResponse.json(null);
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        await connectDB();

        const user = await User.findById(decoded.id).select("-password");

        return NextResponse.json(user);
    }catch{
        return NextResponse.json(null);
    }
}