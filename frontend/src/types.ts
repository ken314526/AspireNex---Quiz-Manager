export interface Response {
  data: {};
  message: string | "";
  success: boolean;
  error: boolean;
}

export interface Quiz {
  _id: string;
  title: string;
  code: string;
}

export interface Report {
  quiz: string;
  user: string;
  result: string;
  correctAnswers: number;
  totalQuestions: number;
  wrongAnswers: number;
  title: string;
}
