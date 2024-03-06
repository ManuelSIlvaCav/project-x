"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ElementRef } from "react";
import { createPortal } from "react-dom";

export function CustomModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  console.log("opening modal");

  return createPortal(
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-1000">
      <dialog
        ref={dialogRef}
        className="w-4/5 h-auto bg-transparent p-5 relative flex  rounded-lg shadow-lg"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className=" w-12 h-12 cursor-pointer flex items-center justify-center font-medium text-2xl "
        />
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
