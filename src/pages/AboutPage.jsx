// src/pages/AboutPage.jsx
export default function AboutPage() {
  return (
    <div className="py-10 bg-[#fffef5] min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-6xl px-4 space-y-8">
        <div className="space-y-2 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
            About Us
          </p>
          <h1 className="text-3xl font-black text-slate-900">
            The Story Behind <span className="text-mango-600">Mango Bar</span>
          </h1>
          <p className="text-sm text-slate-700">
            Mango Bar is a farmer-first, customer-obsessed mango brand. We
            started with one simple goal – make it easy for city families to get
            truly natural mangoes without worrying about formalin or cheat
            weight.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 text-sm text-slate-700">
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-900">
              Our Mission
            </h2>
            <p>
              We bridge the gap between mango orchards and urban homes. By
              pre-booking trees, training farmers on organic practices and
              managing logistics, we ensure both sides win – farmers get better
              prices and customers get honest fruit.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Pay farmers fair, transparent rates.</li>
              <li>• Zero tolerance for carbide, formalin and colour wash.</li>
              <li>• Keep full traceability from tree to box.</li>
              <li>• Build a long-term brand trusted by families.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-900">
              What Makes Us Different
            </h2>
            <p>
              Most generic fruit traders mix varieties, use chemical ripening
              and hide actual farm source. We run like a tech-enabled brand:
              batch IDs, temperature tracking, customer feedback loops and
              delivery experience monitoring.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="glass-panel bg-white p-3">
                <p className="font-semibold text-slate-900">
                  80+ Partner Orchards
                </p>
                <p className="text-slate-600">
                  Carefully vetted farms with yearly quality audits.
                </p>
              </div>
              <div className="glass-panel bg-white p-3">
                <p className="font-semibold text-slate-900">
                  Cold-Chain Logistics
                </p>
                <p className="text-slate-600">
                  AC vans and insulated boxes to protect flavour.
                </p>
              </div>
              <div className="glass-panel bg-white p-3">
                <p className="font-semibold text-slate-900">
                  Lab Test Guarantee
                </p>
                <p className="text-slate-600">
                  Random checks for harmful chemicals every week.
                </p>
              </div>
              <div className="glass-panel bg-white p-3">
                <p className="font-semibold text-slate-900">
                  Customer-First Support
                </p>
                <p className="text-slate-600">
                  No-question replacement for damaged boxes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team small cards (static for now) */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-slate-900">
            Meet Our Core Team
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center text-xs">
            {['Ahmed Rahim', 'Disha Debnath', 'Emon Hasan'].map((name) => (
              <div
                key={name}
                className="glass-panel bg-white p-4 flex flex-col items-center gap-2"
              >
                <div className="h-20 w-20 rounded-full bg-mango-200 flex items-center justify-center text-3xl">
                  😊
                </div>
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="text-slate-500">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
