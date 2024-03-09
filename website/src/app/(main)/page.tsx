import { Pricing } from "@/components/Pricing";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { MultipleFeaturesSection } from "./MultipleFeaturesSection";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("in home", { session });
  return (
    <>
      <MultipleFeaturesSection />
      <Pricing />
    </>
  );
}
