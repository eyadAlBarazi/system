import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Notification from "@/models/Notification";

export async function GET() {
    try{
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if(!token){
            return NextResponse.json([],{status:200})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        await connectDB();

        const notification = await Notification.find({
            user:decoded.id,
        }).sort({createdAt:-1})

        return NextResponse.json(notification);
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"server error"},{status:500})
    }
}