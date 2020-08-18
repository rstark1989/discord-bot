export interface TriviaInt {
  response_code: number;
  results: Array<ResultInt>;
}

interface ResultInt {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}
