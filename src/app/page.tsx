"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  "Sketch a launch plan for a side project.",
  "Give me a creative icebreaker for a remote stand-up.",
  "How can I turn a vague idea into a roadmap?",
  "Rewrite my pitch to feel more human and bold.",
];

const responseLibrary: { matcher: RegExp; response: string }[] = [
  {
    matcher: /plan|roadmap|launch/i,
    response:
      "Start by framing the intention, then stack milestones that unlock the next question. Anchor each milestone to an outcome you can celebrate.",
  },
  {
    matcher: /icebreaker|remote|team/i,
    response:
      "Try a 60-second gallery: everyone drops a single photo or emoji that matches their energy. It warms the room and sparks stories instantly.",
  },
  {
    matcher: /pitch|rewrite|copy/i,
    response:
      "Lead with the tension you dissolve, then offer a crisp promise. Keep verbs active, sentences short, and finish with an invitation instead of a plea.",
  },
  {
    matcher: /idea|creative|spark/i,
    response:
      "Collect fragments that already excite you, group them by the feeling they create, and explore the overlap. Momentum lives where curiosity repeats.",
  },
];

const defaultAssistantReply =
  "I remix patterns, surface momentum, and keep the vibe intentional. Lean into the question—I'll meet you with a nudge forward.";

function generateAssistantReply(input: string): string {
  const match = responseLibrary.find(({ matcher }) => matcher.test(input));
  if (match) {
    return match.response;
  }
  return defaultAssistantReply;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there—this studio is tuned for rapid experiments and narrative polish. Toss me a thought and I'll shape the next beat.",
    },
  ]);

  const features = useMemo(
    () => [
      {
        title: "Narrative Engine",
        body: "Distill fuzzy concepts into crisp story beats ready for slides, sales, or stand-ups.",
      },
      {
        title: "Velocity Compass",
        body: "Surface the next most meaningful action so progress never feels aimless or loud.",
      },
      {
        title: "Signal Amplifier",
        body: "Reframe insights into artifacts—threads, briefs, or docs—without losing the original spark.",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        title: "Capture the vibe",
        detail:
          "Drop problem statements, stray notes, or random inspo. The studio maps the underlying pattern.",
      },
      {
        title: "Shape momentum",
        detail:
          "Translate raw sparks into moves—roadmaps, pitches, messaging, and visual anchors.",
      },
      {
        title: "Ship with rhythm",
        detail:
          "Share polished deliverables or keep iterating with async loops that stay human and high-signal.",
      },
    ],
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setHistory((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "assistant", content: generateAssistantReply(trimmed) },
    ]);
    setInput("");
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Autonomous Studio</div>
        <h1>
          Hi, I&apos;m your agentic teammate — ready to sculpt ideas into launch-ready
          stories.
        </h1>
        <p>
          This playground mixes strategy, narrative, and design hints with a steady AI
          pulse. Drop a thought and watch it accelerate toward something shareable.
        </p>
        <div className="hero-actions">
          <button
            className="primary"
            onClick={() => handleQuickPrompt("Give me a bold launch headline.")}
          >
            Spark a Prompt
          </button>
          <button
            className="secondary"
            onClick={() =>
              handleQuickPrompt("Outline a 3-step plan to introduce my product.")
            }
          >
            Outline a Plan
          </button>
        </div>
      </section>

      <section className="studio">
        <div className="studio-card">
          <header>
            <h2>Creative Console</h2>
            <span>Live sandbox · zero friction</span>
          </header>

          <div className="history">
            {history.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`bubble ${message.role}`}
              >
                <span className="role">{message.role === "user" ? "You" : "Agentic"}</span>
                <p>{message.content}</p>
              </article>
            ))}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tell me what you need to move forward..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>

          <div className="prompt-cloud">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why this flow hits different</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline">
        <h2>Loop in three intentional beats</h2>
        <div className="timeline-grid">
          {timeline.map((step) => (
            <div key={step.title} className="timeline-step">
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>
          Crafted autonomously · Deploy-ready · Bring your idea, leave with momentum.
        </p>
      </footer>

      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          gap: 120px;
          padding: 72px 8vw 120px;
          background: radial-gradient(circle at 15% 20%, rgba(80, 110, 255, 0.2), transparent 45%),
            radial-gradient(circle at 80% 0%, rgba(255, 99, 172, 0.18), transparent 55%),
            var(--page-bg, transparent);
        }

        @media (max-width: 900px) {
          .page {
            gap: 80px;
            padding: 48px 6vw 96px;
          }
        }

        .hero {
          max-width: 960px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(15, 20, 40, 0.65);
          font-size: 14px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        h1 {
          margin: 28px 0 20px;
          font-size: clamp(2.8rem, 5vw, 3.8rem);
          line-height: 1.1;
        }

        p {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.65;
          color: rgba(237, 239, 253, 0.78);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 36px;
        }

        .hero-actions button {
          cursor: pointer;
          padding: 14px 24px;
          border-radius: 14px;
          border: 1px solid transparent;
          font-size: 1rem;
          transition: transform 180ms ease, box-shadow 180ms ease, border 180ms ease;
          background: rgba(26, 32, 58, 0.7);
          color: inherit;
        }

        .hero-actions button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 21, 40, 0.4);
        }

        .primary {
          background: linear-gradient(135deg, #596bff 0%, #7b53ff 100%);
        }

        .secondary {
          border-color: rgba(255, 255, 255, 0.18);
        }

        .studio {
          display: flex;
          justify-content: center;
        }

        .studio-card {
          width: min(720px, 100%);
          padding: 32px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(8, 10, 20, 0.8);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          gap: 28px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .studio-card header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        }

        .studio-card header span {
          font-size: 0.95rem;
          color: rgba(237, 239, 253, 0.55);
        }

        .history {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-height: 340px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .history::-webkit-scrollbar {
          width: 6px;
        }

        .history::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
        }

        .bubble {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 18px 20px;
          border-radius: 18px;
          background: rgba(27, 32, 55, 0.75);
        }

        .bubble.user {
          align-self: flex-end;
          background: rgba(103, 109, 255, 0.7);
        }

        .role {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        .composer {
          display: flex;
          gap: 14px;
          padding: 10px;
          border-radius: 16px;
          background: rgba(12, 16, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .composer input {
          flex: 1;
          background: transparent;
          border: none;
          color: inherit;
          font-size: 1rem;
        }

        .composer input:focus {
          outline: none;
        }

        .composer button {
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #ff6aa2 0%, #ff9a58 100%);
          color: #0b0c16;
          font-weight: 600;
        }

        .prompt-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .prompt-cloud button {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(18, 22, 38, 0.7);
          color: rgba(237, 239, 253, 0.9);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .prompt-cloud button:hover {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 16, 30, 0.8);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-card h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .feature-card p {
          font-size: 1rem;
          color: rgba(237, 239, 253, 0.74);
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .timeline-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .timeline-step {
          padding: 24px;
          border-radius: 18px;
          background: rgba(12, 16, 28, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .timeline-step::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(96, 117, 255, 0.4), rgba(255, 143, 103, 0.4));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .timeline-step h3 {
          margin-top: 0;
          font-size: 1.1rem;
        }

        .timeline-step p {
          font-size: 0.98rem;
          color: rgba(237, 239, 253, 0.7);
        }

        .footer {
          text-align: center;
          color: rgba(237, 239, 253, 0.6);
          font-size: 0.95rem;
        }
      `}</style>
    </main>
  );
}
