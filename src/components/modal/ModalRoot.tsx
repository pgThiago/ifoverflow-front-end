"use client";

interface ModalRootProps {
  children: React.ReactNode;
}

export const ModalRoot = ({ children }: ModalRootProps) => {
  return (
    <>
      <div className="fixed w-full bg-sky-950 h-full bg-opacity-40 z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <section className="shadow-2xl bg-black w-full md:w-1/2 rounded-md p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        {children}
      </section>
    </>
  );
};
