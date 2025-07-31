import { QuizPlayer } from "@/components/quiz-player"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
          orderBy: { order: "asc" },
        },
        results: true,
      },
    })
    return quiz
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return null
  }
}

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id)

  if (!quiz) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <QuizPlayer quiz={quiz} />
    </div>
  )
}
