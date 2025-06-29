import { useEffect, useRef } from 'react';
import { authStore } from '../../store/authStore';
import { socketStore } from '../../store/socketStore';
import { userStore } from '../../store/userStore';
import { getMessages } from '../../api/user.api';

function Messages() {
  const content = socketStore((state) => state.content);
  const currUserId = authStore((state) => state.currUser?._id);
  const selectedUserId = userStore((state) => state.selectedUser?._id);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const setChatHistory = socketStore((state) => state.setChatHistory);

  // filter content for selected user only
  const fillContent = content.filter(
    (cnt) =>
      (cnt.senderId === currUserId && cnt.receiverId === selectedUserId) ||
      (cnt.senderId === selectedUserId && cnt.receiverId === currUserId)
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [content]);

  useEffect(() => {
    const getChatHistory = async () => {
      const res = await getMessages(selectedUserId!);

      if (res.success) {
        setChatHistory(res.data!);
      }
    };

    getChatHistory();
  }, [selectedUserId]);

  return (
    <div className="flex-1 p-4 overflow-y-scroll" ref={chatContainerRef}>
      {fillContent.map((cnt) => {
        return (
          <div
            className={`chat ${
              cnt.senderId === currUserId ? 'chat-end' : 'chat-start'
            }`}
          >
            <div
              className={`chat-bubble ${
                cnt.senderId === currUserId
                  ? 'chat-bubble-accent'
                  : 'chat-bubble-neutral'
              } max-w-lg break-words`}
            >
              {cnt.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
