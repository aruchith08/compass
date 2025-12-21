
import { RoadmapItem, DailyTask, HomeworkTask } from '../types';
import { ROADMAP_DATA } from '../data';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface UserProfile {
  roadmap: RoadmapItem[];
  dailyTasks: DailyTask[];
  homeworkTasks: HomeworkTask[];
  lastActive: string;
  lastResetDate: string;
}

const normalizeUsername = (username: string) => username.toLowerCase().trim().replace(/\s+/g, '_');

export const api = {
  // Login or Sign Up (Firestore)
  async login(username: string): Promise<{ 
    roadmap: RoadmapItem[], 
    dailyTasks: DailyTask[], 
    homeworkTasks: HomeworkTask[] 
  }> {
    const userId = normalizeUsername(username);
    const userRef = doc(db, "users", userId);
    
    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        const userItems = data.roadmap || [];
        
        // SYNC LOGIC: Check for new roadmap items added to the source code
        const userItemIds = new Set(userItems.map(i => i.id));
        const newItems = ROADMAP_DATA.filter(defaultItem => !userItemIds.has(defaultItem.id));
        
        let finalRoadmap = userItems;
        if (newItems.length > 0) {
          finalRoadmap = [...userItems, ...newItems];
          await updateDoc(userRef, { 
            roadmap: finalRoadmap,
            lastActive: new Date().toISOString()
          });
        }

        return {
          roadmap: finalRoadmap,
          dailyTasks: data.dailyTasks || [],
          homeworkTasks: data.homeworkTasks || []
        };
      } else {
        // New cloud user: Initialize with defaults
        const initialProfile: UserProfile = {
          roadmap: JSON.parse(JSON.stringify(ROADMAP_DATA)),
          dailyTasks: [], // Will be populated by fixed tasks in App.tsx
          homeworkTasks: [],
          lastActive: new Date().toISOString(),
          lastResetDate: new Date().toDateString()
        };
        
        await setDoc(userRef, initialProfile);
        return {
          roadmap: initialProfile.roadmap,
          dailyTasks: [],
          homeworkTasks: []
        };
      }
    } catch (error: any) {
      console.error("Firestore error details:", error);
      if (error.code === 'permission-denied') {
        throw new Error("PERMISSION_DENIED: Please check your Firestore Security Rules in Firebase Console. Ensure 'users' collection allows read/write.");
      }
      throw error;
    }
  },

  // Save full profile progress
  async saveProfile(username: string, data: Partial<UserProfile>): Promise<void> {
    const userId = normalizeUsername(username);
    const userRef = doc(db, "users", userId);
    
    try {
      await updateDoc(userRef, {
        ...data,
        lastActive: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Cloud save failed:", err);
      // We don't throw here to avoid interrupting the user experience during autosave, 
      // but we log the permission issue.
    }
  }
};
