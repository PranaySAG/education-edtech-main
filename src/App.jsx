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
  UserProfile,
} from "@clerk/clerk-react";

const HAS_CLERK_KEY = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

function ProfileFallback() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile</p>
        <h1 className="mt-4 text-3xl font-semibold">Clerk is not configured yet.</h1>
        <p className="mt-3 text-slate-300">
          Add a valid `VITE_CLERK_PUBLISHABLE_KEY` to enable sign-in and account controls.
        </p>
      </div>
    </div>
  );
}

function ProfilePage() {
  if (!HAS_CLERK_KEY) {
    return <ProfileFallback />;
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <SignedOut>
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-slate-300">Sign in to view your profile.</p>
          <SignInButton mode="modal">
            <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-50">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserProfile />
      </SignedIn>
    </div>
  );
}

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
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;