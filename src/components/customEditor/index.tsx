"use client";

import { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";

export const CustomEditor = ({
  customStyle,
  defaultStyle,
  defaultValue,
  isOwner,
}: {
  customStyle: string;
  defaultStyle: string;
  defaultValue: string;
  isOwner?: boolean;
}) => {
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <SunEditor
        lang={"pt_br"}
        height="auto"
        setDefaultStyle={defaultStyle}
        defaultValue={content}
        setContents={content}
        getSunEditorInstance={getSunEditorInstance}
        readOnly
        hideToolbar
        setOptions={{
          showPathLabel: false,
        }}
      />
      <style>{`        
        .sun-editor {
          background: inherit !important;
          caret-color: transparent !important;
        }     
      `}</style>
    </>
  );
};
