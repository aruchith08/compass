
import { SyllabusSemester, ElectiveGroup, RoadmapItem } from './types';
import { ROADMAP_DATA_ITEMS } from './roadmapData';
import { LEARN_DATA_RESOURCES } from './learnData';
import { PORTFOLIO_DATA_ITEMS } from './portfolioData';

// Combine specialized data sources into the main export
export const ROADMAP_DATA: RoadmapItem[] = [
    ...ROADMAP_DATA_ITEMS,
    ...LEARN_DATA_RESOURCES,
    ...PORTFOLIO_DATA_ITEMS
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
          { title: "Unit III: Single Variable Calculus", topics: "Mean value theorems: Rolle’s theorem, Lagrange’s Mean value theorem, Cauchy’s Mean value Theorem, Taylor’s Series, Maclaurin's Series, Curve Tracing in cartesian coordinates." },
          { title: "Unit IV: Multivariable Calculus (Partial Diff)", topics: "Limit and continuity, Partial Differentiation, Euler’s Theorem, Total derivative, Jacobian, Functional dependence, Maxima and minima using Lagrange multipliers." },
          { title: "Unit V: Multivariable Calculus (Integration)", topics: "Double Integrals (Cartesian and Polar), Triple Integrals, Change of variables, Change of order of integration, Areas and Volumes by multiple integrals." }
        ]
      },
      { 
        sNo: 2, code: "PH102BS", title: "Advanced Engineering Physics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Crystallography & Materials Characterization", topics: "Unit cell, Bravais lattices, Packing factor, Miller indices, Defects in crystals, X-ray diffraction: Bragg’s law, Powder method, SEM block diagram." },
          { title: "Unit II: Quantum Mechanics", topics: "de-Broglie hypothesis, Heisenberg uncertainty principle, Schrödinger’s time independent wave equation, Particle in a 1D box, Kronig-Penney model, Discrete energy levels." },
          { title: "Unit III: Quantum Computing", topics: "Linear algebra for QC, Dirac’s Bra and Ket notation, Hilbert space, Bloch sphere, Qubits, Entanglement, Quantum gates, Shor's and Grover's algorithms." },
          { title: "Unit IV: Magnetic and Dielectric Materials", topics: "Magnetic moment, Hysteresis, Weiss domain theory, Ferrimagnetic materials, Polarization, Fe-RAM, Load cell, Fire sensor." },
          { title: "Unit V: Laser and Fibre Optics", topics: "Einstein coefficients, Population inversion, Ruby/He-Ne/CO2 lasers, LIDAR, Total internal reflection, Numerical aperture, Fiber losses." }
        ]
      },
      { 
        sNo: 3, code: "CS103ES", title: "Programming for Problem Solving", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Overview of C", topics: "Language Elements, Variable Declarations, Data Types, Executable Statements, Selection Structures: if, switch, Loops: while, for, do-while." },
          { title: "Unit II: Functions & Pointers", topics: "Top-Down Design, Function Arguments, Scope of Names, Pointers, Indirection Operator, Indirection with Input/Output Parameters." },
          { title: "Unit III: Arrays & Strings", topics: "1D/2D Arrays, Array Elements as Arguments, Searching and Sorting an Array, Multidimensional Arrays, String Basics, String Library Functions, Array of Pointers." },
          { title: "Unit IV: Recursion & Derived Types", topics: "Tracing a Recursive Function, Recursive Mathematical Functions, Structure and Union Types, User-Defined Structure Types, Nested Structures." },
          { title: "Unit V: Files & Algorithms", topics: "Text and Binary File Pointers, Searching a Database, Basic searching: linear and binary search, Basic algorithms to sort array: Bubble, Insertion, Selection." }
        ]
      },
      { sNo: 4, code: "EE104ES", title: "Basic Electrical Engineering", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I: DC Circuits", topics: "KVL, KCL, Thevenin, Norton, Superposition theorems." }, { title: "Unit II: AC Circuits", topics: "Phasors, Power factor, Resonance, 3-phase circuits." }, { title: "Unit III: Transformers", topics: "Ideal/Practical transformers, Efficiency, Auto-transformers." }, { title: "Unit IV: Machines", topics: "DC motor/generator, Induction motor principle." }, { title: "Unit V: Installations", topics: "MCB, ELCB, Earthing, Batteries." }] },
      { sNo: 5, code: "ME105ES", title: "Engineering Drawing & CAD", l: 2, t: 0, p: 2, credits: 3, units: [{ title: "Unit I: Scales", topics: "Conic sections, Cycloids, Diagonal scales." }, { title: "Unit II: Projections", topics: "Points, Lines, Planes projections." }, { title: "Unit III: Solids", topics: "Prisms, Pyramids, Cylinders, Cones." }, { title: "Unit IV: Development", topics: "Surface development of right regular solids." }, { title: "Unit V: Isometric", topics: "Isometric views and conversion to orthographic." }] },
      { sNo: 6, code: "PH106BS", title: "Physics Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Experiments", topics: "Hall Effect, LCR circuit, Laser wavelength, Sonometer, Fiber optics aperture." }] },
      { sNo: 7, code: "CS107ES", title: "Programming Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "C Tasks", topics: "Quadratic roots, Prime check, Fibonacci, Matrix multiplication, String palindrome, Bubble sort, Binary search." }] },
      { sNo: 8, code: "EE108ES", title: "Electrical Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Experiments", topics: "KVL/KCL validation, Thevenin's theorem, Norton's theorem, 1-phase transformer OC/SC tests." }] },
      { sNo: 9, code: "CS109ES", title: "IT Workshop Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Hardware", topics: "PC assembly, OS installation (Win/Linux)." }, { title: "Internet", topics: "Netiquette, Cyber hygiene, Browser customization." }, { title: "Productivity", topics: "LaTeX project, Excel GPA calculation, PPT master slides." }] }
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
          { title: "Unit I: First Order ODE", topics: "Exact differential equations, Bernoulli’s, Orthogonal Trajectories, Newton’s law of cooling." },
          { title: "Unit II: Higher Order ODE", topics: "Linear equations with constant coefficients, Method of variation of parameters." },
          { title: "Unit III: Laplace Transforms", topics: "First shifting theorem, Inverse Laplace, convolution theorem, Initial value problems." },
          { title: "Unit IV: Vector Differentiation", topics: "Gradient, Divergence and Curl, Solenoidal and Irrotational vectors." },
          { title: "Unit V: Vector Integration", topics: "Line, Surface and Volume Integrals, Green's, Gauss and Stokes theorems." }
        ]
      },
      { sNo: 2, code: "CH202BS", title: "Engineering Chemistry", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I: Water", topics: "EDTA estimation, Boiler troubles, Reverse osmosis." }, { title: "Unit II: Electrochemistry", topics: "Nernst equation, Corrosion theories, Cathodic protection." }, { title: "Unit III: Energy", topics: "Lithium-ion batteries, Bio-diesel, Green Hydrogen." }, { title: "Unit IV: Polymers", topics: "Thermosetting, FRP, Biodegradable (PLA)." }, { title: "Unit V: Materials", topics: "Nitinol, Biosensors, UV-Vis spectroscopy." }] },
      { 
        sNo: 3, code: "CS203ES", title: "Data Structures", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Linear Lists", topics: "Singly/Doubly Linked Lists, Stack operations, Queue operations." },
          { title: "Unit II: Trees", topics: "Binary Search Trees (BST), AVL Trees, Red-Black Trees, Splay Trees." },
          { title: "Unit III: Search Trees", topics: "B Trees, B+ Trees, Binary Heaps, Fibonacci heaps, Jump search." },
          { title: "Unit IV: Graphs", topics: "BFS/DFS traversal, Minimum Spanning Trees, Radix/Heap/Shell sort." },
          { title: "Unit V: Hashing", topics: "Hash Functions, Collision Resolution, File Organization, B+ indexing." }
        ]
      },
      { sNo: 4, code: "EC204ES", title: "Electronic Devices & Circuits", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I: Diodes", topics: "PN junction, Rectifiers, Zener diode." }, { title: "Unit II: BJT", topics: "CB, CE, CC configurations, h-parameters." }, { title: "Unit III: Biasing", topics: "Voltage divider bias, Thermal runaway." }, { title: "Unit IV: Amplifiers", topics: "CE amplifier analysis, Frequency response." }, { title: "Unit V: FETs", topics: "JFET/MOSFET, SCR, Solar Cell, LED." }] },
      { sNo: 5, code: "EN205HS", title: "English Skill Enhancement", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I: Grammar", topics: "Parts of speech, Paragraph writing." }, { title: "Unit II: Analytical", topics: "Tenses, Note-making, Precis writing." }, { title: "Unit III: Persuasive", topics: "Active/Passive voice, Essay writing." }, { title: "Unit IV: Business", topics: "Formal letters, Resume preparation." }, { title: "Unit V: Technical", topics: "Report writing, Project proposals." }] },
      { sNo: 6, code: "CH206BS", title: "Chemistry Lab Tasks", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 7, code: "CS207ES", title: "Data Structures Lab Tasks", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 8, code: "EN208HS", title: "ELCS Lab Tasks", l: 0, t: 0, p: 2, credits: 1 },
      { sNo: 9, code: "ME209ES", title: "Engineering Workshop Tasks", l: 0, t: 0, p: 2, credits: 1 },
      { 
        sNo: 10, code: "CS210ES", title: "Python Lab Exhaustive Checklist (35 Tasks)", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "Tasks 1-10", topics: "Calculator usage, Compound Interest, Identity read, Triangle loops, Prime check, List to Array, Common values, Palindrome, Sorted check, Duplicates check." },
          { title: "Tasks 11-20", topics: "Remove duplicates, Word count, Invert dictionary, String commas, Word removal, Sentence capitalization, Recursive binary, Matrix multiplication, Custom module, Exception handling." },
          { title: "Tasks 21-35", topics: "Try-finally structure, Canvas Drawing, Circle class, RegEx validation, Merge files, Text metadata, Numpy/Scipy/Pandas/Matplotlib, Logic Gates, Tkinter GUI, Button actions, Full Wizard App." }
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
        sNo: 1, code: "MA401BS", title: "Math & Statistical Foundations", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Number Theory", topics: "GCD, Euclidean algorithm, Prime Factorization, Fermat numbers, Congruences, Linear congruences, Chinese Remainder Theorem." },
          { title: "Unit II: Random Variables", topics: "Discrete and Continuous Probability Distributions, Probability Mass Function, Density Function, Mean and Variance, Binomial and Poisson distribution." },
          { title: "Unit III: Continuous Distributions", topics: "Uniform Distribution, Normal Distribution, Standard Normal Distribution, Areas under Normal Curve, Central Limit Theorem." },
          { title: "Unit IV: Hypothesis Testing", topics: "Statistical Hypotheses, Level of Significance, Type I and Type II errors, Testing Single/Two sample means and proportions, F-distribution, Chi-square test." },
          { title: "Unit V: Applied Statistics", topics: "Least squares curve fitting, Fitting straight lines and second degree parabolas, Correlation Coefficient, Rank correlation, Regression lines." }
        ]
      },
      { 
        sNo: 2, code: "CS302PC", title: "Computer Org & Architecture", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Digital Logic & Representation", topics: "Boolean Algebra, Logic Gates, Map simplification (K-Maps), Binary codes, Fixed point and Floating point representation." },
          { title: "Unit II: Combinational & Sequential", topics: "Adder, Subtractor, Multiplier, Decoders, Encoders, Multiplexers, Latches, Flip-Flops, Shift Registers, Binary Counters." },
          { title: "Unit III: Register Transfer & Micro-ops", topics: "Register Transfer Language (RTL), Bus and Memory transfers, Arithmetic/Logic/Shift micro operations, Instruction cycle, Input-Output & Interrupt." },
          { title: "Unit IV: Central Processing Unit", topics: "Microprogrammed Control, Address sequencing, Control memory, General Register Organization, Stack Organization, Instruction formats, Addressing modes." },
          { title: "Unit V: Memory & I/O Org", topics: "Memory Hierarchy, Main Memory, Auxiliary Memory, Cache Memory (Associative, Direct, Set-associative), Virtual Memory, DMA, IOP." }
        ]
      },
      { 
        sNo: 3, code: "CS303PC", title: "OOP through Java", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Java Evolution & Basics", topics: "History, JVM, Buzzwords, Data types, Variables, Arrays, Operators, Control statements, Classes, Methods, Constructors, Static, Recursion." },
          { title: "Unit II: Inheritance & Interfaces", topics: "Types of inheritance, member access, using super, method overriding, dynamic method dispatch, abstract classes, Object class, packages, interfaces." },
          { title: "Unit III: Exceptions & Multithreading", topics: "Exception-handling fundamentals, try-catch-finally, multiple catch, throw/throws, built-in exceptions, Thread life cycle, creating threads, priorities, synchronization." },
          { title: "Unit IV: Swings & Events", topics: "Event handling: Sources, Listeners, Adapter classes, Swings: JFrame, JApplet, JComponent, Icons, Labels, TextFields, Buttons, CheckBoxes." },
          { title: "Unit V: Advanced Components", topics: "Combo Boxes, Tabbed Panes, Scroll Panes, Trees, JTable, Layout Managers: Flow, Border, Grid, GridBag, Card Layout." }
        ]
      },
      { 
        sNo: 4, code: "CS304PC", title: "Software Engineering", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Process Models", topics: "Software process structure, Capability Maturity Model Integration (CMMI), Waterfall model, Spiral model, Incremental, Concurrent, Agile development." },
          { title: "Unit II: Requirements & Analysis", topics: "Functional and non-functional requirements, User/System requirements, SRS, Requirements elicitation and analysis, Negotiation, Validation." },
          { title: "Unit III: Design & UML", topics: "Design concepts, Architectural styles, Component-level design, User Interface design, UML: Class/Use Case/Sequence/Activity/State diagrams." },
          { title: "Unit IV: Testing Strategies", topics: "A strategic approach to software testing, Test strategies for conventional software, Black-box and White-box testing, Validation testing, System testing, Debugging." },
          { title: "Unit V: Management & Quality", topics: "Software risks, Risk identification, Projection, RMMM, Quality Management, SQA, ISO 9000, SEI CMM." }
        ]
      },
      { 
        sNo: 5, code: "CS305PC", title: "Database Management System", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Database Intro & Design", topics: "Applications, File Systems vs DBMS, View of Data, Data Models, Database Languages, ER Diagrams, Weak Entities, Extended ER features." },
          { title: "Unit II: Relational Model", topics: "Integrity constraints, Querying relational data, Relational Algebra (Select, Project, Join), Tuple Relational Calculus, Domain Relational Calculus." },
          { title: "Unit III: SQL & Normalization", topics: "SQL Queries, Triggers, Views, Schema Refinement, Functional Dependencies, Normal forms: 1NF, 2NF, 3NF, BCNF, Multi-valued dependencies." },
          { title: "Unit IV: Transactions & Concurrency", topics: "ACID properties, Serializability, Concurrency Control: Lock Based Protocols, Timestamp Based Protocols, Recovery System: Log-Based Recovery." },
          { title: "Unit V: Storage & Indexing", topics: "Data on External Storage, File Organization (Heap, Sorted, Hashed), Indexing: Primary, Secondary, Clustered, B+ Trees, Static and Dynamic Hashing." }
        ]
      },
      { sNo: 6, code: "CS307PC", title: "Java Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Programming", topics: "Array manipulation, Inheritance demo, Exception handling, Thread synchronization, Swing GUI login page, Simple calculator using events." }] },
      { sNo: 7, code: "CS308PC", title: "Software Engineering Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "UML Modeling", topics: "Library Management System, ATM System, Online Shopping Mall using Rational Rose or StarUML." }] },
      { sNo: 8, code: "CS309PC", title: "DBMS Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "SQL Exercises", topics: "DDL/DML commands, Joins, Subqueries, PL/SQL blocks, Cursors, Triggers, DB connectivity using Java." }] },
      { 
        sNo: 10, code: "CS310SD", title: "Full Stack Lab Checklist (14 Exercises)", l: 0, t: 0, p: 2, credits: 1,
        units: [
          { title: "Exercises 1-7", topics: "Responsive shopping cart (HTML/CSS), Bootstrap layout, JS form validation, ES6 Destructuring/Modules, OpenWeatherMap API, Java JDBC CRUD, DTD/XSD validation." },
          { title: "Exercises 8-14", topics: "Cookie/Session tracking, Node.js http module, Express.js REST API, JWT Authentication, React Student App, React Dashboard (Chart.js), GitHub CI/CD deployment." }
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
          { title: "Unit I: Mathematical Logic", topics: "Connectives, Normal Forms, Theory of Inference for Statement Calculus, Predicate Calculus, Inference Theory of Predicate Calculus." },
          { title: "Unit II: Set Theory & Relations", topics: "Basic concepts, Operations on binary sets, Relation Properties, Equivalence relations, Partial ordering relations, Lattices, Functions (Injective, Surjective, Bijective)." },
          { title: "Unit III: Algebraic Structures", topics: "Algebraic systems, Semi groups and Monoids, Groups, Subgroups, Homomorphism, Isomorphism, Elementary Combinatorics: Basics of counting." },
          { title: "Unit IV: Recurrence Relations", topics: "Generating functions of sequences, Calculating coefficients, Recurrence relations, Solving by characteristic roots, Principle of Inclusion-Exclusion." },
          { title: "Unit V: Graph Theory", topics: "Basic concepts, Representation of graphs, Isomorphism, Subgraphs, Multi graphs, Euler paths and circuits, Hamiltonian graphs, Chromatic number, Trees." }
        ]
      },
      { 
        sNo: 2, code: "CS402PC", title: "Operating Systems", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: OS Introduction", topics: "Computer System architecture, OS operations, Process management, Memory management, Storage management, Computing environments, System calls, Linkers/Loaders." },
          { title: "Unit II: Process Scheduling", topics: "Process concept, Scheduling criteria, Algorithms: FCFS, SJF, Priority, Round Robin, Multilevel Queue, Threads, Deadlocks: Characterization, Prevention, Avoidance (Banker's)." },
          { title: "Unit III: Process Synchronization", topics: "Critical-section problem, Peterson’s solution, Synchronization hardware, Mutex locks, Semaphores, Monitors, Classical problems: Bounded Buffer, Readers-Writers." },
          { title: "Unit IV: Memory Management", topics: "Swapping, Contiguous memory allocation, Paging, Segmentation, Virtual Memory, Demand paging, Page replacement: FIFO, Optimal, LRU, Thrashing." },
          { title: "Unit V: File System & I/O", topics: "File concepts, Access methods, Directory structure, Disk scheduling: FCFS, SSTF, SCAN, C-SCAN, LOOK, File-system mounting, Protection." }
        ]
      },
      { 
        sNo: 3, code: "CS403PC", title: "Algorithms Design and Analysis", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Complexity & Divide-and-Conquer", topics: "Space and Time complexity, Asymptotic notations, Performance analysis, Finding Max-Min, Binary search, Merge sort, Quick sort, Strassen’s Matrix multiplication." },
          { title: "Unit II: Backtracking & Disjoint Sets", topics: "General method, N-Queens problem, Sum of subsets, Graph coloring, Hamiltonian cycles, Disjoint set operations, Union and Find algorithms." },
          { title: "Unit III: Dynamic Programming", topics: "General method, Multi-stage graphs, All pairs shortest path, Single source shortest path, Optimal binary search trees, 0/1 Knapsack, Traveling salesperson problem." },
          { title: "Unit IV: Greedy Method", topics: "General method, Job sequencing with deadlines, Knapsack problem, Minimum cost spanning trees (Kruskal’s, Prim’s), Single source shortest path (Dijkstra)." },
          { title: "Unit V: NP-Hard & NP-Complete", topics: "Basic concepts, Non-deterministic algorithms, Classes NP-Hard and NP-Complete, Cook’s Theorem (without proof)." }
        ]
      },
      { 
        sNo: 4, code: "CS404PC", title: "Computer Networks", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Network Models", topics: "Circuit Switching, Packet Switching, Delay/Loss/Throughput, OSI Reference Model, TCP/IP Protocol Suite, Physical media." },
          { title: "Unit II: Application Layer", topics: "Principles of Network Apps, Web and HTTP, FTP, Electronic Mail (SMTP), DNS, P2P Applications, Socket Programming." },
          { title: "Unit III: Transport Layer", topics: "Multiplexing/Demultiplexing, Connectionless transport (UDP), Principles of Reliable Data Transfer, Go-Back-N, Selective Repeat, TCP: Segment structure, Congestion control." },
          { title: "Unit IV: Network Layer", topics: "Virtual circuit and Datagram networks, Router internals, IP, IPv4 addressing, DHCP, ICMP, Routing algorithms: Link State (Dijkstra), Distance Vector (Bellman-Ford)." },
          { title: "Unit V: Link Layer", topics: "Error-detection: Parity, Checksum, CRC, Multiple Access Protocols: CSMA/CD, Ethernet, Hubs, Bridges, Switches, Wireless LAN (802.11)." }
        ]
      },
      { 
        sNo: 5, code: "CS405PC", title: "Machine Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: ML Introduction", topics: "Types of learning, Supervised vs Unsupervised, Well-posed learning problem, Feature extraction, Model training, Pre-processing: Scaling, Encoding, Outlier detection." },
          { title: "Unit II: Feature Engineering & Bayes", topics: "Dimensionality reduction: PCA, SVD, LDA, Feature subset selection, Bayesian learning: Bayes theorem, Naïve Bayes classifier, Bayesian Belief Networks." },
          { title: "Unit III: Supervised Models", topics: "Linear Regression, Logistic Regression, Decision Trees (ID3, C4.5), Support Vector Machines (SVM), K-Nearest Neighbors (KNN), Random Forest, Ensemble learning." },
          { title: "Unit IV: Unsupervised Models", topics: "Clustering: K-Means, K-Medoids, Expectation-Maximization, Hierarchical Clustering, DBSCAN, Evaluation metrics for clustering." },
          { title: "Unit V: Neural Networks & Deep Learning", topics: "Perceptron, Multi-layer Perceptron, Backpropagation algorithm, Introduction to CNNs, RNNs, Reinforcement Learning basics, Applications." }
        ]
      },
      { sNo: 7, code: "CS407PC", title: "Operating Systems Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "UNIX Commands", topics: "Process creation, Page replacement simulation, Disk scheduling simulation, Banker's algorithm implementation." }] },
      { sNo: 8, code: "CS408PC", title: "Computer Networks Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Simulations", topics: "Packet tracing with Wireshark, Bit stuffing, CRC generation, Shortest path routing simulation, TCP/UDP socket programming." }] },
      { sNo: 9, code: "CS409PC", title: "Machine Learning Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Python ML", topics: "Scikit-learn Regression, Decision Tree classification, SVM for Digit recognition, K-Means clustering on iris dataset." }] }
    ],
    totalCredits: 22
  },
  {
    id: "3-1",
    title: "Year 3, Sem 1",
    courses: [
      { 
        sNo: 1, code: "AI501PC", title: "Artificial Intelligence", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Search Strategies", topics: "Problem-solving as search, Uninformed search: BFS, DFS, Informed search: A*, Heuristics, Adversarial search: Minimax, Alpha-Beta pruning." },
          { title: "Unit II: Logic & Knowledge", topics: "Propositional Logic, First-Order Logic, Inference rules, Resolution, Forward and Backward chaining, Knowledge representation: Frames, Semantic nets." },
          { title: "Unit III: Planning & Probabilistic", topics: "Classical planning, Planning with state-space search, Partial-order planning, Uncertainty, Probability, Bayes rule, Bayesian networks, HMMs." },
          { title: "Unit IV: Machine Learning in AI", topics: "Learning from observations, Inductive learning, Decision Trees, Ensemble learning, Reinforcement Learning basics, Passive and Active RL." },
          { title: "Unit V: Robotics & Communication", topics: "Perception, Image formation, Image processing, Robotics: Hardware, Sensors, Effectors, Robot architectures, NLP basics." }
        ]
      },
      { 
        sNo: 2, code: "AI502PC", title: "Automata & Compiler Design", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Finite Automata", topics: "DFA, NFA, Regular expressions, Pumping lemma for regular sets, Context Free Grammars (CFG), Pushdown Automata (PDA)." },
          { title: "Unit II: Lexical Analysis", topics: "Role of lexical analyzer, Input buffering, Tokenization, Design of lexical analyzer generator (LEX), Error recovery." },
          { title: "Unit III: Syntax Analysis", topics: "Parsing: Top-down parsing (LL), Bottom-up parsing (LR, LALR, SLR), YACC tool, Syntax-directed translation." },
          { title: "Unit IV: Semantic Analysis", topics: "Symbol tables, Type checking, Intermediate code generation: Three-address code, Quadruples, Triples, Static Single Assignment (SSA)." },
          { title: "Unit V: Code Optimization", topics: "Principal sources of optimization, Optimization of basic blocks, Peephole optimization, Register allocation, Code generation algorithms." }
        ]
      },
      { 
        sNo: 3, code: "AI503PC", title: "Data Analytics & Visualization", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Data Science Process", topics: "Data collection, Cleaning, Pre-processing, Exploratory Data Analysis (EDA), Descriptive Statistics, Probability distributions." },
          { title: "Unit II: Statistical Inference", topics: "Hypothesis testing, Confidence intervals, ANOVA, Regression analysis, Diagnostics, Variable selection techniques." },
          { title: "Unit III: Visualization Theory", topics: "Human perception and cognition, Visual encoding, Color theory, Design principles for effective dashboards." },
          { title: "Unit IV: Tools - Tableau/PowerBI", topics: "Connecting to data, Calculated fields, Parameters, Creating interactive charts, Map-based visualization, Dashboards." },
          { title: "Unit V: Advanced Visualization", topics: "Time-series data, Network/Graph visualization, High-dimensional data visualization: T-SNE, UMAP, Storytelling with data." }
        ]
      },
      { sNo: 4, code: "PE1", title: "Professional Elective-I", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Content based on selected course (e.g., Computer Graphics, Web Programming)." }] },
      { sNo: 5, code: "OE1", title: "Open Elective-I", l: 2, t: 0, p: 0, credits: 2, units: [{ title: "Unit I-V", topics: "Interdisciplinary topics (e.g., Management, Psychology, Economics)." }] },
      { sNo: 6, code: "AI504PC", title: "AI Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Programming", topics: "Implement BFS/DFS, 8-Puzzle problem, A* algorithm, Missionaries and Cannibals, Water Jug problem, Crypt-Arithmetic problem, Hill Climbing, Resolution in FOL." }] },
      { sNo: 7, code: "AI505PC", title: "Compiler Design Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Implementation", topics: "Lexical Analyzer using LEX, Parser using YACC, Symbol table generation, Intermediate code generator, Code optimizer implementation." }] },
      { sNo: 8, code: "AI506PC", title: "Data Analytics Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Visualizations", topics: "EDA using Python (Pandas/Matplotlib), Hypothesis testing with Scipy, Dashboard creation in Tableau, Storytelling project." }] },
      { sNo: 9, code: "AI507PC", title: "Field Research Project", l: 0, t: 0, p: 4, credits: 2, units: [{ title: "Stages", topics: "Topic selection, Literature survey, Methodology design, Field data collection, Analysis and Report drafting." }] },
      { sNo: 10, code: "AI508SD", title: "UI Design (Flutter/Android)", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Development", topics: "Layout widgets, State management, Navigation, API integration, Building a functional Mobile App prototype." }] }
    ],
    totalCredits: 21
  },
  {
    id: "3-2",
    title: "Year 3, Sem 2",
    courses: [
      { 
        sNo: 1, code: "AI601PC", title: "Natural Language Processing", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Intro & Text Processing", topics: "Tokenization, Stemming, Lemmatization, POS tagging, N-grams, Language models, Hidden Markov Models (HMM) for tagging." },
          { title: "Unit II: Parsing & Grammars", topics: "Context-Free Grammars, CYK algorithm, Dependency parsing, Statistical parsing, Evaluation metrics for parsing." },
          { title: "Unit III: Semantics & Vector Space", topics: "Lexical semantics, WordNet, Distributional semantics, Word Embeddings: Word2Vec, GloVe, FastText." },
          { title: "Unit IV: Information Extraction", topics: "Named Entity Recognition (NER), Relation extraction, Question Answering, Sentiment Analysis, Text Summarization." },
          { title: "Unit V: Sequence Models", topics: "RNNs and LSTMs for NLP, Encoder-Decoder architectures, Attention mechanism, Introduction to Transformers (BERT, GPT)." }
        ]
      },
      { 
        sNo: 2, code: "AI602PC", title: "Deep Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Neural Network Basics", topics: "Perceptron, Multi-layer Perceptron, Backpropagation, Gradient Descent variants (Adam, RMSProp), Activation functions." },
          { title: "Unit II: Regularization & Optimization", topics: "Overfitting, Dropout, Batch Normalization, Weight initialization, Hyperparameter tuning, Early stopping." },
          { title: "Unit III: Convolutional Neural Nets", topics: "Convolution layers, Pooling, Strides, Padding, Architectures: LeNet, AlexNet, VGG, ResNet, Inception." },
          { title: "Unit IV: Sequence Modeling", topics: "RNNs, Vanishing/Exploding gradients, LSTMs, GRUs, Bidirectional RNNs, Sequence-to-sequence models." },
          { title: "Unit V: Generative & Modern Architectures", topics: "Autoencoders, Variational Autoencoders (VAEs), Generative Adversarial Networks (GANs), Self-attention, Transformers." }
        ]
      },
      { 
        sNo: 3, code: "MS603HS", title: "Business Economics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Introduction", topics: "Definition, Scope of Business Economics, Law of Demand, Elasticity of demand, Demand forecasting." },
          { title: "Unit II: Production & Cost", topics: "Production function, Isoquants, Isocosts, Internal and external economies of scale, Cost analysis: fixed/variable, Breakeven point." },
          { title: "Unit III: Market Structures", topics: "Perfect competition, Monopoly, Monopolistic competition, Oligopoly, Price-output determination, Pricing strategies." },
          { title: "Unit IV: Capital Budgeting", topics: "Investment decisions, Payback period, Net Present Value (NPV), Internal Rate of Return (IRR), Profitability index." },
          { title: "Unit V: Financial Accounting", topics: "Double-entry system, Journal, Ledger, Trial balance, Final accounts: Trading, P&L, Balance sheet, Ratio analysis." }
        ]
      },
      { sNo: 4, code: "PE2", title: "Professional Elective-II", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Specialized topics (e.g., Image Processing, Blockchain, DevOps)." }] },
      { sNo: 5, code: "OE2", title: "Open Elective-II", l: 2, t: 0, p: 0, credits: 2, units: [{ title: "Unit I-V", topics: "Interdisciplinary electives." }] },
      { sNo: 6, code: "AI604PC", title: "NLP Lab Tasks", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Implementation", topics: "NLTK/SpaCy basics, Regular expressions for text, POS tagging, Named Entity Recognition, Sentiment analysis on twitter data, Building a simple chatbot." }] },
      { sNo: 7, code: "AI605PC", title: "Deep Learning Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Projects", topics: "MNIST digit classification (MLP), CIFAR-10 image classification (CNN), Sentiment analysis (LSTM), Image generation using GANs." }] },
      { sNo: 8, code: "AI606PC", title: "Chatbots Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Development", topics: "Rasa framework, Intent classification, Entity extraction, Dialog management, Integration with Telegram/Web." }] },
      { sNo: 9, code: "EN607HS", title: "Employability Skills Lab", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Activities", topics: "Aptitude training, Logical reasoning, Group Discussions, Resume building, Mock Interviews, Personality development." }] },
      { sNo: 10, code: "AI608SD", title: "Prompt Engineering", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Techniques", topics: "Zero-shot, Few-shot prompting, Chain-of-thought, Prompt templates, API integration with LLMs, Handling hallucinations." }] }
    ],
    totalCredits: 20
  },
  {
    id: "4-1",
    title: "Year 4, Sem 1",
    courses: [
      { 
        sNo: 1, code: "CS701PC", title: "Reinforcement Learning", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: MDP & Foundations", topics: "Agent-Environment interface, Markov Property, Markov Decision Processes (MDP), Returns and Episodes, Policies and Value Functions, Bellman Equations." },
          { title: "Unit II: Dynamic Programming", topics: "Policy Evaluation, Policy Improvement, Policy Iteration, Value Iteration, Asynchronous DP, Efficiency of DP." },
          { title: "Unit III: Monte Carlo & TD", topics: "Monte Carlo Prediction/Control, Temporal-Difference (TD) Learning, Q-Learning, SARSA, n-step Bootstrapping." },
          { title: "Unit IV: Function Approximation", topics: "Value function approximation, Linear methods, Deep Q-Networks (DQN), Experience Replay, Target Networks." },
          { title: "Unit V: Policy Gradients", topics: "Policy Gradient Theorem, REINFORCE algorithm, Actor-Critic methods, Proximal Policy Optimization (PPO) basics." }
        ]
      },
      { 
        sNo: 2, code: "CS702PC", title: "Big Data Analytics", l: 3, t: 0, p: 0, credits: 3,
        units: [
          { title: "Unit I: Intro to Big Data", topics: "V's of Big Data, Hadoop Architecture, HDFS, YARN, MapReduce Programming Model, Data flow." },
          { title: "Unit II: NoSQL Databases", topics: "CAP Theorem, NoSQL types: Key-Value (Redis), Document (MongoDB), Columnar (Cassandra), Graph (Neo4j)." },
          { title: "Unit III: Apache Spark", topics: "Spark Stack, RDDs, Transformations and Actions, Spark SQL, Spark Streaming basics." },
          { title: "Unit IV: Data Ingestion & Storage", topics: "Apache Flume, Sqoop, Hive architecture, HiveQL, Data warehousing in Big Data." },
          { title: "Unit V: Analytics & Visualization", topics: "Machine Learning with Spark MLlib, Visualization tools for Big Data, Case studies." }
        ]
      },
      { sNo: 3, code: "PE4", title: "Professional Elective-IV", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Advanced specialized topics (e.g., Quantum Computing, Big Data Technologies)." }] },
      { sNo: 4, code: "PE5", title: "Professional Elective-V", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Advanced specialized topics (e.g., Social Media Mining, Nature Inspired Computing)." }] },
      { sNo: 5, code: "OE3", title: "Open Elective-III", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Interdisciplinary advanced electives." }] },
      { sNo: 6, code: "CS703PC", title: "Seminar", l: 0, t: 0, p: 2, credits: 1, units: [{ title: "Requirements", topics: "Technical presentation on recent trends, Report submission, Viva-voce." }] },
      { sNo: 7, code: "CS704PC", title: "Project Phase - I", l: 0, t: 0, p: 6, credits: 3, units: [{ title: "Deliverables", topics: "Problem identification, Literature survey, Requirement analysis, Design methodology, Prototype demonstration." }] }
    ],
    totalCredits: 19
  },
  {
    id: "4-2",
    title: "Year 4, Sem 2",
    courses: [
      { sNo: 1, code: "PE6", title: "Professional Elective-VI", l: 3, t: 0, p: 0, credits: 3, units: [{ title: "Unit I-V", topics: "Capstone electives (e.g., MLOps, AI Ethics & Privacy, High Performance Computing)." }] },
      { sNo: 2, code: "CS801PC", title: "Project Phase - II", l: 0, t: 0, p: 18, credits: 9, units: [{ title: "Execution", topics: "Implementation of Phase-I design, Rigorous testing, Result analysis, Thesis writing, Final defense." }] }
    ],
    totalCredits: 12
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
      { code: "AI731OE", title: "Chatbots" }
    ]
  }
];