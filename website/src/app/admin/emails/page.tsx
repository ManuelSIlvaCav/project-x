import getEmails from "@/app/lib/actions/emails/getEmails";
import { Button } from "@/components/Button";
import Table from "@/components/Table";

export default async function EmailsPage() {
  const emailTemplates = await getEmails();
  console.log({ emailTemplates });
  return (
    <div>
      <Table
        title="Emails"
        description="Manage the emails tempates for our users"
        topRightButton={
          <Button href={"/admin/emails/create"}>Add email</Button>
        }
        columns={[]}
        data={[]}
      />
    </div>
  );
}
