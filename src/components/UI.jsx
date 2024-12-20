import { useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useAvatar } from "../hooks/useAvatar";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";
import { ControlButtons } from "./ControlButtons";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const { showAvatar, setShowAvatar } = useAvatar();

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  const handleToggleGreenScreen = () => {
    const body = document.querySelector("body");
    body.classList.toggle("greenScreen");
  };

  if (hidden) return null;

  return (
    <>
      {showAvatar ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
          <Header onClose={() => setShowAvatar(false)} />
          <ControlButtons 
            cameraZoomed={cameraZoomed}
            onToggleCamera={() => setCameraZoomed(!cameraZoomed)}
            onToggleGreenScreen={handleToggleGreenScreen}
          />
          <ChatInput 
            inputRef={input}
            onSend={sendMessage}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading || message}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowAvatar(true)}
          className="fixed bottom-4 right-4 z-10 bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg shadow-blue-400/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      )}
    </>
  );
};