import Image from "next/image";
import Link from "next/link";
import { LinkedinLogo } from "phosphor-react";

export const Footer = () => {
  return (
    <footer className="p-4 mt-16 min-w-full bg-black rounded-sm shadow-2xl shadow-sky-900 md:px-6 md:py-8 ">
      <div className="flex flex-col items-center justify-between">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/thiago-silva-dev/"
            className="flex items-center justify-center mb-4 text-white"
          >
            <span className="hover:underline mr-2 text-xs md:text-md">
              Thiago
            </span>
            <LinkedinLogo color="#fff" size={16} weight="fill" />
          </Link>
          <Link href="/dashboard/questions" className="flex items-center mb-4">
            <Image
              width={50}
              height={50}
              src="/sign-in.svg"
              priority
              alt="IFoverflow Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              IFoverflow
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/ewertonbelo/"
            className="flex items-center justify-center mb-4 text-white"
          >
            <span className="hover:underline mr-2 text-xs md:text-md">
              Ewerton
            </span>
            <LinkedinLogo color="#fff" size={16} weight="fill" />
          </Link>
        </div>

        <ul className="flex w-full items-center justify-center gap-8 text-sm text-white">
          <li className="hover:underline">
            <Link href="/dashboard/questions/about">Sobre</Link>
          </li>
          <li className="hover:underline">
            <Link href="/dashboard/questions/privacy">
              Política de privacidade
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/dashboard/questions/license">Licenciamento</Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-white mx-auto" />
      <span className="text-sm flex flex-col text-white text-center">
        <Link href="/dashboard/questions" className="hover:underline">
          © 2023 IFoverflow™.
        </Link>
        <span>Todos os direitos reservados.</span>
      </span>
    </footer>
  );
};
