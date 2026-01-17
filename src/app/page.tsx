'use client';

import { useState } from 'react';

type Tab = 'home' | 'work' | 'projects' | 'writing';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="nav">
        <span 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </span>
        <span 
          className={`nav-item ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          Work
        </span>
        <span 
          className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </span>
        <span 
          className={`nav-item ${activeTab === 'writing' ? 'active' : ''}`}
          onClick={() => setActiveTab('writing')}
        >
          Writing
        </span>
      </nav>

      {/* Name */}
      <h1 className="title">Aditya Prasad</h1>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div className="content">
          <p>
            I'm a <a href="https://se-webring.xyz/" target="_blank" rel="noopener noreferrer">Software Engineering</a> student at the <strong>University of Waterloo</strong> interested in agents, LLM inference, and post-training.
          </p>
          <p>
            At this point, I'm optimizing for learning and depth of understanding. I see the late teens and early twenties as a formative window that can strongly shape the trajectory of the rest of one's life. Because of that, I'm focused on gaining clarity around where I truly want to end up, and building the foundation to support that along the way.
          </p>
          <p>
            Currently, I'm at <a href="https://www.andera.ai" target="_blank" rel="noopener noreferrer">Andera</a> as a Research Engineering Intern in SF, building agents for SOX testing, compliance, and audit under some of the best mentorship I could ask for.
          </p>

          <section style={{ marginTop: '32px' }}>
            <h2 className="section-header">Say Hi!</h2>
            <ul>
              <li><a href="https://twitter.com/adiprasadd" target="_blank" rel="noopener noreferrer">X</a></li>
              <li><a href="https://github.com/adiprasadd" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/adiprasadd" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:aditya.prasad@uwaterloo.ca">Email</a></li>
            </ul>
          </section>
        </div>
      )}

      {/* WORK TAB */}
      {activeTab === 'work' && (
        <div className="content">
          <p><strong>Experience:</strong></p>
          <ul>
            <li>
              <a href="https://www.andera.ai" target="_blank" rel="noopener noreferrer"><strong>Andera</strong></a> (2026)
              <br />
              <span className="muted">Research Engineering Intern — Building agents for SOX testing, compliance, and audit.</span>
            </li>
            <li>
              <a href="https://www.shopify.com/ca" target="_blank" rel="noopener noreferrer"><strong>Shopify</strong></a> (2025)
              <br />
              <span className="muted">ML Engineering Intern — Applied research on foundation models for recommendations.</span>
            </li>
            <li>
              <a href="https://tryardent.com/" target="_blank" rel="noopener noreferrer"><strong>Ardent AI</strong></a> (2025)
              <br />
              <span className="muted">Member of Technical Staff — Context engineering and retrieval optimization for data engineering agents.</span>
            </li>
            <li>
              <a href="https://www.serverobotics.com/" target="_blank" rel="noopener noreferrer"><strong>Serve Robotics</strong></a> (2025)
              <br />
              <span className="muted">Software Engineering Intern — Built a market intelligence data layer powering competitive insights.</span>
            </li>
            <li>
              <a href="https://www.watolink.ca/" target="_blank" rel="noopener noreferrer"><strong>WATOLINK</strong></a> (2025)
              <br />
              <span className="muted">ML Engineer — Building real-time EEG transcription systems for brain-computer interfaces.</span>
            </li>
            <li>
              <a href="https://www.preamble.com/" target="_blank" rel="noopener noreferrer"><strong>Preamble</strong></a> (2024)
              <br />
              <span className="muted">AI Engineering Intern — Enterprise AI integration prototypes and AI safety research.</span>
            </li>
          </ul>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="content">
          <p>
            <a href="https://trylavoe.com/" target="_blank" rel="noopener noreferrer"><strong>Lavoe</strong></a>
            <br />
            <span className="muted">
              Agentic DAW to democratize audio engineering through parallelized, AI-driven audio processing. 
              Won 1st place at Hack The North 2025 (Best use of AI agents — $10K) and 3rd Windsurf track.
            </span>
          </p>

          <p>
            <a href="https://ember-eye.vercel.app/" target="_blank" rel="noopener noreferrer"><strong>EmberEye</strong></a>
            <br />
            <span className="muted">
              AI-powered platform for wildfire monitoring and prediction, integrating satellite and weather data 
              to forecast fire spread and climate impact.
            </span>
          </p>

          <p>
            <a href="https://github.com/pravinl23/DealyDigests" target="_blank" rel="noopener noreferrer"><strong>DealyDigests</strong></a>
            <br />
            <span className="muted">
              Personal finance web app that recommends the best credit card for purchases based on location and merchant data. 
              1st place finance track & 1st place knot track at HackPrinceton.
            </span>
          </p>

          <p>
            <a href="https://github.com/adiprasadd/forg3D" target="_blank" rel="noopener noreferrer"><strong>Forg3d</strong></a>
            <br />
            <span className="muted">
              Decentralized 3D model marketplace with interactive rendering and secure metadata management. 
              3rd place at TartanHacks 2025.
            </span>
          </p>

          <p>
            <a href="https://github.com/adiprasadd/feedforwardNN" target="_blank" rel="noopener noreferrer"><strong>Feedforward Neural Network in C++</strong></a>
            <br />
            <span className="muted">
              Implemented a neural network from scratch to solve the XOR problem with custom training logic.
            </span>
          </p>
        </div>
      )}

      {/* WRITING TAB */}
      {activeTab === 'writing' && (
        <div className="content">
          <p>
            <a href="/mgrep"><strong>Building with mgrep</strong></a>
            <br />
            <span className="muted">
              Thoughts on integrating Mixedbread AI's semantic code search tool into agentic workflows.
            </span>
          </p>

          <p>
            <a href="https://x.com/adiprasadd/status/1971808424640864755" target="_blank" rel="noopener noreferrer">
              <strong>Hosted an a16z speedrun dinner</strong>
            </a>
            <br />
            <span className="muted">
              Showed the largest VC firm the talent density in Waterloo.
            </span>
          </p>

          <p>
            <a href="https://x.com/adiprasadd/status/1970255440652181761" target="_blank" rel="noopener noreferrer">
              <strong>Opinions on Canadian vs. American university admissions</strong>
            </a>
            <br />
            <span className="muted">
              Thoughts on undergrad applications and a general realization I wanted to share.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
