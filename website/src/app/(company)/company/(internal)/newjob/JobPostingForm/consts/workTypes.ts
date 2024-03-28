const types = ["Remote", "Onsite", "Hybrid"];

const workTypes = types.map((type, index) => ({
  id: `${index + 1}`,
  label: type,
}));

export default workTypes;
