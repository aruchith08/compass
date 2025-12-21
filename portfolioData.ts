import { RoadmapItem } from './types';

export const PORTFOLIO_DATA_ITEMS: RoadmapItem[] = [
  // ==================== YEAR 1 PROJECTS ====================
  {
    id: "Y1_PR01", year: 1, name: "Python Calculator", category: "Projects", priority: "Medium", status: "To Do", role_alignment: ["All Roles"],
    description: "Build a functional calculator with basic arithmetic and error handling. Push to GitHub.",
    resource_name: "Real Python: Simple Calculator",
    resource_link: "https://realpython.com/python-simple-calculator/",
    is_project: true, is_output: true, time_estimate: "1 week"
  },
  {
    id: "Y1_PR_FS1", year: 1, name: "Personal Portfolio Site", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Responsive portfolio website using HTML, CSS, and Vanilla JS to showcase your identity.",
    resource_name: "web.dev: Build a Portfolio",
    resource_link: "https://web.dev/articles/build-a-portfolio",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "Y1_PR02", year: 1, name: "Student Management System", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "A Python/C based CRUD app to manage student records and handle data persistence.",
    resource_name: "GFG: Student Mgmt Project",
    resource_link: "https://www.geeksforgeeks.org/student-management-system-project-in-python/",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },

  // ==================== YEAR 2 PROJECTS ====================
  {
    id: "Y2_PR01", year: 2, name: "Sales Data Analysis", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Data Analyst", "Data Scientist"],
    description: "End-to-end EDA and visualization on a real sales dataset. Clean messy data using Pandas.",
    resource_name: "Kaggle: Sales Data Analysis",
    resource_link: "https://www.kaggle.com/code/ekrembayar/sales-data-analysis-and-visualization",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "Y2_PR04", year: 2, name: "House Price Prediction", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "A regression project using Scikit-learn to predict property prices based on features.",
    resource_name: "sklearn: Regression Tutorial",
    resource_link: "https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html",
    is_project: true, is_output: true, time_estimate: "3 weeks"
  },
  {
    id: "Y2_PR_FS01", year: 2, name: "E-Commerce Frontend", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "A React-based storefront with shopping cart, filtering, and routing capabilities.",
    resource_name: "FCC: Build React E-comm",
    resource_link: "https://www.freecodecamp.org/news/build-an-ecommerce-site-with-react/",
    is_project: true, is_output: true, time_estimate: "4 weeks"
  },

  // ==================== YEAR 3 PROJECTS & CAREER ====================
  {
    id: "Y3_IN01", year: 3, name: "Summer Internship (Targeting AI/Dev)", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Secure a minimum 2-month professional internship to build industry experience.",
    resource_name: "LinkedIn: Internship Search",
    resource_link: "https://www.linkedin.com/jobs/internship-jobs/",
    is_project: false, is_output: true, time_estimate: "8-12 weeks"
  },
  {
    id: "Y3_PR01", year: 3, name: "Image Classification System", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Deep Learning project using CNNs (e.g., Plant Disease or Object Detection).",
    resource_name: "TensorFlow: Image Classification",
    resource_link: "https://www.tensorflow.org/tutorials/images/classification",
    is_project: true, is_output: true, time_estimate: "4 weeks"
  },
  {
    id: "Y3_PR_FS01", year: 3, name: "Full Stack MERN Blog App", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Complete web application with Auth, MongoDB storage, and dynamic dashboard.",
    resource_name: "MongoDB: MERN Tutorial",
    resource_link: "https://www.mongodb.com/languages/mern-stack-tutorial",
    is_project: true, is_output: true, time_estimate: "5 weeks"
  },

  // ==================== YEAR 4 CAPSTONES & CAREER ====================
  {
    id: "Y4_PR_E2E", year: 4, name: "End-to-End GenAI SaaS", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Full stack GenAI app. React + FastAPI + LLM Integration + Vector Database.",
    resource_name: "LangChain: App Introduction",
    resource_link: "https://python.langchain.com/docs/get_started/introduction",
    is_project: true, is_output: true, time_estimate: "6 weeks"
  },
  {
    id: "Y4_MP01", year: 4, name: "Major Capstone Project", category: "Projects", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Your final undergraduate degree project. Must solve a complex real-world problem.",
    resource_name: "IEEE: Project Publications",
    resource_link: "https://ieeexplore.ieee.org/browse/periodicals/",
    is_project: true, is_output: true, time_estimate: "16 weeks"
  },
  {
    id: "Y4_FF01", year: 4, name: "Select Specialization Track", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Finalize your niche: ML Engineering, AI Security, or Product Development.",
    resource_name: "Coursera: Career Paths Guide",
    resource_link: "https://www.coursera.org/articles/machine-learning-engineering-career-guide",
    is_project: false, is_output: true
  },
  {
    id: "Y4_CR01", year: 4, name: "Resume & Portfolio Polishing", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Complete your online presence. Optimize LinkedIn, GitHub, and your personal site.",
    resource_name: "Harvard: Resume/CV Guide",
    resource_link: "https://ocs.fas.harvard.edu/resumes-cvs-cover-letters",
    is_project: false, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "G_SS04", year: 0, name: "Build Proof of Work", category: "Career", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Continuous effort to commit to GitHub, compete on Kaggle, and document learning.",
    resource_name: "swyx: Learn in Public",
    resource_link: "https://www.swyx.io/learn-in-public/",
    is_project: false, is_output: true
  }
];