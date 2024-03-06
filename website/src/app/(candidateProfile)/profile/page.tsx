import { type Metadata } from "next";
import CandidateProfile from "./CandidateProfile";
import { ProfileLayout } from "./ProfileLayout";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <>
        <CandidateProfile />
      </>
    </ProfileLayout>
  );
}
