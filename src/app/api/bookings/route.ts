import { NextResponse } from 'next/server';
import Cors from 'cors';
import { NextRequest } from 'next/server';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  origin: '*', // In production, you should restrict this to your PWA's domain
});

// Helper to run middleware
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Mock data - in a real app, this would come from a database
let bookings = [
    { id: '1', serviceId: '2', customerName: 'Jana Nováková', startTime: '2024-10-26T10:00:00Z', duration: 60 },
    { id: '2', serviceId: '1', customerName: 'Peter Kováč', startTime: '2024-10-26T11:30:00Z', duration: 30 },
];

export async function GET(req: NextRequest) {
    const response = NextResponse.json(bookings);
    // Manually setting CORS headers for GET requests
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}

export async function POST(req: NextRequest) {
  try {
    const newBooking = await req.json();

    // Basic validation
    if (!newBooking.serviceId || !newBooking.customerName || !newBooking.startTime) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const bookingWithId = { ...newBooking, id: `${Date.now()}` };
    bookings.push(bookingWithId);

    const response = NextResponse.json(bookingWithId, { status: 201 });
    // Manually setting CORS headers for POST responses
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;

  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function OPTIONS(req: NextRequest) {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}
