import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Link } from "react-router-dom";


type PropertyNavProps = {
  value: string;
  link: string;
  icon: React.ReactNode;
};

const propertyNavOptions: PropertyNavProps[] = [
  {
    value: "List Property",
    link: "/add-property",
    icon: <Plus size={15} />,
  },
  {
    value: "Saved Property",
    link: "/saved",
    icon: <Plus size={15} />,
  },
  {
    value: "Booked Property",
    link: "/booked",
    icon: <Plus size={15} />,
  },
];

export function PropertyNav() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const currentProperty = propertyNavOptions.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between "

        >
          {currentProperty ? currentProperty.value : "Select property..."}
          <ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {propertyNavOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Link to={option.link} className="flex items-center gap-2">
                    <p
                      className={cn( 
                        "flex items-center gap-2", 
                        value === option.value ? "font-bold" : "font-normal"
                      )}
                    >
                      <p>{option.icon} </p>
                      <p>{option.value}</p>
                    </p>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
