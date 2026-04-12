import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function DELETE(request){
    try {
        const {id_rfidCard} = await request.json();

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