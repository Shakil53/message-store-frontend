"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/fetch-messages", {
        accessToken,
        conversationId,
      });
      alert(response.data);
    } catch (err:any) {
      console.error("Error fetching messages:", err.response?.data || err.message);
    }
    setLoading(false);
  };

  const handleGetMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/messages/${customerId}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error retrieving messages:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Facebook Message History</h1>

      {/* Fetch Messages */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded-lg mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Access Token"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Conversation ID"
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleFetchMessages}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Messages from Facebook"}
        </button>
      </div>

      {/* Get Messages */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded-lg">
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handleGetMessages}
        >
          Get Message History
        </button>
      </div>

      {/* Display Messages */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-2">Messages</h2>
        <ul className="space-y-2">
          {messages.map((msg: any) => (
            <li key={msg._id} className="border-b pb-2">
              <strong>{msg.customerName || "Unknown"}:</strong> {msg.messageContent} <br />
              <small className="text-gray-500">{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
