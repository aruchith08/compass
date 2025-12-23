
import { RoadmapItem, DailyTask, HomeworkTask, LinguaSession } from '../types';
import { ROADMAP_DATA } from '../data';

interface UserProfile {
  roadmap: RoadmapItem[];
  dailyTasks: DailyTask[];
  homeworkTasks: HomeworkTask[];
  linguaSession?: LinguaSession;
  lastActive: string;
  lastResetDate: string;
}

const normalizeUsername = (username: string) => username.toLowerCase().trim().replace(/\s+/g, '_');

export const api = {
  // Local Browser "Login" / Profile Initialization
  async login(username: string): Promise<{ 
    roadmap: RoadmapItem[], 
    dailyTasks: DailyTask[], 
    homeworkTasks: HomeworkTask[],
    linguaSession: LinguaSession | null
  }> {
    const userId = normalizeUsername(username);
    const storageKey = `compass_profile_${userId}`;
    
    try {
      const savedData = localStorage.getItem(storageKey);

      if (savedData) {
        const data = JSON.parse(savedData) as UserProfile;
        const userItems = data.roadmap || [];
        
        // SYNC LOGIC with source data (data.ts)
        const userItemsMap = new Map(userItems.map(i => [i.id, i]));
        
        const finalRoadmap = ROADMAP_DATA.map(defaultItem => {
          const userItem = userItemsMap.get(defaultItem.id);
          if (userItem) {
            // Preserve user status while updating metadata and filters from source
            return {
              ...userItem,
              resource_name: defaultItem.resource_name || userItem.resource_name,
              resource_link: defaultItem.resource_link || userItem.resource_link,
              description: defaultItem.description || userItem.description,
              category: defaultItem.category || userItem.category,
              priority: defaultItem.priority || userItem.priority,
              role_alignment: defaultItem.role_alignment || userItem.role_alignment // Ensure alignment updates from source
            };
          } else {
            return { ...defaultItem };
          }
        });

        return {
          roadmap: finalRoadmap,
          dailyTasks: data.dailyTasks || [],
          homeworkTasks: data.homeworkTasks || [],
          linguaSession: data.linguaSession || null
        };
      } else {
        // New local user: Initialize with defaults
        const initialRoadmap = JSON.parse(JSON.stringify(ROADMAP_DATA));
        const initialProfile: UserProfile = {
          roadmap: initialRoadmap,
          dailyTasks: [], 
          homeworkTasks: [],
          lastActive: new Date().toISOString(),
          lastResetDate: new Date().toDateString()
        };
        
        localStorage.setItem(storageKey, JSON.stringify(initialProfile));
        return {
          roadmap: initialRoadmap,
          dailyTasks: [],
          homeworkTasks: [],
          linguaSession: null
        };
      }
    } catch (error) {
      console.error("Local storage login error:", error);
      throw error;
    }
  },

  // Save full profile progress to browser storage
  async saveProfile(username: string, data: Partial<UserProfile>): Promise<void> {
    const userId = normalizeUsername(username);
    const storageKey = `compass_profile_${userId}`;
    
    try {
      const existing = localStorage.getItem(storageKey);
      const profile = existing ? JSON.parse(existing) : {};
      
      const updatedProfile = {
        ...profile,
        ...data,
        lastActive: new Date().toISOString()
      };

      localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    } catch (err) {
      console.error("Browser save failed (likely quota exceeded):", err);
    }
  }
};
