//Role description as work experience description should be an array of strings

const roleDescriptions = [
  {
    value: `Collaborate closely with software engineers representing other disciplines to build amazing experiences from top to bottom`,
  },
  {
    value: `Leverage your technical expertise and interpersonal skills to help the team make great implementation decisions together, including active participation in code reviews and other software lifecycle activities`,
  },
  { value: `Work in a fast-paced, self-directed, agile environment` },
  { value: `Research and evaluate new technologies and tools` },
  {
    value: `Contribute to new feature development, maintenance, and architectural activities`,
  },
  {
    value: `Actively participate in the iOS guild with fellow engineers to develop better organization-wide development practices and solve hard problems`,
  },
  {
    value: `Participate in a quarterly "Innovation Week" and work on innovative projects of your choice`,
  },
  {
    value: `Put smart home products in your own home and experience your work product firsthand`,
  },
];

export default function JobContent() {
  return (
    <div>
      <div>
        <div className="text-2xl font-bold">Role Description</div>
        {/* We create a custom bullet for each role description bullet */}
        <div>
          {" "}
          <ul>
            {roleDescriptions?.map((description, index) => {
              return <li key={index}>{"\u2022" + " " + description?.value}</li>;
            })}
          </ul>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold">Who are you</div>
        {/* We create a custom bullet for each role description bullet */}
        <div>
          {" "}
          <ul>
            {roleDescriptions?.map((description, index) => {
              return <li key={index}>{"\u2022" + " " + description?.value}</li>;
            })}
          </ul>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold">Who are you</div>
        {/* We create a custom bullet for each role description bullet */}
        <div>
          {" "}
          <ul>
            {roleDescriptions?.map((description, index) => {
              return <li key={index}>{"\u2022" + " " + description?.value}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
