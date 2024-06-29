import React, { useState } from "react";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import { Container } from "lucide-react";
import CategoryItem from "./category-item";

export const categoryList = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in an arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  // const searchModal = useSearchModal();
  const [category, setCategory] = useState("");

  // const _setCategory = (_category: string) => {
  //   setCategory(_category);

  //   const query: SearchQuery = {
  //     country: searchModal.query.country,
  //     checkIn: searchModal.query.checkIn,
  //     checkOut: searchModal.query.checkOut,
  //     guests: searchModal.query.guests,
  //     bedrooms: searchModal.query.bedrooms,
  //     bathrooms: searchModal.query.bathrooms,
  //     category: _category,
  //   };

  //   searchModal.setQuery(query);
  // };

  return (
    <div className="w-full items-center justify-center border px-4">
      <div className=" py-5 cursor-pointer flex justify-between items-center space-x-12 overflow-x-hidden">
        {categoryList.map((category, index) => (
          <div
            key={index}
            onClick={() => setCategory(category.label.toLowerCase())}
          >
            <CategoryItem
              key={index}
              label={category.label}
              icon={category.icon}
              description={category.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
