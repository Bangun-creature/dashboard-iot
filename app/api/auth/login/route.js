import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function POST(request){
    try {
        const {username, password} = await request.json();

        const [result] = await db.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password]);

        if(result.length > 0){
            const response = NextResponse.json({ statusCode: 200, message: `Success login to your account` });

            // LOGIKANYA: Tanam Cookie bernama 'session_token'
            // Di dunia nyata, ini harusnya berisi JWT Token yang terenkripsi
            response.cookies.set("session_token", username, {
                httpOnly: true, // Tidak bisa dimanipulasi JavaScript (Aman)
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // Berlaku 1 hari
                path: "/",
            });

            return response;
        } else {
            return NextResponse.json({ statusCode: 401, payload: [], message: `Username or password is wrong` }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    }
}