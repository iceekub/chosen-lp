import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";
import Head from "../components/Head";

const Home = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      "#084236",
      "#4F7147",
      "#78966E",
      "#B5D2AD",
      "#B4926C",
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
      ctx.fillStyle = "#062d25";
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
        gradient.addColorStop(1, "rgba(6, 45, 37, 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
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
      mouseGradient.addColorStop(0, "rgba(254, 236, 211, 0.12)");
      mouseGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "screen";
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
      className="relative w-full min-h-screen bg-[#05241e] font-sans text-white overflow-x-hidden flex flex-col"
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
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        <div className="absolute inset-0 bg-[#05241e]/30"></div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <Nav isScrolled={isScrolled} />

      <header className="relative z-10 w-full min-h-screen px-6 xl:px-20 flex flex-col justify-between pt-32 pb-12">
        <div className="flex-1 w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center xl:justify-start">
            <div className="space-y-8 text-center xl:text-left">
              <h1 className="font-serif mb-6">
                <span className="block text-[clamp(2rem,10vw,3.75rem)] xl:text-7xl text-white whitespace-nowrap xl:whitespace-normal leading-tight">
                  Sunday's message.
                </span>
                <span className="block text-[clamp(1.5rem,8vw,3rem)] xl:text-6xl italic text-[#FEECD3] leading-tight mt-0 xl:mt-2">
                  Six days of growth.
                </span>
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-brand-sage/60 font-light leading-relaxed max-w-md mx-auto xl:mx-0">
                A sanctuary for modern devotion. Keep your congregation rooted in your voice and your lens on Scripture, all week long.
              </p>
            </div>
          </div>

          <div className="flex justify-center xl:justify-end">
            <div className="relative w-full max-w-md xl:max-w-lg">
              <img
                src="/hero.png"
                alt="App preview"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("features")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="hidden md:flex flex-col items-center gap-4 text-[#FEECD3]/60 hover:text-white transition-all duration-500 animate-bounce group mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-bold">
            Enter
          </span>
          <ChevronDown className="w-6 h-6 stroke-[1.5px] group-hover:translate-y-1 transition-transform" />
        </button>
      </header>

      <section
        id="features"
        className="relative z-10 py-24 px-6 md:px-20 space-y-48"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[#FEECD3]">
              Faith that grows daily.
            </h2>
            <p className="text-brand-sage/60 text-lg leading-relaxed font-light">
              Five minutes each day. A verse, a question, a moment to breathe.
              Six Seeds transforms each week’s message into daily practice –
              delivered fresh to your congregation every day of the week.
            </p>
            <ul className="space-y-4">
              {[
                "The sermon does the work. Step in to review and edit anytime, or let it run itself, hands-free.",
                "Congregants can donate directly to the church without ever leaving the app.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-brand-sage/80 font-medium leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#B4926C]/40 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            {/* Phone shell */}
            <div className="relative w-[260px] md:w-[300px]">
              <div className="relative rounded-[3rem] border-[6px] border-[#FEECD3]/15 bg-black shadow-2xl overflow-hidden" style={{ aspectRatio: '1080/2338' }}>
                {/* Dynamic island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
                {/* Video */}
                <video
                  src="/garden.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Bottom home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-10" />
              </div>
              {/* Side buttons */}
              <div className="absolute left-[-10px] top-24 w-[5px] h-8 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute left-[-10px] top-36 w-[5px] h-12 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute left-[-10px] top-52 w-[5px] h-12 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute right-[-10px] top-32 w-[5px] h-16 bg-[#FEECD3]/15 rounded-r-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[#FEECD3]">
              Guidance for the moments life doesn’t schedule.
            </h2>
            <p className="text-brand-sage/60 text-lg leading-relaxed font-light">
              Navigating a new job. Grieving a loss. Struggling in a marriage.
              Six Seeds lets your community search your entire sermon library by
              what they're going through – and surface your message that speaks
              directly to it.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-[260px] md:w-[300px]">
              <div className="relative rounded-[3rem] border-[6px] border-[#FEECD3]/15 bg-black shadow-2xl overflow-hidden" style={{ aspectRatio: '1080/2338' }}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
                <video
                  src="/guidance.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-10" />
              </div>
              <div className="absolute left-[-10px] top-24 w-[5px] h-8 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute left-[-10px] top-36 w-[5px] h-12 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute left-[-10px] top-52 w-[5px] h-12 bg-[#FEECD3]/15 rounded-l-sm" />
              <div className="absolute right-[-10px] top-32 w-[5px] h-16 bg-[#FEECD3]/15 rounded-r-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full p-8 md:p-16 rounded-[2.5rem] glass border-[#B4926C]/20 relative overflow-hidden text-center shadow-2xl">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Ready to watch your <br />
            message come alive?
          </h2>
          <p className="text-brand-sage/60 mb-10 max-w-lg mx-auto text-center font-light text-lg">
            Join the Six Seeds community of leaders ensuring their message stays at
            the center of their community’s rhythm, every day of the week.
          </p>
          <div className="flex justify-center">
            <Link
              to="/inquire"
              className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full glass border border-[#B4926C]/20 hover:border-[#B4926C]/40 transition-all duration-500"
            >
              <span className="relative text-[#FEECD3] font-bold tracking-widest uppercase text-xs">
                Get Started
              </span>
              <ArrowRight className="w-4 h-4 text-[#B4926C] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo className="h-3 md:h-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500" />
        <div className="text-[10px] text-[#B4926C]/40 uppercase tracking-widest font-mono">
          Copyright © 2026 Chosen Technologies
        </div>
        <div className="flex gap-6 text-xs font-sans uppercase tracking-widest">
          <Link
            to="/privacy"
            className="hover:text-white transition-colors text-brand-sage/40"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition-colors text-brand-sage/40"
          >
            Terms
          </Link>
          <Link
            to="/inquire"
            className="hover:text-white transition-colors text-brand-sage/40"
          >
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
