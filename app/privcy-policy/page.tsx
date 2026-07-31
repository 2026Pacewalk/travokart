import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Explore Travokart Vocations LLP collects, uses, and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    paras: ["To provide our travel services, we may collect the following types of information from you:"],
    list: [
      "Personal details such as your name, email address, phone number, and postal address.",
      "Travel preferences, passport and ID details required for bookings, and traveller information.",
      "Payment information processed securely through trusted payment gateways.",
      "Technical data such as your IP address, browser type, and how you use our website.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    paras: ["We use the information we collect to:"],
    list: [
      "Process and confirm your tour bookings, payments, and travel arrangements.",
      "Communicate with you about your enquiries, reservations, and support requests.",
      "Personalise your experience and recommend relevant tour packages and offers.",
      "Improve our website, services, and customer support.",
      "Comply with legal and regulatory obligations.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing Your Information",
    paras: [
      "We do not sell your personal information. We may share it with trusted partners strictly to fulfil your booking — including hotels, airlines, transport providers, and payment processors.",
      "We may also disclose information where required by law or to protect the rights, safety, and property of Travokart and its customers.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies & Tracking",
    paras: [
      "Our website uses cookies and similar technologies to remember your preferences, analyse traffic, and improve your browsing experience. You can control or disable cookies through your browser settings, though some features may not function properly as a result.",
    ],
  },
  {
    id: "data-security",
    heading: "Data Security",
    paras: [
      "We implement appropriate technical and organisational measures to safeguard your personal information against unauthorised access, alteration, disclosure, or destruction. While we strive to protect your data, no method of transmission over the internet is completely secure.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    paras: ["You have the right to:"],
    list: [
      "Access, update, or correct the personal information we hold about you.",
      "Request deletion of your personal data, subject to legal obligations.",
      "Opt out of marketing communications at any time.",
    ],
  },
  {
    id: "third-party",
    heading: "Third-Party Links",
    paras: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    paras: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review it periodically.",
    ],
  },
  {
    id: "contact",
    heading: "Contact Us",
    paras: [
      `If you have any questions about this Privacy Policy or how your data is handled, please contact us at ${site.email} or call ${site.phone}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2025"
      intro="At Explore Travokart Vocations LLP, your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website and travel services."
      sections={sections}
    />
  );
}
