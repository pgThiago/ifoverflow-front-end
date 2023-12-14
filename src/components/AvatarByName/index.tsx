"use client";

import Avatar, { ReactAvatarProps } from "react-avatar";

export const AvatarByName = ({ ...config }: ReactAvatarProps) => {
  return <Avatar {...config} />;
};
