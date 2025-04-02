import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());  // Fix for 400 Bad Request

// Configure CORS
const corsOptions = {
  origin: [
    'https://career-predictor-frontend.vercel.app',  // Your frontend URL
    'http://localhost:3000',  // Local development
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const validateInputs = (answers) => {
    const requiredFields = [
        "Maths", "Science", "Creativity", "Communication", "Tech Interest",
        "Analytical Thinking", "Leadership", "Writing Skills", "Medical Knowledge",
        "Problem Solving", "Business Acumen", "Passion for Teaching",
        "Interest in Law", "Musical Talent", "Empathy"
    ];

    const missingFields = requiredFields.filter(field => answers[field] === undefined);
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    for (const [key, value] of Object.entries(answers)) {
        if (typeof value !== "number" || ![0, 1].includes(value)) {
            throw new Error(`Invalid value for ${key}. Must be 0 or 1`);
        }
    }
};

const predictCareer = (answers) => {
    const careers = {
        "Software Developer": answers["Maths"] && answers["Tech Interest"],
        "Doctor": answers["Science"] && answers["Medical Knowledge"],
        "Artist": answers["Creativity"] && !answers["Maths"],
        "Teacher": answers["Passion for Teaching"] && answers["Communication"],
        "Data Scientist": answers["Maths"] && answers["Analytical Thinking"],
        "Entrepreneur": answers["Leadership"] && answers["Business Acumen"],
        "Lawyer": answers["Interest in Law"] && answers["Communication"],
        "Psychologist": answers["Communication"] && answers["Empathy"],
        "Game Developer": answers["Creativity"] && answers["Tech Interest"],
        "Journalist": answers["Writing Skills"] && answers["Communication"],
        "Financial Analyst": answers["Maths"] && answers["Problem Solving"],
        "Marketing Manager": answers["Leadership"] && answers["Creativity"],
        "Architect": answers["Creativity"] && answers["Maths"],
        "Musician": answers["Musical Talent"],
        "Chef": answers["Creativity"] && answers["Problem Solving"],
        "Civil Engineer": answers["Maths"] && answers["Problem Solving"],
        "Mechanical Engineer": answers["Maths"] && answers["Tech Interest"],
        "Biotechnologist": answers["Science"] && answers["Analytical Thinking"],
        "Scientist": answers["Science"] && answers["Analytical Thinking"],
        "Generalist": true  // Default if no strong match
    };

    return Object.keys(careers).find(career => careers[career]) || "Generalist";
};

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Career Predictor API is running" });
});

app.post("/predict", (req, res) => {
    try {
        const userAnswers = req.body;
        console.log("Received data:", userAnswers);

        validateInputs(userAnswers);
        const career = predictCareer(userAnswers);
        res.json({ career });
    } catch (error) {
        console.error("Error processing request:", error);
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
