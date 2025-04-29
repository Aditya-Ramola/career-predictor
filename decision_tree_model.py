import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

def main():
    # 1. Load CSV
    df = pd.read_csv("data.csv")

    # 2. Encode target
    le = LabelEncoder()
    df["Career_encoded"] = le.fit_transform(df["Career"])

    # 3. Features and target
    X = df.drop(["Career", "Career_encoded"], axis=1)
    y = df["Career_encoded"]

    # 4. Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 5. Train Decision Tree
    clf = DecisionTreeClassifier(random_state=42)
    clf.fit(X_train, y_train)

    # 6. Evaluate
    y_pred = clf.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=le.classes_))

    # 7. Sample prediction
    sample = X_test.iloc[0:1]
    print(f"\nSample Input Prediction: {le.inverse_transform(clf.predict(sample))[0]}")

if __name__ == "__main__":
    main()
