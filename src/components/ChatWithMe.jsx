import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatWithMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end md:justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="bg-gray-950 text-white w-full md:w-[400px] h-full p-6 shadow-xl flex flex-col"
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
                        : "bg-gray-800 text-gray-200 text-left"
                    }`}
                  >
                    {msg.content}
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
