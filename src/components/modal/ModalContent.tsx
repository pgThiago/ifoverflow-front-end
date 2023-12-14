interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent = ({ children }: ModalContentProps) => {
  return <main className="flex flex-col my-2">{children}</main>;
};
