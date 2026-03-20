import { HoverTypingTooltip } from '@/components/ui/HoverTypingTooltip';

export function StaticConnectedApps() {
  return (
    <div className="p-6 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 bg-white transition-shadow mb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg text-black">
          <HoverTypingTooltip text="Linked email and calendar accounts." speed={35}>
            Connected Apps
          </HoverTypingTooltip>
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add App</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Gmail Card */}
        <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Gmail</h3>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded font-medium bg-green-50 text-green-700 border border-green-200">
                connected
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
              <span>📧</span> user@gmail.com
            </span>
          </div>
        </div>

        {/* Google Calendar Card */}
        <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Google Calendar</h3>
                <p className="text-xs text-gray-500">Calendar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded font-medium bg-green-50 text-green-700 border border-green-200">
                connected
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
              <span>📧</span> user@gmail.com
            </span>
          </div>
        </div>

        {/* Outlook Card */}
        <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Outlook</h3>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded font-medium bg-green-50 text-green-700 border border-green-200">
                connected
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
              user@outlook.com
            </span>
          </div>
        </div>

        {/* SMTP Mailbox Card */}
        <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">SMTP Mailbox</h3>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded font-medium bg-green-50 text-green-700 border border-green-200">
                connected
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-800 border-yellow-200">
            user@smtp.com
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}
