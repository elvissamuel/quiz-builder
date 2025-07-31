"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuizBuilderProps {
  quiz?: any
}

export function QuizBuilder({ quiz }: QuizBuilderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: quiz?.title || "",
    description: quiz?.description || "",
    creatorName: quiz?.creatorName || "",
    questions: quiz?.questions || [
      {
        id: crypto.randomUUID(),
        text: "",
        order: 0,
        answers: [
          { id: crypto.randomUUID(), text: "", order: 0, resultId: "" },
          { id: crypto.randomUUID(), text: "", order: 1, resultId: "" },
          { id: crypto.randomUUID(), text: "", order: 2, resultId: "" },
        ],
      },
    ],
    results: quiz?.results || [{ id: crypto.randomUUID(), title: "", description: "", imageUrl: "" }],
  })

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: crypto.randomUUID(),
          text: "",
          order: prev.questions.length,
          answers: [
            { id: crypto.randomUUID(), text: "", order: 0, resultId: "" },
            { id: crypto.randomUUID(), text: "", order: 1, resultId: "" },
            { id: crypto.randomUUID(), text: "", order: 2, resultId: "" },
          ],
        },
      ],
    }))
  }

  const removeQuestion = (questionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_: any, index: number) => index !== questionIndex),
    }))
  }

  const addAnswer = (questionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((question: any, index: number) =>
        index === questionIndex
          ? {
              ...question,
              answers: [
                ...question.answers,
                {
                  id: crypto.randomUUID(),
                  text: "",
                  order: question.answers.length,
                  resultId: "",
                },
              ],
            }
          : question,
      ),
    }))
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((question: any, index: number) =>
        index === questionIndex
          ? {
              ...question,
              answers: question.answers.filter((_: any, aIndex: number) => aIndex !== answerIndex),
            }
          : question,
      ),
    }))
  }

  const addResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, { id: crypto.randomUUID(), title: "", description: "", imageUrl: "" }],
    }))
  }

  const removeResult = (resultIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_: any, index: number) => index !== resultIndex),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = quiz ? `/api/quizzes/${quiz.id}` : "/api/quizzes"
      const method = quiz ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save quiz")
      }

      const savedQuiz = await response.json()

      toast({
        title: "Success",
        description: quiz ? "Quiz updated successfully" : "Quiz created successfully",
      })

      // Force refresh the page to ensure fresh data
      router.refresh()
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100">
          <CardTitle className="text-teal-800 flex items-center">
            <div className="w-6 h-6 bg-teal-500 rounded-full mr-3 flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label htmlFor="title" className="text-teal-700 font-medium">Quiz Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter quiz title"
              className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="creatorName" className="text-teal-700 font-medium">Creator Name</Label>
            <Input
              id="creatorName"
              value={formData.creatorName}
              onChange={(e) => setFormData((prev) => ({ ...prev, creatorName: e.target.value }))}
              placeholder="Enter your name"
              className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-teal-700 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter quiz description"
              rows={3}
              className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gold-50 to-teal-50 border-b border-gold-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-teal-800 flex items-center">
              <div className="w-6 h-6 bg-gold-500 rounded-full mr-3 flex items-center justify-center">
                <span className="text-teal-900 text-xs font-bold">★</span>
              </div>
              Personality Results
            </CardTitle>
            <Button type="button" onClick={addResult} variant="outline" size="sm" className="border-gold-300 text-gold-700 hover:bg-gold-50">
              <Plus className="w-4 h-4 mr-2" />
              Add Result
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {formData.results.map((result: any, resultIndex: number) => (
            <div key={result.id} className="border border-gold-200 rounded-lg p-4 space-y-4 bg-gradient-to-r from-gold-50/50 to-teal-50/50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-teal-800">Result {resultIndex + 1}</h4>
                {formData.results.length > 1 && (
                  <Button type="button" onClick={() => removeResult(resultIndex)} variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-teal-700 font-medium">Result Title</Label>
                  <Input
                    value={result.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        results: prev.results.map((r: any, index: number) =>
                          index === resultIndex ? { ...r, title: e.target.value } : r,
                        ),
                      }))
                    }
                    placeholder="e.g., The Adventurer"
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <Label className="text-teal-700 font-medium">Image URL (Optional)</Label>
                  <Input
                    value={result.imageUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        results: prev.results.map((r: any, index: number) =>
                          index === resultIndex ? { ...r, imageUrl: e.target.value } : r,
                        ),
                      }))
                    }
                    placeholder="https://example.com/image.jpg"
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div>
                <Label className="text-teal-700 font-medium">Description</Label>
                <Textarea
                  value={result.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      results: prev.results.map((r: any, index: number) =>
                        index === resultIndex ? { ...r, description: e.target.value } : r,
                      ),
                    }))
                  }
                  placeholder="Describe this personality type"
                  rows={3}
                  className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          ))}
          
          {/* Add Result Button at Bottom */}
          <div className="flex justify-center pt-4">
            <Button type="button" onClick={addResult} variant="outline" className="border-gold-300 text-gold-700 hover:bg-gold-50 px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Result
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-teal-800 flex items-center">
              <div className="w-6 h-6 bg-teal-500 rounded-full mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">?</span>
              </div>
              Questions
            </CardTitle>
            <Button type="button" onClick={addQuestion} variant="outline" size="sm" className="border-teal-300 text-teal-700 hover:bg-teal-50">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {formData.questions.map((question: any, questionIndex: number) => (
            <div key={question.id} className="border border-teal-200 rounded-lg p-4 space-y-4 bg-gradient-to-r from-teal-50/50 to-gold-50/50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-teal-800">Question {questionIndex + 1}</h4>
                {formData.questions.length > 1 && (
                  <Button type="button" onClick={() => removeQuestion(questionIndex)} variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <Label className="text-teal-700 font-medium">Question Text</Label>
                <Input
                  value={question.text}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      questions: prev.questions.map((q: any, index: number) =>
                        index === questionIndex ? { ...q, text: e.target.value } : q,
                      ),
                    }))
                  }
                  placeholder="Enter your question"
                  className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-teal-700 font-medium">Answer Options</Label>
                  <Button type="button" onClick={() => addAnswer(questionIndex)} variant="outline" size="sm" className="border-gold-300 text-gold-700 hover:bg-gold-50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Answer
                  </Button>
                </div>
                {question.answers.map((answer: any, answerIndex: number) => (
                  <div key={answer.id} className="flex gap-2 items-center">
                    <Input
                      value={answer.text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          questions: prev.questions.map((q: any, qIndex: number) =>
                            qIndex === questionIndex
                              ? {
                                  ...q,
                                  answers: q.answers.map((a: any, aIndex: number) =>
                                    aIndex === answerIndex ? { ...a, text: e.target.value } : a,
                                  ),
                                }
                              : q,
                          ),
                        }))
                      }
                      placeholder={`Answer ${answerIndex + 1}`}
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                    <select
                      value={answer.resultId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          questions: prev.questions.map((q: any, qIndex: number) =>
                            qIndex === questionIndex
                              ? {
                                  ...q,
                                  answers: q.answers.map((a: any, aIndex: number) =>
                                    aIndex === answerIndex ? { ...a, resultId: e.target.value } : a,
                                  ),
                                }
                              : q,
                          ),
                        }))
                      }
                      className="px-3 py-2 border border-teal-200 rounded-md focus:border-teal-500 focus:ring-teal-500 bg-white"
                      required
                    >
                      <option value="">Select Result</option>
                      {formData.results.map((result: any, resultIndex: number) => (
                        <option key={result.id} value={result.id}>
                          {result.title || `Result ${resultIndex + 1}`}
                        </option>
                      ))}
                    </select>
                    {question.answers.length > 2 && (
                      <Button
                        type="button"
                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {/* Add Answer Button at Bottom of Each Question */}
                <div className="flex justify-center pt-2">
                  <Button 
                    type="button" 
                    onClick={() => addAnswer(questionIndex)} 
                    variant="outline" 
                    size="sm" 
                    className="border-gold-300 text-gold-700 hover:bg-gold-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Answer
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Question Button at Bottom */}
          <div className="flex justify-center pt-4">
            <Button type="button" onClick={addQuestion} variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50 px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Question
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg">
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : quiz ? "Update Quiz" : "Create Quiz"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin")} className="border-teal-300 text-teal-700 hover:bg-teal-50">
          Cancel
        </Button>
      </div>
    </form>
  )
}
