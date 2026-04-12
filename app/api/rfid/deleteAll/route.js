import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function DELETE(){
     try {
        // await db.query(`DELETE FROM rfid WHERE id = ?`, [id_rfidCard]);

        return NextResponse.json({
            statusCode: 200,
            message: `berhasil menghapus semua rfid card!!`
        });

    } catch (error) {
        return NextResponse.json({
            statusCode: 500,
            message: error.message
        }, {status: 500});
    }
}