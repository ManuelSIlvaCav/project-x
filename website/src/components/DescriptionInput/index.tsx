"use client";

import { FormEvent } from "react";
import TextArea from "../TextArea";

type Props = {} & Omit<React.ComponentPropsWithoutRef<"textarea">, "id"> & {
    label?: string;
    name: string;
    description?: string;
    placeholder?: string;
    errorMessage?: string | null;
  };

export default function DescriptionInput(props: Props) {
  let previousLength = 0;

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    //console.log("handleing", e.currentTarget.value);
    const bullet = "\u2022";
    const newLength = e.currentTarget.value.length;

    const characterCode = e.currentTarget.value
      .substring(newLength - 1, newLength)
      .charCodeAt(0);

    if (newLength > previousLength) {
      if (characterCode === 10) {
        e.currentTarget.value = `${e.currentTarget.value}${bullet} `;
      } else if (newLength === 1) {
        e.currentTarget.value = `${bullet} ${e.currentTarget.value}`;
      }
    }
    previousLength = newLength;
  };

  return (
    <TextArea
      label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      wrap={"hard"}
      cols={props.cols ?? 30}
      rows={props.rows ?? 4}
      onInput={handleInput}
    />
  );
}
