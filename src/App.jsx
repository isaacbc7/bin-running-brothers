import { useMemo, useState } from "react";

export default function BinRunnersSite() {
  return (
    <div className="min-h-screen bg-[#F6F3E7] text-neutral-900">
      <Header />
      <main>
        <Hero />
        <Logos />
        <HowItWorks />
        <Estimator />
        <Plans />
        <ServiceArea />
        <TechSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  
    return (
      <header
        className="
          sticky top-0 z-50
          backdrop-blur-md supports-[backdrop-filter]:bg-[#F6F3E780]
          bg-[#F6F3E7]
          border-b border-neutral-200/60
        "
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* LOGO + TITLE */}
          <a href="#home" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#154734]" />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-xl">The Bin Runners</div>
              <div className="text-xs text-neutral-600">Trash can valet</div>
            </div>
          </a>
  
          {/* DESKTOP NAV (hidden on mobile, shows on md and up) */}
          <nav className="only-desktop items-center gap-6 text-sm text-neutral-900">
            <a href="#how" className="hover:text-[#154734]">How it works</a>
            <a href="#estimator" className="hover:text-[#154734]">Estimate</a>
            <a href="#plans" className="hover:text-[#154734]">Plans</a>
            <a href="#service" className="hover:text-[#154734]">Service area</a>
            <a href="#faq" className="hover:text-[#154734]">FAQ</a>
            <a
              href="#contact"
              className="rounded-full bg-[#154734] text-white px-4 py-2 font-medium shadow-sm hover:opacity-90"
            >
              Get started
            </a>
          </nav>
  
          {/* MOBILE HAMBURGER (visible only below md) */}
          <button aria-label="Menu" className="hide-desktop p-2" onClick={() => setOpen((v) => !v)}>
            
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M3.75 6.75h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75z" />
            </svg>
          </button>
        </div>
  
        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-neutral-200/60 supports-[backdrop-filter]:bg-[#F6F3E780] bg-[#F6F3E7]">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-3 space-y-3 text-sm">
              <a href="#how" className="block hover:text-[#154734]" onClick={() => setOpen(false)}>How it works</a>
              <a href="#estimator" className="block hover:text-[#154734]" onClick={() => setOpen(false)}>Estimate</a>
              <a href="#plans" className="block hover:text-[#154734]" onClick={() => setOpen(false)}>Plans</a>
              <a href="#service" className="block hover:text-[#154734]" onClick={() => setOpen(false)}>Service area</a>
              <a href="#faq" className="block hover:text-[#154734]" onClick={() => setOpen(false)}>FAQ</a>
              <a
                href="#contact"
                className="inline-block rounded-full bg-[#154734] text-white px-4 py-2 font-medium shadow-sm"
                onClick={() => setOpen(false)}
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </header>
    );
  }
  
  export { Header };
    

<div className="p-2 text-xs">
  <span className="inline md:hidden">MOBILE VIEW</span>
  <span className="hidden md:inline">DESKTOP VIEW</span>
</div>

function MobileLink({ href, children, className = "", onClick }) {
  return (
    <a href={href} onClick={onClick} className={`block hover:text-[#154734] ${className}`}>{children}</a>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-15" aria-hidden>
        <GridPattern />
      </div>
      <Container className="grid md:grid-cols-2 items-center gap-10 py-16 md:py-24">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Never roll your trash cans again.
          </h1>
          <p className="mt-4 text-neutral-700 text-lg leading-relaxed">
            We bring your bins to the curb on pickup day and return them after collection. Simple, reliable, and automated—powered by smart reminders and route optimization.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#estimator" className="inline-flex items-center justify-center rounded-full bg-[#154734] text-white px-6 py-3 font-medium shadow-sm hover:opacity-90">Get my estimate</a>
            <a href="#how" className="inline-flex items-center justify-center rounded-full bg-white border border-neutral-300 px-6 py-3 font-medium hover:border-neutral-400">How it works</a>
          </div>
          <p className="mt-3 text-xs text-neutral-600">Serving Jasper, GA and nearby neighborhoods. <span className="italic">(Edit service area in code.)</span></p>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-[#154734] opacity-10 blur-2xl" aria-hidden />
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HeroIcon />
              <div>
                <div className="font-medium">Curb‑day Automation</div>
                <div className="text-sm text-neutral-600">Set and forget. We handle the rest.</div>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2"><CheckIcon /><span>Pickup day reminders, synced to your address</span></li>
              <li className="flex items-start gap-2"><CheckIcon /><span>AM curb placement + PM return (configurable)</span></li>
              <li className="flex items-start gap-2"><CheckIcon /><span>Photo proof and time‑stamped logs</span></li>
              <li className="flex items-start gap-2"><CheckIcon /><span>Pause/skip any week from your dashboard</span></li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Logos() {
  return (
    <section aria-label="Trust badges">
      <Container className="py-6 md:py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70 text-xs">
          <span className="inline-flex items-center gap-2"><Shield /> Bonded & Insured</span>
          <span className="inline-flex items-center gap-2"><Clock /> On‑time Guarantee</span>
          <span className="inline-flex items-center gap-2"><Zap /> Route‑optimized</span>
          <span className="inline-flex items-center gap-2"><Phone /> Local Support</span>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Tell us your pickup days",
      body: "Enter your address and pickup schedule once. We sync reminders and route you automatically.",
      icon: AddressIcon,
    },
    {
      title: "We roll your cans",
      body: "On pickup day morning we place bins at the curb; after collection we return them to your home.",
      icon: RunIcon,
    },
    {
      title: "Track everything",
      body: "You’ll get photo proof and a timeline after each visit. Skip or pause anytime.",
      icon: TimelineIcon,
    },
  ];
  return (
    <section id="how" className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-3 text-neutral-700 max-w-2xl">A minimal, tech‑forward service experience inspired by the best valet models. No apps to install—manage from simple links and SMS.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-4"><s.icon /></div>
              <div className="font-medium text-lg">{s.title}</div>
              <div className="mt-1 text-neutral-700 text-sm">{s.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Estimator() {
  const [cans, setCans] = useState(2);
  const [freq, setFreq] = useState("weekly"); // weekly or twice
  const [returnSameDay, setReturnSameDay] = useState(true);

  // *** Adjust baseline and increments to your pricing ***
  const pricing = useMemo(() => {
    const base = freq === "weekly" ? 29 : 45; // USD / month baseline (placeholder)
    const perCan = 4; // each additional can per month (placeholder)
    const sameDayReturnAdd = returnSameDay ? 0 : -3; // discount if next‑day return
    return Math.max(base + (Math.max(1, cans) - 2) * perCan + sameDayReturnAdd, 15);
  }, [cans, freq, returnSameDay]);

  return (
    <section id="estimator" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Instant estimate</h2>
            <p className="mt-3 text-neutral-700">Transparent pricing with no surprises. Final price is confirmed after address and pickup‑day verification.</p>
            <form className="mt-6 grid gap-4">
              <label className="text-sm font-medium">Number of cans</label>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Decrease" className="rounded-full border px-3 py-2" onClick={() => setCans(Math.max(1, cans - 1))}>−</button>
                <div className="w-12 text-center font-medium">{cans}</div>
                <button type="button" aria-label="Increase" className="rounded-full border px-3 py-2" onClick={() => setCans(cans + 1)}>＋</button>
              </div>

              <label className="mt-4 text-sm font-medium">Frequency</label>
              <div className="flex gap-3">
                <Toggle checked={freq === "weekly"} onClick={() => setFreq("weekly")}>Weekly</Toggle>
                <Toggle checked={freq === "twice"} onClick={() => setFreq("twice")}>Twice per week</Toggle>
              </div>

              <label className="mt-4 text-sm font-medium">Return timing</label>
              <div className="flex gap-3 items-center">
                <Toggle checked={returnSameDay} onClick={() => setReturnSameDay(true)}>Same‑day return</Toggle>
                <Toggle checked={!returnSameDay} onClick={() => setReturnSameDay(false)}>Evening/next‑day OK</Toggle>
              </div>
            </form>
          </div>
          <div className="rounded-3xl border border-neutral-200 p-6 bg-[#F6F3E7]">
            <div className="text-sm text-neutral-600">Estimated monthly</div>
            <div className="mt-1 text-5xl font-semibold tracking-tight">${pricing}</div>
            <div className="mt-2 text-neutral-700 text-sm">Includes curb placement and return {freq === "twice" ? "twice per week" : "once per week"}. Adjusted at signup for your exact schedule.</div>
            <a href="#contact" className="mt-6 inline-flex rounded-full bg-[#154734] text-white px-5 py-3 font-medium shadow-sm hover:opacity-90">Continue to signup</a>
            <div className="mt-4 text-xs text-neutral-600">* Placeholder pricing for demo. Update values in <code>Estimator()</code> to match your market.</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Toggle({ checked, children, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-medium ${checked ? "bg-[#154734] text-white border-[#154734]" : "bg-white text-neutral-800 border-neutral-300"}`}>{children}</button>
  );
}

function Plans() {
  const tiers = [
    {
      name: "Starter",
      price: "$29/mo",
      blurb: "Best for 1–2 cans, weekly pickup",
      features: [
        "AM curb placement",
        "PM return after collection",
        "Photo proof",
        "1 free vacation pause / yr",
      ],
      cta: "Choose Starter",
    },
    {
      name: "Standard",
      price: "$45/mo",
      blurb: "For busy households; twice per week",
      features: [
        "Two curb runs / week",
        "SMS reminders",
        "Priority support",
        "Unlimited skips (24h notice)",
      ],
      cta: "Choose Standard",
      featured: true,
    },
    {
      name: "Plus",
      price: "Custom",
      blurb: "HOAs, communities & businesses",
      features: [
        "Group / HOA rates",
        "Bulk properties",
        "Dedicated coordinator",
        "Net‑30 terms available",
      ],
      cta: "Request quote",
    },
  ];
  return (
    <section id="plans" className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Plans & pricing</h2>
        <p className="mt-3 text-neutral-700 max-w-2xl">Transparent monthly subscriptions. Change or cancel anytime. <em>(If you enforce minimums, add that note here.)</em></p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className={`rounded-3xl border p-6 shadow-sm ${t.featured ? "border-[#154734] bg-white" : "border-neutral-200 bg-white"}`}>
              <div className="text-sm uppercase tracking-wider text-neutral-600">{t.name}</div>
              <div className="mt-2 text-4xl font-semibold">{t.price}</div>
              <div className="mt-1 text-neutral-700 text-sm">{t.blurb}</div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-800">
                {t.features.map((f, j) => (
                  <li className="flex items-center gap-2" key={j}><CheckIcon /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={`mt-6 inline-flex rounded-full px-5 py-3 font-medium ${t.featured ? "bg-[#154734] text-white" : "bg-white border border-neutral-300"}`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceArea() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState(null);
  const coveredZips = ["30143", "30114", "30115"]; // EDIT as needed
  const checkZip = () => {
    const ok = coveredZips.includes(zip.trim());
    setResult(ok ? "yes" : "no");
  };
  return (
    <section id="service" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Service area</h2>
            <p className="mt-3 text-neutral-700">Currently serving Jasper, GA and surrounding ZIP codes. Enter yours to check availability.</p>
            <div className="mt-5 flex gap-3">
              <input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" placeholder="Enter ZIP" className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#154734]" />
              <button onClick={checkZip} className="rounded-xl bg-[#154734] text-white px-5 py-3 font-medium">Check</button>
            </div>
            {result === "yes" && <p className="mt-3 text-sm text-green-700">Great news—we service your area.</p>}
            {result === "no" && <p className="mt-3 text-sm text-amber-700">We don’t service this ZIP yet. Join the waitlist below.</p>}
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-[#F6F3E7] p-6">
            <div className="text-sm text-neutral-600">Coming soon</div>
            <div className="mt-1 font-medium">Live route map</div>
            <p className="mt-2 text-sm text-neutral-700">Embed a simple map showing neighborhoods we cover and ETA windows.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TechSection() {
  const items = [
    {
      title: "Smart reminders",
      body: "Automatic SMS the evening before and the morning of pickup, tailored to your route.",
    },
    {
      title: "Route optimization",
      body: "Efficient routing keeps prices low and arrival windows accurate.",
    },
    {
      title: "Proof, not promises",
      body: "Photo proof with time stamps after each visit, viewable from your receipt link.",
    },
  ];
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-3xl bg-[#154734] text-[#F6F3E7] p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((it, i) => (
              <div key={i}>
                <div className="text-xl font-semibold">{it.title}</div>
                <div className="mt-2 text-[#EAE6D8]">{it.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  const qas = [
    {
      q: "What is bin running?",
      a: "We roll your trash and recycling cans to the curb on pickup day and return them after collection.",
    },
    {
      q: "Do I need to be home?",
      a: "No. Tell us where cans are stored and if there’s gate access—we’ll handle the rest.",
    },
    {
      q: "What if pickup is delayed?",
      a: "We monitor delays and adjust return times. You’ll still get a photo log after collection.",
    },
    {
      q: "Can I skip a week?",
      a: "Yes—use your confirmation link to skip or pause. 24‑hour notice appreciated.",
    },
    {
      q: "Do you serve HOAs or businesses?",
      a: "Yes. Ask about discounted group/HOA pricing and commercial routes.",
    },
  ];
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">FAQs</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {qas.map((it, i) => (
            <details key={i} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-medium flex items-start justify-between gap-4">
                <span>{it.q}</span>
                <span className="text-neutral-500">+</span>
              </summary>
              <p className="mt-3 text-neutral-700">{it.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <Container>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-sm grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to stop rolling cans?</h2>
            <p className="mt-3 text-neutral-700">Tell us your address and pickup days. We’ll confirm service and your schedule in 1 business day.</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-800">
              <li className="flex gap-2 items-start"><CheckIcon /> No long‑term contracts</li>
              <li className="flex gap-2 items-start"><CheckIcon /> Simple monthly billing</li>
              <li className="flex gap-2 items-start"><CheckIcon /> Local, family‑run</li>
            </ul>
          </div>
          <SignupForm />
        </div>
      </Container>
    </section>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <Input label="Name" value={name} onChange={setName} />
        <Input label="Email" type="email" value={email} onChange={setEmail} />
      </div>
      <Input label="Phone" value={phone} onChange={setPhone} />
      <Input label="Service address" value={address} onChange={setAddress} />
      <Input label="Notes (gate codes, storage location, pets)" value={notes} onChange={setNotes} />
      {!submitted ? (
        <button type="button" onClick={() => setSubmitted(true)} className="mt-2 rounded-full bg-[#154734] text-white px-5 py-3 font-medium shadow-sm hover:opacity-90">Request service</button>
      ) : (
        <div className="mt-2 rounded-xl bg-[#F6F3E7] border border-neutral-200 p-4 text-sm">
          Thanks! We’ve saved your info for follow‑up. (Integrate with your form tool / email.)
        </div>
      )}
      <p className="text-xs text-neutral-600">Prefer phone or email? Call <strong>(470) 263‑3951</strong> or email <strong>hello@thebinrunners.com</strong>. <em>(Update these in code.)</em></p>
    </form>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="text-sm">
      <div className="mb-1 font-medium">{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#154734]" />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200/60">
      <Container className="py-10 grid md:grid-cols-3 gap-8 items-start">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div>
            <div className="font-semibold">The Bin Runners</div>
            <div className="text-sm text-neutral-600">Jasper, GA</div>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium">Company</div>
          <ul className="mt-2 space-y-1 text-neutral-700">
            <li><a href="#plans" className="hover:text-[#154734]">Pricing</a></li>
            <li><a href="#service" className="hover:text-[#154734]">Service area</a></li>
            <li><a href="#faq" className="hover:text-[#154734]">FAQ</a></li>
            <li><a href="https://bcbpro.com/book/the-bin-running-brothers/terms" target="_blank" rel="noopener" className="hover:text-[#154734]">Privacy &amp; Terms</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium">Get in touch</div>
          <div className="mt-2 text-neutral-700">(470) 263‑3951</div>
          <div className="text-neutral-700">hello@thebinrunners.com</div>
          <div className="mt-4 text-xs text-neutral-600">© {new Date().getFullYear()} The Bin Runners. All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
}

/* -------------------- SVG / Icons -------------------- */
function Logo({ className = "h-10 w-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Logo">
      <circle cx="32" cy="32" r="31" fill="#154734"/>
      <circle cx="32" cy="32" r="27" fill="#F6F3E7"/>
      {/* Minimal stick runner + can */}
      <g transform="translate(18,16)">
        {/* Can */}
        <rect x="22" y="16" width="8" height="12" rx="1.5" fill="#154734"/>
        <rect x="21" y="14" width="10" height="2" rx="1" fill="#154734"/>
        {/* Head */}
        <circle cx="6" cy="6" r="3" fill="#154734"/>
        {/* Hat */}
        <rect x="4" y="2" width="6" height="2" rx="1" fill="#154734"/>
        <rect x="3" y="3.5" width="6" height="1.5" rx="0.75" fill="#154734"/>
        {/* Body & limbs */}
        <path d="M6 9 L6 18" stroke="#154734" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12 L14 16" stroke="#154734" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12 L0 16" stroke="#154734" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 18 L12 24" stroke="#154734" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 18 L0 24" stroke="#154734" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function HeroIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden>
      <rect x="8" y="16" width="48" height="36" rx="6" stroke="#154734" strokeWidth="3"/>
      <path d="M8 28h48" stroke="#154734" strokeWidth="3"/>
      <circle cx="20" cy="22" r="2" fill="#154734"/>
      <circle cx="28" cy="22" r="2" fill="#154734"/>
      <circle cx="36" cy="22" r="2" fill="#154734"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#154734]" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden>
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function RunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#154734]" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden>
      <circle cx="17" cy="5" r="2" fill="currentColor"/>
      <path d="M4 12l6-2 3 2 2 5M10 10l2-3 4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#154734]" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function GridPattern() {
  const size = 28;
  const cols = 32;
  const rows = 16;
  const lines = [];
  for (let i = 0; i < cols; i++) lines.push(<line key={`v${i}`} x1={i * size} y1={0} x2={i * size} y2={rows * size} stroke="#154734" strokeOpacity="0.2" strokeWidth="0.5" />);
  for (let j = 0; j < rows; j++) lines.push(<line key={`h${j}`} x1={0} y1={j * size} x2={cols * size} y2={j * size} stroke="#154734" strokeOpacity="0.12" strokeWidth="0.5" />);
  return (
    <svg aria-hidden viewBox={`0 0 ${cols * size} ${rows * size}`}>{lines}</svg>
  );
}

function Shield() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 3v6c0 5-4 7-7 9-3-2-7-4-7-9V6l7-3Z" stroke="currentColor" strokeWidth="2"/></svg>
  );
}
function Clock() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  );
}
function Zap() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
  );
}
function Phone() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5l4-1 2 5-2 1a14 14 0 0 0 6 6l1-2 5 2-1 4c-6 1-14-7-15-15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
  );
}
