import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import supabase  from '@/utils/supabase/client'
import * as XLSX from 'xlsx'

interface BulkUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onProductsUploaded: () => void
}

export function BulkUploadModal({ isOpen, onClose, onProductsUploaded }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleDownloadSample = () => {
    const sampleData = [
      { name: 'Sample Product 1', price: 10.99, inStock: true },
      { name: 'Sample Product 2', price: 15.99, inStock: false },
    ]
    const ws = XLSX.utils.json_to_sheet(sampleData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')
    XLSX.writeFile(wb, 'sample_products.xlsx')
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const products = XLSX.utils.sheet_to_json(sheet)

      try {
        const {  error } = await supabase
          .from('products')
          .insert(products)

        if (error) throw error

        toast({
          title: "Success",
          description: `${products.length} products have been added to the inventory.`,
        })
        onProductsUploaded()
        onClose()
      } catch (error) {
        console.error('Error uploading products:', error)
        toast({
          title: "Error",
          description: "Failed to upload products. Please try again.",
          variant: "destructive",
        })
      }
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bulk Upload Products</DialogTitle>
          <DialogDescription>
            Upload an Excel file with product details or download a sample file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handleDownloadSample}>Download Sample File</Button>
          <Input
            id="picture"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

