"use client";

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function Privacy() {
  const { back } = useRouter();
  return (
    <div className="bg-black text-white p-8 flex flex-col justify-center w-4/5 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <strong>Política de privacidade:</strong>
      <p className="text-justify mt-4">
        A privacidade dos nossos usuários é uma prioridade fundamental no
        IFoverflow. Comprometemo-nos a proteger todas as informações pessoais
        compartilhadas conosco. Nossa política de privacidade detalha como
        coletamos, usamos e protegemos seus dados. Valorizamos a transparência e
        a confiança
      </p>
      <Button onClick={() => back()} className="mt-8" color="info">
        Entendi
      </Button>
    </div>
  );
}
