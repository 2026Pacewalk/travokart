import { Whatsapp } from "./Icons";

const PHONE = "919872889763"; // +91 98728 89763
const MESSAGE = "Hi Travokart! I'd like to know more about your tour packages.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-fab"
    >
      <span className="wa-pulse" aria-hidden="true" />
      <Whatsapp width={30} height={30} />
      <span className="wa-tip">Chat with us</span>
    </a>
  );
}
