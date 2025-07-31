import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Prevent database operations during build time
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.DATABASE_URL

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (isBuildTime) {
    return NextResponse.json({ error: "Service unavailable during build" }, { status: 503 })
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
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

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (isBuildTime) {
    return NextResponse.json({ error: "Service unavailable during build" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { title, description, creatorName, questions, results } = body

    // Delete existing questions and results
    await prisma.question.deleteMany({
      where: { quizId: params.id },
    })

    await prisma.result.deleteMany({
      where: { quizId: params.id },
    })

    // Update quiz with new data
    const quiz = await prisma.quiz.update({
      where: { id: params.id },
      data: {
        title,
        description,
        creatorName,
        questions: {
          create: questions.map((question: any, index: number) => ({
            text: question.text,
            order: index,
            answers: {
              create: question.answers.map((answer: any, answerIndex: number) => ({
                text: answer.text,
                order: answerIndex,
                resultId: answer.resultId,
              })),
            },
          })),
        },
        results: {
          create: results.map((result: any) => ({
            title: result.title,
            description: result.description,
            imageUrl: result.imageUrl,
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        results: true,
      },
    })

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error updating quiz:", error)
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (isBuildTime) {
    return NextResponse.json({ error: "Service unavailable during build" }, { status: 503 })
  }

  try {
    await prisma.quiz.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting quiz:", error)
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 })
  }
}
