"use client";

import { FormEvent, useMemo, useState } from "react";

type IconName =
  | "plane"
  | "hotel"
  | "bag"
  | "activity"
  | "search"
  | "heart"
  | "user"
  | "pin"
  | "calendar"
  | "users"
  | "arrow"
  | "shield"
  | "headset"
  | "lock"
  | "refresh"
  | "star"
  | "quote"
  | "mail"
  | "phone"
  | "menu"
  | "close";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    plane: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    hotel: <><path d="M3 21V5h10v16M13 9h8v12M7 9h2M7 13h2M7 17h2M17 13h1M17 17h1M2 21h20"/></>,
    bag: <><rect x="4" y="7" width="16" height="14" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M4 12h16"/></>,
    activity: <><path d="M8 3h8l1 4H7l1-4Z"/><path d="M5 7h14l2 14H3L5 7Z"/><path d="M9 11h6M12 8v6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M19 21a7 7 0 0 0-3-5.7"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    headset: <><path d="M4 14a8 8 0 0 1 16 0"/><path d="M4 14v4a2 2 0 0 0 2 2h2v-8H6a2 2 0 0 0-2 2ZM20 14v4a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 2Z"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    refresh: <><path d="M20 6v6h-6"/><path d="M4 18v-6h6"/><path d="M6.5 7a8 8 0 0 1 13 3M17.5 17a8 8 0 0 1-13-3"/></>,
    star: <path d="m12 2 3 6 6.5 1-4.8 4.6 1.2 6.4-5.9-3-5.9 3 1.2-6.4L2.5 9 9 8l3-6Z"/>,
    quote: <><path d="M10 11H5a4 4 0 0 0 4 4v4H5v-4a8 8 0 0 1 5-8v4ZM21 11h-5a4 4 0 0 0 4 4v4h-4v-4a8 8 0 0 1 5-8v4Z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 2 2.3Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const destinations = [
  { city: "Paris, France", price: "$499", save: "-30%", pos: "0% 50%" },
  { city: "Bali, Indonesia", price: "$599", save: "-25%", pos: "25% 50%" },
  { city: "Dubai, UAE", price: "$699", save: "-20%", pos: "50% 50%" },
  { city: "Maldives", price: "$799", save: "-35%", pos: "75% 50%" },
  { city: "Switzerland", price: "$899", save: "-25%", pos: "100% 50%" },
];

const deals = [
  { title: "Greece Tour", duration: "5 Days / 4 Nights", old: "$899", price: "$629", badge: "Best Seller", pos: "0% 50%" },
  { title: "Thailand Escape", duration: "6 Days / 5 Nights", old: "$749", price: "$529", badge: "Hot Deal", pos: "50% 50%" },
  { title: "Japan Discovery", duration: "7 Days / 6 Nights", old: "$1299", price: "$899", badge: "New Offer", pos: "100% 50%" },
];

const reviews = [
  { name: "Sophia Williams", role: "London, UK", initials: "SW", text: "Travelora made our vacation absolutely perfect! Best service and great deals." },
  { name: "James Anderson", role: "Toronto, CA", initials: "JA", text: "Amazing experience and very easy booking process. Highly recommended!" },
  { name: "Olivia Martinez", role: "Madrid, ES", initials: "OM", text: "Customer support was awesome and our trip was unforgettable!" },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Flights");
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");

  const tabConfig = useMemo(() => ({
    Flights: { icon: "plane" as IconName, from: "New York (NYC)", to: "Paris, France" },
    Hotels: { icon: "hotel" as IconName, from: "Paris, France", to: "2 Rooms" },
    Packages: { icon: "bag" as IconName, from: "New York (NYC)", to: "Bali, Indonesia" },
    Activities: { icon: "activity" as IconName, from: "Dubai, UAE", to: "Desert Safari" },
  }), []);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    flash(`${activeTab} search is ready — showing the best available options.`);
  }

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      flash("Please enter a valid email address.");
      return;
    }
    setEmail("");
    flash("You’re on the list! Exclusive offers are coming your way.");
  }

  const selected = tabConfig[activeTab as keyof typeof tabConfig];

  return (
    <main>
      <div className="topbar">
        <div className="shell topbar-inner">
          <span>✈ Free cancellation</span><span>🏆 Best price guarantee</span><span>✉ Secure booking</span><span>◉ 24/7 Customer support</span>
        </div>
      </div>

      <header className="nav-wrap">
        <div className="shell nav-inner">
          <a className="brand" href="#home" aria-label="Travelora home">
            <span className="brand-mark"><Icon name="plane" size={26}/></span>
            <span><strong>Travelora</strong><small>Explore More. Worry Less.</small></span>
          </a>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            <Icon name={mobileOpen ? "close" : "menu"} size={24}/>
          </button>
          <nav className={mobileOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            {[["Home", "#home"], ["Destinations", "#destinations"], ["Packages", "#deals"], ["Hotels", "#search"], ["Flights", "#search"], ["Blog", "#reviews"], ["About Us", "#why-us"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} className={label === "Home" ? "active" : ""} onClick={() => setMobileOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button aria-label="Search"><Icon name="search"/></button>
            <button aria-label="Saved trips" className={saved ? "is-saved" : ""} onClick={() => setSaved(!saved)}><Icon name="heart"/></button>
            <button aria-label="Account"><Icon name="user"/></button>
            <a className="book-button" href="#search"><Icon name="plane" size={15}/> Book Now</a>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay"/>
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Your next story starts here</span>
            <h1>Explore the World<br/>Create <em>Memories</em></h1>
            <p>Discover amazing places at exclusive prices and unforgettable experiences.</p>
            <div className="hero-buttons">
              <a className="primary-button" href="#destinations">Explore Destinations <Icon name="arrow" size={17}/></a>
              <a className="secondary-button" href="#deals">View Packages</a>
            </div>
            <div className="trust-row">
              <div className="avatar-stack"><span>A</span><span>M</span><span>R</span><span>K</span></div>
              <span>Trusted by 250,000+ happy travelers</span>
            </div>
          </div>
          <div className="offer-card">
            <span>✦ Special Offer</span><small>Get up to</small><strong>30% OFF</strong><small>on all bookings</small>
          </div>
        </div>
      </section>

      <section className="shell search-wrap" id="search">
        <form className="search-card" onSubmit={handleSearch}>
          <div className="search-tabs" role="tablist" aria-label="Search category">
            {Object.entries(tabConfig).map(([tab, config]) => (
              <button type="button" key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                <span className={`tab-icon ${tab.toLowerCase()}`}><Icon name={config.icon} size={17}/></span>{tab}
              </button>
            ))}
          </div>
          <div className="search-fields">
            <label><span>From</span><strong><Icon name="pin" size={14}/>{selected.from}</strong></label>
            <label><span>To</span><strong><Icon name="pin" size={14}/>{selected.to}</strong></label>
            <label><span>Check-in</span><strong>May 20, 2026 <Icon name="calendar" size={14}/></strong></label>
            <label><span>Check-out</span><strong>May 27, 2026 <Icon name="calendar" size={14}/></strong></label>
            <label><span>Travelers</span><strong>2 Adults, 1 Child <Icon name="users" size={14}/></strong></label>
            <button className="search-button" type="submit">Search Now</button>
          </div>
        </form>
      </section>

      <section className="shell section" id="destinations">
        <div className="section-head"><div><span className="mini-plane">✈</span><h2>Popular Destinations</h2></div><a href="#deals">View All Destinations <Icon name="arrow" size={15}/></a></div>
        <div className="destination-grid">
          {destinations.map((item, index) => (
            <article className="destination-card" key={item.city} style={{ backgroundPosition: item.pos }}>
              <span className={`discount discount-${index}`}>{item.save}</span>
              <div className="card-shade"/>
              <div className="destination-info"><h3>{item.city}</h3><p>Starting from <strong>{item.price}</strong></p><div className="stars">★★★★★ <small>4.9</small></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell deals-grid" id="deals">
        <article className="promo-card">
          <div><span>Limited time offers</span><h2>Top Deals<br/>This Week</h2><p>Pack your bags. Your dream trip is closer than you think.</p><a href="#search">Grab Deals <Icon name="arrow" size={15}/></a></div>
          <div className="promo-art"><span className="plane-emoji">✈</span><span className="globe">🌎</span><i/><i/><i/></div>
        </article>
        {deals.map((deal, index) => (
          <article className="deal-card" key={deal.title}>
            <div className="deal-image" style={{ backgroundPosition: deal.pos }}><span className={`deal-badge badge-${index}`}>{deal.badge}</span></div>
            <div className="deal-body"><h3>{deal.title}</h3><p>{deal.duration}</p><div><s>{deal.old}</s><strong>{deal.price}</strong></div><a href="#search">View Details <Icon name="arrow" size={13}/></a></div>
          </article>
        ))}
      </section>

      <section className="shell perks" id="why-us">
        {[
          ["shield", "Best Price", "Guarantee", "amber"], ["headset", "24/7 Support", "We are here", "green"], ["lock", "Secure Booking", "100% safe", "red"], ["refresh", "Easy Cancellation", "Hassle-free", "mint"], ["star", "Handpicked Hotels", "Top Rated", "purple"],
        ].map(([icon, title, sub, tone]) => (
          <div className="perk" key={title}><span className={`perk-icon ${tone}`}><Icon name={icon as IconName}/></span><span><strong>{title}</strong><small>{sub}</small></span></div>
        ))}
      </section>

      <section className="reviews-section" id="reviews">
        <div className="shell">
          <div className="section-head"><div><span className="mini-plane">✈</span><h2>What Our Travelers Say</h2></div></div>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <article className="review-card" key={review.name}>
                <Icon name="quote" size={25}/><p>{review.text}</p>
                <div className="review-person"><span className={`review-avatar avatar-${index}`}>{review.initials}</span><div><strong>{review.name}</strong><small>{review.role}</small><div className="stars">★★★★★</div></div></div>
              </article>
            ))}
            <article className="newsletter-card">
              <div className="newsletter-content"><span>Members-only savings</span><h2>Get Exclusive Offers<br/>& Travel Inspiration</h2><p>Subscribe to our newsletter</p>
                <form onSubmit={handleSubscribe}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><Icon name="plane" size={17}/></button></form>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="shell footer-grid">
          <div><a className="brand footer-brand" href="#home"><span className="brand-mark"><Icon name="plane" size={25}/></span><span><strong>Travelora</strong><small>Explore More. Worry Less.</small></span></a><p>Your trusted travel partner for unforgettable journeys.</p><div className="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="Twitter">♥</a><a href="#" aria-label="YouTube">▶</a></div></div>
          <div><h3>Company</h3><a href="#why-us">About Us</a><a href="#">Careers</a><a href="#">Blog</a><a href="#">Press</a><a href="#contact">Contact Us</a></div>
          <div><h3>Support</h3><a href="#">FAQs</a><a href="#">Booking Help</a><a href="#">Returns</a><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
          <div><h3>Top Destinations</h3><a href="#destinations">Europe</a><a href="#destinations">Asia</a><a href="#destinations">Americas</a><a href="#destinations">Africa</a><a href="#destinations">Australia</a></div>
          <div><h3>Contact Us</h3><p><Icon name="phone" size={14}/> +1 (800) 123-4567</p><p><Icon name="mail" size={14}/> info@travelora.com</p><p><Icon name="pin" size={14}/> 123 Travelers Street,<br/>New York, USA</p></div>
        </div>
        <div className="footer-bottom"><div className="shell"><span>© 2026 Travelora. All rights reserved.</span><div className="payments"><b>VISA</b><b>●●</b><b>PayPal</b><b>Pay</b></div></div></div>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
