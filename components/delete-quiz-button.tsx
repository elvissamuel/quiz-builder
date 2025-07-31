"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteQuizButtonProps {
  quizId: string
}

export function DeleteQuizButton({ quizId }: DeleteQuizButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/quizzes/${quizId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete quiz")
      }

      toast({
        title: "Quiz deleted",
        description: "The quiz has been successfully deleted",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <AlertDialogHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
          <AlertDialogTitle className="text-red-800 flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full mr-3 flex items-center justify-center">
              <Trash2 className="w-3 h-3 text-white" />
            </div>
            Delete Quiz
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-700">
            Are you sure you want to delete this quiz? This action cannot be undone. All questions, answers, and
            responses will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-6">
          <AlertDialogCancel className="border-teal-300 text-teal-700 hover:bg-teal-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
