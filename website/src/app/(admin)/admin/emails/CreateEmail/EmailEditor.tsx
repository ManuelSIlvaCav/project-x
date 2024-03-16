"use client";

import dynamic from "next/dynamic";
import { forwardRef, useRef } from "react";

type Props = {};

const params = {
  locale: "es-ES",
  mergeTags: {
    user: {
      name: "Cliente",
      mergeTags: {
        first_name: {
          name: "Nombre",
          value: "{{user.profile.firstName}}",
          sample: "Pedro",
        },
        last_name: {
          name: "Apellido",
          value: "{{user.profile.lastName}}",
          sample: "Roiter",
        },
      },
    },
  },
};

const WrappedEditor = dynamic(() => import("./WrappedEditor"), {
  ssr: false,
});

const ForwardRefEditor = forwardRef(function ForwardRefEditor(
  props: any,
  ref: any
) {
  return <WrappedEditor {...props} editorRef={ref} />;
});

export default function EmailEditorComponent(props: Props) {
  const emailEditorRef = useRef<any>(null);

  const exportHtml = () => {
    emailEditorRef?.current?.editor?.exportHtml(
      (data: { design: any; html: any }) => {
        const { design, html } = data;
        console.log("exportHtml", html);
      }
    );
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    setMergeTags();
    loadDesign({});
    console.log("onReady");
  };

  const setMergeTags = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.setMergeTags(params.mergeTags);
    }
  };

  const loadDesign = (template: {}) => {
    if (emailEditorRef.current && template && Object.keys(template).length) {
      return emailEditorRef.current.editor.loadDesign(template);
    }
    return emailEditorRef?.current?.editor?.loadBlank({
      backgroundColor: "#fff",
    });
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <ForwardRefEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
      {/* <DynamicEmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      /> */}
    </div>
  );
}
