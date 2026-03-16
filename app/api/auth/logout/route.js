import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ 
            statusCode: 200, 
            message: "Berhasil Logout" 
        });

        // Menghapus cookie dengan menimpanya menggunakan maxAge: 0
        response.cookies.set("session_token", "", {
            path: "/",
            maxAge: 0,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}