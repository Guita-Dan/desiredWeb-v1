'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from "@/src/lib/supabase/client";
import { Edit2, MoreHorizontal, Save, X } from 'lucide-react'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu'
import { Input } from '@/src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { TableCell, TableRow } from '@/src/components/ui/table'

import { Product } from '@/src/lib/types'
import { Toast } from '@radix-ui/react-toast'


interface EditableProductRowProps {
    product: Product
    onUpdate: (updatedProduct: Product) => void
}

export function EditableProductRow({ product, onUpdate }: EditableProductRowProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedProduct, setEditedProduct] = useState(product)
    const supabase = createClient()

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .update(editedProduct)
                .eq('id', editedProduct.id)
                .select()

            if (error) throw error

            onUpdate(editedProduct)
            setIsEditing(false)


        } catch (error) {
            console.error('Error updating product:', error)

        }
    }

    const handleCancel = () => {
        setEditedProduct(product)
        setIsEditing(false)
    }

    const handleChange = (field: keyof Product, value: string | number) => {
        setEditedProduct((prev) => ({ ...prev, [field]: value }))
    }

    
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                {product.image && (
                    <Image
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        src={product.image || '/placeholder.svg'}
                        alt="Product image"
                        width={64}
                    />
                )}
            </TableCell>
            <TableCell className="font-medium">
                {isEditing ? (
                    <Input
                        value={editedProduct.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                ) : (
                    product.name
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Select
                        value={editedProduct.status}
                        onValueChange={(value) => handleChange('status', value)}
                    >
                        <SelectTrigger>
                            <SelectValue>{editedProduct.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="In Stock">In Stock</SelectItem>
                            <SelectItem value="Low Stock">Low Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <Badge variant="outline">{product.status}</Badge>
                )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {isEditing ? (
                    <Input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                    />
                ) : (
                    product.price
                )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {isEditing ? (
                    <Input
                        type="number"
                        value={editedProduct.quantity}
                        onChange={(e) => handleChange('quantity', parseInt(e.target.value, 10))}
                    />
                ) : (
                    product.quantity
                )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(product.timestamp).toLocaleDateString('en-EN')}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                        </Button>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={handleEdit}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdate({ ...product, status: 'Archived' })}>
                                Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </TableCell>
        </TableRow>
    )
}