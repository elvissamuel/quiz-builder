"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, RotateCcw, Copy, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

interface ResultDisplayProps {
  result: any
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const { toast } = useToast()
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showResultShareOptions, setShowResultShareOptions] = useState(false)

  const quizShareUrl = `${window.location.origin}/quiz/${result.quiz.id}`
  const resultShareUrl = `${window.location.origin}/quiz/${result.quiz.id}/result?result=${result.id}`

  const handleCopyQuizLink = async () => {
    try {
      await navigator.clipboard.writeText(quizShareUrl)
      toast({
        title: "Quiz link copied!",
        description: "Quiz link has been copied to your clipboard",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      })
    }
  }

  const handleCopyResultLink = async () => {
    try {
      await navigator.clipboard.writeText(resultShareUrl)
      toast({
        title: "Result link copied!",
        description: "Your result link has been copied to your clipboard",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      })
    }
  }

  const handleShareQuiz = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: result.quiz.title,
          text: `Check out this personality quiz: "${result.quiz.title}"`,
          url: quizShareUrl,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      setShowShareOptions(true)
    }
  }

  const handleShareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Result: ${result.title}`,
          text: `I just took "${result.quiz.title}" and got: ${result.title}`,
          url: resultShareUrl,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      setShowResultShareOptions(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Your Result
        </h1>
        <p className="text-muted-foreground text-lg mb-2">You completed "{result.quiz.title}"</p>
        {result.quiz.creatorName && (
          <p className="text-muted-foreground text-sm">Created by: {result.quiz.creatorName}</p>
        )}
      </div>

      <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gold-50 to-teal-50 border-b border-gold-100">
          <CardTitle className="text-3xl text-center text-teal-800 flex items-center justify-center">
            <div className="w-10 h-10 bg-gold-500 rounded-full mr-3 flex items-center justify-center">
              <span className="text-teal-900 text-lg font-bold">★</span>
            </div>
            {result.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-8">
          {result.imageUrl && (
            <div className="flex justify-center">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-gold-100 rounded-xl">
                <Image
                  src={result.imageUrl || "/placeholder.svg"}
                  alt={result.title}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          )}
          <p className="text-lg leading-relaxed text-teal-800 bg-gradient-to-r from-teal-50 to-gold-50 p-6 rounded-lg border border-teal-100">
            {result.description}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <Link href={`/quiz/${result.quiz.id}`}>
          <Button variant="outline" className="w-full sm:w-auto border-teal-300 text-teal-700 hover:bg-teal-50">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Again
          </Button>
        </Link>

        <Button onClick={handleShareQuiz} className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg">
          <Share2 className="w-4 h-4 mr-2" />
          Share Quiz
        </Button>

        <Button onClick={handleCopyQuizLink} variant="outline" className="w-full sm:w-auto border-gold-300 text-gold-700 hover:bg-gold-50">
          <Copy className="w-4 h-4 mr-2" />
          Copy Quiz Link
        </Button>
      </div>

      {/* Result Sharing Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gold-50 to-teal-50 rounded-lg border border-gold-200">
        <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center justify-center">
          <Award className="w-5 h-5 mr-2 text-gold-600" />
          Share Your Result
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleShareResult} className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold shadow-lg">
            <Share2 className="w-4 h-4 mr-2" />
            Share Result
          </Button>
          <Button onClick={handleCopyResultLink} variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
            <Copy className="w-4 h-4 mr-2" />
            Copy Result Link
          </Button>
        </div>
      </div>

      {showShareOptions && (
        <Card className="mt-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100">
            <CardTitle className="text-lg text-teal-800">Share this quiz</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={quizShareUrl} 
                readOnly 
                className="flex-1 px-3 py-2 border border-teal-200 rounded-md bg-teal-50 text-teal-800" 
              />
              <Button onClick={handleCopyQuizLink} size="sm" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold">
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showResultShareOptions && (
        <Card className="mt-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gold-50 to-teal-50 border-b border-gold-100">
            <CardTitle className="text-lg text-teal-800 flex items-center">
              <Award className="w-5 h-5 mr-2 text-gold-600" />
              Share your result
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={resultShareUrl} 
                readOnly 
                className="flex-1 px-3 py-2 border border-teal-200 rounded-md bg-teal-50 text-teal-800" 
              />
              <Button onClick={handleCopyResultLink} size="sm" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold">
                Copy
              </Button>
            </div>
            <p className="text-sm text-teal-600 mt-2">
              This link will show your specific result: "{result.title}"
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <Link href="/" className="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200 flex items-center justify-center">
          <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
          ← Back to all quizzes
        </Link>
      </div>
    </div>
  )
}
