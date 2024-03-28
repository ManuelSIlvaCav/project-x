const monthsNameList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const monthValueName: Record<string, string> = {
  ...monthsNameList.reduce((acc, month, index) => {
    const key = (index + 1).toString();
    return { ...acc, [key]: month };
  }, {}),
};

export function getMonthObject(month: number | undefined) {
  if (!month) return undefined;
  return { id: month.toString(), label: monthValueName[month.toString()] };
}

export default function months() {
  return monthsNameList.map((month, index) => ({
    id: (index + 1).toString(),
    label: month,
  }));
}
