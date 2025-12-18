
import { RoadmapItem, SyllabusSemester, ElectiveGroup } from './types';

export const ROADMAP_DATA: RoadmapItem[] = [
  // ==================== YEAR 1: STRONG FOUNDATION ====================
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

  // ==================== YEAR 4: SPECIALIZATION + JOB READY ====================
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
  }
];

export const ACADEMIC_SYLLABUS: SyllabusSemester[] = [
  {
    id: "1-1",
    title: "Year 1, Sem 1",
    courses: [
      { 
        sNo: 1, code: "MA101BS", title: "Matrices and Calculus", l: 3, t: 1, p: 0, credits: 4,
        units: [
          { title: "Unit I: Matrices", topics: "Rank of a matrix by Echelon form and Normal form, Inverse of Non-singular matrices by Gauss-Jordan method, Solving system of Homogeneous and Non-Homogeneous equations, Gauss Seidel Iteration Method." },
          { title: "Unit II: Eigen values and Eigen vectors", topics: "Linear Transformation and Orthogonal Transformation, Eigen values, Eigen vectors, Diagonalization of a matrix, Cayley-Hamilton Theorem, Quadratic forms, Reduction of Quadratic form to canonical form." },
          { title: "Unit III: Single Variable Calculus", topics: "Mean value theorems: Rolle’s theorem, Lagrange’s Mean value theorem, Cauchy’s Mean value Theorem, Taylor’s Series, Curve Tracing in cartesian coordinates." },
          { title: "Unit IV: Multivariable Calculus (Partial Diff)", topics: "Euler’s Theorem, Total derivative, Jacobian, Functional dependence, Maxima and minima using Lagrange multipliers." },
          { title: "Unit V: Multivariable Calculus (Integration)", topics: "Double Integrals (Cartesian/Polar), Triple Integrals, Change of variables, Areas and Volumes by multiple integrals." }
        ]
      },
      { 
        sNo: 2, code: "PH102BS", title: "Advanced Engineering Physics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Crystallography & Materials Characterization", topics: "Unit cell, Bravais lattices, Miller indices, Point defects, X-ray diffraction (Bragg’s law), SEM block diagram." },
          { title: "Unit II: Quantum Mechanics", topics: "de-Broglie hypothesis, Schrodinger’s time independent wave equation, Particle in a 1D box, Kronig-Penney model, Discrete energy levels." },
          { title: "Unit III: Quantum Computing", topics: "Linear algebra for QC, Dirac’s Bra and Ket notation, Qubits, Entanglement, Quantum gates, Shor's and Grover's algorithms." },
          { title: "Unit IV: Magnetic and Dielectric Materials", topics: "Hysteresis, Weiss domain theory, Ferrimagnetic materials, Polarization, Fe-RAM, Load cell, Fire sensor." },
          { title: "Unit V: Laser and Fibre Optics", topics: "Einstein coefficients, Population inversion, He-Ne/CO2 laser, Total internal reflection, Numerical aperture, Fiber losses." }
        ]
      },
      { 
        sNo: 3, code: "CS103ES", title: "Programming for Problem Solving", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Overview of C", topics: "Data Types, Arithmetic Expressions, Selection Structures (if/switch), Repetition and Loop Statements (while/for/do-while)." },
          { title: "Unit II: Functions & Pointers", topics: "Building Programs with Functions, Top-Down Design, Indirection Operator, Pointers with Input/Output Parameters." },
          { title: "Unit III: Arrays & Strings", topics: "1D/2D Arrays, Searching and Sorting an Array, Multidimensional Arrays, String Basics, Array of Pointers." },
          { title: "Unit IV: Recursion & Derived Types", topics: "Tracing a Recursive Function, Structure and Union Types, User-Defined Structure Types." },
          { title: "Unit V: Files & Algorithms", topics: "Text and Binary File Pointers, Searching (Linear/Binary), Sorting (Bubble, Insertion, Selection)." }
        ]
      },
      { 
        sNo: 4, code: "EE104ES", title: "Basic Electrical Engineering", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: D.C. Circuits", topics: "Electrical elements (R,L,C), KVL/KCL, Superposition, Thevenin and Norton Theorems, Time-domain RL/RC." },
          { title: "Unit II: A.C. Circuits", topics: "Sinusoidal waveforms, Phasor representation, Power factor, Resonance in series R-L-C, Three-phase balanced circuits." },
          { title: "Unit III: Transformers", topics: "Ideal and practical transformer, Equivalent circuit, Regulation and efficiency, Auto-transformer." },
          { title: "Unit IV: Electrical Machines", topics: "DC shunt machine, Rotating magnetic field, Three-phase induction motor, Synchronous generator." },
          { title: "Unit V: Electrical Installations", topics: "LT Switchgear (SFU, MCB, ELCB), Wires and Cables, Earthing, Battery backup, Power factor improvement." }
        ]
      },
      { 
        sNo: 5, code: "ME105ES", title: "Engineering Drawing & CAD", l: 2, t: 0, p: 2, credits: 3,
        units: [
          { title: "Unit I: Intro to Eng Graphics", topics: "Scales, Plain and Diagonal, Conic Sections, Cycloid, Epicycloid and Hypocycloid." },
          { title: "Unit II: Orthographic Projections", topics: "Projection of Points and Lines, Plane regular geometric figures, Auxiliary Planes, CAD views/commands." },
          { title: "Unit III: Projections of Regular Solids", topics: "Prism, Cylinder, Pyramid, Cone, Sectional views." },
          { title: "Unit IV: Development of Surfaces", topics: "Development of Prism, Cylinder, Pyramid and Cone." },
          { title: "Unit V: Isometric Projections", topics: "Isometric Scale, Isometric Views of Lines/Planes/Solids, Conversion of Isometric to Orthographic." }
        ]
      },
      { sNo: 6, code: "PH106BS", title: "Advanced Engineering Physics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS107ES", title: "Programming for Problem Solving Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EE108ES", title: "Basic Electrical Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 9, code: "CS109ES", title: "IT Workshop", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "PC Hardware", topics: "Identify peripherals, Disassemble/Assemble PC, Install MS Windows, Install Linux (Dual Boot)." },
          { title: "Internet & WWW", topics: "Connectivity Boot Camp, Web Browser customization, Search Engines & Netiquette, Cyber Hygiene." },
          { title: "LaTeX & WORD", topics: "Word Orientation, Formatting Styles, Creating project abstract, Creating a Newsletter." },
          { title: "Excel", topics: "Creating a Scheduler, Calculating GPA (Formulae), Split cells, Sorting, Boolean operators." },
          { title: "PowerPoint", topics: "Slide Layouts, Master Layouts, Interactive presentations, Hidden slides." }
        ]
      }
    ],
    totalCredits: 20
  },
  {
    id: "1-2",
    title: "Year 1, Sem 2",
    courses: [
      { 
        sNo: 1, code: "MA201BS", title: "ODE & Vector Calculus", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: First Order ODE", topics: "Exact diff eq, Linear and Bernoulli’s, Orthogonal Trajectories, Newton’s law of cooling." },
          { title: "Unit II: Higher Order ODE", topics: "Linear equations with constant coefficients, Method of variation of parameters." },
          { title: "Unit III: Laplace Transforms", topics: "Standard functions, Shifting theorems, periodic functions, Inverse Laplace, Convolution theorem." },
          { title: "Unit IV: Vector Differentiation", topics: "Gradient, Divergence and Curl, Scalar potential, Vector Identities, Solenoidal/Irrotational vectors." },
          { title: "Unit V: Vector Integration", topics: "Line, Surface and Volume Integrals, Theorems of Green, Gauss and Stokes." }
        ]
      },
      { 
        sNo: 2, code: "CH202BS", title: "Engineering Chemistry", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Water and its treatment", topics: "Hardness estimation by EDTA, Disinfection (chlorination), Softening methods, Reverse osmosis." },
          { title: "Unit II: Electrochemistry & Corrosion", topics: "EMF of cell, SHE and Calomel electrode, pH determination, Theories of corrosion, Cathodic protection." },
          { title: "Unit III: Energy sources", topics: "Zn-air and Lithium ion battery, Fuel Cells (DMFC), Petroleum refining, Bio-diesel, Green Hydrogen." },
          { title: "Unit IV: Polymers", topics: "Addition/Condensation mechanism, Thermoplastics vs Thermosetting, FRP, Biodegradable polymers." },
          { title: "Unit V: Advanced Functional Materials", topics: "Nitinol, Biosensors, Spectroscopic apps (UV-Vis, IR, Raman)." }
        ]
      },
      { 
        sNo: 3, code: "CS203ES", title: "Data Structures", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Intro to DS", topics: "Linear list, singly/doubly/circular linked list, Stack ADT, Queue ADT." },
          { title: "Unit II: Trees", topics: "Binary Search Trees (BST) Operations, AVL Trees, Red–Black Trees, Splay Trees." },
          { title: "Unit III: Multiway Search Trees", topics: "B Trees, B+ Trees, Binary Heaps, Fibonacci heaps, Interpolation/Jump search." },
          { title: "Unit IV: Graphs", topics: "Directed Graphs, Representation, Traversal (BFS/DFS), Sorting (Radix, Heap, Shell)." },
          { title: "Unit V: Hashing & Files", topics: "Collision Resolution (Open Addressing/Chaining), Data hierarchy, Indexing." }
        ]
      },
      { 
        sNo: 4, code: "EC204ES", title: "Electronic Devices & Circuits", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Diode Characteristics", topics: "PN junction, Diode models, Rectifiers, Zener diode regulation." },
          { title: "Unit II: BJT", topics: "Structure and principle, CB/CE/CC Configurations, Input/Output characteristics, h-parameters." },
          { title: "Unit III: BJT Biasing", topics: "Fixed bias, Collector-to-base, Voltage divider, Stability factors." },
          { title: "Unit IV: Transistor Amplifiers", topics: "Small-signal amplifier, h-parameter equivalent circuit, Emitter bypass capacitor." },
          { title: "Unit V: Special Diodes & FETs", topics: "Tunnel Diode, Solar Cell, Schottky Diode, JFET/MOSFET, FinFETs, CNTFETs." }
        ]
      },
      { 
        sNo: 5, code: "EN205HS", title: "English for Skill Enhancement", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Perspectives", topics: "Benjamin M. Spock - The Generation Gap, Word Formation (Prefixes/Suffixes), Articles/Prepositions." },
          { title: "Unit II: Digital Transformation", topics: "Emerging Technologies, Noun-pronoun/Subject-verb agreement, Coherence, Essay Writing." },
          { title: "Unit III: Attitude & Gratitude", topics: "Leisure (W.H. Davies), Tenses, Formal Letter/Email Etiquette." },
          { title: "Unit IV: Entrepreneurship", topics: "Why a Start-Up Needs to Find its Customers First, Phrasal Verbs, Passive to Active." },
          { title: "Unit V: Integrity & Professionalism", topics: "Professional Ethics, One Word Substitutes, Direct/Indirect Speech, Report Writing." }
        ]
      },
      { sNo: 6, code: "CH206BS", title: "Engineering Chemistry Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS207ES", title: "Data Structures Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EN208HS", title: "ELCS Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "ME209ES", title: "Engineering Workshop", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS210ES", title: "Python Programming Lab", l: 0, t: 0, p: 2, credits: 1 }
    ],
    totalCredits: 20
  },
  {
    id: "2-1",
    title: "Year 2, Sem 1",
    courses: [
      { 
        sNo: 1, code: "MA401BS", title: "Mathematical and Statistical Foundations", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Basics of Number Theory", topics: "GCD, Prime Factorization, Euclidean algorithm, Congruences, Linear congruences." },
          { title: "Unit II: Random Variables", topics: "Discrete/Continuous Probability Distributions, Mean and Variance, Binomial/Poisson distribution." },
          { title: "Unit III: Continuous Distributions", topics: "Uniform/Normal Distribution, Central Limit Theorem, Sampling Distribution of Means." },
          { title: "Unit IV: Tests of Hypotheses", topics: "Testing a Statistical Hypothesis, Single sample/Two samples tests, F-distribution." },
          { title: "Unit V: Applied Statistics", topics: "Least squares, Fitting straight lines, Correlation and Regression, Rank correlation." }
        ]
      },
      { 
        sNo: 2, code: "CS302PC", title: "Computer Organization and Architecture", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Boolean Algebra & Logic Gates", topics: "Binary codes/Registers, Fixed/Floating Point, Block diagram of Digital Computer." },
          { title: "Unit II: Combinational & Sequential", topics: "Binary Adder-Subtractor, Multiplier, Decoders, HDL, Latches, Flip-Flops, Counters." },
          { title: "Unit III: RTL & Basic Design", topics: "Register Transfer language, Arithmetic Micro ops, Instruction cycle, Memory Reference Instructions." },
          { title: "Unit IV: Central Processing Unit", topics: "Microprogrammed Control, Addressing modes, Data Transfer and Manipulation." },
          { title: "Unit V: Memory & I/O Org", topics: "Hierarchy, Virtual Memory, Asynchronous data transfer, DMA, Cache Memory." }
        ]
      },
      { 
        sNo: 3, code: "CS303PC", title: "Object Oriented Programming through Java", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Java Basics", topics: "OO concepts, History, Data types, simple java program, Access control, Recursion, String class." },
          { title: "Unit II: Inheritance & Packages", topics: "Hierarchical abstractions, Substitutability, Polymorphism, Accessing a Package, Interfaces." },
          { title: "Unit III: Exception & Multithreading", topics: "Try/catch/throw/finally, thread life cycle, priorities, inter thread communication." },
          { title: "Unit IV: Event Handling & Swings", topics: "java.util/java.io packages, Event sources/Listeners, Delegation model, Layout managers." },
          { title: "Unit V: Swing Advanced", topics: "MVC architecture, Components/Containers, Scroll Panes, Menus, Popup menus." }
        ]
      },
      { 
        sNo: 4, code: "CS304PC", title: "Software Engineering", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Waterfall, Spiral, Incremental, Concurrent models, Agile Development." },
          { title: "Unit II: Requirements", topics: "Functional/Non-functional, SRD, Elicitation and analysis, Validation." },
          { title: "Unit III: Design Engineering", topics: "Process and quality, UML models, case diagrams, sequence diagrams." },
          { title: "Unit IV: Testing Strategies", topics: "Black-box/White-box, validation testing, system testing, art of debugging." },
          { title: "Unit V: Risk Management", topics: "Reactive vs proactive, RMMM, ISO 9000 quality standards." }
        ]
      },
      { 
        sNo: 5, code: "CS305PC", title: "Database Management System", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Intro & Design", topics: "DBMS vs File System, ER Diagrams, Entities/Attributes, Conceptual Design." },
          { title: "Unit II: Relational Model", topics: "Integrity constraints, Querying relational data, Relational Algebra, Calculus." },
          { title: "Unit III: SQL & Refinement", topics: "UNION/INTERSECT/EXCEPT, Nested Queries, Triggers, Normal forms (1NF-5NF), BCNF." },
          { title: "Unit IV: Transactions", topics: "ACID properties, Serializability, Isolation, Lock Based/Timestamp Protocols, Recovery." },
          { title: "Unit V: Storage & Indexing", topics: "File Organization, Hash Based/Tree based Indexing, ISAM, B+ Trees." }
        ]
      },
      { sNo: 6, code: "MA306PC", title: "Computational Mathematics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS307PC", title: "OOP through Java Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS308PC", title: "Software Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS309PC", title: "Database Management Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS310SD", title: "Node JS/React JS/Django", l: 0, t: 0, p: 2, credits: 1 }
    ],
    totalCredits: 20
  },
  {
    id: "2-2",
    title: "Year 2, Sem 2",
    courses: [
      { 
        sNo: 1, code: "CS401PC", title: "Discrete Mathematics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Mathematical logic", topics: "Statements and Notation, Connectives, Normal Forms, Predicate Calculus." },
          { title: "Unit II: Set theory", topics: "Basic Concepts, Relations and Ordering, Functions." },
          { title: "Unit III: Algebraic Structures", topics: "Semi groups and Monoids, Lattices, Boolean Algebra." },
          { title: "Unit IV: Combinatorics", topics: "Basics of Counting, Binomial Coefficient, Principle of Exclusion." },
          { title: "Unit V: Graph Theory", topics: "Isomorphism, Spanning Trees, Planar Graphs, Euler’s Formula, Four-Color Problem." }
        ]
      },
      { 
        sNo: 2, code: "CS402PC", title: "Operating Systems", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Simple Batch, Multiprogrammed, Time-shared, System Calls, Process concepts." },
          { title: "Unit II: CPU Scheduling", topics: "Criteria, Algorithms, fork/exit/wait, Deadlock Prevention and Recovery." },
          { title: "Unit III: Process Management", topics: "Critical Section Problem, Semaphores, IPC (Pipes, FIFOs, Shared memory)." },
          { title: "Unit IV: Virtual Memory", topics: "Logical vs Physical, Paging, Segmentation, Page Replacement Algorithms." },
          { title: "Unit V: File System", topics: "Interface, Structure, Allocation methods, Free-space Management." }
        ]
      },
      { 
        sNo: 3, code: "CS403PC", title: "Algorithms Design and Analysis", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Asymptotic Notations, Binary search, Quick sort, Merge sort, Strassen’s multiplication." },
          { title: "Unit II: Disjoint Sets", topics: "Set operations, Backtracking (n-queens, sum of subsets, graph coloring)." },
          { title: "Unit III: Dynamic Programming", topics: "Optimal BST, 0/1 knapsack, Shortest path, Traveling salesperson." },
          { title: "Unit IV: Greedy method", topics: "Job sequencing, MST (Kruskal/Prim), Single source shortest path." },
          { title: "Unit V: Branch and Bound", topics: "LC/FIFO solutions, NP-Hard/Complete classes, Cook’s theorem." }
        ]
      },
      { 
        sNo: 4, code: "CS404PC", title: "Computer Networks", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Circuit/Packet Switching, Protocol reference models (ISO-OSI, TCP/IP), Network attacks." },
          { title: "Unit II: Application Layer", topics: "Web and HTTP, FTP, SMTP, DNS, Socket Programming." },
          { title: "Unit III: Transport Layer", topics: "UDP, Reliable Data Transfer, Go-Back-N, Selective Repeat, TCP Congestion Control." },
          { title: "Unit IV: Network Layer", topics: "IP, Forwarding/Addressing, Routing Algorithms (LS, DV), OSPF, BGP, Multicasting." },
          { title: "Unit V: Link Layer", topics: "Error-Detection/Correction, CRC, Multiple Access, Ethernet, VLANs, Wireless LAN." }
        ]
      },
      { 
        sNo: 5, code: "CS405PC", title: "Machine Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Model Preparation, Evaluation (cross-validation), underfitting vs overfitting." },
          { title: "Unit II: Feature Engineering", topics: "PCA, SVD, LDA, Bayes rule, central limit theorem, Bayesian belief network." },
          { title: "Unit III: Supervised Learning", topics: "Linear/Logistic Regression, KNN, Decision tree, Support vector machines, Random Forest." },
          { title: "Unit IV: Unsupervised Learning", topics: "Clustering (k-Means, K-Medoids), Hierarchical, Density-based (DBSCAN)." },
          { title: "Unit V: Neural Networks", topics: "Perceptron, learning process in ANN, Back propagation, reinforcement learning intro." }
        ]
      },
      { sNo: 6, code: "MS406HS", title: "Innovation and Entrepreneurship", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 7, code: "CS407PC", title: "Operating Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS408PC", title: "Computer Networks lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS409PC", title: "Machine Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS410SD", title: "Data Visualization- R Programming/ Power BI", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 11, code: "VA400HS", title: "Indian Knowledge System", l: 1, t: 0, p: 0, credits: 1,
        units: [
          { title: "Unit 1: Introduction", topics: "Nature, Scope and Salient Aspects of Bharatiya Jnana Parampara (Vedas, Upanishads)." },
          { title: "Unit 2: History & Literature", topics: "Gurukul System, Sanskrit in NLP, Vedic Literature, Scientific Treatises." },
          { title: "Unit 3: Scientific Theories", topics: "Physics, Chemistry and Mathematics in ancient Indian Literature." },
          { title: "Unit 4: Wellness Systems", topics: "Yoga System, Ayurveda System, Ancient Indian Aesthetics." },
          { title: "Unit 5: Engineering & Fine Arts", topics: "Silk, Cotton and Ship Building, Temple Architecture, Music and Folk Arts." }
        ]
      }
    ],
    totalCredits: 22
  },
  {
    id: "3-1",
    title: "Year 3, Sem 1",
    courses: [
      { sNo: 1, code: "AI501PC", title: "Artificial Intelligence", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI502PC", title: "Automata theory and Compiler Design", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "AI503PC", title: "Data Analytics and Visualization", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE1", title: "Professional Elective-I", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "OE1", title: "Open Elective-I", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 6, code: "AI504PC", title: "Artificial Intelligence Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "AI505PC", title: "Compiler Design Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI506PC", title: "Data Analytics and Visualization Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "AI507PC", title: "Field Based Research Project", l: 0, t: 0, p: 4, credits: 2 },
      { sNo: 10, code: "AI508SD", title: "UI Design –Flutter/ Android Studio", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA500HS", title: "Gender Sensitization/Human Values/Ethics", l: 1, t: 0, p: 0, credits: 1 }
    ],
    totalCredits: 21
  },
  {
    id: "3-2",
    title: "Year 3, Sem 2",
    courses: [
      { sNo: 1, code: "AI601PC", title: "Natural Language Processing", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI602PC", title: "Deep Learning", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "MS603HS", title: "Business Economics and Financial Analysis", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE2", title: "Professional Elective-II", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "OE2", title: "Open Elective – II", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 6, code: "AI604PC", title: "Natural Language Processing Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "AI605PC", title: "Deep Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI606PC", title: "Chatbots Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "EN607HS", title: "English for Employability Skills Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "AI608SD", title: "Prompt Engineering", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA600ES", title: "Environmental Science", l: 1, t: 0, p: 0, credits: 1 }
    ],
    totalCredits: 20
  },
  {
    id: "4-1",
    title: "Year 4, Sem 1",
    courses: [
      { sNo: 1, code: "AI701PC", title: "Reinforcement Learning", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "AI702PC", title: "Generative AI", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "MS703HS", title: "Fundamentals of Management for Engineers", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 4, code: "PE3", title: "Professional Elective-III", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "PE4", title: "Professional Elective – IV", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 6, code: "OE3", title: "Open Elective – III", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 7, code: "AI704PC", title: "Reinforcement Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "AI705PC", title: "Generative AI Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "AI706PC", title: "Industry Oriented Mini Project/ Internship", l: 0, t: 0, p: 4, credits: 2 }
    ],
    totalCredits: 21
  },
  {
    id: "4-2",
    title: "Year 4, Sem 2",
    courses: [
      { sNo: 1, code: "PE5", title: "Professional Elective – V", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 2, code: "PE6", title: "Professional Elective – VI", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 3, code: "AI801PC", title: "Project Work", l: 0, t: 0, p: 42, credits: 14 }
    ],
    totalCredits: 20
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
    title: "Open Electives (I, II, III)",
    courses: [
      { code: "AI511OE", title: "Fundamentals of AI (I)" },
      { code: "AI512OE", title: "Machine Learning Basics (I)" },
      { code: "AI621OE", title: "Introduction to Natural Language Processing (II)" },
      { code: "AI622OE", title: "AI applications (II)" },
      { code: "AI731OE", title: "Chatbots (III)" },
      { code: "AI732OE", title: "Computer Vision with Open CV (III)" }
    ]
  }
];
