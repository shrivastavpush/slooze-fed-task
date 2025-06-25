import React from 'react'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from "../components/ui/table";
import { Button } from "../components/ui/button";

const ProductTable = ({ products, loading, handleEdit, handleDelete, paginated }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3">Product Name</TableHead>
                    <TableHead className="w-1/4">Pricing</TableHead>
                    <TableHead className="w-1/4">Category</TableHead>
                    <TableHead className="w-1/3">Manage</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            Loading...
                        </TableCell>
                    </TableRow>
                ) : paginated.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No products found.
                        </TableCell>
                    </TableRow>
                ) : paginated.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/40 transition cursor-pointer">
                        <TableCell className="w-1/3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={p.image}
                                    alt="Product"
                                    className="w-9 h-9 rounded object-cover bg-muted border"
                                />
                                <span className="truncate font-medium">{p.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="w-1/4">${p.price.toFixed(2)}</TableCell>
                        <TableCell className="w-1/4">{p.category}</TableCell>
                        <TableCell className="w-1/3">
                            <div className="flex gap-2 flex-wrap">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(p)}>
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ProductTable