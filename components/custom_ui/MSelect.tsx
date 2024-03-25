"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Member } from "@prisma/client";

interface MultiSelectProps {
  placeholder: string;
  members: Member[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelectMember: React.FC<MultiSelectProps> = ({
  placeholder,
  members,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: Member[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      members.find((member) => member.id === id)
    ) as Member[];
  }

  const selectables = members.filter((member) => !selected.includes(member));

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((member) => (
          <Badge key={member.id}>
            {member.name}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(member.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((member) => (
              <CommandItem
                key={member.id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(member.id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {member.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelectMember;
