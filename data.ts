
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
    is_output: false,
    time_estimate: "4-6 weeks"
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
    is_output: false,
    time_estimate: "2-3 weeks"
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
    is_output: false,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "4-5 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "3-5 days"
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
    is_output: false,
    time_estimate: "3-4 weeks"
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
    is_output: false,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "1 week"
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
    resource_name: "Project Guide",
    resource_link: "https://www.freecodecamp.org/news/how-to-build-a-calculator-python/",
    is_project: true,
    is_output: true,
    time_estimate: "2-3 days"
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
    resource_name: "Design Inspiration",
    resource_link: "https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-using-html-css-javascript-and-github-pages/",
    is_project: true,
    is_output: true,
    time_estimate: "1 week"
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
    resource_name: "Python CRUD Guide",
    resource_link: "https://realpython.com/python-sql-libraries/",
    is_project: true,
    is_output: true,
    time_estimate: "1 week"
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
    is_output: false,
    time_estimate: "4-5 weeks"
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
    is_output: false,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "6-8 weeks"
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
    is_output: false,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "6-8 weeks"
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
    is_output: false,
    time_estimate: "1 week"
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
    is_output: false,
    time_estimate: "1 week"
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
    is_output: true,
    time_estimate: "1 week"
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
    resource_name: "Kaggle Challenge",
    resource_link: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques",
    is_project: true,
    is_output: true,
    time_estimate: "2 weeks"
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
    resource_name: "Tutorial Guide",
    resource_link: "https://www.youtube.com/watch?v=2jLJZD-TPhE",
    is_project: true,
    is_output: true,
    time_estimate: "2-3 weeks"
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
    is_output: false,
    time_estimate: "6-10 weeks"
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
    is_output: false,
    time_estimate: "5-7 weeks"
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
    is_output: false,
    time_estimate: "4-6 weeks"
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
    is_output: false,
    time_estimate: "8-12 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    is_output: false,
    time_estimate: "4-6 weeks"
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
    is_output: false,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "2 weeks"
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
    resource_name: "LinkedIn Internships",
    resource_link: "https://www.linkedin.com/jobs/internship-jobs/",
    is_project: false,
    is_output: true,
    time_estimate: "2-4 months"
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
    resource_name: "CNN Guide",
    resource_link: "https://www.tensorflow.org/tutorials/images/classification",
    is_project: true,
    is_output: true,
    time_estimate: "2-3 weeks"
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
    resource_name: "MERN Tutorial",
    resource_link: "https://www.mongodb.com/languages/mern-stack-tutorial",
    is_project: true,
    is_output: true,
    time_estimate: "3 weeks"
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
    is_output: false,
    time_estimate: "4-6 weeks"
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
    is_output: false,
    time_estimate: "6 weeks"
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
    is_output: false,
    time_estimate: "4 weeks"
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
    resource_name: "SaaS Guide",
    resource_link: "https://www.freecodecamp.org/news/how-to-build-a-saas-platform/",
    is_project: true,
    is_output: true,
    time_estimate: "4-6 weeks"
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
    resource_name: "Project Ideas",
    resource_link: "https://github.com/florinpop17/app-ideas",
    is_project: true,
    is_output: true,
    time_estimate: "3-4 months"
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
    resource_name: "Career Roadmaps",
    resource_link: "https://roadmap.sh/ai",
    is_project: false,
    is_output: true,
    time_estimate: "1 week"
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
    is_output: false,
    time_estimate: "8-10 weeks"
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
    is_output: false,
    time_estimate: "4-6 weeks"
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
    is_output: false,
    time_estimate: "1-2 weeks"
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
    is_output: false,
    time_estimate: "2 weeks"
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
    is_output: false,
    time_estimate: "4-5 weeks"
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
    resource_name: "Building Discipline",
    resource_link: "https://www.scotthyoung.com/blog/2020/05/04/self-discipline-guide/",
    is_project: false,
    is_output: false,
    time_estimate: "Continuous"
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
    resource_name: "Effective Communication",
    resource_link: "https://www.coursera.org/specializations/communication-skills-engineers",
    is_project: false,
    is_output: false,
    time_estimate: "Continuous"
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
    resource_name: "Portfolio Guide",
    resource_link: "https://www.freecodecamp.org/news/how-to-build-a-portfolio-site/",
    is_project: false,
    is_output: false,
    time_estimate: "Continuous"
  }
];

export const ACADEMIC_SYLLABUS: SyllabusSemester[] = [
  {
    id: "1-1",
    title: "Year 1, Sem 1",
    courses: [
      { 
        sNo: 1, 
        code: "MA101BS", 
        title: "Matrices and Calculus", 
        l: 3, t: 1, p: 0, credits: 4,
        units: [
          { title: "Unit I: Matrices", topics: "Types of Matrices, Rank of a Matrix, Echelon form, Normal form, System of linear equations." },
          { title: "Unit II: Eigenvalues and Eigenvectors", topics: "Eigenvalues, Eigenvectors and their properties, Cayley-Hamilton Theorem, Diagonalization of a matrix." }
        ]
      },
      { 
        sNo: 2, 
        code: "PH102BS", 
        title: "Applied Physics", 
        l: 3, t: 1, p: 0, credits: 4,
        units: [
          { title: "Unit I: Quantum Mechanics", topics: "Introduction to quantum physics, Black body radiation, Stefan’s law, Planck’s radiation law." }
        ]
      },
      { sNo: 3, code: "CS103ES", title: "Programming for Problem Solving", l: 3, t: 0, p: 0, credits: 3 }
    ],
    totalCredits: 11
  }
];

export const ELECTIVES_DATA: ElectiveGroup[] = [
  {
    title: "Professional Elective - I",
    courses: [
      { code: "CS511PE", title: "Information Retrieval Systems" },
      { code: "CS512PE", title: "Network Programming" },
      { code: "CS513PE", title: "Data Analytics" }
    ]
  },
  {
    title: "Professional Elective - II",
    courses: [
      { code: "CS611PE", title: "Mobile Computing" },
      { code: "CS612PE", title: "Cyber Forensics" },
      { code: "CS613PE", title: "Cloud Computing" }
    ]
  }
];
