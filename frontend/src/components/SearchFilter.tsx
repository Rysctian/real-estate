import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FormDescription } from "./ui/form";

export interface SearchFormData {
   city: string;
   minPrice: string;
   maxPrice: string;
   type: string;
   properties: string;
   bedroom: string;
   bathroom: string;
}

const SearchFilter = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();

   const [formData, setFormData] = useState<SearchFormData>({
      city: searchParams.get("city") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "10000000000",
      type: searchParams.get("type") || "",
      properties: searchParams.get("properties") || "",
      bedroom: searchParams.get("bedroom") || "",
      bathroom: searchParams.get("bathroom") || "",
   });

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleTypeChange = (value: string) => {
      setFormData((prev) => ({
         ...prev,
         type: value.trim() ? value : "",
      }));
   };

   const handlePropertiesChange = (value: string) => {
      setFormData((prev) => ({
         ...prev,
         properties: value.trim() ? value : "",
      }));
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (formData.city) params.set("city", formData.city);
      if (formData.minPrice) params.set("minPrice", formData.minPrice);
      if (formData.maxPrice) params.set("maxPrice", formData.maxPrice);
      if (formData.type) params.set("type", formData.type);
      if (formData.properties) params.set("properties", formData.properties);
      if (formData.bedroom) params.set("bedroom", formData.bedroom);
      if (formData.bathroom) params.set("bathroom", formData.bathroom);

      setSearchParams(params);
      navigate(`?${params.toString()}`);
   };

   return (
      <div className="bg-white flex flex-col rounded-lg shadow-sm p-4 md:p-6">
         <form
            className="flex justify-evenly flex-wrap items-center gap-4"
            onSubmit={handleSubmit}
         >
            <div className="item">
               <Label htmlFor="city">Location</Label>
               <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ex. Makati City"
                  value={formData.city}
                  onChange={handleInputChange}
               />
            </div>

            <div className="item">
               <Label htmlFor="type">Type</Label>
               <Select onValueChange={handleTypeChange} value={formData.type}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Buy/Rent" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value={" "}>any</SelectItem>
                     <SelectItem value="buy">Buy</SelectItem>
                     <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="item">
               <Label htmlFor="properties">Properties</Label>
               <Select
                  onValueChange={handlePropertiesChange}
                  value={formData.properties}
               >
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value={" "}>any</SelectItem>
                     <SelectItem value="condo">Condo</SelectItem>
                     <SelectItem value="apartment">Apartment</SelectItem>
                     <SelectItem value="house">House</SelectItem>
                     <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="flex gap-2">
               <div className="item">
                  <Label htmlFor="bedroom">Bedroom</Label>
                  <Input
                     min={0}
                     max={10}
                     className="w-48"
                     id="bedroom"
                     name="bedroom"
                     type="number"
                     placeholder="Number of Bedrooms"
                     value={formData.bedroom}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="item">
                  <Label htmlFor="bathroom">Bathroom</Label>
                  <Input
                     min={0}
                     max={10}
                     id="bathroom"
                     className="w-48"
                     name="bathroom"
                     type="number"
                     placeholder="Number of Bathrooms"
                     value={formData.bathroom}
                     onChange={handleInputChange}
                  />
               </div>
            </div>

            <div className="flex gap-3 items-center">
               <div className="item">
                  <Label htmlFor="minPrice">Min Price</Label>
                  <Input
                     id="minPrice"
                     name="minPrice"
                     type="number"
                     placeholder="Min Price"
                     value={formData.minPrice}
                     onChange={handleInputChange}
                  />
               </div>
               <span className="mt-4">-</span>
               <div className="item">
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <Input
                     id="maxPrice"
                     name="maxPrice"
                     type="number"
                     placeholder="Max Price"
                     value={formData.maxPrice}
                     onChange={handleInputChange}
                  />
               </div>
            </div>

            <Button type="submit" className="self-end">
               <Search />
            </Button>
         </form>
      </div>
   );
};

export default SearchFilter;
