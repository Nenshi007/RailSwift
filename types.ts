
export interface Station {
  code: string;
  name: string;
  city: string;
}

export type TrainClassType = 'SL' | '3A' | '2A' | '1A' | 'CC' | 'EC' | '2S';

export interface TrainClass {
  type: TrainClassType;
  name: string;
  price: number;
  available: number;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  from: string;
  to: string;
  classes: TrainClass[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  idType: string;
  idNumber: string;
  seatPreference: string;
}

export interface Booking {
  id: string;
  userEmail: string; // Added to differentiate bookings between users
  train: Train;
  selectedClass: TrainClass;
  passengers: Passenger[];
  date: string;
  totalFare: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  bookingDate: string;
}

export interface SearchQuery {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'Meal' | 'Snack' | 'Beverage';
  image: string;
  description: string;
}
