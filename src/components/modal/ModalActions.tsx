interface ModalActionsProps {
  children: React.ReactNode;
}

export const ModalActions = ({ children }: ModalActionsProps) => {
  return (
    <footer className="w-full flex justify-end gap-2 mt-8">{children}</footer>
  );
};
