export interface Quiz {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  questions?: Question[]
  results?: Result[]
}

export interface Question {
  id: string
  text: string
  order: number
  quizId: string
  answers?: Answer[]
}

export interface Answer {
  id: string
  text: string
  order: number
  questionId: string
  resultId: string
}

export interface Result {
  id: string
  title: string
  description: string
  imageUrl?: string
  quizId: string
}

export interface QuizResponse {
  id: string
  quizId: string
  resultId: string
  createdAt: Date
}

export interface QuizSubmission {
  answers: { questionId: string; answerId: string }[]
}
