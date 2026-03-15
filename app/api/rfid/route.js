import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [result] = await db.query(`SELECT * FROM rfid`);
        return NextResponse.json({ statusCode: 200, payload: result, message: 'Success to get data rfid' });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: "Fail to get data rfid" }, { status: 400 });
    }
}