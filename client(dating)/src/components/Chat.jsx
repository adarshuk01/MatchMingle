import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import axios from "axios";

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverName, setReceiverName] = useState("");

  // ✅ Fetch chat history and receiver info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        setChat(res.data);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user/${receiverId}`);
        console.log(res);
        
        setReceiverName(res.data.user.name || "User");
      } catch (err) {
        console.error("Failed to load receiver info:", err);
        setReceiverName("User");
      }
    };

    fetchMessages();
    fetchReceiver();
  }, [senderId, receiverId]);

  // ✅ Listen for new incoming messages
  useEffect(() => {
    const handleReceive = (newMsg) => {
      setChat((prev) => [...prev, newMsg]);
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, []);

  // ✅ Send a message
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: senderId,
      receiver: receiverId,
      content: message,
    };
    socket.emit("send_message", msgData);
    setMessage("");
  };

  // ✅ Format time
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Receiver name at top */}
      <h2 className="text-lg font-semibold mb-4 text-center border-b pb-2">
        Chat with {receiverName}
      </h2>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto border p-3 rounded bg-white shadow-sm">
        {chat.map((msg, idx) => {
          const isOwnMessage = (msg.sender?._id || msg.sender) === senderId;

          return (
            <div
              key={idx}
              className={`my-2 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          className="flex-grow border px-3 py-2 rounded outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
