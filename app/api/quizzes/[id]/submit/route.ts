import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { answers } = body

    // Get all answers with their result associations
    const answerDetails = await prisma.answer.findMany({
      where: {
        id: { in: answers.map((a: any) => a.answerId) },
      },
      include: {
        result: true,
      },
    })

    // Count votes for each result
    const resultCounts: Record<string, number> = {}

    answerDetails.forEach((answer) => {
      const resultId = answer.resultId
      resultCounts[resultId] = (resultCounts[resultId] || 0) + 1
    })

    // Find the result with the most votes
    const winningResultId = Object.entries(resultCounts).reduce((a, b) =>
      resultCounts[a[0]] > resultCounts[b[0]] ? a : b,
    )[0]

    // Save the quiz response
    await prisma.quizResponse.create({
      data: {
        quizId: params.id,
        resultId: winningResultId,
      },
    })

    return NextResponse.json({ resultId: winningResultId })
  } catch (error) {
    console.error("Error submitting quiz:", error)
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 })
  }
}
