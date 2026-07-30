/* Brand-accurate payment logos as inline SVG (no external assets). */

const font = "Arial, Helvetica, sans-serif";

export const VisaLogo = () => (
  <svg viewBox="0 0 60 20" role="img" aria-label="Visa">
    <text x="30" y="16" textAnchor="middle" fontFamily={font} fontSize="18" fontWeight="800" fontStyle="italic" fill="#1A1F71" letterSpacing="1">VISA</text>
  </svg>
);

export const MastercardLogo = () => (
  <svg viewBox="0 0 44 28" role="img" aria-label="Mastercard">
    <circle cx="17" cy="14" r="10.5" fill="#EB001B" />
    <circle cx="27" cy="14" r="10.5" fill="#F79E1B" />
    <path d="M22 6.1a10.5 10.5 0 0 1 0 15.8 10.5 10.5 0 0 1 0-15.8Z" fill="#FF5F00" />
  </svg>
);

export const RupayLogo = () => (
  <svg viewBox="0 0 66 20" role="img" aria-label="RuPay">
    <text x="1" y="16" fontFamily={font} fontSize="17" fontWeight="800" fontStyle="italic">
      <tspan fill="#1B4DA1">Ru</tspan><tspan fill="#F26D21">Pay</tspan>
    </text>
  </svg>
);

export const UpiLogo = () => (
  <svg viewBox="0 0 46 20" role="img" aria-label="UPI">
    <rect x="0" y="2" width="4" height="16" fill="#F26D21" />
    <rect x="5.5" y="2" width="4" height="16" fill="#0C7C43" />
    <text x="12" y="16" fontFamily={font} fontSize="16" fontWeight="800" fontStyle="italic" fill="#3B4859">UPI</text>
  </svg>
);

export const PaypalLogo = () => (
  <svg viewBox="0 0 74 20" role="img" aria-label="PayPal">
    <text x="1" y="16" fontFamily={font} fontSize="17" fontWeight="800" fontStyle="italic">
      <tspan fill="#003087">Pay</tspan><tspan fill="#009CDE">Pal</tspan>
    </text>
  </svg>
);

export const NetBankingLogo = () => (
  <svg viewBox="0 0 118 22" role="img" aria-label="Net Banking">
    <g fill="#1B4DA1">
      <path d="M2 8 9 3l7 5v1H2V8Z" />
      <rect x="3" y="10" width="2" height="6" />
      <rect x="8" y="10" width="2" height="6" />
      <rect x="13" y="10" width="2" height="6" />
      <rect x="1.5" y="17" width="15" height="2" />
    </g>
    <text x="22" y="16" fontFamily={font} fontSize="12.5" fontWeight="800" fill="#1c2430">Net Banking</text>
  </svg>
);

export const PAYMENT_LOGOS = [
  VisaLogo, MastercardLogo, RupayLogo, UpiLogo, PaypalLogo, NetBankingLogo,
];
