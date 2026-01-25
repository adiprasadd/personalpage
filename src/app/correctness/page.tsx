import type { Metadata } from 'next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  'token.comment': {
    ...oneDark['token.comment'],
    color: '#f59e0b',
  },
};

export const metadata: Metadata = {
  title: 'Building Agents Where Correctness Is Critical',
  description: 'notes on building deterministic agent systems at scale',
};

export default function Correctness() {
  return (
    <div className="container">
      <article>
        <div className="mb-8">
          <h1 className="title">
            Building Agents Where Correctness is Critical
          </h1>
          <p className="muted">
            Aditya Prasad • January 23rd, 2026
          </p>
        </div>

        <div className="content">
          <p>
            Over the past few weeks, I’ve been working on systems at a much larger scale than I was
            used to, dealing with documents that run into the tens of thousands of tokens and all
            encode the same underlying information in slightly different forms.
          </p>
          <p>This was much harder than I expected.</p>
          <p>
            At that scale, you can’t just feed everything into a model and hope it works. Chunking
            and retrieval become unavoidable, but the bigger issue is precision. The work demanded
            exactness. There was no room for error. Naive approaches failed in predictable ways:
            partial extractions, duplicated or overwritten sections, tables losing structure, and the
            model confidently filling in gaps it shouldn’t. Once that starts happening, small errors
            compound quickly.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <p>
              A simple case study: take a 200-page product handbook and turn it into a structured
              internal wiki. Each section needs a heading, a short summary, a few bullet points, and
              citations back to the source pages. The model only extracts those fields; everything
              else is fixed and deterministic.
            </p>
          </div>
          <p>
            Prompt refinement only gets you so far. Tiny wording changes introduce real variance,
            and that variance becomes a liability when correctness actually matters. Leaving core
            logic up to model entropy didn’t sit right with me, so I moved toward systems that are
            as deterministic as possible while still letting the model run end to end.
          </p>
          <p>
            Observability is non-negotiable. I don’t enjoy reading long traces, but once you can see
            how an agent is stepping through a task, where it hesitates, and where it goes off the
            rails, the problem gets clearer. Final outputs tell you what failed. Traces tell you why.
          </p>
          <p>
            Another thing that mattered more than I expected was the harness. By harness, I mean the
            fixed scaffolding around the model: the schema it must emit, the validation rules, and
            the deterministic steps that come after. The tools you give an agent cap what it can do,
            and more importantly, what it can get wrong. A good harness removes entire classes of
            failure. In hindsight, the best agents don’t reason more. They reason less.
          </p>
          <p>
            Part of this has sprouted from the rise of agent skills: distill instructions into
            structured artifacts the model can reuse.
          </p>
          <p>
            Without that structure, the model breaks in ways that are hard to spot until it is too
            late: it merges two sections, drops a citation, rewrites a section with confident
            filler, or misorders rows so downstream checks pass even though the content is wrong.
            Traces make those failure points obvious. They are boring, but they are the most direct
            way I have found to improve an agent.
          </p>
          <p>
            This becomes especially important with large-scale document processing. Wherever
            possible, you want determinism. If information can be extracted once and stored in a
            concrete structure, the model shouldn’t have to reason about it again. At that point
            it’s just emitting data that regular code could print as well. Long-context models don’t
            really solve this problem. They mostly just delay it.
          </p>
          <p>
            What finally started to work for me was treating the model as a narrow extractor and
            pushing structure into the surrounding system. The goal wasn’t to get a clever answer,
            it was to get the same answer every time. So I made the model emit a deterministic
            intermediate map and forced all later steps to consume that map instead of freeform text.
          </p>
          <p>
            Concretely, that intermediate structure was written to a file inside the container the
            agent was running in, so every step read from the same persisted source of truth.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`# doc_id -> section -> record
doc_map = {}

# record shape (informal)
# {
#   heading: str
#   summary: str
#   bullets: [str]
#   tags: [str]
#   citations: [...]
# }

for chunk in retrieved_chunks:
    extracted_items = model.extract_structured(chunk.text)

    for item in extracted_items:
        doc_map[item.doc_id][item.section] = {
            "heading": item.heading,
            "summary": item.summary,
            "bullets": item.bullets,
            "tags": item.tags,
            "citations": item.citations
        }
`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">Deterministic intermediate structure.</p>
          <p>
            Once I had a stable structure, the next step was correctness. I stopped trusting the
            final output and verified the intermediate record itself. The checks are intentionally
            boring: duplicates, missing summary, missing citations, and obvious OCR noise. The
            boredom is the point — this part of the pipeline should never surprise you.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`def verify(doc_map):
    seen = set()

    for doc_id, sections in doc_map.items():
        for section, rec in sections.items():

            key = (doc_id, section)
            if key in seen:
                error("duplicate section")
            seen.add(key)

            if rec.summary is empty:
                error("missing summary")

            if rec.citations is empty:
                error("missing provenance")

            if looks_like_ocr_garbage(rec.summary):
                error("bad extraction")`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">
            Verification pass (where correctness is enforced).
          </p>
          <p>
            After that, rendering is just translation. No judgments, no recovery, no retries. It
            walks the map in a fixed order and prints rows. That’s the point: extract once, verify,
            then keep the renderer intentionally boring so it never adds new errors.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`def render_rows(doc_map):
    rows = []

    for doc_id in sorted(doc_map):
        for section in sorted(doc_map[doc_id]):
            rec = doc_map[doc_id][section]

            rows.append([
                doc_id,
                section,
                rec.heading,
                rec.summary,
                join_lines(rec.bullets),
                join_lines(rec.tags),
                format_citations(rec.citations)
            ])

    return rows`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">Rendering step (intentionally boring).</p>
          <p>
            The main takeaway for me was this: agents don’t usually fail because they can’t reason.
            They fail because we ask them to reason about things they shouldn’t have to. Reduce the
            need for constant memory, reduce context bloat, and outputs get more stable.
          </p>
          <p>
            What this work surfaced for me is how wide this space actually is. Every time I felt
            like I understood one corner of it, another set of tradeoffs showed up. It’s hard not to
            feel early here, in the best way. I’ve found myself increasingly drawn toward modern
            research in this area, not because I think I have answers, but because the learning
            curve itself is exciting. The next few months feel less like execution and more like
            exploration, and that’s something I’m genuinely looking forward to.
          </p>
          <p className="text-gray-500">
            On a side note, first time using Wispr Flow — wrote this in ~10 mins + ~15 mins for
            code snippets. Feel free to reach out and provide any feedback, happy to chat :)
          </p>
        </div>
      </article>
    </div>
  );
}
