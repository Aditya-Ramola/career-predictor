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
    description: "Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to create efficient solutions.",
    skills: ["Programming", "Problem Solving", "System Design", "Debugging", "Team Collaboration"],
    averageSalary: "$70,000 - $150,000",
    education: ["Bachelor's in Computer Science", "Software Engineering", "Related Technical Field"]
  },
  "Doctor": {
    title: "Doctor",
    description: "Diagnose and treat patients' illnesses and injuries. Provide medical care and advice to maintain patient health.",
    skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Communication", "Decision Making"],
    averageSalary: "$150,000 - $300,000",
    education: ["Medical Degree (MD)", "Residency", "Specialization"]
  },
  "Artist": {
    title: "Artist",
    description: "Create visual art using various mediums. Express creativity through paintings, sculptures, digital art, or other forms.",
    skills: ["Creativity", "Visual Design", "Color Theory", "Artistic Techniques", "Portfolio Management"],
    averageSalary: "$40,000 - $80,000",
    education: ["Bachelor's in Fine Arts", "Art School", "Self-Taught Practice"]
  },
  "Teacher": {
    title: "Teacher",
    description: "Educate students and help them develop knowledge and skills. Create lesson plans and assess student progress.",
    skills: ["Teaching", "Communication", "Patience", "Organization", "Leadership"],
    averageSalary: "$45,000 - $85,000",
    education: ["Bachelor's in Education", "Teaching Certification", "Subject Expertise"]
  },
  "Data Scientist": {
    title: "Data Scientist",
    description: "Analyze complex data sets to help organizations make informed decisions. Use statistical methods and machine learning.",
    skills: ["Statistics", "Programming", "Machine Learning", "Data Analysis", "Problem Solving"],
    averageSalary: "$80,000 - $160,000",
    education: ["Master's in Data Science", "Statistics", "Computer Science"]
  },
  "Entrepreneur": {
    title: "Entrepreneur",
    description: "Start and run businesses. Identify opportunities, develop business plans, and manage operations.",
    skills: ["Leadership", "Business Strategy", "Risk Management", "Networking", "Financial Planning"],
    averageSalary: "Variable",
    education: ["Business Degree (Optional)", "Industry Experience", "Self-Learning"]
  },
  "Lawyer": {
    title: "Lawyer",
    description: "Provide legal advice and representation to clients. Interpret laws and regulations, prepare legal documents.",
    skills: ["Legal Analysis", "Research", "Negotiation", "Communication", "Critical Thinking"],
    averageSalary: "$70,000 - $200,000",
    education: ["Law Degree (JD)", "Bar Admission", "Continuing Education"]
  },
  "Psychologist": {
    title: "Psychologist",
    description: "Study human behavior and mental processes. Help people cope with mental health issues and life challenges.",
    skills: ["Empathy", "Analysis", "Communication", "Research", "Patient Care"],
    averageSalary: "$60,000 - $130,000",
    education: ["Doctorate in Psychology", "Clinical License", "Specialization"]
  },
  "Game Developer": {
    title: "Game Developer",
    description: "Create video games for various platforms. Design game mechanics, write code, and implement features.",
    skills: ["Programming", "Game Design", "Creativity", "Problem Solving", "Team Collaboration"],
    averageSalary: "$60,000 - $120,000",
    education: ["Computer Science Degree", "Game Development", "Software Engineering"]
  },
  "Journalist": {
    title: "Journalist",
    description: "Research and report news stories. Write articles, conduct interviews, and verify information.",
    skills: ["Writing", "Research", "Communication", "Time Management", "Ethics"],
    averageSalary: "$40,000 - $90,000",
    education: ["Journalism Degree", "Communications", "Writing Experience"]
  },
  "Financial Analyst": {
    title: "Financial Analyst",
    description: "Analyze financial data and market trends. Provide investment advice and financial planning.",
    skills: ["Financial Analysis", "Mathematics", "Research", "Communication", "Problem Solving"],
    averageSalary: "$60,000 - $120,000",
    education: ["Finance Degree", "Business Administration", "CFA Certification"]
  },
  "Marketing Manager": {
    title: "Marketing Manager",
    description: "Develop and implement marketing strategies. Manage campaigns and analyze market trends.",
    skills: ["Marketing Strategy", "Communication", "Analytics", "Creativity", "Leadership"],
    averageSalary: "$60,000 - $140,000",
    education: ["Marketing Degree", "Business Administration", "Digital Marketing"]
  },
  "Architect": {
    title: "Architect",
    description: "Design buildings and structures. Create detailed plans and oversee construction projects.",
    skills: ["Design", "Technical Drawing", "Project Management", "Creativity", "Problem Solving"],
    averageSalary: "$70,000 - $150,000",
    education: ["Architecture Degree", "Professional License", "Internship"]
  },
  "Musician": {
    title: "Musician",
    description: "Create and perform music. May work in bands, orchestras, or as a solo artist.",
    skills: ["Musical Talent", "Performance", "Creativity", "Practice Discipline", "Collaboration"],
    averageSalary: "Variable",
    education: ["Music Degree", "Performance Training", "Self-Practice"]
  },
  "Chef": {
    title: "Chef",
    description: "Create and prepare meals in restaurants or other settings. Manage kitchen operations and staff.",
    skills: ["Cooking", "Menu Planning", "Leadership", "Time Management", "Creativity"],
    averageSalary: "$45,000 - $100,000",
    education: ["Culinary School", "Apprenticeship", "Industry Experience"]
  },
  "Civil Engineer": {
    title: "Civil Engineer",
    description: "Design and oversee construction projects. Work on infrastructure like roads, buildings, and bridges.",
    skills: ["Engineering", "Mathematics", "Project Management", "Problem Solving", "Technical Drawing"],
    averageSalary: "$65,000 - $130,000",
    education: ["Civil Engineering Degree", "Professional License", "Internship"]
  },
  "Mechanical Engineer": {
    title: "Mechanical Engineer",
    description: "Design and build mechanical systems. Work on machines, engines, and other mechanical devices.",
    skills: ["Engineering", "CAD Design", "Problem Solving", "Mathematics", "Technical Skills"],
    averageSalary: "$70,000 - $140,000",
    education: ["Mechanical Engineering Degree", "Professional License", "Technical Training"]
  },
  "Biotechnologist": {
    title: "Biotechnologist",
    description: "Apply biological processes to develop new products. Work in fields like medicine, agriculture, or environmental science.",
    skills: ["Biology", "Lab Techniques", "Research", "Analysis", "Problem Solving"],
    averageSalary: "$55,000 - $120,000",
    education: ["Biotechnology Degree", "Research Experience", "Advanced Degree"]
  },
  "Scientist": {
    title: "Scientist",
    description: "Conduct research and experiments in various fields. Analyze data and publish findings.",
    skills: ["Research", "Analysis", "Scientific Method", "Writing", "Critical Thinking"],
    averageSalary: "$60,000 - $130,000",
    education: ["Science Degree", "PhD", "Research Experience"]
  },
  "Generalist": {
    title: "Generalist",
    description: "Versatile professional with broad skills. Can adapt to various roles and industries.",
    skills: ["Adaptability", "Communication", "Problem Solving", "Learning Ability", "Versatility"],
    averageSalary: "Variable",
    education: ["Various Fields", "Continuous Learning", "Diverse Experience"]
  }
}; 