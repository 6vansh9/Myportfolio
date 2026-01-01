import React, { useRef, useState } from "react";
import { IoCalendarOutline, IoMailOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setSubmitting(true);

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formbold.com/s/3jKjL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setOpen(true);
        form.reset();
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch {
      alert("There was an error sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase hover:text-white transition-colors">
        Let's Work Together
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact Methods */}
        <div className="font-inter px-6 py-5 rounded-xl bg-zinc-900/25 border backdrop-blur-lg border-zinc-800/40 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-zinc-200 mb-1.5">Get in Touch</h3>
            <p className="text-sm text-zinc-400 leading-[1.6]">
              Choose your preferred method to connect and let's discuss your project.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="https://cal.com/gautamvhavle/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4.5 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/60 hover:bg-zinc-800/40 transition-all duration-200 group"
            >
              <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {/* Calendar Icon */}
                <IoCalendarOutline size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-zinc-300 mb-0.5">Schedule a free call</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">30-minute strategy session</p>
              </div>
              <MdArrowOutward className="text-zinc-600 group-hover:text-zinc-500 transition-colors shrink-0" />
            </a>
            <a
              href="mailto:gautam.vhavle@grigtechnologies.com"
              className="flex items-center gap-3 px-4.5 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/60 hover:bg-zinc-800/40 transition-all duration-200 group"
            >
              <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {/* Mail Icon */}
                <IoMailOutline size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-zinc-300 mb-0.5 truncate">Send Email</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Quick inquiries &amp; questions</p>
              </div>
              <MdArrowOutward className="text-zinc-600 group-hover:text-zinc-500 transition-colors shrink-0" />
            </a>
            <a
              href="https://x.com/gautamvvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4.5 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/60 hover:bg-zinc-800/40 transition-all duration-200 group"
            >
              <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {/* X Icon */}
                <FaXTwitter />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-zinc-300 mb-0.5">Connect on X</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Follow for updates &amp; insights</p>
              </div>
              <MdArrowOutward className="text-zinc-600 group-hover:text-zinc-500 transition-colors shrink-0" />
            </a>
          </div>
          <div className="mt-auto pt-3 border-t border-zinc-800/40">
            <p className="text-xs text-zinc-600">
              Response within 24 hours • Available for hire
            </p>
          </div>
        </div>
        {/* Contact Form */}
        <div className="font-inter px-6 py-5 rounded-xl bg-zinc-900/25 border backdrop-blur-lg border-zinc-800/40">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-medium text-zinc-200 mb-1.5">Send a Message</h3>
            <p className="text-sm text-zinc-400 leading-[1.6]">
              Prefer to write? Fill out the form and I'll get back to you within 24 hours.
            </p>
          </div>
          <form
            ref={formRef}
            className="space-y-2.5"
            action="https://formbold.com/s/3jKjL"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              disabled={submitting}
              className="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none hover:border-zinc-800 focus:border-zinc-700 transition-all ease-in-out"
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              disabled={submitting}
              className="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none hover:border-zinc-800 focus:border-zinc-700 transition-all ease-in-out"
            />
            <textarea
              name="message"
              placeholder="Type your message"
              required
              rows={5}
              disabled={submitting}
              className="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none hover:border-zinc-800 focus:border-zinc-700 transition-all ease-in-out resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#131314] ${
                submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-[#151515]"
              } border-[#2a2a2a] text-[#c7c7d7] text-sm font-medium rounded-lg border transition-all ease-out duration-200 group`}
            >
              {submitting && (
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-zinc-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              <span>{submitting ? "Sending..." : "Send Message"}</span>
              {!submitting && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="group-hover:translate-x-0.5 transition-transform ease-out" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Alert Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for reaching out. Your message has been sent successfully. I will get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}