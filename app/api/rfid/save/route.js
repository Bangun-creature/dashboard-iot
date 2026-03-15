import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { username, rfid_code, status } = await request.json();
        const [result] = await db.query(`INSERT INTO rfid (username, rfid_code, status) VALUES (?, ?, ?)`, [username, rfid_code, status]);
        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: rfid_code, message: "Successfull to add new rfid" });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: `Fail to add new rfid` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}