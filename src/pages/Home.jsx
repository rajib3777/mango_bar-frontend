// src/pages/Home.jsx
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button.jsx';
import { useEffect, useState } from 'react';


const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frameId;

    const numeric =
      typeof value === 'string'
        ? parseInt(value.replace(/[^\d]/g, ''), 10)
        : Number(value);

    if (!numeric || Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1); // 0 -> 1
      const current = Math.floor(progress * numeric);
      setDisplay(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => frameId && cancelAnimationFrame(frameId);
  }, [value, duration]);

  const original = String(value);
  const suffix = original.replace(/[0-9,]/g, ''); // "1566+" theke "+"

  return (
    <>
      {display.toLocaleString()}
      {suffix}
    </>
  );
};

// ekhane tomar stats, mangoTypes etc...
const stats = [
  { label: 'Our Best Products', value: '1566+' },
  { label: 'Team Members', value: '356+' },
  { label: 'Satisfied Customers', value: '2365+' },
  { label: 'Awards Winning', value: '156+' },
];


const mangoTypes = [
  { name: 'Langda Mangoes', img: '/images/ashwina.webp' },
  { name: 'Himsagar Mangoes', img: '/images/tutu_02.webp' },
  { name: 'Fazlee Mangoes', img: '/images/tutu_03.jpg' },
  { name: 'Gopalbogh Mangoes', img: '/images/tutu_04.jpg' },
  { name: 'Harivanga Mangoes', img: '/images/tutut_01.jpg' },
  { name: 'Ashwina Mangoes', img: '/images/tutu_05.avif' },
];

const blogCards = [
  {
    tag: 'Organic',
    date: '08 March 2025',
    title: 'Save Time With These Top Seven Mango Desserts',
    author: 'Admin',
    read: '5 min read',
  },
  {
    tag: 'Health',
    date: '05 March 2025',
    title: 'The ABC of Mangoes in Supporting Immune Function',
    author: 'Admin',
    read: '7 min read',
  },
  {
    tag: 'Seasonal',
    date: '01 March 2025',
    title: 'Mango Saucy Summer – Best Ways to Store Mangoes',
    author: 'Admin',
    read: '4 min read',
  },
];

const reasons = [
  '100% Organic product directly from certified farms',
  'Formalin-free & chemical-free cold chain handling',
  'Same-day delivery inside city with live tracking',
  'Hygienic packaging & temperature-controlled vans',
];

const testimonials = [
  {
    initials: 'AR',
    name: 'Atikur Rahman',
    location: 'Dhaka',
    role: 'Regular customer',
    rating: 5,
    quote:
      'Mango Bar completely changed how our family buys mangoes. Boxes arrive cold, neatly packed and every piece tastes like childhood orchard memories.',
  },
  {
    initials: 'SD',
    name: 'Shamima Dipa',
    location: 'Chattogram',
    role: 'Working mom',
    rating: 5,
    quote:
      'Office theke ferar por bazar e jete hoy na. Ekbar order kore dilam, pore pura season jure delivery peye gechi. Kids are obsessed!',
  },
  {
    initials: 'FH',
    name: 'Farhan Hasan',
    location: 'Sylhet',
    role: 'Food vlogger',
    rating: 4.8,
    quote:
      'Content er jonno onek brand try korechi, but Mango Bar er sweetness & consistency onno level. Viewers o bar bar brand er naam jiggesh kore.',
  },
  {
    initials: 'NR',
    name: 'Nusrat Rahman',
    location: 'Gazipur',
    role: 'Corporate gift buyer',
    rating: 4.9,
    quote:
      'Eid gift box hishebe 80+ client ke Mango Bar pathalam. Packaging, timing, feedback – shob kichu professional level.',
  },
];


export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mango-200 via-mango-100 to-[#fffef5]">
        {/* mango decorations */}
        <div className="pointer-events-none absolute -top-20 left-0 w-72 h-72 rounded-full bg-mango-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-emerald-200/50 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/70 text-mango-700 shadow-soft">
              <span className="text-lg">🍃</span>
              <span className="uppercase tracking-[0.25em]">
                Formalin Free · 100% Organic
              </span>
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[3.1rem] font-black leading-tight text-slate-900">
              We Provide{' '}
              <span className="text-mango-600">Formalin Free Fresh</span>{' '}
              Mangoes.
              <span className="block mt-1 text-[1.9rem] text-emerald-800">
                Directly From Farm To Your Table.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-700 max-w-xl">
              We collect premium mangoes directly from the farmers in Rajshahi &amp;
              Chapai Nawabganj, hand-sort them in our cooled warehouse and deliver
              to your doorstep within 24 hours. No middleman, no chemical wash,
              just honest mangos.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button className="px-6 py-3 text-sm">
                Order Now
              </Button>
              <Button
                variant="secondary"
                className="px-6 py-3 text-sm"
              >
                View Offers
              </Button>
              <div className="flex flex-col text-xs text-slate-700">
                <span className="font-semibold text-mango-700">
                  15,000+ kg
                </span>
                <span>organic mango delivered last season</span>
              </div>
            </div>

            {/* small icons */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="glass-panel p-4 flex items-start gap-3 text-xs">
                <span className="text-2xl">🏪</span>
                <div>
                  <p className="font-semibold text-slate-900">Pickup Stand</p>
                  <p className="text-slate-600">Pick up directly from your nearest Mango Bar hub.</p>
                </div>
              </div>
              <div className="glass-panel p-4 flex items-start gap-3 text-xs">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-slate-900">Fast Delivery</p>
                  <p className="text-slate-600">Same day inside Dhaka, next-day nationwide.</p>
                </div>
              </div>
              <div className="glass-panel p-4 flex items-start gap-3 text-xs">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="font-semibold text-slate-900">Lab Tested</p>
                  <p className="text-slate-600">Random batch tests for carbide &amp; formalin.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – hero image & offer card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-panel p-5 relative overflow-hidden">
              <div className="absolute -top-10 -right-16 w-56 h-56 rounded-full bg-mango-300/60 blur-3xl" />
              <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-emerald-200/60 blur-3xl" />

              <div className="relative grid gap-4">
                <img
                  src="/images/tutu_03.jpg"
                  alt="Fresh organic mangoes"
                  className="rounded-[2rem] h-64 w-full object-cover shadow-soft"
                />
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-2xl bg-emerald-900 text-emerald-50 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300">
                        Seasonal Offer
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        Early Bird Summer Box
                      </p>
                      <p className="mt-1 text-emerald-100">
                        10kg mixed premium mangoes with free cold-pack delivery.
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div>
                        <p className="text-xs line-through text-emerald-300">৳ 2,800</p>
                        <p className="text-xl font-extrabold text-mango-300">৳ 2,200</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-mango-400 text-emerald-950 font-bold text-[11px]">
                        -21% OFF
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-mango-100 p-4 flex flex-col gap-2">
                    <p className="text-[11px] font-semibold text-mango-700">
                      Today&apos;s Slots
                    </p>
                    <p className="text-xs text-slate-600">
                      Dhaka: <span className="font-semibold text-emerald-700">32/50</span> delivery slots left
                    </p>
                    <p className="text-xs text-slate-600">
                      Chattogram: <span className="font-semibold text-emerald-700">18/35</span> slots left
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Order before 5 PM to get same-day dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section className="py-14 bg-[#fffef7]">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.1fr,1.2fr] gap-10 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-mango-200/80 blur-xl" />
            <img
              src="/images/yellow.jpg"
              alt="Splash mango"
              className="relative rounded-[2.5rem] shadow-soft object-cover w-full max-h-[330px]"
            />
          </div>
          <div className="space-y-4 text-sm">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600 flex items-center gap-2">
              <span className="h-[2px] w-6 bg-mango-500 rounded-full" />
              About Our Company
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Organic Integrity, Durable Impact – Mango Bar&apos;s Story
            </h2>
            <p className="text-slate-700">
              Mango Bar started with a simple frustration: every year we saw how
              chemical-treated mangoes flooded the city markets while farmers
              struggled to get fair price for their natural fruit. We decided to
              change that story.
            </p>
            <p className="text-slate-700">
              Today we work directly with more than 80+ partner orchards. We
              pre-book trees, monitor flowering and harvesting schedule, and bring
              boxes straight from garden to consumer with temperature-controlled
              logistics. No water mixing, no weight cheating – just honest, tasty
              mango.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✔</span>
                <div>
                  <p className="font-semibold">100% Organic Protocol</p>
                  <p className="text-slate-600">
                    Partner farms sign yearly pesticide-free and carbide-free agreement.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✔</span>
                <div>
                  <p className="font-semibold">Always Fresh &amp; Natural</p>
                  <p className="text-slate-600">
                    Harvested in the morning, sorted and dispatched within 12 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✔</span>
                <div>
                  <p className="font-semibold">Best Prices</p>
                  <p className="text-slate-600">
                    Direct trade model – no middleman cuts, more value for farmer &amp; buyer.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✔</span>
                <div>
                  <p className="font-semibold">Environmental Benefits</p>
                  <p className="text-slate-600">
                    Zero plastic crates, reusable boxes &amp; farm-level water management.
                  </p>
                </div>
              </div>
            </div>

            <Button className="mt-2 px-6 py-2 text-sm">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* LATEST UPDATES / BLOG PREVIEW */}
      <section className="py-14 bg-[#f9fff5]">
        <div className="mx-auto max-w-6xl px-4 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
                Blog &amp; News
              </p>
              <h2 className="text-2xl font-black text-slate-900">
                Latest <span className="text-mango-600">Updates</span> &amp; News
              </h2>
            </div>
            <Button variant="secondary" className="text-xs px-4 py-2">
              View All Articles
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {blogCards.map((b) => (
              <div
                key={b.title}
                className="glass-panel p-4 flex flex-col gap-3 bg-white"
              >
                <img src="/images/yellow.jpg" alt="" />
                <div className="text-[11px] flex items-center gap-3 text-slate-500">
                  <span className="px-2 py-1 rounded-full bg-mango-50 text-mango-700 font-semibold">
                    {b.tag}
                  </span>
                  <span>{b.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {b.title}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {b.author} · {b.read}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-14 bg-[#fffef7]">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.1fr,1.3fr] gap-10 items-center">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Nourish Your Body With Pure <span className="text-mango-600">Organic Goodness!</span>
            </h2>
            <p className="text-sm text-slate-700">
              Every box you receive is packed, sealed and shipped by food-grade
              trained staff. We track each tree batch and keep full transparency on
              origin, harvest date and chemical status.
            </p>
            <ul className="space-y-3 text-sm">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✔</span>
                  <span className="text-slate-800">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -top-6 right-0 w-24 h-24 rounded-full bg-mango-200/80 blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80"
              alt="Box of mangoes"
              className="relative rounded-[2.5rem] shadow-soft w-full max-h-[340px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* TYPES OF MANGOES */}
      <section className="py-14 bg-[#f9fff5]">
        <div className="mx-auto max-w-6xl px-4 space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
              Types Of Mangoes
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              Exploring The World Of <span className="text-mango-600">Mango Varieties!</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {mangoTypes.map((m) => (
              <div
                key={m.name}
                className="glass-panel p-3 flex flex-col gap-2 bg-white"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="rounded-2xl h-36 w-full object-cover"
                />
                <p className="text-sm font-semibold text-center text-slate-900 mt-1">
                  {m.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Button className="px-6 py-2 text-sm">
              View Season Calendar
            </Button>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-mango-700 text-mango-50 py-8">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-4 gap-6">
            {stats.map((s) => (
            <div
                key={s.label}
                className="flex flex-col items-center md:items-start text-center md:text-left"
            >
                {/* ager line:
                <p className="text-2xl font-extrabold">{s.value}</p>
                */}
                <p className="text-2xl font-extrabold">
                <AnimatedNumber value={s.value} />
                </p>

                <p className="text-xs text-mango-100">{s.label}</p>
            </div>
            ))}
        </div>
      </section>


      {/* PARTNERS */}
      <section className="py-12 bg-[#fffef7]">
        <div className="mx-auto max-w-6xl px-4 space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
              Company Partners
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              Growing Stronger With Our <span className="text-mango-600">Valued Partners!</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
            {['Eco Friendly', 'Natural Farm', 'Organic Food', 'Healthy Harvest', 'Bio Protected'].map(
              (p) => (
                <div
                  key={p}
                  className="glass-panel bg-white/90 p-3 flex items-center justify-center font-semibold text-slate-800"
                >
                  {p}
                </div>
              )
            )}
          </div>
        </div>
      </section>
 

      {/* TESTIMONIAL + NEWSLETTER */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950">
        <div className="mx-auto max-w-6xl px-4 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-[1.1fr,1fr] lg:gap-10 lg:items-stretch">
            {/* Left: reviews */}
            <div className="flex flex-col gap-5 lg:pr-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-200 text-center lg:text-left">
                Testimonials
            </p>

            <div className="text-center lg:text-left space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-emerald-50 leading-snug">
                The Sweet Success Of{' '}
                <span className="text-mango-300">Mango Bar</span>
                </h2>
                <p className="text-[13px] md:text-sm text-emerald-200 max-w-xl mx-auto lg:mx-0">
                1 box theke shuru hoye ekhon hajar er beshi family. Toder motoi
                busy city life, but fresh mango experience compromise kore na.
                </p>
            </div>

            {/* Featured main review */}
            {testimonials[0] && (
                <div className="mt-1 flex justify-center lg:justify-start">
                <div className="w-full max-w-xl rounded-[1.75rem] bg-[#fff9e8] border border-mango-200 shadow-soft px-5 py-6 sm:px-7 sm:py-7 text-slate-900">
                    <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-full bg-mango-500 flex items-center justify-center text-sm font-semibold text-white shadow-soft">
                        {testimonials[0].initials}
                    </div>
                    <div className="text-xs leading-tight">
                        <p className="font-semibold text-slate-900">
                        {testimonials[0].name}
                        </p>
                        <p className="text-slate-600">
                        {testimonials[0].role} · {testimonials[0].location}
                        </p>
                    </div>
                    <div className="ml-auto flex flex-col items-end gap-1">
                        <div className="flex gap-0.5 text-[15px] text-mango-500">
                        {Array.from({ length: testimonials[0].rating }).map(
                            (_, i) => (
                            <span key={i}>★</span>
                            )
                        )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                        {testimonials[0].rating.toFixed
                            ? testimonials[0].rating.toFixed(1)
                            : testimonials[0].rating}{' '}
                        / 5 rating
                        </p>
                    </div>
                    </div>

                    <p className="text-[13px] md:text-sm leading-relaxed text-slate-800">
                    “{testimonials[0].quote}”
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-mango-500/15 text-slate-900 px-3 py-1 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-mango-500" />
                        Verified delivery · Cash on delivery
                    </span>
                    <span className="text-slate-500">
                        20+ orders completed from this customer
                    </span>
                    </div>
                </div>
                </div>
            )}

            {/* Extra reviews strip */}
            <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-200 mb-2">
                More happy families
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {testimonials.slice(1).map((t) => (
                    <div
                    key={t.name}
                    className="min-w-[220px] max-w-xs rounded-2xl bg-[#fffef7] border border-mango-200/80 px-4 py-4 text-xs text-slate-900 shadow-sm"
                    >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-mango-400 flex items-center justify-center text-[11px] font-semibold text-white">
                        {t.initials}
                        </div>
                        <div className="leading-tight">
                        <p className="font-semibold text-slate-900">
                            {t.name}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                            {t.role} · {t.location}
                        </p>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-700 line-clamp-4">
                        “{t.quote}”
                    </p>
                    </div>
                ))}
                </div>
            </div>
            </div>

            {/* Right: newsletter */}
            <div className="flex items-stretch lg:pl-4">
            <div className="w-full max-w-md mx-auto rounded-[1.75rem] bg-[#fffef7] border border-mango-200 shadow-soft px-5 py-6 sm:px-7 sm:py-7 text-slate-900 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2 leading-snug">
                Stay in season with every box.
                </h3>
                <p className="text-[13px] text-slate-600 mb-4">
                New variety drop hole, price change hole, ba special gift box open
                hole – sobar age tumi notification pabe. Avg. 1–2 email per season.
                </p>

                <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3 text-sm"
                >
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-slate-700">
                    Email address
                    </label>
                    <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="flex-1 px-3 py-2 rounded-2xl border border-mango-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mango-400"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full justify-center px-5 py-2 text-sm mt-1 bg-mango-500 hover:bg-mango-600"
                >
                    Subscribe for mango alerts
                </Button>

                <p className="text-[11px] text-slate-500 text-center mt-1">
                    Unsubscribe ek click e possible. Amra konodin tomar email sell
                    korbo na.
                </p>
                </form>

                <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-slate-600">
                <div className="flex -space-x-2">
                    <span className="h-7 w-7 rounded-full bg-mango-400/90 border-2 border-[#fffef7] flex items-center justify-center text-[10px] font-semibold text-white">
                    AR
                    </span>
                    <span className="h-7 w-7 rounded-full bg-mango-500/90 border-2 border-[#fffef7] flex items-center justify-center text-[10px] font-semibold text-white">
                    SD
                    </span>
                    <span className="h-7 w-7 rounded-full bg-mango-600/90 border-2 border-[#fffef7] flex items-center justify-center text-[10px] font-semibold text-white">
                    +
                    </span>
                </div>
                <span>2300+ subscriber family already onboard</span>
                </div>
            </div>
            </div>
        </div>
     </section>

      

    </div>
  );
}
