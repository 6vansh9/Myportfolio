import { useState } from "react";

type Certificate = {
  id: number;
  name: string;
  issuer: string;
  issuerLogo: string;
  credentialId: string;
  issuedDate: string;
  skills: string[];
  credentialUrl: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Retrieval Augmented Generation (RAG)",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQEHKffoI8RwIQ/company-logo_100_100/company-logo_100_100/0/1630672537710/deeplearningai_logo?e=1769040000&v=beta&t=3pHURCMWrr-G6uT51tv7lA9uTjo-uMqarn86wwjXZ-Y",
    credentialId: "Retrieval Augmented Generation (RAG)",
    issuedDate: "Dec 2025",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "Information Retrieval",
      "chunking",
      "Intelligent Agents",
      "Large Language Models (LLM)",
    ],
    credentialUrl: "https://coursera.org/share/78ea2fd0831171b2b6b78bb9bf978c05",
  },
  {
    id: 2,
    name: "Quickstart: LangGraph Essentials - Python",
    issuer: "LangChain",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQFo2IrXO1-LCg/company-logo_100_100/B56ZoB_xEeJsAQ-/0/1760970084952/langchain_logo?e=1769040000&v=beta&t=UXxTqhLweWuhmGcF08-4HjOJSc5xUU8gekPDjKebfBc",
    credentialId: "ndqtwkxtu0",
    issuedDate: "Nov 2025",
    skills: [],
    credentialUrl: "https://academy.langchain.com/certificates/ndqtwkxtu0",
  },
  {
    id: 3,
    name: "Quickstart: LangChain Essentials - Python",
    issuer: "LangChain",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQFo2IrXO1-LCg/company-logo_100_100/B56ZoB_xEeJsAQ-/0/1760970084952/langchain_logo?e=1769040000&v=beta&t=UXxTqhLweWuhmGcF08-4HjOJSc5xUU8gekPDjKebfBc",
    credentialId: "cyjulhh0ma",
    issuedDate: "Oct 2025",
    skills: ["Agentic AI", "Agent Tools", "Agent orchestration"],
    credentialUrl: "https://academy.langchain.com/certificates/cyjulhh0ma",
  },
  {
    id: 4,
    name: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQEHKffoI8RwIQ/company-logo_100_100/company-logo_100_100/0/1630672537710/deeplearningai_logo?e=1769040000&v=beta&t=3pHURCMWrr-G6uT51tv7lA9uTjo-uMqarn86wwjXZ-Y",
    credentialId: "109eb03d-bf30-49a5-99cd-1a08514940cc",
    issuedDate: "Sep 2025",
    skills: ["Chatbot Development", "GenAI Applications", "Prompt Engineering"],
    credentialUrl: "https://learn.deeplearning.ai/accomplishments/109eb03d-bf30-49a5-99cd-1a08514940cc",
  },
  {
    id: 5,
    name: "Foundation: Introduction to LangGraph",
    issuer: "LangChain",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQFo2IrXO1-LCg/company-logo_100_100/B56ZoB_xEeJsAQ-/0/1760970084952/langchain_logo?e=1769040000&v=beta&t=UXxTqhLweWuhmGcF08-4HjOJSc5xUU8gekPDjKebfBc",
    credentialId: "xok3d0t5ig",
    issuedDate: "Sep 2025",
    skills: [],
    credentialUrl: "https://academy.langchain.com/certificates/xok3d0t5ig",
  },
  {
    id: 6,
    name: "Generative AI for Business Leaders",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "58e2719d1e5057af41a3db43706f88a22435740d7daf77932cf7ab623b608d05",
    issuedDate: "Sep 2025",
    skills: [
      "Generative AI for Management",
      "Artificial Intelligence (AI)",
      "Artificial Intelligence for Business",
    ],
    credentialUrl: "https://www.linkedin.com/learning/certificates/58e2719d1e5057af41a3db43706f88a22435740d7daf77932cf7ab623b608d05?u=73045713",
  },
  {
    id: 7,
    name: "Generative AI: Working with Large Language Models",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "559b5a260a0f44154094bce1d5648adaa9a8440d9e8878235766448d846b5da2",
    issuedDate: "Sep 2025",
    skills: ["Natural Language Processing (NLP)"],
    credentialUrl: "https://www.linkedin.com/learning/certificates/559b5a260a0f44154094bce1d5648adaa9a8440d9e8878235766448d846b5da2",
  },
  {
    id: 8,
    name: "Introduction to Generative AI",
    issuer: "Google",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1769040000&v=beta&t=vsybj0Ma3o8Pbp5PWrBnp0Y11FBfIgUJnuM9MubLh2w",
    credentialId: "250W63NDY3MK",
    issuedDate: "Sep 2025",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/250W63NDY3MK",
  },
  {
    id: 9,
    name: "What Is Generative AI?",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "f5bfb1fd4f56ddb5d54a5329d58918d8ccf67a75031f30c78a6cecfba4d33b62",
    issuedDate: "Sep 2025",
    skills: [
      "Artificial Intelligence (AI)",
      "Generative AI Tools",
      "Generative AI",
    ],
    credentialUrl: "https://www.linkedin.com/learning/certificates/f5bfb1fd4f56ddb5d54a5329d58918d8ccf67a75031f30c78a6cecfba4d33b62?trk=share_certificate",
  },
  {
    id: 10,
    name: "Advanced AI: Transformers for Computer Vision",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "15694683211d1a2f4c7fa4b47a7d25795099a53a34c6199e8fcde5cd8f5d407f",
    issuedDate: "Jun 2025",
    skills: [
      "Transformer Models",
      "Generative Adversarial Networks (GANs)",
    ],
    credentialUrl: "https://www.linkedin.com/learning/certificates/15694683211d1a2f4c7fa4b47a7d25795099a53a34c6199e8fcde5cd8f5d407f",
  },
  {
    id: 11,
    name: "Hands-On Generative AI with Multi-Agent LangChain: Building Real-World Applications",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "a32498e2f5f258365e4a66cd7acd08c6b389552c8af17b1d103a9a42801c4e1f",
    issuedDate: "May 2025",
    skills: [
      "Application Development",
      "LangChain",
      "Generative AI",
    ],
    credentialUrl: "https://www.linkedin.com/learning/certificates/a32498e2f5f258365e4a66cd7acd08c6b389552c8af17b1d103a9a42801c4e1f",
  },
  {
    id: 12,
    name: "Advanced Prompt Engineering Techniques",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "c5da172389710fa740c9d70d7b52d2e51fde6d7784c6750e3f70be52bca9efec",
    issuedDate: "Apr 2025",
    skills: ["Artificial Intelligence (AI)"],
    credentialUrl: "https://www.linkedin.com/learning/certificates/c5da172389710fa740c9d70d7b52d2e51fde6d7784c6750e3f70be52bca9efec",
  },
  {
    id: 13,
    name: "Prompt Engineering: How to Talk to the AIs",
    issuer: "LinkedIn",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1769040000&v=beta&t=VFVlMMsYsr1FqPaeHi0y2kpg7jdBXIHYwdmIp2KYrtI",
    credentialId: "e475ebfef9fef6db6deb8aef3f912af9fd9796ee14aa9c92cd5090ff7e034a0d",
    issuedDate: "Apr 2025",
    skills: [
      "Prompt Engineering",
      "Large Language Models (LLM)",
      "Generative AI",
    ],
    credentialUrl: "https://www.linkedin.com/learning/certificates/e475ebfef9fef6db6deb8aef3f912af9fd9796ee14aa9c92cd5090ff7e034a0d",
  },
  {
    id: 14,
    name: "Data Analysis and Visualization Foundations",
    issuer: "IBM",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_100_100/company-logo_100_100/0/1688684715866/ibm_logo?e=1769040000&v=beta&t=29j_rtwbFw9NE_dpiumkmDo02E3yH9xWtuDgcCXONcI",
    credentialId: "ca6e32cece9fc170783744ad00387069",
    issuedDate: "Dec 2024",
    skills: [],
    credentialUrl: "https://coursera.org/share/ca6e32cece9fc170783744ad00387069",
  },
  {
    id: 15,
    name: "Network Security",
    issuer: "Cisco Networking Academy",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D4D0BAQEkiQ8pB1hYow/company-logo_100_100/B4DZcSgOD1HMAU-/0/1748362125886/cisco_networking_academy1_logo?e=1769040000&v=beta&t=P2BHfMyfX0zNerG10Ji0sZMcmDLOE0n7DkZQFQg8x5I",
    credentialId: "2ccfca1309e8fb91c39512629f479d72",
    issuedDate: "Nov 2024",
    skills: [],
    credentialUrl: "https://coursera.org/share/2ccfca1309e8fb91c39512629f479d72",
  },
  {
    id: 16,
    name: "Advanced Data Structures in Java",
    issuer: "UC San Diego",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C560BAQHQYa-3EY_aaQ/company-logo_100_100/company-logo_100_100/0/1630633790917/university_of_california_at_san_diego_logo?e=1769040000&v=beta&t=aTm1gyTpNjihZqHIPN3yjAyjAbugGLvtdQwV1jHlQ-Y",
    credentialId: "58e29c5cbf54e4c28a707017557aee4e",
    issuedDate: "Nov 2024",
    skills: [],
    credentialUrl: "https://coursera.org/share/58e29c5cbf54e4c28a707017557aee4e",
  },
  {
    id: 17,
    name: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_100_100/company-logo_100_100/0/1723593046388/udemy_logo?e=1769040000&v=beta&t=8I0sc-UxQ1n-tZjCPhXuAcTkZOemZ0SeMlFsyrjy4ic",
    credentialId: "UC-2aa8c26a-ae6f-45ed-aab1-6ad460d75067",
    issuedDate: "Sep 2024",
    skills: [],
    credentialUrl: "https://www.udemy.com/certificate/UC-2aa8c26a-ae6f-45ed-aab1-6ad460d75067/",
  },
  {
    id: 18,
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQE8MivsmbT7Ig/company-logo_100_100/company-logo_100_100/0/1705561459405/hackerrank_logo?e=1769040000&v=beta&t=q99-s-_0IwfPL70YTZd6R3y9ps7lMIbV9qz4pSvzjCs",
    credentialId: "d7ac53b28c6d",
    issuedDate: "Mar 2024",
    skills: [],
    credentialUrl: "https://www.hackerrank.com/certificates/d7ac53b28c6d",
  },
  {
    id: 19,
    name: "Python (Basic)",
    issuer: "HackerRank",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D560BAQE8MivsmbT7Ig/company-logo_100_100/company-logo_100_100/0/1705561459405/hackerrank_logo?e=1769040000&v=beta&t=q99-s-_0IwfPL70YTZd6R3y9ps7lMIbV9qz4pSvzjCs",
    credentialId: "9ac4ab582b24",
    issuedDate: "Feb 2024",
    skills: [],
    credentialUrl: "https://www.hackerrank.com/certificates/9ac4ab582b24",
  },
  {
    id: 20,
    name: "Unlocking the Power of JavaScript",
    issuer: "Scaler",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4E0BAQFfKJaDYAqbkg/company-logo_100_100/company-logo_100_100/0/1644469905471?e=1769040000&v=beta&t=23IG28igWc1501cf2scQYAW-z-uBvnt1_nbLYhXMsHU",
    credentialId: "xL0t_z1HHl",
    issuedDate: "Feb 2024",
    skills: ["JavaScript"],
    credentialUrl: "https://moonshot.scaler.com/s/sl/xL0t_z1HHl",
  },
  {
    id: 21,
    name: "Master Computer Networking",
    issuer: "Scaler",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4E0BAQFfKJaDYAqbkg/company-logo_100_100/company-logo_100_100/0/1644469905471?e=1769040000&v=beta&t=23IG28igWc1501cf2scQYAW-z-uBvnt1_nbLYhXMsHU",
    credentialId: "vYBnIVS7Zb",
    issuedDate: "Nov 2023",
    skills: ["Computer Networking"],
    credentialUrl: "https://moonshot.scaler.com/s/sl/vYBnIVS7Zb",
  },
  {
    id: 23,
    name: "Namaste JavaScript",
    issuer: "NamasteDev.com",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQFd9H6cxFC3wQ/company-logo_100_100/company-logo_100_100/0/1630549313166?e=1769040000&v=beta&t=IiAGzJik0XaQVmyl45_T6J3R5bhUAQocqJornkFSvho",
    credentialId: "CQNT5A",
    issuedDate: "May 2023",
    skills: [],
    credentialUrl: "https://www.linkedin.com/in/gautamvhavle/details/certifications/1761978876804/single-media-viewer?type=DOCUMENT&profileId=ACoAAC6E1WYBWokDe2wF2sZ9e5PzyPvtjjYc45w",
  },
  {
    id: 24,
    name: "Canva Graphic Designing",
    issuer: "Canva",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGO1uzGzmVB-A/company-logo_100_100/company-logo_100_100/0/1656630679668/canva_logo?e=1769040000&v=beta&t=apWCPtfPWDObP35dqM29aYh6xO0ynQUcxqrvwV8NSGg",
    credentialId: "P6VAQ4X6XSLA",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/P6VAQ4X6XSLA",
  },
  {
    id: 25,
    name: "Command Line Basics in Linux",
    issuer: "Coursera",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1769040000&v=beta&t=_HvJK2j9WM0_FxQBSiWfQRWfcYrUXaL7MzapiU3lPkI",
    credentialId: "FP5JPU45ARVU",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/FP5JPU45ARVU",
  },
  {
    id: 26,
    name: "Docker for absolute beginners",
    issuer: "Coursera",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1769040000&v=beta&t=_HvJK2j9WM0_FxQBSiWfQRWfcYrUXaL7MzapiU3lPkI",
    credentialId: "8LT5W6SQXDNC",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/8LT5W6SQXDNC",
  },
  {
    id: 27,
    name: "Foundations of Project Management",
    issuer: "Coursera",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1769040000&v=beta&t=_HvJK2j9WM0_FxQBSiWfQRWfcYrUXaL7MzapiU3lPkI",
    credentialId: "EV43FFUHWDAA",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/EV43FFUHWDAA",
  },
  {
    id: 28,
    name: "Foundations of Project Management",
    issuer: "Google",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1769040000&v=beta&t=vsybj0Ma3o8Pbp5PWrBnp0Y11FBfIgUJnuM9MubLh2w",
    credentialId: "609f1e59c0c0e3e22c915ca54ae7ee92",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://coursera.org/share/609f1e59c0c0e3e22c915ca54ae7ee92",
  },
  {
    id: 29,
    name: "Introduction to Networks and Cisco Devices",
    issuer: "Coursera",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1769040000&v=beta&t=_HvJK2j9WM0_FxQBSiWfQRWfcYrUXaL7MzapiU3lPkI",
    credentialId: "A2VG32BHXMWK",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/A2VG32BHXMWK",
  },
  {
    id: 30,
    name: "Introduction to Relational Database and SQL",
    issuer: "Coursera",
    issuerLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1769040000&v=beta&t=_HvJK2j9WM0_FxQBSiWfQRWfcYrUXaL7MzapiU3lPkI",
    credentialId: "V7F33EVDGDKP",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/V7F33EVDGDKP",
  },
  {
    id: 31,
    name: "Technical Support Fundamentals",
    issuer: "Google",
    issuerLogo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1769040000&v=beta&t=vsybj0Ma3o8Pbp5PWrBnp0Y11FBfIgUJnuM9MubLh2w",
    credentialId: "6a870a4ee76f87d981cb9764df5a7532",
    issuedDate: "Dec 2022",
    skills: [],
    credentialUrl: "https://coursera.org/share/6a870a4ee76f87d981cb9764df5a7532",
  },
];

const INITIAL_DISPLAY_COUNT = 5;

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50"
    >
      {/* Issuer Logo */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-700/30 bg-black">
        {imgError ? (
          <span className="text-lg font-semibold text-zinc-500">
            {certificate.issuer.charAt(0)}
          </span>
        ) : (
          <img
            src={certificate.issuerLogo}
            alt={`${certificate.issuer} logo`}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <h3 className="truncate text-sm font-medium text-zinc-100 transition-colors group-hover:text-white sm:text-base">
            {certificate.name}
          </h3>
          <p className="text-xs text-zinc-400 sm:text-sm">{certificate.issuer}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {certificate.issuedDate}
          </span>
          <span className="hidden text-zinc-700 sm:inline">•</span>
          <span className="hidden items-center gap-1 sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            ID: {certificate.credentialId}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {certificate.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors group-hover:border-zinc-600/50 group-hover:text-zinc-300 sm:text-xs"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 4 && (
            <span className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-500 sm:text-xs">
              +{certificate.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* External Link Icon */}
      <div className="flex shrink-0 items-start pt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-zinc-600 transition-all group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </a>
  );
}

export default function FeaturedCertificates() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedCertificates = isExpanded
    ? certificates
    : certificates.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="w-full">
      {/* Section Header */}
      <p className="mb-4 text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
        Licenses & Certifications
      </p>

      {/* Main Card Container */}
      <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-4 backdrop-blur-lg sm:p-6">
        {/* Certificates List */}
        <div className="flex flex-col gap-3">
          {displayedCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {certificates.length > INITIAL_DISPLAY_COUNT && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-zinc-300"
          >
            <span>
              {isExpanded
                ? "Show less"
                : `Show all ${certificates.length} certifications`}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {/* Stats Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/40 pt-4">
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span>{certificates.length} Certifications</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span>
                {new Set(certificates.flatMap((c) => c.skills)).size}+ Skills
              </span>
            </span>
          </div>

          <a
            href="https://www.linkedin.com/in/gautamvhavle/details/certifications"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <span>View on LinkedIn</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}