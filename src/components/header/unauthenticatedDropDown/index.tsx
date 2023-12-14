import Link from "next/link";

export const UnauthenticatedDropDown = ({
  toggleHamburguer,
}: {
  toggleHamburguer: () => void;
}) => {
  return (
    <>
      <nav
        className={`fixed right-0 h-full top-0 px-4 text-white bg-black py-20 w-3/4 md:w-1/4 transition-all duration-1000 z-30 flex-col shadow-2xl shadow-sky-900 rounded-sm`}
      >
        <ul className={`mt-8 text-sm translate-y-10`}>
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
            <Link href="/dashboard/ranking">
              <button
                onClick={toggleHamburguer}
                className="hover:scale-105 font-bold mb-4 hover:duration-75 p-1 rounded-sm"
              >
                Ranking
              </button>
            </Link>
          </li>

          <div
            className={`h-0.5 mx-1 shadow-2xl shadow-sky-900 border-b w-1/2 mt-4`}
          ></div>

          <li>
            <Link href="/">
              <button
                onClick={toggleHamburguer}
                className="hover:scale-105 font-bold hover:duration-75 p-1 rounded-sm mt-2"
              >
                Entrar
              </button>
            </Link>
          </li>
          <li>
            <Link
              href="/sign-up"
              onClick={toggleHamburguer}
              className="hover:scale-105 font-bold hover:duration-75 p-1 rounded-sm"
            >
              Criar conta
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
