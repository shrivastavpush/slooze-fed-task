import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const ProductModal = ({ initial, onClose, onSave, isOpen = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        stock: 0,
        price: 0,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initial) {
            setFormData({
                name: initial.name || '',
                category: initial.category || '',
                stock: initial.stock || 0,
                price: initial.price || 0,
            });
        } else {
            setFormData({
                name: '',
                category: '',
                stock: 0,
                price: 0,
            });
        }
        setErrors({});
    }, [initial, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock' || name === 'price' ? Number(value) : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
        if (formData.price < 0) newErrors.price = 'Price cannot be negative';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        onSave({
            id: initial?.id,
            ...formData,
            views: initial?.views || 0,
            revenue: initial?.revenue || 0,
            image: initial?.image || `https://www.dummyimg.in/placeholder?text=${encodeURIComponent(formData.name)}&width=200&height=200&bg_color=black&text_color=white&font_size=20`
        });
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-card p-4 md:p-8 rounded-lg w-full max-w-md shadow-lg flex flex-col gap-5 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg md:text-2xl font-bold">{initial ? "Edit" : "Add"} Product</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-destructive text-2xl"
                        title="Close"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="grid gap-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name {errors.name && <span className="text-red-500 text-xs">({errors.name})</span>}
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={`w-full border px-3 py-2 rounded outline-none focus:ring-2 ${
                                errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-primary border-input'
                            }`}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Category
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            className="w-full border border-input px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label htmlFor="stock" className="block text-sm font-medium mb-1">
                                Stock {errors.stock && <span className="text-red-500 text-xs">({errors.stock})</span>}
                            </label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                className={`w-full border px-3 py-2 rounded outline-none focus:ring-2 ${
                                    errors.stock ? 'border-red-500 focus:ring-red-200' : 'focus:ring-primary border-input'
                                }`}
                                value={formData.stock}
                                min={0}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="price" className="block text-sm font-medium mb-1">
                                Price ($) {errors.price && <span className="text-red-500 text-xs">({errors.price})</span>}
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                className={`w-full border px-3 py-2 rounded outline-none focus:ring-2 ${
                                    errors.price ? 'border-red-500 focus:ring-red-200' : 'focus:ring-primary border-input'
                                }`}
                                value={formData.price}
                                min={0}
                                step={0.01}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 justify-end pt-3">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="default">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductModal