import { NextResponse } from 'next/server';
import { Redis } from 'ioredis'; // Assuming Redis is used via ioredis
import { ChatInput } from '../lib/types'; // Example type import

const redis = new Redis();

export async function POST(request: Request) {
    try {
        const data: ChatInput = await request.json();
        if (!data.message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }
        // Handle message and integrate Redis
        await redis.set('chat_message', data.message);
        return NextResponse.json({ success: true, message: 'Message processed' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}