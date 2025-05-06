
import type React from "react"

import { useState, useCallback } from "react"
import { FileSpreadsheet, Download, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
export interface Receptionist {
  id: number;
  name: string;
  email: string;
  phone: string;
  team: string;
  client: string;
  status: string;
}
interface BulkUploadProps {
  onBulkAdd: (data: Omit<Receptionist, "id">[]) => void
  onCancel: () => void
}

export function BulkUpload({ onBulkAdd, onCancel }: BulkUploadProps) {
  const [bulkData, setBulkData] = useState<Omit<Receptionist, "id">[]>([])
  const [showBulkPreview, setShowBulkPreview] = useState(false)

  // Handler for file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would parse the Excel file here
      // For this example, we'll simulate parsing with sample data
      const mockParsedData = [
        {
          name: "Mark Wilson",
          email: "mark.w@example.com",
          phone: "555-3456",
          team: "Support",
          client: "Tech Solutions",
          status: "Active",
        },
        {
          name: "Sarah Lee",
          email: "sarah.lee@example.com",
          phone: "555-7890",
          team: "Administrative",
          client: "ABC Corp",
          status: "Active",
        },
        {
          name: "Robert Brown",
          email: "robert.b@example.com",
          phone: "555-2345",
          team: "Front Desk",
          client: "XYZ Inc",
          status: "Inactive",
        },
      ]

      setBulkData(mockParsedData)
      setShowBulkPreview(true)
    }
  }, [])

  // Handler for downloading template
  const handleDownloadTemplate = useCallback(() => {
    const headers = ["Name", "Email", "Phone", "Team", "Client", "Status"]
    const csvContent = [
      headers.join(","),
      "John Doe,john.doe@example.com,555-1234,Front Desk,ABC Corp,Active",
      "Jane Smith,jane.smith@example.com,555-5678,Customer Service,XYZ Inc,Active",
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "receptionist_template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const handleSubmit = useCallback(() => {
    onBulkAdd(bulkData)
  }, [bulkData, onBulkAdd])

  return (
    <div className="space-y-4 py-4">
      {!showBulkPreview ? (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border border-dashed p-10 bg-slate-50">
          <FileSpreadsheet className="h-12 w-12 text-slate-400" />
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-slate-800">Upload Excel File</h3>
            <p className="text-sm text-slate-500">Upload an Excel file with receptionist details</p>
          </div>
          <div className="flex flex-col space-y-2 w-full max-w-md">
            <Label htmlFor="file-upload" className="sr-only">
              Choose file
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="cursor-pointer border-slate-300 hover:border-slate-400 transition-colors"
            />
            <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Preview Data</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBulkData([])
                setShowBulkPreview(false)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Phone</TableHead>
                  <TableHead className="font-medium">Team</TableHead>
                  <TableHead className="font-medium">Client</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bulkData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.team}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          item.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add {bulkData.length} Receptionists</Button>
          </div>
        </div>
      )}
    </div>
  )
}
