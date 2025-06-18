import { useSocket } from '../../hooks/useSocket';
import ChatWindow from '../chat/ChatWindow';
import Sidebar from '../sidebar/Sidebar';

function Homepage() {
  useSocket();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Homepage;
