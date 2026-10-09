import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
    const cookiesStore = await cookies();

    cookiesStore.delete('token');

    return NextResponse.redirect(
        new URL("/Login","http://localhost:3000")
    )
}