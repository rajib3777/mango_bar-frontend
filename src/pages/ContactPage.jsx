// src/pages/ContactPage.jsx
import Button from '@/components/ui/Button.jsx';

export default function ContactPage() {
  return (
    <div className="py-10 bg-[#f9fff5] min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.2fr,1fr] gap-10">
        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
              Contact
            </p>
            <h1 className="text-3xl font-black text-slate-900">
              We Are Here To Help You!
            </h1>
            <p className="text-sm text-slate-700">
              Have questions about orders, bulk corporate gifts or partnering
              your orchard with us? Send us a message and our support team will
              get back within 24 hours.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass-panel bg-white p-5 space-y-3 text-sm"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  className="w-full px-3 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-mango-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-mango-400"
                  placeholder="+8801..."
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-mango-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-mango-400 resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <Button type="submit" className="px-6 py-2 text-sm">
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact info */}
        <aside className="space-y-4 text-sm text-slate-700">
          <div className="glass-panel bg-white p-5 space-y-3">
            <h2 className="font-semibold text-slate-900">Contact Details</h2>
            <p>
              <span className="font-semibold">Phone:</span> +880 1700-000000
            </p>
            <p>
              <span className="font-semibold">Email:</span>{' '}
              support@freshmango.com
            </p>
            <p>
              <span className="font-semibold">Office:</span> House 12, Road 5,
              Dhanmondi, Dhaka.
            </p>
          </div>
          <div className="glass-panel bg-white p-5 space-y-2 text-xs">
            <h2 className="font-semibold text-slate-900">
              Delivery Time Window
            </h2>
            <p>Dhaka City: Every day, 10 AM – 8 PM</p>
            <p>Other Cities: Friday – Wednesday, 11 AM – 6 PM</p>
          </div>
          <div className="glass-panel bg-white p-5 text-xs">
            <h2 className="font-semibold text-slate-900 mb-1">
              Social Channels
            </h2>
            <p className="text-slate-600">
              Facebook · Instagram · WhatsApp · YouTube
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
