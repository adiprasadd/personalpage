'use client';

import { useState } from 'react';

type Tab = 'home' | 'work' | 'projects' | 'writing';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const navStyle = (tab: Tab) => ({
    color: activeTab === tab ? '#1a1a1a' : '#0066cc',
    marginRight: '24px',
    cursor: 'pointer',
    fontWeight: activeTab === tab ? 600 : 400,
    textDecoration: 'none',
  });

  return (
    <div style={{
      maxWidth: '650px',
      margin: '0 auto',
      padding: '40px 24px 80px',
      color: '#1a1a1a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '15px',
      lineHeight: '1.7',
    }}>
      {/* Navigation */}
      <nav style={{
        marginBottom: '40px',
        fontSize: '14px',
      }}>
        <span style={navStyle('home')} onClick={() => setActiveTab('home')}>Home</span>
        <span style={navStyle('work')} onClick={() => setActiveTab('work')}>Work</span>
        <span style={navStyle('projects')} onClick={() => setActiveTab('projects')}>Projects</span>
        <span style={navStyle('writing')} onClick={() => setActiveTab('writing')}>Writing</span>
      </nav>

      {/* Name */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '24px',
        color: '#1a1a1a',
      }}>
        Aditya Prasad
      </h1>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div>
          <p style={{ marginBottom: '16px' }}>
            I'm a <a href="https://se-webring.xyz/" target="_blank" rel="noopener noreferrer">Software Engineering</a> student at the <strong>University of Waterloo</strong> interested in agents, LLM inference, and post-training.
          </p>
          <p style={{ marginBottom: '16px' }}>
          At this point, I’m optimizing for learning and depth of understanding. I see the late teens and early twenties as a formative window that can strongly shape the trajectory 
          of the rest of one’s life. Because of that, I’m focused on gaining clarity around where I truly want to end up, and building the foundation to support that along the way.
          </p>


          <p style={{ marginBottom: '24px' }}>
            Currently, I'm at <a href="https://www.andera.ai" target="_blank" rel="noopener noreferrer">Andera</a> as 
            a Research Engineering Intern in SF, building agents for SOX testing, compliance, and audit under some of the best mentorship I could ask for.
          </p>

          <section>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#1a1a1a',
            }}>
              Say Hi!
            </h2>

            <ul style={{ 
              listStyle: 'disc', 
              paddingLeft: '20px',
            }}>
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
        <div>
          <p style={{ marginBottom: '16px' }}>
            <strong>Experience:</strong>
          </p>

          <ul style={{ 
            listStyle: 'disc', 
            paddingLeft: '20px',
            marginBottom: '16px',
          }}>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://www.andera.ai" target="_blank" rel="noopener noreferrer"><strong>Andera</strong></a> (2026)
              <br />
              <span style={{ color: '#666' }}>
                Research Engineering Intern — Building agents for SOX testing, compliance, and audit.
              </span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://www.shopify.com/ca" target="_blank" rel="noopener noreferrer"><strong>Shopify</strong></a> (2025)
              <br />
              <span style={{ color: '#666' }}>
                ML Engineering Intern — Applied research on foundation models for recommendations.
              </span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://tryardent.com/" target="_blank" rel="noopener noreferrer"><strong>Ardent AI</strong></a> (2025)
              <br />
              <span style={{ color: '#666' }}>
                Member of Technical Staff — Context engineering and retrieval optimization for data engineering agents.
              </span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://www.serverobotics.com/" target="_blank" rel="noopener noreferrer"><strong>Serve Robotics</strong></a> (2025)
              <br />
              <span style={{ color: '#666' }}>
                Software Engineering Intern — Built a market intelligence data layer powering competitive insights.
              </span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://www.watolink.ca/" target="_blank" rel="noopener noreferrer"><strong>WATOLINK</strong></a> (2025)
              <br />
              <span style={{ color: '#666' }}>
                ML Engineer — Building real-time EEG transcription systems for brain-computer interfaces.
              </span>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="https://www.preamble.com/" target="_blank" rel="noopener noreferrer"><strong>Preamble</strong></a> (2024)
              <br />
              <span style={{ color: '#666' }}>
                AI Engineering Intern — Enterprise AI integration prototypes and AI safety research.
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div>
          <p style={{ marginBottom: '16px' }}>
            <a href="https://trylavoe.com/" target="_blank" rel="noopener noreferrer"><strong>Lavoe</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              Agentic DAW to democratize audio engineering through parallelized, AI-driven audio processing. 
              Won 1st place at Hack The North 2025 (Best use of AI agents — $10K) and 3rd Windsurf track.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://ember-eye.vercel.app/" target="_blank" rel="noopener noreferrer"><strong>EmberEye</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              AI-powered platform for wildfire monitoring and prediction, integrating satellite and weather data 
              to forecast fire spread and climate impact.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://github.com/pravinl23/DealyDigests" target="_blank" rel="noopener noreferrer"><strong>DealyDigests</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              Personal finance web app that recommends the best credit card for purchases based on location and merchant data. 
              1st place finance track & 1st place knot track at HackPrinceton.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://github.com/adiprasadd/forg3D" target="_blank" rel="noopener noreferrer"><strong>Forg3d</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              Decentralized 3D model marketplace with interactive rendering and secure metadata management. 
              3rd place at TartanHacks 2025.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://github.com/adiprasadd/feedforwardNN" target="_blank" rel="noopener noreferrer"><strong>Feedforward Neural Network in C++</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              Implemented a neural network from scratch to solve the XOR problem with custom training logic.
            </span>
          </p>
        </div>
      )}

      {/* WRITING TAB */}
      {activeTab === 'writing' && (
        <div>
          <p style={{ marginBottom: '16px' }}>
            <a href="/mgrep"><strong>Building with mgrep</strong></a>
            <br />
            <span style={{ color: '#666' }}>
              Thoughts on integrating Mixedbread AI's semantic code search tool into agentic workflows.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://x.com/adiprasadd/status/1971808424640864755" target="_blank" rel="noopener noreferrer">
              <strong>Hosted an a16z speedrun dinner</strong>
            </a>
            <br />
            <span style={{ color: '#666' }}>
              Showed the largest VC firm the talent density in Waterloo.
            </span>
          </p>

          <p style={{ marginBottom: '16px' }}>
            <a href="https://x.com/adiprasadd/status/1970255440652181761" target="_blank" rel="noopener noreferrer">
              <strong>Opinions on Canadian vs. American university admissions</strong>
            </a>
            <br />
            <span style={{ color: '#666' }}>
              Thoughts on undergrad applications and a general realization I wanted to share.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
