'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type SubjectDetail = {
  name: string
  description: string
  countries: string[]
  popularCourses: string[]
}

const subjectDatabase: SubjectDetail[] = [
  {
    name: "Computer Science",
    description: "The study of computation, information processing, and the design of computer systems.",
    countries: ["United States", "United Kingdom", "Germany", "Japan", "India"],
    popularCourses: ["Artificial Intelligence", "Data Structures", "Web Development", "Cybersecurity"]
  },
  {
    name: "Medicine",
    description: "The science and practice of diagnosing, treating, and preventing disease, illness, injury, and other physical and mental impairments in human beings.",
    countries: ["United States", "United Kingdom", "Australia", "Canada", "Switzerland"],
    popularCourses: ["Anatomy", "Pharmacology", "Surgery", "Public Health"]
  },
  {
    name: "Business Administration",
    description: "The study of managing a business, including operations, finance, marketing, and human resources.",
    countries: ["United States", "France", "Singapore", "Canada", "Netherlands"],
    popularCourses: ["Marketing Management", "Financial Accounting", "Organizational Behavior", "Strategic Management"]
  },
  {
    name: "Environmental Science",
    description: "The interdisciplinary study of the environment and solutions to environmental problems.",
    countries: ["Sweden", "Australia", "Netherlands", "Canada", "Germany"],
    popularCourses: ["Climate Change", "Sustainable Development", "Ecology", "Environmental Policy"]
  }
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant for worldwide subject details. What subject would you like to know about?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    // Generate AI response
    const aiResponse = generateResponse(input)
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: aiResponse }])
    }, 1000)
  }

  const generateResponse = (query: string): string => {
    const subject = subjectDatabase.find(s => s.name.toLowerCase().includes(query.toLowerCase()))
    if (subject) {
      return `
        ${subject.name} is ${subject.description}
        
        Popular countries for studying ${subject.name}:
        ${subject.countries.join(', ')}
        
        Some popular courses in ${subject.name} include:
        ${subject.popularCourses.join(', ')}
        
        Is there anything specific about ${subject.name} you'd like to know?
      `
    } else {
      return `I'm sorry, I don't have detailed information about "${query}". Can you try asking about Computer Science, Medicine, Business Administration, or Environmental Science?`
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-4"> Subject Assistant</h1>
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'assistant' ? 'text-blue-600' : 'text-green-600'}`}>
            <strong>{message.role === 'assistant' ? 'AI: ' : 'You: '}</strong>
            {message.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a subject..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}