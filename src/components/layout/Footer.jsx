export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-emerald-950 text-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-4 gap-6 text-xs">
        <div className="space-y-2">
          <p className="font-bold text-sm">Mango Bar</p>
          <p className="text-emerald-200">
            Formalin free, organic mangoes from trusted Bangladeshi orchards,
            delivered with global-grade digital experience.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2">Categories</p>
          <ul className="space-y-1 text-emerald-200">
            <li>Himshagor</li>
            <li>Fazli</li>
            <li>Langra</li>
            <li>Mixed Season Box</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2">Quick Links</p>
          <ul className="space-y-1 text-emerald-200">
            <li>Order Tracking</li>
            <li>Refund Policy</li>
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2">Contact Us</p>
          <p>House 12, Road 5, Dhanmondi, Dhaka.</p>
          <p>Phone: +880 1700-000000</p>
          <p>Email: support@freshmango.com</p>
        </div>
      </div>
      <div className="border-t border-emerald-800 text-[11px] text-center py-3 text-emerald-300">
        © {new Date().getFullYear()} Mango Bar · Built as a demo industry-level
        frontend.
      </div>
    </footer>
  );
}
