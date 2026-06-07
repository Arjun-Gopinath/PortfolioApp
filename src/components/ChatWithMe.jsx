import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiX, FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const WELCOME = "Ask me anything about Arjun's experience, projects, or skills.";
const MAX_MESSAGES = 20;

const SUGGESTED_PROMPTS = [
  "What's his experience?",
  "What are his skills?",
  "What projects has he built?",
  "Where did he study?",
];

const TypingIndicator = () => (
  <div className="flex gap-1.5 p-3 bg-gray-800 rounded-lg w-fit">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-gray-400 block"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

const markdownComponents = {
  strong: ({ children }) => (
    <strong className="text-sky-300 font-semibold">{children}</strong>
  ),
  ul: ({ children }) => <ul className="space-y-1 my-2">{children}</ul>,
  ol: ({ children }) => (
    <ol className="space-y-1 my-2 list-decimal ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 items-start">
      <span className="text-sky-400 shrink-0 mt-0.5">•</span>
      <span>{children}</span>
    </li>
  ),
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
};

const ChatWithMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  const sendMessage = async (overrideText) => {
    const text = overrideText ?? input;
    if (!text.trim() || loading) return;

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
              "Something went wrong. Try again or refresh the conversation.",
            isError,
          },
        ].slice(-MAX_MESSAGES)
      );
    } catch {
      setConversation((prev) =>
        [
          ...prev,
          {
            role: "assistant",
            content: "Failed to reach the server. Please try again later.",
            isError: true,
          },
        ].slice(-MAX_MESSAGES)
      );
    } finally {
      setLoading(false);
    }
  };

  const panelVariants = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  const panelClass = isMobile
    ? "fixed bottom-0 left-0 right-0 z-50 h-[85dvh] bg-gray-950 text-white shadow-2xl flex flex-col rounded-t-2xl border-t border-gray-800 px-5 pt-5 pb-4"
    : "fixed bottom-0 right-0 z-50 w-[500px] h-full bg-gray-950 text-white shadow-2xl flex flex-col border-l border-gray-800 rounded-l-2xl p-6";

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Ask Arjun"
          >
            <FiMessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />
            )}

            <motion.div
              initial={panelVariants.initial}
              animate={panelVariants.animate}
              exit={panelVariants.exit}
              transition={{ type: "tween", duration: 0.3 }}
              className={panelClass}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {/* Drag handle (mobile only) */}
              {isMobile && (
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-lg font-semibold text-sky-400">
                  Ask Arjun Anything
                </h3>
                <div className="flex items-center gap-3">
                  {conversation.length > 0 && (
                    <button
                      onClick={() => setConversation([])}
                      aria-label="Clear conversation"
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200 p-1"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200 p-1"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto space-y-3 pr-1"
                style={{ overscrollBehavior: "contain" }}
              >
                {conversation.length === 0 && (
                  <div className="mt-6 px-2 space-y-4">
                    <p className="text-sm text-gray-500 text-center">
                      {WELCOME}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage(prompt)}
                          disabled={loading}
                          className="text-xs border border-white/15 hover:border-sky-500/50 hover:bg-sky-500/10 text-gray-400 hover:text-sky-300 px-3 py-2 rounded-full transition-all duration-200 disabled:opacity-40"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm p-3 rounded-lg max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-sky-700 text-white ml-auto text-right"
                        : msg.isError
                        ? "bg-red-900/60 border border-red-700/40 text-red-200"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown components={markdownComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                ))}

                {loading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="mt-4 flex gap-2 shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  placeholder="Ask about Arjun..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-sky-600 transition-colors duration-200 disabled:opacity-60"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithMe;
