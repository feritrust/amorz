import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export  function Combobox({
  value,
  onChange,
  onInputChange,
  placeholder = "Select an option",
  children,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.phoneNumber : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            onValueChange={onInputChange}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onSelect: () => {
                  console.log("Selected Coach:", child.props.value); // Debugging
                  onChange(child.props.value); // This updates selectedCoach
                  setOpen(false);
                },
              })
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Combobox.Option = function Option({ value, children, onSelect }) {
  return (
      <CommandItem
          
      onSelect={onSelect} // Debugging
      value={value}
    >
      {children}
    </CommandItem>
  );
};