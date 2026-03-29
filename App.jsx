import { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://xqalzbovdbfvfttufelz.supabase.co";
const SUPABASE_KEY = "sb_publishable_hcJsadFAPXWGvnG-gemc8g_ZwH6b8wT";

const supaFetch = async (path, options = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": options.method === "POST" ? "return=representation" : undefined,
      ...options.headers,
    },
  });
  return res.json();
};

const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MapIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>;
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const StarIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const CrownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><path d="M2 20h20l-2-14-5 6-3-8-3 8-5-6z"/></svg>;
const TrendingIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const GridIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const UserIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ShieldIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

const CATEGORIES = [
  "Plomberie","Électricité","Transport","Ménage & Nettoyage","Jardinage",
  "Informatique & Tech","Cours & Formation","Beauté & Coiffure",
  "Bâtiment & Rénovation","Restauration","Photographie","Autre"
];

const VILLAGES = [
  { nom:"Mamoudzou", lat:-12.7809, lng:45.2283 },
  { nom:"Kaweni", lat:-12.7650, lng:45.2150 },
  { nom:"Passamainty", lat:-12.7950, lng:45.2350 },
  { nom:"Koungou", lat:-12.7333, lng:45.2042 },
  { nom:"Dembeni", lat:-12.8447, lng:45.1714 },
  { nom:"Tsoundzou", lat:-12.8100, lng:45.2200 },
  { nom:"Bandrélé", lat:-12.9100, lng:45.1900 },
  { nom:"Dzaoudzi", lat:-12.7872, lng:45.2622 },
  { nom:"Pamandzi", lat:-12.8000, lng:45.2800 },
  { nom:"Chirongui", lat:-12.9300, lng:45.1500 },
  { nom:"Bouéni", lat:-12.9100, lng:45.0800 },
  { nom:"Sada", lat:-12.8500, lng:45.1000 },
  { nom:"Ouangani", lat:-12.8500, lng:45.1500 },
  { nom:"Tsingoni", lat:-12.7800, lng:45.1500 },
  { nom:"M'Tsangamouji", lat:-12.7300, lng:45.1600 },
  { nom:"Acoua", lat:-12.7100, lng:45.1600 },
  { nom:"Mtsamboro", lat:-12.6900, lng:45.1800 },
  { nom:"Bandraboua", lat:-12.7000, lng:45.2000 },
];

const PLANS = [
  { id:"basique", name:"Basique", price:"5€", period:"/mois", color:"#6B7280", bg:"#F9FAFB", border:"#9CA3AF",
    stripeLink:"https://buy.stripe.com/cNi14mgz79ipdtQ58t7EQ00",
    features:["Fiche visible dans l'annuaire","Nom + description + téléphone","1 catégorie"],
    missing:["Pas de badge vérifié","Pas de mise en avant","Position standard"] },
  { id:"standard", name:"Standard", price:"9,99€", period:"/mois", color:"#0D9488", bg:"#F0FDFA", border:"#0D9488", popular:true,
    stripeLink:"https://buy.stripe.com/bJedR896FfGN75sfN77EQ01",
    features:["Fiche complète avec email + tarif","Badge vérifié visible","Priorité dans les résultats","Jusqu'à 3 catégories","Statistiques de vues"],
    missing:["Pas de mise en avant en accueil"] },
  { id:"premium", name:"Premium", price:"15€", period:"/mois", color:"#7C3AED", bg:"#FAF5FF", border:"#7C3AED",
    stripeLink:"https://buy.stripe.com/28EeVc3Ml529dtQ0Sd7EQ02",
    features:["Tout Standard inclus","Badge Premium vérifié","Affiché en tête de l'annuaire","Encart vedette en page d'accueil","Catégories illimitées","Statistiques avancées + clics","Support prioritaire"],
    missing:[] },
];

// ── LEAFLET MAP ──
const MayotteMap = ({ services, onVillageClick }) => {
  const mapRef = useRef(null);
  const mapInst = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (mapInst.current) return;
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => {
      const L = window.L;
      const map = L.map(mapRef.current, { zoomControl:true, scrollWheelZoom:true }).setView([-12.8, 45.17], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution:'&copy; OpenStreetMap' }).addTo(map);
      mapInst.current = map;
      draw(L);
    };
    document.body.appendChild(script);
    return () => { if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; } };
  }, []);

  useEffect(() => { if (mapInst.current && window.L) draw(window.L); }, [services]);

  const draw = (L) => {
    markers.current.forEach(m => m.remove()); markers.current = [];
    VILLAGES.forEach(v => {
      const ct = services.filter(s => s.village && s.village.toLowerCase().trim() === v.nom.toLowerCase().trim()).length;
      const sz = ct > 0 ? Math.min(18 + ct * 6, 44) : 14;
      const col = ct > 3 ? "#7C3AED" : ct > 0 ? "#0D9488" : "#B0AFA8";
      const bdr = ct > 3 ? "#6D28D9" : ct > 0 ? "#0F766E" : "#9CA3AF";
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${col};border:3px solid ${bdr};color:#fff;font-size:${ct>0?12:9}px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;font-family:'DM Sans',sans-serif">${ct > 0 ? ct : ""}</div>`,
        iconSize:[sz,sz], iconAnchor:[sz/2,sz/2],
      });
      const svcs = services.filter(s => s.village && s.village.toLowerCase().trim() === v.nom.toLowerCase().trim());
      const popup = `<div style="font-family:'DM Sans',sans-serif;min-width:180px">
        <div style="font-weight:800;font-size:15px;margin-bottom:4px">${v.nom}</div>
        <div style="font-size:13px;color:#0D9488;font-weight:600;margin-bottom:8px">${ct} service${ct!==1?"s":""}</div>
        ${svcs.slice(0,4).map(s=>`<div style="padding:5px 0;border-top:1px solid #eee;font-size:12px"><b>${s.nom}</b> — ${s.categorie}</div>`).join("")}
        ${ct>4?`<div style="font-size:11px;color:#999;padding-top:4px">+ ${ct-4} autres</div>`:""}
      </div>`;
      const m = L.marker([v.lat, v.lng], {icon}).addTo(mapInst.current);
      m.bindPopup(popup, {maxWidth:260});
      m.on("click", () => { if (onVillageClick) onVillageClick(v.nom); });
      markers.current.push(m);
    });
  };

  return <div ref={mapRef} style={{width:"100%",height:"100%",borderRadius:18}} />;
};

// ── MAIN ──
export default function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Toutes");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basique");
  const [mapVillage, setMapVillage] = useState("");
  const [form, setForm] = useState({ nom:"", categorie:"Plomberie", village:"", telephone:"", email:"", description:"", tarif:"", customCategorie:"" });

  // Load services from Supabase
  const loadServices = async () => {
    try {
      const data = await supaFetch("services?select=*&order=created_at.desc");
      if (Array.isArray(data)) setServices(data);
    } catch (e) { console.error("Erreur chargement:", e); }
    setLoading(false);
  };

  useEffect(() => { loadServices(); }, []);

  const submitPaid = async () => {
    if (!form.nom || !form.village || !form.telephone || !form.description) return;
    const finalCategorie = form.categorie === "Autre" && form.customCategorie ? form.customCategorie : form.categorie;
    // Save to Supabase
    try {
      await supaFetch("services", {
        method: "POST",
        body: JSON.stringify({ nom:form.nom, categorie:finalCategorie, village:form.village, telephone:form.telephone, email:form.email, description:form.description, tarif:form.tarif, plan: selectedPlan }),
      });
    } catch (e) { console.error("Erreur inscription:", e); }
    // Redirect to Stripe payment page
    const plan = PLANS.find(p => p.id === selectedPlan);
    if (plan?.stripeLink) {
      setForm({ nom:"", categorie:"Plomberie", village:"", telephone:"", email:"", description:"", tarif:"", customCategorie:"" });
      window.location.href = plan.stripeLink;
      return;
    }
  };

  const planOrd = { premium:0, standard:1, basique:2 };
  const filtered = services.filter(s => {
    const mc = filterCat === "Toutes" || s.categorie === filterCat;
    const q = search.toLowerCase();
    const ms = !search || s.nom.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || (s.village && s.village.toLowerCase().includes(q));
    return mc && ms;
  }).sort((a, b) => (planOrd[a.plan] || 2) - (planOrd[b.plan] || 2));

  const villageSvcs = mapVillage ? services.filter(s => s.village && s.village.toLowerCase() === mapVillage.toLowerCase()) : [];
  const premSvcs = services.filter(s => s.plan === "premium");
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR") : "";

  const Badge = ({ plan }) => {
    if (plan === "premium") return <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:16, background:"linear-gradient(135deg,#7C3AED,#9333EA)", color:"#fff", fontSize:11, fontWeight:700 }}><CrownIcon /> PREMIUM</span>;
    if (plan === "standard") return <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:16, background:"linear-gradient(135deg,#0D9488,#14B8A6)", color:"#fff", fontSize:11, fontWeight:700 }}><StarIcon /> STANDARD</span>;
    return null;
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", minHeight:"100vh", background:"#FAFAF8", color:"#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Playfair+Display:wght@600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#FAFAF8}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .nav-i{cursor:pointer;padding:8px 16px;border-radius:10px;font-weight:600;font-size:13px;color:#6B6B6B;transition:all .25s}
        .nav-i:hover{color:#1A1A1A;background:rgba(0,0,0,.04)}.nav-i.on{color:#0D9488;background:rgba(13,148,136,.06)}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;border:none;font-family:'DM Sans',sans-serif}
        .btn-fill{background:#0D9488;color:#fff;box-shadow:0 4px 16px rgba(13,148,136,.25)}.btn-fill:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,148,136,.35)}
        .btn-ghost{background:transparent;color:#0D9488;border:2px solid #0D9488}.btn-ghost:hover{background:rgba(13,148,136,.05)}
        .inp{width:100%;padding:14px 16px;border:2px solid #E8E8E4;border-radius:12px;font-size:15px;font-family:'DM Sans',sans-serif;color:#1A1A1A;background:#fff;transition:all .25s;outline:none}
        .inp:focus{border-color:#0D9488;box-shadow:0 0 0 3px rgba(13,148,136,.08)}.inp::placeholder{color:#B0AFA8}
        select.inp{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230D9488' stroke-width='3'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:40px}
        textarea.inp{resize:vertical;min-height:100px}
        .scard{background:#fff;border:1px solid #EFEFE8;border-radius:18px;padding:22px;transition:all .35s;animation:fadeUp .5s ease-out both}
        .scard:hover{border-color:#0D9488;box-shadow:0 8px 32px rgba(0,0,0,.06);transform:translateY(-4px)}
        .scard.pro{border:2px solid rgba(124,58,237,.2);background:linear-gradient(135deg,#FDFAFF,#FAF5FF)}
        .scard.std{border:2px solid rgba(13,148,136,.2);background:linear-gradient(135deg,#F0FDFA,#F5FFFE)}
        .chip{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;background:#F0FDFA;color:#0D9488}
        .fpill{padding:8px 16px;border-radius:24px;border:1.5px solid #E8E8E4;background:#fff;font-size:13px;font-weight:500;cursor:pointer;transition:all .25s;color:#6B6B6B;font-family:'DM Sans',sans-serif;white-space:nowrap}
        .fpill:hover{border-color:#0D9488;color:#0D9488}.fpill.on{background:#0D9488;color:#fff;border-color:#0D9488}
        .sbar{display:flex;align-items:center;gap:10px;padding:12px 18px;border:2px solid #E8E8E4;border-radius:14px;background:#fff;transition:all .25s;max-width:400px;width:100%}
        .sbar:focus-within{border-color:#0D9488;box-shadow:0 0 0 3px rgba(13,148,136,.08)}
        .sbar input{border:none;outline:none;font-size:15px;font-family:'DM Sans',sans-serif;color:#1A1A1A;flex:1;background:transparent}.sbar input::placeholder{color:#B0AFA8}
        .lbl{display:block;font-size:13px;font-weight:600;color:#6B6B6B;margin-bottom:8px}
        .leaflet-popup-content-wrapper{border-radius:14px!important;box-shadow:0 8px 24px rgba(0,0,0,.12)!important}
        .spinner{width:32px;height:32px;border:3px solid #E8E8E4;border-top-color:#0D9488;border-radius:50%;animation:spin .8s linear infinite}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#D4D4CC;border-radius:3px}
        @media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}.plans-grid{grid-template-columns:1fr!important}.map-split{grid-template-columns:1fr!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, padding:"14px 24px", background:"rgba(250,250,248,.88)", backdropFilter:"blur(16px)", borderBottom:"1px solid #EFEFE8", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }} onClick={() => setPage("home")}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0D9488,#14B8A6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:17, fontFamily:"'Playfair Display',serif" }}>M</div>
          <div><div style={{ fontWeight:800, fontSize:17, letterSpacing:"-.5px" }}>Maore<span style={{ color:"#0D9488" }}> Service</span></div><div style={{ fontSize:10, color:"#B0AFA8", letterSpacing:1.5, textTransform:"uppercase" }}>Annuaire local — Mayotte</div></div>
        </div>
        <div style={{ display:"flex", gap:2, flexWrap:"wrap" }}>
          {[{ id:"home", l:"Accueil" }, { id:"carte", l:"Carte" }, { id:"browse", l:"Annuaire" }, { id:"tarifs", l:"Tarifs" }, { id:"register", l:"S'inscrire" }].map(n =>
            <div key={n.id} className={`nav-i ${page === n.id ? "on" : ""}`} onClick={() => setPage(n.id)}>{n.l}</div>
          )}
        </div>
      </nav>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>

        {/* LOADING */}
        {loading && (
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", padding:"100px 0", flexDirection:"column", gap:16 }}>
            <div className="spinner" />
            <div style={{ color:"#8A8A82", fontSize:14 }}>Chargement des services...</div>
          </div>
        )}

        {/* HOME */}
        {!loading && page === "home" && (
          <div style={{ animation:"fadeUp .7s ease-out" }}>
            <section style={{ padding:"70px 0 50px", textAlign:"center" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:24, background:"#F0FDFA", fontSize:13, fontWeight:600, color:"#0D9488", marginBottom:28 }}><MapIcon /> L'annuaire de services n°1 à Mayotte</div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:800, lineHeight:1.15, letterSpacing:"-1.5px", marginBottom:20 }}>Trouvez le bon prestataire.<br /><span style={{ color:"#0D9488" }}>Proposez vos services.</span></h1>
              <p style={{ fontSize:17, color:"#8A8A82", maxWidth:500, margin:"0 auto 36px", lineHeight:1.7 }}>Inscrivez-vous et boostez votre visibilité avec nos offres adaptées.</p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn btn-fill" onClick={() => setPage("register")}><PlusIcon /> Proposer mon service</button>
                <button className="btn btn-ghost" onClick={() => setPage("carte")}><MapIcon /> Voir la carte</button>
              </div>
            </section>

            <section className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:48 }}>
              {[{ v:services.length, l:"Prestataires", i:<UserIcon /> }, { v:[...new Set(services.map(s => s.categorie))].length, l:"Catégories", i:<GridIcon /> }, { v:[...new Set(services.map(s => s.village).filter(Boolean))].length, l:"Communes", i:<MapIcon /> }, { v:services.filter(s => s.plan !== "basique").length, l:"Certifiés", i:<ShieldIcon /> }].map((s, i) =>
                <div key={i} style={{ padding:22, borderRadius:16, background:"#fff", border:"1px solid #EFEFE8", textAlign:"center" }}><div style={{ display:"flex", justifyContent:"center", marginBottom:6, color:"#0D9488" }}>{s.i}</div><div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800, color:"#0D9488" }}>{s.v}</div><div style={{ fontSize:12, color:"#8A8A82", marginTop:2, fontWeight:500 }}>{s.l}</div></div>
              )}
            </section>

            {/* Mini map */}
            <section style={{ marginBottom:48, borderRadius:20, overflow:"hidden", border:"1px solid #EFEFE8", height:300, position:"relative", cursor:"pointer" }} onClick={() => setPage("carte")}>
              <MayotteMap services={services} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 24px", background:"linear-gradient(transparent,rgba(250,250,248,.95))", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:10 }}>
                <div><div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:17 }}>Carte de Mayotte</div><div style={{ fontSize:13, color:"#8A8A82" }}>{VILLAGES.length} communes — {services.length} services</div></div>
                <button className="btn btn-fill" style={{ padding:"10px 20px", fontSize:13 }} onClick={e => { e.stopPropagation(); setPage("carte"); }}>Explorer</button>
              </div>
            </section>

            {premSvcs.length > 0 && (
              <section style={{ marginBottom:48 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}><CrownIcon /><h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700 }}>En vedette</h2></div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                  {premSvcs.slice(0, 3).map((s, i) => (
                    <div key={s.id} style={{ padding:22, borderRadius:16, border:"2px solid rgba(124,58,237,.15)", background:"linear-gradient(135deg,#FDFAFF,#FAF5FF)", animation:`fadeUp .5s ease-out ${i * .1}s both` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}><span style={{ fontWeight:700, fontSize:15 }}>{s.nom}</span><Badge plan="premium" /></div>
                      <p style={{ color:"#6B6B6B", fontSize:13, lineHeight:1.6, marginBottom:10 }}>{s.description}</p>
                      <div style={{ display:"flex", gap:12, fontSize:12, color:"#8A8A82" }}><span style={{ display:"flex", alignItems:"center", gap:4 }}><MapIcon />{s.village}</span><span style={{ display:"flex", alignItems:"center", gap:4 }}><PhoneIcon />{s.telephone}</span></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {services.length === 0 && (
              <section style={{ textAlign:"center", padding:48, borderRadius:20, background:"#fff", border:"1px solid #EFEFE8", marginBottom:48 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:8 }}>Soyez le premier inscrit</div>
                <p style={{ color:"#8A8A82", marginBottom:20 }}>Aucun prestataire n'est encore référencé. Lancez-vous et profitez de la visibilité maximale.</p>
                <button className="btn btn-fill" onClick={() => setPage("register")}><PlusIcon /> M'inscrire maintenant</button>
              </section>
            )}

            <section style={{ textAlign:"center", padding:44, borderRadius:24, marginBottom:50, background:"linear-gradient(135deg,#F0FDFA,#CCFBF1)", border:"1px solid rgba(13,148,136,.12)" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:8 }}>Boostez votre visibilité</h3>
              <p style={{ color:"#8A8A82", marginBottom:20, maxWidth:400, margin:"0 auto 20px" }}>Apparaissez en priorité et attirez plus de clients</p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}><button className="btn btn-fill" onClick={() => setPage("tarifs")}><TrendingIcon /> Voir les tarifs</button><button className="btn btn-ghost" onClick={() => setPage("register")}>S'inscrire</button></div>
            </section>
          </div>
        )}

        {/* CARTE */}
        {!loading && page === "carte" && (
          <section style={{ padding:"32px 0 60px", animation:"fadeUp .5s ease-out" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:12 }}>
              <div><h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800 }}>Carte des services</h2><p style={{ color:"#8A8A82", marginTop:4, fontSize:14 }}>{VILLAGES.length} communes — Cliquez sur une commune</p></div>
              {mapVillage && <button className="btn btn-ghost" style={{ padding:"8px 16px", fontSize:13 }} onClick={() => setMapVillage("")}>Voir toutes les communes</button>}
            </div>
            <div className="map-split" style={{ display:"grid", gridTemplateColumns:mapVillage ? "1fr 1fr" : "1fr", gap:20 }}>
              <div style={{ height:mapVillage ? 500 : 520, borderRadius:20, overflow:"hidden", border:"2px solid #EFEFE8" }}>
                <MayotteMap services={services} onVillageClick={v => setMapVillage(v)} />
              </div>
              {mapVillage && (
                <div style={{ animation:"fadeUp .4s ease-out" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}><MapIcon /><h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700 }}>{mapVillage}</h3><span style={{ fontSize:13, color:"#0D9488", fontWeight:600 }}>{villageSvcs.length} service{villageSvcs.length !== 1 ? "s" : ""}</span></div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12, maxHeight:440, overflowY:"auto", paddingRight:8 }}>
                    {villageSvcs.length === 0 ? (
                      <div style={{ textAlign:"center", padding:36, background:"#fff", borderRadius:16, border:"1px solid #EFEFE8" }}>
                        <div style={{ fontWeight:700, fontSize:15, marginBottom:6 }}>Aucun service à {mapVillage}</div>
                        <div style={{ color:"#8A8A82", fontSize:13, marginBottom:14 }}>Soyez le premier prestataire</div>
                        <button className="btn btn-fill" style={{ padding:"10px 20px", fontSize:13 }} onClick={() => { setForm({ ...form, village:mapVillage }); setPage("register"); }}>S'inscrire ici</button>
                      </div>
                    ) : villageSvcs.map((s, i) => (
                      <div key={s.id} className={`scard ${s.plan === "premium" ? "pro" : s.plan === "standard" ? "std" : ""}`} style={{ animationDelay:`${i * .06}s`, padding:18 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}><span style={{ fontWeight:700, fontSize:14 }}>{s.nom}</span><Badge plan={s.plan} /></div>
                        <div className="chip" style={{ marginBottom:8 }}>{s.categorie}</div>
                        <p style={{ color:"#6B6B6B", fontSize:13, lineHeight:1.6, marginBottom:8 }}>{s.description}</p>
                        {s.tarif && <div style={{ display:"inline-block", padding:"3px 10px", borderRadius:8, background:"#F0FDF4", color:"#16A34A", fontSize:12, fontWeight:700, marginBottom:8 }}>{s.tarif}</div>}
                        <div style={{ display:"flex", gap:12, fontSize:12, color:"#8A8A82" }}><span style={{ display:"flex", alignItems:"center", gap:4 }}><PhoneIcon />{s.telephone}</span>{s.plan !== "basique" && s.email && <span style={{ display:"flex", alignItems:"center", gap:4 }}><MailIcon />{s.email}</span>}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!mapVillage && (
              <div style={{ marginTop:24 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, marginBottom:14 }}>Communes</h3>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:10 }}>
                  {VILLAGES.map(v => {
                    const c = services.filter(s => s.village && s.village.toLowerCase() === v.nom.toLowerCase()).length;
                    return <div key={v.nom} style={{ padding:12, borderRadius:12, background:"#fff", border:"1px solid #EFEFE8", cursor:"pointer", transition:"all .25s", display:"flex", justifyContent:"space-between", alignItems:"center" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#0D9488"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#EFEFE8"; e.currentTarget.style.transform = "translateY(0)"; }}
                      onClick={() => setMapVillage(v.nom)}>
                      <span style={{ fontWeight:600, fontSize:13 }}>{v.nom}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:c > 0 ? "#0D9488" : "#B0AFA8", background:c > 0 ? "#F0FDFA" : "#F9FAFB", padding:"2px 10px", borderRadius:12 }}>{c}</span>
                    </div>;
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* BROWSE */}
        {!loading && page === "browse" && (
          <section style={{ padding:"36px 0 60px", animation:"fadeUp .5s ease-out" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, marginBottom:24 }}>
              <div><h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800 }}>Annuaire</h2><p style={{ color:"#8A8A82", marginTop:4, fontSize:14 }}>{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</p></div>
              <div className="sbar"><SearchIcon /><input placeholder="Rechercher…" value={search} onChange={e => setSearch(e.target.value)} /></div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
              <button className={`fpill ${filterCat === "Toutes" ? "on" : ""}`} onClick={() => setFilterCat("Toutes")}>Toutes</button>
              {CATEGORIES.map(c => <button key={c} className={`fpill ${filterCat === c ? "on" : ""}`} onClick={() => setFilterCat(c)}>{c}</button>)}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:50, background:"#fff", borderRadius:18, border:"1px solid #EFEFE8" }}>
                <div style={{ fontWeight:700, fontSize:18, marginBottom:6 }}>{services.length === 0 ? "Aucun prestataire inscrit" : "Aucun résultat"}</div>
                <div style={{ color:"#8A8A82", fontSize:14, marginBottom:16 }}>{services.length === 0 ? "Soyez le premier à vous inscrire" : "Modifiez vos filtres"}</div>
                {services.length === 0 && <button className="btn btn-fill" style={{ fontSize:13 }} onClick={() => setPage("register")}><PlusIcon /> S'inscrire</button>}
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:16 }}>
                {filtered.map((s, i) => (
                  <div key={s.id} className={`scard ${s.plan === "premium" ? "pro" : s.plan === "standard" ? "std" : ""}`} style={{ animationDelay:`${i * .06}s` }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                      <div><div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontWeight:700, fontSize:15 }}>{s.nom}</span><Badge plan={s.plan} /></div><div style={{ fontSize:12, color:"#B0AFA8" }}>{formatDate(s.created_at)}</div></div>
                    </div>
                    <div className="chip" style={{ marginBottom:10 }}>{s.categorie}</div>
                    <p style={{ color:"#6B6B6B", fontSize:14, lineHeight:1.6, marginBottom:12 }}>{s.description}</p>
                    {s.tarif && <div style={{ display:"inline-block", padding:"3px 10px", borderRadius:8, background:"#F0FDF4", color:"#16A34A", fontSize:13, fontWeight:700, marginBottom:12 }}>{s.tarif}</div>}
                    <div style={{ display:"flex", gap:14, flexWrap:"wrap", paddingTop:12, borderTop:"1px solid #F0F0EA", fontSize:13, color:"#8A8A82" }}>
                      <span style={{ display:"flex", alignItems:"center", gap:5 }}><MapIcon />{s.village}</span>
                      <span style={{ display:"flex", alignItems:"center", gap:5 }}><PhoneIcon />{s.telephone}</span>
                      {s.plan !== "basique" && s.email && <span style={{ display:"flex", alignItems:"center", gap:5 }}><MailIcon />{s.email}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TARIFS */}
        {!loading && page === "tarifs" && (
          <section style={{ padding:"44px 0 60px", animation:"fadeUp .6s ease-out" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}><h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:800 }}>Nos <span style={{ color:"#0D9488" }}>offres</span></h2><p style={{ color:"#8A8A82", marginTop:8, fontSize:15 }}>Choisissez la formule adaptée à votre activité</p></div>
            <div className="plans-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:880, margin:"0 auto" }}>
              {PLANS.map((p, i) => (
                <div key={p.id} style={{ borderRadius:20, padding:28, background:p.bg, border:`2px solid ${p.border}`, transition:"all .35s", animation:`fadeUp .5s ease-out ${i * .12}s both`, position:"relative" }}>
                  {p.popular && <div style={{ position:"absolute", top:14, right:14, background:"linear-gradient(135deg,#0D9488,#14B8A6)", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:12 }}>POPULAIRE</div>}
                  <div style={{ fontSize:13, fontWeight:700, color:p.color, marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>{p.name}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:18 }}><span style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:800, color:p.color }}>{p.price}</span>{p.period && <span style={{ color:"#8A8A82", fontSize:14 }}>{p.period}</span>}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                    {p.features.map((f, j) => <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"#4A4A4A" }}><span style={{ color:p.color, marginTop:1, flexShrink:0 }}><CheckIcon /></span>{f}</div>)}
                    {p.missing.map((m, j) => <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"#C4C4BC" }}><span style={{ marginTop:1, flexShrink:0 }}>—</span>{m}</div>)}
                  </div>
                  <button className="btn" style={{ width:"100%", justifyContent:"center", padding:"12px 20px", background:p.color, color:"#fff", boxShadow:`0 4px 16px ${p.color}33` }} onClick={() => { setSelectedPlan(p.id); setPage("register"); }}>Choisir {p.name}</button>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:32, display:"flex", alignItems:"center", justifyContent:"center", gap:8, color:"#B0AFA8", fontSize:13 }}><LockIcon /> Paiement sécurisé — Sans engagement</div>
          </section>
        )}

        {/* REGISTER */}
        {!loading && page === "register" && (
          <section style={{ padding:"44px 0 60px", maxWidth:600, margin:"0 auto", animation:"scaleIn .5s ease-out" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800, textAlign:"center", marginBottom:6 }}>Inscrire mon <span style={{ color:"#0D9488" }}>service</span></h2>
            <p style={{ textAlign:"center", color:"#8A8A82", marginBottom:28, fontSize:15 }}>Remplissez vos informations et choisissez votre formule</p>
            {showSuccess ? (
              <div style={{ textAlign:"center", padding:50, background:"#fff", borderRadius:20, border:"2px solid #D1FAE5", animation:"scaleIn .4s ease-out" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:"#10B981" }}><CheckIcon /></div>
                <div style={{ fontSize:20, fontWeight:700, color:"#10B981" }}>Service enregistré</div>
                <div style={{ color:"#8A8A82", marginTop:8 }}>Votre fiche est visible par tous les visiteurs</div>
              </div>
            ) : (
              <div style={{ background:"#fff", borderRadius:20, border:"1px solid #EFEFE8", padding:32, boxShadow:"0 4px 24px rgba(0,0,0,.03)" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <div>
                    <label className="lbl">Formule</label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                      {PLANS.map(p => <div key={p.id} onClick={() => setSelectedPlan(p.id)} style={{ padding:14, borderRadius:14, border:`2px solid ${selectedPlan === p.id ? p.color : "#E8E8E4"}`, background:selectedPlan === p.id ? p.bg : "#fff", cursor:"pointer", transition:"all .25s", textAlign:"center" }}>
                        <div style={{ fontWeight:700, fontSize:12, color:selectedPlan === p.id ? p.color : "#6B6B6B", marginBottom:4 }}>{p.name}</div>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:800, color:p.color }}>{p.price}</div>
                        <div style={{ fontSize:11, color:"#8A8A82" }}>{p.period}</div>
                      </div>)}
                    </div>
                  </div>
                  <div style={{ height:1, background:"#EFEFE8" }} />
                  <div><label className="lbl">Nom ou raison sociale *</label><input className="inp" placeholder="Ex : Marie L." value={form.nom} onChange={e => setForm({ ...form, nom:e.target.value })} /></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div><label className="lbl">Catégorie *</label><select className="inp" value={form.categorie} onChange={e => setForm({ ...form, categorie:e.target.value })}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>{form.categorie === "Autre" && <input className="inp" style={{marginTop:8}} placeholder="Précisez votre catégorie" value={form.customCategorie || ""} onChange={e => setForm({ ...form, customCategorie:e.target.value })} />}</div>
                    <div><label className="lbl">Commune *</label><select className="inp" value={form.village} onChange={e => setForm({ ...form, village:e.target.value })}><option value="">Choisir une commune</option>{VILLAGES.map(v => <option key={v.nom} value={v.nom}>{v.nom}</option>)}</select></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div><label className="lbl">Téléphone *</label><input className="inp" placeholder="0639 XX XX XX" value={form.telephone} onChange={e => setForm({ ...form, telephone:e.target.value })} /></div>
                    <div><label className="lbl">Email</label><input className="inp" placeholder="contact@exemple.com" value={form.email} onChange={e => setForm({ ...form, email:e.target.value })} /></div>
                  </div>
                  <div><label className="lbl">Tarif indicatif</label><input className="inp" placeholder="Ex : 25€/h, sur devis…" value={form.tarif} onChange={e => setForm({ ...form, tarif:e.target.value })} /></div>
                  <div><label className="lbl">Description du service *</label><textarea className="inp" placeholder="Décrivez votre activité…" value={form.description} onChange={e => setForm({ ...form, description:e.target.value })} /></div>
                  <button className="btn" style={{ width:"100%", justifyContent:"center", padding:16, fontSize:15, marginTop:4, background:selectedPlan === "premium" ? "#7C3AED" : "#0D9488", color:"#fff", boxShadow:selectedPlan === "premium" ? "0 4px 16px rgba(124,58,237,.25)" : "0 4px 16px rgba(13,148,136,.25)" }} onClick={submitPaid}>
                    <LockIcon /> Publier et payer — {PLANS.find(p => p.id === selectedPlan)?.price}{PLANS.find(p => p.id === selectedPlan)?.period}
                  </button>
                  <p style={{ textAlign:"center", fontSize:12, color:"#B0AFA8" }}>Vous serez redirigé vers la page de paiement sécurisé Stripe.</p>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <footer style={{ marginTop:40, padding:"28px 24px", borderTop:"1px solid #EFEFE8", background:"#fff", color:"#8A8A82", fontSize:13 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div><span style={{ fontWeight:700, color:"#1A1A1A" }}>Maore<span style={{ color:"#0D9488" }}> Service</span></span> — Passamainty, Mayotte</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}><ShieldIcon /> © 2026 Maore Service — Tous droits réservés</div>
        </div>
      </footer>
    </div>
  );
}


