"use client";

import { FormEvent, useState } from "react";
import { Plane } from "./Icons";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return <p style={{ marginTop: 12, fontWeight: 700 }}>🎉 You&apos;re on the list! Offers are coming your way.</p>;
  }

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
      />
      <button aria-label="Subscribe" type="submit"><Plane width={17} height={17} /></button>
    </form>
  );
}
