import Link from "next/link";
import { ArrowRight, Bot, Video, Sparkles, Mic, Activity } from "lucide-react";

export const HomeView = () => {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Aura
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your intelligent meeting assistant. Capture conversations, generate
          summaries, and automate your workflow with AI agents.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/meetings" className="group">
          <div className="h-full p-6 rounded-2xl border bg-white shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Video size={100} />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Video size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">New Meeting</h3>
                <p className="text-muted-foreground text-sm">
                  Start or schedule a new video call with AI transcription.
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                Start now <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/agents" className="group">
          <div className="h-full p-6 rounded-2xl border bg-white shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Bot size={100} />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Create Agent</h3>
                <p className="text-muted-foreground text-sm">
                  Deploy custom AI agents to join your meetings.
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-purple-600 group-hover:gap-2 transition-all">
                Manage agents <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </Link>

        <div className="h-full p-6 rounded-2xl border bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xs relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="flex flex-col gap-4 relative z-10 h-full">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-xs">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Aura Pro</h3>
              <p className="text-gray-300 text-sm">
                Unlock advanced analytics and unlimited summaries.
              </p>
            </div>
            <button disabled className="mt-auto w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/10">
              Coming soon
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="text-teal-500" size={20} />
          Why Aura?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start">
            <div className="p-2 bg-white rounded-lg border shadow-xs text-teal-600 shrink-0">
              <Mic size={18} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Crystal Clear Audio</h4>
              <p className="text-xs text-muted-foreground mt-1">High-fidelity recording for accurate transcriptions.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start">
            <div className="p-2 bg-white rounded-lg border shadow-xs text-indigo-600 shrink-0">
              <Bot size={18} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Smart Agents</h4>
              <p className="text-xs text-muted-foreground mt-1">AI participants that listen, take notes, and interact.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start">
            <div className="p-2 bg-white rounded-lg border shadow-xs text-amber-600 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Instant Summaries</h4>
              <p className="text-xs text-muted-foreground mt-1">Get meeting minutes and action items seconds after you finish.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
