"use client"

import { cityNames } from "./utils";
import * as React from "react";
import { Check, ChevronsUpDown  } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LocationSelector({ currentCityId, setCurrentCityId, onUpdate}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pilih Lokasi</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-islamic-500 
              text-islamic-700 hover:bg-islamic-50 focus:ring-2 focus:ring-islamic-500 
              py-4 h-[90%] cursor-pointer"
            >
              {currentCityId
                ? cityNames[currentCityId]
                : "Pilih lokasi..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 justify-start">
            <Command className="md:min-w-[720px]">
              <CommandInput placeholder="Cari lokasi..." className="h-9" />
              <CommandList>
                <CommandEmpty>Lokasi tidak ditemukan.</CommandEmpty>
                <CommandGroup className="w-full">
                  {Object.entries(cityNames).map(([id, name]) => (
                    <CommandItem
                      key={id}
                      value={id}
                      onSelect={(val) => {
                        setCurrentCityId(val === currentCityId ? "" : val);
                        setOpen(false);
                        onUpdate();
                      }}
                      className={cn(
                        "cursor-pointer",
                        currentCityId === id && "bg-islamic-100 text-islamic-800"
                      )}
                    >
                      {name}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentCityId === id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={onUpdate} className="bg-islamic-600 hover:bg-islamic-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 h-[90%]">
          Update Lokasi
        </Button>
      </div>
    </div>
    );
}