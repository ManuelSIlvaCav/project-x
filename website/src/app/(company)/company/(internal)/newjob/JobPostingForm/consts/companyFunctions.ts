const functions = [
  "Accounting",
  "Finance",
  "Business Development",
  "Consulting",
  "Engineering",
  "Product Management",
  "Human Resources",
  "Information Technology (IT)",
  "Legal",
  "Marketing",
  "Media, Communications and PR",
  "Operations",
  "Program & Project Management",
  "Quality Assurance",
  "Sales",
  "Customer Service",
];

const companyFunctions = functions.map((functionName, index) => ({
  id: `${index + 1}`,
  label: functionName,
}));

export default companyFunctions;
