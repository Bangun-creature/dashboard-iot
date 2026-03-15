import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const id = params.id
        const [result] = await db.query(`DELETE FROM buttons WHERE id = ?`, [id]);
        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: id, message: `Success deleted button id: ${id}` });
        }
        return NextResponse.json({ statusCode: 400, payload: id, message: `Fail deleted button id` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}