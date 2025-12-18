
import { RoadmapItem } from './types';

export const ROADMAP_DATA_ITEMS: RoadmapItem[] = [
  // ==================== YEAR 1: FOUNDATION ====================
  {
    id: "Y1_P01", year: 1, name: "Master Python Basics", category: "Programming", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Variables, loops, functions, lists, tuples, dictionaries, sets, file handling.",
    resource_name: "Python for Everybody", resource_link: "https://www.py4e.com/", is_project: false, is_output: false, time_estimate: "4-6 weeks"
  },
  {
    id: "Y1_P02", year: 1, name: "Python OOP & Error Handling", category: "Programming", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    description: "Object-Oriented Programming (Classes, Objects, Methods, Attributes) and Try/Except blocks.",
    resource_name: "Programming with Mosh", resource_link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", is_project: false, is_output: false, time_estimate: "2-3 weeks"
  },
  {
    id: "Y1_M01", year: 1, name: "Linear Algebra for AI", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Vectors, Matrices, Eigenvalues, SVD. Essential for understanding model internals.",
    resource_name: "3Blue1Brown Linear Algebra", resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_M03", year: 1, name: "Calculus for AI", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Derivatives, Chain Rule, Gradients, Partial Derivatives. Essential for Backpropagation.",
    resource_name: "3Blue1Brown Calculus", resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", is_project: false, is_output: false, time_estimate: "3 weeks"
  },
  {
    id: "Y1_M02", year: 1, name: "Probability & Statistics", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    description: "Mean, median, mode, Variance, std dev, Normal distribution, Bayes Theorem.",
    resource_name: "StatQuest with Josh Starmer", resource_link: "https://www.youtube.com/user/joshstarmer", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_CF01", year: 1, name: "Operating Systems", category: "Computer Fundamentals", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer", "AI/ML Engineer"],
    description: "Processes vs Threads, CPU scheduling, Memory management, File systems.",
    resource_name: "Neso Academy OS", resource_link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y1_CF02", year: 1, name: "Computer Networks", category: "Computer Fundamentals", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer", "Full Stack Developer"],
    description: "OSI Model, TCP/IP, UDP, HTTP, DNS, IP/MAC addresses.",
    resource_name: "Kunal Kushwaha Networks", resource_link: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_CF04", year: 1, name: "Linux Basics", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Terminal commands: ls, cd, mkdir, rm, touch, chmod, cat. Practice on Ubuntu/Kali.",
    resource_name: "Linux Mastery", resource_link: "https://www.youtube.com/watch?v=iwolPf6KN-k", is_project: false, is_output: false, time_estimate: "1 week"
  },
  {
    id: "Y1_T01", year: 1, name: "Git & Version Control", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Learn git clone, push, pull, branching, and GitHub workflows.",
    resource_name: "Git Immersion", resource_link: "https://gitimmersion.com/", is_project: false, is_output: false, time_estimate: "1 week"
  },
  {
    id: "Y1_PR01", year: 1, name: "Python Calculator App", category: "Projects", priority: "Medium", status: "To Do", role_alignment: ["All Roles"],
    description: "Build a functional calculator using Python basics and error handling.",
    is_project: true, is_output: true, time_estimate: "1 week"
  },
  {
    id: "Y1_PR_FS1", year: 1, name: "Personal Portfolio Site", category: "Projects", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Responsive portfolio website using HTML, CSS, and Vanilla JS.",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },

  // ==================== YEAR 2: CORE SPECIALIZATION ====================
  {
    id: "Y2_DA01", year: 2, name: "Python Data Libraries", category: "Data Analysis", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    description: "Master Numpy, Pandas, Matplotlib, Seaborn. Data Cleaning & Visualization.",
    resource_name: "freeCodeCamp Data Analysis", resource_link: "https://www.youtube.com/watch?v=r-uOLxNrNk4", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y2_S01", year: 2, name: "SQL & Database Mastery", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "Full Stack Developer"],
    description: "Complex queries, joins, indexing, and normal forms.",
    resource_name: "SQLZoo", resource_link: "https://sqlzoo.net/", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y2_ML01", year: 2, name: "Intro to Machine Learning", category: "Machine Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Supervised Learning: Linear/Logistic Regression, KNN, Decision Trees, Random Forest.",
    resource_name: "Andrew Ng ML Specialization", resource_link: "https://www.coursera.org/specializations/machine-learning-introduction", is_project: false, is_output: false, time_estimate: "10 weeks"
  },
  {
    id: "Y2_ML02", year: 2, name: "Unsupervised Learning", category: "Machine Learning", priority: "Medium", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "K-Means Clustering, PCA (Dimensionality Reduction), Anomaly Detection.",
    resource_name: "StatQuest Clustering", resource_link: "https://www.youtube.com/watch?v=4b5d3muPQmA", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y2_FS01", year: 2, name: "Frontend: React.js", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Components, Hooks, State Management, Router, Context API.",
    resource_name: "React Official Docs", resource_link: "https://react.dev/learn", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y2_FS02", year: 2, name: "Modern CSS: Tailwind", category: "Web Development", priority: "Medium", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Utility-first CSS, Responsive design patterns.",
    resource_name: "Tailwind CSS Docs", resource_link: "https://tailwindcss.com/docs", is_project: false, is_output: false, time_estimate: "2 weeks"
  },
  {
    id: "Y2_PR01", year: 2, name: "Exploratory Data Analysis Project", category: "Projects", priority: "Medium", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst"],
    description: "Clean and visualize a real-world dataset from Kaggle using Pandas/Matplotlib.",
    is_project: true, is_output: true, time_estimate: "2 weeks"
  },
  {
    id: "Y2_PR04", year: 2, name: "House Price Prediction", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "End-to-end Regression project. Data cleaning -> Model -> Prediction.",
    is_project: true, is_output: true, time_estimate: "3 weeks"
  },

  // ==================== YEAR 3: ADVANCED AI & SYSTEMS ====================
  {
    id: "Y3_DL01", year: 3, name: "Neural Networks & Deep Learning", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Backpropagation, Activation Functions, Optimizers (Adam/SGD).",
    resource_name: "DeepLearning.AI", resource_link: "https://www.deeplearning.ai/", is_project: false, is_output: false, time_estimate: "12 weeks"
  },
  {
    id: "Y3_DL04", year: 3, name: "Computer Vision (CV)", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "CNN Architectures (ResNet, VGG), Object Detection (YOLO), OpenCV.",
    resource_name: "Fast.ai Part 1", resource_link: "https://course.fast.ai/", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y3_NLP01", year: 3, name: "Natural Language Processing", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Transformers, BERT, Attention mechanisms, and LLM basics.",
    resource_name: "Hugging Face Course", resource_link: "https://huggingface.co/learn/nlp-course/", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y3_SEC01", year: 3, name: "AI Security & Cryptography", category: "Cybersecurity", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer"],
    description: "Adversarial attacks on models, secure model deployment, data privacy.",
    resource_name: "OWASP AI Security", resource_link: "https://owasp.org/www-project-ai-security-and-privacy-guide/", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y3_FS01", year: 3, name: "Backend: Node.js & Express", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Event Loop, Modules, Building REST APIs, Middleware.",
    resource_name: "Node.js Docs", resource_link: "https://nodejs.org/en/docs/", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y3_PR01", year: 3, name: "End-to-End ML Web App", category: "Projects", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Deploy a model using Flask/FastAPI with a React frontend.",
    is_project: true, is_output: true, time_estimate: "4 weeks"
  },
  {
    id: "Y3_IN01", year: 3, name: "Internship (Summer)", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Apply for AI/ML or Software Engineering internships. Minimum 2 months.",
    is_project: false, is_output: true, time_estimate: "8 weeks"
  },

  // ==================== YEAR 4: MLOPS & CAREER ====================
  {
    id: "Y4_GA01", year: 4, name: "GenAI Frameworks (RAG)", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "LangChain, LlamaIndex, Vector Databases (Pinecone). Building RAG pipelines.",
    resource_name: "LangChain Docs", resource_link: "https://python.langchain.com/docs/", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y4_OPS01", year: 4, name: "MLOps & Cloud Deployment", category: "MLOps", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Docker, Kubernetes, CI/CD for ML, AWS/GCP AI tools.",
    resource_name: "Made With ML", resource_link: "https://madewithml.com/", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y4_IV01", year: 4, name: "System Design & HLD", category: "Interview Prep", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Scalability, load balancing, caching, and architecting large systems.",
    resource_name: "System Design Primer", resource_link: "https://github.com/donnemartin/system-design-primer", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y4_IP01", year: 4, name: "DSA: Blind 75 LeetCode", category: "Interview Prep", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Solve the standard Blind 75 list. Focus on Patterns.",
    resource_name: "Blind 75 List", resource_link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", is_project: false, is_output: false, time_estimate: "10 weeks"
  },
  {
    id: "Y4_IP03", year: 4, name: "Behavioral: STAR Method", category: "Interview Prep", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Prepare STAR stories for leadership, conflict, and failure scenarios.",
    is_project: false, is_output: false, time_estimate: "2 weeks"
  },
  {
    id: "Y4_CP01", year: 4, name: "Major Capstone Project", category: "Projects", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "A large-scale AI solution solving a real societal or business problem.",
    is_project: true, is_output: true, time_estimate: "16 weeks"
  },
  {
    id: "Y4_CR01", year: 4, name: "Resume & Portfolio Polishing", category: "Career", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Build a personal website and optimize LinkedIn/GitHub profiles.",
    is_project: false, is_output: true, time_estimate: "2 weeks"
  },
  
  // ==================== GLOBAL SKILLS ====================
  {
    id: "G_SS01", year: 0, name: "Discipline Training", category: "Soft Skills", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Study 1-2 hours minimum every single day for 4 years. No excuses.",
    is_project: false, is_output: false
  },
  {
    id: "G_SS02", year: 0, name: "Communication Skills", category: "Soft Skills", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Explain projects clearly. Practice speaking in technical interviews.",
    is_project: false, is_output: false
  }
];
