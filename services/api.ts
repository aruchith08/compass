
import { RoadmapItem, DailyTask, HomeworkTask, LinguaSession } from '../types';
import { ROADMAP_DATA } from '../data';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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
  // Login or Sign Up (Firestore)
  async login(username: string): Promise<{ 
    roadmap: RoadmapItem[], 
    dailyTasks: DailyTask[], 
    homeworkTasks: HomeworkTask[],
    linguaSession: LinguaSession | null
  }> {
    const userId = normalizeUsername(username);
    const userRef = doc(db, "users", userId);
    
    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        const userItems = data.roadmap || [];
        
        // SYNC LOGIC: 
        // 1. Add new items from source
        // 2. Patch existing items with new metadata (resources, descriptions, etc.) from source
        // while preserving user status and alignment changes.
        const userItemsMap = new Map(userItems.map(i => [i.id, i]));
        let hasChanges = false;

        const finalRoadmap = ROADMAP_DATA.map(defaultItem => {
          const userItem = userItemsMap.get(defaultItem.id);
          if (userItem) {
            // Check if user item needs metadata updates (e.g. newly added resources or descriptions)
            // We update if the default item has a resource that the user item lacks
            const needsUpdate = (defaultItem.resource_link && !userItem.resource_link) || 
                               (defaultItem.resource_name && !userItem.resource_name);
            
            if (needsUpdate) {
              hasChanges = true;
              return {
                ...userItem,
                resource_name: defaultItem.resource_name,
                resource_link: defaultItem.resource_link,
                description: defaultItem.description || userItem.description
              };
            }
            return userItem;
          } else {
            hasChanges = true;
            return { ...defaultItem };
          }
        });

        if (hasChanges) {
          await updateDoc(userRef, { 
            roadmap: finalRoadmap,
            lastActive: new Date().toISOString()
          });
        }

        return {
          roadmap: finalRoadmap,
          dailyTasks: data.dailyTasks || [],
          homeworkTasks: data.homeworkTasks || [],
          linguaSession: data.linguaSession || null
        };
      } else {
        // New cloud user: Initialize with defaults
        const initialProfile: UserProfile = {
          roadmap: JSON.parse(JSON.stringify(ROADMAP_DATA)),
          dailyTasks: [], 
          homeworkTasks: [],
          lastActive: new Date().toISOString(),
          lastResetDate: new Date().toDateString()
        };
        
        await setDoc(userRef, initialProfile);
        return {
          roadmap: initialProfile.roadmap,
          dailyTasks: [],
          homeworkTasks: [],
          linguaSession: null
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
    
    // Sanitize: Firestore doesn't like 'undefined'.
    // We filter out any keys where the value is undefined. 
    // Null is accepted by Firestore and represents a cleared field.
    const sanitizedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    try {
      await updateDoc(userRef, {
        ...sanitizedData,
        lastActive: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Cloud save failed:", err);
    }
  }
};
