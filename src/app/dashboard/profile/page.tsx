"use client";

import { AvatarByName } from "@/components/AvatarByName";
import { Question } from "@/components/question";
import { useService } from "@/services";
import { QuestionType } from "@/types";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getQuestions } = useService();
  const { push } = useRouter();

  const { data: questions } = useQuery({
    queryKey: ["questionProfile"],
    queryFn: getQuestions,
  });

  const userQuestions = questions?.filter(
    (question: QuestionType) => user?.id === question.user.id
  );

  if (!isAuthenticated) {
    push("/");
  }

  return (
    <main className="flex flex-col">
      <section className="flex flex-col md:flex-row rounded-md mx-4 gap-8 ">
        <div className="flex flex-col items-center justify-center py-4 shadow-2xl shadow-sky-900 rounded-md bg-white w-full md:w-1/4">
          <AvatarByName
            color="#000"
            fgColor="#fff"
            size="70"
            className="rounded-full mr-2"
            name={user?.name}
            maxInitials={2}
          />
          <span className="text-md mt-4 font-bold text-center">
            {user?.name}
          </span>
        </div>

        <div className="p-4 shadow-2xl shadow-sky-900 rounded-md bg-white w-full">
          <h4 className="mb-4 font-bold">Informações pessoais</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 text-sm">
            <div className="col-span-1 md:col-span-2">
              <span>E-mail:</span>
              <strong className="ml-2">{user?.email}</strong>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span>Votos recebidos:</span>
              <strong className="ml-2">{user?.votes}</strong>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span>Nível:</span>
              <strong className="ml-2">
                {user?.rating.name} - {user?.rating.description}
              </strong>
            </div>

            <div className="col-span-1 md:col-span-2">
              <span>Campus:</span>
              <strong className="ml-2">
                {user?.campus.name} - {user?.campus.state.name}
              </strong>
            </div>

            <div className="col-span-1 md:col-span-2">
              <span>Perguntas:</span>
              <strong className="ml-2">{user?.count_questions}</strong>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span>Respostas:</span>
              <strong className="ml-2">{user?.count_questions}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        {userQuestions?.length > 0 && (
          <h4 className="text-neutral-700 font-semibold mx-auto mb-8 rounded-lg bg-white w-fit px-4 py-2">
            Suas perguntas
          </h4>
        )}

        {userQuestions?.map((question: QuestionType) => (
          <Question
            key={question.id}
            question={question}
            isOwnerOfQuestion={question?.user?.id === user?.id}
            isShowingDetails={false}
          />
        ))}
      </section>
    </main>
  );
};

export default Profile;
