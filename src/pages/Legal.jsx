import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Head from "../components/Head";

const LegalPage = ({ title, description, canonical, content }) => {
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
      "#084236",
      "#4F7147",
      "#78966E",
      "#B5D2AD",
      "#B4926C",
      "#FEECD3",
    ];

    const blobs = Array.from({ length: 4 }).map(() => ({
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
      ctx.fillStyle = "#062d25";
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
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius,
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(6, 45, 37, 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
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
    <div className="relative w-full min-h-screen bg-[#05241e] font-sans text-white overflow-x-hidden flex flex-col">
      <Head title={title + " | Six Seeds"} description={description} canonical={canonical} />
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }
        .legal-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: rgba(254, 236, 211, 0.9);
          margin-top: 3rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .legal-content h3 {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(181, 210, 173, 0.8);
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .legal-content p {
          color: rgba(181, 210, 173, 0.55);
          font-weight: 300;
          line-height: 1.85;
          margin-bottom: 1rem;
        }
        .legal-content ul, .legal-content ol {
          margin: 0.75rem 0 1rem 0;
          padding-left: 1.5rem;
        }
        .legal-content li {
          color: rgba(181, 210, 173, 0.55);
          font-weight: 300;
          line-height: 1.75;
          margin-bottom: 0.4rem;
        }
        .legal-content ul li { list-style-type: disc; }
        .legal-content ol li { list-style-type: decimal; }
        .legal-content strong {
          color: rgba(254, 236, 211, 0.75);
          font-weight: 600;
        }
        .legal-content a {
          color: #B4926C;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 px-6 md:px-10 ${isScrolled ? "py-4 bg-white/5 backdrop-blur-xl shadow-2xl" : "py-6 md:py-10"}`}>
        <Logo className="h-4 md:h-6" />
        <div className="flex items-center gap-8 md:gap-12">
          <Link to="/about" className="text-[#FEECD3]/60 hover:text-white transition-colors text-sm font-sans tracking-widest uppercase">
            About
          </Link>
          <Link to="/inquire" className="text-[#FEECD3]/60 hover:text-white transition-colors text-sm font-sans tracking-widest uppercase">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-1 max-w-3xl mx-auto px-6 pt-40 pb-20 space-y-12">
        <h1 className="font-serif text-5xl md:text-6xl text-white">{title}</h1>
        <div className="legal-content">
          {content}
        </div>
      </main>

      <footer className="relative z-10 py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo className="h-3 md:h-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500" />
        <div className="text-[10px] text-[#B4926C]/40 uppercase tracking-widest font-mono">
          Copyright © 2026 Chosen Technologies
        </div>
        <div className="flex gap-6 text-xs font-sans uppercase tracking-widest">
          <Link to="/privacy" className="hover:text-white transition-colors text-brand-sage/40">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors text-brand-sage/40">Terms</Link>
          <Link to="/inquire" className="hover:text-white transition-colors text-brand-sage/40">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

const EffectiveDate = ({ date }) => (
  <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(180,146,108,0.6)", fontWeight: 500, marginBottom: "2.5rem" }}>
    Last Updated: {date}
  </p>
);

const Preamble = ({ children }) => (
  <div style={{ background: "rgba(254,236,211,0.04)", border: "1px solid rgba(254,236,211,0.08)", borderRadius: "1rem", padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
    <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(254,236,211,0.5)", fontWeight: 500, letterSpacing: "0.02em", margin: 0, textTransform: "uppercase" }}>
      {children}
    </p>
  </div>
);

const DisclaimerBlock = ({ children }) => (
  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", padding: "1.25rem 1.5rem", margin: "0.5rem 0 1rem" }}>
    <p style={{ fontSize: "0.8rem", lineHeight: 1.75, color: "rgba(181,210,173,0.45)", fontWeight: 400, letterSpacing: "0.01em", margin: 0 }}>
      {children}
    </p>
  </div>
);

const ContactBlock = () => (
  <div style={{ background: "rgba(180,146,108,0.05)", border: "1px solid rgba(180,146,108,0.15)", borderRadius: "1rem", padding: "1.25rem 1.5rem", marginTop: "0.5rem" }}>
    <p style={{ color: "rgba(254,236,211,0.65)", fontWeight: 400, lineHeight: 1.9, margin: 0, fontSize: "0.9rem" }}>
      Chosen Technologies, Inc., DBA Six Seeds<br />
      Los Angeles, California<br />
      <a href="mailto:legal@sixseeds.org" style={{ color: "#B4926C", textDecoration: "underline", textUnderlineOffset: "3px" }}>legal@sixseeds.org</a>
    </p>
  </div>
);

export const Terms = () => (
  <LegalPage
    title="Terms &amp; Conditions"
    description="Read the Six Seeds terms and conditions governing use of our platform and applications."
    canonical="https://sixseeds.org/terms"
    content={
      <>
        <EffectiveDate date="May 23, 2026" />

        <Preamble>
          Please read these Terms and Conditions carefully before downloading, installing, or using the Six Seeds application. By creating an account or otherwise accessing the App, you agree to be bound by these Terms. If you do not agree, do not use the App.
        </Preamble>

        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms and Conditions ("Terms") constitute a legally binding agreement between you and Chosen Technologies, Inc., a Delaware corporation doing business as Six Seeds ("Company," "we," "our," or "us"), governing your access to and use of the Six Seeds mobile application and all associated services, content, and features (collectively, the "App"). Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          The App is intended solely for users who are at least thirteen (13) years of age. During registration, you are required to provide your date of birth. If you are under the age of 13, you are not permitted to use the App, and we will deny account creation and terminate any account if we become aware that the account holder is under 13. If you are between the ages of 13 and 18, you may only use the App with the knowledge and consent of a parent or legal guardian who agrees to be bound by these Terms on your behalf. By registering, you represent and warrant that you satisfy these eligibility requirements.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access the App's features, you must create an account. Regular users are asked to provide their name, phone number, a profile avatar (image), and the participating church with which they are affiliated. Pastors and church staff members may additionally provide their title, biography, and email address. The Company anticipates collecting email addresses from all users in a future update and will provide notice of that change.
        </p>
        <p>
          You agree to provide accurate, current, and complete information during registration and to update that information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately at the contact address provided in Section 20 if you suspect unauthorized access to or use of your account.
        </p>
        <p>
          Church affiliation within the App is self-reported. If you identify as a member of a particular church, the App will associate your account with that church's content. The Company does not independently verify church membership.
        </p>

        <h2>4. Description of Services</h2>
        <p>
          Six Seeds is a faith-based digital platform that ingests sermon recordings provided by participating churches ("Church Partners"), uses artificial intelligence technology to generate supplementary content, and delivers that content to registered users. The App's core features include the following.
        </p>

        <h3>4.1 The Garden</h3>
        <p>
          The Garden is the App's primary daily content experience. During onboarding, you select a time at which you wish to receive a daily push notification. That notification links you to a set of swipe-format content cards — which may include Bible passages, quotations, reflections, and discussion prompts — generated by artificial intelligence from the most recent sermon uploaded by your affiliated Church Partner. The Garden refreshes on a weekly basis as new sermon content is uploaded.
        </p>

        <h3>4.2 Video Library</h3>
        <p>
          The App provides access to an indexed archive of past sermon recordings and AI-generated content derived from those recordings. You may search the library and engage with content from prior weeks.
        </p>

        <h3>4.3 AI Chat</h3>
        <p>
          The App includes an AI-powered conversational feature that allows you to engage in dialogue, ask questions, and receive responses grounded in the indexed content of the App's sermon library. All interactions with the AI Chat feature are subject to the AI-Generated Content Disclaimer set forth in Section 7.
        </p>

        <h3>4.4 Question Responses</h3>
        <p>
          The App presents prompts and discussion questions to users. You may submit written responses to those prompts within the App.
        </p>

        <h3>4.5 Service Availability</h3>
        <p>
          The App is provided on an "as available" basis. We do not guarantee uninterrupted access and reserve the right to modify, suspend, or discontinue any feature at any time.
        </p>

        <h2>5. Content and Intellectual Property</h2>

        <h3>5.1 Church Content</h3>
        <p>
          Church Partners retain ownership of the sermon recordings and other source materials they upload to the App ("Church Content"). Each Church Partner grants Chosen Technologies, Inc. a non-exclusive, worldwide, sublicensable license to copy, store, transmit, index, display, and otherwise process Church Content — including for use in artificial intelligence and machine learning applications — during the term of the Church Partner's subscription and for ninety (90) days following its termination. As part of the Church Partner's onboarding process, pastors and church staff members whose recordings are uploaded acknowledge that the Church Partner has authority to grant this license and that they have no individual claim against the Company arising out of such use.
        </p>

        <h3>5.2 Derivative Content</h3>
        <p>
          All content generated by the Company's platform from or in connection with Church Content — including AI-generated summaries, daily Garden cards, reflections, prompts, chatbot responses, indexed content, and any other output produced by the App's technology — is owned exclusively by Chosen Technologies, Inc. ("Derivative Content"). Church Partners, pastors, and users receive no ownership interest in Derivative Content. Derivative Content is licensed to you solely for your personal, non-commercial use within the App.
        </p>

        <h3>5.3 User-Generated Content</h3>
        <p>
          When you submit responses to prompts, engage in AI Chat, or create any other content within the App ("User Content"), you grant Chosen Technologies, Inc. a non-exclusive, worldwide, royalty-free, sublicensable, perpetual license to use, store, display, process, and derive insights from that User Content in connection with operating and improving the App. You represent and warrant that (a) you have all rights necessary to grant this license and (b) your User Content does not infringe any third-party rights or violate any applicable law or these Terms. The Company does not claim ownership of your User Content.
        </p>

        <h3>5.4 Company Intellectual Property</h3>
        <p>
          All other content, features, and functionality of the App — including the Six Seeds name and logo, software architecture, design, and proprietary technology — are owned by Chosen Technologies, Inc. and are protected by applicable copyright, trademark, and other intellectual property laws. Nothing in these Terms transfers any ownership interest in Company intellectual property to you.
        </p>

        <h3>5.5 License to Use the App</h3>
        <p>
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to download and use the App on a device you own or control, solely for your personal, non-commercial purposes. This license does not include the right to sublicense, modify, distribute, sell, or create derivative works from the App or its content.
        </p>

        <h2>6. External Content Sharing</h2>
        <p>
          The App may permit you to share specific Derivative Content items — such as quotations, Bible passages, or reflections from the Garden — by generating a link that opens a static image of that content in the recipient's web browser. When you use the sharing feature, you agree to the following:
        </p>
        <ol type="a">
          <li>Content shared outside the App remains subject to these Terms and to the intellectual property rights described in Section 5. You may not remove, obscure, or alter any attribution or branding associated with shared content.</li>
          <li>You may not represent AI-generated content as your own original work or as the verbatim words, teachings, or views of any pastor or church.</li>
          <li>You may not use the sharing feature to distribute content for commercial purposes without the Company's prior written consent.</li>
          <li>The Company is not responsible for how third parties receive, use, store, or further distribute content you share outside the App. You assume all risk associated with sharing content beyond the App's environment.</li>
        </ol>

        <h2>7. AI-Generated Content Disclaimer</h2>
        <p>
          Portions of the content delivered through the Six Seeds platform are generated by artificial intelligence based on source materials provided by participating churches. This content is not a substitute for pastoral guidance, theological instruction, or professional advice of any kind. Chosen Technologies, Inc. makes no representations regarding the accuracy, completeness, or theological soundness of AI-generated content, and your use of or reliance on such content is solely at your own discretion.
        </p>
        <p>
          AI-generated content reflects thematic patterns derived from sermon source material and is not a verbatim representation of any pastor's teachings or any church's doctrinal positions. The Company does not endorse, verify, or guarantee the religious, theological, or factual accuracy of any content generated by or delivered through the App.
        </p>

        <h2>8. Push Notifications</h2>
        <p>
          The App's Garden feature is delivered via daily push notifications. During onboarding, you will be prompted to grant permission for the App to send push notifications and to select your preferred daily delivery time. You may withdraw your consent and disable push notifications at any time through your device's operating system settings. Disabling push notifications limits your access to the Garden experience but does not terminate your account or affect your access to the video library or AI Chat features.
        </p>

        <h2>9. In-App Payments and Third-Party Payment Processing</h2>
        <p>
          The App's primary revenue model involves Church Partners paying subscription fees directly to the Company. Where individual user subscriptions are offered, payment processing is handled by Stripe, Inc. ("Stripe"). If you elect to make a payment within the App, you will be subject to Stripe's Terms of Service and Privacy Policy in addition to these Terms. The Company does not store your full payment card information; that information is collected and maintained by Stripe in accordance with applicable Payment Card Industry Data Security Standard (PCI-DSS) requirements.
        </p>
        <p>
          Subscription fees, billing cycles, and cancellation policies applicable to individual user subscriptions, if offered, will be disclosed at the time of purchase and will be incorporated into these Terms by reference. All fees are stated in U.S. dollars and are non-refundable except as required by applicable law or as expressly stated in the applicable subscription terms.
        </p>

        <h2>10. Prohibited Conduct</h2>
        <p>You agree that you will not, and will not permit any third party to, do any of the following in connection with the App:</p>
        <ol type="a">
          <li>Use the App if you are under 13 years of age or provide a false date of birth during registration.</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any church or organization.</li>
          <li>Access or use another user's account without authorization.</li>
          <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of any portion of the App.</li>
          <li>Use automated tools, bots, crawlers, or scripts to scrape, extract, or reproduce App content.</li>
          <li>Use the App or its content for any commercial purpose not expressly authorized by the Company.</li>
          <li>Upload, transmit, or distribute malware, viruses, or any other harmful or disruptive code through the App.</li>
          <li>Harass, defame, abuse, stalk, threaten, or otherwise harm any other user.</li>
          <li>Post or transmit User Content that is unlawful, obscene, defamatory, or that infringes any third-party intellectual property right.</li>
          <li>Circumvent, disable, or interfere with any technical measures used to protect the App, its content, or its users.</li>
          <li>Use the App in any manner that could impair, damage, or disrupt the App or the servers and networks connected to it.</li>
        </ol>
        <p>Violation of this Section may result in immediate termination of your account and may subject you to civil or criminal liability.</p>

        <h2>11. Digital Millennium Copyright Act — Notice and Takedown</h2>
        <p>
          The Company respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act, 17 U.S.C. § 512 ("DMCA"). If you believe that content available through the App infringes your copyright, please submit a written notice to our designated DMCA agent containing each of the following elements required by 17 U.S.C. § 512(c)(3):
        </p>
        <ol>
          <li>A physical or electronic signature of the copyright owner or a person authorized to act on the copyright owner's behalf;</li>
          <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works;</li>
          <li>Identification of the material claimed to be infringing and information reasonably sufficient to permit the Company to locate the material;</li>
          <li>Your contact information, including name, address, telephone number, and email address;</li>
          <li>A statement that you have a good-faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
          <li>A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
        </ol>
        <p>
          Send DMCA notices to <a href="mailto:legal@sixseeds.org">legal@sixseeds.org</a>. Counter-notifications may be submitted in accordance with 17 U.S.C. § 512(g). The Company may, in appropriate circumstances and in its sole discretion, terminate the accounts of users who are repeat infringers.
        </p>

        <h2>12. Termination</h2>
        <p>
          The Company may suspend or terminate your access to the App at any time, with or without cause, and with or without prior notice, to the extent permitted by applicable law. Without limiting the foregoing, the Company may immediately terminate your account if you violate these Terms or if continued provision of service creates legal or reputational risk for the Company.
        </p>
        <p>
          You may terminate your account at any time by contacting us at the address provided in Section 20 or, once available, through the account deletion function within the App. Upon termination of your account for any reason, your license to use the App ceases immediately and you must cease all use of the App.
        </p>
        <p>Sections 5.1 through 5.4, 7, 13, 14, 15, and 16 of these Terms survive any termination.</p>

        <h2>13. Disclaimers of Warranty</h2>
        <DisclaimerBlock>
          THE APP, ALL CONTENT, AND ALL SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. THE COMPANY DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE APP IS ENTIRELY AT YOUR OWN RISK.
        </DisclaimerBlock>

        <h2>14. Limitation of Liability</h2>
        <DisclaimerBlock>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CHOSEN TECHNOLOGIES, INC. OR ANY OF ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, LICENSORS, OR SERVICE PROVIDERS BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, OR COST OF SUBSTITUTE GOODS OR SERVICES, ARISING OUT OF OR IN ANY WAY RELATED TO YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE APP OR ANY CONTENT THEREIN, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE APP SHALL NOT EXCEED THE GREATER OF (A) FIFTY DOLLARS ($50.00) OR (B) THE TOTAL FEES, IF ANY, PAID BY YOU TO THE COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, AND THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU TO THE EXTENT PROHIBITED BY APPLICABLE LAW.
        </DisclaimerBlock>

        <h2>15. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Chosen Technologies, Inc. and its officers, directors, employees, agents, affiliates, licensors, and service providers from and against any and all claims, liabilities, damages, judgments, losses, costs, and expenses (including reasonable attorneys' fees and court costs) arising out of or in any way connected with: (a) your access to or use of the App; (b) your User Content; (c) your violation of these Terms; (d) your violation of any applicable law or regulation; or (e) your violation of any rights of any third party. The Company reserves the right, at its own expense, to assume exclusive defense and control of any matter subject to indemnification by you, in which event you will cooperate fully with the Company.
        </p>

        <h2>16. Dispute Resolution; Mandatory Arbitration; Class Action Waiver</h2>

        <h3>16.1 Informal Resolution</h3>
        <p>
          Before initiating any arbitration proceeding, you agree to contact the Company at the address in Section 20 and attempt in good faith to resolve the dispute informally. You and the Company each agree to negotiate in good faith for a period of at least thirty (30) days before either party initiates arbitration. This informal resolution requirement does not apply to applications by either party for emergency injunctive relief.
        </p>

        <h3>16.2 Binding Arbitration</h3>
        <p>
          If informal resolution is unsuccessful, any dispute, claim, or controversy arising out of or relating to these Terms, the App, or any aspect of the relationship between you and the Company that cannot be resolved through informal negotiation shall be resolved exclusively by final and binding arbitration administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules, as modified by these Terms. The arbitration shall be conducted in Broward County, Florida, or, at your election if you are a consumer, by telephone or videoconference. The arbitrator shall apply Florida law consistent with the Federal Arbitration Act and applicable statutes of limitations. The arbitrator's award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.
        </p>

        <h3>16.3 Class Action Waiver</h3>
        <DisclaimerBlock>
          YOU AND CHOSEN TECHNOLOGIES, INC. EACH AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS SHALL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. IF A COURT OR ARBITRATOR DETERMINES THAT THE CLASS ACTION WAIVER IN THIS SECTION IS UNENFORCEABLE AS TO A PARTICULAR CLAIM OR REQUEST FOR RELIEF, THE PARTIES AGREE THAT THE ARBITRATION AGREEMENT SHALL BE NULL AND VOID WITH RESPECT TO THAT CLAIM OR REQUEST FOR RELIEF ONLY, AND THAT CLAIM OR REQUEST FOR RELIEF SHALL PROCEED IN A COURT OF COMPETENT JURISDICTION. ALL OTHER CLAIMS SHALL REMAIN SUBJECT TO ARBITRATION.
        </DisclaimerBlock>

        <h3>16.4 Opt-Out Right</h3>
        <p>
          You may opt out of the arbitration agreement by sending written notice of your decision to opt out to the Company at the address in Section 20 within thirty (30) days of the date you first accept these Terms. Your opt-out notice must include your name, address, and a clear statement that you wish to opt out of the arbitration agreement. If you opt out, you do not waive any other provision of these Terms.
        </p>

        <h3>16.5 Exceptions</h3>
        <p>
          Notwithstanding the foregoing, either party may seek emergency injunctive or other equitable relief in a court of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or violation of intellectual property rights or confidentiality obligations, pending arbitration. Claims under the DMCA in Section 11 may be pursued in court.
        </p>

        <h2>17. Governing Law</h2>
        <p>
          These Terms and any disputes arising hereunder are governed by the laws of the State of Florida, without regard to its conflict-of-laws principles. To the extent any claim or dispute is not subject to mandatory arbitration under Section 16, each party consents to the exclusive personal jurisdiction and venue of the state and federal courts sitting in Broward County, Florida, and waives any objection to jurisdiction or venue in those courts.
        </p>

        <h2>18. Modifications to These Terms</h2>
        <p>
          The Company reserves the right to modify these Terms at any time. When we make material changes, we will update the "Last Updated" date at the top of this document and, where practicable, provide notice through the App or by other means. Your continued use of the App after the effective date of any modification constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must cease using the App.
        </p>

        <h2>19. Miscellaneous</h2>
        <p>
          These Terms, together with the Privacy Policy and any additional terms incorporated by reference herein, constitute the entire agreement between you and Chosen Technologies, Inc. with respect to the App and supersede all prior or contemporaneous understandings, agreements, representations, and warranties, whether written or oral. If any provision of these Terms is found by a court or arbitrator to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect. The Company's failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. These Terms do not create a partnership, joint venture, agency, franchise, or employment relationship between you and the Company. You may not assign any rights or obligations under these Terms without the Company's prior written consent. The Company may assign these Terms, in whole or in part, at any time.
        </p>

        <h2>20. Contact Information</h2>
        <p>Questions about these Terms or the App may be directed to:</p>
        <ContactBlock />
      </>
    }
  />
);

export const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    description="Read the Six Seeds privacy policy to learn how we collect, use, and protect your information."
    canonical="https://sixseeds.org/privacy"
    content={
      <>
        <EffectiveDate date="May 23, 2026" />

        <h2>1. Introduction and Scope</h2>
        <p>
          Chosen Technologies, Inc., a Delaware corporation doing business as Six Seeds ("Company," "we," "our," or "us"), is committed to protecting the privacy of users of the Six Seeds mobile application ("App"). This Privacy Policy explains what personal information we collect, how we use and share it, and the choices available to you regarding your information. This Policy applies to all users of the App, including regular users, pastors, and church staff. Your use of the App constitutes your agreement to the practices described in this Policy.
        </p>
        <p>
          This Policy does not cover the data practices of Church Partners, which are independent organizations that enter into separate agreements with the Company. Church Partners' own privacy practices govern how they handle member information outside of the App.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Information You Provide Directly</h3>
        <p>
          <strong>Registration Data — Regular Users.</strong> When you register as a regular user, we collect your name, phone number, profile avatar (image), and the participating church with which you affiliate yourself. We anticipate collecting email addresses from all users in a forthcoming update and will revise this Policy accordingly before doing so.
        </p>
        <p>
          <strong>Registration Data — Pastors and Church Staff.</strong> If you register as a pastor or church staff member, we collect the information listed above for regular users and additionally your professional title, biography, and email address.
        </p>
        <p>
          <strong>Church Organization Data.</strong> When a church organization registers as a Church Partner, we collect the church's name, city, state, country, and the designated contact's name, email address, and telephone number.
        </p>
        <p>
          <strong>User Content and Chat Data.</strong> When you submit responses to in-app prompts or engage in conversation with the AI Chat feature, we collect and store the content of those submissions and exchanges.
        </p>
        <p>
          <strong>Push Notification Preferences.</strong> When you opt in to push notifications, we collect your preferred daily notification time and the device token necessary to deliver notifications to your device.
        </p>

        <h3>2.2 Information Collected Automatically</h3>
        <p>
          When you use the App, we and our service providers automatically collect certain technical and usage information, including: your Internet Protocol (IP) address; device type, model, and operating system; unique device identifiers; App version; and data regarding your interactions with App features (including which content you view, how long you engage with it, and which functions you use). This information is collected primarily through the analytics services described in Section 4.
        </p>

        <h3>2.3 Information We Do Not Collect</h3>
        <p>
          The Company does not collect your precise geolocation, financial account information (your payment card data is collected directly by Stripe as described in Section 4), or health or biometric data.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ol type="a">
          <li><strong>Account Creation and Maintenance.</strong> To establish and manage your account, authenticate your identity, and enable the features of the App.</li>
          <li><strong>Service Delivery.</strong> To deliver the Garden daily content experience, operate the AI Chat and video library features, process your prompt responses, and send push notifications at your selected time.</li>
          <li><strong>AI Content Generation.</strong> To transmit sermon source material and, where applicable, elements of your in-app interactions to Anthropic PBC's Claude Sonnet model for the purpose of generating AI-powered content within the App. See Section 4 for details regarding Anthropic's data practices.</li>
          <li><strong>Analytics and Improvement.</strong> To analyze usage patterns, diagnose technical issues, and improve the App's features and content using Amplitude and Google Analytics.</li>
          <li><strong>Payment Processing.</strong> To facilitate payment transactions where applicable, through Stripe, Inc.</li>
          <li><strong>Communications.</strong> To send you service-related notices, respond to your inquiries, and communicate updates to these policies.</li>
          <li><strong>Legal Compliance.</strong> To comply with applicable laws, regulations, subpoenas, court orders, and government requests, and to enforce our Terms and Conditions.</li>
          <li><strong>Safety and Security.</strong> To detect and prevent fraud, abuse, unauthorized access, and other harmful activity.</li>
        </ol>

        <h2>4. Third-Party Service Providers</h2>
        <p>We engage the following categories of third-party service providers who process personal data on our behalf or in connection with the App.</p>

        <h3>4.1 Artificial Intelligence Processing — Anthropic PBC</h3>
        <p>
          The App uses Anthropic PBC's Claude Sonnet large language model to generate AI-powered content, including Garden daily cards and AI Chat responses. Sermon recordings, indexed content derived from those recordings, and elements of your AI Chat interactions are transmitted to Anthropic's servers for processing. Anthropic's API terms provide that customer data submitted through the API is not used by Anthropic to train its models without explicit opt-in consent.
        </p>

        <h3>4.2 Analytics — Amplitude, Inc. and Google LLC</h3>
        <p>
          We use Amplitude to collect and analyze behavioral data regarding how users interact with the App. We use Google Analytics to collect additional usage data. Both services may collect your IP address, device identifiers, and App interaction events. You may opt out of Amplitude's data collection using the tools available at amplitude.com/privacy. You may opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.
        </p>

        <h3>4.3 Payment Processing — Stripe, Inc.</h3>
        <p>
          Where individual user subscriptions are offered, we use Stripe, Inc. to process payments. Stripe collects and processes your payment card information directly in accordance with its Privacy Policy and applicable PCI-DSS standards. The Company does not store your full payment card number.
        </p>

        <h3>4.4 Push Notification Infrastructure</h3>
        <p>
          We use Apple's Push Notification service (APNs) and Google's Firebase Cloud Messaging (FCM) to deliver daily push notifications to iOS and Android devices, respectively. These services process your device token and notification payload but do not receive your broader personal profile.
        </p>

        <h2>5. How We Share Your Information</h2>
        <p>The Company does not sell your personal information to third parties. We do not share personal information for cross-context behavioral advertising. We may share your information only in the following limited circumstances:</p>
        <ul>
          <li><strong>With Church Partners.</strong> Your church affiliation is visible to the Church Partner you designate within the App. We may provide Church Partners with aggregated, de-identified usage data regarding how their affiliated users engage with content; we do not provide Church Partners with individually identifiable user data.</li>
          <li><strong>With Service Providers.</strong> We share information with the third-party vendors described in Section 4 and with other vendors engaged to support App operations — such as cloud hosting, customer support, and security providers — under contracts requiring them to protect the information and use it only for the purposes specified.</li>
          <li><strong>For Legal Reasons.</strong> We may disclose personal information if we believe disclosure is required by applicable law, subpoena, court order, or governmental demand, or if we believe disclosure is necessary to protect the rights, property, or safety of the Company, our users, or the public.</li>
          <li><strong>Business Transfers.</strong> If the Company undergoes a merger, acquisition, reorganization, or sale of all or substantially all of its assets, your personal information may be transferred as part of that transaction. We will provide notice before your personal information becomes subject to a materially different privacy policy.</li>
          <li><strong>With Your Consent.</strong> We may share your information for purposes not described in this Policy with your explicit, prior consent.</li>
        </ul>

        <h2>6. Content Shared Outside the App</h2>
        <p>
          When you use the App's sharing feature to share a content item via a generated link, the recipient receives access to a static image of that content item in their web browser. No personal information about you is transmitted with or embedded in the shared link. Recipients do not need an account to view shared content. The Company has no control over how recipients handle content after it is shared, and you assume all risk associated with sharing content beyond the App's environment.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          The App is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. During registration, all users are required to provide their date of birth; any user identified as under 13 is denied access. If the Company becomes aware that it has collected personal information from a child under 13 without appropriate parental consent, it will delete that information promptly. If you are a parent or legal guardian and believe that your child has provided personal information to the App, please contact us at the address in Section 15.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain personal information for as long as your account remains active or as otherwise necessary to provide you with the App's services, comply with our legal obligations, resolve disputes, and enforce our agreements. When you request deletion of your account, we will delete or anonymize your personal information within a commercially reasonable period, subject to any legal obligations requiring retention of certain records.
        </p>
        <p>
          Church Content associated with a Church Partner's subscription is deleted or rendered inaccessible within ninety (90) days following that Church Partner's termination of its subscription. Derivative Content generated from Church Content may be retained by the Company as proprietary intellectual property in accordance with Section 5.2 of the Terms and Conditions.
        </p>

        <h2>9. Push Notifications</h2>
        <p>
          You may grant or revoke push notification permissions at any time through your device's operating system settings. We use the daily notification time you set during onboarding to deliver your Garden content. Disabling push notifications does not delete your account or personal information.
        </p>

        <h2>10. Your Privacy Choices and Rights</h2>
        <ul>
          <li><strong>Account Information.</strong> You may review and update your account information within the App at any time.</li>
          <li><strong>Deletion Requests.</strong> You may request deletion of your account and associated personal information by contacting us at the address in Section 15. We will honor verified deletion requests subject to any legal obligations that require us to retain certain records.</li>
          <li><strong>Analytics Opt-Out.</strong> You may limit analytics data collection through your device's privacy settings or through the opt-out mechanisms provided by Amplitude and Google Analytics, as described in Section 4.2.</li>
          <li><strong>Push Notification Opt-Out.</strong> You may disable push notifications through your device settings at any time.</li>
        </ul>

        <h2>11. California Privacy Rights</h2>
        <p>
          If you are a California resident, you have specific rights under the California Consumer Privacy Act of 2018, as amended by the California Privacy Rights Act of 2020 (collectively, "CCPA/CPRA").
        </p>
        <p>
          <strong>Categories of Personal Information Collected.</strong> In the preceding twelve months, we have collected the following categories of personal information: identifiers (name, phone number, email address, device identifiers, IP address); commercial information (subscription and payment history, where applicable); internet or other electronic network activity information (App interaction data); and visual information (profile avatars). We do not sell or share personal information as those terms are defined under the CCPA/CPRA.
        </p>
        <p><strong>Your Rights:</strong></p>
        <ul>
          <li><strong>Right to Know.</strong> You have the right to request that we disclose the categories of personal information we have collected about you, the categories of sources from which it was collected, the business or commercial purposes for collecting it, the categories of third parties with whom we share it, and the specific pieces of personal information we have collected.</li>
          <li><strong>Right to Delete.</strong> You have the right to request deletion of personal information we have collected from you, subject to certain exceptions permitted by law.</li>
          <li><strong>Right to Correct.</strong> You have the right to request correction of inaccurate personal information we maintain about you.</li>
          <li><strong>Right to Opt Out of Sale or Sharing.</strong> We do not sell personal information to third parties and do not share personal information for cross-context behavioral advertising. You therefore need not submit an opt-out request.</li>
          <li><strong>Right to Non-Discrimination.</strong> We will not discriminate against you for exercising any of your rights under the CCPA/CPRA.</li>
        </ul>
        <p>
          To exercise your rights to know, delete, or correct, please contact us at the address in Section 15. We will respond to verified requests within forty-five (45) days, with a possible extension of an additional forty-five (45) days where reasonably necessary. You may designate an authorized agent to submit a request on your behalf; the agent must provide proof of authorization, and we may still require you to verify your identity directly.
        </p>

        <h2>12. International Users</h2>
        <p>
          The App is operated from the United States, and the personal information we collect is processed and stored on servers located in the United States. The United States may not provide the same level of data protection as the laws of your home country. By using the App, users located outside the United States consent to the transfer of their personal information to the United States and its processing in accordance with this Privacy Policy.
        </p>
        <p>
          As the Company expands to serve international users, we will evaluate and implement compliance with applicable data protection frameworks, including the General Data Protection Regulation ("GDPR") for users in the European Economic Area and the United Kingdom. We will update this Privacy Policy to reflect those obligations before making the App available in affected jurisdictions.
        </p>

        <h2>13. Security</h2>
        <p>
          The Company implements reasonable technical and organizational security measures designed to protect your personal information from unauthorized access, use, alteration, disclosure, and destruction. These measures include, without limitation, encryption of data in transit, access controls, and security assessments of service providers. However, no data transmission over the internet and no data storage system is completely secure. We cannot guarantee the absolute security of your personal information, and you use the App at your own risk.
        </p>
        <p>
          In the event of a data breach that triggers applicable notification obligations, we will notify affected users and relevant authorities as required by law.
        </p>

        <h2>14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time as our practices evolve or as required by applicable law. When we make material changes, we will update the "Last Updated" date at the top of this Policy and, where practicable, provide notice through the App or by other appropriate means. Your continued use of the App after the effective date of a revised Policy constitutes your acceptance of the updated Policy. If you do not agree with the changes, you must cease using the App.
        </p>

        <h2>15. Contact Us</h2>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
        <ContactBlock />
      </>
    }
  />
);
