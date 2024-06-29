// import React, { useState } from "react";

// interface Props {
//   formFieldName: string;
//   options: string[];
// }

// function MultiSelectDropdown({ formFieldName, options }: Props) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = event.target;

//     setSelectedOptions((prevSelectedOptions) => {
//       if (checked) {
//         return [...prevSelectedOptions, value];
//       } else {
//         return prevSelectedOptions.filter((option) => option !== value);
//       }
//     });
//   };

//   return (
//     <div className="relative inline-block w-64">
//       <button
//         type="button"
//         onClick={toggleDropdown}
//         className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {selectedOptions.length > 0
//           ? selectedOptions.join(", ")
//           : "Select Amenities"}
//         <svg
//           className="w-5 h-5 ml-2 -mr-1 text-gray-400 inline-block"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 3a1 1 0 01.832.445l4.5 6a1 1 0 01-.832 1.555H5.5a1 1 0 01-.832-1.555l4.5-6A1 1 0 0110 3zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//           <ul className="max-h-56 overflow-auto">
//             {options.map((option) => (
//               <li key={option} className="p-2">
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name={formFieldName}
//                     value={option}
//                     checked={selectedOptions.includes(option)}
//                     onChange={handleCheckboxChange}
//                     className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
//                   />
//                   <span className="ml-2 text-gray-700">{option}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MultiSelectDropdown;
