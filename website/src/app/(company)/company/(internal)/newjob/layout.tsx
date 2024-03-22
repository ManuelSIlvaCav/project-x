import Script from "next/script";

export default function NewJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
        strategy="beforeInteractive"
      />
    </div>
  );
}
