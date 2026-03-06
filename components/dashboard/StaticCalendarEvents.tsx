export function StaticCalendarEvents() {
  return (
    <div className="calendar-events bg-white dark:bg-gray-800 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 dark:ring-slate-800 p-6 transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-black">Upcoming Events (2)</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-blue-600 dark:text-blue-400">
              📅 1 Google
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                user@gmail.com
              </span>
            <span className="text-xs text-blue-600 dark:text-blue-400">
              📆 1 Outlook
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                user@outlook.com
              </span>
          </div>
        </div>
        <button className="h-10 w-30 border-none rounded-full bg-blue-500 text-white text-sm font-medium cursor-pointer px-4 py-2 flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>Refresh</span>
          </button>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Team Standup
              </h3>
              <div className="mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                  📧 user@example.com
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">📅 Google</span>
                  <span>Today at 10:00 AM</span>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button className="px-1 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                🚀 Join Meeting
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md border-orange-200 bg-orange-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Client Meeting
              </h3>
              <div className="mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                  user@outlook.com
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-orange-600 dark:text-orange-400">📅 Outlook</span>
                  <span>Today at 10:15 AM</span>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button className="px-1 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                🚀 Join Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
