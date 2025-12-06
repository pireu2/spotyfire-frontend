"use client";

import { useState } from "react";
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types";
import { suggestedPrompts } from "@/lib/mocks";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bună! Sunt SpotyBot, asistentul tău pentru monitorizarea terenurilor. Cum te pot ajuta astăzi?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      dimensiune:
        "Bazat pe analiza satelitară, cicatricea de ardere are o suprafață de aproximativ 38.2 hectare. Severitatea este estimată la 65%, cu zone de regenerare deja vizibile în marginile afectate.",
      raport:
        "Am pregătit un raport preliminar pentru cererea de despăgubire. Acesta include: date GPS ale zonei afectate, imagini satelitare înainte/după, estimarea pierderilor (45,000 RON), și certificatul de conformitate. Doriți să-l descărcați?",
      "anul trecut":
        "Comparativ cu anul trecut, indicele NDVI mediu este cu 12% mai scăzut. Această scădere se datorează în principal secetei din perioada iulie-august și incendiului recent din Sectorul 4.",
      vegetație:
        "Starea actuală a vegetației: 65% din suprafață prezintă NDVI > 0.6 (sănătos), 25% între 0.3-0.6 (stres moderat), și 10% < 0.3 (deteriorat sever). Recomand irigare suplimentară în zonele de stres.",
    };

    let response =
      "Analizez datele disponibile... Pentru mai multe detalii, puteți selecta una din sugestiile de mai jos sau reformula întrebarea.";

    for (const [key, value] of Object.entries(responses)) {
      if (input.toLowerCase().includes(key)) {
        response = value;
        break;
      }
    }

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-[9999]"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col z-[9999] overflow-hidden">
          <div className="bg-green-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-white" />
              <div>
                <h3 className="font-semibold text-white">SpotyBot</h3>
                <p className="text-xs text-green-200">Agent de Teren AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-slate-800 text-slate-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-700">
            <div className="flex flex-wrap gap-1 mb-2">
              {suggestedPrompts.slice(0, 2).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full hover:bg-slate-700 flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  {prompt.slice(0, 25)}...
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Scrie un mesaj..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-green-600 hover:bg-green-700"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
