import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = ["About","Services","Systems","Projects","Process","Contact"];

const SERVICES = [
  {
    id:"automation",
    icon:"⚡",
    title:"AI Automation",
    sub:"Systems",
    desc:"Intelligent workflow engines that eliminate repetitive tasks and orchestrate complex business processes across every platform.",
    features:["Multi-agent pipelines","Smart task routing","Real-time triggers","API mesh integrations"],
    color:"#00d4ff",
    glow:"rgba(0,212,255,0.15)"
  },
  {
    id:"crm",
    icon:"◈",
    title:"Custom CRM",
    sub:"Development",
    desc:"Enterprise-grade relationship engines with AI scoring, predictive analytics, and embedded automation at every touchpoint.",
    features:["Lead intelligence","Pipeline forecasting","Team command center","Embedded AI insights"],
    color:"#7c3aed",
    glow:"rgba(124,58,237,0.15)"
  },
  {
    id:"web",
    icon:"◉",
    title:"Web Engineering",
    sub:"& SaaS Platforms",
    desc:"High-performance digital products from immersive frontends to scalable backend infrastructure—built for the AI era.",
    features:["SaaS architectures","AI-integrated UX","E-commerce systems","Internal tools"],
    color:"#06ffa5",
    glow:"rgba(6,255,165,0.15)"
  },
  {
    id:"systems",
    icon:"▣",
    title:"Business Systems",
    sub:"Engineering",
    desc:"End-to-end operational infrastructure connecting people, data, and AI into a single intelligent command layer.",
    features:["Operations architecture","Data pipelines","Client portals","Scalable ecosystems"],
    color:"#ff6b35",
    glow:"rgba(255,107,53,0.15)"
  },
  {
    id:"ai",
    icon:"◎",
    title:"AI Solutions",
    sub:"For Any Business",
    desc:"Bespoke intelligence layers—strategy, implementation, and optimization—tailored to any vertical or workflow challenge.",
    features:["AI strategy consulting","Custom model integrations","Smart optimization","Workflow intelligence"],
    color:"#f59e0b",
    glow:"rgba(245,158,11,0.15)"
  }
];

const PROJECTS = [
  {title:"NexusCore CRM",cat:"AI CRM System",desc:"Full-stack enterprise CRM with embedded AI lead scoring and automated pipeline management for a 500-seat sales org.",tags:["CRM","AI","Automation"],color:"#00d4ff"},
  {title:"FlowOS Platform",cat:"Automation Engine",desc:"Multi-agent workflow orchestration platform processing 2M+ daily tasks with self-healing pipelines and adaptive routing.",tags:["Automation","Agents","API"],color:"#7c3aed"},
  {title:"Meridian SaaS",cat:"Web Platform",desc:"B2B analytics SaaS with real-time dashboards, collaborative workspaces, and AI-generated business insights.",tags:["SaaS","Analytics","UI"],color:"#06ffa5"},
  {title:"Apex Operations Hub",cat:"Business Systems",desc:"Unified command center consolidating 14 business tools into one AI-powered operations layer for a logistics company.",tags:["Systems","AI","Operations"],color:"#ff6b35"},
  {title:"SignalAI Engine",cat:"AI Integration",desc:"Custom NLP processing pipeline extracting structured intelligence from unstructured customer support data at scale.",tags:["AI","NLP","Pipeline"],color:"#f59e0b"},
  {title:"Orbit Commerce",cat:"E-commerce Platform",desc:"Headless e-commerce with AI-powered recommendations, dynamic pricing engine, and automated inventory workflows.",tags:["Commerce","AI","Web"],color:"#ec4899"},
];

const PROCESS_STEPS = [
  {n:"01",title:"Discovery",desc:"Deep dive into your business architecture, pain points, and growth vectors."},
  {n:"02",title:"Strategy",desc:"Custom AI roadmap with defined systems, integrations, and automation priorities."},
  {n:"03",title:"Engineering",desc:"Precision-built solutions by specialists in AI, automation, and systems design."},
  {n:"04",title:"Automation",desc:"Deploy intelligent pipelines that continuously optimize and self-improve."},
  {n:"05",title:"Optimization",desc:"Monitor, measure, and refine every system layer for peak performance."},
  {n:"06",title:"Scaling",desc:"Expand your AI infrastructure as your business grows and evolves."},
];

const TECH = [
  {name:"OpenAI",cat:"AI"},
  {name:"Anthropic",cat:"AI"},
  {name:"LangChain",cat:"AI"},
  {name:"n8n",cat:"Auto"},
  {name:"Make",cat:"Auto"},
  {name:"Zapier",cat:"Auto"},
  {name:"React",cat:"Dev"},
  {name:"Next.js",cat:"Dev"},
  {name:"Node.js",cat:"Dev"},
  {name:"PostgreSQL",cat:"Data"},
  {name:"Supabase",cat:"Data"},
  {name:"Redis",cat:"Data"},
  {name:"HubSpot",cat:"CRM"},
  {name:"Salesforce",cat:"CRM"},
  {name:"Airtable",cat:"CRM"},
  {name:"Stripe",cat:"Infra"},
  {name:"Vercel",cat:"Infra"},
  {name:"AWS",cat:"Infra"},
];

const TESTIMONIALS = [
  {name:"Marcus Chen",role:"CEO, Nexus Technologies",text:"VELIX AI completely transformed our operations. The automation system they built processes what used to take 40 hours a week in under 2 minutes.",avatar:"MC"},
  {name:"Sophia Reeves",role:"VP Sales, Meridian Group",text:"The CRM they engineered gave us intelligence we didn't know was possible. Our pipeline accuracy went from 60% to 94% overnight.",avatar:"SR"},
  {name:"James Okafor",role:"Founder, FlowStack",text:"Not just builders—they're architects. The system they designed for us scaled from zero to 2M daily tasks without a single failure.",avatar:"JO"},
];

function useMousePosition() {
  const [pos, setPos] = useState({x:0,y:0});
  useEffect(()=>{
    const h = e => setPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",h);
    return ()=>window.removeEventListener("mousemove",h);
  },[]);
  return pos;
}

function useInView(threshold=0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setInView(true); },{threshold});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return [ref,inView];
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const pts = Array.from({length:80},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.5+.5,
      a:Math.random()
    }));
    let raf;
    const draw = ()=>{
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,212,255,${p.a*0.4})`;
        ctx.fill();
      });
      pts.forEach((p,i)=>{
        for(let j=i+1;j<pts.length;j++){
          const d=Math.hypot(p.x-pts[j].x,p.y-pts[j].y);
          if(d<120){
            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(0,212,255,${(1-d/120)*0.08})`;
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:0,opacity:.6}}/>;
}

function GridBg() {
  return (
    <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <svg width="100%" height="100%" style={{opacity:.04}}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  );
}

function Card3D({children,style={},className=""}) {
  const ref = useRef(null);
  const [rot,setRot] = useState({x:0,y:0});
  const handleMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    setRot({x:y*-8,y:x*8});
  };
  return (
    <div ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={()=>setRot({x:0,y:0})}
      style={{
        transform:`perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition:"transform 0.1s ease",
        ...style
      }}
      className={className}
    >{children}</div>
  );
}

function AnimatedCounter({to,duration=2000}) {
  const [val,setVal] = useState(0);
  const [ref,inView] = useInView();
  useEffect(()=>{
    if(!inView) return;
    const start=Date.now();
    const tick=()=>{
      const p=Math.min((Date.now()-start)/duration,1);
      setVal(Math.floor(p*to));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[inView,to,duration]);
  return <span ref={ref}>{val}</span>;
}

// Scrolling ticker
function Ticker({items}) {
  return (
    <div style={{overflow:"hidden",position:"relative",padding:"16px 0"}}>
      <div style={{
        display:"flex",gap:"48px",
        animation:"ticker 20s linear infinite",
        width:"max-content"
      }}>
        {[...items,...items].map((t,i)=>(
          <span key={i} style={{
            fontSize:"12px",fontWeight:600,letterSpacing:"0.15em",
            color:"rgba(0,212,255,0.5)",textTransform:"uppercase",
            whiteSpace:"nowrap"
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// Animated dashboard widget
function DashWidget({title,value,change,color,sparkData}) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)",
      border:`1px solid rgba(255,255,255,0.06)`,
      borderRadius:"12px",padding:"16px",
      backdropFilter:"blur(10px)"
    }}>
      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginBottom:"8px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{title}</div>
      <div style={{fontSize:"24px",fontWeight:700,color:"#fff",marginBottom:"4px"}}>{value}</div>
      <div style={{fontSize:"12px",color:change>0?"#06ffa5":"#ff4444"}}>
        {change>0?"↑":"↓"} {Math.abs(change)}% this week
      </div>
      <svg width="100%" height="32" style={{marginTop:"8px"}}>
        <polyline
          points={sparkData.map((v,i)=>`${(i/(sparkData.length-1))*100}%,${(1-v)*28+2}`).join(" ")}
          fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function VelixAI() {
  const mouse = useMousePosition();
  const [activeService,setActiveService] = useState(0);
  const [scrollY,setScrollY] = useState(0);
  const [navOpen,setNavOpen] = useState(false);
  const [formState,setFormState] = useState({name:"",email:"",message:""});
  const [sent,setSent] = useState(false);

  useEffect(()=>{
    const h=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setNavOpen(false);
  };

  const [heroRef,heroInView] = useInView(0.1);
  const [aboutRef,aboutInView] = useInView(0.1);
  const [servRef,servInView] = useInView(0.1);
  const [projRef,projInView] = useInView(0.1);
  const [processRef,processInView] = useInView(0.1);
  const [techRef,techInView] = useInView(0.1);
  const [dashRef,dashInView] = useInView(0.1);
  const [testRef,testInView] = useInView(0.1);
  const [ctaRef,ctaInView] = useInView(0.1);

  const parallax = (speed) => ({ transform:`translateY(${scrollY*speed}px)` });

  const catColors = {AI:"#00d4ff",Auto:"#7c3aed",Dev:"#06ffa5",Data:"#f59e0b",CRM:"#ff6b35",Infra:"rgba(255,255,255,0.5)"};

  return (
    <div style={{
      background:"#050505",
      color:"#fff",
      fontFamily:"'SF Pro Display', 'Helvetica Neue', sans-serif",
      overflowX:"hidden",
      position:"relative"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,0.2)} 50%{box-shadow:0 0 40px rgba(0,212,255,0.5)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes dotPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .card-hover:hover { border-color: rgba(0,212,255,0.3) !important; transform: translateY(-4px); transition: all 0.3s ease; }
        .btn-primary { 
          background: linear-gradient(135deg,#00d4ff,#0099cc);
          color:#000; border:none; padding:14px 32px;
          border-radius:8px; font-size:14px; font-weight:700;
          letter-spacing:0.05em; cursor:pointer; transition:all 0.3s ease;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,212,255,0.4); }
        .btn-ghost {
          background:transparent; color:#fff;
          border:1px solid rgba(255,255,255,0.15); padding:14px 32px;
          border-radius:8px; font-size:14px; font-weight:500;
          letter-spacing:0.05em; cursor:pointer; transition:all 0.3s ease;
        }
        .btn-ghost:hover { border-color:rgba(0,212,255,0.5); color:#00d4ff; }
        input, textarea {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#fff; border-radius:8px; padding:14px 16px;
          font-size:14px; width:100%; font-family:inherit;
          transition:border-color 0.2s;
          outline:none;
        }
        input:focus, textarea:focus { border-color:rgba(0,212,255,0.4); }
        input::placeholder, textarea::placeholder { color:rgba(255,255,255,0.25); }
        .glow-cyan { box-shadow:0 0 30px rgba(0,212,255,0.2); }
        .section { padding: 120px 0; }
        .container { max-width:1200px; margin:0 auto; padding:0 40px; }
        @media(max-width:768px){ .container{padding:0 20px;} .section{padding:80px 0;} }
      `}</style>

      <GridBg/>
      <Particles/>

      {/* Cursor glow */}
      <div style={{
        position:"fixed",
        left:mouse.x-200,top:mouse.y-200,
        width:400,height:400,
        background:"radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)",
        pointerEvents:"none",zIndex:1,
        transition:"left 0.1s ease,top 0.1s ease"
      }}/>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        padding:"0 40px",height:64,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrollY>50?"rgba(5,5,5,0.9)":"transparent",
        backdropFilter:scrollY>50?"blur(20px)":"none",
        borderBottom:scrollY>50?"1px solid rgba(255,255,255,0.05)":"none",
        transition:"all 0.3s ease"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>scrollTo("hero")}>
          {/* Exact VELIX AI Logo */}
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shield outline */}
            <path d="M16 1L2 7v11c0 7.5 5.8 14.5 14 17 8.2-2.5 14-9.5 14-17V7L16 1z" fill="none" stroke="#00d4ff" strokeWidth="1.6" strokeLinejoin="round"/>
            {/* Top horizontal line */}
            <line x1="7" y1="12" x2="25" y2="12" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Middle horizontal line */}
            <line x1="7" y1="18" x2="25" y2="18" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Top node (circle on line) */}
            <circle cx="20" cy="12" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            {/* Middle node left */}
            <circle cx="10" cy="18" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            {/* Middle node right */}
            <circle cx="19" cy="18" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            {/* Bottom V/chevron */}
            <path d="M9 23 L16 30 L23 23" fill="none" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{fontSize:"17px",fontWeight:800,letterSpacing:"0.06em",fontFamily:"Syne, sans-serif",color:"#fff"}}>VELIX AI</span>
        </div>
        <div style={{display:"flex",gap:"32px",alignItems:"center"}} className="nav-links">
          {NAV_LINKS.map(l=>(
            <button key={l} onClick={()=>scrollTo(l.toLowerCase())}
              style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",fontSize:"13px",
                fontWeight:500,cursor:"pointer",letterSpacing:"0.05em",
                transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#00d4ff"}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.6)"}
            >{l}</button>
          ))}
          <button className="btn-primary" style={{padding:"8px 20px",fontSize:"13px"}} onClick={()=>scrollTo("contact")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",paddingTop:64}}>
        {/* Orbital rings */}
        <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",border:"1px solid rgba(0,212,255,0.08)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"spin 30s linear infinite"}}/>
        <div style={{position:"absolute",width:800,height:800,borderRadius:"50%",border:"1px solid rgba(124,58,237,0.05)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"spin 50s linear infinite reverse"}}/>
        <div style={{position:"absolute",width:1000,height:1000,borderRadius:"50%",border:"1px solid rgba(0,212,255,0.03)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"spin 80s linear infinite"}}/>

        <div ref={heroRef} style={{textAlign:"center",zIndex:2,maxWidth:900,padding:"0 40px"}}>
          {/* Badge */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(0,212,255,0.08)",
            border:"1px solid rgba(0,212,255,0.2)",
            borderRadius:100,padding:"6px 16px",marginBottom:"32px",
            animation:"fadeUp 0.6s ease forwards"
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#00d4ff",animation:"pulse 2s infinite",display:"block"}}/>
            <span style={{fontSize:"12px",color:"#00d4ff",letterSpacing:"0.15em",fontWeight:600}}>NEXT-GEN AI ENGINEERING COMPANY</span>
          </div>

          <h1 style={{
            fontSize:"clamp(48px,7vw,96px)",
            fontWeight:800,lineHeight:1.05,
            fontFamily:"Syne, sans-serif",
            marginBottom:"24px",
            opacity:heroInView?1:0,
            transform:heroInView?"none":"translateY(40px)",
            transition:"all 0.8s ease 0.1s"
          }}>
            We Build The<br/>
            <span style={{
              background:"linear-gradient(135deg,#00d4ff,#7c3aed,#06ffa5)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text"
            }}>Future of Business</span>
          </h1>

          <p style={{
            fontSize:"clamp(16px,2vw,20px)",
            color:"rgba(255,255,255,0.55)",
            lineHeight:1.7,maxWidth:600,margin:"0 auto 48px",
            opacity:heroInView?1:0,
            transform:heroInView?"none":"translateY(30px)",
            transition:"all 0.8s ease 0.3s"
          }}>
            AI automation systems, custom CRM development, and intelligent business infrastructure—engineered to transform how companies operate at scale.
          </p>

          <div style={{
            display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",
            opacity:heroInView?1:0,
            transform:heroInView?"none":"translateY(20px)",
            transition:"all 0.8s ease 0.5s"
          }}>
            <button className="btn-primary" onClick={()=>scrollTo("services")}>Explore Systems</button>
            <button className="btn-ghost" onClick={()=>scrollTo("projects")}>View Work</button>
          </div>

          {/* Stats row */}
          <div style={{
            display:"flex",gap:"48px",justifyContent:"center",flexWrap:"wrap",
            marginTop:72,
            opacity:heroInView?1:0,
            transition:"all 0.8s ease 0.7s"
          }}>
            {[
              {n:120,suffix:"+",label:"Systems Built"},
              {n:50,suffix:"M+",label:"Tasks Automated"},
              {n:98,suffix:"%",label:"Client Retention"},
              {n:40,suffix:"+",label:"Tech Integrations"},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:"32px",fontWeight:800,color:"#fff",fontFamily:"Syne,sans-serif"}}>
                  <AnimatedCounter to={s.n}/>{s.suffix}
                </div>
                <div style={{fontSize:"13px",color:"rgba(255,255,255,0.4)",marginTop:4,letterSpacing:"0.05em"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",textAlign:"center"}}>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",letterSpacing:"0.2em",marginBottom:8}}>SCROLL</div>
          <div style={{width:1,height:40,background:"linear-gradient(#00d4ff,transparent)",margin:"0 auto",animation:"float 2s infinite"}}/>
        </div>
      </section>

      {/* Ticker bar */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",position:"relative",zIndex:10}}>
        <Ticker items={["AI Automation","Custom CRM","Web Engineering","Business Systems","AI Integration","Workflow Design","Smart Pipelines","Agent Architecture","System Design","Data Engineering"]}/>
      </div>

      {/* ABOUT */}
      <section id="about" className="section" style={{position:"relative",zIndex:10}}>
        <div className="container">
          <div ref={aboutRef} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"center"}}>
            <div style={{opacity:aboutInView?1:0,transform:aboutInView?"none":"translateX(-40px)",transition:"all 0.8s ease"}}>
              <div style={{
                fontSize:"11px",letterSpacing:"0.2em",color:"#00d4ff",
                fontWeight:600,marginBottom:"16px",textTransform:"uppercase"
              }}>About VELIX AI</div>
              <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",lineHeight:1.1,marginBottom:"24px"}}>
                Intelligence. Engineered.<br/>
                <span style={{color:"rgba(255,255,255,0.3)"}}>At Every Layer.</span>
              </h2>
              <p style={{fontSize:"16px",color:"rgba(255,255,255,0.55)",lineHeight:1.8,marginBottom:"24px"}}>
                VELIX AI is an elite AI engineering firm building the operational backbone of tomorrow's businesses. We don't sell software—we architect intelligent ecosystems that think, adapt, and scale.
              </p>
              <p style={{fontSize:"16px",color:"rgba(255,255,255,0.4)",lineHeight:1.8,marginBottom:"40px"}}>
                From multi-agent automation networks to enterprise CRM systems, every solution we build is precision-engineered for one outcome: transformational business performance.
              </p>
              <button className="btn-primary" onClick={()=>scrollTo("contact")}>Work With Us</button>
            </div>
            <div style={{opacity:aboutInView?1:0,transform:aboutInView?"none":"translateX(40px)",transition:"all 0.8s ease 0.2s"}}>
              {/* Philosophy cards */}
              {[
                {title:"AI-First Architecture",desc:"Every system is built with intelligence at its core, not bolted on as an afterthought.",color:"#00d4ff"},
                {title:"Precision Engineering",desc:"We obsess over every layer—from database schema to UX interaction to API performance.",color:"#7c3aed"},
                {title:"Business-Driven Design",desc:"Technology that serves real business outcomes, not technology for its own sake.",color:"#06ffa5"},
              ].map((c,i)=>(
                <div key={i} className="card-hover" style={{
                  background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:12,padding:"20px",marginBottom:"12px",
                  display:"flex",gap:"16px",alignItems:"flex-start",
                  transition:"all 0.3s ease",
                  transitionDelay:`${i*0.1}s`
                }}>
                  <div style={{width:4,flexShrink:0,height:40,borderRadius:2,background:c.color,marginTop:2}}/>
                  <div>
                    <div style={{fontSize:"14px",fontWeight:700,marginBottom:"6px"}}>{c.title}</div>
                    <div style={{fontSize:"13px",color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" style={{position:"relative",zIndex:10,background:"rgba(0,0,0,0.3)"}}>
        <div className="container">
          <div ref={servRef} style={{textAlign:"center",marginBottom:80}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#00d4ff",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>What We Build</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:servInView?1:0,transform:servInView?"none":"translateY(30px)",transition:"all 0.7s ease"
            }}>
              Five Specializations.<br/>One Intelligent Vision.
            </h2>
          </div>

          {/* Service tabs */}
          <div style={{display:"flex",gap:"8px",marginBottom:48,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES.map((s,i)=>(
              <button key={i} onClick={()=>setActiveService(i)} style={{
                background:activeService===i?s.color:"rgba(255,255,255,0.04)",
                color:activeService===i?"#000":"rgba(255,255,255,0.6)",
                border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,0.08)"}`,
                borderRadius:100,padding:"8px 20px",fontSize:"13px",fontWeight:600,
                cursor:"pointer",transition:"all 0.3s ease",letterSpacing:"0.03em"
              }}>{s.title}</button>
            ))}
          </div>

          {/* Active service */}
          <div key={activeService} style={{
            display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",alignItems:"center",
            animation:"fadeUp 0.4s ease"
          }}>
            <div>
              <div style={{
                fontSize:"clamp(48px,8vw,80px)",marginBottom:24,
                filter:`drop-shadow(0 0 20px ${SERVICES[activeService].color})`
              }}>{SERVICES[activeService].icon}</div>
              <div style={{fontSize:"11px",letterSpacing:"0.15em",color:SERVICES[activeService].color,fontWeight:600,marginBottom:8,textTransform:"uppercase"}}>
                {SERVICES[activeService].sub}
              </div>
              <h3 style={{fontSize:"36px",fontWeight:800,fontFamily:"Syne,sans-serif",marginBottom:"20px"}}>
                {SERVICES[activeService].title}
              </h3>
              <p style={{fontSize:"16px",color:"rgba(255,255,255,0.5)",lineHeight:1.8,marginBottom:"32px"}}>
                {SERVICES[activeService].desc}
              </p>
              <button className="btn-primary" onClick={()=>scrollTo("contact")} style={{
                background:`linear-gradient(135deg,${SERVICES[activeService].color},${SERVICES[activeService].color}cc)`
              }}>
                Start a Project →
              </button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {SERVICES[activeService].features.map((f,i)=>(
                <Card3D key={i}>
                  <div style={{
                    background:`rgba(255,255,255,0.02)`,
                    border:`1px solid rgba(255,255,255,0.08)`,
                    borderRadius:12,padding:"20px",
                    transition:"all 0.3s ease",cursor:"default"
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=SERVICES[activeService].color;e.currentTarget.style.background=SERVICES[activeService].glow;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.02)";}}
                  >
                    <div style={{
                      width:8,height:8,borderRadius:"50%",
                      background:SERVICES[activeService].color,
                      marginBottom:12,animation:"pulse 2s infinite"
                    }}/>
                    <div style={{fontSize:"14px",fontWeight:600,lineHeight:1.4}}>{f}</div>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section id="systems" className="section" style={{position:"relative",zIndex:10}}>
        <div className="container">
          <div ref={dashRef} style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#7c3aed",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>System Showcase</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:dashInView?1:0,transform:dashInView?"none":"translateY(30px)",transition:"all 0.7s ease"
            }}>
              A Living AI Command Center
            </h2>
          </div>

          {/* Fake dashboard */}
          <div style={{
            background:"rgba(10,10,15,0.8)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:16,overflow:"hidden",
            backdropFilter:"blur(20px)",
            boxShadow:"0 40px 80px rgba(0,0,0,0.5)",
            opacity:dashInView?1:0,transform:dashInView?"none":"translateY(40px)",
            transition:"all 0.8s ease 0.2s"
          }}>
            {/* Dashboard header */}
            <div style={{
              padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",
              display:"flex",alignItems:"center",justifyContent:"space-between",
              background:"rgba(0,0,0,0.4)"
            }}>
              <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                <div style={{width:12,height:12,borderRadius:"50%",background:"#ff5f57"}}/>
                <div style={{width:12,height:12,borderRadius:"50%",background:"#febc2e"}}/>
                <div style={{width:12,height:12,borderRadius:"50%",background:"#28c840"}}/>
              </div>
              <div style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}}>VELIX AI — Operations Dashboard</div>
              <div style={{display:"flex",gap:"8px"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#06ffa5",animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:"11px",color:"#06ffa5"}}>LIVE</span>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:0}}>
              {/* Sidebar */}
              <div style={{borderRight:"1px solid rgba(255,255,255,0.06)",padding:"16px 12px"}}>
                {["Overview","Automations","CRM","Analytics","Settings"].map((item,i)=>(
                  <div key={i} style={{
                    padding:"10px 12px",borderRadius:8,marginBottom:4,fontSize:"13px",
                    background:i===0?"rgba(0,212,255,0.1)":"transparent",
                    color:i===0?"#00d4ff":"rgba(255,255,255,0.4)",
                    cursor:"pointer",display:"flex",gap:"8px",alignItems:"center"
                  }}>
                    <div style={{width:6,height:6,borderRadius:1,background:i===0?"#00d4ff":"rgba(255,255,255,0.2)"}}/>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div style={{padding:"20px"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
                  <DashWidget title="Tasks Processed" value="12,847" change={23} color="#00d4ff" sparkData={[.3,.5,.4,.7,.6,.8,.9,.7,.85,.95]}/>
                  <DashWidget title="Active Agents" value="48" change={8} color="#7c3aed" sparkData={[.4,.5,.5,.6,.5,.7,.6,.8,.7,.9]}/>
                  <DashWidget title="Pipeline Value" value="$2.4M" change={15} color="#06ffa5" sparkData={[.5,.6,.7,.6,.8,.7,.9,.8,.85,.95]}/>
                  <DashWidget title="Response Time" value="0.3s" change={-42} color="#f59e0b" sparkData={[.9,.8,.7,.6,.5,.6,.4,.5,.3,.2]}/>
                </div>

                {/* Activity feed */}
                <div style={{background:"rgba(255,255,255,0.02)",borderRadius:10,padding:"16px",border:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",marginBottom:"12px",letterSpacing:"0.1em",textTransform:"uppercase"}}>Live Activity</div>
                  {[
                    {action:"Lead scored & routed",detail:"HubSpot → Slack → CRM",color:"#00d4ff",time:"just now"},
                    {action:"Invoice auto-generated",detail:"Stripe integration triggered",color:"#06ffa5",time:"2s ago"},
                    {action:"Support ticket classified",detail:"AI assigned to tier-2 queue",color:"#7c3aed",time:"5s ago"},
                    {action:"Data sync completed",detail:"Salesforce ↔ Internal DB",color:"#f59e0b",time:"8s ago"},
                  ].map((a,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:i<3?"1px solid rgba(255,255,255,0.04)":"none"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:a.color,flexShrink:0,animation:"pulse 2s infinite",animationDelay:`${i*0.5}s`}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"13px",fontWeight:500}}>{a.action}</div>
                        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>{a.detail}</div>
                      </div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.25)"}}>{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section" style={{position:"relative",zIndex:10,background:"rgba(0,0,0,0.3)"}}>
        <div className="container">
          <div ref={projRef} style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#06ffa5",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>Portfolio</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:projInView?1:0,transform:projInView?"none":"translateY(30px)",transition:"all 0.7s ease"
            }}>Selected Work</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            {PROJECTS.map((p,i)=>(
              <Card3D key={i}>
                <div className="card-hover" style={{
                  background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:16,padding:"28px",cursor:"pointer",
                  opacity:projInView?1:0,
                  transform:projInView?"none":"translateY(30px)",
                  transition:`all 0.7s ease ${i*0.1}s`
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                    <div style={{
                      fontSize:"11px",letterSpacing:"0.12em",fontWeight:600,
                      color:p.color,textTransform:"uppercase"
                    }}>{p.cat}</div>
                    <div style={{fontSize:"18px",opacity:.3}}>↗</div>
                  </div>
                  <h3 style={{fontSize:"20px",fontWeight:800,fontFamily:"Syne,sans-serif",marginBottom:12}}>{p.title}</h3>
                  <p style={{fontSize:"14px",color:"rgba(255,255,255,0.45)",lineHeight:1.7,marginBottom:20}}>{p.desc}</p>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {p.tags.map((t,j)=>(
                      <span key={j} style={{
                        fontSize:"11px",fontWeight:600,letterSpacing:"0.08em",
                        padding:"4px 10px",borderRadius:100,
                        background:`${p.color}15`,
                        color:p.color,border:`1px solid ${p.color}30`
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{height:2,background:`linear-gradient(90deg,${p.color},transparent)`,borderRadius:2,marginTop:20,opacity:.4}}/>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section" style={{position:"relative",zIndex:10}}>
        <div className="container">
          <div ref={processRef} style={{textAlign:"center",marginBottom:80}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#ff6b35",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>How We Work</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:processInView?1:0,transform:processInView?"none":"translateY(30px)",transition:"all 0.7s ease"
            }}>The VELIX Process</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:20,position:"relative"}}>
            {PROCESS_STEPS.map((s,i)=>(
              <div key={i} style={{
                opacity:processInView?1:0,
                transform:processInView?"none":"translateY(30px)",
                transition:`all 0.6s ease ${i*0.12}s`
              }}>
                <div style={{
                  background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:12,padding:"24px 20px",textAlign:"center",
                  position:"relative"
                }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(0,212,255,0.3)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
                style2={{transition:"border-color 0.3s"}}
                >
                  <div style={{
                    fontSize:"11px",fontWeight:700,letterSpacing:"0.15em",
                    color:"rgba(0,212,255,0.4)",marginBottom:16
                  }}>{s.n}</div>
                  <div style={{fontSize:"16px",fontWeight:800,marginBottom:10,fontFamily:"Syne,sans-serif"}}>{s.title}</div>
                  <div style={{fontSize:"13px",color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>{s.desc}</div>
                </div>
                {i<PROCESS_STEPS.length-1&&(
                  <div style={{
                    position:"absolute",top:"50%",right:-10,
                    color:"rgba(0,212,255,0.3)",fontSize:"16px",
                    display:"none"
                  }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="section" style={{position:"relative",zIndex:10,background:"rgba(0,0,0,0.3)"}}>
        <div className="container">
          <div ref={techRef} style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#f59e0b",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>Technology</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:techInView?1:0,transform:techInView?"none":"translateY(30px)",transition:"all 0.7s ease"
            }}>Our Tech Universe</h2>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
            {TECH.map((t,i)=>(
              <div key={i} style={{
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:100,padding:"10px 20px",
                display:"flex",gap:"8px",alignItems:"center",
                opacity:techInView?1:0,
                transition:`all 0.4s ease ${i*0.04}s`,
                cursor:"default"
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=catColors[t.cat]||"rgba(255,255,255,0.3)";e.currentTarget.style.background=`${catColors[t.cat]}15`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.03)";}}
              >
                <span style={{
                  fontSize:"9px",fontWeight:700,letterSpacing:"0.1em",
                  color:catColors[t.cat]||"rgba(255,255,255,0.4)",
                  background:`${catColors[t.cat]}20`,
                  padding:"2px 6px",borderRadius:4
                }}>{t.cat}</span>
                <span style={{fontSize:"13px",fontWeight:600}}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section" style={{position:"relative",zIndex:10}}>
        <div className="container">
          <div ref={testRef} style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#ec4899",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>Client Results</div>
            <h2 style={{
              fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",
              opacity:testInView?1:0,transition:"all 0.7s ease"
            }}>Businesses Transformed</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {TESTIMONIALS.map((t,i)=>(
              <Card3D key={i}>
                <div style={{
                  background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:16,padding:"32px",
                  opacity:testInView?1:0,
                  transform:testInView?"none":"translateY(30px)",
                  transition:`all 0.7s ease ${i*0.15}s`
                }}>
                  <div style={{fontSize:"32px",color:"rgba(0,212,255,0.3)",marginBottom:16,fontFamily:"Georgia,serif",lineHeight:1}}>"</div>
                  <p style={{fontSize:"15px",color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:24}}>{t.text}</p>
                  <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
                    <div style={{
                      width:42,height:42,borderRadius:"50%",
                      background:"linear-gradient(135deg,#00d4ff,#7c3aed)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:"13px",fontWeight:700,flexShrink:0
                    }}>{t.avatar}</div>
                    <div>
                      <div style={{fontSize:"14px",fontWeight:700}}>{t.name}</div>
                      <div style={{fontSize:"12px",color:"rgba(255,255,255,0.35)"}}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div ref={ctaRef} style={{
        background:"linear-gradient(135deg,rgba(0,212,255,0.08),rgba(124,58,237,0.08))",
        border:"1px solid rgba(0,212,255,0.1)",
        borderLeft:"none",borderRight:"none",
        padding:"80px 40px",textAlign:"center",
        position:"relative",zIndex:10,overflow:"hidden"
      }}>
        <div style={{
          position:"absolute",width:400,height:400,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,212,255,0.12),transparent)",
          top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"
        }}/>
        <h2 style={{
          fontSize:"clamp(28px,4vw,48px)",fontWeight:800,fontFamily:"Syne,sans-serif",
          marginBottom:16,
          opacity:ctaInView?1:0,transform:ctaInView?"none":"translateY(30px)",transition:"all 0.7s ease"
        }}>
          Ready to Build the Future?
        </h2>
        <p style={{fontSize:"18px",color:"rgba(255,255,255,0.45)",marginBottom:40,maxWidth:500,margin:"0 auto 40px"}}>
          Tell us your challenge. We'll engineer the intelligence to solve it.
        </p>
        <button className="btn-primary" style={{fontSize:"15px",padding:"16px 40px"}} onClick={()=>scrollTo("contact")}>
          Start Your Project →
        </button>
      </div>

      {/* CONTACT */}
      <section id="contact" className="section" style={{position:"relative",zIndex:10}}>
        <div className="container" style={{maxWidth:800}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"#00d4ff",fontWeight:600,marginBottom:16,textTransform:"uppercase"}}>Get In Touch</div>
            <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:800,fontFamily:"Syne,sans-serif",marginBottom:16}}>
              Let's Build Something<br/>
              <span style={{color:"rgba(255,255,255,0.3)"}}>Extraordinary</span>
            </h2>
          </div>

          <div style={{
            background:"rgba(255,255,255,0.02)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:20,padding:"48px",backdropFilter:"blur(20px)"
          }}>
            {sent ? (
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{fontSize:"48px",marginBottom:16,animation:"float 2s infinite"}}>✓</div>
                <h3 style={{fontSize:"24px",fontWeight:800,fontFamily:"Syne,sans-serif",marginBottom:8}}>Message Received</h3>
                <p style={{color:"rgba(255,255,255,0.4)"}}>Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <div style={{display:"grid",gap:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div>
                    <label style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",display:"block",marginBottom:8,textTransform:"uppercase"}}>Name</label>
                    <input value={formState.name} onChange={e=>setFormState({...formState,name:e.target.value})} placeholder="Your name"/>
                  </div>
                  <div>
                    <label style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",display:"block",marginBottom:8,textTransform:"uppercase"}}>Email</label>
                    <input value={formState.email} onChange={e=>setFormState({...formState,email:e.target.value})} type="email" placeholder="your@company.com"/>
                  </div>
                </div>
                <div>
                  <label style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",display:"block",marginBottom:8,textTransform:"uppercase"}}>Tell Us About Your Project</label>
                  <textarea value={formState.message} onChange={e=>setFormState({...formState,message:e.target.value})} rows={5} placeholder="Describe your challenge, current systems, and what you're looking to achieve..."/>
                </div>
                <button className="btn-primary" style={{width:"100%",padding:"16px",fontSize:"15px",marginTop:8}}
                  onClick={()=>{ if(formState.name&&formState.email) setSent(true); }}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,0.05)",
        padding:"40px 40px",
        position:"relative",zIndex:10,
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <svg width="22" height="25" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 1L2 7v11c0 7.5 5.8 14.5 14 17 8.2-2.5 14-9.5 14-17V7L16 1z" fill="none" stroke="#00d4ff" strokeWidth="1.6" strokeLinejoin="round"/>
            <line x1="7" y1="12" x2="25" y2="12" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="18" x2="25" y2="18" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="20" cy="12" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            <circle cx="10" cy="18" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            <circle cx="19" cy="18" r="2.2" fill="#050505" stroke="#00d4ff" strokeWidth="1.5"/>
            <path d="M9 23 L16 30 L23 23" fill="none" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{fontSize:"14px",fontWeight:800,letterSpacing:"0.06em",fontFamily:"Syne, sans-serif"}}>VELIX AI</span>
          <span style={{fontSize:"12px",color:"rgba(255,255,255,0.25)",marginLeft:8}}>© 2025 All rights reserved</span>
        </div>
        <div style={{display:"flex",gap:24}}>
          {["Privacy","Terms","Contact"].map(l=>(
            <span key={l} style={{fontSize:"13px",color:"rgba(255,255,255,0.35)",cursor:"pointer"}}
              onMouseEnter={e=>e.target.style.color="#00d4ff"}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}
            >{l}</span>
          ))}
        </div>
        <div style={{fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>
          Engineered for the future.
        </div>
      </footer>
    </div>
  );
}
