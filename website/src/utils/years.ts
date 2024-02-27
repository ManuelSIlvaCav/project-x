export default function years() {
  //Return array from current year to 65 years back
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i > currentYear - 65; i--) {
    years.push({ id: i.toString(), label: i.toString() });
  }
  return years;
}
