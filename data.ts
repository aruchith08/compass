
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
          { title: "Unit I: Matrices", topics: "Rank of a matrix by Echelon form, Normal form, Inverse of Non-singular matrices by Gauss-Jordan method, Solving system of Homogeneous and Non-Homogeneous equations, Gauss Seidel Iteration Method." },
          { title: "Unit II: Eigen values and Eigen vectors", topics: "Linear Transformation, Orthogonal Transformation, Eigen values, Eigen vectors, Diagonalization of a matrix, Cayley-Hamilton Theorem, Quadratic forms, Reduction to canonical form." },
          { title: "Unit III: Single Variable Calculus", topics: "Mean value theorems, Rolle’s theorem, Lagrange’s Mean value theorem, Cauchy’s Mean value Theorem, Taylor’s Series, Maclaurin's Series, Curve Tracing in cartesian coordinates." },
          { title: "Unit IV: Multivariable Calculus (Partial Diff)", topics: "Limit and continuity, Partial Differentiation, Euler’s Theorem, Total derivative, Jacobian, Functional dependence, Maxima and minima using Lagrange multipliers." },
          { title: "Unit V: Multivariable Calculus (Integration)", topics: "Double Integrals (Cartesian/Polar), Triple Integrals, Change of variables, Change of order of integration, Areas and Volumes by multiple integrals." }
        ]
      },
      { 
        sNo: 2, code: "PH102BS", title: "Advanced Engineering Physics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Crystallography & Materials Characterization", topics: "Unit cell, Bravais lattices, Packing factor, Miller indices, Defects in crystals, X-ray diffraction (Bragg’s law), Powder method, SEM block diagram." },
          { title: "Unit II: Quantum Mechanics", topics: "de-Broglie hypothesis, Heisenberg uncertainty principle, Schrödinger’s time independent wave equation, Particle in a 1D box, Kronig-Penney model, Discrete energy levels." },
          { title: "Unit III: Quantum Computing", topics: "Linear algebra for QC, Dirac’s Bra and Ket notation, Hilbert space, Bloch sphere, Qubits, Entanglement, Quantum gates, Shor's and Grover's algorithms." },
          { title: "Unit IV: Magnetic and Dielectric Materials", topics: "Magnetic moment, Hysteresis, Weiss domain theory, Ferrimagnetic materials, Polarization, Fe-RAM, Load cell, Fire sensor." },
          { title: "Unit V: Laser and Fibre Optics", topics: "Einstein coefficients, Population inversion, Ruby/He-Ne/CO2 lasers, LIDAR, Total internal reflection, Numerical aperture, Fiber losses." }
        ]
      },
      { 
        sNo: 3, code: "CS103ES", title: "Programming for Problem Solving", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Overview of C", topics: "Language Elements, Variable Declarations, Data Types, Arithmetic Expressions, Selection Structures (if/switch), Repetition and Loop Statements (while/for/do-while)." },
          { title: "Unit II: Functions & Pointers", topics: "Top-Down Design, Function Arguments, Scope of Names, Pointers, Indirection Operator, Pointers with Input/Output Parameters, Modular Programming." },
          { title: "Unit III: Arrays & Strings", topics: "1D/2D Arrays, Array Elements as Arguments, Searching and Sorting an Array, Multidimensional Arrays, String Basics, Array of Pointers, String Comparison." },
          { title: "Unit IV: Recursion & Derived Types", topics: "Tracing a Recursive Function, Structure and Union Types, User-Defined Structure Types, Nested Structures." },
          { title: "Unit V: Files & Algorithms", topics: "Text and Binary File Pointers, Searching (Linear/Binary), Sorting (Bubble, Insertion, Selection)." }
        ]
      },
      { sNo: 4, code: "EE104ES", title: "Basic Electrical Engineering", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "ME105ES", title: "Engineering Drawing & CAD", l: 2, t: 0, p: 2, credits: 3 },
      { sNo: 6, code: "PH106BS", title: "Advanced Engineering Physics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS107ES", title: "Programming for Problem Solving Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EE108ES", title: "Basic Electrical Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 9, code: "CS109ES", title: "IT Workshop", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "PC Hardware", topics: "Identify peripherals, Components in a CPU, Block diagram of CPU, Disassemble and assemble PC, Install MS Windows, Install Linux (Dual Boot)." },
          { title: "Internet & WWW", topics: "Orientation & Connectivity, Web Browser customization, Search Engines & Netiquette, Cyber Hygiene." },
          { title: "LaTeX & WORD", topics: "Word Orientation, Create project certificate, Create project abstract, Create a Newsletter, Formatting Fonts." },
          { title: "Excel", topics: "Excel Orientation, Create a Scheduler, Calculating GPA (Formulae), Split cells, Boolean and logical operators." },
          { title: "PowerPoint", topics: "Slide Layouts, Master Layouts, Interactive presentations, Audio/Video integration, Hidden slides." }
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
          { title: "Unit I: First Order ODE", topics: "Exact diff eq, Reducible to exact, Linear and Bernoulli’s, Orthogonal Trajectories, Newton’s law of cooling, Growth and decay." },
          { title: "Unit II: Higher Order ODE", topics: "Linear equations with constant coefficients, Non-Homogeneous terms, Method of variation of parameters, Cauchy-Euler equation." },
          { title: "Unit III: Laplace Transforms", topics: "Standard functions, Shifting theorems, periodic functions, Inverse Laplace, Convolution theorem, Initial value problems." },
          { title: "Unit IV: Vector Differentiation", topics: "Gradient, Divergence and Curl, Scalar potential, Vector Identities, Solenoidal and Irrotational vectors." },
          { title: "Unit V: Vector Integration", topics: "Line, Surface and Volume Integrals, Theorems of Green, Gauss and Stokes." }
        ]
      },
      { 
        sNo: 2, code: "CH202BS", title: "Engineering Chemistry", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Water and its treatment", topics: "Hardness estimation by EDTA, Boiler troubles (Scales/Sludges), Calgon conditioning, Defluoridation, Reverse osmosis." },
          { title: "Unit II: Electrochemistry & Corrosion", topics: "Electrode potential, Nernst equation, EMF of cell, SHE and Calomel electrode, pH determination, Theories of corrosion, Cathodic protection." },
          { title: "Unit III: Energy sources", topics: "Batteries (Zn-air, Li-ion), Fuel Cells (DMFC), Calorific value, Petroleum refining, Bio-diesel, Green Hydrogen." },
          { title: "Unit IV: Polymers", topics: "Addition/Condensation mechanism, Thermoplastics vs Thermosetting, FRP, Biodegradable polymers (Polylactic acid)." },
          { title: "Unit V: Advanced Functional Materials", topics: "Smart materials (Nitinol), Piezoelectric (quartz), Biosensors, Spectroscopic apps (UV-Vis, IR, Raman)." }
        ]
      },
      { 
        sNo: 3, code: "CS203ES", title: "Data Structures", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Intro to DS", topics: "Abstract data types, Linear list, Singly/Doubly/Circular linked list, Stacks-Operations, Queue Algorithm, Queue Applications." },
          { title: "Unit II: Trees", topics: "Binary Tree creation, Traversals, Binary Search Trees (BST) Operations, Threaded Binary Trees, AVL Trees, Splay Trees." },
          { title: "Unit III: Multiway Search Trees", topics: "B Trees, B+ Trees, Heaps (Binary, Binomial, Fibonacci), Interpolation search, Jump search." },
          { title: "Unit IV: Graphs", topics: "Directed Graphs, Bi-connected Components, Traversal (BFS/DFS), Sorting (Radix, Heap, Shell, Tree Sort)." },
          { title: "Unit V: Hashing & Files", topics: "Hash Functions, Collision Resolution (Open Addressing/Chaining), Data hierarchy, Indexing." }
        ]
      },
      { sNo: 4, code: "EC204ES", title: "Electronic Devices & Circuits", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "EN205HS", title: "English for Skill Enhancement", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 6, code: "CH206BS", title: "Engineering Chemistry Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS207ES", title: "Data Structures Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EN208HS", title: "ELCS Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "ME209ES", title: "Engineering Workshop", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 10, code: "CS210ES", title: "Python Programming Lab", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "Tasks 1-10", topics: "Calculator using interpreter, Compound Interest, Fibonacci sequence, Triangle loops, Prime numbers check, List to Array conversion, Palindrome check, Sorting check." },
          { title: "Tasks 11-20", topics: "Duplicates removal, Invert dictionary, String characters comma, First letter uppercase, n-bit binary strings, Matrix multiplication, Module construction." },
          { title: "Tasks 21-35", topics: "Exception handling structure, Draw rectangle/point on canvas, Class instantiation (Circle), Email/Phone validation, File merge, Word occurrences, GUI wizard (Submit/Reset)." }
        ]
      }
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
          { title: "Unit I: Basics of Number Theory", topics: "GCD, Euclidean algorithm, Prime Factorization, Fermat numbers, Congruences, Linear congruences." },
          { title: "Unit II: Random Variables", topics: "Discrete and Continuous Probability Distributions, Mean and Variance, Binomial Distribution, Poisson distribution." },
          { title: "Unit III: Continuous Distributions", topics: "Uniform/Normal Distribution, Normal Approximation to Binomial, Sampling Distribution of Means, Central Limit Theorem." },
          { title: "Unit IV: Tests of Hypotheses", topics: "Statistical Hypotheses, Testing a Statistical Hypothesis, Single sample/Two samples tests, F-distribution." },
          { title: "Unit V: Applied Statistics", topics: "Least squares method, Fitting straight lines, Parabolas, Correlation and Regression, Rank correlation." }
        ]
      },
      { 
        sNo: 2, code: "CS302PC", title: "Computer Organization and Architecture", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Digital Logic", topics: "Boolean Algebra, Logic Gates, Binary codes, Data Representation (Fixed/Floating Point), Block diagram of Digital Computer." },
          { title: "Unit II: Combinational & Sequential", topics: "Binary Adder-Subtractor, Multiplier, Decoders, HDL, latches, Flip-Flops, Counters, shift Registers." },
          { title: "Unit III: RTL & Basic Design", topics: "Register Transfer language, Arithmetic Micro ops, Instruction cycle, Timing and Control, Memory Reference Instructions." },
          { title: "Unit IV: CPU", topics: "Microprogrammed Control, Addressing modes, Data Transfer and Manipulation, Program Control." },
          { title: "Unit V: Memory & I/O", topics: "Hierarchy, Main Memory, Virtual Memory, Asynchronous data transfer, DMA, Cache Memory." }
        ]
      },
      { 
        sNo: 3, code: "CS303PC", title: "Object Oriented Programming through Java", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Java Basics", topics: "OO thinking, buzzwords, Data types, type conversion, simple java program, Access control, Recursion, String class." },
          { title: "Unit II: Inheritance & Packages", topics: "Substitutability, forms of inheritance, Polymorphism, Accessing a Package, CLASSPATH, Interfaces." },
          { title: "Unit III: Exception & Multithreading", topics: "Try/catch/throw/finally, thread life cycle, thread priorities, inter thread communication, daemon threads." },
          { title: "Unit IV: Event Handling & Swings", topics: "java.util/java.io packages, Event sources/Listeners, Delegation model, Layout managers." },
          { title: "Unit V: Swing Advanced", topics: "MVC architecture, JComponent, Tabbed/Scroll Panes, Menus, JSeperator, Popup menus." }
        ]
      },
      { sNo: 4, code: "CS304PC", title: "Software Engineering", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 5, code: "CS305PC", title: "Database Management System", l: 3, t: 0, p: 0, credits: 3 },
      { sNo: 6, code: "MA306PC", title: "Computational Mathematics Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS307PC", title: "Object Oriented Programming through Java Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS308PC", title: "Software Engineering Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS309PC", title: "Database Management Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 10, code: "CS310SD", title: "Node JS/React JS/Django", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "Full Stack Tasks", topics: "Responsive web shopping cart, Bootstrap application, client side validation, ES6 features, Weather API (openweathermap), Java DB CRUD, XML Validation, REST API (Postman), JWT authorized endpoints, React Routing, chart.js visualization, TODO app deploy to GitHub." }
        ]
      }
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
          { title: "Unit I: Mathematical logic", topics: "Statements and Notation, Connectives, Normal Forms, Theory of Inference, Predicate Calculus." },
          { title: "Unit II: Set theory", topics: "Basic Concepts, Representation of Discrete Structures, Relations and Ordering, Functions." },
          { title: "Unit III: Algebraic Structures", topics: "Introduction, Algebraic Systems, Semi groups and Monoids, Lattices, Boolean Algebra." },
          { title: "Unit IV: Combinatorics", topics: "Basics of Counting, Enumerating Combinations/Permutations with Repetitions, Binomial Coefficient, Principle of Exclusion." },
          { title: "Unit V: Graph Theory", topics: "Isomorphism, Subgraphs, Spanning Trees, Binary Trees, Euler’s Formula, Four-Color Problem." }
        ]
      },
      { 
        sNo: 2, code: "CS402PC", title: "Operating Systems", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Simple Batch, Multiprogrammed, Time-shared, System components, System Calls, Process concepts, Threads." },
          { title: "Unit II: CPU Scheduling", topics: "Scheduling Criteria, Algorithms, fork/exit/wait, Deadlocks Characterization, Deadlock Prevention and Recovery." },
          { title: "Unit III: Process Management", topics: "Critical Section Problem, Semaphores, Monitors, IPC (Pipes, FIFOs, Shared memory, message queues)." },
          { title: "Unit IV: Virtual Memory", topics: "Logical vs Physical, Paging, Segmentation, Page Replacement Algorithms." },
          { title: "Unit V: File System", topics: "Access methods, Directory Structure, Allocation methods, Free-space Management, UNIX system calls." }
        ]
      },
      { 
        sNo: 3, code: "CS403PC", title: "Algorithms Design and Analysis", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Asymptotic Notations, Binary search, Quick sort, Merge sort, Strassen’s multiplication." },
          { title: "Unit II: Disjoint Sets", topics: "Set operations, union/find, Backtracking (n-queens, sum of subsets, graph coloring)." },
          { title: "Unit III: Dynamic Programming", topics: "Optimal BST, 0/1 knapsack, All pairs shortest path, Traveling salesperson." },
          { title: "Unit IV: Greedy method", topics: "Job sequencing, knapsack problem, MST (Kruskal/Prim), Binary Trees, Biconnected components." },
          { title: "Unit V: Branch and Bound", topics: "LC/FIFO solutions, NP-Hard and NP-Complete classes, Cook’s theorem." }
        ]
      },
      { 
        sNo: 4, code: "CS404PC", title: "Computer Networks", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "The Internet, Protocol Models (ISO-OSI, TCP/IP), Network attacks, History of Networking." },
          { title: "Unit II: Application Layer", topics: "HTTP, FTP, SMTP, DNS, Peer-to-Peer Applications, Socket Programming." },
          { title: "Unit III: Transport Layer", topics: "UDP, Reliable Data Transfer, Go-Back-N, Selective Repeat, TCP Congestion Control, Fairness." },
          { title: "Unit IV: Network Layer", topics: "IP, Forwarding/Addressing, Datagram Format, Routing Algorithms (LS, DV), OSPF, BGP, Multicasting." },
          { title: "Unit V: Link Layer", topics: "Error-Detection/Correction, Parity Checks, CRC, Multiple Access, Ethernet, VLANs, Wireless LAN." }
        ]
      },
      { 
        sNo: 5, code: "CS405PC", title: "Machine Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Human learning types, well-posed problem, Machine learning activities, Pre-processing, Underfitting vs overfitting." },
          { title: "Unit II: Feature Engineering", topics: "PCA, SVD, LDA, Feature subset selection, Bayes rule, central limit theorem, Naïve Bayes, Bayesian belief network." },
          { title: "Unit III: Supervised Learning", topics: "Regression algorithms (Linear/Logistic), KNN, Decision tree, Support vector machines, Random Forest." },
          { title: "Unit IV: Unsupervised Learning", topics: "Clustering (k-Means, K-Medoids), Hierarchical clustering, Density-based (DBSCAN)." },
          { title: "Unit V: Neural Networks", topics: "Biological vs Artificial neuron, Activation functions, Perceptron, Back propagation, reinforcement learning intro." }
        ]
      },
      { sNo: 6, code: "MS406HS", title: "Innovation and Entrepreneurship", l: 2, t: 0, p: 0, credits: 2 },
      { sNo: 7, code: "CS407PC", title: "Operating Systems Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "CS408PC", title: "Computer Networks lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "CS409PC", title: "Machine Learning Lab", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 10, code: "CS410SD", title: "Data Visualization- R Programming/ Power BI", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 11, code: "VA400HS", title: "Indian Knowledge System", l: 1, t: 0, p: 0, credits: 1 }
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
      { code: "AI511OE", title: "Fundamentals of AI (Group I)" },
      { code: "AI512OE", title: "Machine Learning Basics (Group I)" },
      { code: "AI621OE", title: "Intro to NLP (Group II)" },
      { code: "AI622OE", title: "AI applications (Group II)" },
      { code: "AI731OE", title: "Chatbots (Group III)" },
      { code: "AI732OE", title: "Computer Vision with Open CV (Group III)" }
    ]
  }
];
