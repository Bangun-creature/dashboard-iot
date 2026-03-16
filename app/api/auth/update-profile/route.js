import { NextResponse } from "next/server";
import db from '@/lib/db';
import WriteFi

export default function POST(request){
    try {
        const formData = await request.formData();

        const username = formData.get('username');
        const email = formData.get('email');

        const file = formData.get('image');

        let imagePathForDb = null;
        if(file && typeof file !== 'string'){
            const bytes = await file.arrayBuffer();
            const buffere = Buffer.from(bytes);

            const filename = file.name;

            const storagePath = path.join(process.cwd(), '/public/uploads', filename);
            await writerFile(storagePath, buffer)
        }
    } catch (error) {
        
    }
}