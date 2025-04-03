import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());  // Fix for 400 Bad Request

// Configure CORS for local development
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

const careerProfiles = {
    "Software Developer": {
        primary: ["Tech Interest", "Problem Solving", "Digital Skills", "Analytical Thinking"],
        secondary: ["Maths", "Innovation", "Team Collaboration", "Learning Agility"]
    },
    "Data Scientist": {
        primary: ["Data Analysis", "Maths", "Analytical Thinking", "Research"],
        secondary: ["Tech Interest", "Problem Solving", "Critical Thinking", "Innovation"]
    },
    "Doctor": {
        primary: ["Medical Knowledge", "Empathy", "Problem Diagnosis", "Detail Oriented"],
        secondary: ["Science", "Communication", "Social Service", "Emotional Intelligence"]
    },
    "Teacher": {
        primary: ["Passion for Teaching", "Communication", "Empathy", "Organization"],
        secondary: ["Leadership", "Social Service", "Adaptability", "Emotional Intelligence"]
    },
    "Lawyer": {
        primary: ["Interest in Law", "Critical Thinking", "Communication", "Analytical Thinking"],
        secondary: ["Writing Skills", "Public Speaking", "Problem Solving", "Detail Oriented"]
    },
    "Artist": {
        primary: ["Artistic Expression", "Creativity", "Visual Arts", "Design Thinking"],
        secondary: ["Innovation", "Spatial Awareness", "Cultural Awareness", "Emotional Intelligence"]
    },
    "Psychologist": {
        primary: ["Empathy", "Emotional Intelligence", "Communication", "Problem Diagnosis"],
        secondary: ["Research", "Critical Thinking", "Social Service", "Cultural Awareness"]
    },
    "Financial Analyst": {
        primary: ["Financial Interest", "Data Analysis", "Analytical Thinking", "Maths"],
        secondary: ["Detail Oriented", "Critical Thinking", "Research", "Strategic Thinking"]
    },
    "Marketing Manager": {
        primary: ["Communication", "Strategic Thinking", "Sales Ability", "Innovation"],
        secondary: ["Creativity", "Leadership", "Project Management", "Cultural Awareness"]
    },
    "Game Developer": {
        primary: ["Tech Interest", "Creativity", "Problem Solving", "Digital Skills"],
        secondary: ["Visual Arts", "Innovation", "Team Collaboration", "Design Thinking"]
    },
    "Journalist": {
        primary: ["Writing Skills", "Communication", "Research", "Critical Thinking"],
        secondary: ["Cultural Awareness", "Public Speaking", "Detail Oriented", "Adaptability"]
    },
    "Architect": {
        primary: ["Design Thinking", "Spatial Awareness", "Technical Skills", "Creativity"],
        secondary: ["Project Management", "Detail Oriented", "Innovation", "Visual Arts"]
    },
    "Environmental Scientist": {
        primary: ["Nature Interest", "Science", "Research", "Analytical Thinking"],
        secondary: ["Problem Solving", "Data Analysis", "Critical Thinking", "Social Service"]
    },
    "Project Manager": {
        primary: ["Project Management", "Leadership", "Organization", "Communication"],
        secondary: ["Problem Solving", "Team Collaboration", "Strategic Thinking", "Resource Management"]
    },
    "UX Designer": {
        primary: ["Design Thinking", "Empathy", "Creativity", "Digital Skills"],
        secondary: ["Research", "Innovation", "Communication", "Problem Solving"]
    },
    "Business Consultant": {
        primary: ["Business Acumen", "Strategic Thinking", "Problem Solving", "Analytical Thinking"],
        secondary: ["Communication", "Leadership", "Critical Thinking", "Project Management"]
    },
    "Human Resources Manager": {
        primary: ["Emotional Intelligence", "Communication", "Conflict Resolution", "Organization"],
        secondary: ["Leadership", "Cultural Awareness", "Problem Solving", "Team Collaboration"]
    },
    "Research Scientist": {
        primary: ["Research", "Scientific Method", "Analytical Thinking", "Detail Oriented"],
        secondary: ["Critical Thinking", "Innovation", "Writing Skills", "Problem Solving"]
    }
};

const validateInputs = (answers) => {
    console.log("Validating inputs...");
    console.log("Received answers:", Object.keys(answers));
    
    const requiredFields = [
        "Maths", "Science", "Creativity", "Communication",
        "Tech Interest", "Analytical Thinking", "Leadership",
        "Writing Skills", "Medical Knowledge", "Problem Solving",
        "Business Acumen", "Passion for Teaching", "Interest in Law",
        "Musical Talent", "Empathy", "Visual Arts", "Physical Activity",
        "Research", "Nature Interest", "Technical Skills", "Social Service",
        "Organization", "Innovation", "Detail Oriented", "Public Speaking",
        "Data Analysis", "Project Management", "Customer Service",
        "Design Thinking", "Financial Interest", "Language Skills",
        "Team Collaboration", "Critical Thinking", "Entrepreneurial",
        "Digital Skills", "Mechanical Aptitude", "Sales Ability",
        "Scientific Method", "Artistic Expression", "Risk Taking",
        "Adaptability", "Strategic Thinking", "Cultural Awareness",
        "Problem Diagnosis", "Resource Management", "Emotional Intelligence",
        "Spatial Awareness", "Time Management", "Conflict Resolution",
        "Learning Agility"
    ];

    console.log("Required fields:", requiredFields);
    
    const missingFields = requiredFields.filter(field => answers[field] === undefined);
    console.log("Missing fields:", missingFields);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Check for invalid values
    const invalidFields = Object.entries(answers)
        .filter(([key, value]) => typeof value !== "number" || ![0, 1].includes(value))
        .map(([key]) => key);
    
    console.log("Invalid fields:", invalidFields);
    
    if (invalidFields.length > 0) {
        throw new Error(`Invalid values for fields: ${invalidFields.join(", ")}. Values must be 0 or 1`);
    }
};

const predictCareer = (answers) => {
    const careerScores = {};

    // Calculate weighted scores for each career
    for (const [career, profile] of Object.entries(careerProfiles)) {
        let score = 0;
        
        // Primary skills are weighted more heavily
        profile.primary.forEach(skill => {
            score += (answers[skill] || 0) * 2;
        });
        
        // Secondary skills have normal weight
        profile.secondary.forEach(skill => {
            score += (answers[skill] || 0);
        });
        
        // Normalize score based on the number of skills
        const maxPossibleScore = (profile.primary.length * 2) + profile.secondary.length;
        careerScores[career] = (score / maxPossibleScore) * 100;
    }

    // Sort careers by score and get top 3
    const sortedCareers = Object.entries(careerScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([career, score]) => ({
            career,
            confidence: Math.round(score)
        }));

    return {
        primaryCareer: sortedCareers[0].career,
        matches: sortedCareers
    };
};

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Career Predictor API is running" });
});

app.post("/predict", (req, res) => {
    try {
        console.log("\n--- New Prediction Request ---");
        console.log("Request body:", req.body);
        console.log("Content-Type:", req.headers['content-type']);
        
        const userAnswers = req.body;
        
        try {
            validateInputs(userAnswers);
        } catch (validationError) {
            console.error("Validation error:", validationError.message);
            return res.status(400).json({ error: validationError.message });
        }
        
        console.log("Validation passed, calculating prediction...");
        const result = predictCareer(userAnswers);
        console.log("Prediction result:", result);
        
        res.json(result);
    } catch (error) {
        console.error("Error processing request:");
        console.error("Error type:", error.constructor.name);
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(400).json({ error: error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong! Please try again." });
});

const PORT = process.env.PORT || 5000;

try {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}
