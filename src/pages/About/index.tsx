import MaxWidthContainer from "@/components/MaxWidthContainer";
import MarkdownViewer from "./MarkdownViewer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Add your own content here in Markdown format
const aboutContent = `# About Me

Hey there! I'm **Gautam Vhavle**, a passionate Full-Stack Developer based in Bengaluru, India.

## What I Do

I specialize in building modern web applications with a focus on:

- **Frontend Development** - React, TypeScript, Next.js, Tailwind CSS
- **Backend Development** - Node.js, Python, PostgreSQL, MongoDB
- **GenAI & LLMs** - Building AI-powered applications and integrations
- **IoT Solutions** - Embedded systems and connected devices

## My Journey

\`\`\`typescript
const gautam = {
  role: "Full-Stack Developer",
  location: "Bengaluru, India",
  currentFocus: ["GenAI", "Context Engineering", "Web3"],
  languages: ["TypeScript", "Python", "Go", "Rust"],
  hobbies: ["Building side projects", "Open source", "Learning new tech"]
};
\`\`\`

## Experience

I'm currently working at **Grig Technologies**, where I build scalable web applications and explore the intersection of AI and software development.

> "The best way to predict the future is to create it." - Alan Kay

## Let's Connect

Feel free to reach out if you want to collaborate on a project or just chat about tech!

- 📧 Email: [gautamvhavle@gmail.com](mailto:gautamvhavle@gmail.com)
- 🌐 Website: [grigtechnologies.com](https://grigtechnologies.com)
- 💼 GitHub: [@GautamVhavle](https://github.com/GautamVhavle)

---

*This page was built with React + TypeScript + Vite* ✨
`;

export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <Header />

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <div className="flex flex-col mb-4">
          {/* Page Title */}
          <div className="flex flex-col gap-2">
            <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
              A little bit about who I am and what I do
            </p>
          </div>

          {/* Markdown Viewer */}
          <MarkdownViewer content={aboutContent} filename="about.md" />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Footer />
      </MaxWidthContainer>
    </div>
  );
}
