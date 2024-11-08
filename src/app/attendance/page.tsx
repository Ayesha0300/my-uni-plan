'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

type AttendanceRecord = {
  id: number
  studentName: string
  date: string
  present: boolean
}

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { id: 1, studentName: "John Doe", date: "2023-06-01", present: true },
    { id: 2, studentName: "Jane Smith", date: "2023-06-01", present: false },
  ])

  const [newRecord, setNewRecord] = useState({ studentName: '', date: '', present: false })

  const addRecord = (e: React.FormEvent) => {
    e.preventDefault()
    setRecords([...records, { id: records.length + 1, ...newRecord }])
    setNewRecord({ studentName: '', date: '', present: false })
  }

  const toggleAttendance = (id: number) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, present: !record.present } : record
    ))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      <form onSubmit={addRecord} className="mb-8 space-y-4">
        <Input 
          placeholder="Student Name" 
          value={newRecord.studentName} 
          onChange={(e) => setNewRecord({...newRecord, studentName: e.target.value})} 
        />
        <Input 
          type="date" 
          value={newRecord.date} 
          onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} 
        />
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="present" 
            checked={newRecord.present} 
            onCheckedChange={(checked) => setNewRecord({...newRecord, present: checked as boolean})} 
          />
          <label htmlFor="present">Present</label>
        </div>
        <Button type="submit">Add Record</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Present</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.studentName}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>
                <Checkbox 
                  checked={record.present} 
                  onCheckedChange={() => toggleAttendance(record.id)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}