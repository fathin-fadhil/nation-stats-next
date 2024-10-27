"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const sizeSet = {
  normal: "w-64",
  big: "w-62 md:w-96",
};

export function NationsDropdown({
  allNations,
  onSet,
  initialValue = "",
  size = "normal",
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
  onSet?: (code: string) => void;
  initialValue?: string;
  size?: "normal" | "big";
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    onSet && onSet(value ? value : "");
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${sizeSet[size]} justify-between`}
        >
          {value
            ? allNations.find((nations) => nations.code === value)?.name
            : "Pilih Negara"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${sizeSet[size]} p-0`}>
        <Command>
          <CommandInput placeholder="Cari Negara..." />
          <CommandList>
            <CommandEmpty>Negara Tidak Ditemukan</CommandEmpty>
            <CommandGroup>
              {allNations.map((nation) => (
                <CommandItem
                  key={nation.code}
                  value={nation.code}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === nation.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="flex gap-2">
                    <div className="flex items-center">
                      <img
                        src={` https://flagcdn.com/w20/${nation.code}.png `}
                        width={20}
                        className="h-fit"
                      ></img>
                    </div>
                    {nation.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
