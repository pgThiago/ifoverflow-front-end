import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  const linkClass =
    "flex justify-center bg-none mt-4 hover:bg-black hover:brightness-110 py-2 border text-xs text-white leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-1/2 md:w-1/4";
  return (
    <div className="flex items-center justify-center h-full w-full bg-black">
      <div className="flex flex-col items-center justify-center w-full">
        <span className="text-white tex-2xl mb-8">
          Opa, essa rota não existe por aqui
        </span>
        <Image width={200} height={200} src="/404.svg" alt="not-found" />
        <Link className={linkClass} href="/">
          Voltar para fazer login
        </Link>
        <Link className={linkClass} href="/dashboard/questions">
          Voltar para plataforma
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
