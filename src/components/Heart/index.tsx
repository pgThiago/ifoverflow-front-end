import { HeartStraight } from "phosphor-react";

export function Heart({ show }: { show: boolean }) {
  return (
    <HeartStraight
      className={`${
        show ? "block scale-110" : "scale-0"
      } fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse transform transition-transform duration-1000`}
      size={100}
      weight="fill"
      color="red"
    />
  );
}
