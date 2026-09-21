import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";
import Head from "../components/Head";
import { Link } from "react-router-dom";

const Inquire = () => {
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
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      baseRadius: Math.random() * 300 + 400,
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
        title="Get in Touch | Six Seeds"
        description="Partner with Six Seeds to bring daily discipleship to your congregation. Reach out for church partnerships, app support, or general inquiries."
        canonical="https://sixseeds.org/inquire"
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

      <Nav isScrolled={isScrolled} activePage="inquire" theme="light" />

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-48 pb-32 text-center max-w-5xl mx-auto space-y-20">
        <div className="space-y-6">
          <h1 className="font-serif text-3xl md:text-5xl leading-tight text-[#15231B]">
            See what daily discipleship <br />
            <span className="text-[#4F7147] block mt-2">
              looks like for your church.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#5B5346] font-light tracking-wide max-w-2xl mx-auto">
            Fill out the form and we'll reach out to set up a 15-minute exploratory call. We can't wait to learn about your church community.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <SignupForm full={true} theme="light" />
        </div>
      </main>

      <footer className="relative z-10 py-20 px-10 border-t border-[#15231B]/10 flex flex-col md:grid md:grid-cols-3 items-center gap-8">
        <Logo theme="light" className="h-3 md:h-4 opacity-60 hover:opacity-100 transition-all duration-500 md:justify-self-start" />
        <div className="text-[10px] text-[#7A5F3E]/40 uppercase tracking-widest font-mono md:justify-self-center">
          Copyright © 2026 Chosen Technologies
        </div>
        <div className="flex gap-6 text-xs font-sans uppercase tracking-widest md:justify-self-end">
          <Link to="/privacy" className="hover:text-[#15231B] transition-colors text-[#15231B]/70">Privacy</Link>
          <Link to="/terms" className="hover:text-[#15231B] transition-colors text-[#15231B]/70">Terms</Link>
          <Link to="/inquire" className="hover:text-[#15231B] transition-colors text-[#15231B]/70">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Inquire;
