"use client";

import { useTransition } from "react";
import { XMark } from "@/components/Icons";

export default function DeleteButton({
  action,
  confirmText = "Delete this item? This cannot be undone.",
}: {
  action: () => void | Promise<void>;
  confirmText?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label="Delete"
      disabled={pending}
      onClick={() => {
        if (confirm(confirmText)) start(() => action());
      }}
    >
      <XMark width={16} height={16} />
    </button>
  );
}
