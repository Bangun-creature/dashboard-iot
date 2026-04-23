import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE() {
  try {
    // query delete ALL
    // await db.query(`DELETE FROM rfid`);
    return NextResponse.json({
      statusCode: 200,
      message: `berhasil menghapus semua rfid card!!`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
