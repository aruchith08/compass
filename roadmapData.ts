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
    id: "Y1_FS01", year: 1, name: "Web Basics: HTML5 & CSS3", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Semantic HTML, Box Model, Flexbox, Grid, Responsive Design, Media Queries.",
    resource_name: "MDN Web Docs", resource_link: "https://developer.mozilla.org/", is_project: false, is_output: false, time_estimate: "3 weeks"
  },
  {
    id: "Y1_FS02", year: 1, name: "JavaScript Fundamentals", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Variables, DOM Manipulation, Events, ES6+ features (Arrow functions, Destructuring, Modules).",
    resource_name: "Namaste JavaScript", resource_link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_C01", year: 1, name: "Basic C Programming", category: "Programming", priority: "Medium", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist", "AI Security Officer"],
    description: "Memory allocation, Pointers, Arrays, and core C syntax. Choose CodeWithHarry or Neso Academy.",
    resource_name: "CodeWithHarry C Playlist", resource_link: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR", is_project: false, is_output: false, time_estimate: "3 weeks"
  },
  {
    id: "Y1_T01", year: 1, name: "Git & Version Control", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Learn git clone, push, pull, branching, and GitHub workflows.",
    resource_name: "Git Immersion", resource_link: "https://gitimmersion.com/", is_project: false, is_output: false, time_estimate: "1 week"
  },
  {
    id: "Y1_M01", year: 1, name: "Linear Algebra for AI", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Vectors, Matrices, Eigenvalues, SVD. Essential for understanding model internals.",
    resource_name: "3Blue1Brown Linear Algebra", resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_M03", year: 1, name: "Calculus for AI", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Derivatives, Chain Rule, Gradients. Essential for Backpropagation.",
    resource_name: "3Blue1Brown Calculus", resource_link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", is_project: false, is_output: false, time_estimate: "3 weeks"
  },
  {
    id: "Y1_M02", year: 1, name: "Probability & Statistics", category: "Mathematics", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    description: "Mean, median, mode, Variance, std dev, Normal distribution, Bayes Theorem.",
    resource_name: "StatQuest", resource_link: "https://www.youtube.com/user/joshstarmer", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_CF01", year: 1, name: "Operating Systems", category: "Computer Fundamentals", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer", "AI/ML Engineer"],
    description: "Processes, Threads, Scheduling, Memory, File systems.",
    resource_name: "Neso Academy OS", resource_link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y1_CF02", year: 1, name: "Computer Networks", category: "Computer Fundamentals", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer", "Full Stack Developer"],
    description: "OSI Model, TCP/IP, UDP, HTTP, DNS, IP/MAC addresses.",
    resource_name: "Kunal Kushwaha Networks", resource_link: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y1_CF04", year: 1, name: "Linux Basics", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Terminal commands: ls, cd, mkdir, rm, touch, chmod. Ubuntu/Kali focus.",
    resource_name: "Linux Mastery", resource_link: "https://www.youtube.com/watch?v=iwolPf6KN-k", is_project: false, is_output: false, time_estimate: "1 week"
  },

  // ==================== YEAR 2: CORE ====================
  {
    id: "Y2_DA01", year: 2, name: "Python Data Libraries", category: "Data Analysis", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    description: "Master Numpy, Pandas, Matplotlib, Seaborn.",
    resource_name: "freeCodeCamp Data Analysis", resource_link: "https://www.youtube.com/watch?v=r-uOLxNrNk4", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y2_S01", year: 2, name: "SQL Mastery", category: "Computer Fundamentals", priority: "High", status: "To Do", role_alignment: ["Data Scientist", "Data Analyst", "Full Stack Developer"],
    description: "Complex queries, joins, indexing, and normal forms.",
    resource_name: "HackerRank SQL", resource_link: "https://www.hackerrank.com/domains/sql", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y2_ML01", year: 2, name: "Supervised Learning", category: "Machine Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Linear/Logistic Regression, KNN, Decision Trees, Random Forest, SVM.",
    resource_name: "Andrew Ng ML", resource_link: "https://www.coursera.org/specializations/machine-learning-introduction", is_project: false, is_output: false, time_estimate: "10 weeks"
  },
  {
    id: "Y2_ML02", year: 2, name: "Unsupervised Learning", category: "Machine Learning", priority: "Medium", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Clustering, PCA, Anomaly Detection.",
    resource_name: "StatQuest Clustering", resource_link: "https://www.youtube.com/watch?v=4b5d3muPQmA", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y2_ML03", year: 2, name: "Advanced Ensembles", category: "Machine Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "XGBoost, LightGBM, Stacking, Bagging/Boosting.",
    resource_name: "Kaggle Learn", resource_link: "https://www.kaggle.com/learn", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  {
    id: "Y2_FS01", year: 2, name: "React.js Framework", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Hooks, State Management, Router, Context API.",
    resource_name: "React Docs", resource_link: "https://react.dev/learn", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y2_FS02", year: 2, name: "Tailwind CSS", category: "Web Development", priority: "Medium", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Modern utility-first CSS design patterns.",
    resource_name: "Tailwind Docs", resource_link: "https://tailwindcss.com/docs", is_project: false, is_output: false, time_estimate: "2 weeks"
  },

  // ==================== YEAR 3: ADVANCED ====================
  {
    id: "Y3_DL01", year: 3, name: "Deep Learning Fundamentals", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Backpropagation, Activation Functions, Optimizers.",
    resource_name: "DeepLearning.AI", resource_link: "https://www.deeplearning.ai/", is_project: false, is_output: false, time_estimate: "12 weeks"
  },
  {
    id: "Y3_DL04", year: 3, name: "Computer Vision (CV)", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "CNNs, Object Detection (YOLO), OpenCV basics.",
    resource_name: "Fast.ai", resource_link: "https://course.fast.ai/", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y3_NLP01", year: 3, name: "NLP Fundamentals", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Data Scientist"],
    description: "Embeddings, RNNs, LSTMs, and basic Transformers.",
    resource_name: "Hugging Face Course", resource_link: "https://huggingface.co/learn/nlp-course/", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y3_DL03", year: 3, name: "Modern AI: LLMs", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Attention Mechanism, Transformer Architectures, BERT, GPT.",
    resource_name: "Andrej Karpathy", resource_link: "https://karpathy.ai/zero-to-hero.html", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y3_SEC01", year: 3, name: "Adversarial Machine Learning", category: "Cybersecurity", priority: "Medium", status: "To Do", role_alignment: ["AI Security Officer"],
    description: "Model evasion, poisoning attacks, and robust model defense.",
    resource_name: "OWASP AI Security", resource_link: "https://owasp.org/www-project-ai-security-and-privacy-guide/", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y3_FS01", year: 3, name: "Node.js & Express", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Building scalable REST APIs, Middleware, and JWT Auth.",
    resource_name: "Node.js Docs", resource_link: "https://nodejs.org/en/docs/", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y3_FS02", year: 3, name: "Advanced Databases", category: "Web Development", priority: "High", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "NoSQL (MongoDB) vs Advanced SQL (PostgreSQL), Schema design.",
    resource_name: "MongoDB University", resource_link: "https://learn.mongodb.com/", is_project: false, is_output: false, time_estimate: "4 weeks"
  },

  // ==================== YEAR 4: SPECIALIZATION ====================
  {
    id: "Y4_GA01", year: 4, name: "GenAI Frameworks (RAG)", category: "Deep Learning", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "LangChain, LlamaIndex, Vector Databases. Building RAG pipelines.",
    resource_name: "LangChain Docs", resource_link: "https://python.langchain.com/docs/", is_project: false, is_output: false, time_estimate: "5 weeks"
  },
  {
    id: "Y4_MLOPS01", year: 4, name: "MLOps Essentials", category: "MLOps", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer"],
    description: "Model Tracking (MLflow), Model Serving, Drift Detection.",
    resource_name: "Made With ML", resource_link: "https://madewithml.com/", is_project: false, is_output: false, time_estimate: "8 weeks"
  },
  {
    id: "Y4_DP01", year: 4, name: "Deployment & DevOps", category: "MLOps", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Docker, Kubernetes, CI/CD, Nginx, Cloud (AWS/GCP).",
    resource_name: "Docker Docs", resource_link: "https://docs.docker.com", is_project: false, is_output: false, time_estimate: "6 weeks"
  },
  {
    id: "Y4_IP01", year: 4, name: "DSA: Blind 75", category: "Interview Prep", priority: "High", status: "To Do", role_alignment: ["All Roles"],
    description: "Master the fundamental patterns in DSA.",
    resource_name: "Blind 75 List", resource_link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", is_project: false, is_output: false, time_estimate: "10 weeks"
  },
  {
    id: "Y4_IV01", year: 4, name: "System Design (HLD/LLD)", category: "Interview Prep", priority: "High", status: "To Do", role_alignment: ["AI/ML Engineer", "Full Stack Developer"],
    description: "Scalability, Caching, Load Balancers, and Class Diagrams.",
    resource_name: "System Design Primer", resource_link: "https://github.com/donnemartin/system-design-primer", is_project: false, is_output: false, time_estimate: "6 weeks"
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
    resource_name: "The STAR Method Guide",
    resource_link: "https://www.careereducation.columbia.edu/resources/star-method-behavioral-interviewing",
    is_project: false,
    is_output: false,
    time_estimate: "2 weeks"
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
    time_estimate: "3 weeks"
  },
  {
    id: "Y4_FS01", year: 4, name: "Advanced Web (Next.js)", category: "Web Development", priority: "Medium", status: "To Do", role_alignment: ["Full Stack Developer"],
    description: "Server Side Rendering, Static Generation, and Next.js App Router.",
    resource_name: "Next.js Docs", resource_link: "https://nextjs.org", is_project: false, is_output: false, time_estimate: "4 weeks"
  },
  
  // ==================== GLOBAL SKILLS ====================
  {
    id: "G_SS01", year: 0, name: "Discipline Training", category: "Soft Skills", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Minimum 1-2 hours of focused study every single day. Consistency over intensity.",
    resource_name: "James Clear: Atomic Habits", 
    resource_link: "https://jamesclear.com/atomic-habits", 
    is_project: false, is_output: false
  },
  {
    id: "G_SS02", year: 0, name: "Communication Skills", category: "Soft Skills", priority: "High", status: "In Progress", role_alignment: ["All Roles"],
    description: "Explain projects clearly. Practice speaking in technical and HR interviews.",
    resource_name: "Wharton: Communication Skills", 
    resource_link: "https://online.wharton.upenn.edu/blog/effective-communication-skills/", 
    is_project: false, is_output: false
  }
];