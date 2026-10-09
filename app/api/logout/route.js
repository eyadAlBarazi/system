import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req) {
    const cookiesStore = await cookies();

    cookiesStore.delete("token");

    return NextResponse.json(
        { message: "Logged out" },
        { status: 200 }
    );
}