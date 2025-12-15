
import { RoadmapItem } from '../types';
import { ROADMAP_DATA } from '../data';

const STORAGE_KEY = 'roadmap_local_data_v1';

interface CloudData {
  users: {
    [username: string]: {
      items: RoadmapItem[];
      lastActive: string;
    }
  }
}

const getCloudData = (): CloudData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: {} };
};

const saveCloudData = (data: CloudData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const api = {
  // Login or Sign Up (Auto-detect)
  async login(username: string): Promise<RoadmapItem[]> {
    // No delay needed for local storage
    const db = getCloudData();
    const normalizedUser = username.toLowerCase().trim();

    if (db.users[normalizedUser]) {
      // User exists, return their data
      return db.users[normalizedUser].items;
    } else {
      // New user, initialize with default data
      db.users[normalizedUser] = {
        items: JSON.parse(JSON.stringify(ROADMAP_DATA)), // Deep copy default data
        lastActive: new Date().toISOString()
      };
      saveCloudData(db);
      return db.users[normalizedUser].items;
    }
  },

  // Save progress
  async saveProgress(username: string, items: RoadmapItem[]): Promise<void> {
    const db = getCloudData();
    const normalizedUser = username.toLowerCase().trim();
    
    if (db.users[normalizedUser]) {
      db.users[normalizedUser].items = items;
      db.users[normalizedUser].lastActive = new Date().toISOString();
      saveCloudData(db);
    }
  }
};
