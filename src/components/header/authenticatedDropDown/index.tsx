import Link from "next/link";

export const AuthenticatedDropDown = ({
  toggleHamburguer,
}: {
  toggleHamburguer: () => void;
  email: string;
}) => {
  return (
    <nav
      className={`fixed right-0 h-full top-0 px-4 bg-black text-white py-20 w-3/4 md:w-1/4 transition-all duration-1000 z-30 flex-col shadow-2xl shadow-sky-900 rounded-sm`}
    >
      <ul className={`mt-8 text-sm translate-y-10 `}>
        <li>
          <Link href="/dashboard/questions">
            <button
              onClick={toggleHamburguer}
              className="hover:scale-105 font-bold hover:duration-75 p-1 rounded-sm"
            >
              Perguntas
            </button>
          </Link>
        </li>

        <li>
          <Link href="ranking">
            <button
              onClick={toggleHamburguer}
              className="hover:scale-105 font-bold mb-4 hover:duration-75 p-1 rounded-sm"
            >
              Ranking
            </button>
          </Link>
        </li>

        <div
          className={`drop-shadow-lg h-0.5 mx-1 bg-white rounded-2xl w-1/2 mt-4`}
        ></div>
      </ul>
    </nav>
  );
};
