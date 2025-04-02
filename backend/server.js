import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());  // Fix for 400 Bad Request

// Configure CORS
const corsOptions = {
  origin: [
    'https://career-predictor-frontend.vercel.app',
    'https://career-predictor-frontend-git-main-aditya-ramolas-projects.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const validateInputs = (answers) => {
    const requiredFields = [
        "Tech Interest", "Problem Solving", "Creativity", "Communication",
        "Leadership", "Analytical Thinking", "Healthcare Interest", "Business Acumen",
        "Design Thinking", "Research", "Teaching", "Technical Writing",
        "Project Management", "Customer Service", "Innovation", "Detail Oriented",
        "Risk Analysis", "Environmental Interest", "Legal Interest", "Data Analysis"
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
    const scores = {
        "Software Engineer": (answers["Tech Interest"] + answers["Problem Solving"] + answers["Technical Writing"]) / 3,
        "Data Scientist": (answers["Data Analysis"] + answers["Analytical Thinking"] + answers["Problem Solving"]) / 3,
        "Doctor": (answers["Healthcare Interest"] + answers["Detail Oriented"] + answers["Communication"]) / 3,
        "Teacher": (answers["Teaching"] + answers["Communication"] + answers["Leadership"]) / 3,
        "Lawyer": (answers["Legal Interest"] + answers["Communication"] + answers["Research"]) / 3,
        "Business Analyst": (answers["Business Acumen"] + answers["Analytical Thinking"] + answers["Communication"]) / 3,
        "UX Designer": (answers["Design Thinking"] + answers["Creativity"] + answers["Customer Service"]) / 3,
        "Financial Analyst": (answers["Business Acumen"] + answers["Data Analysis"] + answers["Risk Analysis"]) / 3,
        "Marketing Manager": (answers["Communication"] + answers["Business Acumen"] + answers["Innovation"]) / 3,
        "Data Engineer": (answers["Tech Interest"] + answers["Data Analysis"] + answers["Detail Oriented"]) / 3,
        "Product Manager": (answers["Project Management"] + answers["Leadership"] + answers["Communication"]) / 3,
        "Cybersecurity Analyst": (answers["Tech Interest"] + answers["Risk Analysis"] + answers["Detail Oriented"]) / 3,
        "DevOps Engineer": (answers["Tech Interest"] + answers["Problem Solving"] + answers["Project Management"]) / 3,
        "Healthcare Administrator": (answers["Healthcare Interest"] + answers["Project Management"] + answers["Business Acumen"]) / 3,
        "Environmental Scientist": (answers["Environmental Interest"] + answers["Research"] + answers["Analytical Thinking"]) / 3
    };

    // Find the career with the highest score
    return Object.entries(scores)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];
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
