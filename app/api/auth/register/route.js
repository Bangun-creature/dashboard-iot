import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // 1. Validasi input kosong
        if (!username || !password) {
            return NextResponse.json({ message: "Username dan Password wajib diisi" }, { status: 400 });
        }

        // 2. Cek apakah username sudah ada di MySQL
        const [existingUser] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);

        if (existingUser.length > 0) {
            return NextResponse.json({ message: "Username sudah terdaftar, gunakan nama lain" }, { status: 400 });
        }

        // 3. Simpan user baru ke database
        // Catatan: Sangat disarankan pakai library 'bcrypt' untuk hash password agar aman
        await db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);

        return NextResponse.json({ 
            statusCode: 201, 
            message: "User berhasil dibuat! Silahkan login." 
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}