import EmailEditor from "react-email-editor";

export default function WrappedEditor({ editorRef, ...props }: any) {
  return <EmailEditor {...props} ref={editorRef} />;
}
