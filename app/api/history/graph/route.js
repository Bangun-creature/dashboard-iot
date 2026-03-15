import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const textQuery = `
            SELECT 
                mg.name AS title, 
                DATE_FORMAT(hl.created_at, '%H:%i') AS time, 
                hl.value AS val,
                hl.device_id
            FROM history_logs hl
            JOIN meter_gauge mg ON hl.device_id = mg.id
            WHERE hl.category = 'sensor'
            ORDER BY hl.created_at ASC
        `;

        const [results] = await db.query(textQuery);

        // Logika Grouping untuk Recharts
        const groupedData = results.reduce((acc, current) => {
            let group = acc.find(item => item.title === `Graph of ${current.title}`);
            if (!group) {
                group = { title: `Graph of ${current.title}`, data: [] };
                acc.push(group);
            }
            group.data.push({ 
                time: current.time, 
                val: parseFloat(current.val) 
            });
            return acc;
        }, []);

        if (groupedData.length > 0) {
            return NextResponse.json({ 
                statusCode: 200, 
                payload: groupedData , // Bungkus ke .datas sesuai frontend kamu
                message: "Success get list history" 
            });
        } else {
            return NextResponse.json({ statusCode: 404, payload: [] , message: "No history found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ statusCode: 500, payload: [] , message: "Database Error" }, { status: 500 });
    }
}