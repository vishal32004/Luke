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

// Define product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  popularity: number;
  imageUrl: string;
}

// Define filter type
interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "priceLowToHigh" | "priceHighToLow" | "popularity";
}

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    category: "electronics",
    price: 1200,
    popularity: 5,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "T-Shirt",
    category: "apparel",
    price: 20,
    popularity: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Coffee",
    category: "food",
    price: 5,
    popularity: 4,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Smartphone",
    category: "electronics",
    price: 800,
    popularity: 5,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Jeans",
    category: "apparel",
    price: 50,
    popularity: 4,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Chocolate",
    category: "food",
    price: 10,
    popularity: 4,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Headphones",
    category: "electronics",
    price: 150,
    popularity: 4,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Sneakers",
    category: "apparel",
    price: 90,
    popularity: 5,
    imageUrl: "https://via.placeholder.com/150",
  },
];

// Props for ProductFilter component
interface ProductFilterProps {
  onFilter: (filters: Filters) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
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
    <div className="space-y-4">
      <Select
        value={filters.category}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="apparel">Apparel</SelectItem>
          <SelectItem value="food">Food</SelectItem>
        </SelectContent>
      </Select>

      {/* Price Range Filter */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Sort By Filter */}
      <Select
        value={filters.sortBy}
        onValueChange={(value) =>
          handleFilterChange("sortBy", value as Filters["sortBy"])
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
          <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
        </SelectContent>
      </Select>

      {/* Apply Filters Button */}
      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
};

// Props for ProductList component
interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-lg font-bold text-gray-800">${product.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button variant="outline">Add to Cart</Button>
            <Button>Buy Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const CatalogSection: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFilter = (filters: Filters) => {
    const { category, minPrice, maxPrice, sortBy } = filters;

    // Filter products
    const filtered = products.filter((product) => {
      return (
        (category ? product.category === category : true) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    // Sort products
    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Catalog</h2>
      <ProductFilter onFilter={handleFilter} />
      <ProductList products={filteredProducts} />
    </div>
  );
};
