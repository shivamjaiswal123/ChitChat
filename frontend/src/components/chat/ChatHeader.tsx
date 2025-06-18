import { socketStore } from '../../store/socketStore';
import { userStore } from '../../store/userStore';

function ChatHeader() {
  const selectedUser = userStore((state) => state.selectedUser);
  const onlineUsers = socketStore((state) => state.onlineUsers);
  const isOnline = onlineUsers.includes(selectedUser?._id!);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <img
          className="size-10 rounded-full object-cover"
          src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
          alt={selectedUser?._id}
        />
        <div className="flex flex-col">
          <h1 className="font-medium">{selectedUser?.name}</h1>
          {isOnline && <span className="text-xs">Online</span>}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
