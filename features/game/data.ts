import { decode } from "html-entities";

const API_URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export type Question = {
  category: string;
  question: string;
  correctAnswer: boolean;
};

// In order to conform to a unified naming convention, let's re-map some property names to camel-case
type ApiQuestion = Omit<Question, "correctAnswer"> & {
  correct_answer: string;
};

export const loadQuestions = async (): Promise<Question[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results.map((q: ApiQuestion) => ({
    category: q.category,
    // questions can have html entities, we need to decode those in order to display in jsx
    question: decode(q.question),
    //  The api seems to have accept the ability for custom input as answer, not only true/false
    //  which is why the correct answer is stored in string `True` or `False`.
    //  However, for the scope of this project we are only handling boolean answers
    //  so, let's transform the data to conform to boolean type by checking the exact string value
    correctAnswer: q.correct_answer.toLowerCase() === "true",
  }));
};
