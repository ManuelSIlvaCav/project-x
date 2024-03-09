type Props = { description: string } & React.ComponentPropsWithoutRef<"div">;

export default function SectionHeader(props: Props) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-2xl font-semibold leading-6 text-gray-900">
        {props.title}
      </h3>
      <p className="mt-2 max-w-4xl text-base text-gray-500">
        {props.description}
      </p>
    </div>
  );
}
