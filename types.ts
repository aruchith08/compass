
export type Role = "AI/ML Engineer" | "Data Scientist" | "Data Analyst" | "AI Security Officer" | "Full Stack Developer" | "All Roles";

export type Status = "To Do" | "In Progress" | "Completed" | "Revisit";

export type Priority = "High" | "Medium" | "Low";

export type Category = "Programming" | "Mathematics" | "Computer Fundamentals" | "Cybersecurity" | "Data Analysis" | "Machine Learning" | "Deep Learning" | "Web Development" | "Projects" | "Career" | "Interview Prep" | "MLOps" | "Soft Skills";

export interface RoadmapItem {
  id: string;
  year: number;
  name: string;
  description?: string;
  category: Category;
  priority: Priority;
  status: Status;
  role_alignment: Role[];
  resource_name?: string;
  resource_link?: string;
  is_project: boolean;
  is_output: boolean;
}

export interface User {
  username: string;
}

export interface DailyTask {
  id: string;
  text: string;
  completed: boolean;
  isFixed: boolean;
}

export interface HomeworkTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoadmapContextType {
  items: RoadmapItem[];
  user: User | null;
  theme: 'dark' | 'light';
  login: (username: string) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
  toggleStatus: (id: string, newStatus: Status) => void;
  getCompletionPercentage: (role?: Role) => number;
  
  // Daily & Homework Features
  dailyTasks: DailyTask[];
  homeworkTasks: HomeworkTask[];
  toggleDailyTask: (id: string) => void;
  addDailyTask: (text: string) => void;
  deleteDailyTask: (id: string) => void;
  toggleHomeworkTask: (id: string) => void;
  addHomeworkTask: (text: string) => void;
  deleteHomeworkTask: (id: string) => void;
  
  // Notifications
  notificationPermission: NotificationPermission;
  requestNotificationPermission: () => Promise<void>;
}
