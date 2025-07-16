import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const ChatWithMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 🔽 Auto-scroll to the bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input.trim() };
    const newConversation = [...conversation, newUserMessage];
    const limitedMessages = newConversation.slice(-10);

    setConversation(newConversation);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: limitedMessages }),
      });

      const data = await res.json();

      if (data.reply) {
        setConversation((prev) => [
          ...prev.slice(-9), // keep last 9 + new assistant message
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Something went wrong. Try again or refresh the conversation.",
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Failed to reach the server. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition duration-300"
        aria-label="Ask Arjun"
      >
        <FiMessageCircle size={24} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 right-0 z-50 w-full lg:w-[500px] h-full bg-gray-950 text-white shadow-2xl flex flex-col border-l border-gray-800"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="bg-gray-950 text-white w-full lg:w-[500px] h-full md:rounded-l-2xl mt-auto p-6 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-sky-400">
                  Ask Arjun Anything
                </h3>
                <button onClick={() => setIsOpen(false)} aria-label="Close">
                  <FiX size={24} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm p-3 rounded ${
                      msg.role === "user"
                        ? "bg-sky-700 text-white text-right"
                        : msg.content.toLowerCase().includes("oops") ||
                          msg.content.toLowerCase().includes("error") ||
                          msg.content.toLowerCase().includes("wrong")
                        ? "bg-red-800 text-red-100 text-left"
                        : "bg-gray-800 text-gray-200 text-left"
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
                            <p className="mb-2">{children}</p>
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
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Arjun..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded text-sm font-medium transition"
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithMe;
