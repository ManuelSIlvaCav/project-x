export default function FieldErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mt-2 text-sm text-red-600" id="email-error">
      {children}
    </p>
  );
}
