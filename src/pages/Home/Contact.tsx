import React, { useRef, useState } from "react";
import { IoCalendarOutline, IoMailOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import metadata from "@/content/metadata.json";

const iconMap = {
    calendar: IoCalendarOutline,
    email: IoMailOutline,
    linkedin: FiLinkedin,
};

export default function Contact() {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { contactSection } = metadata.home;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;
        setSubmitting(true);

        const formData = new FormData(form);

        try {
            const response = await fetch(contactSection.form.actionUrl, {
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
            <p className="mb-4 text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
                {contactSection.title}
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Contact Methods */}
                <div className="font-inter flex flex-col rounded-xl border border-zinc-800/40 bg-zinc-900/25 px-6 py-5 backdrop-blur-lg">
                    <div className="mb-4">
                        <h3 className="mb-1.5 text-lg font-medium text-zinc-200">
                            Get in Touch
                        </h3>
                        <p className="text-sm leading-[1.6] text-zinc-400">
                            Choose your preferred method to connect and let's discuss your
                            project.
                        </p>
                    </div>
                    <div className="space-y-3">
                        {contactSection.methods.map((method) => {
                            const Icon = iconMap[method.type as keyof typeof iconMap];
                            return (
                                <a
                                    key={method.type}
                                    href={method.url}
                                    target={method.type !== "email" ? "_blank" : undefined}
                                    rel={method.type !== "email" ? "noopener noreferrer" : undefined}
                                    className="group flex items-center gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-4.5 py-2.5 transition-all duration-200 hover:border-zinc-700/60 hover:bg-zinc-800/40"
                                >
                                    <span className="text-zinc-500 transition-colors group-hover:text-zinc-400">
                                        <Icon size={18} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-0.5 truncate text-xs text-zinc-300 sm:text-sm">
                                            {method.title}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 sm:text-xs">
                                            {method.description}
                                        </p>
                                    </div>
                                    <MdArrowOutward className="shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-500" />
                                </a>
                            );
                        })}
                    </div>
                    <div className="mt-auto border-t border-zinc-800/40 pt-3">
                        <p className="text-xs text-zinc-600">{contactSection.footer}</p>
                    </div>
                </div>
                {/* Contact Form */}
                <div className="font-inter rounded-xl border border-zinc-800/40 bg-zinc-900/25 px-6 py-5 backdrop-blur-lg">
                    <div className="mb-4">
                        <h3 className="mb-1.5 text-base font-medium text-zinc-200 sm:text-lg">
                            {contactSection.form.title}
                        </h3>
                        <p className="text-sm leading-[1.6] text-zinc-400">
                            {contactSection.form.description}
                        </p>
                    </div>
                    <form
                        ref={formRef}
                        className="space-y-2.5"
                        action={contactSection.form.actionUrl}
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            disabled={submitting}
                            className="w-full rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3.5 py-2.5 text-sm text-zinc-200 transition-all ease-in-out placeholder:text-zinc-500 hover:border-zinc-800 focus:border-zinc-700 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            required
                            disabled={submitting}
                            className="w-full rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3.5 py-2.5 text-sm text-zinc-200 transition-all ease-in-out placeholder:text-zinc-500 hover:border-zinc-800 focus:border-zinc-700 focus:outline-none"
                        />
                        <textarea
                            name="message"
                            placeholder="Type your message"
                            required
                            rows={5}
                            disabled={submitting}
                            className="w-full resize-none rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3.5 py-2.5 text-sm text-zinc-200 transition-all ease-in-out placeholder:text-zinc-500 hover:border-zinc-800 focus:border-zinc-700 focus:outline-none"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`inline-flex w-full items-center justify-center gap-2 bg-[#131314] px-4 py-2.5 ${
                                submitting
                                    ? "cursor-not-allowed opacity-60"
                                    : "hover:bg-[#151515]"
                            } group rounded-lg border border-[#2a2a2a] text-sm font-medium text-[#c7c7d7] transition-all duration-200 ease-out`}
                        >
                            {submitting && (
                                <svg
                                    className="mr-2 h-4 w-4 animate-spin text-zinc-400"
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    className="transition-transform ease-out group-hover:translate-x-0.5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
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
                            Thank you for reaching out. Your message has been sent
                            successfully. I will get back to you within 24 hours.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setOpen(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
