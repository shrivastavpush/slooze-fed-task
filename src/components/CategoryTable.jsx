import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const CategoryTable = ({ products, loading, handleExpand, expandedCategories, setExpandedCategories, handleEdit, handleDelete }) => {
	// Group products by category
	const categories = React.useMemo(() =>
		products.reduce((acc, product) => {
			const category = product.category || 'Uncategorized';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(product);
			return acc;
		}, {})
		, [products]);

	const totalCategories = Object.keys(categories).length;
	const totalItems = products.length;

	return (
		<div className="p-4">
			{loading ? (
				<div className="text-center text-muted-foreground py-8">
					Loading...
				</div>
			) : products.length === 0 ? (
				<div className="text-center text-muted-foreground py-8">
					No products found.
				</div>
			) : (
				<div className="space-y-4">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold">Categories</h2>
						<div className="text-sm text-muted-foreground">
							{totalCategories} {totalCategories === 1 ? 'category' : 'categories'} • {totalItems} total items
						</div>
					</div>

					{/* Categories List */}
					<div
						type="multiple"
						value={expandedCategories}
						onValueChange={setExpandedCategories}
						className="space-y-2"
					>
						{Object.entries(categories).map(([category, categoryProducts]) => (
							<div key={category} className="border-b">
								<div className="border-b bg-muted/20 px-4 py-3">
									<div
										className="flex items-center justify-between cursor-pointer transition-color"
										onClick={(e) => {
											e.stopPropagation();
											handleExpand(category)
										}}
									>
										<h3 className="text-lg font-semibold">{category}</h3>
										<div className="flex items-center gap-3">
											<span className="text-sm bg-background rounded-full px-3 py-1 font-medium">
												{categoryProducts.length} {categoryProducts.length === 1 ? 'Item' : 'Items'}
											</span>
											{expandedCategories.includes(category) ? (
												<ChevronUp size={20} />
											) : (
												<ChevronDown size={20} />
											)}
										</div>
									</div>
								</div>
								{expandedCategories.includes(category) && (
									<div className="p-4">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="w-1/3">Product</TableHead>
													<TableHead className="w-1/4">Price</TableHead>
													<TableHead className="w-1/4">Stock</TableHead>
													<TableHead className="w-1/3">Actions</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{categoryProducts.map((product) => (
													<TableRow key={product.id} className="hover:bg-muted/40">
														<TableCell className="font-medium flex items-center gap-2">
															<img
																src={product.image}
																alt={product.name}
																className="w-10 h-10 rounded-md object-cover"
															/>
															{product.name}
														</TableCell>
														<TableCell>${product.price.toFixed(2)}</TableCell>
														<TableCell>{product.stock}</TableCell>
														<TableCell>
															<div className="flex gap-2">
																<Button
																	size="sm"
																	variant="outline"
																	onClick={(e) => {
																		e.stopPropagation();
																		handleEdit(product);
																	}}
																>
																	Edit
																</Button>
																<Button
																	size="sm"
																	variant="destructive"
																	onClick={(e) => {
																		e.stopPropagation();
																		handleDelete(product);
																	}}
																>
																	Delete
																</Button>
															</div>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default React.memo(CategoryTable);