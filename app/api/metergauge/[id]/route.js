import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const id = params.id;
        const [result] = await db.query(`DELETE FROM meter_gauge WHERE id = ?`, [id]);
        if (result.affectedRows > 0) {
            return NextResponse.json({ statusCode: 200, payload: [], message: 'Succes to delete data metergauge.' });
        }
        return NextResponse.json({ statusCode: 400, payload: [], message: `Fail to delete data metergauge` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ statusCode: 400, payload: [], message: err.message }, { status: 400 });
    }
}