import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Prevent database operations during build time
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.DATABASE_URL

export async function GET() {
  if (isBuildTime) {
    return NextResponse.json({ error: "Service unavailable during build" }, { status: 503 })
  }

  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        results: true,
        _count: {
          select: { responses: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(quizzes)
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (isBuildTime) {
    return NextResponse.json({ error: "Service unavailable during build" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { title, description, creatorName, questions, results } = body

    // Create a mapping of temporary result IDs to actual result data
    const resultMapping = new Map()
    results.forEach((result: any) => {
      resultMapping.set(result.id, {
        title: result.title,
        description: result.description,
        imageUrl: result.imageUrl,
      })
    })

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        creatorName,
        results: {
          create: results.map((result: any) => ({
            title: result.title,
            description: result.description,
            imageUrl: result.imageUrl,
          })),
        },
      },
      include: {
        results: true,
      },
    })

    // Create a mapping from temporary result IDs to actual database result IDs
    const tempToDbIdMapping = new Map()
    results.forEach((tempResult: any, index: number) => {
      tempToDbIdMapping.set(tempResult.id, quiz.results[index].id)
    })

    // Now create questions with answers, using the mapped result IDs
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question: any, index: number) => {
        return prisma.question.create({
          data: {
            text: question.text,
            order: index,
            quizId: quiz.id,
            answers: {
              create: question.answers.map((answer: any, answerIndex: number) => ({
                text: answer.text,
                order: answerIndex,
                resultId: tempToDbIdMapping.get(answer.resultId) || quiz.results[0].id,
              })),
            },
          },
          include: {
            answers: true,
          },
        })
      })
    )

    // Fetch the complete quiz with all relations
    const completeQuiz = await prisma.quiz.findUnique({
      where: { id: quiz.id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        results: true,
      },
    })

    return NextResponse.json(completeQuiz)
  } catch (error) {
    console.error("Error creating quiz:", error)
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 })
  }
}
