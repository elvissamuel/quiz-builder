import { QuizBuilder } from "@/components/quiz-builder"

export default function NewQuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Quiz</h1>
        <p className="text-muted-foreground">Build your personality quiz step by step</p>
      </div>
      <QuizBuilder />
    </div>
  )
}
