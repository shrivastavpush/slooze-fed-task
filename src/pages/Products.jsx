import React, { useState, useEffect } from "react";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";
import ProductModal from "../components/ProductModal";
import ProductTable from "../components/ProductTable";
import PaginationBar from "../components/Pagination";
import CategoryTable from "../components/CategoryTable";

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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const perPage = 8;
  const paginated = products.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.ceil(products.length / perPage);

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
      setLoading(false);
      toast({
        title: "Deleted",
        description: `Product "${product.name}" deleted.`,
      });
    });
  };

  const handleExpand = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

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
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 flex items-center justify-center"
              onClick={() => setGroupByCategory(!groupByCategory)}
            >
              {groupByCategory ? <ToggleLeft size={16} /> : <ToggleRight size={16} className="text-red-500" />}
              <span className="text-sm font-medium">
                {groupByCategory ? "Show by Category" : "Show by Product"}
              </span>
            </Button>
          </div>
        </div>

        {/* Table */}

        <div className="bg-card rounded-lg shadow border overflow-x-auto">
          {groupByCategory
            ? (
              <ProductTable
                products={products}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                paginated={paginated}
              />
            ) : (
              <CategoryTable
                products={products}
                loading={loading}
                handleExpand={handleExpand}
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
        </div>

        <PaginationBar
          products={products}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          paginated={paginated}
          page={page}
          setPage={setPage}
          perPage={perPage}
          pageCount={pageCount}
        />
      </div>

      {/* Modal for product add/edit */}
      <ProductModal
        isOpen={modalOpen}
        initial={edit}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
