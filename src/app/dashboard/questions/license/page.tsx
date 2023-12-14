"use client";

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function License() {
  const { back } = useRouter();
  return (
    <div className="bg-black text-white p-8 flex flex-col justify-center w-4/5 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <strong>Licenciamento:</strong>
      <p className="text-justify mt-4">
        Aqui no IFoverflow, acreditamos na disseminação do conhecimento.
        Portanto, nossa plataforma é regida por uma licença aberta que permite o
        uso e compartilhamento livre das informações e contribuições de nossos
        usuários. Esta licença promove a colaboração e a livre troca de ideias
      </p>
      <Button onClick={() => back()} className="mt-8" color="info">
        Entendi
      </Button>
    </div>
  );
}
