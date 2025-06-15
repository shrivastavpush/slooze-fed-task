import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, } from "@/components/ui/pagination";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Download, Filter } from "lucide-react";
import ProductModal from "../components/ProductModal";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const LOCAL_KEY = "products";

function apiGetProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(LOCAL_KEY);
      if (stored) {
        try {
          resolve(JSON.parse(stored));
        } catch (e) {
          resolve([]);
        }
      } else {
        // No demo fallback, just empty list
        localStorage.setItem(LOCAL_KEY, JSON.stringify([]));
        resolve([]);
      }
    }, 500);
  });
}

function apiSaveProduct(prod) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(LOCAL_KEY);
      let products = [];
      if (stored) {
        try {
          products = JSON.parse(stored);
        } catch {
          products = [];
        }
      }
      let updated;
      if (prod.id) {
        // Edit mode
        updated = products.map((p) => (p.id === prod.id ? prod : p));
      } else {
        // Add mode; generate new id as max existing + 1 or timestamp fallback
        const maxId = products.reduce((m, p) => (p.id > m ? p.id : m), 0);
        updated = [...products, { ...prod, id: maxId + 1 }];
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      resolve(updated);
    }, 500);
  });
}

function apiDeleteProduct(prodId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(LOCAL_KEY);
      let products = [];
      if (stored) {
        try {
          products = JSON.parse(stored);
        } catch {
          products = [];
        }
      }
      const updated = products.filter((p) => p.id !== prodId);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      resolve(updated);
    }, 500);
  });
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("published");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch products from "API" (local storage) on mount
  useEffect(() => {
    setLoading(true);
    apiGetProducts().then(prods => {
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const handleEdit = (p) => {
    setEdit(p);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEdit(null);
    setModalOpen(true);
  };

  const handleSave = (p) => {
    setLoading(true);
    apiSaveProduct(p).then(updProducts => {
      setProducts(updProducts);
      setModalOpen(false);
      setLoading(false);
      toast({
        title: "Saved",
        description: `Product "${p.name}" saved successfully.`,
      });
    });
  };

  const handleDelete = (product) => {
    setLoading(true);
    apiDeleteProduct(product.id).then(updated => {
      setProducts(updated);
      setSelected(selected => selected.filter(id => id !== product.id));
      setLoading(false);
      toast({
        title: "Deleted",
        description: `Product "${product.name}" deleted.`,
      });
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) setSelected(products.map((p) => p.id));
    else setSelected([]);
  };
  const handleSelectRow = (id, checked) => {
    setSelected((sel) =>
      checked ? [...sel, id] : sel.filter((val) => val !== id)
    );
  };

  // For demo, assume 8 items per page
  const perPage = 8;
  const paginated = products.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.ceil(products.length / perPage);

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 px-2 sm:px-4 pb-24">
      {/* Main Area */}
      <div className="w-full md:flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-y-3 gap-x-4 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Product</h1>
          <Button
            onClick={handleAdd}
            className="w-full sm:w-auto"
            variant="default"
          >
            + Add New Product
          </Button>
        </div>

        {/* Tabs and Filter bar */}
        <div className="bg-card rounded-lg p-0 border flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5">
          <div className="flex items-center gap-1 sm:gap-6 pl-3 pt-2 sm:pt-0">
            <button
              className={`px-2 py-4 font-medium text-base sm:text-lg border-b-2 transition ${currentTab === "published"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-primary"
                }`}
              onClick={() => setCurrentTab("published")}
            >
              Published
            </button>
            <button
              className={`px-2 py-4 font-medium text-base sm:text-lg border-b-2 transition ${currentTab === "draft"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-primary"
                }`}
              onClick={() => setCurrentTab("draft")}
            >
              Draft
            </button>
          </div>
          <div className="flex items-center gap-2 pr-3 pb-2 sm:pb-0 pt-1 sm:pt-0">
            <Button variant="ghost" size="sm" className="gap-1">
              <Filter size={16} /> Filter
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Download size={16} /> Download
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="bg-card rounded-lg shadow border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 min-w-[40px]">
                  <input
                    type="checkbox"
                    checked={selected.length > 0 && selected.length === paginated.length}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                </TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="hidden sm:table-cell">Views</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead className="hidden md:table-cell">Revenue</TableHead>
                <TableHead>Manage</TableHead>
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
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={e => handleSelectRow(p.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt="Product"
                        className="w-9 h-9 rounded object-cover bg-muted border"
                      />
                      <span className="truncate font-medium">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{p.views.toLocaleString()}</TableCell>
                  <TableCell>${p.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">${p.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(p)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
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
      </div>

      {/* Modal for product add/edit */}
      {modalOpen && (
        <ProductModal
          initial={edit}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
