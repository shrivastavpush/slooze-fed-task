import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, } from "../components/ui/pagination";

const PaginationBar = ({ products, loading, handleEdit, handleDelete, paginated, page, setPage, perPage, pageCount }) => {
    return (
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm">
                Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, products.length)} of {products.length} products
            </span>
            <Pagination>
                <PaginationContent>
                    {Array.from({ length: pageCount }, (_, idx) => (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                isActive={page === idx + 1}
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    setPage(idx + 1);
                                }}
                            >
                                {idx + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationBar