// App.jsx
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/UIElments/Sidebar";
import GeminiImageText from "./components/models/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Job from "./components/sidebar/Jobs";
import HomePage from "./components/sidebar/HomePage";
import CodeEditor from "./components/codeEditor/CodeEditor";

// Import Clerk components
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="AI"
            to="/ai"
          />
          <SidebarItem icon={<StickyNote size={20} />} text="Job" to="job" />
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Code Editor"
            to="/codeeditor"
          />
         
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ai" element={<GeminiImageText />} />
              <Route path="/job" element={<Job />} />
              <Route path="/codeeditor" element={<CodeEditor />} />
              <Route
                path="/profile"
                element={
                  <>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;