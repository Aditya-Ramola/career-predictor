import random
import sys
import json
import pandas as pd

# Generate a large dataset with 6000+ rows
random.seed(42)
n_samples = 6000

def generate_data():
    data = []
    careers = [
        "Engineer", "Doctor", "Artist", "Teacher", "Scientist", "Entrepreneur", "Lawyer", "Psychologist", "Data Scientist",
        "Software Developer", "Civil Engineer", "Mechanical Engineer", "Biotechnologist", "Financial Analyst", "Marketing Manager", 
        "Architect", "Game Developer", "Musician", "Chef", "Journalist"
    ]
    for _ in range(n_samples):
        entry = {
            "Maths": random.randint(0, 1),
            "Science": random.randint(0, 1),
            "Creativity": random.randint(0, 1),
            "Communication": random.randint(0, 1),
            "Tech Interest": random.randint(0, 1),
            "Analytical Thinking": random.randint(0, 1),
            "Leadership": random.randint(0, 1),
            "Writing Skills": random.randint(0, 1),
            "Teamwork": random.randint(0, 1),
            "Medical Knowledge": random.randint(0, 1),
            "Problem Solving": random.randint(0, 1),
            "Business Acumen": random.randint(0, 1),
            "Passion for Teaching": random.randint(0, 1),
            "Interest in Law": random.randint(0, 1),
            "Musical Talent": random.randint(0, 1),
            "Career": random.choice(careers)
        }
        data.append(entry)
    return data

data = generate_data()
df = pd.DataFrame(data)
df.to_csv("data.csv", index=False)

def predict_career(inputs):
    if inputs["Maths"] and inputs["Science"]:
        if inputs["Tech Interest"]:
            return "Software Developer"
        elif inputs["Medical Knowledge"]:
            return "Doctor"
        else:
            return "Scientist"
    elif inputs["Creativity"]:
        if inputs["Musical Talent"]:
            return "Musician"
        elif inputs["Writing Skills"]:
            return "Journalist"
        else:
            return "Artist"
    elif inputs["Communication"]:
        if inputs["Interest in Law"]:
            return "Lawyer"
        elif inputs["Passion for Teaching"]:
            return "Teacher"
        else:
            return "Psychologist"
    elif inputs["Business Acumen"]:
        return "Entrepreneur"
    elif inputs["Analytical Thinking"]:
        return "Data Scientist"
    elif inputs["Problem Solving"]:
        return "Financial Analyst"
    elif inputs["Leadership"]:
        return "Marketing Manager"
    elif inputs["Tech Interest"]:
        return "Game Developer"
    else:
        return "Generalist"

# Read input from Express.js
if __name__ == "__main__":
    input_keys = ["Maths", "Science", "Creativity", "Communication", "Tech Interest", "Analytical Thinking", "Leadership", "Writing Skills", "Teamwork", "Medical Knowledge", "Problem Solving", "Business Acumen", "Passion for Teaching", "Interest in Law", "Musical Talent"]
    user_inputs = dict(zip(input_keys, map(int, sys.argv[1:])))
    career = predict_career(user_inputs)
    print(json.dumps({"career": career}))
