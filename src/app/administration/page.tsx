'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Admin = {
  id: number
  name: string
  email: string
  role: string
  mobileNumber: string
}

export default function Administration() {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: "Sarah Brown", email: "sarah@university.edu", role: "Dean", mobileNumber: "+1999888777" },
    { id: 2, name: "Michael Lee", email: "michael@university.edu", role: "Registrar", mobileNumber: "+1444333222" },
  ])

  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: '', mobileNumber: '' })

  const addAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    setAdmins([...admins, { id: admins.length + 1, ...newAdmin }])
    setNewAdmin({ name: '', email: '', role: '', mobileNumber: '' })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Administration Data</h1>
      <form onSubmit={addAdmin} className="mb-8 space-y-4">
        <Input 
          placeholder="Name" 
          value={newAdmin.name} 
          onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} 
        />
        <Input 
          placeholder="Email" 
          value={newAdmin.email} 
          onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})} 
        />
        <Input 
          placeholder="Role" 
          value={newAdmin.role} 
          onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})} 
        />
        <Input 
          placeholder="Mobile Number" 
          value={newAdmin.mobileNumber} 
          onChange={(e) => setNewAdmin({...newAdmin, mobileNumber: e.target.value})} 
        />
        <Button type="submit">Add Administrator</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Mobile Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>{admin.mobileNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}