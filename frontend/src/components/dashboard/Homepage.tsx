import ChatWindow from '../chat/ChatWindow';
import Sidebar from '../sidebar/Sidebar';

function Homepage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Homepage;
