"use client"

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string;
  name: string;
  price: number;
}
const PRODUCT_PRICES= {
    "Switch - M/H": 200,
    "Switch - U/H": 300,
    "Switch - B/H": 400,
    "Switch - O/V": 600,
    "Switch - 25 Amp": 100,
    "Switch - 32 Amp": 500,
  };
  
  

const INITIAL_PRODUCTS: Product[] = Object.entries(PRODUCT_PRICES).map(([name, price]) => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  price,
}));

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      setProducts([...products, { ...newProduct, id: Math.random().toString(36).substr(2, 9) }]);
      setNewProduct({ name: '', price: 0 });
      setIsDialogOpen(false);
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added to the inventory.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid product name and price.",
        variant: "destructive",
      })
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct && editingProduct.name && editingProduct.price > 0) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      setIsDialogOpen(false);
      toast({
        title: "Product Updated",
        description: `${editingProduct.name} has been updated.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid product name and price.",
        variant: "destructive",
      })
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "The product has been removed from the inventory.",
    })
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Inventory</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, name: e.target.value})
                      : setNewProduct({...newProduct, name: e.target.value})
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => {
                      const price = parseFloat(e.target.value);
                      editingProduct 
                        ? setEditingProduct({...editingProduct, price})
                        : setNewProduct({...newProduct, price});
                    }}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingProduct(product);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

