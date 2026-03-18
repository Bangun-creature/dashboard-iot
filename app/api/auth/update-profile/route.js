import { NextResponse } from "next/server";
import path from "path";
import db from '@/lib/db';
import { writeFile } from "fs";

export async function POST(request){
    try {
        const formData = await request.formData();

        const username = formData.get('username');
        const email = formData.get('email');
        const id = formData.get('id');

        const file = formData.get('image');

        if(!id){
            return NextResponse.json({error: `User ID required`}, {status: 400});
        }

        let imagePathForDb = null;
        if(file && typeof file !== 'string' && file.size > 0){
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = file.name.replace(/\s+/g, '-');

            const storagePath = path.join(process.cwd(), '/public/uploads', filename);
            await writeFile(storagePath, buffer);
            imagePathForDb = `/uploads/${filename}`;
        }

        // query
        let textQuery;
        let values;

        if(imagePathForDb){
            textQuery = `UPDATE users SET username = ?, email = ?, image =  ? WHERE id = ?`;
            values = [username, email, imagePathForDb, id];
        } else {
            textQuery = `UPDATE users SET username = ?, email = ? WHERE id = ?`;
            values = [username, email, id];
        }

        await db.query(textQuery, values);

        return NextResponse.json({
            message: `Profile updated successfully`
        }, {status: 200});
        
    } catch (error) {
        console.error(`API Error: ${error}`);
        return NextResponse.json({
            error: `Failed to update profile`
        }, {status: 500})
    }
}