import Card from "@/components/Card";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";

export default function MainHeaderCard() {
  //Get profile here for main information
  return (
    <div>
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profile Name</h1>
            <p className="text-gray-500">Company name</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex h-6 gap-2">
              <MapPinIcon />
              <span>Location</span>
            </div>
            <div className="flex h-6 gap-2">
              <PhoneIcon />
              <span>Number</span>
            </div>
            <div className="flex h-6 gap-2">
              <EnvelopeIcon />
              <span>Email</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
