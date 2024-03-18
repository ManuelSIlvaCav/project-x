"use client";

import createEmail from "@/app/lib/actions/emails/createEmail";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

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
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(createEmail, null);
  const [loading, setLoading] = useState(false);

  async function exportHtml() {
    return new Promise<{ html: any; design: any }>((resolve, reject) => {
      emailEditorRef?.current?.editor?.exportHtml(
        (data: { design: any; html: any }) => {
          const { design, html } = data;
          console.log("exportHtml html and design", { html, design });

          resolve({ html, design });
        }
      );
    });
  }

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    //We need to append the html and design to the form data
    const formData = new FormData(e.currentTarget);
    const res = await exportHtml();
    formData.append("htmlContent", res.html);
    formData.append("designContent", JSON.stringify(res.design));
    dispatch(formData);
  }

  console.log("returning state", { state });
  useEffect(() => {
    setLoading(false);
  }, [state]);

  return (
    <div className="flex flex-col w-1/2 gap-8">
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="flex flex-col gap-4">
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField label="Subject" name="subject" />
          </div>

          <div className="w-1/4">
            <Button className="w-full" type="submit" loading={loading}>
              Guardar
            </Button>
          </div>
        </div>
      </form>

      <div>
        <ForwardRefEditor
          ref={emailEditorRef}
          onLoad={onLoad}
          onReady={onReady}
        />
      </div>
    </div>
  );
}
