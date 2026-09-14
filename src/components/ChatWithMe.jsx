import { useState, useRef, useEffect } from "react";
import { FaTerminal, FaTrash, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const WELCOME =
  "AI Assistant initialized. Ask me anything regarding Arjun's experience, projects, or skill stack.";
const MAX_MESSAGES = 20;

const SUGGESTED_PROMPTS = [
  "What's his experience?",
  "What are his skills?",
  "What projects has he built?",
  "Where did he study?",
];

const markdownComponents = {
  strong: ({ children }) => (
    <strong className="text-[#58a6ff] font-semibold">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1 my-1 pl-4 border-l border-[#30363d]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1 my-1 list-decimal pl-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-1.5 items-start">
      <span className="text-[#3fb950] shrink-0 font-mono">›</span>
      <span>{children}</span>
    </li>
  ),
  p: ({ children }) => (
    <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>
  ),
  code: ({ children }) => (
    <code className="bg-[#161b22] px-1.5 py-0.5 rounded border border-[#30363d] text-emerald-400 font-mono text-[11px]">
      {children}
    </code>
  ),
};

const ChatWithMe = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  const sendMessage = async (overrideText) => {
    const text = overrideText ?? input;
    if (!text.trim() || loading) return;

    if (text.trim().toLowerCase() === "clear") {
      setConversation([]);
      setInput("");
      return;
    }

    const userMessage = { role: "user", content: text.trim() };
    const updated = [...conversation, userMessage].slice(-MAX_MESSAGES);

    setConversation(updated);
    if (!overrideText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.slice(-10) }),
      });

      const data = await res.json();
      const isError = !res.ok || !data.reply;

      setConversation((prev) =>
        [
          ...prev,
          {
            role: "assistant",
            content:
              data.reply ||
              "Command error: failed to resolve query. Try again.",
            isError,
          },
        ].slice(-MAX_MESSAGES),
      );
    } catch {
      setConversation((prev) =>
        [
          ...prev,
          {
            role: "assistant",
            content: "Network error: Connection to AI daemon failed.",
            isError: true,
          },
        ].slice(-MAX_MESSAGES),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="font-mono text-gray-200 space-y-4">
      {/* Terminal Subshell Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaTerminal className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">
            bot-session --interactive
          </span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/services/assistant
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
            daemon: online
          </span>
          {conversation.length > 0 && (
            <button
              type="button"
              onClick={() => setConversation([])}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Reset terminal session (or type 'clear')"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen & Message Feed */}
      <div className="border border-[#30363d] bg-[#0d1117] rounded-lg p-4 sm:p-5 flex flex-col h-[520px] justify-between">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
          {/* Default banner if conversation is empty */}
          {conversation.length === 0 && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-300">
                <span className="text-[#3fb950] font-bold">INFO: </span>
                <span>{WELCOME}</span>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                  // Suggested Queries (Click to execute)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={loading}
                      className="text-xs font-mono bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] text-gray-300 hover:text-white px-2.5 py-1.5 rounded transition-colors disabled:opacity-40"
                    >
                      $ {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation history */}
          {conversation.map((msg, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                {msg.role === "user" ? (
                  <>
                    <span className="text-[#3fb950] font-bold">
                      guest@terminal
                    </span>
                    <span className="text-gray-600">:~$</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#58a6ff] font-bold">assistant</span>
                    <span className="text-gray-600">:&gt;</span>
                  </>
                )}
              </div>

              <div
                className={`pl-4 border-l-2 py-0.5 ${
                  msg.role === "user"
                    ? "border-[#3fb950]/50 text-gray-200"
                    : msg.isError
                      ? "border-red-500/50 text-red-300 bg-red-950/20 p-2 rounded"
                      : "border-[#58a6ff]/50 text-gray-300"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown components={markdownComponents}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {/* Assistant Loading Output */}
          {loading && (
            <div className="space-y-1 text-xs pl-4 border-l-2 border-[#58a6ff]/50">
              <span className="text-gray-500 animate-pulse">
                [processing query...]
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="pt-3 mt-3 border-t border-[#30363d] flex items-center gap-2"
        >
          <span className="text-[#3fb950] font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a query or 'clear'..."
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-gray-200 placeholder-gray-600"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-xs bg-[#21262d] hover:bg-[#30363d] text-gray-200 px-3 py-1.5 rounded border border-[#30363d] transition-colors disabled:opacity-40 flex items-center gap-1.5"
          >
            <span>Run</span>
            <FaPaperPlane className="text-[10px]" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatWithMe;
