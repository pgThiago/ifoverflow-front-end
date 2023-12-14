interface ConfirmBestAwnserProps {
  targetUser: string;
  answer: string;
  toggleConfirmBestAnswer: () => void;
  handleAcceptedAnswer: () => void;
}

export const ConfirmBestAwnser = ({
  targetUser,
  answer,
  toggleConfirmBestAnswer,
  handleAcceptedAnswer,
}: ConfirmBestAwnserProps) => {
  answer =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora consequuntur, est repellat quae adipisci porro. Dolor excepturi deserunt voluptate corrupti perspiciatis fuga iure quos distinctio facere! Omnis, ipsam. Repellat, nostrum.";
  return (
    <section className="">
      <span className="text-neutral-900">
        Marcar a resposta de <strong>{targetUser}</strong> como melhor resposta?
      </span>
      <p className="py-8 text-neutral-900">{answer}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleConfirmBestAnswer}
          className="text-black bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Não
        </button>
        <button
          onClick={handleAcceptedAnswer}
          className="text-black bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm  px-5 py-2.5 focus:z-10"
        >
          Sim
        </button>
      </div>
    </section>
  );
};
