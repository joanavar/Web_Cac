'use client';
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded max-w-xs ${msg.role === "user" ? "bg-blue-200 self-end text-right" : "bg-white self-start"}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 rounded border"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
      </div>
    </div>
  );
}
