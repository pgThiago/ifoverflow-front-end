"use client";

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function About() {
  const { back } = useRouter();
  return (
    <div className="bg-black text-white p-8 flex flex-col justify-center w-4/5 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <strong>Sobre IFoverflow:</strong>
      <p className="text-justify mt-4">
        Bem-vindo ao IFoverflow, uma plataforma inovadora de perguntas e
        respostas que utiliza a teoria do caos para gerar conhecimento. Nossa
        missão é criar um ambiente dinâmico e colaborativo onde as mentes
        curiosas podem se conectar, compartilhar conhecimento e explorar o mundo
        da informação de forma caótica, mas organizada. Aqui, a desordem se
        transforma em insights valiosos, e a complexidade se traduz em
        descobertas fascinantes. Junte-se a nós nesta jornada pelo universo do
        conhecimento.
      </p>
      <Button onClick={() => back()} className="mt-8" color="info">
        Entendi
      </Button>
    </div>
  );
}
