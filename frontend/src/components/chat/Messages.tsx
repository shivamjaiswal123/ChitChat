import { useEffect, useRef } from 'react';
import { authStore } from '../../store/authStore';
import { socketStore } from '../../store/socketStore';
import { userStore } from '../../store/userStore';

function Messages() {
  const content = socketStore((state) => state.content);
  const currUserId = authStore((state) => state.currUser?._id);
  const selectedUserId = userStore((state) => state.selectedUser?._id);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
              }`}
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
