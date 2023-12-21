"use client";

import { Answer } from "@/components/answer";
import { Comment } from "@/components/comment";
import { Question, QuestionSkeleton } from "@/components/question";
import { Textarea } from "@/components/textarea";
import { useService } from "@/services";
import { AnswerType, CommentType, NewAnswerTypes } from "@/types";
import { sortBestAnswer } from "@/utils/sort";
import { useAuthStore } from "@/zustand/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface NewAnswerFormTypes {
  answer: string;
}

const answerSchema = z.object({
  answer: z.string().nonempty().min(10, { message: "Explique melhor" }),
});

interface NewCommentFormTypes {
  comment: string;
}

const commentSchema = z.object({
  comment: z.string().nonempty().min(10, { message: "Explique melhor" }),
});

const QuestionDetailsClient = () => {
  const { getQuestion } = useService();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { postCommentOnQuestion, postAnswer } = useService();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");
  const [showTextarea, setShowTextarea] = useState(false);

  const commentMethods = useForm<NewCommentFormTypes>({
    resolver: zodResolver(commentSchema),
  });

  const answerMethods = useForm<NewAnswerFormTypes>({
    resolver: zodResolver(answerSchema),
  });

  const { handleSubmit: handleSubmitAnswer, reset: resetAnswerField } =
    answerMethods;

  const { handleSubmit: handleSubmitComment, reset: resetCommentField } =
    commentMethods;

  const { data: question, isLoading } = useQuery({
    queryKey: ["questionId"],
    queryFn: () => getQuestion(questionId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionId"] });
    },
  });

  const postAnswerMutation = useMutation({
    mutationKey: ["postAnswer"],
    mutationFn: (variables: any) => {
      return postAnswer(variables, token);
    },
    onSuccess: (data: any, variables: NewAnswerTypes, context: any) => {
      resetAnswerField();
      toast.success("Resposta publicada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["questionId"] });
    },
    onError: (error: { message: string }, variables: NewAnswerTypes) => {
      toast.error(error.message);
    },
  });

  const postCommentOnQuestionMutation = useMutation({
    mutationKey: ["postCommentOnQuestion"],
    mutationFn: (variables: any) => postCommentOnQuestion(variables, token),
    onSuccess: () => {
      resetCommentField();
      toast.success("Comentário publicado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["questionId"] });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const onSubmitAnswer = (data: NewAnswerFormTypes) => {
    const payload = {
      answer: data.answer,
      question_id: Number(question.id),
    };
    postAnswerMutation.mutate(payload);
  };

  const onSubmitComment = (data: NewCommentFormTypes) => {
    const payload = {
      comment: data.comment,
      question_id: Number(question.id),
    };
    postCommentOnQuestionMutation.mutate(payload);
  };

  const onError = () => {};

  const handleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  if (isLoading) {
    return <QuestionSkeleton />;
  }

  const hasBest = (answers: AnswerType[]) => {
    const best = answers?.find(
      (answer: AnswerType) => answer.accepted === true
    );
    return best?.accepted ? true : false;
  };

  return (
    <>
      <h2 className="text-black text-xl my-2 ml-4">
        {user?.id === question?.user?.id ? (
          "Interações com a sua pergunta"
        ) : (
          <span>
            Interações com a pergunta de <strong>{question?.user?.name}</strong>
          </span>
        )}
      </h2>
      <Question
        question={question}
        isOwnerOfQuestion={user?.id === question?.user?.id}
        isShowingDetails={true}
      />
      <div className="my-2 w-10/12 ml-auto mr-8">
        <h2 className="text-black text-sm ml-30">
          {question?.comments?.length === 0
            ? "Sem comentários"
            : `${
                question?.comments?.length === 1
                  ? "1 comentário"
                  : `${question?.comments?.length} comentários`
              }`}
        </h2>
        <div>
          {question?.comments?.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              comment={comment}
              isOwnerOfComment={comment?.user?.id === user?.id}
            />
          ))}
        </div>
      </div>

      <FormProvider {...commentMethods}>
        <form
          className="my-2 w-10/12 ml-auto mr-8"
          onSubmit={handleSubmitComment(onSubmitComment, onError)}
        >
          <Textarea
            label="Comentar esta pergunta"
            closeTextarea={handleTextarea}
            field="comment"
            isCommenting={false}
          />
        </form>
      </FormProvider>
      <h2 className="px-4 pb-4 text-black pt-0 ml-4">
        {question?.answers?.length === 0
          ? "Sem respostas"
          : `${
              question?.answers?.length === 1
                ? "1 resposta"
                : `${question?.answers?.length} respostas`
            }`}
      </h2>
      {sortBestAnswer(question?.answers)?.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          isOwnerOfAnswer={answer?.user?.id === user?.id}
          isOwnerOfQuestion={question?.user?.id === user?.id}
          isShowingDetails={true}
          hasBestAnswer={hasBest(question?.answers)}
        />
      ))}
      <FormProvider {...answerMethods}>
        <form
          className="w-full px-8 mt-8 m-auto"
          onSubmit={handleSubmitAnswer(onSubmitAnswer, onError)}
        >
          <Textarea
            label="Responder esta pergunta"
            closeTextarea={handleTextarea}
            field="answer"
            isCommenting={false}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default QuestionDetailsClient;
