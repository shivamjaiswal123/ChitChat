import { socketStore } from '../../store/socketStore';
import { userStore } from '../../store/userStore';
import profilePicture from '../../assets/profile-picture.png';

function ChatHeader() {
  const selectedUser = userStore((state) => state.selectedUser);
  const onlineUsers = socketStore((state) => state.onlineUsers);
  const isOnline = onlineUsers.includes(selectedUser?._id!);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            className="size-10 rounded-full object-cover"
            src={profilePicture}
            alt={selectedUser?._id}
          />

          <span
            title={isOnline ? 'Online' : 'Offline'}
            className={`${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            } rounded-full size-3 absolute left-8 bottom-0 border-2 border-white`}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-medium">{selectedUser?.name}</h1>
          {isOnline ? (
            <span className="text-xs">Online</span>
          ) : (
            <span className="text-xs">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
