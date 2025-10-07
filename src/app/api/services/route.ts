import { NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const services = [
  { id: '1', name: 'Pánsky strih', duration: 30, price: 25 },
  { id: '2', name: 'Dámsky strih', duration: 60, price: 50 },
  { id: '3', name: 'Farbenie vlasov', duration: 120, price: 80 },
  { id: '4', name: 'Spoločenský účes', duration: 90, price: 60 },
];

export async function GET() {
  // In a real app, you might have more complex logic, like fetching from a database.
  // For now, we'll just return the mock data.
  return NextResponse.json(services);
}
