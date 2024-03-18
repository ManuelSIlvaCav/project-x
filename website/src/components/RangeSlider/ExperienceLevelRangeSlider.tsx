import MultiRangeSlider from ".";

type Props = {
  min: number;
  max: number;
  onChange: Function;
  title: string;
  step: number;
};

export default function ExperienceLevelRangeSlider(props: Props) {
  return <MultiRangeSlider {...props} />;
}
