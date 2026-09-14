import { useState, useRef, useEffect } from "react";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ToggleLang from "./components/ToggleLang";
import { FaTerminal, FaRobot, FaBars, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const SECTIONS = [
  { id: "all", label: "all", desc: "Complete portfolio stream" },
  { id: "bio", label: "bio", desc: "Overview & identity" },
  { id: "skills", label: "skills", desc: "Tech stack & proficiencies" },
  { id: "experience", label: "experience", desc: "Career timeline" },
  { id: "projects", label: "projects", desc: "Shipped applications" },
  { id: "education", label: "education", desc: "Academic credentials" },
  { id: "certifications", label: "certs", desc: "Verified certifications" },
  { id: "contact", label: "contact", desc: "Communication endpoints" },
];

const SUGGESTED_QUERIES = [
  "What is Arjun's primary stack?",
  "Tell me about his experience.",
  "Which projects did he build?",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("all");
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState(null); // HUD message (no DOM creep)
  const [isChatMode, setIsChatMode] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Send query to AI daemon
  const handleChatQuery = async (queryText) => {
    const text = queryText.trim();
    if (!text || chatLoading) return;

    if (text === "/exit" || text === "/quit" || text === "exit") {
      setIsChatMode(false);
      setFeedback({ type: "info", text: "Exited AI chat subshell." });
      return;
    }

    if (text === "/clear" || text === "clear") {
      setChatLog([]);
      setFeedback({ type: "info", text: "Chat buffer wiped." });
      return;
    }

    const userMessage = { role: "user", content: text };
    const updatedLog = [...chatLog, userMessage].slice(-16);
    setChatLog(updatedLog);
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedLog.slice(-8) }),
      });
      const data = await res.json();
      setChatLog((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response received from daemon.",
          isError: !res.ok || !data.reply,
        },
      ]);
    } catch {
      setChatLog((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error: Connection to AI daemon timed out.",
          isError: true,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Chat invocation
    if (cmd === "/chat" || cmd === "chat") {
      setIsChatMode(true);
      setActiveSection("chat");
      setFeedback({
        type: "success",
        text: "Interactive AI shell attached. Type queries or '/exit'.",
      });
      return;
    }

    if (cmd === "help" || cmd === "/help" || cmd === "?") {
      setShowHelp((prev) => !prev);
      setFeedback({
        type: "info",
        text: showHelp ? "Closed help menu." : "Toggled command reference.",
      });
      return;
    }

    if (cmd === "clear") {
      setChatLog([]);
      setFeedback(null);
      setShowHelp(false);
      return;
    }

    const matched = SECTIONS.find(
      (s) => s.id === cmd || s.label === cmd || `/${s.id}` === cmd,
    );

    if (matched) {
      setActiveSection(matched.id);
      setIsChatMode(false);
      setFeedback({ type: "success", text: `Active buffer: ${matched.id}` });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setFeedback({
        type: "error",
        text: `zsh: command not found: '${cmd}'. Type 'help' for options.`,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const val = inputVal;
    setInputVal("");

    if (isChatMode) {
      if (val.startsWith("/") && val !== "/exit" && val !== "/clear") {
        // Allow switching out of chat by issuing normal commands with a leading slash
        handleCommand(val.slice(1));
      } else {
        handleChatQuery(val);
      }
    } else {
      handleCommand(val);
    }
  };

  // Keep view at top when switching buffers
  useEffect(() => {
    if (!isChatMode && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSection, isChatMode]);

  const renderContent = (key) => {
    if (isChatMode) {
      return (
        <div className="space-y-4">
          <div className="border border-[#30363d] bg-[#0d1117] rounded-lg p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <FaRobot />
                <span className="font-semibold">arjun-ai-daemon v1.2</span>
              </div>
              <span className="text-gray-500">Type /exit to return</span>
            </div>

            {/* Empty Chat State */}
            {chatLog.length === 0 && (
              <div className="py-6 space-y-4 text-center sm:text-left">
                <p className="text-xs text-gray-400">
                  Ready. Ask anything about Arjun&apos;s experience, systems
                  architecture, or projects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleChatQuery(q)}
                      disabled={chatLoading}
                      className="text-xs font-mono bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] text-gray-300 hover:text-white px-3 py-1.5 rounded transition-colors text-left"
                    >
                      $ {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Conversation History */}
            <div className="space-y-4 text-xs">
              {chatLog.map((msg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                    {msg.role === "user" ? (
                      <span className="text-[#3fb950]">guest ❯</span>
                    ) : (
                      <span className="text-[#58a6ff]">assistant ❯</span>
                    )}
                  </div>
                  <div
                    className={`pl-4 border-l-2 py-0.5 leading-relaxed ${
                      msg.role === "user"
                        ? "border-[#3fb950]/50 text-gray-200"
                        : msg.isError
                          ? "border-red-500/60 text-red-300 bg-red-950/20 p-2 rounded"
                          : "border-[#58a6ff]/50 text-gray-300"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="text-xs pl-4 border-l-2 border-[#58a6ff]/50 text-gray-500 animate-pulse">
                  streaming response...
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    switch (key) {
      case "bio":
        return <Hero onNavigate={handleCommand} />;
      case "skills":
        return <Skills />;
      case "experience":
        return <Experience />;
      case "education":
        return <Education />;
      case "certifications":
        return <Certifications />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      case "all":
      default:
        return (
          <div className="space-y-16">
            <Hero onNavigate={handleCommand} />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certifications />
            <Contact />
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#030712] font-mono text-sm text-gray-200 flex flex-col select-text">
      <div className="h-full w-full bg-[#0d1117] flex flex-col overflow-hidden">
        {/* Terminal Titlebar (No horizontal overflow) */}
        <header className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between gap-3 shrink-0 select-none z-20">
          {/* Window dots & Path */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
            <span className="text-xs text-gray-400 font-medium ml-2">
              portfolio ~ {isChatMode ? "bot(interactive)" : activeSection}
            </span>
          </div>

          {/* Right controls: Mobile menu toggle + Locale */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile quick-switch menu toggle */}
            <button
              type="button"
              onClick={() => setShowMenu((p) => !p)}
              className="sm:hidden text-gray-400 hover:text-white p-1 rounded bg-[#21262d] border border-[#30363d]"
              aria-label="Toggle section picker"
            >
              {showMenu ? <FaTimes size={13} /> : <FaBars size={13} />}
            </button>

            <ToggleLang />
          </div>
        </header>

        {/* Mobile Dropdown Section Picker */}
        {showMenu && (
          <div className="sm:hidden bg-[#161b22] border-b border-[#30363d] p-3 grid grid-cols-2 gap-1.5 z-20 shadow-xl">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  handleCommand(sec.id);
                  setShowMenu(false);
                }}
                className={`text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                  activeSection === sec.id && !isChatMode
                    ? "bg-[#21262d] text-[#58a6ff] font-semibold border border-[#30363d]"
                    : "text-gray-400 hover:bg-[#0d1117] hover:text-gray-200"
                }`}
              >
                .{sec.label}()
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                handleCommand("/chat");
                setShowMenu(false);
              }}
              className={`text-left px-2.5 py-1.5 rounded text-xs col-span-2 flex items-center justify-between transition-colors ${
                isChatMode
                  ? "bg-[#238636] text-white font-semibold"
                  : "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              <span>/chat (Ask AI)</span>
              <FaRobot size={11} />
            </button>
          </div>
        )}

        {/* Help Panel Flyout */}
        {showHelp && (
          <aside className="bg-[#161b22] border-b border-[#30363d] p-4 text-xs space-y-2 z-10 shrink-0">
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-bold text-[#58a6ff]">// CLI REFERENCE</span>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-white"
              >
                [close]
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-gray-300">
              <div>
                <span className="text-[#3fb950] font-bold">/chat</span>
                <span className="text-gray-500"> - Launch AI assistant</span>
              </div>
              <div>
                <span className="text-[#3fb950] font-bold">
                  all | bio | skills
                </span>
                <span className="text-gray-500"> - Switch section</span>
              </div>
              <div>
                <span className="text-[#3fb950] font-bold">projects | exp</span>
                <span className="text-gray-500"> - Work &amp; timeline</span>
              </div>
              <div>
                <span className="text-[#3fb950] font-bold">clear</span>
                <span className="text-gray-500"> - Reset screen state</span>
              </div>
            </div>
          </aside>
        )}

        {/* Content Pane (Primary Internal Scroll Area) */}
        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-16 py-6 space-y-8 terminal-screen"
        >
          {renderContent(activeSection)}
        </main>

        {/* Transient HUD Toast (No history stacking or page pushing) */}
        {feedback && (
          <div
            className={`px-4 py-1.5 text-xs flex items-center justify-between border-t border-[#30363d] select-none transition-colors ${
              feedback.type === "error"
                ? "bg-red-950/80 text-red-300 border-red-800/40"
                : feedback.type === "success"
                  ? "bg-[#161b22] text-emerald-400"
                  : "bg-[#161b22] text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">❯</span>
              <span>{feedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-gray-500 hover:text-gray-300 ml-4"
            >
              &times;
            </button>
          </div>
        )}

        {/* Interactive Shell Input Line */}
        <form
          onSubmit={onSubmit}
          onClick={() => inputRef.current?.focus()}
          className="bg-[#161b22] border-t border-[#30363d] px-4 py-2.5 flex items-center gap-2 cursor-text shrink-0 select-none z-10"
        >
          {isChatMode ? (
            <>
              <span className="text-[#58a6ff] font-bold flex items-center gap-1">
                <FaRobot className="text-[11px]" />
                <span>ai-chat</span>
              </span>
              <span className="text-[#3fb950] font-bold">❯</span>
            </>
          ) : (
            <>
              <span className="text-[#3fb950] font-bold">➜</span>
              <span className="text-[#58a6ff] font-semibold hidden xs:inline">
                ~/portfolio
              </span>
              <span className="text-gray-500">$</span>
            </>
          )}

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              isChatMode
                ? "Ask anything, or type '/exit' to return..."
                : "Type 'help', section name, or '/chat'..."
            }
            className="flex-1 bg-transparent border-none outline-none text-gray-100 font-mono text-xs sm:text-sm placeholder-gray-600"
            autoFocus
          />

          {isChatMode && (
            <button
              type="button"
              onClick={() => handleCommand("/exit")}
              className="text-[11px] text-gray-400 hover:text-white bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]"
            >
              /exit
            </button>
          )}
        </form>

        {/* Minimal Bottom Status Line (Tmux style) */}
        <footer className="bg-[#0b0e14] border-t border-[#30363d]/60 px-4 py-1 text-[11px] text-gray-500 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[#58a6ff] font-bold">NORMAL</span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <div className="hidden sm:flex items-center gap-2">
              {SECTIONS.slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleCommand(s.id)}
                  className={`hover:text-gray-300 ${
                    activeSection === s.id && !isChatMode
                      ? "text-[#3fb950] font-semibold"
                      : ""
                  }`}
                >
                  [{s.label}]
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCommand("/chat")}
              className={`hover:text-white flex items-center gap-1 ${
                isChatMode ? "text-emerald-400 font-bold" : "text-gray-400"
              }`}
            >
              <FaTerminal className="text-[9px]" />
              <span>/chat</span>
            </button>
            <span className="text-gray-600">|</span>
            <button
              type="button"
              onClick={() => handleCommand("help")}
              className="text-gray-400 hover:text-white"
            >
              :help
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
