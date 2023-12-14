"use client";
import { Modal } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { useService } from "@/services";
import { NewQuestionTypes } from "@/types";
import { mapToOptions } from "@/utils/mapToOptions";
import { useAuthStore } from "@/zustand/useAuthStore";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useController, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { z } from "zod";

const defaultValues = {
  title: "",
  question: "",
  category: "",
};

interface NewQuestionFormTypes {
  title: string;
  question: string;
  category: string;
}

const newQuestionSchema = z.object({
  title: z.string().nonempty({ message: "Campo obrigatório" }),
  question: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .max(300)
    .min(10, {
      message: "Descreva melhor a sua pergunta",
    }),
  category: z.string().nonempty({ message: "Campo obrigatório" }),
});

export default function NewQuestionModal() {
  const { back } = useRouter();
  const { token } = useAuthStore();

  const { getCategories, postQuestion } = useService();

  const methods = useForm<NewQuestionFormTypes>({
    defaultValues,
    resolver: zodResolver(newQuestionSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const queryClient = useQueryClient();

  const { data: categoriesFromAPI } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = mapToOptions(categoriesFromAPI);

  const {
    field: {
      value: categorieValue,
      onChange: categorieOnChange,
      ...restCategoriesField
    },
  } = useController({ name: "category", control });

  const postQuestionMutation = useMutation({
    mutationKey: ["postQuestion"],
    mutationFn: (variables: any) => postQuestion(variables, token),
    onSuccess: () => {
      toast.success("Pergunta publicada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      back();
    },
    onError: (
      error: { message: string },
      variables: NewQuestionTypes,
      context
    ) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: NewQuestionFormTypes) => {
    const payload = {
      title: data.title,
      question: data.question,
      category_id: Number(data.category),
    };
    postQuestionMutation.mutateAsync(payload);
  };

  const onError = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal.Root>
          <Modal.Header>
            <Modal.Title>Formulário de Pergunta</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <div className="flex flex-col text-black">
              <label className="text-md text-white" htmlFor="category">
                Categoria
              </label>

              <Select
                className="text-black mt-2 z-40"
                isClearable
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
                      fontSize: "12px",
                    };
                  },
                }}
                placeholder="Selecione a categoria"
                options={categories}
                value={
                  categorieValue
                    ? categories?.find(
                        (categorie: any) => categorie.value === categorieValue
                      )
                    : categorieValue
                }
                onChange={(option: any) =>
                  categorieOnChange(
                    option ? option?.value?.toString() : option?.toString()
                  )
                }
                {...restCategoriesField}
              />

              <ErrorMessage
                errors={errors}
                name="category"
                render={({ message }) =>
                  message && (
                    <p className="text-red-500 text-xs mt-2">{message}</p>
                  )
                }
              />

              <label className="text-md mt-4 text-white" htmlFor="username">
                Título
              </label>
              <input
                className="border-2 p-1 text-md text-black mt-2"
                type="text"
                maxLength={100}
                {...register("title")}
              />

              <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) =>
                  message && (
                    <p className="text-red-500 text-xs mt-2">{message}</p>
                  )
                }
              />

              <Textarea
                label="Escreva a sua pergunta abaixo"
                field="question"
                isCommenting={false}
                backgroundIsBlack
              />
            </div>
          </Modal.Content>
        </Modal.Root>
      </form>
    </FormProvider>
    // </div>
  );
}
