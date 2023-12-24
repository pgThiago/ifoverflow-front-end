"use client";

import { RocketLaunch } from "@/components/Rocket";
import { Categories } from "@/components/categories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { useService } from "@/services";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuestionsStore } from "@/zustand/useQuestionsStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

export interface IDashboarLayoutProps {
  children: React.ReactNode;
  newQuestionParallel: React.ReactNode;
  aboutParallel: React.ReactNode;
  licenseParallel: React.ReactNode;
  privacyParallel: React.ReactNode;
}

const DashboarLayout = (props: IDashboarLayoutProps) => {
  const searchParamHook = useSearchParams();
  const [showCategories, setShowCategoriesMobile] = useState(false);
  const [searchQuestion, setSearchQuestion] = useState<string | null>(
    searchParamHook.get("search")
  );
  const { getCategories, getUserProfile, getQuestionBySearch } = useService();
  const { login, logout, handleIsAuthenticated, isAuthenticated } =
    useAuthStore();
  const { questions } = useQuestionsStore();
  const { setQuestions } = useQuestionsStore();
  const { push } = useRouter();
  const handleToggleCategories = () => {
    setShowCategoriesMobile(!showCategories);
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: checkIsLogged } = useQuery({
    queryKey: [
      "validateToken",
      secureLocalStorage.getItem("access_token") as string,
    ],
    queryFn: () => {
      handleIsAuthenticated();
      return getUserProfile(
        undefined,
        secureLocalStorage.getItem("access_token") as string
      );
    },
    onSuccess(data) {
      const token = secureLocalStorage.getItem("access_token") as string;
      login(data, token);
    },
    onError() {
      logout();
      secureLocalStorage.setItem("alreadyNotified", true);
      const alreadyNotified = secureLocalStorage.getItem("alreadyNotified");
      if (!alreadyNotified) {
        toast("Sessão expirada. Faça login para interagir");
      }
    },
    enabled: (secureLocalStorage.getItem("access_token") as string) !== null,
    refetchInterval: 5000 * 60 * 5,
  });

  const { data, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["searchQuestion", searchQuestion],
    queryFn: getQuestionBySearch,
    enabled:
      searchQuestion !== undefined &&
      searchQuestion !== null &&
      searchQuestion !== "",
    onSuccess: () => {},
  });

  useEffect(() => {
    if (searchQuestion && data) {
      setQuestions(data);
    }
  }, [data, searchQuestion]);

  const handleSearch = (search: string) => {
    setSearchQuestion(search);
    push(`/dashboard/questions?search=${search.trim().toLowerCase()}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-between">
      <>
        <Header />

        <Search handleSearch={handleSearch} />

        <main className="w-full flex-grow md:flex md:flex-col">
          <section className="flex items-center justify-between md:justify-end px-4 py-2">
            {showCategories && (
              <X
                onClick={() => {
                  secureLocalStorage.removeItem("alreadySeenCategories");
                  handleToggleCategories();
                }}
                size={24}
                color="#fff"
                weight="fill"
                className={`hover:cursor-pointer relative z-30 md:hidden`}
              />
            )}

            {!showCategories && (
              <div className="flex gap-2 md:hidden">
                <FunnelSimple
                  onClick={handleToggleCategories}
                  className={`hover:cursor-pointer relative z-30`}
                  size={24}
                  color="#000"
                />
                <span
                  onClick={handleToggleCategories}
                  className="cursor-pointer"
                >
                  Filtrar
                </span>
              </div>
            )}

            {isAuthenticated ? (
              <Link
                className="flex justify-center bg-black font-bold hover:bg-white hover:text-black hover:brightness-110 px-4 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-22"
                href="/dashboard/questions/new-question"
              >
                Perguntar
              </Link>
            ) : (
              <button
                className="flex justify-center bg-black font-bold hover:bg-white hover:text-black hover:brightness-110 px-4 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-22"
                onClick={() => {
                  toast("Faça login para interagir");
                }}
              >
                Perguntar
              </button>
            )}
          </section>

          <section className="md:flex md:justify-between md:mx-4">
            <section className="relative -top-32 md:top-0">
              {showCategories && (
                <Categories
                  showCategories={showCategories}
                  handleToggleCategories={handleToggleCategories}
                  categories={categories}
                />
              )}
            </section>
            <section className="hidden md:block relative -top-32 md:top-0 mr-4">
              <Categories
                showCategories={showCategories}
                handleToggleCategories={handleToggleCategories}
                categories={categories}
              />
            </section>

            <section className="flex flex-col flex-grow">
              {props.children}
              {props.newQuestionParallel}
              {props.aboutParallel}
              {props.licenseParallel}
              {props.privacyParallel}
            </section>
          </section>

          {questions?.length > 10 && <RocketLaunch />}
        </main>
        <Footer />
      </>
    </div>
  );
};

export default DashboarLayout;
