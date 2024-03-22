"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

type Props = {
  min: number;
  max: number;
  onChange: Function;
  title: string;
  step: number;
  valuesName?: Record<number, string>;
};

export default function MultiRangeSlider({
  min,
  max,
  onChange,
  title,
  step,
  valuesName,
}: Props) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="flex flex-col h-[10vh]">
      <div className="pb-4">
        <p className="block text-sm font-medium leading-6 text-gray-900">
          {title}
        </p>
      </div>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={step}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{`${
            valuesName ? valuesName[minVal] : minVal
          }`}</div>
          <div className="slider__right-value">{`${
            valuesName ? valuesName[maxVal] : maxVal
          }`}</div>
        </div>
      </div>
    </div>
  );
}
