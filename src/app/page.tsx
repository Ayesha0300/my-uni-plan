'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from 'react'

const TextGenerateEffect = ({ words }: { words: string }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      if (i < words.length) {
        setDisplayedText(words.substring(0, i + 1))
        i++
      } else {
        clearInterval(intervalId)
      }
    }, 100) // Adjust the speed of text generation here

    return () => clearInterval(intervalId)
  }, [words])

  return <span>{displayedText}</span>
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-4">
        <TextGenerateEffect words="Welcome to Our University" />
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Empowering minds, shaping futures. Join us in our pursuit of excellence in education and research.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/about">Learn More</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}