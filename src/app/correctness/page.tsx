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
          <p>This was significantly harder than I expected.</p>
          <p>
            At that scale, you can’t just feed everything into a model and hope it works. Chunking
            and retrieval become unavoidable, but the bigger issue is precision. The work demanded
            exactness. There was no room for error. Naive approaches failed in predictable ways:
            partial extractions, duplicated or overwritten sections, tables losing structure, and the
            model confidently filling in gaps it shouldn’t. Once that starts happening, small errors
            compound quickly.
          </p>
          <p>
            Prompt refinement only gets you so far. Tiny wording changes introduce real variance,
            and that variance becomes a liability when correctness actually matters. Leaving core
            logic up to model entropy didn’t sit right with me, so I ended up moving toward systems
            that are as deterministic as possible while still preserving the simplicity of letting a
            model automate the task end to end.
          </p>
          <p>
            One thing that took me a while to learn is that observability is non-negotiable. I don’t
            enjoy reading long traces, but once you can actually see how an agent is stepping through
            a task, where it hesitates, and where it goes off the rails, the problem becomes much
            clearer. Final outputs tell you what failed. Traces tell you why.
          </p>
          <p>
            Another thing that mattered more than I expected was the harness. The tools you give an
            agent effectively cap what it’s capable of doing. A good harness doesn’t just help the
            model succeed, it removes entire classes of failure. In hindsight, the best agents don’t
            reason more. They reason less. The more structure you push into the system around the
            model, the less judgment the model actually needs to exercise.
          </p>
          <p>
            This becomes especially important with large-scale document processing. Wherever
            possible, you want determinism. If information can be extracted once and stored in a
            concrete structure, the model shouldn’t have to reason about it again. At that point
            it’s just emitting data that regular code could print as well. Long-context models don’t
            really solve this problem. They mostly just delay it. Attention still gets diluted and
            entropy still leaks in.
          </p>
          <p>
            What finally started to work for me was treating the model as a narrow extractor and
            pushing structure into the surrounding system. The goal wasn’t to get a clever answer,
            it was to get the same answer every time. So I made the model emit a deterministic
            intermediate map and forced all later steps to consume that map instead of freeform text.
            That shift sounds small, but it changed everything downstream.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`# control_id -> sub_objective -> record
control_map = {}

# record shape (informal)
# {
#   objective: str
#   activity: str
#   tests: [str]
#   exceptions: [str]
#   citations: [...]
# }

for chunk in retrieved_chunks:
    extracted_items = model.extract_structured(chunk.text)

    for item in extracted_items:
        control_map[item.control_id][item.sub_objective] = {
            "objective": item.objective,
            "activity": item.activity,
            "tests": item.tests,
            "exceptions": item.exceptions,
            "citations": item.citations
        }
`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">Deterministic intermediate structure.</p>
          <p>
            Once I had a stable structure, the next step was to be ruthless about correctness. This
            is where I stopped trusting the final output and started verifying the intermediate
            record itself. The checks are intentionally boring: duplicates, missing activity,
            missing citations, and obvious OCR noise. But the boredom is the point. This is the part
            of the pipeline that should never surprise you.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`def verify(control_map):
    seen = set()

    for control_id, subs in control_map.items():
        for sub_obj, rec in subs.items():

            key = (control_id, sub_obj)
            if key in seen:
                error("duplicate control")
            seen.add(key)

            if rec.activity is empty:
                error("missing activity")

            if rec.citations is empty:
                error("missing provenance")

            if looks_like_ocr_garbage(rec.activity):
                error("bad extraction")`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">
            Verification pass (where correctness is enforced).
          </p>
          <p>
            After that, rendering becomes a mechanical translation step. No judgments, no recovery,
            no retries. It just walks the map in a fixed order and prints rows. That’s the whole
            point: the model does the narrow extraction once, the verifier locks it down, and the
            renderer stays intentionally boring so it never becomes a source of new errors.
          </p>
          <div className="my-6">
            <SyntaxHighlighter
              language="python"
              style={customCodeStyle}
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}
            >
{`def render_rows(control_map):
    rows = []

    for control_id in sorted(control_map):
        for sub_obj in sorted(control_map[control_id]):
            rec = control_map[control_id][sub_obj]

            rows.append([
                control_id,
                sub_obj,
                rec.objective,
                rec.activity,
                join_lines(rec.tests),
                join_lines(rec.exceptions),
                format_citations(rec.citations)
            ])

    return rows`}
            </SyntaxHighlighter>
          </div>
          <p className="text-base text-gray-500">Rendering step (intentionally boring).</p>
          <p>
            The main takeaway for me was this: agents don’t usually fail because they can’t reason.
            They fail because we ask them to reason about things they shouldn’t have to. Reduce the
            need for constant memory, reduce context flooding, and the outputs get more stable.
          </p>
          <p>
            What this work really surfaced for me is how wide this space actually is. Every time I
            felt like I understood one corner of it, another set of tradeoffs showed up. It’s hard
            not to feel early here, in the best way. I’ve found myself increasingly drawn toward
            modern research in this area, not because I think I have answers, but because the
            learning curve itself is exciting. The next few months feel less like execution and more
            like exploration, and that’s something I’m genuinely looking forward to.
          </p>
        </div>
      </article>
    </div>
  );
}
