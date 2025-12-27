// src/pages/BlogPage.jsx
import Button from '@/components/ui/Button.jsx';

const dummyPosts = [
  {
    id: 1,
    tag: 'Health',
    title: 'Why Formalin-Free Mangoes Matter For Your Family',
    date: '12 March 2025',
    read: '6 min read',
  },
  {
    id: 2,
    tag: 'Farmer Story',
    title: 'From Garden To City: A Day With Our Partner Orchard',
    date: '05 March 2025',
    read: '8 min read',
  },
  {
    id: 3,
    tag: 'Tips',
    title: 'How To Store Mangoes At Home Without Losing Flavour',
    date: '28 February 2025',
    read: '5 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="py-10 bg-[#fffef7] min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-6xl px-4 space-y-6">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
            Blog &amp; News
          </p>
          <h1 className="text-3xl font-black text-slate-900">
            Mango Bar <span className="text-mango-600">Journal</span>
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Learn about organic farming, mango varieties, storage tips and
            behind-the-scenes stories from our partner farmers.
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          {/* Main list */}
          <div className="space-y-4">
            {dummyPosts.map((post) => (
              <article
                key={post.id}
                className="glass-panel bg-white p-5 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="px-2 py-1 rounded-full bg-mango-50 text-mango-700 font-semibold">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span>• {post.read}</span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-600">
                  Full article content will come from backend or CMS later. For
                  now this is a static layout to show real-life structure.
                </p>
                <Button
                  variant="secondary"
                  className="mt-1 w-fit text-xs px-4 py-2"
                >
                  Read More
                </Button>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="glass-panel bg-white p-4 text-sm">
              <h3 className="font-semibold text-slate-900 mb-2">
                Newsletter
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Get weekly mango tips, seasonal offers and farm stories in your
                inbox.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-full mb-2 px-3 py-2 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
              />
              <Button className="w-full text-xs py-2">Subscribe</Button>
            </div>

            <div className="glass-panel bg-white p-4 text-xs">
              <h3 className="font-semibold text-slate-900 mb-2">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Organic', 'Formalin Free', 'Farmer Stories', 'Recipes', 'Storage Tips'].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-2xl bg-mango-50 text-mango-700"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
