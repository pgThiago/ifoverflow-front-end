/* eslint-disable react/jsx-no-undef */
"use client";

import { Comment } from "@/components/comment";
import { HeartStraight, ThumbsDown, ThumbsUp } from "phosphor-react";

import { Textarea } from "@/components/textarea";
import { useEffect, useState } from "react";

import { IAnswerItemProps } from "@/interfaces";
import { useService } from "@/services";
import { CommentType, NewCommentOnAnswerTypes } from "@/types";
import { useAuthStore } from "@/zustand/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import { z } from "zod";
import { AvatarByName } from "../AvatarByName";
import { Heart } from "../Heart";

const commentSchema = z.object({
  comment: z.string().nonempty().min(10, { message: "Explique melhor" }),
});

export const Answer = ({
  answer,
  isOwnerOfAnswer,
  isOwnerOfQuestion,
}: IAnswerItemProps) => {
  const methods = useForm<NewCommentOnAnswerTypes>({
    resolver: zodResolver(commentSchema),
  });

  const { handleSubmit } = methods;

  const {
    postCommentOnAnswer,
    votePositiveAnswer,
    voteNegativeAnswer,
    acceptAnswer,
  } = useService();

  const { token } = useAuthStore();

  const queryClient = useQueryClient();

  const [showTextarea, setShowTextarea] = useState(false);

  const [votes, setVotes] = useState(answer?.votes),
    [myVoteState, setMyVoteState] = useState(answer?.my_vote),
    [showHeart, setShowHeart] = useState(false);

  const handleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const postCommentMutation = useMutation({
    mutationKey: ["postCommentOnAnswer"],
    mutationFn: (variables: any) => postCommentOnAnswer(variables, token),
    onSuccess: (data, variables: NewCommentOnAnswerTypes, context) => {
      toast.success("Comentário publicado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["questionId"] });
    },
    onError: (
      error: { message: string },
      variables: NewCommentOnAnswerTypes,
      context
    ) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: NewCommentOnAnswerTypes) => {
    const payload = {
      comment: data.comment,
      answer_id: Number(answer.id),
    };
    postCommentMutation.mutateAsync(payload);
  };

  const handlePositiveAnswer = useMutation({
    mutationKey: ["handlePositiveAnswer"],
    mutationFn: (variables: any) => votePositiveAnswer(variables, token),
    onSuccess: () => {
      setVotes((votes) => votes + 1);
      setMyVoteState(1);
      toast.success("Voto positivo computado!");
    },
    onError: (error: { message: string }, variables: any, context) => {
      toast.error(error.message);
    },
  });

  const handleNegativeAnswer = useMutation({
    mutationKey: ["handlePositiveAnswer"],
    mutationFn: (variables: any) => voteNegativeAnswer(variables, token),
    onSuccess: () => {
      setVotes((votes) => votes - 1);
      setMyVoteState(-1);
      toast.success("Voto negativo computado!");
    },
    onError: (error: { message: string }, variables: any, context) => {
      toast.error(error.message);
    },
  });

  const handleAcceptAnswerMutation = useMutation({
    mutationKey: ["handleAcceptAnswer"],
    mutationFn: (variables: any) => acceptAnswer(variables, token),
    onSuccess: () => {
      toast.success("Marcada como melhor resposta!");
      queryClient.invalidateQueries({ queryKey: ["questionId"] });
    },
    onError: (error: { message: string }, variables: any, context) => {
      toast.error(error.message);
    },
  });

  const onError = () => {};

  const selectAsBestAnswer = (id: number) => {
    handleAcceptAnswerMutation.mutateAsync(id);
  };

  const handlePositive = (id: number) => {
    if (myVoteState !== 0) {
      toast.error("Você já votou nesta resposta");
      return;
    }
    handlePositiveAnswer.mutateAsync(id);
  };

  const handleNegative = (id: number) => {
    if (myVoteState !== 0) {
      toast.error("Você já votou nesta resposta");
      return;
    }
    handleNegativeAnswer.mutateAsync(id);
  };

  function showHeartStraightAnimation() {
    setShowHeart(true);
  }

  useEffect(() => {
    if (showHeart) {
      const timerId = setTimeout(() => {
        setShowHeart(false);
      }, 5000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [showHeart]);

  return (
    <>
      <Heart show={showHeart} />
      <section
        className={`px-4 pb-8 pt-0 flex shadow-2xl shadow-sky-900 mb-4 mx-8 rounded-md ${
          isOwnerOfAnswer ? "bg-sky-100" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="mt-6">
            <AvatarByName
              color="#000"
              fgColor="#fff"
              size="40"
              className="rounded-full mr-2"
              name={answer?.user?.name}
              maxInitials={2}
            />
          </div>

          {!isOwnerOfAnswer && (
            <div className="mt-4 flex flex-col items-center">
              <ThumbsUp
                onClick={() => handlePositive(Number(answer?.id))}
                size={24}
                weight={`${myVoteState === 1 ? "fill" : "thin"}`}
                color="green"
                className="cursor-pointer"
              />
              <span className="text-sm">{votes}</span>
              <ThumbsDown
                onClick={() => handleNegative(Number(answer?.id))}
                size={24}
                weight={`${myVoteState === -1 ? "fill" : "thin"}`}
                color="red"
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full ml-4 mt-8">
          <span className="flex justify-between font-bold">
            {isOwnerOfAnswer ? "Você" : answer?.user?.name}
            {!isOwnerOfAnswer && isOwnerOfQuestion && (
              <button
                title={`${
                  answer.accepted
                    ? "Melhor resposta"
                    : "Marcar como melhor resposta"
                }`}
              >
                <HeartStraight
                  onClick={() => {
                    showHeartStraightAnimation();
                    selectAsBestAnswer(Number(answer?.id));
                  }}
                  size={answer.accepted ? 50 : 32}
                  weight={answer.accepted ? "fill" : "thin"}
                  color="red"
                  className="animate-pulse cursor-pointer "
                />
              </button>
            )}
          </span>

          <SunEditor
            lang={"pt_br"}
            height="auto"
            setDefaultStyle={`
              font-size: 16px; 
              padding: 8px;
              position: relative;
              z-index: 1;
            `}
            defaultValue={answer?.description}
            readOnly
            hideToolbar
            setOptions={{
              showPathLabel: false,
            }}
          />

          <div className="mt-8 w-full">
            <h2 className="text-black text-sm">
              {answer?.comments?.length === 0
                ? "Sem comentários"
                : `${
                    answer?.comments?.length === 1
                      ? "1 comentário"
                      : `${answer?.comments?.length} comentários`
                  }`}
            </h2>
            {answer?.comments?.map((comment: CommentType) => (
              <Comment
                key={comment.id}
                comment={comment}
                isOwnerOfComment={comment.isOwnerOfComment}
              />
            ))}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Textarea
                  label="Comentar resposta"
                  closeTextarea={handleTextarea}
                  field="comment"
                  isCommenting={false}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </section>
    </>
  );
};
