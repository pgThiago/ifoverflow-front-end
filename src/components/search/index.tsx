"use client";

import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

interface SearchProps {
  handleSearch: (search: string) => void;
}

export const Search = ({ handleSearch }: SearchProps) => {
  const [search, setSearch] = useState("");

  const onSubmit = () => {
    handleSearch(search);
  };

  return (
    <div className="w-full md:w-1/2 my-4 md:my-0 flex justify-center items-center px-4 mt-2">
      <form
        onSubmit={(event) => {
          event?.preventDefault();
          onSubmit();
        }}
        className="w-full flex justify-start items-center gap-2"
      >
        <button className="" type="button" title="Pesquisar" onClick={onSubmit}>
          <MagnifyingGlass size={24} weight="thin" color="#000" />
        </button>
        <input
          type="search"
          placeholder="Olá, o que está procurando❓"
          className="placeholder:text-black/50 placeholder:text-center placeholder:font-semibold text-black text-sm md:text-lg mx-auto bg-transparent w-full py-2 outline-none border-b border-black"
          value={search}
          onChange={(event: any) => setSearch(event.target.value)}
        />
      </form>
    </div>
  );
};
