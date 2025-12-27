import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AnimatedPage from "@/components/animations/AnimatedPage.jsx";
import Button from "@/components/ui/Button.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { getOrdersApi } from "@/api/orders.js";
import { getCartItemsApi } from "@/api/cart.js";
import { getProductsApi } from "@/api/products.js";

/* ================== ROLE DETECTION ================== */

function deriveRole(user) {
  if (!user) return "guest";

  const raw =
    (user.role ||
      user.user_type ||
      user.account_type ||
      "").toString().toLowerCase();

  const isAdminFlag = user.is_admin || user.is_staff || user.is_superuser;
  const isSellerFlag =
    user.is_seller ||
    raw.includes("seller") ||
    raw.includes("vendor") ||
    raw.includes("merchant");
  const isAdminString =
    raw.includes("admin") ||
    raw.includes("superuser") ||
    raw.includes("staff") ||
    raw.includes("owner") ||
    raw.includes("manager");

  if (isAdminFlag || isAdminString) return "admin";
  if (isSellerFlag) return "seller";
  return "customer";
}

const ROLE_LABEL = {
  admin: "Admin",
  seller: "Seller",
  customer: "Customer",
};

const ROLE_COLOR = {
  admin: "from-emerald-600 via-amber-500 to-mango-400",
  seller: "from-mango-500 via-amber-400 to-lime-400",
  customer: "from-mango-400 via-amber-300 to-yellow-200",
};

const PIE_COLORS = ["#16a34a", "#f97316", "#0ea5e9", "#facc15"];

/* ================== SMALL HELPERS ================== */

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const final = Number(value) || 0;
    if (!final) {
      setDisplay(0);
      return;
    }

    const start = performance.now();
    let frame;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const current = Math.floor(p * final);
      setDisplay(current);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => frame && cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display.toLocaleString()}</>;
}

function TinySpinner() {
  return (
    <motion.span
      className="inline-block h-3 w-3 rounded-full bg-mango-500"
      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  );
}

/* ================== MAIN PAGE ================== */

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "" });
  const [profileImage, setProfileImage] = useState(null);

  const [sellerForm, setSellerForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [sellerImage, setSellerImage] = useState(null);
  const [sellerBanner, setSellerBanner] = useState(null);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);

  const role = deriveRole(user);
  const roleLabel = ROLE_LABEL[role] || "Customer";

  const displayName = useMemo(() => {
    if (!user) return "";
    return (
      user.full_name ||
      user.name ||
      user.username ||
      (user.email ? user.email.split("@")[0] : "")
    );
  }, [user]);

  const initials = useMemo(() => {
    if (!displayName) return "MB";
    return displayName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const joinDate = user?.date_joined || user?.created_at;
  const email = user?.email || "";
  const phone = user?.phone || user?.phone_number || "";

  /* -------- init form from user -------- */
  useEffect(() => {
    if (user) {
      setProfileForm({
        full_name: user.full_name || user.name || "",
        phone: user.phone || user.phone_number || "",
      });
    }
  }, [user]);

  /* -------- load dashboard data from backend -------- */
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [o, c, p] = await Promise.allSettled([
          getOrdersApi(),
          getCartItemsApi(),
          getProductsApi(),
        ]);

        if (o.status === "fulfilled" && Array.isArray(o.value?.data))
          setOrders(o.value.data);
        if (c.status === "fulfilled" && Array.isArray(c.value?.data))
          setCartItems(c.value.data);
        if (p.status === "fulfilled" && Array.isArray(p.value?.data))
          setProducts(p.value.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (!user) {
    return (
      <AnimatedPage>
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#FFF7E3] to-[#FFFDF6]">
          <div className="max-w-sm w-full mx-4 rounded-3xl bg-white/95 p-6 text-center space-y-3 shadow-soft">
            <p className="text-sm font-semibold text-slate-900">
              Please login to see your mango dashboard.
            </p>
            <p className="text-xs text-slate-600">
              All orders, carts and role-based controls are visible only after
              login.
            </p>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  /* -------- derived stats -------- */
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) =>
    ["pending", "processing"].includes((o.status || "").toLowerCase())
  ).length;
  const deliveredOrders = orders.filter((o) =>
    ["delivered", "completed"].includes((o.status || "").toLowerCase())
  ).length;
  const cartCount = cartItems.length;

  const activeProducts = products.filter((p) => p.is_active !== false);
  const deletedProducts = products.filter(
    (p) =>
      p.is_deleted ||
      (typeof p.status === "string" &&
        p.status.toLowerCase().includes("deleted"))
  );

  const monthlyOrders = orders.filter((o) => {
    if (!o.created_at) return true;
    const d = new Date(o.created_at);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  const orderStatusRaw = [
    { name: "Pending", value: pendingOrders },
    { name: "Delivered", value: deliveredOrders },
    {
      name: "Other",
      value: totalOrders - pendingOrders - deliveredOrders,
    },
  ].filter((d) => d.value > 0);

  const customerSeries = buildCustomerSeries(orders);
  const sellerSeries = buildSellerProductSeries(products);
  const adminSeries = buildAdminMonthlySeries(orders);

  /* -------- profile update -------- */
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      );
      const url = `${baseUrl}/accounts/edit-profile/`;

      const formData = new FormData();
      if (profileForm.full_name)
        formData.append("full_name", profileForm.full_name);
      if (profileForm.phone) formData.append("phone", profileForm.phone);
      if (profileImage) {
        formData.append("avatar", profileImage);
        formData.append("image", profileImage);
        formData.append("profile_image", profileImage);
      }

      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("access") ||
        "";

      await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
        credentials: "include",
      });
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setSavingProfile(false);
    }
  };

  /* -------- seller create product -------- */
  const handleSellerSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      );
      const url = `${baseUrl}/api/products/`;

      const formData = new FormData();
      formData.append("name", sellerForm.name);
      formData.append("price", sellerForm.price);
      formData.append("stock", sellerForm.stock);
      formData.append("category", sellerForm.category);
      formData.append("description", sellerForm.description);
      if (sellerImage) {
        formData.append("image", sellerImage);
        formData.append("photo", sellerImage);
      }
      if (sellerBanner) {
        formData.append("banner", sellerBanner);
        formData.append("shop_banner", sellerBanner);
      }

      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("access") ||
        "";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
        credentials: "include",
      });

      setSellerForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
      setSellerImage(null);
      setSellerBanner(null);
    } catch (err) {
      console.error("Seller create product failed", err);
    } finally {
      setSavingProduct(false);
    }
  };

  /* ================== UI ================== */

  return (
    <AnimatedPage>
      {/* পুরো পেজে horizontal scroll OFF */}
      <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF7E0] via-[#FFE0B3] to-[#FFFDF7] overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
          {/* ---------- HERO SUMMARY ---------- */}
          <motion.section
            className="rounded-3xl bg-gradient-to-br from-mango-400 via-amber-300 to-yellow-200 text-slate-900 p-4 sm:p-6 shadow-soft flex flex-col gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-4 items-center">
              <motion.div
                className={`h-14 w-14 sm:h-16 sm:w-16 rounded-3xl bg-gradient-to-tr ${ROLE_COLOR[role]} flex items-center justify-center text-xl sm:text-2xl font-bold text-amber-50 shadow-soft`}
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                {initials}
              </motion.div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-800">
                  Mango Bar • Formalin Free Market
                </p>
                <p className="mt-1 text-lg sm:text-2xl font-black leading-tight">
                  Welcome back,{" "}
                  <span className="text-slate-900">{displayName}</span>
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-800">
                  All your mango life – orders, cart, products and role-based
                  controls – in one animated dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-amber-100 px-3 py-1 tracking-[0.16em] uppercase">
                Role: <span className="font-semibold">{ROLE_LABEL[role]}</span>
              </span>
              {email && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
                  📧 {email}
                </span>
              )}
              {phone && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
                  📱 {phone}
                </span>
              )}
              {joinDate && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-3 py-1">
                  🍃 Joined {new Date(joinDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </motion.section>

          {/* ---------- KPI ROW ---------- */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard label="Total Orders" value={totalOrders} tone="mango" />
            <KpiCard label="Pending" value={pendingOrders} tone="amber" />
            <KpiCard label="Delivered" value={deliveredOrders} tone="emerald" />
            <KpiCard label="Cart Items" value={cartCount} tone="sky" />
          </section>

          {/* ---------- QUICK ACTIONS ---------- */}
          <section className="rounded-3xl bg-white/95 border border-amber-100 shadow-soft p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">
                Quick mango actions
              </p>
              {loading && (
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <TinySpinner /> syncing…
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <Button
                variant="ghost"
                className="w-full rounded-2xl bg-mango-50 hover:bg-mango-100 py-2"
                onClick={() => navigate("/orders")}
              >
                My orders
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-2xl bg-mango-50 hover:bg-mango-100 py-2"
                onClick={() => navigate("/cart")}
              >
                My cart
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-2xl bg-mango-50 hover:bg-mango-100 py-2"
                onClick={() => navigate("/change-password")}
              >
                Change password
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-2xl bg-mango-50 hover:bg-mango-100 py-2"
                onClick={() => navigate("/shop")}
              >
                Go to shop
              </Button>
            </div>
          </section>

          {/* ---------- ROLE SPECIFIC DASHBOARD ---------- */}
          {role === "customer" && (
            <CustomerSection
              orders={orders}
              cartItems={cartItems}
              series={customerSeries}
              navigate={navigate}
            />
          )}

          {role === "seller" && (
            <SellerSection
              orders={orders}
              products={products}
              series={sellerSeries}
              statusData={orderStatusRaw}
              navigate={navigate}
            />
          )}

          {role === "admin" && (
            <AdminSection
              orders={orders}
              products={products}
              series={adminSeries}
              statusData={orderStatusRaw}
              navigate={navigate}
            />
          )}

          {/* ---------- PROFILE + SELLER FORMS (2 column on desktop) ---------- */}
          <section className="grid gap-5 lg:grid-cols-2">
            <ProfileCard
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              savingProfile={savingProfile}
              onSubmit={handleProfileSubmit}
            />

            {role === "seller" ? (
              <SellerStudioCard
                sellerForm={sellerForm}
                setSellerForm={setSellerForm}
                sellerImage={sellerImage}
                setSellerImage={setSellerImage}
                sellerBanner={sellerBanner}
                setSellerBanner={setSellerBanner}
                savingProduct={savingProduct}
                onSubmit={handleSellerSubmit}
              />
            ) : (
              <RecentActivityCard orders={orders} />
            )}
          </section>

          {/* seller না হলে extra recent activity নিচে */}
          {role !== "seller" && (
            <section>
              <RecentActivityCard orders={orders} />
            </section>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

/* ================== SMALL UI BLOCKS ================== */

function KpiCard({ label, value, tone }) {
  const toneClass =
    tone === "mango"
      ? "bg-mango-50 border-mango-100"
      : tone === "amber"
      ? "bg-amber-50 border-amber-100"
      : tone === "emerald"
      ? "bg-emerald-50 border-emerald-100"
      : "bg-sky-50 border-sky-100";

  return (
    <motion.div
      className={`rounded-3xl ${toneClass} shadow-soft px-3 py-3 flex flex-col gap-1`}
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <span className="text-lg sm:text-xl font-black text-slate-900">
        <AnimatedNumber value={value} />
      </span>
    </motion.div>
  );
}

/* ================== CUSTOMER SECTION ================== */

function CustomerSection({ orders, cartItems, series, navigate }) {
  const recent = Array.isArray(orders) ? orders.slice(0, 4) : [];

  return (
    <motion.section
      className="rounded-3xl bg-white/95 border border-amber-100 shadow-soft p-4 sm:p-5 space-y-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Customer dashboard
          </p>
          <p className="text-xs text-slate-600">
            See how your mango orders grow over time.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-mango-100 text-mango-900 text-[10px] px-3 py-1">
          🥭 Customer
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-52 sm:h-60 rounded-2xl bg-gradient-to-br from-[#FFEFD5] to-[#FFF9EC] border border-amber-100 p-3">
          <p className="text-[11px] font-semibold text-slate-800 mb-1">
            Orders timeline
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="custArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="label" fontSize={10} tickLine={false} />
              <YAxis fontSize={10} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#f97316"
                fill="url(#custArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="rounded-2xl bg-[#FFF8E8] border border-amber-100 px-3 py-3 space-y-1">
            <p className="font-semibold text-slate-900 text-xs">
              Cart highlight
            </p>
            <p className="text-slate-600 text-[11px]">
              You currently have <strong>{cartItems.length}</strong> item(s) in
              your mango cart. Complete checkout before boxes are sold out.
            </p>
            <Button
              variant="ghost"
              className="px-0 py-1 text-[11px] text-mango-700 justify-start"
              onClick={() => navigate("/cart")}
            >
              Open my cart →
            </Button>
          </div>

          <div className="rounded-2xl bg-[#E8FFF5] border border-emerald-100 px-3 py-3 space-y-1">
            <p className="font-semibold text-slate-900 text-xs">
              Order history
            </p>
            <p className="text-slate-600 text-[11px]">
              Track all orders, download invoices and raise issues directly from
              your order list.
            </p>
            <Button
              variant="ghost"
              className="px-0 py-1 text-[11px] text-emerald-700 justify-start"
              onClick={() => navigate("/orders")}
            >
              View my orders →
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
          Recent orders
        </p>
        {recent.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            You haven&apos;t placed any mango order yet. Start from the shop
            page.
          </p>
        ) : (
          <div className="space-y-2 text-[11px]">
            {recent.map((o) => (
              <div
                key={o.id || o.order_id}
                className="flex items-center justify-between rounded-2xl bg-[#FFF6E5] border border-amber-100 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    Order #{o.id || o.order_id}
                  </p>
                  <p className="text-slate-600">
                    {(o.status || "Unknown").toString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-800">
                    {o.total_price || o.total || ""} ৳
                  </p>
                  {o.created_at && (
                    <p className="text-[10px] text-slate-500">
                      {new Date(o.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

/* ================== SELLER SECTION ================== */

function SellerSection({ orders, products, series, statusData, navigate }) {
  const active = products.filter((p) => p.is_active !== false).length;
  const totalOrders = orders.length;

  return (
    <motion.section
      className="rounded-3xl bg-white/95 border border-emerald-100 shadow-soft p-4 sm:p-5 space-y-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Seller dashboard
          </p>
          <p className="text-xs text-slate-600">
            Mango product performance and order breakdown.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] px-3 py-1">
          🧺 Seller
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-56 rounded-2xl bg-gradient-to-br from-emerald-50 to-mango-50 border border-emerald-100 p-3">
          <p className="text-[11px] font-semibold text-slate-800 mb-1">
            Product demand (approx.)
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
              <XAxis dataKey="name" fontSize={10} tickLine={false} />
              <YAxis fontSize={10} tickLine={false} />
              <Tooltip />
              <Bar dataKey="sold" fill="#22c55e" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Active products" value={active} />
            <MiniStat label="Total orders" value={totalOrders} />
            <MiniStat
              label="Visible products"
              value={series.length}
            />
            <MiniStat
              label="Deleted / hidden"
              value={statusData.length === 0 ? 0 : ""}
            />
          </div>

          <div className="rounded-2xl bg-[#FFF6E5] border border-amber-100 px-3 py-2">
            <p className="text-[11px] font-semibold text-slate-800 mb-1">
              Order status mix
            </p>
            <div className="h-32">
              {statusData.length === 0 ? (
                <p className="text-[11px] text-slate-500 mt-4">
                  Status data will appear once orders start coming in.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={40}
                      innerRadius={20}
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <LinkCard
              title="Admin mangos"
              desc="Full listing with filters and bulk actions."
              onClick={() => navigate("/admin/mangos")}
            />
            <LinkCard
              title="Admin orders"
              desc="Review, assign and update buyer orders."
              onClick={() => navigate("/admin/orders")}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ================== ADMIN SECTION ================== */

function AdminSection({ orders, products, series, statusData, navigate }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) =>
    ["pending", "processing"].includes((o.status || "").toLowerCase())
  ).length;
  const deliveredOrders = orders.filter((o) =>
    ["delivered", "completed"].includes((o.status || "").toLowerCase())
  ).length;
  const activeProducts = products.filter((p) => p.is_active !== false).length;

  return (
    <motion.section
      className="rounded-3xl bg-white/95 border border-emerald-100 shadow-soft p-4 sm:p-5 space-y-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Admin control room
          </p>
          <p className="text-xs text-slate-600">
            High level view for the whole mango business.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] px-3 py-1">
          🛡️ Admin
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-56 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-emerald-100 p-3">
          <p className="text-[11px] font-semibold text-slate-800 mb-1">
            Orders per month
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="adminArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
              <XAxis dataKey="label" fontSize={10} tickLine={false} />
              <YAxis fontSize={10} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#16a34a"
                fill="url(#adminArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Total orders" value={totalOrders} />
            <MiniStat label="Pending" value={pendingOrders} />
            <MiniStat label="Delivered" value={deliveredOrders} />
            <MiniStat label="Active products" value={activeProducts} />
          </div>

          <div className="rounded-2xl bg-[#FFF6E5] border border-amber-100 px-3 py-2">
            <p className="text-[11px] font-semibold text-slate-800 mb-1">
              Status split
            </p>
            <div className="h-32">
              {statusData.length === 0 ? (
                <p className="text-[11px] text-slate-500 mt-4">
                  Status data will appear once orders start coming in.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={40}
                      innerRadius={20}
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <LinkCard
              title="Admin overview"
              desc="Go to Django admin dashboard."
              onClick={() => navigate("/admin")}
            />
            <LinkCard
              title="Manage mangos"
              desc="Add, edit and delete mango items."
              onClick={() => navigate("/admin/mangos")}
            />
            <LinkCard
              title="Manage orders"
              desc="Approve, cancel and track all orders."
              onClick={() => navigate("/admin/orders")}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ================== RIGHT COLUMN CARDS ================== */

function ProfileCard({
  profileForm,
  setProfileForm,
  profileImage,
  setProfileImage,
  savingProfile,
  onSubmit,
}) {
  return (
    <motion.div
      className="rounded-3xl bg-white/95 border border-amber-100 shadow-soft p-4 sm:p-5 space-y-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm font-semibold text-slate-900">Profile & avatar</p>
      <p className="text-xs text-slate-600">
        Update your display name, phone number and profile picture. Form uses
        your live Django API.
      </p>

      <form onSubmit={onSubmit} className="space-y-3 text-xs">
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Full name
          </label>
          <input
            type="text"
            value={profileForm.full_name}
            onChange={(e) =>
              setProfileForm((f) => ({ ...f, full_name: e.target.value }))
            }
            className="w-full rounded-2xl border border-amber-200 bg-[#FFF6E5] px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Phone
          </label>
          <input
            type="tel"
            value={profileForm.phone}
            onChange={(e) =>
              setProfileForm((f) => ({ ...f, phone: e.target.value }))
            }
            className="w-full rounded-2xl border border-amber-200 bg-[#FFF6E5] px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
            placeholder="+8801..."
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Profile picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            className="w-full text-[11px]"
          />
          {profileImage && (
            <p className="text-[10px] text-slate-500 mt-1">
              Selected: {profileImage.name}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto px-5 py-2 text-xs"
          disabled={savingProfile}
        >
          {savingProfile ? "Saving..." : "Save profile"}
        </Button>
      </form>
    </motion.div>
  );
}

function SellerStudioCard({
  sellerForm,
  setSellerForm,
  sellerImage,
  setSellerImage,
  sellerBanner,
  setSellerBanner,
  savingProduct,
  onSubmit,
}) {
  return (
    <motion.div
      className="rounded-3xl bg-gradient-to-br from-[#FFF6E5] via-[#FFE4BC] to-[#E9FCE7] border border-amber-100 shadow-soft p-4 sm:p-5 space-y-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">Seller studio</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-amber-50 text-[10px] px-3 py-1 tracking-[0.16em] uppercase">
          Create &amp; manage
        </span>
      </div>
      <p className="text-xs text-slate-600">
        Post a new mango product with image and optional shop banner directly
        from your dashboard.
      </p>

      <form onSubmit={onSubmit} className="space-y-3 text-xs">
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Product name
          </label>
          <input
            type="text"
            value={sellerForm.name}
            onChange={(e) =>
              setSellerForm((f) => ({ ...f, name: e.target.value }))
            }
            className="w-full rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
            placeholder="Himsagar Premium Box"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Price (৳)
            </label>
            <input
              type="number"
              value={sellerForm.price}
              onChange={(e) =>
                setSellerForm((f) => ({ ...f, price: e.target.value }))
              }
              className="w-full rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
              placeholder="1200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Stock
            </label>
            <input
              type="number"
              value={sellerForm.stock}
              onChange={(e) =>
                setSellerForm((f) => ({ ...f, stock: e.target.value }))
              }
              className="w-full rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
              placeholder="50"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              value={sellerForm.category}
              onChange={(e) =>
                setSellerForm((f) => ({ ...f, category: e.target.value }))
              }
              className="w-full rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400"
              placeholder="Premium / Local / Seasonal"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Product image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSellerImage(e.target.files?.[0] || null)
              }
              className="w-full text-[11px]"
            />
            {sellerImage && (
              <p className="text-[10px] text-slate-500 mt-1">
                Selected: {sellerImage.name}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Short description
          </label>
          <textarea
            rows={3}
            value={sellerForm.description}
            onChange={(e) =>
              setSellerForm((f) => ({ ...f, description: e.target.value }))
            }
            className="w-full rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mango-400 resize-none"
            placeholder="Taste notes, origin, box size etc."
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">
            Shop banner (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSellerBanner(e.target.files?.[0] || null)
            }
            className="w-full text-[11px]"
          />
          {sellerBanner && (
            <p className="text-[10px] text-slate-500 mt-1">
              Selected: {sellerBanner.name}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto px-5 py-2 text-xs"
          disabled={savingProduct}
        >
          {savingProduct ? "Posting..." : "Post product now"}
        </Button>
      </form>
    </motion.div>
  );
}

function RecentActivityCard({ orders }) {
  const items = Array.isArray(orders) ? orders.slice(0, 6) : [];

  return (
    <motion.div
      className="rounded-3xl bg-white/95 border border-amber-100 shadow-soft p-4 sm:p-5 space-y-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm font-semibold text-slate-900">
        Recent mango activity
      </p>
      <p className="text-xs text-slate-600">
        Last things that happened with your orders and account.
      </p>

      {items.length === 0 ? (
        <p className="text-[11px] text-slate-500">
          Activity will appear once you start placing orders.
        </p>
      ) : (
        <div className="space-y-2 text-[11px] max-h-60 overflow-y-auto">
          {items.map((o) => (
            <div
              key={o.id || o.order_id}
              className="flex items-center justify-between rounded-2xl bg-[#FFF6E5] border border-amber-100 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 truncate">
                  Order #{o.id || o.order_id}
                </p>
                <p className="text-slate-600">
                  {(o.status || "Unknown").toString()}
                </p>
              </div>
              {o.created_at && (
                <p className="text-[10px] text-slate-500">
                  {new Date(o.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ================== VERY SMALL BLOCKS ================== */

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#FFF8E8] border border-amber-100 px-3 py-2 flex flex-col gap-0.5">
      <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <span className="text-base font-bold text-mango-700">
        <AnimatedNumber value={value} />
      </span>
    </div>
  );
}

function LinkCard({ title, desc, onClick }) {
  return (
    <div className="rounded-2xl bg-[#E8FFF5] border border-emerald-100 px-3 py-3 flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-900">{title}</p>
        <p className="text-[11px] text-slate-600 mt-1">{desc}</p>
      </div>
      <Button
        variant="ghost"
        className="px-0 py-1 text-[11px] text-emerald-700 justify-start mt-1"
        onClick={onClick}
      >
        Open →
      </Button>
    </div>
  );
}

/* ================== DATA HELPERS (CHART) ================== */

function buildCustomerSeries(orders) {
  if (!Array.isArray(orders) || orders.length === 0) return [];
  const map = new Map();
  orders.forEach((o) => {
    const d = o.created_at ? new Date(o.created_at) : null;
    const key = d
      ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      : "Unknown";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([key, count]) => ({
      label: key === "Unknown" ? "Unknown" : key.split("-").slice(1).join("/"),
      count,
    }));
}

function buildSellerProductSeries(products) {
  if (!Array.isArray(products) || products.length === 0) return [];
  return products.slice(0, 6).map((p) => ({
    name: (p.name || p.title || "Mango").toString().slice(0, 8),
    sold: p.total_sold || p.order_count || p.sales || 0,
  }));
}

function buildAdminMonthlySeries(orders) {
  if (!Array.isArray(orders) || orders.length === 0) return [];
  const map = new Map();
  orders.forEach((o) => {
    const d = o.created_at ? new Date(o.created_at) : null;
    if (!d) return;
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([key, count]) => {
      const [year, month] = key.split("-");
      return { label: `${month}/${year.slice(-2)}`, count };
    });
}
