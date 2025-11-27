'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom greyish-black theme
const customCodeStyle = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: '#2d2d2d',
    color: '#e0e0e0',
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#2d2d2d',
    color: '#e0e0e0',
  },
};

export default function Mgrep() {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const renderMermaid = async () => {
      if (mermaidRef.current) {
        mermaid.initialize({ 
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        });
        
        const graphDefinition = `
graph TB
    subgraph "Local Environment"
        A[Agent Workflow] -->|Natural Language Query| B[mgrep CLI]
        B -->|File Watching| C[Filesystem Monitor]
        C -->|Detect Changes| D[File Chunker]
        D -->|512-1024 token segments| E[Chunk Processor]
    end
    
    subgraph "Cloud Service"
        E -->|HTTP/API Upload| F[Mixedbread API]
        F -->|Embedding Model| G[Vector Encoder]
        G -->|768/1536 dim vectors| H[Vector Database]
        H -->|HNSW/IVF Index| I[Similarity Search]
    end
    
    subgraph "Query Flow"
        B -->|Query String| F
        F -->|Embed Query| G
        G -->|Query Vector| I
        I -->|Top-K Results| J[Ranked Matches]
        J -->|File Path + Lines| B
        B -->|Context| A
    end
    
    subgraph "Index Management"
        K[Store Identifier] -->|Unique per Session| F
        F -->|Store Metadata| H
        L[API Key Auth] -->|Environment Variable| F
    end
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style F fill:#e8f5e9
    style G fill:#f3e5f5
    style H fill:#fff3e0
    style I fill:#e0f2f1
        `;
        
        try {
          const { svg } = await mermaid.render('mgrep-diagram', graphDefinition);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
            // Make SVG responsive
            const svgElement = mermaidRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
            }
          }
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
        }
      }
    };

    renderMermaid();
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.5, Math.min(2, prev * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(0.5); // Fully zoom out to show entire diagram
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-gray-900 font-serif px-4 sm:px-6 md:px-12 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl mb-2 font-serif" style={{fontWeight: 500, fontFamily: 'var(--font-roobert), -apple-system, BlinkMacSystemFont, sans-serif'}}>
            Giving Agents Better Eyes: Integrating Mixedbread's mgrep Into Agentic Workflows
          </h1>
          <p className="text-sm text-gray-600 font-serif" style={{fontWeight: 400, fontFamily: 'var(--font-roobert), -apple-system, BlinkMacSystemFont, sans-serif'}}>
            Aditya Prasad • November 26th, 2025
          </p>
        </div>
        
        <div className="text-lg leading-relaxed font-serif space-y-6" style={{fontWeight: 400, fontFamily: 'var(--font-roobert), -apple-system, BlinkMacSystemFont, sans-serif'}}>
          <p>
            Over the past few months, I've been building retrieval systems for agents. Earlier this week, I came across <a href="https://x.com/aaxsh18/status/1993389650677989493?s=20" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">a post about mgrep</a>, a grep-inspired tool for natural language code querying. A friend mentioned it had promise for some work he was doing, so I took on integrating it into his agentic workflow. Here's what I learned.
          </p>

          <h2 className="text-2xl sm:text-3xl mt-8 mb-4 font-serif" style={{fontWeight: 500}}>
            Architecture
          </h2>

          <p>
            mgrep uses a hybrid architecture: a local CLI client communicates with Mixedbread's cloud-hosted vector database. The CLI handles file watching, chunking, and synchronization, while the cloud service manages embedding generation, indexing, and similarity search.
          </p>

          <p>
            During indexing, the <code className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">mgrep watch</code> command monitors the filesystem for changes, chunks files into overlapping segments (typically 512-1024 tokens), and uploads these chunks to the cloud. Each chunk is embedded using a transformer model (likely a code-optimized embedding model like CodeBERT or similar) into a dense vector representation, typically 768 or 1536 dimensions. These vectors are stored in a managed vector database with inverted file indexes for fast approximate nearest neighbor search.
          </p>

          <p>
            At query time, the natural language query is embedded using the same model, producing a query vector. This vector is compared against all indexed chunks using cosine similarity or dot product. The system performs approximate nearest neighbor search (likely using HNSW or IVF indices) to retrieve the top-k most similar chunks, ranked by similarity score. Results include the source file path, line numbers, and surrounding context.
          </p>

          <p>
            The cloud-based index allows multiple agents or sessions to share the same codebase index, reducing redundant indexing. Each store (index) is identified by a unique identifier and can be scoped to specific directories or file patterns. The CLI maintains a local cache of recently queried results and handles authentication via API keys stored in environment variables.
          </p>

          <div className="my-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 italic">Interactive diagram: Scroll to zoom, drag to pan</p>
              <button
                onClick={resetView}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Reset View
              </button>
            </div>
            <div
              ref={containerRef}
              className="relative border border-gray-300 rounded-lg overflow-hidden bg-white"
              style={{ height: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                <div ref={mermaidRef} className="mermaid-diagram" style={{ minWidth: '800px' }}></div>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
                  className="w-8 h-8 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 flex items-center justify-center text-lg font-bold"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                  className="w-8 h-8 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 flex items-center justify-center text-lg font-bold"
                  aria-label="Zoom out"
                >
                  −
                </button>
              </div>
            </div>
          </div>

          <p className="text-base italic text-gray-700">
            Note: The architecture described above is based on my understanding of the system and may not reflect the exact implementation details.
          </p>

          <h2 className="text-2xl sm:text-3xl mt-8 mb-4 font-serif" style={{fontWeight: 500}}>
            Issues faced
          </h2>

          <p>
            The agent runs in an AWS Fargate sandbox. My initial approach: install mgrep in the Dockerfile, initialize with an API key from an environment variable. Simple, right? This is where things got interesting.
          </p>

          <h3 className="text-xl sm:text-2xl mt-6 mb-3 font-serif" style={{fontWeight: 500}}>
            The First Attempt: "It Should Just Work"
          </h3>

          <p>
            I installed mgrep globally via npm:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="bash" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
              npm install -g @mixedbread/mgrep
            </SyntaxHighlighter>
          </div>

          <p>
            I added it to the agent's tool definitions, wrote a handler, ran a test. Immediate failure—the agent fell back to cat. Logs showed:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="text" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
              mgrep binary not found
            </SyntaxHighlighter>
          </div>

          <p>
            It worked in my terminal, but the agent runs in a worker process without <code className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">~/.npm-global/bin</code> in its PATH.
          </p>

          <h3 className="text-xl sm:text-2xl mt-6 mb-3 font-serif" style={{fontWeight: 500}}>
            The Second Attempt: "What Do You Mean 404?"
          </h3>

          <p>
            Added the path explicitly:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`npm_global_bin = os.path.expanduser("~/.npm-global/bin")
env["PATH"] = f"{npm_global_bin}:{env.get('PATH', '')}"`}
            </SyntaxHighlighter>
          </div>

          <p>
            Now mgrep was found, but searches returned nothing. The logs showed:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="text" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
              Failed to search: 404 Stores with identifiers 'default' not found
            </SyntaxHighlighter>
          </div>

          <p>
            Here's the thing: mgrep's CLI is local, but the vector index lives in Mixedbread's cloud. You need to create that index before searching. The <code className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">mgrep watch</code> command indexes a directory and syncs to the cloud. I hadn't run it—there was no index to search.
          </p>

          <h3 className="text-xl sm:text-2xl mt-6 mb-3 font-serif" style={{fontWeight: 500}}>
            The Third Attempt: "Timing is Everything"
          </h3>

          <p>
            Added initialization:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`# Start mgrep watch to index the workspace
subprocess.Popen(["mgrep", "watch", "."])`}
            </SyntaxHighlighter>
          </div>

          <p>
            Still failing, but differently. Intermittent 404s—sometimes it worked, sometimes it didn't. The problem: race condition. I was starting mgrep watch and immediately letting the agent search, but indexing takes time. The agent was querying before the cloud index existed.
          </p>

          <p>
            mgrep outputs progress to stderr:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="text" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`⠋ Syncing files... (50/114)
⠙ Syncing files... (100/114)
✔ Initial sync complete (114/114) • uploaded 114`}
            </SyntaxHighlighter>
          </div>

          <p>
            Added a wait loop:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`watch_proc = subprocess.Popen(
    ["mgrep", "watch", "--store", store_name, "."],
    stderr=subprocess.PIPE
)
# Wait for sync to complete
for line in watch_proc.stderr:
    if "Initial sync complete" in line:
        break`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl sm:text-2xl mt-6 mb-3 font-serif" style={{fontWeight: 500}}>
            The Fourth Attempt: "Your stderr Is Not My Error"
          </h3>

          <p>
            mgrep was indexing, agents were searching. But logs were full of warnings:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="text" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
              WARNING: mgrep stderr output detected
            </SyntaxHighlighter>
          </div>

          <p>
            My handler treated any stderr output as an error. But mgrep outputs everything to stderr—progress spinners, sync status, indexing counts. These aren't errors; they're status updates.
          </p>

          <p>
            Added filtering:
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`def is_actual_error(stderr_line):
    # Ignore progress indicators and status messages
    noise_patterns = ["Syncing", "Indexing", "✔", "⠋", "⠙", "•"]
    return not any(p in stderr_line for p in noise_patterns)`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl sm:text-2xl mt-6 mb-3 font-serif" style={{fontWeight: 500}}>
            What Actually Made It Work
          </h3>

          <p>
            After all that, here's what the working integration looks like:
          </p>

          <p className="mt-4">
            <strong>1. Unique store per sandbox</strong>
          </p>
          <p className="mb-4">
            Each agent session gets its own cloud index. No cross-contamination between runs.
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`store_name = f"sandbox_{workspace_hash}_{timestamp}"`}
            </SyntaxHighlighter>
          </div>

          <p className="mt-4">
            <strong>2. Explicit PATH setup</strong>
          </p>
          <p className="mb-4">
            Don't assume the worker inherits your terminal's environment.
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`npm_global_bin = os.path.expanduser("~/.npm-global/bin")
if npm_global_bin not in env.get("PATH", ""):
    env["PATH"] = f"{npm_global_bin}:{env['PATH']}"`}
            </SyntaxHighlighter>
          </div>

          <p className="mt-4">
            <strong>3. Wait for index ready</strong>
          </p>
          <p className="mb-4">
            Start the watcher, then actively wait for the sync-complete signal.
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`for line in iter(watch_proc.stderr.readline, b''):
    if b"Initial sync complete" in line:
        break`}
            </SyntaxHighlighter>
          </div>

          <p className="mt-4">
            <strong>4. Graceful fallback</strong>
          </p>
          <p className="mb-4">
            If mgrep isn't available or fails, fall back to grep/cat. The agent should never be stuck.
          </p>

          <div className="my-4">
            <SyntaxHighlighter language="python" style={customCodeStyle} customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1rem' }}>
{`if not mgrep_available:
    return await cat_fallback(path)`}
            </SyntaxHighlighter>
          </div>

          <p className="mt-4">
            <strong>5. Filter stderr intelligently</strong>
          </p>
          <p className="mb-4">
            Progress messages aren't errors. Parse content, not stream names.
          </p>

          <h2 className="text-2xl sm:text-3xl mt-8 mb-4 font-serif" style={{fontWeight: 500}}>
            Conclusion
          </h2>

          <p>
            Integrating mgrep into agentic workflows requires understanding its hybrid architecture—the local CLI and cloud-hosted vector index don't behave like traditional command-line tools. The indexing step is asynchronous, environment setup matters, and error handling needs to account for status messages masquerading as errors.
          </p>

          <p>
            Once properly integrated, mgrep significantly improves an agent's ability to navigate codebases. Natural language queries replace brittle regex patterns, and semantic search surfaces relevant code even when exact keywords don't match. For agents operating in sandboxed environments with large codebases, this capability is transformative—they can understand context, find related functions, and retrieve documentation without manual path specification.
          </p>

          <p>
            The implementation challenges were mostly about timing, environment configuration, and parsing output correctly. The core value proposition—semantic code search as a first-class tool for agents—is solid. Early results with Claude Code using mgrep have been particularly impressive, showing substantial improvements in code navigation and context understanding compared to traditional search methods.
          </p>

          <p>
            I'm still evaluating the results for the considered experiment and haven't fully assessed the impact yet, but what I've seen so far is promising. The concept of semantic code search as a native capability for agents is compelling, and I really like the direction Mixedbread is taking with this. That said, I'd love to see more developer-friendly guides and documentation for building custom tools and integrations on top of mgrep—the current approach requires piecing together behavior from CLI output and trial-and-error, which could be streamlined with clearer integration patterns and API documentation.
          </p>
        </div>
      </article>
    </div>
  );
}
