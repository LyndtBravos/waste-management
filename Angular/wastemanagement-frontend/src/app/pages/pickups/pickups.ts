export interface Pickup {
  id?: number;
  wasteType: string;
  pickupDate: string;
  address: string;
  notes?: string;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}