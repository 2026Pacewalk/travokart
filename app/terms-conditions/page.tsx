import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing bookings and use of Explore Travokart Vocations LLP services.",
  alternates: { canonical: "/terms-conditions" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    paras: [
      "By accessing our website and booking any tour package or service with Explore Travokart Vocations LLP, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
    ],
  },
  {
    id: "bookings",
    heading: "Bookings & Payments",
    list: [
      "All bookings are subject to availability and confirmation by Travokart.",
      "A booking is confirmed only after receipt of the required advance or full payment.",
      "Prices are quoted per person and may vary based on travel dates, group size, and inclusions.",
      "Full payment must be completed before the commencement of the tour unless otherwise agreed.",
    ],
  },
  {
    id: "pricing",
    heading: "Pricing & Inclusions",
    paras: [
      "Package prices include the services explicitly listed on each tour page. Anything not mentioned as included is considered excluded (for example, flights, personal expenses, visa fees, and applicable taxes such as GST). Prices are subject to change due to currency fluctuations, fuel surcharges, or changes by suppliers until the booking is confirmed.",
    ],
  },
  {
    id: "cancellation",
    heading: "Cancellation & Refunds",
    paras: ["Cancellation charges depend on how far in advance you cancel and on supplier policies:"],
    list: [
      "Cancellation requests must be submitted in writing via email or phone.",
      "Cancellation charges may apply as per the policy shared at the time of booking.",
      "Refunds, where applicable, are processed within a reasonable time to the original payment method.",
      "Certain bookings (special fares, non-refundable hotels, peak-season packages) may be non-refundable.",
    ],
  },
  {
    id: "documents",
    heading: "Travel Documents & Responsibilities",
    paras: [
      "It is the traveller's responsibility to carry valid identification, passports, visas, and any other documents required for the journey. Travokart is not liable for any loss arising from missing, invalid, or expired documents.",
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    paras: [
      "Travokart acts as a facilitator between travellers and service providers such as hotels, airlines, and transport operators. We are not liable for any injury, loss, delay, or damage caused by these third-party providers or by events beyond our control.",
    ],
  },
  {
    id: "force-majeure",
    heading: "Force Majeure",
    paras: [
      "Travokart shall not be responsible for any failure or delay in providing services due to circumstances beyond our control, including natural disasters, strikes, political unrest, pandemics, or government restrictions.",
    ],
  },
  {
    id: "conduct",
    heading: "Traveller Conduct",
    paras: [
      "Travellers are expected to behave responsibly and respect local laws and customs. Travokart reserves the right to decline service to anyone whose conduct endangers the safety or enjoyment of others, without any refund.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    paras: [
      "All content on this website — including text, images, logos, and design — is the property of Explore Travokart Vocations LLP and may not be reproduced without written permission.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    paras: [
      "These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Panchkula, Haryana.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 2025"
      intro="Please read these Terms & Conditions carefully before booking with Explore Travokart Vocations LLP. They set out the rules that govern your use of our website and travel services."
      sections={sections}
      image="/media/2025/12/thailand-2.jpg"
    />
  );
}
