
import { RoadmapItem, SyllabusSemester, ElectiveGroup } from './types';

export const ROADMAP_DATA: RoadmapItem[] = [
  // ==================== YEAR 1: STRONG FOUNDATION ====================
  // 1. Programming (Python + C + Git + JS)
  {
    id: "Y1_P01",
    year: 1,
    name: "Master Python Basics",
    description: "Variables, loops, functions, lists, tuples, dictionaries, sets, file handling. Goal: Python should feel natural.",
    category: "Programming",
    priority: "High",
    status: "Completed",
    role_alignment: ["AI/ML Engineer", "Data Scientist", "Data Analyst", "AI Security Officer", "Full Stack Developer"],
    resource_name: "Python for Everybody (Coursera/YouTube)",
    resource_link: "https://www.youtube.com/watch?v=8DvywoWv6fI",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_P02",
    year: 1,
    name: "Python OOP & Error Handling",
    description: "Object-Oriented Programming (Classes, Objects, Methods, Attributes) and Try/Except blocks.",
    category: "Programming",
    priority: "High",
    status: "In Progress",
    role_alignment: ["AI/ML Engineer", "Data Scientist", "AI Security Officer", "Full Stack Developer"],
    resource_name: "Programming with Mosh",
    resource_link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    is_project: false,
    is_output: false
  },
  // Full Stack Addition Y1
  {
    id: "Y1_FS01",
    year: 1,
    name: "Web Basics: HTML5 & CSS3",
    description: "Semantic HTML, Box Model, Flexbox, Grid, Responsive Design, Media Queries.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "The Odin Project (Foundations)",
    resource_link: "https://www.theodinproject.com/paths/foundations/courses/foundations",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_FS02",
    year: 1,
    name: "JavaScript Fundamentals",
    description: "Variables, DOM Manipulation, Events, ES6+ features (Arrow functions, Destructuring, Modules).",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "Namaste JavaScript (YouTube)",
    resource_link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_C01",
    year: 1,
    name: "Basic C Programming",
    description: "Arrays, pointers, memory concepts. Choose CodeWithHarry or Neso Academy.",
    category: "Programming",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist", "AI Security Officer"],
    resource_name: "CodeWithHarry C Playlist",
    resource_link: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_T01",
    year: 1,
    name: "Git & GitHub Mastery",
    description: "git add, commit, push, pull. Upload all work to GitHub.",
    category: "Programming",
    priority: "High",
    status: "Completed",
    role_alignment: ["All Roles"],
    resource_name: "CodeWithHarry Git (1 hr)",
    resource_link: "https://www.youtube.com/watch?v=gwWKnnCMQ5c",
    is_project: false,
    is_output: false
  },

  // 2. Mathematics (AI/DS/ML)
  {
    id: "Y1_M01",
    year: 1,
    name: "Linear Algebra",
    description: "Vectors, Matrices, Matrix multiplication, Dot product, Eigenvalues/Eigenvectors.",
    category: "Mathematics",
    priority: "High",
    status: "In Progress",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "3Blue1Brown - Essence of Linear Algebra",
    resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_M03",
    year: 1,
    name: "Calculus for AI",
    description: "Derivatives, Chain Rule, Gradients, Partial Derivatives. Essential for understanding Backpropagation.",
    category: "Mathematics",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "3Blue1Brown Calculus",
    resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_M02",
    year: 1,
    name: "Probability & Statistics",
    description: "Mean, median, mode, Variance, std dev, Normal distribution, Bayes Theorem.",
    category: "Mathematics",
    priority: "High",
    status: "To Do",
    role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    resource_name: "StatQuest with Josh Starmer",
    resource_link: "https://www.youtube.com/user/joshstarmer",
    is_project: false,
    is_output: false
  },

  // 3. Computer Fundamentals
  {
    id: "Y1_CF01",
    year: 1,
    name: "Operating Systems",
    description: "Processes vs Threads, CPU scheduling, Memory management, File systems.",
    category: "Computer Fundamentals",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI Security Officer", "AI/ML Engineer", "Full Stack Developer"],
    resource_name: "Neso Academy OS",
    resource_link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_CF02",
    year: 1,
    name: "Computer Networks",
    description: "OSI Model, TCP/IP, UDP, HTTP, DNS, IP/MAC addresses. LAN vs WAN vs Internet.",
    category: "Computer Fundamentals",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI Security Officer", "Full Stack Developer"],
    resource_name: "Kunal Kushwaha Networks",
    resource_link: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    is_project: false,
    is_output: false
  },
  {
    id: "Y1_CF04",
    year: 1,
    name: "Linux Basics",
    description: "Terminal commands: ls, cd, mkdir, rm, touch, chmod, cat, nano. Practice on Ubuntu/Kali.",
    category: "Computer Fundamentals",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "Kunal Kushwaha Linux (1 Video)",
    resource_link: "https://www.youtube.com/watch?v=iwolPf6KN-k",
    is_project: false,
    is_output: false
  },

  // 5. Mini Projects (Year 1)
  {
    id: "Y1_PR01",
    year: 1,
    name: "Python Calculator",
    description: "Build a functional calculator. Push to GitHub.",
    category: "Projects",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    resource_name: "GitHub",
    resource_link: "https://github.com",
    is_project: true,
    is_output: true
  },
  {
    id: "Y1_PR_FS1",
    year: 1,
    name: "Personal Portfolio Site",
    description: "Responsive portfolio website using HTML, CSS, and Vanilla JS.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "GitHub",
    resource_link: "https://github.com",
    is_project: true,
    is_output: true
  },
  {
    id: "Y1_PR02",
    year: 1,
    name: "Student Management System",
    description: "CRUD app for student records. Push to GitHub.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    resource_name: "GitHub",
    resource_link: "https://github.com",
    is_project: true,
    is_output: true
  },

  // ==================== YEAR 2: CORE ====================
  // 1. Data Analysis (AIML/DS)
  {
    id: "Y2_DA01",
    year: 2,
    name: "Python Data Libraries",
    description: "Master Numpy, Pandas, Matplotlib, Seaborn. Data Cleaning & Visualization.",
    category: "Data Analysis",
    priority: "High",
    status: "To Do",
    role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    resource_name: "freeCodeCamp Data Analysis",
    resource_link: "https://www.youtube.com/watch?v=r-uOLxNrNk4",
    is_project: false,
    is_output: false
  },
  {
    id: "Y2_SQL01",
    year: 2,
    name: "SQL Fundamentals",
    description: "SELECT, WHERE, GROUP BY, ORDER BY, JOINs, Subqueries.",
    category: "Data Analysis",
    priority: "High",
    status: "To Do",
    role_alignment: ["Data Analyst", "Data Scientist", "Full Stack Developer"],
    resource_name: "HackerRank SQL",
    resource_link: "https://www.hackerrank.com/domains/sql",
    is_project: false,
    is_output: false
  },

  // 2. Machine Learning Foundations
  {
    id: "Y2_ML01",
    year: 2,
    name: "Supervised Learning",
    description: "Linear & Logistic Regression, KNN, Decision Tree, Random Forest, SVM.",
    category: "Machine Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Andrew Ng ML (Coursera)",
    resource_link: "https://www.coursera.org/specializations/machine-learning-introduction",
    is_project: false,
    is_output: false
  },
  {
    id: "Y2_ML02",
    year: 2,
    name: "Unsupervised Learning",
    description: "K-Means Clustering, Hierarchical Clustering, PCA (Dimensionality Reduction), Anomaly Detection.",
    category: "Machine Learning",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "StatQuest Clustering",
    resource_link: "https://www.youtube.com/watch?v=4b5d3muPQmA",
    is_project: false,
    is_output: false
  },
  {
    id: "Y2_ML03",
    year: 2,
    name: "Advanced ML: Ensembles",
    description: "Bagging, Boosting (XGBoost, LightGBM, CatBoost), Stacking. Essential for Kaggle.",
    category: "Machine Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Kaggle Learn",
    resource_link: "https://www.kaggle.com/learn",
    is_project: false,
    is_output: false
  },

  // Full Stack Track Year 2
  {
    id: "Y2_FS01",
    year: 2,
    name: "Frontend Framework: React",
    description: "Components, Hooks, State Management, Router, Context API.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "React Official Docs",
    resource_link: "https://react.dev/learn",
    is_project: false,
    is_output: false
  },
  {
    id: "Y2_FS02",
    year: 2,
    name: "Modern CSS: Tailwind",
    description: "Utility-first CSS, Responsive design patterns.",
    category: "Web Development",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "Tailwind CSS Docs",
    resource_link: "https://tailwindcss.com/docs",
    is_project: false,
    is_output: false
  },
  {
    id: "Y2_FS03",
    year: 2,
    name: "API Integration",
    description: "Fetch API, Axios, Handling JSON, REST Principles, Postman.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "FreeAPI.app",
    resource_link: "https://freeapi.app",
    is_project: false,
    is_output: false
  },

  // Projects Year 2
  {
    id: "Y2_PR01",
    year: 2,
    name: "Sales Data Analysis",
    description: "EDA and Visualization on sales data. Clean messy data.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["Data Analyst"],
    resource_name: "Kaggle Dataset",
    resource_link: "https://www.kaggle.com/datasets",
    is_project: true,
    is_output: true
  },
  {
    id: "Y2_PR04",
    year: 2,
    name: "House Price Prediction",
    description: "End-to-end Regression project. Data cleaning -> Model -> Prediction.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer"],
    resource_name: "GitHub Submission",
    resource_link: "#",
    is_project: true,
    is_output: true
  },
  {
    id: "Y2_PR_FS01",
    year: 2,
    name: "E-Commerce Frontend",
    description: "React app with Cart functionality, Product filtering, and Routing.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "GitHub Submission",
    resource_link: "#",
    is_project: true,
    is_output: true
  },

  // ==================== YEAR 3: ADVANCED ====================
  // 1. Deep Learning Basics
  {
    id: "Y3_DL01",
    year: 3,
    name: "Deep Learning Concepts",
    description: "Neural Networks, Perceptrons, Backpropagation, Activation Functions, Optimizers (Adam/SGD).",
    category: "Deep Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Andrew Ng Deep Learning",
    resource_link: "https://www.coursera.org/specializations/deep-learning",
    is_project: false,
    is_output: false
  },
  // 2. Deep Learning Applications
  {
    id: "Y3_DL04",
    year: 3,
    name: "Computer Vision (CV)",
    description: "CNN Architectures (ResNet, VGG, EfficientNet), Object Detection (YOLO), OpenCV.",
    category: "Deep Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Fast.ai Part 1",
    resource_link: "https://course.fast.ai/",
    is_project: false,
    is_output: false
  },
  {
    id: "Y3_DL02",
    year: 3,
    name: "NLP Fundamentals",
    description: "Text Preprocessing, Tokenization, Word Embeddings (Word2Vec, GloVe), RNNs/LSTMs.",
    category: "Deep Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Hugging Face NLP Course",
    resource_link: "https://huggingface.co/learn/nlp-course",
    is_project: false,
    is_output: false
  },
  // 3. Modern AI (LLMs)
  {
    id: "Y3_DL03",
    year: 3,
    name: "Modern AI: LLMs & Transformers",
    description: "Attention Mechanism, Transformer Architecture (BERT, GPT), Fine-tuning, Prompt Engineering.",
    category: "Deep Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Andrej Karpathy - Zero to Hero",
    resource_link: "https://karpathy.ai/zero-to-hero.html",
    is_project: false,
    is_output: false
  },

  {
    id: "Y3_AS01",
    year: 3,
    name: "Adversarial ML",
    description: "Adversarial attacks, Data poisoning, Model evasion, Model stealing, Model inversion.",
    category: "Cybersecurity",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI Security Officer"],
    resource_name: "OpenAI Security Blogs",
    resource_link: "https://openai.com/research",
    is_project: false,
    is_output: false
  },

  // Full Stack Track Year 3 (Backend)
  {
    id: "Y3_FS01",
    year: 3,
    name: "Backend: Node.js & Express",
    description: "Event Loop, Modules, Building REST APIs, Middleware.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "Node.js Docs",
    resource_link: "https://nodejs.org/en/docs/",
    is_project: false,
    is_output: false
  },
  {
    id: "Y3_FS02",
    year: 3,
    name: "Databases (Mongo & Adv SQL)",
    description: "Mongoose ODM, Schema Design, PostgreSQL Joins, Normalization.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "MongoDB University",
    resource_link: "https://learn.mongodb.com/",
    is_project: false,
    is_output: false
  },
  {
    id: "Y3_FS03",
    year: 3,
    name: "Authentication & Security",
    description: "JWT, OAuth2, Hashing, Session Management, Cookies, CORS.",
    category: "Web Development",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "Auth0 Blog",
    resource_link: "https://auth0.com/blog/",
    is_project: false,
    is_output: false
  },

  // Internships
  {
    id: "Y3_IN01",
    year: 3,
    name: "Internships (Min 2)",
    description: "Apply for AI/ML, Data Science, or Dev internships between 3rd & 4th year.",
    category: "Career",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "LinkedIn / Internshala",
    resource_link: "#",
    is_project: false,
    is_output: true
  },

  // Projects Year 3
  {
    id: "Y3_PR01",
    year: 3,
    name: "Image Classification System",
    description: "Build a CNN-based classifier (e.g., Plant Disease Detection).",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer"],
    resource_name: "GitHub Submission",
    resource_link: "#",
    is_project: true,
    is_output: true
  },
  {
    id: "Y3_PR_FS01",
    year: 3,
    name: "Full Stack Blog App",
    description: "MERN Stack Application. CRUD operations, User Authentication, Database.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "GitHub Submission",
    resource_link: "#",
    is_project: true,
    is_output: true
  },

  // ==================== YEAR 4: SPECIALIZATION + JOB READY ====================
  // 1. GenAI Frameworks & Tools
  {
    id: "Y4_GA01",
    year: 4,
    name: "GenAI Frameworks (RAG)",
    description: "LangChain, LlamaIndex, Vector Databases (Pinecone, ChromaDB). Building RAG pipelines.",
    category: "Deep Learning",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer"],
    resource_name: "LangChain Docs",
    resource_link: "https://python.langchain.com/docs/get_started/introduction",
    is_project: false,
    is_output: false
  },

  // 2. MLOps Essentials
  {
    id: "Y4_MLOPS01",
    year: 4,
    name: "MLOps Essentials",
    description: "Model Tracking (MLflow), Model Serving (FastAPI/BentoML), Drift Detection, Feature Stores.",
    category: "MLOps",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist"],
    resource_name: "Made With ML",
    resource_link: "https://madewithml.com/",
    is_project: false,
    is_output: false
  },
  {
    id: "Y4_DP01",
    year: 4,
    name: "Deployment & DevOps",
    description: "Docker, Nginx, CI/CD Pipelines, Cloud (AWS/GCP/Vercel).",
    category: "MLOps",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    resource_name: "Docker Docs",
    resource_link: "https://docs.docker.com",
    is_project: false,
    is_output: false
  },

  // 3. AI Project Building (End-to-End)
  {
    id: "Y4_PR_E2E",
    year: 4,
    name: "End-to-End GenAI SaaS",
    description: "Build a full stack GenAI app. React Frontend + FastAPI Backend + LLM Integration + Vector DB.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    resource_name: "GitHub Submission",
    resource_link: "#",
    is_project: true,
    is_output: true
  },
  {
    id: "Y4_MP01",
    year: 4,
    name: "Capstone Project",
    description: "Final Major Project. Choose ONE: AI-Based Threat Detection, SaaS Platform, or Fraud Detection System.",
    category: "Projects",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "GitHub + Documentation",
    resource_link: "#",
    is_project: true,
    is_output: true
  },

  // 4. Portfolio & Job Prep
  {
    id: "Y4_FF01",
    year: 4,
    name: "Select Specialization",
    description: "Finalize path: AI/ML Engineer, Data Scientist, AI Security, or Full Stack.",
    category: "Career",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "Self-Reflection",
    resource_link: "#",
    is_project: false,
    is_output: true
  },
  {
    id: "Y4_IP01",
    year: 4,
    name: "DSA: Top 75 Blind",
    description: "Solve the Blind 75 LeetCode list. Focus on Array, DP, and Graphs.",
    category: "Interview Prep",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "Blind 75 List",
    resource_link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    is_project: false,
    is_output: false
  },
  {
    id: "Y4_IP02",
    year: 4,
    name: "System Design: HLD/LLD",
    description: "High Level (Load Balancers, Caching) vs Low Level (Class Diagrams). Design Twitter/Uber.",
    category: "Interview Prep",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    resource_name: "System Design Primer",
    resource_link: "https://github.com/donnemartin/system-design-primer",
    is_project: false,
    is_output: false
  },
  {
    id: "Y4_IP03",
    year: 4,
    name: "Behavioral: STAR Method",
    description: "Prepare 5 stories for 'Tell me about a time you failed/led/conflicted'. Situation, Task, Action, Result.",
    category: "Interview Prep",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "The STAR Method",
    resource_link: "https://www.careereducation.columbia.edu/resources/star-method-behavioral-interviewing",
    is_project: false,
    is_output: false
  },
  {
    id: "Y4_IP04",
    year: 4,
    name: "Mock Interviews (P2P)",
    description: "Do at least 3 mock interviews. Use Pramp or ask a friend.",
    category: "Interview Prep",
    priority: "High",
    status: "To Do",
    role_alignment: ["All Roles"],
    resource_name: "Pramp",
    resource_link: "https://www.pramp.com/",
    is_project: false,
    is_output: false
  },
  
  // 5. Job Ready Skills (Web specific)
  {
    id: "Y4_FS01",
    year: 4,
    name: "Advanced Web Concepts",
    description: "WebSockets (Socket.io), Server Side Rendering (Next.js basics), Testing (Jest).",
    category: "Web Development",
    priority: "Medium",
    status: "To Do",
    role_alignment: ["Full Stack Developer"],
    resource_name: "Next.js Docs",
    resource_link: "https://nextjs.org",
    is_project: false,
    is_output: false
  },

  // Soft Skills & Compulsory Items (Recurring/General)
  {
    id: "G_SS01",
    year: 0,
    name: "Discipline Training",
    description: "Study 1-2 hours minimum every single day for 4 years. No excuses.",
    category: "Soft Skills",
    priority: "High",
    status: "In Progress",
    role_alignment: ["All Roles"],
    resource_name: "Self-Discipline",
    resource_link: "#",
    is_project: false,
    is_output: false
  },
  {
    id: "G_SS02",
    year: 0,
    name: "Communication",
    description: "Explain projects clearly. Practice speaking in interviews.",
    category: "Soft Skills",
    priority: "High",
    status: "In Progress",
    role_alignment: ["All Roles"],
    resource_name: "Practice",
    resource_link: "#",
    is_project: false,
    is_output: false
  },
  {
    id: "G_SS04",
    year: 0,
    name: "Build Proof of Work",
    description: "Courses don't get you hired. GitHub, Kaggle, and Internships do.",
    category: "Career",
    priority: "High",
    status: "In Progress",
    role_alignment: ["All Roles"],
    resource_name: "GitHub/Kaggle",
    resource_link: "#",
    is_project: false,
    is_output: false
  }
];

export const ACADEMIC_SYLLABUS: SyllabusSemester[] = [
  {
    id: "1-1",
    title: "I Year I Semester",
    totalCredits: 20,
    courses: [
      { 
        sNo: 1, code: "MA101BS", title: "Matrices and Calculus", l: 3, t: 1, p: 0, credits: 4,
        units: [
          { title: "Matrices", topics: "Rank, Echelon form, Normal form, Inverse by Gauss-Jordan, System of linear equations, Gauss Seidel." },
          { title: "Eigen values & Vectors", topics: "Linear Transformation, Cayley-Hamilton Theorem, Diagonalization, Quadratic forms." },
          { title: "Single Variable Calculus", topics: "Mean value theorems, Rolle's, Lagrange's, Cauchy's, Taylor's Series, Curve Tracing." },
          { title: "Multivariable Calculus (Diff)", topics: "Partial Differentiation, Euler's Theorem, Jacobian, Maxima/Minima, Lagrange multipliers." },
          { title: "Multivariable Calculus (Int)", topics: "Double Integrals, Change of order, Triple Integrals, Applications: Areas/Volumes." }
        ]
      },
      { 
        sNo: 2, code: "PH102BS", title: "Advanced Engineering Physics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Crystallography", topics: "Unit cell, lattice parameters, crystal structures, Bragg's law, defects, SEM." },
          { title: "Quantum Mechanics", topics: "de-Broglie, Heisenberg uncertainty, Schrodinger equation, Particle in 1D box, Band theory." },
          { title: "Quantum Computing", topics: "Qubits, Bloch's sphere, Superposition, Entanglement, Quantum gates, Algorithms (Shor, Grover)." },
          { title: "Magnetic & Dielectric", topics: "Permittivity, Polarization, Ferroelectricity, Piezoelectricity, Hall Effect, Magnetic materials." },
          { title: "Lasers & Fiber Optics", topics: "Population inversion, Ruby/He-Ne Laser, Optical Fibers, Total Internal Reflection, Sensors." }
        ]
      },
      { 
        sNo: 3, code: "CS103ES", title: "Programming for Problem Solving", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Intro to C", topics: "Data types, Operators, Expressions, Control Structures (if, switch, while, for)." },
          { title: "Functions & Pointers", topics: "User-defined functions, Recursion, Parameter passing, Pointer arithmetic, Call by reference." },
          { title: "Arrays & Strings", topics: "1D/2D Arrays, String handling functions, Pointers to arrays." },
          { title: "Structures & Unions", topics: "Defining structures, Array of structures, Nested structures, Unions, Enum." },
          { title: "Files & Preprocessor", topics: "File handling (fopen, fclose, fread, fwrite), Command line args, Preprocessor directives." }
        ]
      },
      { 
        sNo: 4, code: "EE104ES", title: "Basic Electrical Engineering", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "DC Circuits", topics: "Ohm's Law, KVL, KCL, Mesh/Nodal Analysis, Thevenin's, Norton's, Superposition Theorems." },
          { title: "AC Circuits", topics: "RL, RC, RLC Series/Parallel, Resonance, Power Factor, 3-Phase Systems." },
          { title: "Transformers", topics: "Ideal/Practical, EMF Equation, Equivalent Circuit, Losses, Efficiency, Regulation." },
          { title: "Electrical Machines", topics: "DC Generators/Motors, Induction Motors, Synchronous Generators (Basic construction/operation)." },
          { title: "Electrical Installations", topics: "Switchgear, MCB, ELCB, Earthing, Batteries, Power Factor Improvement." }
        ]
      },
      { 
        sNo: 5, code: "ME105ES", title: "Engineering Drawing and Computer Aided Drafting", l: 2, t: 0, p: 2, credits: 3,
        units: [
          { title: "Introduction", topics: "Scales, Conic Sections, Cycloids, Involutes." },
          { title: "Orthographic Projections", topics: "Projections of Points, Lines, Planes." },
          { title: "Projections of Solids", topics: "Prisms, Pyramids, Cylinders, Cones." },
          { title: "Sections & Development", topics: "Sectional views, Development of surfaces." },
          { title: "Isometric Projections", topics: "Isometric views of planes/solids, Conversion from Orthographic to Isometric." }
        ]
      },
      { sNo: 6, code: "PH106BS", title: "Advanced Engineering Physics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS107ES", title: "Programming for Problem Solving Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EE108ES", title: "Basic Electrical Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS109ES", title: "IT Workshop", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "-", title: "Induction Program", l: 0, t: 0, p: 0, credits: 0 },
    ]
  },
  {
    id: "1-2",
    title: "I Year II Semester",
    totalCredits: 20,
    courses: [
      { 
        sNo: 1, code: "MA201BS", title: "Ordinary Differential Equations and Vector Calculus", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "First Order ODE", topics: "Exact, Linear, Bernoulli equations, Newton's Law of Cooling, Growth/Decay." },
          { title: "Higher Order ODE", topics: "Constant coefficients, Method of Variation of Parameters, Cauchy-Euler equations." },
          { title: "Laplace Transforms", topics: "Properties, Inverse Laplace, Convolution, Solving ODEs using Laplace." },
          { title: "Vector Differentiation", topics: "Gradient, Divergence, Curl, Directional Derivative, Vector identities." },
          { title: "Vector Integration", topics: "Line, Surface, Volume integrals, Green's, Gauss, Stokes theorems." }
        ]
      },
      { 
        sNo: 2, code: "CH202BS", title: "Engineering Chemistry", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Water Chemistry", topics: "Hardness, Softening methods (Lime-Soda, Zeolite), Potable water, Desalination." },
          { title: "Electrochemistry", topics: "Electrode potential, Nernst equation, Batteries (Lead-Acid, Li-ion), Fuel Cells." },
          { title: "Corrosion", topics: "Types (Dry/Wet), Galvanic, Pitting, Factors affecting, Prevention (Cathodic protection, Coatings)." },
          { title: "Polymers", topics: "Thermoplastics/Thermosets, PVC, Teflon, Nylon, Biodegradable polymers, Conducting polymers." },
          { title: "Fuels & Combustion", topics: "Coal analysis, Petroleum refining, Octane/Cetane number, Lubricants, Nanomaterials." }
        ]
      },
      { 
        sNo: 3, code: "CS203ES", title: "Data Structures", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Introduction", topics: "Linked Lists (Singly, Doubly, Circular), Stacks, Queues (Array/Linked implementations)." },
          { title: "Trees", topics: "Binary Trees, BST, AVL Trees, Tree Traversals (Inorder, Preorder, Postorder)." },
          { title: "Search Trees & Heaps", topics: "B-Trees, B+ Trees, Priority Queues, Binary Heaps." },
          { title: "Graphs", topics: "Representation (Matrix/List), BFS, DFS, Spanning Trees (Prim's, Kruskal's)." },
          { title: "Hashing & Sorting", topics: "Hash functions, Collision resolution, Bubble, Selection, Insertion, Quick, Merge Sort." }
        ]
      },
      { 
        sNo: 4, code: "EC204ES", title: "Electronic Devices and Circuits", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Diodes", topics: "PN Junction, VI Characteristics, Zener Diode, Rectifiers (Half/Full Wave), Clippers/Clampers." },
          { title: "Bipolar Junction Transistor", topics: "Construction, CB/CE/CC Configurations, Input/Output Characteristics." },
          { title: "Transistor Biasing", topics: "Operating Point, Load Line, Biasing methods (Fixed, Self), Stability." },
          { title: "BJT Amplifiers", topics: "Small signal analysis, h-parameters, CE Amplifier analysis." },
          { title: "FET & Special Devices", topics: "JFET, MOSFET (Enhancement/Depletion), SCR, UJT, LED, Photo Diode." }
        ]
      },
      { 
        sNo: 5, code: "EN205HS", title: "English for Skill Enhancement", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Vocabulary & Grammar", topics: "Word formation, Synonyms/Antonyms, Prepositions, Articles, Tenses, Correction of sentences." },
          { title: "Reading Skills", topics: "Skimming, Scanning, Intensive/Extensive reading, Comprehension." },
          { title: "Writing Skills", topics: "Paragraph writing, Letter writing, Email etiquette, Report writing." },
          { title: "Listening & Speaking", topics: "Effective communication, Barriers, Jam sessions, Role plays." },
          { title: "Soft Skills", topics: "Teamwork, Emotional Intelligence, Interview skills, Presentation skills." }
        ]
      },
      { sNo: 6, code: "CH206BS", title: "Engineering Chemistry Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS207ES", title: "Data Structures Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EN208HS", title: "English Language and Communication Skills Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "ME209ES", title: "Engineering Workshop", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS210ES", title: "Python Programming Lab", l: 0, t: 0, p: 2, credits: 1 },
    ]
  },
  {
    id: "2-1",
    title: "II Year I Semester",
    totalCredits: 20,
    courses: [
      { 
        sNo: 1, code: "MA401BS", title: "Mathematical and Statistical Foundations", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Number Theory", topics: "GCD, Euclidean Algorithm, Prime Factorization, Congruences, Fermat's Theorem." },
          { title: "Random Variables", topics: "Discrete/Continuous RV, Expectation, Variance, Binomial, Poisson Distributions." },
          { title: "Sampling Distributions", topics: "Normal Distribution, Central Limit Theorem, Sampling distributions." },
          { title: "Hypothesis Testing", topics: "Null/Alternative Hypothesis, Type I/II errors, z-test, t-test, Chi-square test." },
          { title: "Applied Statistics", topics: "Curve fitting (Least squares), Correlation, Regression Analysis." }
        ]
      },
      { 
        sNo: 2, code: "CS302PC", title: "Computer Organization and Architecture", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Basic Structure", topics: "Functional units, Bus structures, Performance, Data representation." },
          { title: "Machine Instructions", topics: "Instruction formats, Addressing modes, Assembly language, Stacks/Queues." },
          { title: "Input/Output", topics: "Interrupts, DMA, Standard I/O Interfaces (PCI, USB, SCSI)." },
          { title: "Memory System", topics: "RAM/ROM, Cache memory, Mapping functions, Virtual memory." },
          { title: "Arithmetic & Processing", topics: "Addition/Subtraction, Multiplication/Division algorithms, Pipelining, Hazards." }
        ]
      },
      { 
        sNo: 3, code: "CS303PC", title: "Object Oriented Programming through Java", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Java Basics", topics: "OOP concepts, Data types, Control statements, Arrays, Classes, Objects, Methods." },
          { title: "Inheritance & Packages", topics: "Types of inheritance, Super keyword, Method overriding, Abstract classes, Packages, Interfaces." },
          { title: "Exception Handling", topics: "Try-catch-finally, Throw/Throws, Custom exceptions, Multithreading concepts." },
          { title: "Collections & I/O", topics: "ArrayList, LinkedList, HashMap, File I/O, Serialization." },
          { title: "GUI Programming", topics: "AWT, Swing, Event Handling, Layout Managers, Applets." }
        ]
      },
      { 
        sNo: 4, code: "CS304PC", title: "Software Engineering", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Introduction", topics: "Software Myths, Process Models (Waterfall, Agile, Spiral), CMMI." },
          { title: "Requirements", topics: "Functional/Non-functional, SRS, Elicitation, Validation." },
          { title: "Design", topics: "Architecture, UML Diagrams (Class, Use Case, Sequence), Design Patterns." },
          { title: "Testing", topics: "Black-box vs White-box, Unit/Integration/System Testing, Debugging." },
          { title: "Quality & Maintenance", topics: "Risk Management, Quality Assurance, ISO 9000, Maintenance." }
        ]
      },
      { 
        sNo: 5, code: "CS305PC", title: "Database Management System", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Intro & ER Model", topics: "Database Architecture, Data Models, ER Diagrams, Attributes, Relationships." },
          { title: "Relational Model", topics: "Integrity constraints, Relational Algebra, SQL basics (DDL, DML, DCL)." },
          { title: "Advanced SQL", topics: "Joins, Subqueries, Triggers, Views, Normalization (1NF, 2NF, 3NF, BCNF)." },
          { title: "Transactions", topics: "ACID properties, Serializability, Concurrency Control, Locking protocols." },
          { title: "Storage & Indexing", topics: "File organization, Indexing (B+ Trees), Hashing." }
        ]
      },
      { sNo: 6, code: "MA306PC", title: "Computational Mathematics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS307PC", title: "Object Oriented Programming through Java Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS308PC", title: "Software Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS309PC", title: "Database Management Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS310SD", title: "Node JS/React JS/Django", l: 0, t: 0, p: 2, credits: 1 },
    ]
  },
  {
    id: "2-2",
    title: "II Year II Semester",
    totalCredits: 22,
    courses: [
      { 
        sNo: 1, code: "CS401PC", title: "Discrete Mathematics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Logic", topics: "Propositional Logic, Predicates, Quantifiers, Rules of Inference." },
          { title: "Sets & Relations", topics: "Set Theory, Relations, Functions, Equivalence Relations, Partial Ordering." },
          { title: "Algebraic Structures", topics: "Groups, Subgroups, Homomorphisms, Lattices, Boolean Algebra." },
          { title: "Combinatorics", topics: "Permutations, Combinations, Binomial Coeff, Pigeonhole Principle, Recurrence Relations." },
          { title: "Graph Theory", topics: "Graphs, Euler/Hamiltonian paths, Planar graphs, Graph coloring, Trees." }
        ]
      },
      { 
        sNo: 2, code: "CS402PC", title: "Operating Systems", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Introduction", topics: "OS Services, System Calls, Process Concepts, Threads." },
          { title: "CPU Scheduling", topics: "Scheduling Criteria, Algorithms (FCFS, SJF, RR), Deadlocks." },
          { title: "Synchronization", topics: "Critical Section, Semaphores, Monitors, Classical Problems (Dining Philosophers)." },
          { title: "Memory Management", topics: "Paging, Segmentation, Virtual Memory, Page Replacement Algorithms." },
          { title: "File Systems", topics: "File concepts, Access methods, Directory structure, Disk scheduling." }
        ]
      },
      { 
        sNo: 3, code: "CS403PC", title: "Algorithms Design and Analysis", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Introduction", topics: "Asymptotic notations, Divide & Conquer (Merge Sort, Quick Sort)." },
          { title: "Disjoint Sets & Backtracking", topics: "Union-Find, N-Queens, Graph Coloring, Hamiltonian Cycles." },
          { title: "Dynamic Programming", topics: "Knapsack Problem, Matrix Chain Multiplication, LCS, Floyd-Warshall." },
          { title: "Greedy Method", topics: "Job Sequencing, MST (Prim/Kruskal), Dijkstra's Algorithm." },
          { title: "Branch & Bound", topics: "TSP, 0/1 Knapsack (BB), NP-Hard/NP-Complete classes." }
        ]
      },
      { 
        sNo: 4, code: "CS404PC", title: "Computer Networks", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Introduction", topics: "OSI/TCP-IP Models, Network Edge/Core, Switching." },
          { title: "Application Layer", topics: "HTTP, FTP, SMTP, DNS, Socket Programming." },
          { title: "Transport Layer", topics: "UDP, TCP, Congestion Control, Reliability." },
          { title: "Network Layer", topics: "IP Addressing, Subnetting, Routing Algorithms (Link State, Distance Vector)." },
          { title: "Link Layer", topics: "Error Detection, MAC Protocols, Ethernet, Wireless LANs." }
        ]
      },
      { 
        sNo: 5, code: "CS405PC", title: "Machine Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Intro to ML", topics: "Types of Learning, Data Preprocessing, Overfitting/Underfitting." },
          { title: "Supervised Learning", topics: "Regression, Decision Trees, KNN, SVM, Naive Bayes." },
          { title: "Ensemble Learning", topics: "Bagging, Boosting, Random Forest." },
          { title: "Unsupervised Learning", topics: "Clustering (K-Means, Hierarchical), PCA." },
          { title: "Neural Networks", topics: "Perceptron, Activation Functions, Backpropagation, Intro to Deep Learning." }
        ]
      },
      { 
        sNo: 6, code: "MS406HS", title: "Innovation and Entrepreneurship", l: 2, t: 0, p: 0, credits: 2,
        units: [
          { title: "Fundamentals", topics: "Innovation vs Entrepreneurship, Types of Startups, Entrepreneurial Mindset." },
          { title: "Design Thinking", topics: "Problem Identification, Ideation Techniques, Customer Validation." },
          { title: "Business Model", topics: "Business Model Canvas, Value Proposition, Revenue Streams." },
          { title: "Financing", topics: "Bootstrapping, Angel Investors, VC, Pitching." },
          { title: "Legal & IPR", topics: "Intellectual Property Rights, Patents, Company Registration." }
        ]
      },
      { sNo: 7, code: "CS407PC", title: "Operating Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS408PC", title: "Computer Networks Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS409PC", title: "Machine Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS410SD", title: "Data Visualization - R Programming/ Power BI", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA400HS", title: "Indian Knowledge System", l: 1, t: 0, p: 0, credits: 1 },
    ]
  },
  {
    id: "3-1",
    title: "III Year I Semester",
    totalCredits: 21,
    courses: [
      { sNo: 1, code: "AI501PC", title: "Artificial Intelligence", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI502PC", title: "Automata theory and Compiler Design", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "AI503PC", title: "Data Analytics and Visualization", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE-I", title: "Professional Elective-I", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "OE-I", title: "Open Elective-I", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 6, code: "AI504PC", title: "Artificial Intelligence Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "AI505PC", title: "Compiler Design Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI506PC", title: "Data Analytics and Visualization Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "AI507PC", title: "Field Based Research Project", l: 0, t: 0, p: 4, credits: 2 },
      { sNo: 10, code: "AI508SD", title: "UI Design – Flutter/ Android Studio", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA500HS/VA501HS", title: "Gender Sensitization/ Human Values and Professional Ethics", l: 1, t: 0, p: 0, credits: 1 },
    ]
  },
  {
    id: "3-2",
    title: "III Year II Semester",
    totalCredits: 20,
    courses: [
      { sNo: 1, code: "AI601PC", title: "Natural Language Processing", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI602PC", title: "Deep Learning", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "MS603HS", title: "Business Economics and Financial Analysis", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE-II", title: "Professional Elective-II", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "OE-II", title: "Open Elective-II", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 6, code: "AI604PC", title: "Natural Language Processing Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "AI605PC", title: "Deep Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI606PC", title: "Chatbots Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "EN607HS", title: "English for Employability Skills Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "AI608SD", title: "Prompt Engineering", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA600ES", title: "Environmental Science", l: 1, t: 0, p: 0, credits: 1 },
    ]
  },
  {
    id: "4-1",
    title: "IV Year I Semester",
    totalCredits: 21,
    courses: [
      { sNo: 1, code: "AI701PC", title: "Reinforcement Learning", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI702PC", title: "Generative AI", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "MS703HS", title: "Fundamentals of Management for Engineers", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE-III", title: "Professional Elective-III", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "PE-IV", title: "Professional Elective-IV", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 6, code: "OE-III", title: "Open Elective-III", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 7, code: "AI704PC", title: "Reinforcement Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI705PC", title: "Generative AI Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "AI706PC", title: "Industry Oriented Mini Project/ Internship", l: 0, t: 0, p: 4, credits: 2 },
    ]
  },
  {
    id: "4-2",
    title: "IV Year II Semester",
    totalCredits: 20,
    courses: [
      { sNo: 1, code: "PE-V", title: "Professional Elective-V", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "PE-VI", title: "Professional Elective-VI", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "AI801PC", title: "Project Work", l: 0, t: 0, p: 42, credits: 14 },
    ]
  }
];

export const ELECTIVES_DATA: ElectiveGroup[] = [
  {
    title: "Professional Elective - I",
    courses: [
      { code: "CS511PE", title: "Computer Graphics" },
      { code: "CS512PE", title: "Introduction to Data Science" },
      { code: "CS513PE", title: "Software Testing Methodologies" },
      { code: "CS514PE", title: "Data Mining" },
      { code: "CS515PE", title: "Web Programming" },
      { code: "CS516PE", title: "Distributed Systems" }
    ]
  },
  {
    title: "Professional Elective - II",
    courses: [
      { code: "CS621PE", title: "Image Processing" },
      { code: "CS622PE", title: "Blockchain Technology" },
      { code: "CS623PE", title: "Software Project Management" },
      { code: "CS624PE", title: "Mining Massive Datasets" },
      { code: "CS625PE", title: "Full Stack Development" },
      { code: "CS626PE", title: "DevOps" }
    ]
  },
  {
    title: "Professional Elective - III",
    courses: [
      { code: "CS731PE", title: "Computer Vision" },
      { code: "CS732PE", title: "Cryptography and Network Security" },
      { code: "CS733PE", title: "Penetration Testing and Incident Response" },
      { code: "CS734PE", title: "Data Stream Mining" },
      { code: "CS735PE", title: "Cloud Computing" },
      { code: "CS736PE", title: "Information Retrieval Systems" }
    ]
  },
  {
    title: "Professional Elective - IV",
    courses: [
      { code: "CS741PE", title: "Augmented Reality & Virtual Reality" },
      { code: "CS742PE", title: "Agile Methodology" },
      { code: "CS743PE", title: "Big Data Technologies" },
      { code: "CS744PE", title: "Quantum Computing" },
      { code: "CS745PE", title: "Robotic Process Automation" },
      { code: "CS746PE", title: "Cyber Forensics" }
    ]
  },
  {
    title: "Professional Elective - V",
    courses: [
      { code: "CS851PE", title: "Social Media Mining" },
      { code: "CS852PE", title: "Nature Inspired Computing" },
      { code: "CS853PE", title: "Internet of Things" },
      { code: "CS854PE", title: "Game Theory" },
      { code: "CS855PE", title: "Mobile Application Development" },
      { code: "CS856PE", title: "Human Computer Interaction" }
    ]
  },
  {
    title: "Professional Elective - VI",
    courses: [
      { code: "CS861PE", title: "High Performance Computing" },
      { code: "CS862PE", title: "Edge Computing" },
      { code: "CS863PE", title: "Graph Theory" },
      { code: "CS864PE", title: "Adhoc & Sensor Networks" },
      { code: "CS865PE", title: "Sustainable Engineering" },
      { code: "CS866PE", title: "Distributed Databases" }
    ]
  },
  {
    title: "Open Electives",
    courses: [
      { code: "AI511OE", title: "Fundamentals of AI" },
      { code: "AI512OE", title: "Machine Learning Basics" },
      { code: "AI621OE", title: "Introduction to NLP" },
      { code: "AI622OE", title: "AI applications" },
      { code: "AI731OE", title: "Chatbots" },
      { code: "AI732OE", title: "Computer Vision with Open CV" }
    ]
  }
];
