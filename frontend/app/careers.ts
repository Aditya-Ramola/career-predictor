interface CareerDetail {
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  education: string[];
}

export const careerDetails: { [key: string]: CareerDetail } = {
  "Software Developer": {
    title: "Software Developer",
    description: "Create innovative software solutions using various programming languages and technologies. Design, develop, and maintain applications while collaborating with cross-functional teams to deliver high-quality software products.",
    skills: ["Programming", "Problem Solving", "System Design", "Debugging", "Team Collaboration", "Continuous Learning"],
    averageSalary: "$70,000 - $150,000",
    education: ["Bachelor's in Computer Science", "Software Engineering", "Related Technical Field"]
  },
  "Data Scientist": {
    title: "Data Scientist",
    description: "Apply advanced analytics, machine learning, and statistical methods to extract insights from complex data sets. Help organizations make data-driven decisions and develop predictive models.",
    skills: ["Statistics", "Machine Learning", "Programming", "Data Analysis", "Problem Solving", "Communication"],
    averageSalary: "$80,000 - $160,000",
    education: ["Master's in Data Science", "Statistics", "Computer Science", "Mathematics"]
  },
  "Doctor": {
    title: "Doctor",
    description: "Provide medical care and treatment to patients while staying current with medical advances. Diagnose conditions, prescribe medications, and work with healthcare teams to ensure optimal patient outcomes.",
    skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Communication", "Decision Making", "Empathy"],
    averageSalary: "$150,000 - $300,000",
    education: ["Medical Degree (MD)", "Residency", "Specialization", "Board Certification"]
  },
  "Teacher": {
    title: "Teacher",
    description: "Shape young minds and inspire learning through engaging instruction methods. Create inclusive learning environments, develop curriculum materials, and adapt teaching strategies to meet diverse student needs.",
    skills: ["Teaching", "Communication", "Patience", "Organization", "Leadership", "Adaptability"],
    averageSalary: "$45,000 - $85,000",
    education: ["Bachelor's in Education", "Teaching Certification", "Subject Expertise"]
  },
  "Lawyer": {
    title: "Lawyer",
    description: "Advocate for clients' rights and provide legal counsel across various areas of law. Research cases, prepare legal documents, and represent clients in court proceedings while staying current with legal developments.",
    skills: ["Legal Analysis", "Research", "Negotiation", "Communication", "Critical Thinking", "Attention to Detail"],
    averageSalary: "$70,000 - $200,000",
    education: ["Law Degree (JD)", "Bar Admission", "Continuing Legal Education"]
  },
  "Artist": {
    title: "Artist",
    description: "Create compelling visual art across various mediums while developing a unique artistic style. Work on commissioned projects, exhibitions, and collaborate with clients to bring creative visions to life.",
    skills: ["Creativity", "Visual Design", "Color Theory", "Artistic Techniques", "Portfolio Management", "Marketing"],
    averageSalary: "$40,000 - $80,000",
    education: ["Bachelor's in Fine Arts", "Art School", "Specialized Training"]
  },
  "Psychologist": {
    title: "Psychologist",
    description: "Help individuals overcome mental health challenges and improve their well-being. Conduct assessments, provide therapy, and develop treatment plans while staying updated with psychological research.",
    skills: ["Empathy", "Analysis", "Communication", "Research", "Patient Care", "Ethical Judgment"],
    averageSalary: "$60,000 - $130,000",
    education: ["Doctorate in Psychology", "Clinical License", "Specialized Training"]
  },
  "Financial Analyst": {
    title: "Financial Analyst",
    description: "Evaluate financial data and market trends to guide investment decisions. Prepare financial models, analyze company performance, and provide recommendations for investment strategies.",
    skills: ["Financial Analysis", "Mathematics", "Research", "Communication", "Problem Solving", "Risk Assessment"],
    averageSalary: "$60,000 - $120,000",
    education: ["Finance Degree", "CFA Certification", "MBA (optional)"]
  },
  "Marketing Manager": {
    title: "Marketing Manager",
    description: "Develop and execute marketing strategies to promote products or services. Analyze market trends, manage campaigns, and coordinate with various stakeholders to achieve business objectives.",
    skills: ["Marketing Strategy", "Communication", "Analytics", "Creativity", "Leadership", "Digital Marketing"],
    averageSalary: "$60,000 - $140,000",
    education: ["Marketing Degree", "MBA (optional)", "Digital Marketing Certifications"]
  },
  "Game Developer": {
    title: "Game Developer",
    description: "Create engaging video games by combining technical skills with creative storytelling. Design game mechanics, implement features, and optimize performance while collaborating with artists and designers.",
    skills: ["Programming", "Game Design", "Creativity", "Problem Solving", "3D Modeling", "Team Collaboration"],
    averageSalary: "$60,000 - $120,000",
    education: ["Computer Science Degree", "Game Development", "Software Engineering"]
  },
  "Journalist": {
    title: "Journalist",
    description: "Investigate and report news stories across various media platforms. Conduct interviews, verify sources, and craft compelling narratives while maintaining journalistic integrity.",
    skills: ["Writing", "Research", "Communication", "Time Management", "Ethics", "Digital Media"],
    averageSalary: "$40,000 - $90,000",
    education: ["Journalism Degree", "Communications", "Digital Media"]
  },
  "Architect": {
    title: "Architect",
    description: "Design innovative and sustainable buildings while considering aesthetics, functionality, and safety. Collaborate with clients, engineers, and contractors to bring architectural visions to life.",
    skills: ["Design", "Technical Drawing", "Project Management", "Creativity", "3D Modeling", "Sustainability"],
    averageSalary: "$70,000 - $150,000",
    education: ["Architecture Degree", "Professional License", "Sustainable Design"]
  },
  "Environmental Scientist": {
    title: "Environmental Scientist",
    description: "Study environmental problems and develop solutions to protect the planet. Conduct research, analyze data, and provide recommendations for environmental conservation and sustainability.",
    skills: ["Research", "Data Analysis", "Environmental Knowledge", "Problem Solving", "Communication", "Field Work"],
    averageSalary: "$55,000 - $110,000",
    education: ["Environmental Science Degree", "Research Experience", "Field Certification"]
  },
  "Project Manager": {
    title: "Project Manager",
    description: "Lead teams to successfully complete projects on time and within budget. Coordinate resources, manage stakeholders, and ensure project objectives are met while maintaining quality standards.",
    skills: ["Leadership", "Organization", "Communication", "Risk Management", "Budgeting", "Problem Solving"],
    averageSalary: "$65,000 - $140,000",
    education: ["Business Degree", "PMP Certification", "Industry Experience"]
  },
  "UX Designer": {
    title: "UX Designer",
    description: "Create user-centered digital experiences that are both functional and engaging. Conduct user research, design interfaces, and collaborate with developers to implement effective user experiences.",
    skills: ["User Research", "Interface Design", "Prototyping", "Usability Testing", "Communication", "Problem Solving"],
    averageSalary: "$65,000 - $130,000",
    education: ["Design Degree", "UX Certification", "Portfolio Development"]
  },
  "Business Consultant": {
    title: "Business Consultant",
    description: "Help organizations improve their performance through expert analysis and strategic recommendations. Identify problems, develop solutions, and guide implementation of business improvements.",
    skills: ["Business Analysis", "Strategy", "Problem Solving", "Communication", "Project Management", "Industry Knowledge"],
    averageSalary: "$70,000 - $150,000",
    education: ["Business Degree", "MBA", "Industry Certifications"]
  },
  "Human Resources Manager": {
    title: "Human Resources Manager",
    description: "Oversee organizational workforce strategy and employee relations. Manage recruitment, training, benefits, and ensure compliance with employment laws while fostering a positive work culture.",
    skills: ["HR Management", "Communication", "Conflict Resolution", "Organization", "Employment Law", "Leadership"],
    averageSalary: "$65,000 - $130,000",
    education: ["HR Management Degree", "SHRM Certification", "Labor Law Knowledge"]
  },
  "Research Scientist": {
    title: "Research Scientist",
    description: "Conduct advanced research to expand scientific knowledge and develop new technologies. Design experiments, analyze results, and publish findings while collaborating with other researchers.",
    skills: ["Research Methods", "Data Analysis", "Scientific Writing", "Critical Thinking", "Lab Techniques", "Grant Writing"],
    averageSalary: "$60,000 - $130,000",
    education: ["PhD in Sciences", "Research Experience", "Publications"]
  }
}; 