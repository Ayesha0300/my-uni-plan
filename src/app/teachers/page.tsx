'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Teacher = {
  id: number
  name: string
  email: string
  department: string
  mobileNumber: string
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: "Dr. Alice Johnson", email: "alice@university.edu", department: "Computer Science", mobileNumber: "+1122334455" },
    { id: 2, name: "Prof. Bob Williams", email: "bob@university.edu", department: "Mathematics", mobileNumber: "+1555666777" },
  ])

  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', department: '', mobileNumber: '' })

  const addTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }])
    setNewTeacher({ name: '', email: '', department: '', mobileNumber: '' })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Teacher Data</h1>
      <form onSubmit={addTeacher} className="mb-8 space-y-4">
        <Input 
          placeholder="Name" 
          value={newTeacher.name} 
          onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})} 
        />
        <Input 
          placeholder="Email" 
          value={newTeacher.email} 
          onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})} 
        />
        <Input 
          placeholder="Department" 
          value={newTeacher.department} 
          onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})} 
        />
        <Input 
          placeholder="Mobile Number" 
          value={newTeacher.mobileNumber} 
          onChange={(e) => setNewTeacher({...newTeacher, mobileNumber: e.target.value})} 
        />
        <Button type="submit">Add Teacher</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Mobile Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.department}</TableCell>
              <TableCell>{teacher.mobileNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}