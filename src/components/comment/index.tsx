import { ICommentItemProps } from "@/interfaces";
import { CustomEditor } from "../customEditor";

export const Comment = ({ comment, isOwnerOfComment }: ICommentItemProps) => {
  const commentText = comment?.description;
  const userComment = isOwnerOfComment ? "Você" : comment?.user?.name;

  function formatCommentText(comment: string, username: string) {
    if (comment.includes("<br>")) {
      const formattedText = comment.replace(/<br>$/, "");
      return formattedText?.replace(
        /<\/p>$/,
        `<strong> - ${username}</strong></p>`
      );
    }

    return `${comment} <strong> - ${username}</strong></p>`;
  }

  return (
    <section>
      <CustomEditor
        customStyle=""
        defaultStyle={`
              font-size: 14px; 
              padding: 0px;
              --tw-bg-opacity: 1;
              background-color: rgb(245 245 245 / var(--tw-bg-opacity));
              display: flex;
              caret-color: transparent;
            `}
        defaultValue={formatCommentText(commentText, userComment).replace(
          /<br>/g,
          ""
        )}
      />
    </section>
  );
};
