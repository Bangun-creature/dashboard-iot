import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(){
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session_token")?.value;

        if(!sessionToken){
            return NextResponse.json({message: "Not Authenticated"}, {status: 401});
        }

        const textQuery = `SELECT * FROM users WHERE username = ?`
        const [users] = await db.query(textQuery, [sessionToken]);

        if(users.length === 0){
            return NextResponse.json({message: "Users not found"}, {status: 404});
        }

        return NextResponse.json({user: users[0]});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}