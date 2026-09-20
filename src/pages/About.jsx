import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import Head from "../components/Head";
import StoreBadges from "../components/StoreBadges";

const AttendanceStat = () => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className="relative cursor-pointer outline-none w-full max-w-sm pt-2"
      onClick={toggle}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label="3x stat. Press to reveal source."
    >
      <div className="flex items-center gap-4">
        <div className="font-serif text-5xl text-[#4F7147]" style={{ lineHeight: 1 }}>
          3x
        </div>
        <p className="text-[#716C61] font-light leading-relaxed text-sm max-w-xs">
          more given by those who regularly engage in multiple faith
          practices.
        </p>
      </div>
      <div className="h-[92px] overflow-hidden pt-6">
        <div
          className="flex flex-col items-start gap-2 transition-all duration-500 ease-in-out"
          style={{
            opacity: flipped ? 1 : 0,
            transform: `translateY(${flipped ? "0" : "-8px"})`,
          }}
        >
          <span className="text-sm uppercase tracking-widest text-[#7A5F3E] font-bold">
            Source
          </span>
          <a
            href="https://greymatterresearch.com/evangelicals-and-giving/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[#4F7147] font-medium hover:text-[#15231B] transition-colors"
          >
            Grey Matter Research
          </a>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const canvasRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
        title="About Six Seeds | Daily Discipleship for Your Church"
        description="Meet the team behind Six Seeds and learn how we help churches extend their pastor's voice into the daily lives of their congregation, all week long."
        canonical="https://sixseeds.org/about"
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

      <Nav isScrolled={isScrolled} activePage="about" theme="light" />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 pt-48 pb-16 space-y-24">
        {/* Section 1: The Why / Hero */}
        <section className="space-y-10 text-left">
          <h1 className="font-serif text-[#15231B] leading-tight">
            <span className="block text-3xl md:text-5xl">
              Choosing a church is personal.
            </span>
            <span className="block text-[22px] md:text-[32px] text-[#4F7147] mt-1 md:mt-2">
              Why should the rest of the week be generic?
            </span>
          </h1>
          <div className="space-y-8 text-lg md:text-xl text-[#5B5346] font-light leading-relaxed">
            <p>
              We don't pick a church at random – we choose it because a
              specific pastor's lens on Scripture resonates with us. We leave
              Sunday feeling invigorated. But then Monday comes, and our
              options are only generic devotionals, prayers, or YouTube
              videos from strangers. What we actually want is our pastor's
              voice.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 md:items-center">
            {/* Team Circles - on the left */}
            <div className="flex gap-6 shrink-0">
              {[
                { name: "Alex", src: "/avatar-alex.jpeg" },
                { name: "Dan", src: "/avatar-dan.jpeg" },
                { name: "Scott", src: "/avatar-scott.jpeg" },
              ].map(({ name, src }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-3 text-[#2C4F37]"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <div className="absolute -inset-1.5 rounded-full bg-[#2C4F37]/50" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/40">
                      <img src={src} alt={name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second Paragraph - on the right */}
            <p className="text-lg md:text-xl text-[#5B5346] font-light leading-relaxed flex-1">
              The three of us built Six Seeds because we kept saying the same thing
              to each other: how nice would it be to have a companion gently
              reminding us to pause, take a breath, and come back to the message
              - every day of the week.
            </p>
          </div>
        </section>

        {/* Section: Driving Attendance & Retention */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center text-left">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-5xl text-[#15231B]" style={{ lineHeight: 1.2 }}>
              Daily habits build Sunday habits.
            </h2>
            <p className="text-[#5B5346] font-light leading-relaxed text-lg">
              It's more than a daily streak. Congregants check in for
              in-person attendance right in the app, and receive reminders
              nudging them to show up if it's been a while since their last
              Sunday – turning a daily habit into a reason to walk through
              your doors.
            </p>
            <AttendanceStat />
          </div>
          <div className="relative flex justify-center order-1 lg:order-2">
            <div
              className="absolute top-1/2 left-1/2 w-[21rem] h-[27rem] md:w-[24rem] md:h-[33rem] bg-[#B5D2AD]/50 rounded-[2rem]"
              style={{
                transform: "translate(calc(-50% + 15px), -50%) rotate(8deg)",
              }}
            />
            <img
              src="/about-attendance.png"
              alt="Six Seeds Garden History screen showing a daily streak and check-in calendar"
              className="relative w-full max-w-[300px] h-auto object-contain drop-shadow-[0_6px_16px_rgba(21,35,27,0.08)]"
            />
          </div>
        </section>

        {/* Section 4: What's Included */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#15231B]">
              What's included
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            <div className="p-10 rounded-[2.5rem] glass space-y-8 border border-[#15231B]/10 shadow-xl">
              <h4 className="text-lg md:text-xl uppercase tracking-widest text-[#7A5F3E] font-bold">
                For the Congregation
              </h4>
              <ul className="space-y-6">
                {[
                  "Daily devotions rooted in this week’s sermon, surfaced by a simple push notification",
                  "Deeper study: replay full services or search and share clips on any topic",
                  "In-app giving & prayer requests",
                  "Optional AI assistant that answers questions through your lens",
                ].map((feat, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#4F7147]/60 shrink-0 mt-1" />
                    <span className="text-[#15231B]/80 font-medium">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 rounded-[2.5rem] glass space-y-8 border border-[#15231B]/10 shadow-xl">
              <h4 className="text-lg md:text-xl uppercase tracking-widest text-[#7A5F3E] font-bold">
                For the Leadership
              </h4>
              <ul className="space-y-6">
                {[
                  "Hands on or off: zero extra time required from the pastor, or full editorial control if you want it",
                  "Completely personalized for your church",
                  "White glove onboarding from start to finish",
                  "Centralized dashboard with usage and engagement analytics",
                ].map((feat, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#4F7147]/60 shrink-0 mt-1" />
                    <span className="text-[#15231B]/80 font-medium">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Built for Your Team */}
        <section className="space-y-10 text-left">
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl text-[#15231B] leading-tight">
              Built for your team.
            </h2>
            <p className="text-[#5B5346] font-light leading-relaxed text-lg">
              Upload a sermon and Six Seeds handles the rest – no more
              cutting clips or building study materials by hand. See exactly
              how your congregation is engaging, from active members to your
              top-performing content, all from one dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 w-full items-start justify-center">
            <img
              src="/about-dashboard.webp"
              alt="Six Seeds church dashboard showing recent sermon gardens and quick actions"
              className="w-full h-auto sm:w-auto sm:h-72 md:h-96 lg:h-[480px] xl:h-[560px] max-w-full object-contain rounded-2xl border border-[#15231B]/10 shadow-md"
            />
            <img
              src="/about-analytics.webp"
              alt="Six Seeds engagement analytics showing active members and gardens finished"
              className="w-full h-auto sm:w-auto sm:h-72 md:h-96 lg:h-[480px] xl:h-[560px] max-w-full object-contain rounded-2xl border border-[#15231B]/10 shadow-md"
            />
          </div>
        </section>

        {/* Section 5: Closing CTA */}
        <section className="w-full text-center py-4 md:pt-20 space-y-6 md:space-y-12">
          <h2 className="font-serif text-2xl md:text-5xl text-[#15231B] leading-tight max-w-4xl mx-auto">
            Ready to see your voice in action?
          </h2>
          <div className="flex justify-center">
            <Link
              to="/inquire"
              className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-full bg-[#2C4F37]/85 backdrop-blur-md border border-white/15 hover:bg-[#254230]/90 transition-all duration-500 shadow-xl"
            >
              <span className="relative text-[#FEECD3] font-bold tracking-widest uppercase text-sm">
                Get Started
              </span>
              <ArrowRight className="w-5 h-5 text-[#FEECD3] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex justify-center pt-4">
            <StoreBadges />
          </div>
        </section>
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

export default About;
