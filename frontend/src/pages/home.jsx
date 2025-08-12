'use client'

import { motion } from 'framer-motion'
import { Shield, MessageSquare, BarChart3, Eye, UserCheck, ClipboardList, TrendingUp, Mail, Phone, MapPin, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Inline Button Component
const Button = forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  }
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      className={combinedClassName}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

// Inline Card Components
const Card = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-white text-slate-900 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
))

const CardContent = forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
))

const features = [
  {
    icon: Shield,
    title: "Secure Login with RBAC",
    description: "Role-based access control for students, teachers, and admins with enterprise-grade security."
  },
  {
    icon: MessageSquare,
    title: "Quick Feedback Submission",
    description: "Simple, intuitive forms for students to submit feedback immediately after lessons."
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics Dashboard",
    description: "Comprehensive feedback analytics and insights for teachers and administrators."
  },
  {
    icon: Eye,
    title: "Privacy-Focused & Anonymous",
    description: "Optional anonymous feedback to encourage honest, constructive responses."
  }
]

const steps = [
  {
    number: "01",
    title: "Register & Login",
    description: "Create your account and log in based on your role (student, teacher, or admin).",
    icon: UserCheck
  },
  {
    number: "02",
    title: "Submit Feedback",
    description: "Students use easy-to-use forms to provide feedback after lessons.",
    icon: ClipboardList
  },
  {
    number: "03",
    title: "View Reports & Improve",
    description: "Teachers and admins access feedback reports to enhance teaching quality.",
    icon: TrendingUp
  }
]

export default function LandingPage() {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">EduFeedback</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <Button
              onClick={() => navigate('/login')}
              variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700">
                Login
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            >
              Empowering Education Through{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Student Feedback
              </span>
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto"
            >
              A secure, easy-to-use platform for collecting and analyzing teacher feedback.
              Transform your educational experience with meaningful insights.
            </motion.p>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg"
              >
                Get Started
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to collect, analyze, and act on student feedback effectively.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started in three simple steps and transform your educational feedback process.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Why Student Feedback Matters
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Student feedback is crucial for improving teaching quality and learning outcomes. 
                Our platform bridges the communication gap between students and educators, 
                creating a transparent environment for continuous improvement.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                With anonymous options and detailed analytics, we ensure honest feedback 
                while providing actionable insights that help teachers enhance their 
                teaching methods and create better learning experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                  Learn More
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Contact Us
                </Button>
              </div>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                    <div className="text-sm text-slate-600">Teacher Satisfaction</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">10k+</div>
                    <div className="text-sm text-slate-600">Active Students</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                    <div className="text-sm text-slate-600">Schools</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                    <div className="text-sm text-slate-600">Uptime</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduFeedback</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Empowering education through meaningful student feedback. 
                Building better learning experiences for everyone.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  Privacy Policy
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  Terms of Service
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">support@edufeedback.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-slate-300 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="block text-slate-300 hover:text-white transition-colors">How It Works</a>
                <a href="#about" className="block text-slate-300 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 EduFeedback. All rights reserved. Built with ❤️ for better education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
