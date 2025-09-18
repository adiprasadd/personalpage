'use client';
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  // Typing animation for name
  const fullName = "aditya";
  const shortName = "adi";
  const [displayName, setDisplayName] = useState(fullName);

  // Experience expand/collapse state
  const [openExp, setOpenExp] = useState<string | null>(null);

  const experiences = [
    {
      key: 'shopify',
      title: 'software engineering intern @ shopify',
      date: '(incoming fall 2025, toronto, on)',
      summary: 'building the future of e-commerce, and making it easier for businesses to scale.',
      details: [
        'not sure yet what i will be working on, but stay tuned!'
      ]
    },
    {
      key: 'mosaic',
      title: 'cto & cofounder @ mosaic',
      date: '(apr 2025 – present, san francisco, ca)',
      summary: 'mosaic is a competitive intelligence platform that uses real-time linkedin data to uncover strategic insights about companies—tracking hiring trends, talent movement, and organizational shifts to help businesses stay ahead of their competitors.',
      details: [
        'leading product and technical direction as cto and cofounder.',
        'building tools for real-time analysis of linkedin data.',
        'enabling businesses to track hiring, talent movement, and org changes.',
        'join our waitlist at: usemosaic.vercel.app'
      ]
    },
    {
      key: 'watolink',
      title: 'machine learning engineer @ watolink',
      date: '(jan 2025 – present, waterloo, on)',
      summary: 'researching neural networks and brain-computer interfaces, focusing on real-time eeg transcription for assistive tech like mind-controlled wheelchairs and drones.',
      details: [
        'analyzed scientific publications on neural networks and bcis.',
        'evaluated advanced eeg decoding models for brain signal interpretation.',
        'implementing research for real-time transcription and assistive applications.'
      ]
    },
    {
      key: 'preamble',
      title: 'ai engineering intern @ preamble ai',
      date: '(aug 2024 – present, pittsburgh, pa)',
      summary: 'developing enterprise ai integration prototypes, contributing to ai safety research, and improving technical documentation and platform stability.',
      details: [
        'built enterprise ai integration prototypes to streamline workflows.',
        'researched ai safety trends and developed proof-of-concept use cases.',
        'improved platform stability and documentation for better user experience.'
      ]
    },
    {
      key: 'codeninjas',
      title: 'robotics instructor @ code ninjas',
      date: '(sep 2022 – aug 2024, brampton, on)',
      summary: 'designed and taught robotics curriculum, supported student learning, and helped grow client engagement and retention.',
      details: [
        'taught robotics and programming to 50+ students.',
        'developed custom curriculum and improved student outcomes.',
        'supported client engagement and retention through communication.'
      ]
    }
  ];

  useEffect(() => {
    if (displayName === shortName) return;
    if (displayName.length > shortName.length) {
      const timeout = setTimeout(() => {
        setDisplayName((prev) => prev.slice(0, -1));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [displayName]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-12 font-sans">
      {/* Hero Section */}
      <section className="w-full max-w-2xl flex flex-col items-center sm:items-start mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <div className="flex w-full flex-col items-center sm:items-start gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              hi, i'm
              <button
                onClick={() => setDisplayName(fullName)}
                className="transition-all duration-300 text-foreground bg-transparent border-none p-0 m-0 cursor-pointer hover:underline focus:outline-none font-bold"
                aria-label="Replay name animation"
                type="button"
                style={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'inherit' }}
              >
                {displayName}
              </button>
              prasad
              <span className="ml-2">👋</span>
            </h1>
          </div>
          <div className="sm:ml-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center border-2 border-border overflow-hidden">
              <Image 
                src="/headshot.jpg" 
                alt="adi prasad" 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <p className="text-lg mt-2 text-muted">
          <a
            href="https://se-webring.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline hover:text-foreground transition-colors"
          >
            software engineering
          </a>
          {" @ the university of waterloo"}
        </p>
      </section>

      {/* About Section */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">about</h2>
        <p className="text-muted-foreground leading-relaxed">
          currently building mosaic. i'm interested in all things relating to machine intelligence, agentic systems, and robotics. i love building, and talking so feel free to email me at: <span className="font-bold">aditya.prasad@uwaterloo.ca</span> or{' '}
          <a
            href="https://cal.com/adiprasadd"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold no-underline hover:underline hover:text-white transition-colors"
          >
            book a meeting with me
          </a>
          <br /><br />
          away from tech, i spend the majority of my time playing soccer or lifting!
        </p>
      </section>

      {/* Experience Section */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">experience</h2>
        <div className="text-muted-foreground leading-relaxed text-base flex flex-col gap-6">
          {experiences.map(exp => (
            <div key={exp.key}>
              <button
                className="w-full text-left font-semibold text-foreground flex items-center justify-between focus:outline-none hover:text-foreground transition-colors"
                onClick={() => setOpenExp(openExp === exp.key ? null : exp.key)}
                aria-expanded={openExp === exp.key}
                aria-controls={`exp-details-${exp.key}`}
              >
                <div className="font-semibold text-foreground">{exp.title} <span className="text-xs text-muted">{exp.date}</span></div>
                <span className={`ml-2 transition-transform ${openExp === exp.key ? 'rotate-90' : ''}`}>▶</span>
              </button>
              <div className="pl-4 mt-1">
                <div>{exp.summary}</div>
                {openExp === exp.key && (
                  <ul id={`exp-details-${exp.key}`} className="mt-2 list-disc list-inside text-sm text-muted">
                    {exp.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">projects</h2>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-foreground mt-2 mb-1">2025</h3>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">embereye</span>
              <a href="https://github.com/AumkarMali/EmberEye" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <FiExternalLink />
              </a>
            </div>
            <p className="text-muted-foreground text-sm ml-1">ai-powered platform for wildfire monitoring and prediction, integrating satellite and weather data to forecast fire spread and climate impact. built with react, tailwind, flask, and mongodb. inspired by google's firesat initiative. <a href="https://ember-eye.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">live demo</a></p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">dealydigests (1st place finance track & 1st place knot track)</span>
              <a href="https://github.com/pravinl23/DealyDigests?tab=readme-ov-file" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <FiExternalLink />
              </a>
            </div>
            <p className="text-muted-foreground text-sm ml-1"><span className="font-bold">offered $55000 to build full-scale product by knotAPI.</span> personal finance web app that recommends the best credit card for purchases based on location and merchant data. built with next.js, react, tailwind, and mongodb. features google maps integration and real-time api usage.</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">feedforward neural network</span>
            </div>
            <p className="text-muted-foreground text-sm ml-1">implemented a neural network in c++ to solve the xor problem, achieving high accuracy with custom training logic.</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">forg3d (tartanhacks 2025, 3rd place)</span>
            </div>
            <p className="text-muted-foreground text-sm ml-1">a decentralized 3d model marketplace with interactive rendering and secure metadata management, recognized at carnegie mellon's largest hackathon.</p>
          </div>
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-1">2024</h3>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">behaviewer (newhacks 2024)</span>
            </div>
            <p className="text-muted-foreground text-sm ml-1">full-stack analytics platform for customer retention, leveraging predictive models and scalable data pipelines.</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">robotic exoskeleton arm</span>
            </div>
            <p className="text-muted-foreground text-sm ml-1">designed and programmed a robotic hand for precise object manipulation and asl sign demonstration.</p>
          </div>
        </div>
      </section>

      {/* Skills Section (moved to bottom) */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">skills</h2>
        <div className="text-muted-foreground leading-relaxed text-base">
          <div className="mb-2"><span className="font-semibold text-foreground">languages:</span> python, c/c++, html/css, javascript, java, typescript, vhdl</div>
          <div className="mb-2"><span className="font-semibold text-foreground">frameworks & libraries:</span> react, next.js, three.js, pytorch, tailwind, opencv, scikit-learn, pandas, numpy, keras, yolo</div>
          <div><span className="font-semibold text-foreground">developer tools:</span> visual studio, pycharm, heroku, git, unix, huggingface, colab, autocad, solidworks, fastapi, openai api, rest apis, vercel, langchain, supabase, mongodb</div>
        </div>
      </section>

      {/* Resume View Button (below skills) */}
      <div className="w-full flex justify-center mb-12">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-lg border border-border hover:bg-muted transition-colors z-50 font-semibold text-base"
        >
          view resume
        </a>
      </div>

      {/* Footer with social links */}
      <footer className="w-full flex justify-center items-center gap-6 py-6 border-t border-border mt-8">
        <a href="https://github.com/adiprasadd" target="_blank" rel="noopener noreferrer" aria-label="github">
          <FaGithub size={28} />
        </a>
        <a href="https://linkedin.com/in/adiprasadd" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
          <FaLinkedin size={28} />
        </a>
        <a href="https://twitter.com/adiprasadd" target="_blank" rel="noopener noreferrer" aria-label="twitter">
          <FaTwitter size={28} />
        </a>
      </footer>
    </div>
  );
}