import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function DELETE(request){
    try {
        const {id_rfidCard} = await request.json();

        // Cek apakah id rfid_card ada:
        const [result] = await db.query(`SELECT * FROM rfid WHERE id = ?`, [id_rfidCard]);

        if(result.length === 0){
            return NextResponse.json({
                statusCode: 404,
                message: `RFID Card Not Found!`
            }, {status: 404});
        }

        await db.query(`DELETE FROM rfid WHERE id = ?`, [id_rfidCard]);

        return NextResponse.json({
            statusCode: 200,
            message: `rfid_card dengan id: ${id_rfidCard} berhasil dihapus!!`
        });

    } catch (error) {
        return NextResponse.json({
            statusCode: 500,
            message: error.message
        }, {status: 500});
    }
}