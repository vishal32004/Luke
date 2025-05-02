import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Filter, ShoppingBag, Tag } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  popularity: number;
  imageUrl: string;
}

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "priceLowToHigh" | "priceHighToLow" | "popularity";
}

interface CatalogSelection {
  selectionType: "category" | "products" | "priceRange";
  selectedCategories: string[];
  selectedProducts: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    category: "electronics",
    price: 1200,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1742568012~exp=1742571612~hmac=6d20e5bb59d50c502685f480643660188df0ef703ca09f50392f9fb43e7ff6c5&w=996",
  },
  {
    id: "2",
    name: "T-Shirt",
    category: "apparel",
    price: 20,
    popularity: 3,
    imageUrl:
      "https://img.freepik.com/free-vector/monocolor-midnight-madness-marathon-t-shirt-design_742173-5733.jpg?t=st=1742568042~exp=1742571642~hmac=d960d96b464fe9121bb9f7e10cb37e770dab0cbc2ace16d42104d05dc3dfe22e&w=740",
  },
  {
    id: "3",
    name: "Coffee",
    category: "food",
    price: 5,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_114579-174.jpg?t=st=1742568063~exp=1742571663~hmac=8cd62727de8dc3775fba07cc8469e104f361448bd9c5250e781868fd0c6d5fe8&w=740",
  },
  {
    id: "4",
    name: "Smartphone",
    category: "electronics",
    price: 800,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?t=st=1742565716~exp=1742569316~hmac=b3990d16fd131ee05c2416e8d86dc94514a25826544c2f064372f5484941b979&w=996",
  },
  {
    id: "5",
    name: "Jeans",
    category: "apparel",
    price: 50,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/she-has-great-street-style_329181-4716.jpg?t=st=1742568104~exp=1742571704~hmac=a1ea2a1009ea87f53b7b71a6a5a451bce8d6a603478cfe8e351da12db64c722f&w=740",
  },
  {
    id: "6",
    name: "Chocolate",
    category: "food",
    price: 10,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-psd/chocolate-shop-instagram-stories-template_23-2148669321.jpg?t=st=1742568139~exp=1742571739~hmac=d979e6e1a8036b1918a999aa7a8e9464b21d5cc208a94b4b5d128998deb3e9af&w=900",
  },
  {
    id: "7",
    name: "Headphones",
    category: "electronics",
    price: 150,
    popularity: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/black-headphones-digital-device_53876-97302.jpg?t=st=1742568162~exp=1742571762~hmac=b6cc92216cfaa23fb812f368490c2c716584490408d205f206432fd1f88f0875&w=740",
  },
  {
    id: "8",
    name: "Sneakers",
    category: "apparel",
    price: 90,
    popularity: 5,
    imageUrl:
      "https://img.freepik.com/premium-vector/cool-sneaker-with-orange-background_755096-85.jpg?w=740",
  },
];

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: <Filter className="h-4 w-4" />,
  },
  { id: "apparel", name: "Apparel", icon: <Tag className="h-4 w-4" /> },
  {
    id: "food",
    name: "Food & Beverages",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
];

interface ProductFilterProps {
  onFilter: (filters: Filters) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    minPrice: 0,
    maxPrice: 1500,
    sortBy: "priceLowToHigh",
  });

  const handleFilterChange = (name: keyof Filters, value: string | number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex items-center mb-4">
        <Filter className="mr-2 h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium">Filter Products</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="food">Food</SelectItem>
          </SelectContent>
        </Select>

        <div className="col-span-2 grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              handleFilterChange("minPrice", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              handleFilterChange("maxPrice", Number(e.target.value))
            }
          />
        </div>

        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            handleFilterChange("sortBy", value as Filters["sortBy"])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProducts,
  onProductSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => {
        const isSelected = selectedProducts.includes(product.id);
        return (
          <Card
            key={product.id}
            className={`hover:shadow-lg transition-all duration-300 ${
              isSelected ? "ring-2 ring-primary ring-offset-1" : ""
            }`}
          >
            <div className="relative">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <Badge className="absolute top-2 left-2">
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-xl font-bold text-primary mt-1">
                ${product.price}
              </p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button
                variant={isSelected ? "default" : "outline"}
                onClick={() => onProductSelect(product.id)}
                className="w-full"
              >
                {isSelected ? "Selected" : "Select Product"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

interface CategorySelectionProps {
  selectedCategories: string[];
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategories,
  onCategorySelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <Card
            key={category.id}
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isSelected ? "ring-2 ring-primary ring-offset-1" : ""
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
              {isSelected && (
                <div className="bg-primary text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

interface PriceRangeSelectionProps {
  priceRange: { min: number; max: number };
  onPriceRangeChange: (min: number, max: number) => void;
}

const PriceRangeSelection: React.FC<PriceRangeSelectionProps> = ({
  priceRange,
  onPriceRangeChange,
}) => {
  const handleSliderChange = (value: number[]) => {
    onPriceRangeChange(value[0], value[1]);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Select Price Range</h3>
        <div className="space-y-6">
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            max={1500}
            step={10}
            onValueChange={handleSliderChange}
            className="mb-6"
          />
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-sm text-gray-500">Min Price</p>
              <p className="text-lg font-bold">${priceRange.min}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Max Price</p>
              <p className="text-lg font-bold">${priceRange.max}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CatalogSection: React.FC<{
  onChange?: (data: string) => void;
}> = ({ onChange }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [catalogSelection, setCatalogSelection] = useState<CatalogSelection>({
    selectionType: "category",
    selectedCategories: [],
    selectedProducts: [],
    priceRange: {
      min: 0,
      max: 1500,
    },
  });

  const handleFilter = (filters: Filters) => {
    const { category, minPrice, maxPrice, sortBy } = filters;

    const filtered = products.filter((product) => {
      return (
        (category === "" ? true : product.category === category) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered);
  };

  // This function gets the selection summary and updates the parent form
  const getSelectionSummary = () => {
    const { selectionType, selectedCategories, selectedProducts, priceRange } =
      catalogSelection;

    if (selectionType === "category" && selectedCategories.length > 0) {
      return {
        type: "category",
        data: selectedCategories
          .map((catId) => categories.find((c) => c.id === catId)?.name)
          .filter(Boolean),
      };
    } else if (selectionType === "products" && selectedProducts.length > 0) {
      return {
        type: "products",
        data: selectedProducts
          .map((prodId) => products.find((p) => p.id === prodId))
          .filter(Boolean),
      };
    } else if (selectionType === "priceRange") {
      return {
        type: "priceRange",
        data: priceRange,
      };
    }

    return null;
  };

  // Update the parent form whenever the selection changes
  React.useEffect(() => {
    const summary = getSelectionSummary();
    if (summary && onChange) {
      onChange(JSON.stringify(summary));
    }
  }, [catalogSelection, onChange]);

  const handleProductSelect = (productId: string) => {
    setCatalogSelection((prev) => {
      const isSelected = prev.selectedProducts.includes(productId);
      return {
        ...prev,
        selectionType: "products",
        selectedProducts: isSelected
          ? prev.selectedProducts.filter((id) => id !== productId)
          : [...prev.selectedProducts, productId],
      };
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setCatalogSelection((prev) => {
      const isSelected = prev.selectedCategories.includes(categoryId);
      return {
        ...prev,
        selectionType: "category",
        selectedCategories: isSelected
          ? prev.selectedCategories.filter((id) => id !== categoryId)
          : [...prev.selectedCategories, categoryId],
      };
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setCatalogSelection((prev) => ({
      ...prev,
      selectionType: "priceRange",
      priceRange: { min, max },
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Reward Catalog</h2>

      <Tabs defaultValue="category" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="products">Specific Products</TabsTrigger>
          <TabsTrigger value="priceRange">Price Range</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-4">
          <p className="text-gray-600 mb-4">
            Allow recipients to spend their rewards on products from these
            categories:
          </p>
          <CategorySelection
            selectedCategories={catalogSelection.selectedCategories}
            onCategorySelect={handleCategorySelect}
          />

          {catalogSelection.selectedCategories.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Selected Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {catalogSelection.selectedCategories.map((catId) => (
                  <Badge
                    key={catId}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {categories.find((c) => c.id === catId)?.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <p className="text-gray-600 mb-4">
            Select specific products that recipients can choose from:
          </p>
          <ProductFilter onFilter={handleFilter} />
          <ProductList
            products={filteredProducts}
            selectedProducts={catalogSelection.selectedProducts}
            onProductSelect={handleProductSelect}
          />

          {catalogSelection.selectedProducts.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="font-medium mb-2">
                Selected Products ({catalogSelection.selectedProducts.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {catalogSelection.selectedProducts.map((prodId) => {
                  const product = products.find((p) => p.id === prodId);
                  return product ? (
                    <Badge
                      key={prodId}
                      variant="secondary"
                      className="text-sm py-1 px-3"
                    >
                      {product.name} (${product.price})
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="priceRange" className="space-y-4">
          <p className="text-gray-600 mb-4">
            Set a price range that recipients can spend their rewards within:
          </p>
          <PriceRangeSelection
            priceRange={catalogSelection.priceRange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Selected Price Range:</h3>
            <p className="text-lg font-semibold">
              ${catalogSelection.priceRange.min} - $
              {catalogSelection.priceRange.max}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
