import { Send, Smile } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { userStore } from '../../store/userStore';
import { useSocket } from '../../hooks/useSocket';
import { authStore } from '../../store/authStore';
import { socketStore } from '../../store/socketStore';

function MessageInput() {
  const [message, setMessage] = useState('');

  const senderId = authStore((state) => state.currUser?._id);
  const receiverId = userStore((state) => state.selectedUser?._id);
  const setContent = socketStore((state) => state.setContent);

  const { sendMessage } = useSocket();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderId || !receiverId || !message.trim()) {
      return;
    }

    const data = {
      type: 'message',
      payload: {
        senderId,
        receiverId,
        content: message,
      },
    };
    sendMessage(data);

    // For showing sent messages to sender also
    setContent(data.payload);
    setMessage('');
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSendMessage} className="flex items-center">
        <button
          type="button"
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        >
          <Smile size={20} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mx-3 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 cursor-pointer disabled:bg-gray-400`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
