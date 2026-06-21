import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { LegalPage, ContactBlock } from "./Legal";

// Public (publishable) key — the same one shipped in the app's frontend
// bundles. The account-deletion-request edge function records a *pending*
// request; staff review it before anything is deleted.
const SUPABASE_FUNCTIONS_URL =
  "https://mtuimpykacljpmxkarky.supabase.co/functions/v1";
const SUPABASE_ANON_KEY = "sb_publishable_F8iHELEo-vuK_sTekPXA1w_rEk4tgWZ";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full bg-transparent border-b border-white/10 py-4 px-2 text-white placeholder:text-[#FEECD3]/50 focus:outline-none focus:border-[#B4926C]/50 transition-all duration-500 font-light text-base";
const labelClasses =
  "text-xs uppercase tracking-[0.2em] text-white font-semibold ml-2";

const DeleteAccountForm = () => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never fill this
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (company) {
      setStatus("success"); // bot tripped the honeypot — pretend success, send nothing
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(
        `${SUPABASE_FUNCTIONS_URL}/account-deletion-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            email: email.trim(),
            reason: reason.trim() || undefined,
          }),
        },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err.message || "We couldn't reach the server. Please try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#B4926C]/20 bg-[#B4926C]/[0.05] p-8 my-2 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#B4926C]/20 flex items-center justify-center border border-[#B4926C]/30">
          <CheckCircle className="w-8 h-8 text-[#B4926C]" />
        </div>
        <h3 className="font-serif text-2xl text-white">Request received.</h3>
        <p className="text-sm text-[#FEECD3]/60 max-w-sm">
          Our team will review your request and permanently delete your account
          and data within 30 days.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#FEECD3]/[0.03] p-6 md:p-8 my-2">
      {status === "error" && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="da-email" className={labelClasses}>
            Account email
          </label>
          <input
            id="da-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="da-reason" className={labelClasses}>
            Reason (optional)
          </label>
          <textarea
            id="da-reason"
            name="reason"
            rows="2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Anything you'd like us to know"
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="group relative px-12 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-500 overflow-hidden shadow-2xl disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B4926C]/0 via-[#B4926C]/10 to-[#B4926C]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative text-[#FEECD3] font-bold tracking-widest uppercase text-sm flex items-center gap-3">
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Submit deletion request"
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteAccount = () => (
  <LegalPage
    title="Delete Your Account"
    description="Request permanent deletion of your Six Seeds account and associated data."
    canonical="https://sixseeds.org/delete-account"
    content={
      <>
        <p>
          Use this page to request permanent deletion of your{" "}
          <strong>Six Seeds</strong> account (Chosen Technologies, Inc., DBA Six
          Seeds) and the personal data associated with it.
        </p>

        <h2>How to request deletion</h2>
        <ol>
          <li>
            Enter the email address for your Six Seeds account below — or, in the
            app, go to <strong>Account → Delete Account</strong>.
          </li>
          <li>
            Submit the form. Our team reviews each request to confirm the account
            owner.
          </li>
          <li>
            After approval, your account and personal data are permanently
            deleted. We process requests within <strong>30 days</strong>.
          </li>
        </ol>

        <h2>Request deletion</h2>
        <DeleteAccountForm />

        <h2>What is deleted</h2>
        <p>
          Everything tied to your account: your profile (name, email, phone),
          your garden responses and reflections, your chat history with the AI
          guide, notification and device tokens, reminder settings, and your
          streak and session history.
        </p>

        <h2>What is kept, and for how long</h2>
        <p>
          Nothing is retained in our active systems after deletion. Residual
          copies in encrypted backups are purged within <strong>30 days</strong>,
          after which they are automatically overwritten. We keep only a minimal
          record that a deletion request was made and fulfilled, as required for
          our own compliance.
        </p>

        <h2>Questions?</h2>
        <p>If you have any questions about deleting your account, contact us:</p>
        <ContactBlock />
      </>
    }
  />
);

export default DeleteAccount;
