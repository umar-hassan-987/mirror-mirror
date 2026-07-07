"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { matchIntent } from "@/data/chatbotData";

// ─── Helpers ───────────────────────────────────────────────────────────

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Typing Indicator ──────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="chatbot-message chatbot-message-bot">
      <div className="chatbot-avatar-bot">
        <Bot className="w-4 h-4" />
      </div>
      <div className="chatbot-bubble chatbot-bubble-bot">
        <div className="chatbot-typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────

function MessageBubble({ message, dir }) {
  const isBot = message.sender === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`chatbot-message ${isBot ? "chatbot-message-bot" : "chatbot-message-user"}`}
    >
      {isBot && (
        <div className="chatbot-avatar-bot">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <div className={`chatbot-bubble ${isBot ? "chatbot-bubble-bot" : "chatbot-bubble-user"}`}>
        <p className="chatbot-bubble-text" style={{ whiteSpace: "pre-line" }}>
          {message.text}
        </p>
        <span className={`chatbot-timestamp ${isBot ? "chatbot-timestamp-bot" : "chatbot-timestamp-user"}`}>
          {message.time}
        </span>
      </div>
      {!isBot && (
        <div className="chatbot-avatar-user">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
}

// ─── Quick Reply Buttons ───────────────────────────────────────────────

function QuickReplies({ suggests, t, onSelect }) {
  if (!suggests || suggests.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="chatbot-quick-replies"
    >
      {suggests.map((suggestKey, idx) => {
        const label = t(suggestKey);
        if (!label || label === suggestKey) return null;
        return (
          <button
            key={idx}
            onClick={() => onSelect(label)}
            className="chatbot-quick-reply-btn"
          >
            {label}
            <ArrowRight className="w-3 h-3 opacity-50" />
          </button>
        );
      })}
    </motion.div>
  );
}

// ─── Main Chatbot Component ────────────────────────────────────────────

export default function Chatbot() {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Send welcome message on first open
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      const welcomeText = t("chatbot.responses.greeting");
      const welcomeSuggests = [
        "chatbot.quickReplies.services",
        "chatbot.quickReplies.pricing",
        "chatbot.quickReplies.bookNow",
        "chatbot.quickReplies.contact"
      ];

      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: generateId(),
          sender: "bot",
          text: welcomeText,
          time: formatTime(),
          suggests: welcomeSuggests
        }]);
        setIsTyping(false);
      }, 600);
    }
  }, [hasOpened, t]);

  // Process user message
  const handleSend = useCallback((text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    // Add user message
    const userMsg = {
      id: generateId(),
      sender: "user",
      text: trimmed,
      time: formatTime(),
      suggests: []
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Match intent and respond
    const result = matchIntent(trimmed);
    const responseText = t(result.response);

    const delay = 500 + Math.random() * 500; // 500–1000ms

    setTimeout(() => {
      const botMsg = {
        id: generateId(),
        sender: "bot",
        text: responseText,
        time: formatTime(),
        suggests: result.suggests
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }, [input, t]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle quick reply click
  const handleQuickReply = (label) => {
    handleSend(label);
  };

  return (
    <>
      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="chatbot-fab"
            aria-label="Open chat"
            id="chatbot-fab"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="chatbot-fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="chatbot-window"
            dir={dir}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-header-avatar">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="chatbot-header-title">
                    {t("chatbot.ui.title")}
                  </h3>
                  <p className="chatbot-header-status">
                    <span className="chatbot-status-dot" />
                    {t("chatbot.ui.online")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-close-btn"
                aria-label="Close chat"
                id="chatbot-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={msg.id}>
                  <MessageBubble message={msg} dir={dir} />
                  {/* Show quick replies only on the last bot message */}
                  {msg.sender === "bot" && idx === messages.length - 1 && !isTyping && (
                    <QuickReplies
                      suggests={msg.suggests}
                      t={t}
                      onSelect={handleQuickReply}
                    />
                  )}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chatbot.ui.placeholder")}
                className="chatbot-input"
                id="chatbot-input"
                dir={dir}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="chatbot-send-btn"
                aria-label="Send message"
                id="chatbot-send-btn"
              >
                <Send className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Powered by label */}
            <div className="chatbot-powered">
              {t("chatbot.ui.poweredBy")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
