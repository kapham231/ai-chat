import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ChatPage />
    </>
  );
}

export default App;