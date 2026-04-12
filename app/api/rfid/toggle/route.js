// app/api/rfid/toggle/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { rfid_code } = await request.json();

        // 1. Cek apakah rfid_code ada di database
        const [result] = await db.query(
            `SELECT * FROM rfid WHERE rfid_code = ?`, 
            [rfid_code]
        );

        if (result.length === 0) {
            return NextResponse.json({ 
                statusCode: 404, 
                message: 'RFID tidak terdaftar' 
            }, { status: 404 });
        }

        // 2. Toggle status (true → false, false → true)
        const currentStatus = result[0].status === 'true' || result[0].status === true;
        const newStatus = !currentStatus ? 'true' : 'false';

        await db.query(
            `UPDATE rfid SET status = ?, updated_at = NOW() WHERE rfid_code = ?`,
            [newStatus, rfid_code]
        );

        return NextResponse.json({ 
            statusCode: 200, 
            message: `Status berhasil diubah ke ${newStatus}` 
        });

    } catch (err) {
        return NextResponse.json({ 
            statusCode: 500, 
            message: err.message 
        }, { status: 500 });
    }
}