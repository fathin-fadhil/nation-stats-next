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

type Nation = { id: string; code: string; name: string; slug: string };

export function NationsDropdown({
  allNations,
  onSet,
  initialValue = "",
  size = "normal",
  disabled = false,
}: {
  allNations: Nation[];
  onSet?: (code: string) => void;
  initialValue?: string;
  size?: "normal" | "big";
  disabled?: boolean;
}) {
  const init =
    allNations.find((nations) => nations.code === initialValue) || null;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Nation | null>(init);

  React.useEffect(() => {
    onSet && onSet(value?.code ? value.code : "");
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${sizeSet[size]} justify-between`}
        >
          {value
            ? allNations.find((nations) => nations.code === value.code)?.name
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
                  key={nation.id}
                  value={nation.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value?.name ? null : nation);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.code === nation.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex items-center">
                    <img
                      src={` https://flagcdn.com/w20/${nation.code}.png `}
                      width={20}
                      className="h-fit"
                    ></img>
                  </div>
                  {nation.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
