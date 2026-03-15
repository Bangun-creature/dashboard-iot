import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [result] = await db.query(`SELECT * FROM meter_gauge`);
        if (result.length > 0) {
            return NextResponse.json({ statusCode: 200, payload: result, message: 'Succes to get data metergauge.' });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: 'Fail to get data metergauge.' }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        const { name, value, unit, min, max } = await request.json();
        const [result] = await db.query(`INSERT INTO meter_gauge (name, value, unit, min, max) VALUES (?, ?, ?, ?, ?)`, [name, value, unit, min, max]);
        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: [], message: 'Succes to add data metergauge.' });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: "Fail to add data metergauge" }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}