import { userStore } from '../../store/userStore';

function ChatHeader() {
  const selectedUser = userStore((state) => state.selectedUser);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <img
          className="size-10 rounded-full object-cover"
          src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
          alt={selectedUser?._id}
        />
        <h1 className="font-medium">{selectedUser?.name}</h1>
      </div>
    </div>
  );
}

export default ChatHeader;
