import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      className="col-span-1 justify-self-center"
      href="/dashboard/questions"
      title="Ver perguntas"
    >
      <p className={`font-extrabold cursor-pointer text-2xl text-white`}>
        IFoverflow
      </p>
    </Link>
  );
};
