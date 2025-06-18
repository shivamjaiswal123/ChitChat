import { LogOut, Search } from 'lucide-react';
import UserList from './UserList';
import { authStore } from '../../store/authStore';
import { tabStore } from '../../store/tabStore';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const currUser = authStore((state) => state.currUser);
  const activeTab = tabStore((state) => state.activeTab);
  const setActiveTab = tabStore((state) => state.setActiveTab);

  const { doLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await doLogout();
    if (res.success) {
      navigate('/signin');
    }
  };

  return (
    <div className="w-sm flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-4 space-y-3">
        <h1 className="text-xl font-medium">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3" size={18} />
          <input
            type="text"
            placeholder="Search users"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tab */}
      <div className="flex border-b border-gray-300 mx-4">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 text-sm font-medium 
              ${
                activeTab === 'chat'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }
          `}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab('new chat')}
          className={`flex-1 py-2 text-sm font-medium 
              ${
                activeTab === 'new chat'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }
          `}
        >
          New Chats
        </button>
      </div>

      {/* Userlist */}
      <div className="flex-1">
        <UserList />
      </div>

      {/* Profile */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="size-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {currUser?.name}
            </p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>

        <button onClick={handleLogout} className="cursor-pointer">
          {<LogOut />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
