import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request, context) {
    try {
        const params = await context.params;
        const id = params.id;
        console.log(`ini id button: ${JSON.stringify(id)}`);
        const { status } = await request.json();
        // const newStatus = status ? 1 : 0;
        const newStatus = Number(status);
        const [result] = await db.query(`UPDATE buttons SET status = ?, updated_at = NOW() WHERE id = ?`, [newStatus, id]);

        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: result, message: `Now button with id = ${id}, status: ${newStatus}` });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: `Fail to update status button` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}