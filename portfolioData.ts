
import { RoadmapItem } from './types';

export const PORTFOLIO_DATA_ITEMS: RoadmapItem[] = [
  // ==================== YEAR 1 PROJECTS ====================
  {
    id: "Y1_PR01", year: 1, name: "Python Calculator", category: "Projects", priority: "Medium", status: "To Do", role_alignment: ["All Roles"],
    description: "Build a functional calculator with basic arithmetic and error handling. Push to GitHub.",
    is_project: true, is_output: true, time_estimate: "1 week"
  },
  {
    id: "Y1_PR_FS1", year: 1, name: "Personal Portfolio Site", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Responsive portfolio website using HTML, CSS, and Vanilla JS to showcase your identity.",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "Y1_PR02", year: 1, name: "Student Management System", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "A Python/C based CRUD app to manage student records and handle data persistence.",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },

  // ==================== YEAR 2 PROJECTS ====================
  {
    id: "Y2_PR01", year: 2, name: "Sales Data Analysis", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Data Analyst", "Data Scientist"],
    description: "End-to-end EDA and visualization on a real sales dataset. Clean messy data using Pandas.",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "Y2_PR04", year: 2, name: "House Price Prediction", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "A regression project using Scikit-learn to predict property prices based on features.",
    is_project: true, is_output: true, time_estimate: "3 weeks"
  },
  {
    id: "Y2_PR_FS01", year: 2, name: "E-Commerce Frontend", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "A React-based storefront with shopping cart, filtering, and routing capabilities.",
    is_project: true, is_output: true, time_estimate: "4 weeks"
  },

  // ==================== YEAR 3 PROJECTS & CAREER ====================
  {
    id: "Y3_IN01", year: 3, name: "Summer Internship (Targeting AI/Dev)", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Secure a minimum 2-month professional internship to build industry experience.",
    is_project: false, is_output: true, time_estimate: "8-12 weeks"
  },
  {
    id: "Y3_PR01", year: 3, name: "Image Classification System", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Deep Learning project using CNNs (e.g., Plant Disease or Object Detection).",
    is_project: true, is_output: true, time_estimate: "4 weeks"
  },
  {
    id: "Y3_PR_FS01", year: 3, name: "Full Stack MERN Blog App", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Complete web application with Auth, MongoDB storage, and dynamic dashboard.",
    is_project: true, is_output: true, time_estimate: "5 weeks"
  },

  // ==================== YEAR 4 CAPSTONES & CAREER ====================
  {
    id: "Y4_PR_E2E", year: 4, name: "End-to-End GenAI SaaS", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Full stack GenAI app. React + FastAPI + LLM Integration + Vector Database.",
    is_project: true, is_output: true, time_estimate: "6 weeks"
  },
  {
    id: "Y4_MP01", year: 4, name: "Major Capstone Project", category: "Projects", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Your final undergraduate degree project. Must solve a complex real-world problem.",
    is_project: true, is_output: true, time_estimate: "16 weeks"
  },
  {
    id: "Y4_FF01", year: 4, name: "Select Specialization Track", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Finalize your niche: ML Engineering, AI Security, or Product Development.",
    is_project: false, is_output: true
  },
  {
    id: "Y4_CR01", year: 4, name: "Resume & Portfolio Polishing", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Complete your online presence. Optimize LinkedIn, GitHub, and your personal site.",
    is_project: false, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "G_SS04", year: 0, name: "Build Proof of Work", category: "Career", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Continuous effort to commit to GitHub, compete on Kaggle, and document learning.",
    is_project: false, is_output: true
  }
];
