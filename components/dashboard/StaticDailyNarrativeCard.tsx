export function StaticDailyNarrativeCard() {
  return (
    <div className="p-6 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 bg-white transition-shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg text-black">Daily Narrative</h2>
        <button className="flex items-center justify-center w-9 h-9 rounded-full text-sm transition-all duration-200 bg-blue-600 text-white hover:bg-blue-500">
          <span>▼</span>
        </button>
      </div>
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            Today was a productive day with significant progress on the new feature development.
            The team completed the design review and started implementation. Several important
            decisions were made regarding the project architecture.
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-2 rounded">
          <span>📧 12 emails</span>
          <span>📅 3 events</span>
          <span className="ml-auto">🎯 85% specific</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="mr-4">🏆 2 highlights</span>
          <span className="mr-4">🤝 1 decisions</span>
          <span className="mr-4">📝 3 todos</span>
        </div>
      </div>
    </div>
  );
}
