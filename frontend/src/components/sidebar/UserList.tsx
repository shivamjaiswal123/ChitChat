import { useUser } from '../../hooks/useUser';
import { socketStore } from '../../store/socketStore';
import { tabStore } from '../../store/tabStore';
import { userStore } from '../../store/userStore';

function UserList() {
  const activeTab = tabStore((state) => state.activeTab);
  const setSelectedUser = userStore((state) => state.setSelectedUser);
  const onlineUsers = socketStore((state) => state.onlineUsers);
  const showLastMessage = activeTab === 'chat';
  const searchQuery = userStore((state) => state.searchQuery);

  const { allUsers, chattedUsers } = useUser();
  const displayedUsers =
    activeTab === 'new chat' ? allUsers?.data : chattedUsers?.data;

  const filteredUsers = displayedUsers?.filter((user) =>
    user.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y divide-gray-200">
      {filteredUsers?.map((user) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className="px-4 py-3 flex items-center gap-3 mt-2 cursor-pointer"
          >
            <div className="relative">
              <img
                className="size-10 rounded-full object-cover"
                src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                alt={user.name}
              />

              <span
                title={isOnline ? 'Online' : 'Offline'}
                className={`${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                } rounded-full size-3 absolute left-8 bottom-0 border-2 border-white`}
              />
            </div>
            <div className="flex-1 ml-3 min-w-0">
              <h2 className="text-sm font-medium text-gray-900">{user.name}</h2>

              {showLastMessage && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {user.lastMessage}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
