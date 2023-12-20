import { IQuestionItemProps } from "@/interfaces";
import { useService } from "@/services";
import { NewAnswerTypes } from "@/types";
import { formatDescriptionText } from "@/utils/formatDescriptionText";
import { useAuthStore } from "@/zustand/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { ThumbsDown, ThumbsUp } from "phosphor-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { z } from "zod";
import { AvatarByName } from "../AvatarByName";
import { CustomEditor } from "../customEditor";
import { Textarea } from "../textarea";

interface NewAnswerFormTypes {
  answer: string;
}

const answerSchema = z.object({
  answer: z.string().nonempty().min(10, { message: "Explique melhor" }),
});

export const Question = ({
  question,
  isShowingDetails,
  isOwnerOfQuestion,
}: IQuestionItemProps) => {
  const methods = useForm<NewAnswerFormTypes>({
    resolver: zodResolver(answerSchema),
  });

  const { handleSubmit, reset: resetAnswerField } = methods;
  const { postAnswer } = useService();
  const { token, isAuthenticated } = useAuthStore();

  const { votePositiveQuestion, voteNegativeQuestion } = useService();
  const [showTextarea, setShowTextarea] = useState(false),
    [votes, setVotes] = useState(question?.votes),
    [myVoteState, setMyVoteState] = useState(question?.my_vote);

  const handleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const postAnswerMutation = useMutation({
    mutationKey: ["postAnswer"],
    mutationFn: (variables: any) => postAnswer(variables, token),
    onSuccess: (data: any, variables: NewAnswerTypes, context: any) => {
      resetAnswerField();
      toast.success("Resposta publicada com sucesso!");
    },
    onError: (
      error: { message: string },
      variables: NewAnswerTypes,
      context: any
    ) => {
      toast.error(error.message);
    },
  });

  const handlePositiveQuestion = useMutation({
    mutationKey: ["handlePositiveQuestion"],
    mutationFn: (variables: any) => votePositiveQuestion(variables, token),
    onSuccess: () => {
      setVotes((votes) => votes + 1);
      setMyVoteState(1);
      toast.success("Voto positivo computado!");
    },
    onError: (error: { message: string }, variables: any, context) => {
      toast.error(error.message);
    },
  });

  const handleNegativeQuestion = useMutation({
    mutationKey: ["handlePositiveQuestion"],
    mutationFn: (variables: any) => voteNegativeQuestion(variables, token),
    onSuccess: () => {
      setVotes((votes) => votes - 1);
      setMyVoteState(-1);
      toast.success("Voto negativo computado!");
    },
    onError: (error: { message: string }, variables: any, context) => {
      toast.error(error.message);
    },
  });

  const onError = () => {};

  const handlePositive = (id: number) => {
    if (myVoteState && myVoteState !== 0) {
      toast.error("Você já votou nesta pergunta");
      return;
    }
    handlePositiveQuestion.mutate(id);
  };

  const handleNegative = (id: number) => {
    if (myVoteState && myVoteState !== 0) {
      toast.error("Você já votou nesta pergunta");
      return;
    }
    handleNegativeQuestion.mutate(id);
  };

  const onSubmitAnswer = (data: NewAnswerFormTypes) => {
    const payload = {
      answer: data.answer,
      question_id: Number(question.id),
    };
    postAnswerMutation.mutateAsync(payload);
  };

  return (
    <section
      className={`px-4 pb-8 pt-0 flex ${
        isOwnerOfQuestion ? "bg-sky-100" : "bg-white"
      }  mb-4 mx-4 rounded-md shadow-2xl shadow-sky-900`}
    >
      <div className="flex flex-col items-center">
        <div className="mt-8">
          <AvatarByName
            color="#000"
            fgColor="#fff"
            size="40"
            className="rounded-full "
            maxInitials={2}
            name={question?.user?.name}
          />
        </div>

        {!isOwnerOfQuestion && (
          <div className="mt-8 flex flex-col items-center">
            <ThumbsUp
              onClick={() => handlePositive(Number(question?.id))}
              size={24}
              weight={`${myVoteState === 1 ? "fill" : "thin"}`}
              color="green"
              className="cursor-pointer"
              xlinkTitle="Ótima pergunta"
            />
            <span className="text-sm md:text-md">{votes}</span>
            <ThumbsDown
              onClick={() => handleNegative(Number(question?.id))}
              size={24}
              weight={`${myVoteState === -1 ? "fill" : "thin"}`}
              color="red"
              className="cursor-pointer"
              xlinkTitle="Pergunta não interessante"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full ml-4 mt-8">
        <span className="font-bold">
          {isOwnerOfQuestion ? "Você" : question?.user?.name}
        </span>
        <Link
          href={{
            pathname: `/dashboard/question/${decodeURIComponent(
              question?.title?.replace(/\s/g, "-").toLocaleLowerCase()
            )}`,
            query: { id: question?.id },
          }}
          className="font-semibold mt-4 cursor-pointer hover:underline hover:text-blue-700"
        >
          {question?.title}
        </Link>

        <CustomEditor
          customStyle={`
              // .sun-editor { 
              //   border: none;
              //   z-index: 1;
              //   cursor: default;
              //   caret-color: transparent;
              // }
              // .se-wrapper {
              //   background-color: rgb(245 245 245 / var(--tw-bg-opacity));
              // }
              // .se-container {
              //   background-color: inherit;
              //   border: none;
              // }
              // .sun-editor .se-resizing-bar {
              //   display: none;              
              // }
              // .shadow-sm {
              //   --tw-shadow: 0;
              //   --tw-shadow-colored: 0;
              //   box-shadow: 0;              
              // }
              // .se-wrapper-inner > * {
            
              //   background-color: inherit;       
              // }
          `}
          isOwner={isOwnerOfQuestion}
          defaultStyle={`
              font-size: 16px; 
              padding: 0px;
              position: relative;
              z-index: 1;
              background: inherit;
          `}
          defaultValue={
            !isShowingDetails
              ? formatDescriptionText(question?.description, 100)
              : question?.description
          }
        />

        <div className="bg-black flex items-center justify-between mt-10 w-full p-2 md:p-4 rounded-sm">
          {!isShowingDetails ? (
            <div
              title="Clique para ver as respostas"
              className="flex justify-between "
            >
              <Link
                href={{
                  pathname: `/dashboard/question/${question?.title
                    .replace(" ", "-")
                    .toLocaleLowerCase()}`,
                  query: { id: question?.id },
                }}
                className="cursor-pointer text-white hover:bg-white hover:text-black p-2 hover:rounded-md text-sm md:text-md text-justify"
              >
                Ver respostas
              </Link>
            </div>
          ) : (
            <h2 className="text-white">
              {question?.answers?.length === 0
                ? "Sem respostas"
                : `${
                    question?.answers?.length === 1
                      ? "1 resposta"
                      : `${question?.answers?.length} respostas`
                  }`}
            </h2>
          )}
          {!isShowingDetails && (
            <button
              title="Clique para responder"
              className="cursor-pointer text-white hover:bg-white hover:text-black p-2 hover:rounded-md text-sm md:text-md text-justify"
              onClick={
                isAuthenticated
                  ? handleTextarea
                  : () => toast("Faça login para interagir")
              }
            >
              Responder
            </button>
          )}
        </div>
        {showTextarea && !isShowingDetails && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitAnswer, onError)}>
              <Textarea
                label="Responder"
                closeTextarea={handleTextarea}
                field="answer"
                isCommenting={false}
              />
            </form>
          </FormProvider>
        )}
      </div>
    </section>
  );
};

export const QuestionSkeleton = () => {
  return (
    <section
      className={`px-8 pb-8 pt-0 flex bg-slate-100 mb-4 mx-4 rounded-md border border-slate-300 overflow-hidden relative space-y-5 bg-gradient-to-r from-transparent via-slate-300 to-transparent p-4 shadow-2xl shadow-sky-900 before:absolute before:inset-0 before:-translate-x-32 before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200 before:bg-gradient-to-r before:from-transparent before:via-slate-300 before:to-transparent`}
    >
      <div className="flex flex-col items-center">
        <div className="mt-8">
          <div className="rounded-full bg-white w-10 h-10"></div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <ThumbsUp
            onClick={() => {}}
            size={24}
            weight="thin"
            color="#64748b"
            className="cursor-pointer"
            xlinkTitle="Ótima pergunta"
          />
          <span className="text-sm md:text-md">{""}</span>
          <ThumbsDown
            onClick={() => {}}
            size={24}
            weight="thin"
            color="#64748b"
            className="cursor-pointer"
            xlinkTitle="Pergunta não interessante"
          />
        </div>
      </div>
      <div className="flex flex-col w-full ml-4 mt-8">
        <span className="bg-white w-20 text-slate-50 rounded-sm">{"a"}</span>
        <Link
          href={""}
          className="font-semibold mt-4 cursor-pointer hover:underline hover:text-blue-700"
        >
          {""}
        </Link>
        <Link href={""} className="bg-white w-50 text-slate-50 rounded-sm">
          des
        </Link>

        <div className="bg-white flex items-center justify-between mt-10 w-full p-2 md:p-4 rounded-sm">
          <div
            title="Clique para ver as respostas"
            className="flex justify-between "
          >
            <Link
              href={""}
              className="cursor-pointer text-sm md:text-md text-justify text-slate-50"
            >
              Ver respostas
            </Link>
          </div>

          <h2 className="text-black"></h2>

          <button
            title="Clique para responder"
            className="cursor-pointer  text-sm md:text-md text-justify text-slate-50"
          >
            Responder
          </button>
        </div>
      </div>
    </section>
  );
};
