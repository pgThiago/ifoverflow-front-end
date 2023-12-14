"use client";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { useService } from "@/services";
import { UserRegisterType } from "@/types";
import { mapToOptions } from "@/utils/mapToOptions";
import { signUpValidationSchema } from "@/utils/signUpValidation";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";
import Select from "react-select";

interface SignUpTypes {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  campus: string;
  state: string;
}

const defaultValues = {
  name: "",
  username: "mocking avatar url",
  email: "",
  password: "",
  confirmPassword: "",
  campus: "",
  state: "",
};

export default function SignUpModal() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpTypes>({
    defaultValues,
    resolver: zodResolver(signUpValidationSchema),
    criteriaMode: "all",
  });

  const { getCampuByState, getStates, createUser } = useService();
  const { back } = useRouter();

  const {
    field: { value: stateValue, onChange: stateOnChange, ...restStateField },
  } = useController({ name: "state", control });

  const {
    field: { value: campusValue, onChange: campusOnChange, ...restCampusField },
  } = useController({ name: "campus", control });

  const { data: statesFromApi, isLoading: isLoadingState } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const states = mapToOptions(statesFromApi);
  const state = watch("state");

  const { data: campusFromApi, isLoading: isLoadingCampus } = useQuery({
    queryKey: [`campus`, state],
    queryFn: getCampuByState,
    enabled: state !== undefined && state !== "",
  });

  const campus = mapToOptions(campusFromApi?.campus);

  function onError(erro: any) {
    console.log(erro);
  }

  const createUserMutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (payload: UserRegisterType) => {
      return createUser(payload);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Conta criada com sucesso :)");
      back();
    },
    onError: (
      error: { message: string },
      variables: UserRegisterType,
      context
    ) => {
      toast.error(`${error.message}`);
    },
  });

  function onSubmit(data: any, e: any) {
    const payload = {
      name: data.name,
      avatar: "avatar",
      email: data.email,
      password: data.password,
      campus_id: Number(data.campus),
    };
    createUserMutation.mutateAsync(payload);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Modal.Root>
        <Modal.Header>
          <Modal.Title>Preencha seus dados</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col text-white">
            <label className="text-sm mt-2" htmlFor="name">
              Nome completo
            </label>
            <input
              className="form-control block w-full bg-transparent py-1 px-1 text-xs font-normal  bg-clip-padding border-b border-slate-500 border-solid m-0 focus:text-white focus:outline-none"
              {...register("name")}
            />

            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) =>
                message && (
                  <p className="text-red-500 text-xs mt-2">{message}</p>
                )
              }
            />

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="text-sm mt-2" htmlFor="uf">
                  UF
                </label>

                <Select
                  className="text-white"
                  isClearable
                  noOptionsMessage={() => `${!state && "Erro no servidor"}`}
                  styles={{
                    control: (baseStyles) => {
                      return {
                        ...baseStyles,
                        color: "black",
                      };
                    },
                    option: (
                      optionStyles,
                      { isDisabled, isFocused, isSelected }
                    ) => {
                      return {
                        ...optionStyles,
                        color:
                          !isDisabled && isFocused
                            ? "black"
                            : isDisabled
                            ? "black"
                            : "white",
                        backgroundColor: isDisabled
                          ? "#cecece"
                          : isFocused
                          ? "white"
                          : "black",
                        fontSize: "12px",
                      };
                    },
                  }}
                  placeholder="Selecione o Estado"
                  options={states}
                  isOptionDisabled={(option) => option?.isdisabled}
                  loadingMessage={() => (
                    <Dna
                      visible={isLoadingState}
                      height="20"
                      width="20"
                      ariaLabel="dna-loading"
                      wrapperStyle={{
                        padding: "0",
                      }}
                      wrapperClass="dna-wrapper"
                    />
                  )}
                  value={
                    stateValue
                      ? states?.find(
                          (state: any) => state?.value === stateValue
                        )
                      : stateValue
                  }
                  onChange={(option: any) =>
                    stateOnChange(
                      option && option.value
                        ? option?.value?.toString()
                        : option?.toString()
                    )
                  }
                  {...restStateField}
                />

                <ErrorMessage
                  errors={errors}
                  name="state"
                  render={({ message }) =>
                    message && (
                      <p className="text-red-500 text-xs mt-2">{message}</p>
                    )
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm mt-2" htmlFor="campus">
                  Campus
                </label>
                <Select
                  className="text-white"
                  isClearable
                  noOptionsMessage={() =>
                    `${
                      state && !campus
                        ? "Erro no servidor"
                        : "Primeiro selecione o Estado"
                    }`
                  }
                  styles={{
                    control: (baseStyles) => {
                      return {
                        ...baseStyles,
                        color: "black",
                      };
                    },
                    option: (
                      optionStyles,
                      { isDisabled, isFocused, isSelected }
                    ) => {
                      return {
                        ...optionStyles,
                        color: isFocused ? "black" : "white",
                        backgroundColor: isFocused ? "white" : "black",
                      };
                    },
                  }}
                  placeholder="Selecione o Campus"
                  options={campus}
                  loadingMessage={() => (
                    <Dna
                      visible={isLoadingCampus}
                      height="20"
                      width="20"
                      ariaLabel="dna-loading"
                      wrapperStyle={{
                        padding: "0",
                      }}
                      wrapperClass="dna-wrapper"
                    />
                  )}
                  value={
                    campusValue
                      ? campus?.find(
                          (campus: any) => campus.value === campusValue
                        )
                      : campusValue
                  }
                  onChange={(option: any) =>
                    campusOnChange(
                      option && option.value
                        ? option.value.toString()
                        : option.toString()
                    )
                  }
                  {...restCampusField}
                />

                <ErrorMessage
                  errors={errors}
                  name="campus"
                  render={({ message }) =>
                    message && (
                      <p className="text-red-500 text-xs mt-2">{message}</p>
                    )
                  }
                />
              </div>
            </div>

            <label className="text-sm mt-2 my-1" htmlFor="email">
              E-mail
            </label>
            <input
              className="form-control block w-full bg-transparent py-1 text-xs font-normal  bg-clip-padding border-b border-slate-500 border-solid m-0 focus:text-white focus:outline-none"
              type="email"
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

            <label className="text-sm mt-2 my-1" htmlFor="password">
              Senha
            </label>
            <input
              min={8}
              className="form-control block w bg-transparent py-1 text-xs font-normal  bg-clip-padding border-b border-slate-500 border-solid m-0 focus:text-white focus:outline-none"
              type="password"
              {...register("password")}
            />

            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message, messages }) =>
                Object.keys(messages as {})[0] === "invalid_string" ? (
                  <p className="text-red-500 text-xs mt-2">
                    {(() => {
                      return (
                        <p className="text-sx text-red-500 mt-2">
                          {formatPass(message)}
                        </p>
                      );
                    })()}
                  </p>
                ) : (
                  <p className="text-sx text-red-500 mt-2">{message}</p>
                )
              }
            />

            <label className="text-sm mt-2 my-1" htmlFor="passwordConfirm">
              Confirmar senha
            </label>
            <input
              min={8}
              className="form-control block w bg-transparent py-1 text-xs font-normal  bg-clip-padding border-b border-slate-500 border-solid m-0 focus:text-white focus:outline-none"
              type="password"
              {...register("confirmPassword")}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) =>
                message && (
                  <p className="text-red-500 text-xs mt-2">{message}</p>
                )
              }
            />
          </div>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              back();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">Criar conta</Button>
        </Modal.Actions>
      </Modal.Root>
    </form>
  );
}

function formatPass(children: any) {
  const requirements = children.split("- ");
  return (
    <ul>
      {requirements
        .filter((req: any) => req !== "")
        .map((req: any, index: number) => (
          <li key={index}>. {req}</li>
        ))}
    </ul>
  );
}
