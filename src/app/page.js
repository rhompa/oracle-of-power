'use client';
import { useState, useEffect, useMemo, useRef } from 'react';

/* ================================================================
   DATA
   ================================================================ */
const LAWS = [
  { n:1, name:"Never outshine the master", cat:"Power", brief:"Always make those above you feel comfortably superior. In your desire to please, do not go too far in displaying your talents or you might inspire fear and insecurity." },
  { n:2, name:"Never put too much trust in friends, learn how to use enemies", cat:"People", brief:"Be wary of friends — they will betray you more quickly. If you have no enemies, find a way to make them." },
  { n:3, name:"Conceal your intentions", cat:"Strategy", brief:"Keep people off-balance and in the dark by never revealing the purpose behind your actions." },
  { n:4, name:"Always say less than necessary", cat:"Power", brief:"When trying to impress with words, the more you say, the more common you appear. Powerful people impress by saying less." },
  { n:5, name:"So much depends on reputation — guard it with your life", cat:"Image", brief:"Reputation is the cornerstone of power. Through reputation alone you can intimidate and win." },
  { n:6, name:"Court attention at all costs", cat:"Image", brief:"Everything is judged by appearance; what is unseen counts for nothing. Stand out. Be conspicuous." },
  { n:7, name:"Get others to do the work for you, but always take the credit", cat:"Strategy", brief:"Use the wisdom, knowledge, and legwork of others to further your own cause." },
  { n:8, name:"Make other people come to you — use bait if necessary", cat:"Strategy", brief:"When you force the other person to act, you are the one in control." },
  { n:9, name:"Win through your actions, never through argument", cat:"Power", brief:"Any momentary triumph through argument is really a Pyrrhic victory. Demonstrate, do not explicate." },
  { n:10, name:"Infection: avoid the unhappy and unlucky", cat:"People", brief:"Emotional states are as infectious as diseases. Associate with the happy and fortunate instead." },
  { n:11, name:"Learn to keep people dependent on you", cat:"Power", brief:"The more you are relied on, the more freedom you have. Be needed and wanted." },
  { n:12, name:"Use selective honesty and generosity to disarm your victim", cat:"Strategy", brief:"One sincere and honest move will cover over dozens of dishonest ones." },
  { n:13, name:"When asking for help, appeal to self-interest, never mercy", cat:"People", brief:"Uncover something in your request that will benefit them, not guilt them." },
  { n:14, name:"Pose as a friend, work as a spy", cat:"Strategy", brief:"Knowing about your rival is critical. Every conversation is intelligence gathering." },
  { n:15, name:"Crush your enemy totally", cat:"Warfare", brief:"If one ember is left alight, it will eventually reignite. Annihilate them completely." },
  { n:16, name:"Use absence to increase respect and honor", cat:"Image", brief:"Too much circulation makes the price go down. Create value through scarcity." },
  { n:17, name:"Keep others in suspended terror: cultivate an air of unpredictability", cat:"Power", brief:"Your unpredictability will keep them off-balance and wear themselves out trying to explain your moves." },
  { n:18, name:"Do not build fortresses to protect yourself — isolation is dangerous", cat:"People", brief:"A fortress seems safest, but isolation exposes you to more dangers than it protects you from." },
  { n:19, name:"Know who you're dealing with — do not offend the wrong person", cat:"People", brief:"Choose your victims and opponents carefully." },
  { n:20, name:"Do not commit to anyone", cat:"Strategy", brief:"Do not commit to any side or cause but yourself. Maintain your independence." },
  { n:21, name:"Play a sucker to catch a sucker — seem dumber than your mark", cat:"Strategy", brief:"Make your victims feel smart — and they won't suspect ulterior motives." },
  { n:22, name:"Use the surrender tactic: transform weakness into power", cat:"Warfare", brief:"When you are weaker, surrender. Use the time to recover and wait for power to shift." },
  { n:23, name:"Concentrate your forces", cat:"Warfare", brief:"Intensity defeats extensity every time. Keep your forces concentrated at their strongest point." },
  { n:24, name:"Play the perfect courtier", cat:"Image", brief:"Master the art of indirection; flatter, yield to superiors, assert power gracefully." },
  { n:25, name:"Re-create yourself", cat:"Image", brief:"Do not accept the roles society foists on you. Forge your own identity." },
  { n:26, name:"Keep your hands clean", cat:"Strategy", brief:"Use scapegoats and cat's-paws. Your hands are never soiled by mistakes and nasty deeds." },
  { n:27, name:"Play on people's need to believe to create a cultlike following", cat:"People", brief:"Become the focal point of desire by offering them a cause, a new faith." },
  { n:28, name:"Enter action with boldness", cat:"Warfare", brief:"Doubts and hesitations infect execution. Timidity is dangerous; boldness strikes fear." },
  { n:29, name:"Plan all the way to the end", cat:"Strategy", brief:"The ending is everything. Plan all the way to it, accounting for all twists of fortune." },
  { n:30, name:"Make your accomplishments seem effortless", cat:"Image", brief:"All toil and practice must be concealed. Sprezzatura — the art of studied carelessness." },
  { n:31, name:"Control the options: get others to play with the cards you deal", cat:"Strategy", brief:"Give options that come out in your favor whichever one they choose." },
  { n:32, name:"Play to people's fantasies", cat:"People", brief:"Never appeal to truth and reality unless prepared for the anger. Offer the dream." },
  { n:33, name:"Discover each man's thumbscrew", cat:"People", brief:"Everyone has a weakness — an insecurity, an uncontrollable emotion or need. Find it." },
  { n:34, name:"Be royal in your own fashion: act like a king to be treated like one", cat:"Image", brief:"The way you carry yourself determines how you are treated." },
  { n:35, name:"Master the art of timing", cat:"Power", brief:"Never seem in a hurry. Sniff out the spirit of the times and find the ripe moment." },
  { n:36, name:"Disdain things you cannot have: ignoring them is the best revenge", cat:"Power", brief:"The more attention you pay an enemy, the stronger you make them." },
  { n:37, name:"Create compelling spectacles", cat:"Image", brief:"Striking imagery and grand symbolic gestures create the aura of power." },
  { n:38, name:"Think as you like but behave like others", cat:"Strategy", brief:"Flaunting unconventional ideas makes people punish you. Blend in publicly." },
  { n:39, name:"Stir up waters to catch fish", cat:"Warfare", brief:"Stay calm and objective, but make your enemies angry and emotional." },
  { n:40, name:"Despise the free lunch", cat:"Power", brief:"What is offered for free usually involves a trick or hidden obligation." },
  { n:41, name:"Avoid stepping into a great man's shoes", cat:"Power", brief:"If you succeed a great person, you will have to accomplish double to be seen as equal." },
  { n:42, name:"Strike the shepherd and the sheep will scatter", cat:"Warfare", brief:"Trouble can often be traced to one strong individual. Neutralize their influence." },
  { n:43, name:"Work on the hearts and minds of others", cat:"People", brief:"Coercion creates reaction. Seduce others into wanting to move in your direction." },
  { n:44, name:"Disarm and infuriate with the mirror effect", cat:"Strategy", brief:"When you mirror enemies exactly, they cannot figure out your strategy." },
  { n:45, name:"Preach the need for change, but never reform too much at once", cat:"Power", brief:"Too much innovation is traumatic. Cloak change in comfortable familiarity." },
  { n:46, name:"Never appear too perfect", cat:"Image", brief:"Display occasional defects and harmless vices to deflect envy and appear human." },
  { n:47, name:"Do not go past the mark you aimed for; in victory, learn when to stop", cat:"Warfare", brief:"In the heat of victory, arrogance and overconfidence can push you past the goal." },
  { n:48, name:"Assume formlessness", cat:"Warfare", brief:"Accept that nothing is certain and no law is fixed. Be like water — adapt to everything." },
];

const CATEGORIES = ["All","Power","Strategy","People","Image","Warfare"];
const CAT_COLORS = { Power:"#f0c850", Strategy:"#88c8f8", People:"#e87840", Image:"#c080d0", Warfare:"#e85040" };

/* ================================================================
   SVG BACKGROUNDS & DECORATIVE ELEMENTS
   ================================================================ */

// The Hercules sunset sky background
const SkyBackground = () => (
  <div style={{ position:"fixed", inset:0, zIndex:0 }}>
    {/* Main sky gradient */}
    <div style={{
      position:"absolute", inset:0,
      background:"linear-gradient(180deg, #08041a 0%, #140a30 15%, #2a1458 30%, #5a2868 45%, #984870 55%, #c06860 65%, #d88850 75%, #e8a848 82%, #f0c850 90%, #f8e090 100%)"
    }} />

    {/* Stars in upper sky */}
    {Array.from({length:80},(_,i) => {
      const x = ((i * 37 + 13) % 100);
      const y = ((i * 23 + 7) % 55);
      const s = (i % 5 === 0) ? 2.5 : ((i % 3 === 0) ? 1.8 : 1);
      const dur = 2 + (i % 4) * 1.2;
      const del = (i * 0.3) % 5;
      return (
        <div key={i} style={{
          position:"absolute", left:`${x}%`, top:`${y}%`,
          width:s, height:s, borderRadius:"50%",
          background: (i % 5 === 0) ? "#f0c850" : "#f0e8d8",
          animation:`twinkle ${dur}s ease-in-out ${del}s infinite`,
          boxShadow: (i % 5 === 0) ? "0 0 6px #f0c850" : "none"
        }} />
      );
    })}

    {/* Sun glow at horizon */}
    <div style={{
      position:"absolute", bottom:"8%", left:"50%", transform:"translateX(-50%)",
      width:500, height:250, borderRadius:"50%",
      background:"radial-gradient(ellipse, #f8d06088 0%, #e8a04044 30%, transparent 70%)",
      animation:"sunPulse 8s ease-in-out infinite"
    }} />

    {/* Cloud layers */}
    <svg style={{ position:"absolute", bottom:"5%", width:"100%", height:"35%", opacity:0.25 }} viewBox="0 0 1200 400" preserveAspectRatio="none">
      <ellipse cx="200" cy="300" rx="250" ry="60" fill="#e8c0a0" style={{animation:"cloudDrift 20s ease-in-out infinite"}} />
      <ellipse cx="700" cy="280" rx="300" ry="70" fill="#d8a888" style={{animation:"cloudDrift 25s ease-in-out 3s infinite"}} />
      <ellipse cx="1050" cy="320" rx="200" ry="50" fill="#e8c8b0" style={{animation:"cloudDrift 18s ease-in-out 7s infinite"}} />
      <ellipse cx="450" cy="350" rx="280" ry="55" fill="#d0a090" style={{animation:"cloudDrift 22s ease-in-out 5s infinite"}} />
    </svg>

    {/* Temple silhouettes on horizon */}
    <svg style={{ position:"absolute", bottom:"6%", width:"100%", height:"20%", opacity:0.12 }} viewBox="0 0 1200 200" preserveAspectRatio="none">
      {/* Left temple */}
      <g transform="translate(120,40)">
        <rect x="0" y="30" width="8" height="80" fill="#2a1458" />
        <rect x="20" y="30" width="8" height="80" fill="#2a1458" />
        <rect x="40" y="30" width="8" height="80" fill="#2a1458" />
        <rect x="60" y="30" width="8" height="80" fill="#2a1458" />
        <polygon points="-5,30 73,30 34,5" fill="#2a1458" />
        <rect x="-5" y="108" width="78" height="8" fill="#2a1458" />
      </g>
      {/* Center tall temple */}
      <g transform="translate(540,10)">
        <rect x="0" y="40" width="10" height="110" fill="#2a1458" />
        <rect x="25" y="40" width="10" height="110" fill="#2a1458" />
        <rect x="50" y="40" width="10" height="110" fill="#2a1458" />
        <rect x="75" y="40" width="10" height="110" fill="#2a1458" />
        <rect x="100" y="40" width="10" height="110" fill="#2a1458" />
        <polygon points="-8,40 118,40 55,8" fill="#2a1458" />
        <rect x="-8" y="148" width="126" height="10" fill="#2a1458" />
      </g>
      {/* Right small temple */}
      <g transform="translate(950,60)">
        <rect x="0" y="20" width="6" height="60" fill="#2a1458" />
        <rect x="18" y="20" width="6" height="60" fill="#2a1458" />
        <rect x="36" y="20" width="6" height="60" fill="#2a1458" />
        <polygon points="-3,20 45,20 21,2" fill="#2a1458" />
        <rect x="-3" y="78" width="48" height="6" fill="#2a1458" />
      </g>
    </svg>
  </div>
);

// Greek key border SVG
const GreekKey = ({ color = "#d4a030", opacity = 0.4 }) => (
  <svg width="100%" height="14" viewBox="0 0 400 14" preserveAspectRatio="none" style={{ display:"block", opacity }}>
    <defs>
      <pattern id={`gk-${color.replace('#','')}`} x="0" y="0" width="28" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 7H7V0H21V7H28M7 7V14H21V7" stroke={color} strokeWidth="1.5" fill="none" />
      </pattern>
    </defs>
    <rect width="400" height="14" fill={`url(#gk-${color.replace('#','')})`} />
  </svg>
);

// Laurel wreath SVG
const Laurel = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ animation:"float 4s ease-in-out infinite" }}>
    <path d="M24 44C24 44 10 36 10 22C10 14 15 6 24 4" stroke="#8aa050" strokeWidth="1.5" fill="none" />
    <path d="M24 44C24 44 38 36 38 22C38 14 33 6 24 4" stroke="#8aa050" strokeWidth="1.5" fill="none" />
    {[12,18,24,30,36].map((y,i) => (
      <g key={i}>
        <ellipse cx={14-i*0.3} cy={y} rx="4" ry="2.5" transform={`rotate(${-25+i*10} ${14-i*0.3} ${y})`} fill="#6b8040" opacity="0.7" />
        <ellipse cx={34+i*0.3} cy={y} rx="4" ry="2.5" transform={`rotate(${25-i*10} ${34+i*0.3} ${y})`} fill="#6b8040" opacity="0.7" />
      </g>
    ))}
    <circle cx="24" cy="4" r="2" fill="#f0c850" />
  </svg>
);

// Greek pottery-style decorative figure (warrior silhouette)
const PotteryFigure = ({ side = "left" }) => (
  <svg width="80" height="120" viewBox="0 0 80 120" fill="none" style={{
    position:"absolute", [side]:"-20px", bottom:"20px", opacity:0.08,
    transform: side === "right" ? "scaleX(-1)" : "none"
  }}>
    {/* Warrior with spear */}
    <circle cx="40" cy="15" r="10" fill="#d86830" />
    <path d="M40 25 L40 65" stroke="#d86830" strokeWidth="3" />
    <path d="M40 35 L25 50" stroke="#d86830" strokeWidth="2.5" />
    <path d="M40 35 L55 28 L58 20" stroke="#d86830" strokeWidth="2.5" />
    <path d="M40 65 L30 95" stroke="#d86830" strokeWidth="2.5" />
    <path d="M40 65 L50 95" stroke="#d86830" strokeWidth="2.5" />
    <ellipse cx="55" cy="18" rx="2" ry="6" fill="#d86830" transform="rotate(-20 55 18)" />
    {/* Shield */}
    <circle cx="26" cy="48" r="10" stroke="#d86830" strokeWidth="2" fill="none" />
    <circle cx="26" cy="48" r="5" stroke="#d86830" strokeWidth="1" fill="none" />
  </svg>
);

/* ================================================================
   UI COMPONENTS
   ================================================================ */

// Cloud-shaped panel container (the signature Hercules look)
const CloudPanel = ({ children, glow, style: extra = {} }) => (
  <div style={{
    position:"relative",
    background:"linear-gradient(160deg, #1a1040dd 0%, #140a30cc 40%, #1a1040bb 100%)",
    border:"1.5px solid #d4a03025",
    borderRadius:28,
    padding:"32px 28px",
    backdropFilter:"blur(16px)",
    boxShadow: glow
      ? "0 0 60px #d4a03015, 0 8px 32px #00000044, inset 0 1px 0 #d4a03015"
      : "0 8px 32px #00000044, inset 0 1px 0 #ffffff08",
    overflow:"hidden",
    ...extra
  }}>
    {/* Inner warm glow */}
    {glow && <div style={{
      position:"absolute", top:"-30%", left:"50%", transform:"translateX(-50%)",
      width:"80%", height:"60%", borderRadius:"50%",
      background:"radial-gradient(ellipse, #d4a03012 0%, transparent 70%)",
      pointerEvents:"none"
    }} />}
    <div style={{ position:"relative", zIndex:1 }}>{children}</div>
  </div>
);

// Gold button with Hercules warm style
const GoldBtn = ({ children, onClick, disabled, variant = "gold", style: extra = {} }) => {
  const styles = {
    gold: {
      bg: disabled ? "#2a1a4a" : "linear-gradient(135deg, #a07818, #d4a030, #f0c850, #d4a030, #a07818)",
      color: disabled ? "#5a4a3a" : "#140a08",
      border: "none",
      shadow: disabled ? "none" : "0 4px 24px #d4a03044, 0 1px 0 #f8e8a8 inset"
    },
    war: {
      bg: disabled ? "#2a1a4a" : "linear-gradient(135deg, #8a2010, #c04030, #e85040, #c04030, #8a2010)",
      color: disabled ? "#5a4a3a" : "#fff",
      border: "none",
      shadow: disabled ? "none" : "0 4px 24px #c0403044"
    },
    ghost: {
      bg: "transparent",
      color: "#d4a030",
      border: "1.5px solid #d4a03035",
      shadow: "none"
    }
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: s.bg, color: s.color, border: s.border,
      borderRadius: 14, padding: "14px 30px",
      fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 15,
      cursor: disabled ? "not-allowed" : "pointer",
      letterSpacing: 1, transition: "all 0.3s",
      boxShadow: s.shadow, backgroundSize: "200% auto",
      ...extra
    }}>
      {children}
    </button>
  );
};

const Spinner = ({ color = "#f0c850" }) => (
  <span style={{
    display:"inline-block", width:18, height:18,
    border:`2px solid ${color}33`, borderTopColor:color,
    borderRadius:"50%", animation:"spin 0.7s linear infinite"
  }} />
);

const SectionTitle = ({ title, subtitle, icon }) => (
  <div style={{ textAlign:"center", marginBottom:40, position:"relative" }}>
    {icon && <div style={{ fontSize:36, marginBottom:4 }}>{icon}</div>}
    <h1 style={{
      fontFamily:"'Cinzel Decorative', 'Cinzel', serif",
      fontSize:"clamp(30px, 6vw, 48px)", fontWeight:900,
      background:"linear-gradient(135deg, #d4a030, #f0c850, #f8e8a8, #f0c850, #d4a030)",
      backgroundSize:"200% auto",
      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      backgroundClip:"text",
      animation:"shimmerGold 4s linear infinite",
      letterSpacing:4, lineHeight:1.2,
      filter:"drop-shadow(0 2px 8px #d4a03044)"
    }}>
      {title}
    </h1>
    {subtitle && (
      <p style={{
        fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic",
        color:"var(--cloud-mid)", marginTop:12, maxWidth:520,
        margin:"12px auto 0", fontSize:17, lineHeight:1.7, fontWeight:500
      }}>{subtitle}</p>
    )}
    <div style={{ maxWidth:350, margin:"18px auto 0" }}><GreekKey /></div>
  </div>
);

/* ================================================================
   FORMAT ORACLE RESPONSE
   ================================================================ */
const formatResponse = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const c = line.replace(/\*\*/g, "");
    if (line.startsWith("##")) return <h3 key={i} style={{ color:"var(--gold-bright)", fontFamily:"'Cinzel', serif", fontSize:17, margin:"22px 0 8px", fontWeight:700, letterSpacing:1 }}>{c.replace(/^#+\s*/,"")}</h3>;
    if (line.match(/^\*\*.*\*\*/) && line.includes(":")) {
      const ci = line.indexOf(":");
      return <p key={i} style={{ margin:"10px 0", lineHeight:1.9, fontSize:16 }}>
        <strong style={{ color:"var(--gold-bright)", fontFamily:"'Cinzel', serif", fontSize:15 }}>{line.substring(0,ci).replace(/\*\*/g,"")}</strong>
        :{" "}<span style={{ color:"var(--text-warm)" }}>{line.substring(ci+1).replace(/\*\*/g,"")}</span>
      </p>;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) return <p key={i} style={{ margin:"6px 0 6px 12px", lineHeight:1.8, color:"var(--text-warm)", paddingLeft:14, borderLeft:"2px solid #d4a03030", fontSize:16 }}>{c.replace(/^[-*]\s*/,"")}</p>;
    if (line.trim() === "") return <div key={i} style={{ height:10 }} />;
    return <p key={i} style={{ margin:"7px 0", lineHeight:1.9, color:"var(--text-warm)", fontSize:16 }}>{c}</p>;
  });
};

/* ================================================================
   LOGIN GATE
   ================================================================ */
const LoginGate = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleLogin = async () => {
    if (!name.trim() || !password.trim()) { setError("The Oracle requires both your name and the sacred password."); return; }
    setChecking(true); setError("");
    try {
      const res = await fetch("/api/auth", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ password }) });
      const data = await res.json();
      if (data.success) {
        const user = name.trim().toLowerCase();
        sessionStorage.setItem("oracle_user", user);
        sessionStorage.setItem("oracle_auth", "true");
        onLogin(user);
      } else {
        setError(data.error || "The gates remain sealed.");
      }
    } catch { setError("The cosmos trembles... try again."); }
    setChecking(false);
  };

  return (
    <div style={{ minHeight:"100vh", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <SkyBackground />
      <div style={{
        position:"relative", zIndex:10, width:"100%", maxWidth:440, padding:"0 24px",
        animation:"fadeUp 0.8s ease both"
      }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <Laurel size={56} />
          <h1 style={{
            fontFamily:"'Cinzel Decorative', 'Cinzel', serif",
            fontSize:"clamp(28px, 6vw, 42px)", fontWeight:900,
            background:"linear-gradient(135deg, #d4a030, #f0c850, #f8e8a8, #f0c850, #d4a030)",
            backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", animation:"shimmerGold 4s linear infinite",
            letterSpacing:3, lineHeight:1.2, marginTop:8,
            filter:"drop-shadow(0 2px 8px #d4a03044)"
          }}>Oracle of Power</h1>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", color:"var(--cloud-mid)", marginTop:10, fontSize:16, lineHeight:1.6 }}>
            Only those who know the sacred password may enter the Temple
          </p>
          <div style={{ maxWidth:280, margin:"16px auto 0" }}><GreekKey /></div>
        </div>

        <CloudPanel glow>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div>
              <label style={{ fontFamily:"'Cinzel', serif", fontSize:11, color:"var(--gold)", letterSpacing:4, fontWeight:700, display:"block", marginBottom:8 }}>YOUR NAME</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="How shall the Oracle address you?"
                style={{
                  width:"100%", background:"#0a042015", border:"1.5px solid #d4a03020",
                  borderRadius:12, padding:"14px 18px", color:"var(--text-light)",
                  fontSize:17, outline:"none", fontWeight:500,
                  transition:"border-color 0.3s"
                }}
                onFocus={e => e.target.style.borderColor = "#d4a03050"}
                onBlur={e => e.target.style.borderColor = "#d4a03020"}
                onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
              />
            </div>
            <div>
              <label style={{ fontFamily:"'Cinzel', serif", fontSize:11, color:"var(--gold)", letterSpacing:4, fontWeight:700, display:"block", marginBottom:8 }}>SACRED PASSWORD</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Speak the words of passage..."
                style={{
                  width:"100%", background:"#0a042015", border:"1.5px solid #d4a03020",
                  borderRadius:12, padding:"14px 18px", color:"var(--text-light)",
                  fontSize:17, outline:"none", fontWeight:500,
                  transition:"border-color 0.3s"
                }}
                onFocus={e => e.target.style.borderColor = "#d4a03050"}
                onBlur={e => e.target.style.borderColor = "#d4a03020"}
                onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
              />
            </div>
            {error && <p style={{ color:"#e85040", fontSize:14, fontStyle:"italic", textAlign:"center" }}>{error}</p>}
            <GoldBtn onClick={handleLogin} disabled={checking} style={{ width:"100%", marginTop:4 }}>
              {checking ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}><Spinner /> Verifying...</span> : "Enter the Temple"}
            </GoldBtn>
          </div>
        </CloudPanel>

        <p style={{ textAlign:"center", marginTop:24, fontSize:13, color:"#4a3828", fontStyle:"italic" }}>
          Each mortal's scrolls are their own — private and unseen by others
        </p>
      </div>
    </div>
  );
};

/* ================================================================
   MAIN APP
   ================================================================ */
export default function OracleOfPower() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [page, setPage] = useState("oracle");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [lawFilter, setLawFilter] = useState("All");
  const [expandedLaw, setExpandedLaw] = useState(null);
  const [scenario, setScenario] = useState("");
  const [scenarioResponse, setScenarioResponse] = useState("");
  const [scenarioLoading, setScenarioLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [searchLaw, setSearchLaw] = useState("");
  const [history, setHistory] = useState([]);
  const [expandedSaved, setExpandedSaved] = useState(null);

  // Check session on mount
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("oracle_user");
    const sessionAuth = sessionStorage.getItem("oracle_auth");
    if (sessionAuth === "true" && sessionUser) {
      setUser(sessionUser);
      setAuthed(true);
    }
  }, []);

  // Load per-user saved scrolls
  useEffect(() => {
    if (!user) return;
    try { const s = localStorage.getItem(`oracle_saved_${user}`); if (s) setSaved(JSON.parse(s)); } catch {}
  }, [user]);

  const handleLogin = (username) => { setUser(username); setAuthed(true); };

  const handleLogout = () => {
    sessionStorage.removeItem("oracle_user");
    sessionStorage.removeItem("oracle_auth");
    setAuthed(false); setUser(""); setSaved([]); setHistory([]);
    setResponse(""); setScenarioResponse("");
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const saveItem = (q, r, type) => {
    const item = { id: Date.now(), query: q, response: r, type, date: new Date().toISOString() };
    const updated = [item, ...saved];
    setSaved(updated);
    try { localStorage.setItem(`oracle_saved_${user}`, JSON.stringify(updated)); } catch {}
    showToast("Inscribed upon the sacred scrolls");
  };

  const removeSaved = (id) => {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    try { localStorage.setItem(`oracle_saved_${user}`, JSON.stringify(updated)); } catch {}
  };

  const askOracle = async (message, setter, loadSetter, isSim = false) => {
    if (!message?.trim()) return;
    loadSetter(true); setter("");
    try {
      const prefix = isSim
        ? "SCENARIO SIMULATION:\n\n" + message + "\n\nAnalyze through ALL relevant Laws of Power. For each: why it applies, a specific tactical move, potential reversals. Then synthesize a MASTER STRATEGY step-by-step. Be specific and actionable."
        : message;
      const res = await fetch("/api/oracle", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ message: prefix }) });
      const data = await res.json();
      const text = data.response || data.error || "The stars are silent...";
      setter(text);
      if (!isSim) setHistory(prev => [...prev, { q: message, r: text }]);
    } catch { setter("The Oracle's connection to the cosmos has been disrupted..."); }
    loadSetter(false);
  };

  const dailyLaw = useMemo(() => {
    const d = new Date();
    return LAWS[(d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % 48];
  }, []);

  const filteredLaws = useMemo(() => {
    let ls = lawFilter === "All" ? LAWS : LAWS.filter(l => l.cat === lawFilter);
    if (searchLaw.trim()) {
      const s = searchLaw.toLowerCase();
      ls = ls.filter(l => l.name.toLowerCase().includes(s) || l.brief.toLowerCase().includes(s) || String(l.n) === s);
    }
    return ls;
  }, [lawFilter, searchLaw]);

  if (!authed) return <LoginGate onLogin={handleLogin} />;

  const navItems = [
    { id:"oracle", label:"Oracle", icon:"\uD83C\uDFDB\uFE0F" },
    { id:"laws", label:"The 48 Laws", icon:"\uD83D\uDCDC" },
    { id:"simulator", label:"War Room", icon:"\u2694\uFE0F" },
    { id:"daily", label:"Today's Law", icon:"\u2600\uFE0F" },
    { id:"saved", label:"Scrolls", icon:"\uD83D\uDD16" },
  ];

  const inputStyle = {
    width:"100%", background:"#0a042015", border:"1.5px solid #d4a03020",
    borderRadius:14, padding:"16px 20px", color:"var(--text-light)",
    fontSize:17, resize:"vertical", outline:"none", lineHeight:1.7,
    fontWeight:500, transition:"border-color 0.3s",
    backdropFilter:"blur(4px)"
  };

  return (
    <div style={{ minHeight:"100vh", position:"relative" }}>
      <SkyBackground />

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", top:24, left:"50%", transform:"translateX(-50%)", zIndex:200,
          background:"linear-gradient(135deg, #1a1040ee, #140a30ee)",
          border:"1.5px solid var(--gold)", borderRadius:14, padding:"12px 32px",
          color:"var(--gold-bright)", fontFamily:"'Cinzel', serif", fontSize:13,
          animation:"fadeUp 0.3s ease", boxShadow:"0 12px 40px #00000088",
          letterSpacing:1, backdropFilter:"blur(16px)"
        }}>{toast}</div>
      )}

      {/* Navigation */}
      <nav style={{
        position:"sticky", top:0, zIndex:100,
        background:"linear-gradient(180deg, #08041af0, #08041acc, #08041a00)",
        padding:"12px 24px 18px", display:"flex", justifyContent:"center", alignItems:"center", gap:3,
        backdropFilter:"blur(20px)"
      }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            background: page === item.id ? "linear-gradient(135deg, #2a1458cc, #3a2068cc)" : "transparent",
            border: page === item.id ? "1px solid #d4a03040" : "1px solid transparent",
            borderRadius:12, padding:"10px 16px",
            color: page === item.id ? "var(--gold-bright)" : "var(--text-muted)",
            cursor:"pointer", fontFamily:"'Cinzel', serif", fontSize:13,
            fontWeight: page === item.id ? 700 : 500,
            transition:"all 0.3s", display:"flex", alignItems:"center", gap:6
          }}>
            <span style={{ fontSize:14 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div style={{ position:"absolute", right:24, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'Cinzel', serif", fontSize:12, color:"var(--text-muted)", letterSpacing:1 }}>
            {user.charAt(0).toUpperCase() + user.slice(1)}
          </span>
          <button onClick={handleLogout} style={{
            background:"none", border:"1px solid #d4a03020", borderRadius:8,
            padding:"6px 12px", color:"var(--text-muted)", cursor:"pointer",
            fontFamily:"'Cinzel', serif", fontSize:11, letterSpacing:1, transition:"all 0.2s"
          }}>Leave</button>
        </div>
      </nav>

      <main style={{ maxWidth:820, margin:"0 auto", padding:"8px 24px 80px", position:"relative", zIndex:10 }}>

        {/* ======================== ORACLE ======================== */}
        {page === "oracle" && (
          <div className="page-enter">
            <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>
              <Laurel size={52} />
            </div>
            <SectionTitle
              title="Oracle of Power"
              subtitle="Approach the temple, mortal. Speak your question and the ancient laws shall illuminate your path through the treacherous labyrinth of power."
            />

            <CloudPanel glow>
              <PotteryFigure side="left" />
              <PotteryFigure side="right" />
              <label style={{
                fontFamily:"'Cinzel', serif", fontSize:12, color:"var(--gold)",
                display:"block", marginBottom:14, letterSpacing:4, fontWeight:700
              }}>
                SPEAK YOUR QUESTION
              </label>
              <textarea
                value={query} onChange={e => setQuery(e.target.value)}
                placeholder="How do I handle a rival who undermines me? What's the best strategy for negotiation? How do I build influence in a new organization?"
                rows={4} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#d4a03050"}
                onBlur={e => e.target.style.borderColor = "#d4a03020"}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) askOracle(query, setResponse, setLoading); }}
              />
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"14px 0" }}>
                {["How do I gain influence?","Someone betrayed my trust","Negotiate from weakness","Build my reputation"].map(p => (
                  <button key={p} onClick={() => setQuery(p)} style={{
                    background:"#d4a03008", border:"1px solid #d4a03018", borderRadius:20,
                    padding:"7px 16px", color:"var(--text-muted)", cursor:"pointer", fontSize:14,
                    fontFamily:"'Cormorant Garamond', serif", fontWeight:600, transition:"all 0.2s"
                  }}>{p}</button>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"#4a3828", fontStyle:"italic" }}>Cmd+Enter to consult</span>
                <GoldBtn onClick={() => askOracle(query, setResponse, setLoading)} disabled={loading || !query.trim()}>
                  {loading ? <span style={{ display:"flex", alignItems:"center", gap:10 }}><Spinner /> Consulting the stars...</span> : "Consult the Oracle"}
                </GoldBtn>
              </div>
            </CloudPanel>

            {response && (
              <CloudPanel style={{ marginTop:24, animation:"fadeUp 0.5s ease" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <h2 style={{ fontFamily:"'Cinzel', serif", color:"var(--gold-bright)", fontSize:20, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
                    The Oracle Speaks
                  </h2>
                  <GoldBtn variant="ghost" onClick={() => saveItem(query, response, "oracle")} style={{ padding:"8px 18px", fontSize:12, borderRadius:10 }}>
                    Save to Scrolls
                  </GoldBtn>
                </div>
                <GreekKey opacity={0.25} />
                <div style={{ marginTop:16 }}>{formatResponse(response)}</div>
              </CloudPanel>
            )}

            {history.length > 1 && (
              <div style={{ marginTop:36 }}>
                <h3 style={{ fontFamily:"'Cinzel', serif", color:"var(--text-muted)", fontSize:12, letterSpacing:4, marginBottom:14, fontWeight:600 }}>PREVIOUS CONSULTATIONS</h3>
                {history.slice(0,-1).reverse().slice(0,5).map((h,i) => (
                  <div key={i} onClick={() => { setQuery(h.q); setResponse(h.r); window.scrollTo({top:0,behavior:"smooth"}); }} style={{
                    background:"#0a042020", border:"1px solid #d4a03012", borderRadius:14,
                    padding:"14px 20px", marginBottom:8, cursor:"pointer", transition:"border-color 0.2s",
                    backdropFilter:"blur(8px)"
                  }}>
                    <p style={{ color:"var(--gold)", fontSize:15, fontWeight:700, fontFamily:"'Cinzel', serif" }}>{h.q}</p>
                    <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:4 }}>{h.r.substring(0,110).replace(/\*\*/g,"")}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================== LAWS BROWSER ======================== */}
        {page === "laws" && (
          <div className="page-enter">
            <SectionTitle title="The 48 Laws" subtitle="The sacred texts of power, inscribed upon the temple walls since the age of gods and mortals" />

            <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:20 }}>
              {CATEGORIES.map(cat => {
                const active = lawFilter === cat;
                const col = cat === "All" ? "#d4a030" : CAT_COLORS[cat];
                return (
                  <button key={cat} onClick={() => setLawFilter(cat)} style={{
                    background: active ? `linear-gradient(135deg, ${col}cc, ${col})` : "#0a042030",
                    border: `1.5px solid ${active ? col : "#d4a03018"}`,
                    borderRadius:24, padding:"8px 20px",
                    color: active ? (cat === "Warfare" || cat === "People" ? "#fff" : "#140a08") : "var(--text-muted)",
                    cursor:"pointer", fontFamily:"'Cinzel', serif", fontSize:13, fontWeight:700,
                    transition:"all 0.2s", backdropFilter:"blur(8px)"
                  }}>{cat}</button>
                );
              })}
            </div>

            <input type="text" value={searchLaw} onChange={e => setSearchLaw(e.target.value)}
              placeholder="Search by name, keyword, or number..."
              style={{ ...inputStyle, marginBottom:20, fontSize:16 }}
              onFocus={e => e.target.style.borderColor = "#d4a03050"}
              onBlur={e => e.target.style.borderColor = "#d4a03020"}
            />

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {filteredLaws.map((law, idx) => {
                const open = expandedLaw === law.n;
                const col = CAT_COLORS[law.cat];
                return (
                  <div key={law.n} onClick={() => setExpandedLaw(open ? null : law.n)} style={{
                    background: open ? "linear-gradient(145deg, #1a1040dd, #140a30cc)" : "#0a042025",
                    border: `1.5px solid ${open ? col + "50" : "#d4a03012"}`,
                    borderRadius:18, padding: open ? "22px 24px" : "14px 20px",
                    cursor:"pointer", transition:"all 0.3s",
                    animation: `fadeUp 0.3s ease ${Math.min(idx*0.02,0.4)}s both`,
                    backdropFilter:"blur(12px)"
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{
                        width:48, height:48, borderRadius:"50%",
                        background: open ? `linear-gradient(135deg, ${col}dd, ${col})` : "#1a104044",
                        border: `2px solid ${col}${open ? "88" : "30"}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"'Cinzel Decorative', serif", fontWeight:900, fontSize:17,
                        color: open ? "#fff" : col,
                        flexShrink:0, transition:"all 0.3s",
                        boxShadow: open ? `0 0 20px ${col}33` : "none"
                      }}>{law.n}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <h3 style={{
                          fontFamily:"'Cinzel', serif", fontSize:15, fontWeight:700,
                          color: open ? "var(--gold-pale)" : "var(--text-light)", lineHeight:1.3
                        }}>{law.name}</h3>
                        <span style={{
                          fontSize:11, color: col, fontFamily:"'Cinzel', serif",
                          letterSpacing:2, fontWeight:700, marginTop:3, display:"inline-block"
                        }}>{law.cat.toUpperCase()}</span>
                      </div>
                      <span style={{ color:"var(--text-muted)", fontSize:14, transition:"transform 0.3s", transform: open ? "rotate(180deg)" : "none" }}>&#9662;</span>
                    </div>
                    {open && (
                      <div style={{ marginTop:18, paddingTop:18, borderTop:`1px solid ${col}20`, animation:"fadeUp 0.3s ease" }}>
                        <p style={{ color:"var(--text-warm)", lineHeight:1.9, fontSize:16, fontStyle:"italic" }}>
                          &ldquo;{law.brief}&rdquo;
                        </p>
                        <div style={{ display:"flex", gap:8, marginTop:18, flexWrap:"wrap" }}>
                          <GoldBtn variant="ghost" onClick={e => { e.stopPropagation(); setPage("oracle"); setQuery(`Deep strategic breakdown of Law ${law.n}: "${law.name}". Historical examples, modern applications, reversals, connections to other laws.`); }} style={{ padding:"8px 18px", fontSize:12, borderRadius:10 }}>
                            Ask the Oracle
                          </GoldBtn>
                          <GoldBtn variant="ghost" onClick={e => { e.stopPropagation(); setPage("simulator"); setScenario(`Apply Law ${law.n}: "${law.name}" — `); }} style={{ padding:"8px 18px", fontSize:12, borderRadius:10, borderColor:"#e8504030", color:"#e85040" }}>
                            War Room
                          </GoldBtn>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================== WAR ROOM ======================== */}
        {page === "simulator" && (
          <div className="page-enter">
            <SectionTitle icon={"⚔️"} title="The War Room" subtitle="Describe your battlefield. The Oracle shall forge your strategy from the complete arsenal of the 48 Laws." />

            <CloudPanel>
              <label style={{ fontFamily:"'Cinzel', serif", fontSize:12, color:"#e85040", display:"block", marginBottom:14, letterSpacing:4, fontWeight:700 }}>
                DESCRIBE YOUR SCENARIO
              </label>
              <textarea
                value={scenario} onChange={e => setScenario(e.target.value)}
                placeholder={"My coworker is subtly undermining me in meetings by taking credit for my ideas. My boss seems unaware. I need to reclaim my position without appearing petty...\n\nBe as specific as possible — the Oracle rewards detail."}
                rows={7}
                style={{ ...inputStyle, borderColor:"#e8504018" }}
                onFocus={e => e.target.style.borderColor = "#e8504040"}
                onBlur={e => e.target.style.borderColor = "#e8504018"}
              />
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"14px 0" }}>
                {["Workplace politics","Negotiation","Social dynamics","Leadership","Business competition","Relationship strategy"].map(tag => (
                  <button key={tag} onClick={() => setScenario(prev => (prev ? prev + "\n\nContext: " : "") + tag + " — ")} style={{
                    background:"#e8504008", border:"1px solid #e8504015", borderRadius:20,
                    padding:"7px 16px", color:"var(--text-muted)", cursor:"pointer", fontSize:14,
                    fontFamily:"'Cormorant Garamond', serif", fontWeight:600
                  }}>{tag}</button>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <GoldBtn variant="war" onClick={() => askOracle(scenario, setScenarioResponse, setScenarioLoading, true)} disabled={scenarioLoading || !scenario.trim()}>
                  {scenarioLoading ? <span style={{ display:"flex", alignItems:"center", gap:10 }}><Spinner color="#ff8060" /> Forging strategy...</span> : "Deploy Battle Strategy"}
                </GoldBtn>
              </div>
            </CloudPanel>

            {scenarioResponse && (
              <CloudPanel style={{ marginTop:24, animation:"fadeUp 0.5s ease" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <h2 style={{ fontFamily:"'Cinzel', serif", color:"#e85040", fontSize:20, fontWeight:700 }}>
                    ⚔️ Battle Strategy Deployed
                  </h2>
                  <GoldBtn variant="ghost" onClick={() => saveItem(scenario, scenarioResponse, "simulator")} style={{ padding:"8px 18px", fontSize:12, borderRadius:10 }}>
                    Save
                  </GoldBtn>
                </div>
                <GreekKey color="#e85040" opacity={0.2} />
                <div style={{ marginTop:16 }}>{formatResponse(scenarioResponse)}</div>
              </CloudPanel>
            )}
          </div>
        )}

        {/* ======================== DAILY LAW ======================== */}
        {page === "daily" && (
          <div className="page-enter">
            <SectionTitle title="Today's Law" subtitle="The Fates have decreed this law shall guide your path today" />

            <CloudPanel glow style={{ textAlign:"center", padding:"44px 32px", animation:"gentleBreathe 8s ease-in-out infinite" }}>
              <div style={{
                width:100, height:100, borderRadius:"50%",
                background:"linear-gradient(135deg, #a07818, #d4a030, #f0c850, #f8e8a8)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 28px",
                fontFamily:"'Cinzel Decorative', serif", fontSize:40, fontWeight:900, color:"#140a08",
                boxShadow:"0 0 50px #d4a03044, 0 0 100px #d4a03022"
              }}>{dailyLaw.n}</div>

              <h2 style={{
                fontFamily:"'Cinzel', serif",
                fontSize:"clamp(22px, 4vw, 30px)", fontWeight:800,
                color:"var(--gold-pale)", lineHeight:1.3,
                textShadow:"0 0 30px #d4a03033"
              }}>{dailyLaw.name}</h2>

              <div style={{
                display:"inline-block", marginTop:10,
                background:`${CAT_COLORS[dailyLaw.cat]}18`,
                border:`1px solid ${CAT_COLORS[dailyLaw.cat]}35`,
                borderRadius:20, padding:"5px 18px",
                fontSize:12, color:CAT_COLORS[dailyLaw.cat], fontFamily:"'Cinzel', serif",
                letterSpacing:3, fontWeight:700
              }}>{dailyLaw.cat.toUpperCase()}</div>

              <div style={{ maxWidth:350, margin:"20px auto" }}><GreekKey /></div>

              <p style={{
                fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic",
                color:"var(--text-warm)", lineHeight:2, fontSize:18, fontWeight:500,
                maxWidth:560, margin:"0 auto"
              }}>&ldquo;{dailyLaw.brief}&rdquo;</p>

              <GoldBtn onClick={() => {
                setPage("oracle");
                setQuery(`Deep dive on Law ${dailyLaw.n}: "${dailyLaw.name}". Historical examples, modern applications, reversals, connections to other laws.`);
              }} style={{ marginTop:32 }}>
                Seek deeper wisdom
              </GoldBtn>
            </CloudPanel>

            <div style={{ marginTop:40 }}>
              <h3 style={{ fontFamily:"'Cinzel', serif", color:"var(--text-muted)", fontSize:12, letterSpacing:4, marginBottom:16, fontWeight:600 }}>RELATED LAWS</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {LAWS.filter(l => l.cat === dailyLaw.cat && l.n !== dailyLaw.n).slice(0,4).map(law => (
                  <div key={law.n} onClick={() => {
                    setPage("oracle");
                    setQuery(`How do Laws ${dailyLaw.n} and ${law.n} ("${law.name}") combine? Practical examples.`);
                  }} style={{
                    background:"#0a042025", border:"1px solid #d4a03012", borderRadius:16,
                    padding:"14px 18px", cursor:"pointer", transition:"border-color 0.2s",
                    backdropFilter:"blur(8px)"
                  }}>
                    <span style={{ fontFamily:"'Cinzel Decorative', serif", fontWeight:900, color:CAT_COLORS[law.cat], fontSize:22, marginRight:12 }}>{law.n}</span>
                    <span style={{ color:"var(--text-warm)", fontSize:14, fontFamily:"'Cinzel', serif", lineHeight:1.3 }}>{law.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================== SAVED SCROLLS ======================== */}
        {page === "saved" && (
          <div className="page-enter">
            <SectionTitle title="Sacred Scrolls" subtitle="Your collected wisdom, preserved in the temple archives" />

            {saved.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px" }}>
                <div style={{ fontSize:56, marginBottom:20, opacity:0.3 }}>📜</div>
                <p style={{ color:"var(--text-muted)", fontSize:17, lineHeight:1.8, maxWidth:420, margin:"0 auto", fontStyle:"italic" }}>
                  The scrolls are empty. Consult the Oracle or enter the War Room, and save the wisdom that resonates.
                </p>
                <GoldBtn onClick={() => setPage("oracle")} style={{ marginTop:28 }}>Visit the Oracle</GoldBtn>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {saved.map((item, idx) => {
                  const open = expandedSaved === item.id;
                  return (
                    <div key={item.id} style={{
                      background:"#0a042025", border:`1.5px solid ${item.type === "simulator" ? "#e8504018" : "#d4a03018"}`,
                      borderRadius:18, padding:"22px 24px",
                      animation:`fadeUp 0.3s ease ${idx*0.05}s both`, backdropFilter:"blur(12px)"
                    }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div style={{ flex:1, cursor:"pointer" }} onClick={() => setExpandedSaved(open ? null : item.id)}>
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                            <span style={{
                              fontSize:11, fontFamily:"'Cinzel', serif", letterSpacing:3, fontWeight:700,
                              color: item.type === "simulator" ? "#e85040" : "var(--gold)"
                            }}>{item.type === "simulator" ? "⚔️ WAR ROOM" : "🏛️ ORACLE"}</span>
                            <span style={{ fontSize:12, color:"var(--text-muted)", fontStyle:"italic" }}>
                              {new Date(item.date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                            </span>
                          </div>
                          <h3 style={{ fontFamily:"'Cinzel', serif", color:"var(--text-light)", fontSize:15, fontWeight:700, lineHeight:1.4 }}>
                            {item.query.length > 120 ? item.query.substring(0,120)+"..." : item.query}
                          </h3>
                        </div>
                        <button onClick={() => removeSaved(item.id)} style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:22, padding:"0 4px" }}>&times;</button>
                      </div>
                      {open ? (
                        <div style={{ marginTop:18, paddingTop:18, borderTop:"1px solid #d4a03012", animation:"fadeUp 0.3s ease" }}>
                          {formatResponse(item.response)}
                        </div>
                      ) : (
                        <div onClick={() => setExpandedSaved(item.id)} style={{
                          marginTop:10, cursor:"pointer", maxHeight:55, overflow:"hidden",
                          maskImage:"linear-gradient(180deg, #000 20%, transparent)",
                          WebkitMaskImage:"linear-gradient(180deg, #000 20%, transparent)"
                        }}>
                          <p style={{ color:"var(--text-muted)", fontSize:14, lineHeight:1.7 }}>{item.response.substring(0,180).replace(/\*\*/g,"")}...</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign:"center", padding:"60px 24px 36px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:280, margin:"0 auto 14px" }}><GreekKey opacity={0.15} /></div>
        <p style={{ fontFamily:"'Cinzel', serif", color:"#d4a03025", fontSize:11, letterSpacing:4, fontWeight:600 }}>
          THE ORACLE OF POWER
        </p>
      </footer>
    </div>
  );
}
