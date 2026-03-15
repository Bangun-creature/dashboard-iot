import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [result] = await db.query(`SELECT * FROM buttons`);
        return NextResponse.json({ 
            statusCode: 200, 
            payload: result, 
            message: 'Success to get data buttons history' 
        });
    } catch (error) {
        return NextResponse.json({ statusCode: 404, payload: { datas: [] }, message: "Fail to get data buttons history" }, { status: 404 });
    }
}