"use client";

import { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  // Close dialog when user clicks outside or presses ESC
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onCancel(e: Event) {
      e.preventDefault();
      onClose();
    }
    dialog.addEventListener("cancel", onCancel);

    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="modal" onClick={e => {
      // Close modal if backdrop clicked (outside modal-box)
    //   if (e.target === dialogRef.current) onClose();
    }}>
      <div  className="w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg p-3 sm:p-4 relative mx-auto"
       onClick={e => e.stopPropagation()}>
        {/* Title */}
        {title && <h3 className="font-bold text-lg">{title}</h3>}

        {/* Content */}
        <div className="py-4 p-3">{children}</div>


        {/* Optional Close button top-right */}
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="btn btn-s btn-circle absolute right-4 top-4 text-2xl"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
}
