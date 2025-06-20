import { useUser } from '../../hooks/useUser';
import { socketStore } from '../../store/socketStore';
import { tabStore } from '../../store/tabStore';
import { userStore } from '../../store/userStore';

function UserList() {
  const activeTab = tabStore((state) => state.activeTab);
  const setSelectedUser = userStore((state) => state.setSelectedUser);
  const onlineUsers = socketStore((state) => state.onlineUsers);

  const { data: allUsers } = useUser();
  const displayedUsers = activeTab === 'new chat' ? allUsers?.data : [];

  return (
    <div className="divide-y divide-gray-200">
      {displayedUsers?.map((user) => {
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
            <div className="text-sm font-medium">{user.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
