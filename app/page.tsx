import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Plus, Play, Sparkles, Users, Zap, Share2, BarChart3, Award, ArrowRight, Star, CheckCircle } from "lucide-react"

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

export default async function HomePage() {
  const quizzes = await getQuizzes()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-gold-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-gold-100 px-4 py-2 rounded-full text-sm font-medium text-teal-700 mb-6">
              <Sparkles className="w-4 h-4" />
              Create Engaging Personality Quizzes
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 bg-clip-text text-transparent leading-tight">
              Build Amazing
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                Personality Quizzes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create, share, and analyze personality quizzes that engage your audience. 
              Beautiful design, powerful analytics, and seamless sharing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/admin">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-xl px-8 py-4 text-lg font-semibold group">
                  <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="border-2 border-teal-300 text-teal-700 hover:bg-teal-50 px-8 py-4 text-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Everything You Need to Create
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                Amazing Quizzes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you create engaging personality quizzes that your audience will love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Create beautiful quizzes in minutes with our intuitive drag-and-drop interface. No technical skills required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gold-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Easy Sharing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Share your quizzes instantly via link, social media, or embed them on your website. Track engagement and results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Get detailed insights into quiz performance, participant responses, and engagement metrics to optimize your content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gold-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Beautiful Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Stunning result pages with custom images, detailed descriptions, and social sharing options for maximum engagement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Creator Attribution</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Add your name as the creator and build your personal brand. Get credit for your amazing quiz content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gold-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Modern Design</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">
                  Beautiful, responsive design that looks great on all devices. Dark mode support and smooth animations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{quizzes.length}+</div>
              <div className="text-teal-100">Quizzes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {quizzes.reduce((total, quiz) => total + quiz._count.responses, 0)}+
              </div>
              <div className="text-teal-100">Total Responses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-teal-100">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Quizzes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Recent Quizzes
            </h2>
            <p className="text-xl text-gray-600">
              Check out some of the latest personality quizzes created by our community
            </p>
          </div>

          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.slice(0, 6).map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:scale-105 flex flex-col h-full">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-gold-50 border-b border-teal-100 flex-shrink-0">
                    <CardTitle className="line-clamp-2 text-teal-800 min-h-[3rem] flex items-center">{quiz.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-teal-600 min-h-[4.5rem]">
                      {quiz.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex flex-col flex-1">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4 flex-shrink-0">
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
                    <div className="mb-4 flex-shrink-0">
                      <p className="text-sm text-teal-600 font-medium">
                        Created by: {quiz.creatorName || "Anonymous"}
                      </p>
                    </div>
                    <div className="mt-auto pt-4">
                      <Link href={`/quiz/${quiz.id}`}>
                        <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold shadow-md">
                          <Play className="w-4 h-4 mr-2" />
                          Take Quiz
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-gold-100 rounded-full flex items-center justify-center">
                <Plus className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-teal-800">Be the First!</h3>
              <p className="text-gray-600 mb-6 text-lg">Create the first personality quiz and inspire others</p>
              <Link href="/admin">
                <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg px-8 py-3 text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Quiz
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Your First Quiz?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are building engaging personality quizzes. 
            Start creating yours in just a few minutes.
          </p>
          <Link href="/admin">
            <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 shadow-xl px-10 py-4 text-xl font-bold group">
              <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
              Start Creating Now
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <p className="text-teal-200 mt-4 text-sm">
            No registration required • Free forever • Instant setup
          </p>
        </div>
      </section>
    </div>
  )
}
