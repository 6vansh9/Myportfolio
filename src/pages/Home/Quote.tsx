import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";


const quotes = [
  {
    text: "We should forget about small efficiencies, say about 97 percent of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3 percent.",
    author: "Donald Knuth"
  },
  {
    text: "There are two ways of constructing a software design: one way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.",
    author: "C.A.R. Hoare"
  },
  {
    text: "Program testing can be used to show the presence of bugs, but never to show their absence. No matter how many tests you run, you cannot logically prove correctness through testing alone.",
    author: "Edsger Dijkstra"
  },
  {
    text: "Adding manpower to a late software project makes it later. People and months are not interchangeable commodities, and coordination costs rise faster than we expect.",
    author: "Fred Brooks"
  },
  {
    text: "Controlling complexity is the essence of computer programming. The skill lies in organizing code so that each part remains understandable without needing to know every other part in detail.",
    author: "Brian Kernighan"
  },
  {
    text: "Good programmers worry about data structures and their relationships. Bad programmers worry about the code. Over time, the structure always outlives the specific implementation.",
    author: "Linus Torvalds"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Maintainability is not optional — it is part of the design.",
    author: "Martin Fowler"
  },
  {
    text: "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements. Tools help, but disciplined reasoning solves problems.",
    author: "Brian Kernighan"
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it. Reading about it is useful, but real understanding comes from building, breaking, and fixing.",
    author: "Dennis Ritchie"
  },
  {
    text: "Good code is its own best documentation. As you’re about to add a comment, ask yourself: how can I improve the code so that this comment isn’t necessary?",
    author: "Steve McConnell"
  },
  {
    text: "Simplicity is prerequisite for reliability. Systems that are too complex eventually behave in ways that even their designers cannot predict or control.",
    author: "Edsger Dijkstra"
  },
  {
    text: "A program that produces incorrect results twice as fast is infinitely slower than one that produces the correct results. Performance must always follow correctness.",
    author: "John Osterhout"
  },
  {
    text: "The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise. Abstraction clarifies thinking when it is done well.",
    author: "Edsger Dijkstra"
  },
  {
    text: "Software is hard because we build conceptual structures that are invisible and extremely flexible. This very flexibility makes it wonderfully powerful — and dangerously fragile.",
    author: "Fred Brooks"
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute. The real challenge is to make ideas clear in a form that remains executable.",
    author: "Harold Abelson"
  },
  {
    text: "A good programmer is someone who always looks both ways before crossing a one-way street. Caution in software saves enormous effort later.",
    author: "Doug Linder"
  },
  {
    text: "The trouble with the world is that the stupid are cocksure and the intelligent are full of doubt — and software engineering amplifies this effect. Doubt forces us to test, validate, and verify.",
    author: "Bertrand Russell"
  },
  {
    text: "Make it work, make it right, make it fast. In that order. Skipping the middle step is the fastest way to guarantee technical debt.",
    author: "Kent Beck"
  },
  {
    text: "The only way to go fast is to go well. Sustainable speed comes from clean code, clear design, and disciplined refactoring — not from rushing.",
    author: "Robert C. Martin"
  }
];

export default function Quote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div className="font-inter relative p-4 sm:p-6 rounded-xl bg-zinc-900/25 backdrop-blur-lg border border-zinc-800/50 shadow-[0_4px_32px_0_rgba(24,24,27,0.25)] overflow-hidden transition-all duration-300 group">
      {/* Animated modern reflection */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
        <div
          className="absolute left-0 top-0 w-2/3 h-1/3 rounded-t-full bg-gradient-to-br from-white/60 via-white/10 to-transparent blur-lg animate-card-reflection"
          style={{
            filter: "blur(6px)",
            opacity: 0.18,
          }}
        />
      </div>
      <div className="relative flex flex-col md:flex-row md:items-center gap-6 z-20">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <FaQuoteRight size={40} color="#A3A3A3"/>

            <div>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-2">{quote.text}</p>

              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm text-zinc-500">- {quote.author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}