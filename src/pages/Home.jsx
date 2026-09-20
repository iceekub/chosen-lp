import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Church,
  Bell,
  BookOpen,
  PlayCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";
import Head from "../components/Head";
import StoreBadges from "../components/StoreBadges";

const STATS = [
  {
    id: "grey-matter",
    number: "3x",
    text: "more given by those who regularly engage in multiple faith practices.",
    source: "Grey Matter Research",
    href: "https://greymatterresearch.com/evangelicals-and-giving/",
  },
  {
    id: "lifeway-invite",
    number: "5x",
    text: "more likely to invite others to join the church when actively engaged.",
    source: "Lifeway Research",
    href: "https://research.lifeway.com/state-of-discipleship/",
  },
  {
    id: "rightnow",
    number: "#1",
    text: "habit pastors say would most transform their church: daily study.",
    source: "Right Now Ministries",
    href: "https://resources.rightnow.org/web/Beyond_Sunday_Encouraging_Daily_Discipleship.pdf",
  },
  {
    id: "lifeway-tithe",
    number: "200%",
    text: "more tithed from weekly attendees versus occasional ones.",
    source: "Lifeway Research",
    href: "https://research.lifeway.com/2018/09/06/report-highlights-christians-beliefs-about-generosity/",
  },
];

const StatCard = ({ stat, active, onEnter, onLeave, onToggle }) => {
  return (
    <div
      className="relative cursor-pointer outline-none p-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      aria-label={`${stat.number} stat. Press to reveal source.`}
    >
      <div className="flex flex-col gap-4">
        <div className="inline-block self-start font-serif text-5xl md:text-6xl text-[#4F7147] border-b-2 border-[#B4926C]/40 pb-2">
          {stat.number}
        </div>
        <p className="text-[#716C61] text-base md:text-lg font-light leading-relaxed">
          {stat.text}
        </p>
      </div>
      <div className="h-[80px] overflow-hidden pt-4">
        <div
          className="flex flex-col items-start gap-2 transition-all duration-500 ease-in-out"
          style={{
            opacity: active ? 1 : 0,
            transform: `translateY(${active ? "0" : "-8px"})`,
          }}
        >
          <span className="text-sm uppercase tracking-widest text-[#7A5F3E] font-bold">
            Source
          </span>
          <a
            href={stat.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[#4F7147] font-medium hover:text-[#15231B] transition-colors"
          >
            {stat.source}
          </a>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [location.hash]);

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

    const blobs = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      baseRadius: Math.random() * 300 + 400,
      radius: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
    }));

    const mouseBlob = {
      x: width / 2,
      y: height / 2,
      radius: 500,
      color: "#FEECD3",
    };

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
        blob.radius = blob.baseRadius + Math.sin(blob.angle) * 50;
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
      if (mouse.current.x !== -1000) {
        mouseBlob.x += (mouse.current.x - mouseBlob.x) * 0.02;
        mouseBlob.y += (mouse.current.y - mouseBlob.y) * 0.02;
      }
      const mouseGradient = ctx.createRadialGradient(
        mouseBlob.x,
        mouseBlob.y,
        0,
        mouseBlob.x,
        mouseBlob.y,
        mouseBlob.radius,
      );
      mouseGradient.addColorStop(0, "rgba(180, 146, 108, 0.18)");
      mouseGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "multiply";
      ctx.beginPath();
      ctx.fillStyle = mouseGradient;
      ctx.arc(mouseBlob.x, mouseBlob.y, mouseBlob.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
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

  const handleMouseMove = (e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      className="relative w-full min-h-screen bg-[#FBF1DE] font-sans text-[#15231B] overflow-x-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      <Head
        title="Six Seeds | Growth Between Sundays"
        description="Turn your Sunday sermon into a week of daily devotions for your entire congregation. Six Seeds keeps your church connected to your teaching, every day."
        canonical="https://sixseeds.org/"
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

      <Nav isScrolled={isScrolled} theme="light" />

      <header className="relative z-10 w-full min-h-screen px-6 xl:px-20 flex flex-col justify-between pt-32 pb-12">
        <div className="flex-1 w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center xl:justify-start">
            <div className="space-y-8 text-center xl:text-left">
              <h1 className="font-serif mb-6">
                <span className="block text-[clamp(2rem,10vw,3.75rem)] xl:text-7xl text-[#15231B] whitespace-nowrap xl:whitespace-normal leading-tight">
                  Sunday's message.
                </span>
                <span className="block text-[clamp(1.5rem,8vw,3rem)] xl:text-6xl italic text-[#4F7147] leading-tight mt-0 xl:mt-2">
                  Six days of growth.
                </span>
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-[#716C61] font-light leading-relaxed max-w-lg mx-auto xl:mx-0">
                An easy daily habit built from your sermon - so your congregants stay connected to your voice, all week long.
              </p>
              <div className="flex justify-center xl:justify-start">
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#2C4F37]/85 backdrop-blur-md border border-white/15 hover:bg-[#254230]/90 transition-all duration-500 shadow-xl"
                >
                  <span className="relative text-[#FEECD3] font-bold tracking-widest uppercase text-xs">
                    See How It Works
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center xl:justify-end">
            <div className="relative w-full max-w-md xl:max-w-lg">
              <img
                src="/hero.webp"
                alt="App preview"
                className="w-full h-auto drop-shadow-[0_8px_20px_rgba(21,35,27,0.15)]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("hook")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="hidden md:flex items-center justify-center text-[#7A5F3E] hover:text-[#062d25] transition-all duration-500 animate-bounce group mx-auto"
        >
          <ChevronDown className="w-6 h-6 stroke-[1.5px] group-hover:translate-y-1 transition-transform" />
        </button>
      </header>

      <section
        id="hook"
        className="relative z-10 py-[10px] px-6 md:px-12 bg-[#ECE0C4] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16 md:gap-12 items-center">
          <div className="relative flex justify-center md:justify-start order-2 md:order-1 md:-ml-6">
            <div
              className="absolute top-1/2 left-1/2 w-80 h-80 md:w-[22.5rem] md:h-[22.5rem] bg-[#B5D2AD]/50 rounded-[2rem]"
              style={{
                transform: "translate(calc(-50% - 40px), -50%) rotate(-8deg)",
              }}
            />
            <img
              src="/hook-planter.png"
              alt=""
              className="relative w-72 md:w-96 h-auto drop-shadow-xl"
            />
          </div>
          <div className="space-y-8 text-left order-1 md:order-2">
            <h2
              className="font-serif text-4xl md:text-5xl text-[#15231B]"
              style={{ lineHeight: 1.25 }}
            >
              Sunday{" "}
              <span className="text-[#4F7147] font-bold">plants the seed.</span>{" "}
              But by Wednesday, it wilts.
            </h2>
            <div className="space-y-6 text-[#5B5346] text-lg leading-normal font-light">
              <p>
                The sermon that moved them Sunday is now competing with
                deadlines, traffic, and a thousand smaller things by midweek.
              </p>
              <p>
                Faith is a garden that needs to be tended every day, not just
                Sundays. What if your message stayed front and center the
                other <span className="text-[#4F7147] font-medium">six</span>{" "}
                days?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#4F7147]">
            A week with Six Seeds
          </h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 border-l-2 border-dashed border-[#B4926C]/60 md:-translate-x-1/2" />
          <div className="space-y-10 md:space-y-14">
            {[
              {
                day: "SUNDAY",
                icon: Church,
                text: "Sarah listens to Pastor Luke preach on finding peace in anxious times. She leaves feeling energized and connected.",
              },
              {
                day: "MONDAY",
                time: "8:00 PM",
                icon: Bell,
                text: "After a long day, the kids are finally in bed. Her phone lights up.",
                image: "/timeline-monday.png",
                imageMaxWidth: "260px",
              },
              {
                day: "THE GARDEN",
                icon: BookOpen,
                text: "Her five-minute daily devotional carries her back to the feeling of Sunday. Pastor Luke's words on peace reset her for the evening.",
                image: "/timeline-garden.webp",
              },
              {
                day: "THURSDAY",
                icon: PlayCircle,
                text: "By the end of the week, it's just part of her day. So when a hard afternoon hits, she doesn't wait for tomorrow's Garden – she searches the library and pulls up a clip of Pastor Luke on anxiety. Two minutes, then she's back.",
                image: "/timeline-thursday.webp",
              },
              {
                day: "NEXT SUNDAY",
                icon: Church,
                text: "Sunday comes again, and Sarah walks into church feeling more connected than ever.",
              },
            ].map((step, i) => {
              const imageRight = i % 2 === 0;
              return (
                <div
                  key={step.day}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pl-16 md:pl-0"
                >
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 w-12 h-12 rounded-full glass shadow-md border border-[#B4926C]/30 flex items-center justify-center text-[#4F7147]">
                    <step.icon className="w-5 h-5" />
                  </div>

                  <div
                    className={`space-y-3 ${
                      imageRight
                        ? "md:order-1 md:text-right md:pr-16"
                        : "md:order-2 md:text-left md:pl-16"
                    }`}
                  >
                    <div className="text-sm md:text-base uppercase tracking-widest text-[#7A5F3E] font-bold">
                      {step.day}
                      {step.time ? ` · ${step.time}` : ""}
                    </div>
                    <p className="text-[#15231B]/70 text-lg font-light leading-relaxed">
                      {step.text}
                    </p>
                  </div>

                  <div
                    className={`flex justify-center ${
                      imageRight
                        ? "md:order-2 md:pl-8 md:justify-start"
                        : "md:order-1 md:pr-8 md:justify-end"
                    }`}
                  >
                    {step.image && (
                      <img
                        src={step.image}
                        alt=""
                        className="w-full h-auto object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                        style={{ maxWidth: step.imageMaxWidth || "460px" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-24 pb-8 md:pb-12 px-6 md:px-20 text-center">
        <div className="space-y-8 mb-6 md:mb-[-20px]">
          <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#4F7147]">
            What makes Six Seeds different?
          </h2>
          <img
            src="/what-makes-sprout.webp"
            alt=""
            className="mx-auto w-20 md:w-24 h-auto"
          />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {[
            {
              id: "content-tool",
              accent: "#4F7147",
              title: (
                <>
                  More than a
                  <br />
                  content tool.
                </>
              ),
              desc: "The real value is building the habit – a dedicated space your congregants return to every day to reconnect with your message. No algorithm or ads competing for their attention.",
            },
            {
              id: "bible-apps",
              accent: "#7A5F3E",
              offset: true,
              title: (
                <>
                  Go where Bible
                  <br />
                  apps can't.
                </>
              ),
              desc: "Bible apps don't know what you preached Sunday – we do. Your congregation craves your voice and your lens on Scripture.",
            },
            {
              id: "existing-app",
              accent: "#4F7147",
              title: "Already have an app? Good.",
              desc: "We're not here to replace it - your app runs events & community, we carry your teaching into a daily companion. They live side by side.",
            },
          ].map((pod) => (
            <div
              key={pod.id}
              className={`px-10 pt-10 pb-6 rounded-t-[2rem] space-y-6 flex flex-col items-center group hover:-translate-y-1 transition-all duration-500 text-center ${
                pod.offset ? "md:mt-10" : ""
              }`}
              style={{ borderTop: `2px solid ${pod.accent}` }}
            >
              <div className="min-h-[4rem] flex items-center justify-center">
                <h3
                  className="font-serif font-bold text-2xl leading-tight"
                  style={{ color: pod.accent }}
                >
                  {pod.title}
                </h3>
              </div>
              <p className="text-[#716C61] font-light leading-relaxed text-[15px]">
                {pod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="proof"
        className="relative z-10 pt-8 md:pt-12 pb-6 md:pb-8 px-6 md:px-12"
      >
        <div className="w-full max-w-4xl mx-auto mb-16 border-t border-[#B4926C]/40" />
        <div className="relative max-w-5xl mx-auto text-center mb-16 space-y-6">
          <h2
            className="font-serif text-3xl md:text-5xl text-[#15231B]"
            style={{ lineHeight: 1.25 }}
          >
            Daily engagement is proven to drive attendance, and attendance
            drives giving.
          </h2>
          <p className="font-serif font-medium text-3xl md:text-5xl text-[#4F7147]">
            Six Seeds is built to grow both.
          </p>
        </div>
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {STATS.map((stat, i) => (
            <div key={stat.id} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <StatCard
                stat={stat}
                active={activeStat === stat.id}
                onEnter={() => setActiveStat(stat.id)}
                onLeave={() =>
                  setActiveStat((cur) => (cur === stat.id ? null : cur))
                }
                onToggle={() =>
                  setActiveStat((cur) => (cur === stat.id ? null : stat.id))
                }
              />
            </div>
          ))}
        </div>
        <div className="w-full max-w-4xl mx-auto border-t border-[#B4926C]/40" />
      </section>

      <section className="relative z-10 pt-8 md:pt-12 pb-16 md:pb-32 px-6 flex flex-col items-center text-center">
        <h2
          className="font-serif text-2xl md:text-6xl text-[#15231B] mb-16 max-w-3xl"
          style={{ lineHeight: 1.1 }}
        >
          Ready to watch your <br />
          message come alive?
        </h2>

        <div className="max-w-5xl w-full relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-16">
          <div className="hidden md:block absolute top-28 left-[16.5%] right-[16.5%] border-t-2 border-dashed border-[#B4926C]/40" />
          {[
            {
              src: "/step-seed.webp",
              text: "Simply upload a sermon, we'll take it from there.",
            },
            {
              src: "/step-sprout.webp",
              text: "We'll give you everything you need to help your congregation download the Six Seeds app.",
            },
            {
              src: "/step-bloom.webp",
              text: "Watch connection grow. Attendance streaks & reminders motivate them to show up in person.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center gap-6"
            >
              <div className="relative z-10 w-56 h-56 flex items-center justify-center">
                <img
                  src={step.src}
                  alt=""
                  className="relative h-44 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                />
              </div>
              <p className="text-[#716C61] font-light leading-relaxed text-lg">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/inquire"
          className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-full bg-[#2C4F37]/85 backdrop-blur-md border border-white/15 hover:bg-[#254230]/90 transition-all duration-500 shadow-2xl"
        >
          <span className="relative text-[#FEECD3] font-bold tracking-widest uppercase text-sm">
            Get Started
          </span>
          <ArrowRight className="w-4 h-4 text-[#FEECD3] group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <div className="relative z-10 pb-16 md:pb-24 px-6 flex justify-center">
        <StoreBadges />
      </div>

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

export default Home;
