import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const WELCOME = "Ask me anything about Arjun's experience, projects, or skills.";
const MAX_MESSAGES = 20;

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

const ChatWithMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const updated = [...conversation, userMessage].slice(-MAX_MESSAGES);

    setConversation(updated);
    setInput("");
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
        aria-label="Ask Arjun"
      >
        <FiMessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 right-0 z-50 w-full lg:w-[500px] h-full bg-gray-950 text-white shadow-2xl flex flex-col border-l border-gray-800 md:rounded-l-2xl p-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="text-lg font-semibold text-sky-400">
                Ask Arjun Anything
              </h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <FiX size={24} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto space-y-3 pr-1"
              style={{ overscrollBehavior: "contain" }}
            >
              {conversation.length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-6 px-4">
                  {WELCOME}
                </p>
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
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <strong className="text-sky-300 font-semibold">
                            {children}
                          </strong>
                        ),
                        li: ({ children }) => (
                          <li className="ml-4 list-disc">{children}</li>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                      }}
                    >
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
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-sky-600 transition-colors duration-200 disabled:opacity-60"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithMe;
