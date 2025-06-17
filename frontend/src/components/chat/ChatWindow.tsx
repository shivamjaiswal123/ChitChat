import { userStore } from '../../store/userStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import Messages from './Messages';

function ChatWindow() {
  const selectedUser = userStore((state) => state.selectedUser);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-500">
            Select a conversation to start chatting
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex flex-col h-screen">
        <ChatHeader />
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatWindow;
