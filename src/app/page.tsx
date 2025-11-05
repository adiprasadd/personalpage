'use client';
import { useEffect, useState } from "react";

export default function Home() {
  // Typing animation for name
  const fullName = "aditya ";
  const shortName = "adi";
  const [displayName, setDisplayName] = useState(fullName);
  
  // Tab state for Work/Projects/Candid
  const [activeTab, setActiveTab] = useState<'work' | 'projects' | 'candid'>('work');

  useEffect(() => {
    if (displayName === shortName) return;
    if (displayName.length > shortName.length) {
      const timeout = setTimeout(() => {
        setDisplayName((prev) => prev.slice(0, -1));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [displayName]);

  const experiences = [
    {
      key: 'shopify',
      company: 'Shopify',
      url: 'https://www.shopify.com/ca',
      date: '2025',
      role: 'Machine Learning Engineering Intern',
      location: 'Toronto, Ontario, Canada',
      bullet: 'applied research on foundation models for recommendations'
    },
    {
      key: 'ardent',
      company: 'Ardent AI',
      url: 'https://tryardent.com/',
      date: '2025',
      role: 'Member of Technical Staff',
      location: 'San Francisco, California, USA',
      bullet: 'context engineering and retrieval optimization for data engineering agents'
    },
    {
      key: 'serve',
      company: 'Serve Robotics',
      url: 'https://www.serverobotics.com/',
      date: '2025',
      role: 'Software Engineering Intern',
      location: 'San Francisco, California, USA',
      bullet: 'incubated to build a market intelligence data layer powering competitive insights for startups'
    },
    {
      key: 'watolink',
      company: 'WATOLINK',
      url: 'https://www.watolink.ca/',
      date: '2025',
      role: 'Machine Learning Engineer',
      location: 'Waterloo, Ontario, Canada',
      bullet: 'building real-time EEG transcription systems for brain-computer interfaces'
    },
    {
      key: 'preamble',
      company: 'Preamble AI',
      url: 'https://www.preamble.com/',
      date: '2024',
      role: 'AI Engineering Intern',
      location: 'Pittsburgh, Pennsylvania, USA',
      bullet: 'developing enterprise AI integration prototypes and AI safety research'
    }
  ];

  const projects: Array<{
    key: string;
    company?: string;
    title?: string;
    url?: string;
    date: string;
    role?: string;
    location?: string;
    bullet?: string;
  }> = [
    {
      key: 'lavoe',
      title: 'Lavoe',
      url: 'https://trylavoe.com/',
      date: '2025',
      bullet: 'Built an agentic DAW to democratize audio engineering through parallelized, AI-driven audio processing. Won 1st place at Hack The North 2025 (Best use of AI agents — $10K) and 3rd Windsurf track'
    },
    {
      key: 'embereye',
      title: 'EmberEye',
      url: 'https://ember-eye.vercel.app/',
      date: '2025',
      bullet: 'AI-powered platform for wildfire monitoring and prediction, integrating satellite and weather data to forecast fire spread and climate impact'
    },
    {
      key: 'dealydigests',
      title: 'DealyDigests',
      url: 'https://github.com/pravinl23/DealyDigests',
      date: '2025',
      bullet: 'Personal finance web app that recommends the best credit card for purchases based on location and merchant data. 1st place finance track & 1st place knot track at HackPrinceton'
    },
    {
      key: 'forg3d',
      title: 'Forg3d',
      url: 'https://github.com/adiprasadd/forg3D',
      date: '2025',
      bullet: 'A decentralized 3D model marketplace with interactive rendering and secure metadata management. 3rd place at TartanHacks 2025'
    },
    {
      key: 'feedforward',
      title: 'Feedforward Neural Network in C++',
      url: 'https://github.com/adiprasadd/feedforwardNN',
      date: '2025',
      bullet: 'Implemented a neural network in C++ to solve the XOR problem, achieving high accuracy with custom training logic'
    },
    {
      key: 'robotic-arm',
      title: 'Robotic Exoskeleton Arm',
      date: '2024',
      bullet: 'Designed and programmed a robotic hand for precise object manipulation and ASL sign demonstration'
    }
  ];

  const candid: Array<{
    key: string;
    company?: string;
    title?: string;
    url?: string;
    date: string;
    role?: string;
    location?: string;
    bullet?: string;
  }> = [
    {
      key: 'a16z-dinner',
      title: 'hosted an a16z speedrun dinner',
      url: 'https://x.com/adiprasadd/status/1971808424640864755',
      date: '2025',
      bullet: 'showed the largest vc firm the talent density in waterloo'
    },
    {
      key: 'admissions',
      title: 'opinions on canadian vs. american university admissions',
      url: 'https://x.com/adiprasadd/status/1970255440652181761',
      date: '2025',
      bullet: 'was thinking about undergrad apps and came to a general realization i wanted to share'
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'work':
        return experiences;
      case 'projects':
        return projects;
      case 'candid':
        return candid;
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen text-foreground flex flex-col items-center px-4 sm:px-6 md:pl-40 md:pr-6 py-8 sm:py-12 font-serif transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="w-full max-w-2xl mx-auto flex flex-col items-start mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 flex flex-wrap items-center gap-2 font-serif" style={{fontWeight: 700, fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>
          hey, i'm{' '}
          <button
            onClick={() => setDisplayName(fullName)}
            className="transition-all duration-300 text-foreground bg-transparent border-none p-0 m-0 cursor-pointer hover:underline focus:outline-none"
            style={{fontWeight: 700, fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'inherit'}}
            aria-label="Replay name animation"
            type="button"
          >
            {displayName}
          </button>
          {' '}prasad!
        </h1>
      </section>

      {/* Work/Projects/Blogs Section */}
      <section className="w-full max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('work')}
            className={`text-xl sm:text-2xl font-serif transition-all duration-300 ${
              activeTab === 'work' 
                ? 'text-foreground opacity-100' 
                : 'text-muted-foreground opacity-50 hover:opacity-70'
            }`}
            style={{fontWeight: activeTab === 'work' ? 700 : 400}}
          >
            Work
          </button>
          <span className="text-muted-foreground">/</span>
          <button
            onClick={() => setActiveTab('projects')}
            className={`text-xl sm:text-2xl font-serif transition-all duration-300 ${
              activeTab === 'projects' 
                ? 'text-foreground opacity-100' 
                : 'text-muted-foreground opacity-50 hover:opacity-70'
            }`}
            style={{fontWeight: activeTab === 'projects' ? 700 : 400}}
          >
            Projects
          </button>
          <span className="text-muted-foreground">/</span>
          <button
            onClick={() => setActiveTab('candid')}
            className={`text-xl sm:text-2xl font-serif transition-all duration-300 ${
              activeTab === 'candid' 
                ? 'text-foreground opacity-100' 
                : 'text-muted-foreground opacity-50 hover:opacity-70'
            }`}
            style={{fontWeight: activeTab === 'candid' ? 700 : 400}}
          >
            Candid
          </button>
        </div>
        <div className="flex flex-col font-serif">
          <div key={activeTab} className="animate-fadeIn flex flex-col">
            {getCurrentData().map((item: any, index: number) => (
            <div key={item.key} className={`flex flex-col ${index < getCurrentData().length - 1 ? 'mb-6' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-foreground font-serif hover:opacity-70 transition-opacity" style={{fontWeight: 500}}>
                    {item.company || item.title}
                  </a>
                ) : (
                  <span className="text-foreground font-serif" style={{fontWeight: 500}}>
                    {item.company || item.title}
                  </span>
                )}
                <span className="text-muted-foreground text-sm font-serif" style={{fontWeight: 400}}>{item.date}</span>
              </div>
              {(item.role || item.location) && (
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  {item.role && (
                    <span className="text-foreground font-serif text-sm" style={{fontWeight: 500}}>{item.role}</span>
                  )}
                  {item.location && (
                    <span className="text-muted-foreground text-sm font-serif" style={{fontWeight: 400}}>{item.location}</span>
                  )}
                </div>
              )}
              {item.bullet && (
                <p className="text-muted-foreground text-sm font-serif flex items-start" style={{fontWeight: 400}}>
                  <span className="mr-2">•</span>
                  <span>{item.bullet}</span>
                </p>
              )}
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-2xl mx-auto mt-9 mb-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm font-serif" style={{fontWeight: 400}}>
            aditya [dot] prasad [at] uwaterloo [dot] ca
          </p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a href="https://github.com/adiprasadd" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-70 transition-opacity">
              <span className="font-serif text-sm" style={{fontWeight: 500}}>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/adiprasadd" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-70 transition-opacity">
              <span className="font-serif text-sm" style={{fontWeight: 500}}>LinkedIn</span>
            </a>
            <a href="https://twitter.com/adiprasadd" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-70 transition-opacity">
              <span className="font-serif text-sm" style={{fontWeight: 500}}>X</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}