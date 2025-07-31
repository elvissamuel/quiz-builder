import { QuizBuilder } from "@/components/quiz-builder"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getQuiz(id: string) {
  try {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      console.log("Skipping database fetch during build")
      return null
    }

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
    
    console.log(`Fetched quiz for editing: ${quiz?.title || 'not found'}`)
    return quiz
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return null
  }
}

export default async function EditQuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id)

  if (!quiz) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Quiz</h1>
        <p className="text-muted-foreground">Update your personality quiz</p>
      </div>
      <QuizBuilder quiz={quiz} />
    </div>
  )
}
