import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileFilterSearch = () => {
  const [formData, setFormData] = useState({
    location: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "" as string, // Updated to single string
  });

  const navigate = useNavigate();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (formData.location) params.append("location", formData.location);
    if (formData.minPrice) params.append("minPrice", formData.minPrice);
    if (formData.maxPrice) params.append("maxPrice", formData.maxPrice);
    if (formData.propertyType) params.append("propertyType", formData.propertyType);

    // Example navigation:
    navigate(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFormData({
      location: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      propertyType: "",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Find Your Dream Home</h1>
        <button
          className="flex items-center gap-2 md:ml-auto focus:outline-none"
          onClick={() => setIsFilterPanelOpen((prev) => !prev)}
        >
          <FilterIcon />
          <span>Filters</span>
        </button>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isFilterPanelOpen
            ? "max-h-[500px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <div className="grid gap-6">
            <div>
              <Label className="font-semibold">Location</Label>
              <Input
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bedrooms" className="block mb-2">
                Bedrooms
              </Label>
              <Select
                value={formData.bedrooms}
                onValueChange={(value) => handleFilterChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full border rounded-md p-2">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-semibold">Price Range</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={formData.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={formData.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label className="font-semibold">Property Type</Label>
              <div className="grid gap-2">
                {["apartment", "house", "condo", "land"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={type}
                      name="propertyType"
                      value={type}
                      checked={formData.propertyType === type}
                      onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                    />
                    <Label className="font-normal">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSearch;
