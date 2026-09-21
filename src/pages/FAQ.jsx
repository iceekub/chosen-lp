import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import Head from "../components/Head";

const FAQ_ITEMS = [
  {
    question: "How does Six Seeds work?",
    answer:
      "Upload your sermon video to the portal. Six Seeds automatically generates daily devotional content from your teaching and adds it to your searchable sermon library. Your congregation accesses everything through the app.",
  },
  {
    question: "How much work is this for me or my staff?",
    answer: "Just upload the sermon in the portal and you're good to go!",
  },
  {
    question: "What if I want to edit the devotionals before they go out?",
    answer:
      "You are welcome to review and edit everything in the portal before it's published to your congregation.",
  },
  {
    question: "How do I get my congregation to download the app?",
    answer:
      "We give you a launch kit with everything you need — a pulpit announcement script, a one-pager with QR codes for your lobby, and templates for social, email, and the website.",
  },
  {
    question:
      "Can I roll this out to a small group first before the whole congregation?",
    answer:
      "Absolutely. A lot of churches start with a small group, a leadership team, or a specific ministry before going church-wide. It's a great way to get feedback and build some champions before a broader launch.",
  },
  {
    question: "Will my congregation get reminders to use the app?",
    answer:
      "Yes — Six Seeds sends daily push notifications reminding your congregation to open their Garden. Members will need to allow notifications when they first download the app. If anyone asks why they're not getting reminders, just have them check that notifications are turned on for Six Seeds in their phone settings.",
  },
  {
    question: "What about older members who aren't tech-savvy?",
    answer:
      "The app is simple and intuitive. The biggest driver of adoption is the pastor's endorsement.",
  },
  {
    question: "Where do prayer requests go?",
    answer:
      "Straight to the email address you designate — your office, your prayer team, wherever makes sense for your church. You can change the email address at any time in your settings.",
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-[#15231B]/10">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-6 py-6 text-left group"
    >
      <span className="font-serif text-lg md:text-xl text-[#15231B]">
        {item.question}
      </span>
      <span className="shrink-0 w-8 h-8 rounded-full glass border border-[#7A5F3E]/30 flex items-center justify-center text-[#7A5F3E]">
        {isOpen ? (
          <Minus className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </span>
    </button>
    {isOpen && (
      <p className="text-[#5B5346] font-light leading-relaxed text-lg pb-6 max-w-3xl">
        {item.answer}
      </p>
    )}
  </div>
);

const FAQ = () => {
  const canvasRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const colors = [
      "#B4926C",
      "#C9A877",
      "#A9825A",
      "#8B6F47",
      "#FEECD3",
    ];

    const blobs = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      baseRadius: Math.random() * 200 + 300,
      radius: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const render = () => {
      ctx.fillStyle = "#FBF1DE";
      ctx.fillRect(0, 0, width, height);
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.angle += blob.pulseSpeed;
        blob.radius = blob.baseRadius + Math.sin(blob.angle) * 30;
        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius,
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(251, 241, 222, 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.75;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FBF1DE] font-sans text-[#15231B] overflow-x-hidden flex flex-col">
      <Head
        title="FAQ | Six Seeds"
        description="Answers to common questions from pastors and church leaders about how Six Seeds works, rollout, and day-to-day use."
        canonical="https://sixseeds.org/faq"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }
        .glass { background: rgba(252, 250, 244, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(21, 35, 27, 0.06); }
      `}</style>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        <div className="absolute inset-0 bg-[#FBF1DE]/40"></div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <Nav isScrolled={isScrolled} activePage="faq" theme="light" />

      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-6 pt-48 pb-32 w-full">
        <div className="mb-16 text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[#15231B] leading-tight">
            Frequently asked questions
          </h1>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-20 px-10 border-t border-[#15231B]/10 flex flex-col md:grid md:grid-cols-3 items-center gap-8">
        <Logo theme="light" className="h-3 md:h-4 opacity-60 hover:opacity-100 transition-all duration-500 md:justify-self-start" />
        <div className="text-[10px] text-[#7A5F3E]/40 uppercase tracking-widest font-mono md:justify-self-center">
          Copyright © 2026 Chosen Technologies
        </div>
        <div className="flex gap-6 text-xs font-sans uppercase tracking-widest md:justify-self-end">
          <Link
            to="/privacy"
            className="hover:text-[#15231B] transition-colors text-[#15231B]/70"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#15231B] transition-colors text-[#15231B]/70"
          >
            Terms
          </Link>
          <Link
            to="/inquire"
            className="hover:text-[#15231B] transition-colors text-[#15231B]/70"
          >
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
