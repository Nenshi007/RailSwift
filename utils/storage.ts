
import { Booking, SearchQuery } from '../types';

const KEYS = {
  BOOKINGS: 'railswift_bookings',
  RECENT_SEARCHES: 'railswift_recent_searches',
  USERS: 'railswift_users',
  CURRENT_USER: 'railswift_current_user',
  AUTH: 'railswift_auth'
};

export interface User {
  name: string;
  email: string;
  password?: string;
  avatar?: string | null;
}

export const storage = {
  // Booking helpers
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },
  getCurrentUserBookings: (): Booking[] => {
    const user = storage.getCurrentUser();
    if (!user) return [];
    return storage.getBookings().filter(b => b.userEmail === user.email);
  },
  addBooking: (booking: Omit<Booking, 'userEmail'>) => {
    const user = storage.getCurrentUser();
    const fullBooking: Booking = {
      ...booking,
      userEmail: user?.email || 'guest'
    };
    const current = storage.getBookings();
    const updated = [fullBooking, ...current];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
  },
  cancelBooking: (bookingId: string) => {
    const current = storage.getBookings();
    const updated = current.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
    );
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
  },

  // Search helpers
  saveSearch: (query: SearchQuery) => {
    const data = localStorage.getItem(KEYS.RECENT_SEARCHES);
    const searches: SearchQuery[] = data ? JSON.parse(data) : [];
    const updated = [query, ...searches.slice(0, 4)];
    localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(updated));
  },
  getRecentSearches: (): SearchQuery[] => {
    const data = localStorage.getItem(KEYS.RECENT_SEARCHES);
    return data ? JSON.parse(data) : [];
  },

  // User Auth helpers
  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  registerUser: (user: User) => {
    const users = storage.getUsers();
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return true;
  },
  loginUser: (email: string, password: string): User | null => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPass } = user;
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));
      localStorage.setItem(KEYS.AUTH, 'true');
      return userWithoutPass;
    }
    return null;
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  updateCurrentUser: (updates: Partial<User>) => {
    const current = storage.getCurrentUser();
    if (!current) return;
    const updated = { ...current, ...updates };
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(updated));
    
    // Also update in master users list
    const users = storage.getUsers();
    const index = users.findIndex(u => u.email === current.email);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
    return updated;
  },
  logout: () => {
    localStorage.removeItem(KEYS.CURRENT_USER);
    localStorage.setItem(KEYS.AUTH, 'false');
  }
};
