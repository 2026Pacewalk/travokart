"use client";

import { useState, useTransition } from "react";
import type { Lead } from "@/db/schema";
import { updateLeadStatus, deleteLead } from "@/app/admin/leads/actions";
import { Phone, Mail, XMark } from "@/components/Icons";

export default function LeadRow({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState(lead.status);
  const [, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  const date = lead.createdAt?.split(" ")[0] || lead.createdAt;

  return (
    <tr>
      <td>
        <div className="lead-name">{lead.name || "—"}</div>
        {(lead.tourTitle || lead.destination) && (
          <div className="text-[12px] text-[color:var(--muted)] mt-0.5">
            {lead.tourTitle || lead.destination}
          </div>
        )}
      </td>
      <td className="lead-contact">
        {lead.phone && (
          <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5"><Phone width={12} height={12} /> {lead.phone}</a>
        )}
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 mt-1"><Mail width={12} height={12} /> {lead.email}</a>
        )}
      </td>
      <td><span className="src-pill">{lead.source}</span></td>
      <td className="max-w-[280px]">
        <div className="line-clamp-3 text-[color:var(--muted)]">{lead.message || "—"}</div>
      </td>
      <td className="whitespace-nowrap text-[color:var(--muted)]">{date}</td>
      <td>
        <select
          className="admin-select"
          value={status}
          onChange={(e) => {
            const v = e.target.value;
            setStatus(v);
            startTransition(() => updateLeadStatus(lead.id, v));
          }}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </td>
      <td>
        <button
          className="icon-btn"
          aria-label="Delete lead"
          onClick={() => {
            if (!confirm("Delete this lead?")) return;
            setDeleted(true);
            startTransition(() => deleteLead(lead.id));
          }}
        >
          <XMark width={16} height={16} />
        </button>
      </td>
    </tr>
  );
}
