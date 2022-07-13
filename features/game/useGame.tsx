import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loadQuestions } from "./data";

import type { Question } from "./data";

type GameState = {
  questions: Question[];
  answers: (boolean | undefined)[];
  currentQuestionIndex: number;
  isLoadingQuestions: boolean;
  errorLoadingQuestions: null | string;
  hasEnded: boolean;
  hasStarted: boolean;
  score: number;

  start: () => Promise<void>;
  reset: () => void;
  setAnswer: (answer: boolean) => void;
};

// We are modelling the answers from user as an array of entries that matches 1:1 by index of questions from questions
// So, whenever we load a new set of `N` questions, this helper will help us create empty container array with `N` items for answers
const createAnswersContainer = (totalQuestions: number): GameState["answers"] =>
  Array.from({ length: totalQuestions });

// Since question and answer are stored in 2 different containers, let's use this helper to
// compute score and store it in the state for easier access and faster rendering
const computeScore = (
  questions: GameState["questions"],
  answers: GameState["answers"]
) => {
  return answers.reduce((score, answer, index) => {
    if (questions[index]?.correctAnswer === answer) {
      return ++score;
    }

    return score;
  }, 0);
};

export const useGame = create<GameState>()(
  //  Persisting ensures that the entire state is stored in device's localstorage so that user cna resume game even after they close and open the game
  persist(
    (set, get) => ({
      questions: [],
      isLoadingQuestions: false,
      errorLoadingQuestions: null,
      answers: [],
      currentQuestionIndex: 0,
      hasEnded: false,
      hasStarted: false,
      score: 0,

      start: async () => {
        set({ isLoadingQuestions: true });
        try {
          const questions = await loadQuestions();
          set({
            questions,
            hasStarted: true,
            isLoadingQuestions: false,
            answers: createAnswersContainer(questions.length),
          });
        } catch (err) {
          set({
            isLoadingQuestions: false,
            // Normally, the fetch call will set the error message but on the off chance it's not set, let's set a default error message
            errorLoadingQuestions: err?.message || "Error in api request",
          });
        }
      },
      setAnswer: (answer: boolean) => {
        const { questions, currentQuestionIndex, answers } = get();
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        const newQuestionIndex = currentQuestionIndex + 1;
        // If all the answers have been provided, let's end the game and compute score
        if (newQuestionIndex >= answers.length) {
          set({
            hasEnded: true,
            answers: newAnswers,
            score: computeScore(questions, newAnswers),
          });
        }

        set({ answers: newAnswers, currentQuestionIndex: newQuestionIndex });
      },
      reset: () =>
        set({
          // reset these because game can start from previously ended game
          currentQuestionIndex: 0,
          hasEnded: false,
          hasStarted: false,
          questions: [],
          answers: [],
        }),
    }),
    {
      name: "@store/game",
      getStorage: () => AsyncStorage,
    }
  )
);
