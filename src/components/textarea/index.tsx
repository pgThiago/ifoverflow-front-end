"use client";

import { removeZeroWidthSpaces } from "@/utils/removeZeroWidthSpaces";
import { stripHtml } from "@/utils/stripHtml";
import { useAuthStore } from "@/zustand/useAuthStore";
import { ErrorMessage } from "@hookform/error-message";
import { X } from "phosphor-react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

interface ITextarea {
  label: string;
  isCommenting: boolean;
  closeTextarea?: () => void;
  backgroundIsBlack?: boolean;
  field: string;
}

export const Textarea = ({
  closeTextarea,
  label,
  isCommenting,
  backgroundIsBlack,
  field,
}: ITextarea) => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const { isAuthenticated } = useAuthStore();

  // const editor = useRef<SunEditorCore>();

  // const getSunEditorInstance = (sunEditor: SunEditorCore) => {
  //   editor.current = sunEditor;
  // };

  const len = removeZeroWidthSpaces(stripHtml(watch(field)))?.length;

  return (
    <section className={`mt-4 b-1 ${isCommenting ? "w-10/12 ml-auto" : ""}`}>
      <div className="flex justify-between">
        <label
          htmlFor="message"
          className={`block mb-2 ${
            backgroundIsBlack ? "text-white" : "text-black"
          }`}
        >
          {label}
        </label>

        {isCommenting && (
          <button onClick={closeTextarea}>
            <X size={20} color="#fff" weight="fill" />
          </button>
        )}
      </div>

      <Controller
        name={field}
        control={control}
        render={({ field }) => (
          <>
            <SunEditor
              lang={"pt_br"}
              placeholder="Digite aqui..."
              // getSunEditorInstance={getSunEditorInstance}
              height="150px"
              setDefaultStyle="
              font-size: 16px; 
              caret-color: black; 
              border: 1px solid #cecece; 
              cursor: auto; 
              padding: 8px;"
              {...field}
              setOptions={{
                showPathLabel: false,
                mode: "balloon-always",
                maxCharCount: 1000,
              }}
            />
          </>
        )}
      />
      <span
        className={`block mb-2 ${
          backgroundIsBlack ? "text-white" : "text-black"
        } text-sm`}
      >
        {`${len} / 1000`}
      </span>
      <ErrorMessage
        errors={errors}
        name={field}
        render={({ message }) =>
          message && <p className="text-red-500 text-xs mt-2">{message}</p>
        }
      />

      {isAuthenticated ? (
        <div className="flex justify-end">
          <button
            disabled={Object.keys(errors).length > 0}
            type="submit"
            className={`cursor-pointer ${
              backgroundIsBlack
                ? "bg-white text-black hover:bg-black hover:text-white"
                : "bg-black hover:bg-white text-white hover:text-black"
            } font-bold p-2 rounded-md text-sm md:text-md text-justify`}
          >
            Publicar
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            disabled={Object.keys(errors).length > 0}
            type="button"
            onClick={() => {
              toast("Faça login para interagir");
            }}
            className={`cursor-pointer ${
              backgroundIsBlack
                ? "bg-white text-black hover:bg-black hover:text-white"
                : "bg-black hover:bg-white text-white hover:text-black"
            } font-bold p-2 rounded-md text-sm md:text-md text-justify`}
          >
            Publicar
          </button>
        </div>
      )}
    </section>
  );
};
