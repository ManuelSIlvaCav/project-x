import Job from "@/features/Job";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    modal: string;
  };
};

// This component shows the jobs for both sides in candidate and company profile when they create it and is available on there company profile page
export default function JobPage(props: Props) {
  console.log({ props });
  //const showModal = props?.searchParams?.modal === "true" ? true : false;

  // const headersList = headers();
  // const callbackUrl = headersList.get("x-pathname") ?? "/";

  //console.log({ showModal, callbackUrl });

  return <Job />;
}
