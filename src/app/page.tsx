"use client";

import { useService } from "@/services";
import { UserLoginType } from "@/types";
import { signInValidationSchema } from "@/utils/signInValidation";
import { useAuthStore } from "@/zustand/useAuthStore";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";
import secureLocalStorage from "react-secure-storage";

interface SignInTypes {
  email: string;
  password: string;
}

export default function Home() {
  const { push } = useRouter();
  const [nextStep, setNextStep] = React.useState(false);

  const { login: setLogin, user } = useAuthStore();
  const { login, getUserProfile } = useService();

  if (user) {
    push("/dashboard/questions");
  }

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInTypes>({
    resolver: zodResolver(signInValidationSchema),
  });

  const { mutateAsync: signInMutation, isLoading } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (payload: UserLoginType) => {
      return login(payload);
    },
    onSuccess: async (data: any) => {
      try {
        if (data.access_token) {
          const userProfile = await getUserProfile(data.access_token);
          setLogin(userProfile, data.access_token);
          secureLocalStorage.removeItem("alreadyNotified");
          push("/dashboard/questions");
        }
      } catch (error) {
        toast.error("Xabu no get profile");
      }
    },
    onError: () => {
      toast.error("Erro, tente novamente!");
    },
  });

  function onError(erro: any) {
    console.log(erro);
  }

  function onSubmit(data: { email: string; password: string }) {
    const payload = {
      username: data.email,
      password: data.password,
    };

    try {
      signInMutation(payload);
    } catch (error) {
      console.log(error);
      toast.error("Erro, tente novamente!");
    }
  }

  useEffect(() => {
    secureLocalStorage.removeItem("alreadySeenCategories");
  }, []);

  let emailHasError =
    typeof errors.email?.message !== "undefined" &&
    typeof errors.email?.message !== undefined;

  return (
    <>
      <Image
        src={`https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80`}
        fill
        alt="background"
        className="brightness-50 fixed -z-10"
      />
      <section className="fixed z-20 w-full h-full flex items-center justify-center px-4 md:px-0">
        <div className=" md:w-1/2 w-full shadow-2xl shadow-sky-900 brightness-200 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center  md:flex-row">
            <div className="w-full md:w-1/2 p-8">
              <div className="text-center">
                <Image
                  width={200}
                  height={200}
                  className="mx-auto w-48"
                  src="/sign-in.svg"
                  priority
                  alt="logo"
                />
                <h4 className="text-xl text-white font-semibold pb-1 mt-2">
                  Somos o IFoverflow
                </h4>
              </div>
              <form method="post" onSubmit={handleSubmit(onSubmit, onError)}>
                {!nextStep && (
                  <div className="mb-4">
                    <label className="mt-4 text-white" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      className="form-control block w-full  bg-transparent py-1 text-base font-normal text-white bg-clip-padding border-b border-slate-500 border-solid m-0  focus:outline-none"
                      id="email"
                      placeholder="exemplo@gmail.com"
                      {...register("email")}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) =>
                        message && (
                          <p className="text-red-500 text-xs mt-2">{message}</p>
                        )
                      }
                    />
                  </div>
                )}

                {nextStep && (
                  <div className="mb-4">
                    <label className="mt-4 text-white" htmlFor="password">
                      Senha
                    </label>
                    <input
                      className="form-control block w-full bg-transparent py-1 text-base font-normal text-white bg-clip-padding border-b border-slate-500 border-solid m-0  focus:outline-none"
                      type="password"
                      id="password"
                      placeholder="Senha"
                      {...register("password")}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) =>
                        message && (
                          <p className="text-red-500 text-xs mt-2">{message}</p>
                        )
                      }
                    />
                  </div>
                )}

                <div className="text-center mt-2">
                  {!nextStep && (
                    <>
                      <button
                        onClick={async () => {
                          const result = await trigger("email");
                          if (result && !emailHasError) {
                            setNextStep(!nextStep);
                          }
                        }}
                        className="flex justify-center font-semibold bg-none hover:bg-black hover:brightness-110 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Próximo
                      </button>
                    </>
                  )}

                  {nextStep && (
                    <>
                      <button
                        type="submit"
                        className="flex justify-center font-semibold bg-none hover:bg-black hover:brightness-110 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        <Dna
                          visible={isLoading}
                          height="20"
                          width="20"
                          ariaLabel="dna-loading"
                          wrapperStyle={{
                            padding: "0",
                          }}
                          wrapperClass="dna-wrapper"
                        />
                        {!isLoading && "Entrar"}
                      </button>

                      <button
                        onClick={() => setNextStep(!nextStep)}
                        className="text-white p-2.5 mt-2 bg-none text-xs leading-tight hover:underline focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Voltar
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col items-center justify-between">
                  <p className="text-white mt-2">Não tem conta?</p>
                  <Link
                    href={"sign-up"}
                    key={2}
                    className="flex justify-center font-bold bg-none hover:bg-black hover:brightness-110 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-28"
                  >
                    Criar conta
                  </Link>
                </div>
              </form>
            </div>
            {/* divisa */}
            <div className="w-full md:w-1/2 flex items-center p-8">
              <div className="text-white md:mt-0 w-full">
                <h2 className="text-md font-semibold">
                  Junte-se à nossa comunidade
                </h2>
                <p className="text-md md:mt-4 mt-2">
                  Aqui, todos são bem-vindos para se envolver em discussões
                  sobre uma ampla variedade de temas. Sinta-se à vontade para
                  selecionar suas áreas de interesse e comece a compartilhar seu
                  conhecimento com outros membros do grupo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
