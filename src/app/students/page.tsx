'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Student = {
  id: number
  name: string
  email: string
  rollNumber: string
  mobileNumber: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Doe", email: "john@example.com", rollNumber: "A001", mobileNumber: "+1234567890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", rollNumber: "A002", mobileNumber: "+1987654321" },
  ])

  const [newStudent, setNewStudent] = useState({ name: '', email: '', rollNumber: '', mobileNumber: '' })

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault()
    setStudents([...students, { id: students.length + 1, ...newStudent }])
    setNewStudent({ name: '', email: '', rollNumber: '', mobileNumber: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Data</h1>
      <form onSubmit={addStudent} className="space-y-4">
        <Input 
          placeholder="Name" 
          value={newStudent.name} 
          onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
        />
        <Input 
          placeholder="Email" 
          type="email"
          value={newStudent.email} 
          onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} 
        />
        <Input 
          placeholder="Roll Number" 
          value={newStudent.rollNumber} 
          onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})} 
        />
        <Input 
          placeholder="Mobile Number" 
          type="tel"
          value={newStudent.mobileNumber} 
          onChange={(e) => setNewStudent({...newStudent, mobileNumber: e.target.value})} 
        />
        <Button type="submit">Add Student</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Mobile Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell>{student.mobileNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}