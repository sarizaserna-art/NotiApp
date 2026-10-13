import React, { useState } from "react";
import { Bot, Send, Trash2, Sparkles } from "lucide-react";

function Notibot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hola, soy NotiBot IA. Puedo ayudarte con reportes de infraestructura, veeduría ciudadana y seguimiento de casos.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // Respuesta simulada del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Entendido. Sobre tu consulta "${currentInput}": Recuerda que puedes consultar o radicar un reporte formal en la pestaña "Reportar Daño". ¿Deseas información adicional sobre algún trámite?`,
        },
      ]);
    }, 600);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hola, soy NotiBot IA. Puedo ayudarte con reportes de infraestructura, veeduría ciudadana y seguimiento de casos.",
      },
    ]);
  };

  return (
    <div className="py-6 px-4">
      <div className="chat-container">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-black text-slate-900">NotiBot IA</h1>
              <p className="text-xs text-slate-500">Asistente de veeduría ciudadana</p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="text-slate-400 hover:text-red-500 p-2 transition-colors"
            title="Limpiar chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                msg.sender === "bot" ? "chat-bubble-bot" : "chat-bubble-user"
              }`}
            >
              {msg.sender === "bot" && (
                <Bot className="h-4 w-4 shrink-0 text-blue-600 mt-1" />
              )}
              <div>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chat-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta sobre infraestructura..."
          />
          <button type="submit" className="noti-btn noti-btn-primary">
            <Send className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3" /> NotiBot proporciona orientación general sobre trámites e infraestructura.
        </p>

      </div>
    </div>
  );
}

export default Notibot;