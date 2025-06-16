import { useUser } from '../../hooks/useUser';
import { tabStore } from '../../store/tabStore';

function UserList() {
  const activeTab = tabStore((state) => state.activeTab);
  const { data: allUsers } = useUser();
  const displayedUsers = activeTab === 'new chat' ? allUsers?.data : [];

  return (
    <div className="divide-y divide-gray-200">
      {displayedUsers?.map((user) => {
        return (
          <div
            key={user._id}
            className="px-4 py-3 flex items-center gap-3 mt-2 cursor-pointer"
          >
            <img
              className="size-10 rounded-full object-cover"
              src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
              alt={user.name}
            />
            <div className="font-medium">{user.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
