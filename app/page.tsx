import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Plus, Play } from "lucide-react"

async function getQuizzes() {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        questions: true,
        _count: {
          select: { responses: true },
        },
      },
    })
    return quizzes
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return []
  }
}

export default async function HomePage() {
  const quizzes = await getQuizzes()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Personality Quiz Builder
          </h1>
          <p className="text-muted-foreground text-lg">Create and share personality quizzes with your audience</p>
        </div>
        <Link href="/admin">
          <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100">
              <CardTitle className="line-clamp-2 text-teal-800">{quiz.title}</CardTitle>
              <CardDescription className="line-clamp-3 text-teal-600">
                {quiz.description || "No description available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <div className="space-x-4">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                    {quiz.questions.length} questions
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mr-2"></div>
                    {quiz._count.responses} responses
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-teal-600 font-medium">
                  Created by: {quiz.creatorName || "Anonymous"}
                </p>
              </div>
              <Link href={`/quiz/${quiz.id}`}>
                <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold shadow-md">
                  <Play className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-gold-100 rounded-full flex items-center justify-center">
            <Plus className="w-12 h-12 text-teal-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-teal-800">No quizzes yet</h3>
          <p className="text-muted-foreground mb-6 text-lg">Create your first personality quiz to get started</p>
          <Link href="/admin">
            <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg px-8 py-3 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Quiz
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
