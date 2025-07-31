import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Plus, Edit, Eye } from "lucide-react"
import { DeleteQuizButton } from "@/components/delete-quiz-button"

async function getQuizzes() {
  try {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      console.log("Skipping database fetch during build")
      return []
    }

    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        questions: true,
        results: true,
        _count: {
          select: { responses: true },
        },
      },
    })
    
    console.log(`Fetched ${quizzes.length} quizzes from database`)
    return quizzes
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    // Return empty array instead of throwing to prevent build failures
    return []
  }
}

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const quizzes = await getQuizzes()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Quiz Management
          </h1>
          <p className="text-muted-foreground text-lg">Create, edit, and manage your personality quizzes</p>
        </div>
        <Link href="/admin/quiz/new">
          <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Quiz
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100">
              <CardTitle className="line-clamp-2 text-teal-800">{quiz.title}</CardTitle>
              <CardDescription className="line-clamp-3 text-teal-600">{quiz.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
                <div className="space-x-4">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                    {quiz.questions.length} questions
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mr-2"></div>
                    {quiz.results.length} results
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    {quiz._count.responses} responses
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-teal-600 font-medium">
                  Created by: {quiz.creatorName || "Anonymous"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/quiz/${quiz.id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-teal-300 text-teal-700 hover:bg-teal-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </Link>
                <Link href={`/admin/quiz/${quiz.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full border-gold-300 text-gold-700 hover:bg-gold-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <DeleteQuizButton quizId={quiz.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-gold-100 rounded-full flex items-center justify-center">
            <Plus className="w-12 h-12 text-teal-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-teal-800">No quizzes created yet</h3>
          <p className="text-muted-foreground mb-6 text-lg">Create your first personality quiz to get started</p>
          <Link href="/admin/quiz/new">
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
