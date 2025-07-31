import { ResultDisplay } from "@/components/result-display"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getResult(quizId: string, resultId: string) {
  try {
    const result = await prisma.result.findFirst({
      where: {
        id: resultId,
        quizId: quizId,
      },
      include: {
        quiz: true,
      },
    })
    return result
  } catch (error) {
    console.error("Error fetching result:", error)
    return null
  }
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { result?: string }
}) {
  if (!searchParams.result) {
    notFound()
  }

  const result = await getResult(params.id, searchParams.result)

  if (!result) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ResultDisplay result={result} />
    </div>
  )
}
