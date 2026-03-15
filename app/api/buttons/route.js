import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [result] = await db.query(`SELECT * FROM buttons`);
        if (result.length >= 0) {
            const message = result.length > 0 ? "succesfull to get data from table" : "succesfull to get data from empty table";
            return NextResponse.json({ statusCode: 200, payload: result, message });
        }
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: "fail to get data from table" }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        const { name, pin_number, status } = await request.json();
        const realStatus = status ? 1 : 0;
        const [result] = await db.query('INSERT INTO buttons (name, pin_number, status) VALUES (?, ?, ?)', [name, pin_number, realStatus]);
        
        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: result, message: "Successfull add button to button list" });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: "Faill add button to button list" }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}