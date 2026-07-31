import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Travel Expert",
  description:
    "Partner with Travokart — sign up as a travel agent to list your tour packages, reach thousands of travellers, and grow your travel business.",
  alternates: { canonical: "/become-expert" },
  openGraph: {
    title: "Become a Travel Expert | Travokart",
    description:
      "Sign up as a travel agent partner or create a free account to unlock exclusive deals and manage your bookings.",
    url: "/become-expert",
  },
};

export default function BecomeExpertLayout({ children }: { children: React.ReactNode }) {
  return children;
}
