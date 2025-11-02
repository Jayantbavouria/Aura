import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
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
import { CommandResponsiveDialog } from "@/components/ui/command"; 

interface Props {
  options: Array<{ id: string; value: string; children: ReactNode }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  isSearchable = true,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>

      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "justify-between h-9 font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption ? selectedOption.children : placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>

      <CommandResponsiveDialog shouldFilter={!onSearch} open={open} onOpenChange={setOpen}>
        <Command>
          {isSearchable && (
            <CommandInput
              placeholder="Search..."
              onValueChange={(v: string) => {
                // Explicitly call onSearch if provided. This avoids passing
                // an undefined handler directly to the underlying cmdk input.
                onSearch?.(v);
              }}
            />
          )}
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">
                No results found.
              </span>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}
                >
                  {option.children}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandResponsiveDialog>
    </>
  );
};
