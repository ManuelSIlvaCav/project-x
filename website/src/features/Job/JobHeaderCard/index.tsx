import Image from "next/image";

export default function JobHeaderCard() {
  return (
    <>
      {/* The content is two sides with vertical separator
    On left side 
    - role name 
    - seniority
    - location
    - job type
    - office schedule
    On the right side information about the company
    - Company name
    - Company logo
    - Company description
    - Company website and size
    - Company industry

*/}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col justify-between">
          <div className="flex">
            <h3 className="font-bold text-2xl">
              Role name, <span>CompanyName</span>
            </h3>
            <h3 className="font-bold text-2xl"></h3>
          </div>

          <p>Job type</p>
          <div className="flex flex-row">
            <p>Location</p>
          </div>
          <p>2-3 days in the office</p>
        </div>
        <div className="border-l-2" />
        <div className="flex flex-col">
          <Image
            src="https://via.placeholder.com/150"
            alt="Company logo"
            width={150}
            height={150}
          />
          <h1>Company name</h1>

          <p>Company description</p>
          <p>Company website and size</p>
          <p>Company industry</p>
        </div>
      </div>
    </>
  );
}
