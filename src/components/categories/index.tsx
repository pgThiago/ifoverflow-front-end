"use client";

import { ICategoriesMobileProps as ICategoriesProps } from "@/interfaces";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

export const Categories = ({
  handleToggleCategories,
  categories,
}: ICategoriesProps) => {
  return (
    <>
      {/* Mobile */}
      <section className="md:hidden absolute z-10 text-center w-full">
        <p className="text-2xl pt-20 pb-10 bg-black w-full text-white">
          Categorias
        </p>
        <div className="flex flex-col items-center -mt-1 justify-center w-full text-black bg-black">
          {categories?.map((category) => (
            <Link
              href={{
                pathname: "/dashboard/questions",
                query: {
                  category: decodeURIComponent(
                    category?.name.replace(/\s/g, "-").toLocaleLowerCase()
                  ),
                },
              }}
              onClick={() => {
                secureLocalStorage.removeItem("alreadySeenCategories");
                handleToggleCategories();
              }}
              className="mb-4 p-2 text-center shadow-sm cursor-pointer hover:animate-pulse hover:underline text-white"
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Desktop */}
      <section className="hidden md:block md:w-60 text-center mt-16">
        <p className="text-2xl rounded-md pt-2 pb-2 -mt-1 bg-black w-full text-white">
          Categorias
        </p>
        <div className="flex flex-col items-center rounded-md mt-1 justify-center w-full text-black bg-black">
          {categories?.map((category) => (
            <Link
              href={{
                pathname: "/dashboard/questions",
                query: {
                  category: decodeURIComponent(
                    category?.name.replace(/\s/g, "-").toLocaleLowerCase()
                  ),
                },
              }}
              className="p-2 py-4 text-center shadow-sm cursor-pointer hover:animate-pulse hover:underline text-white"
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
