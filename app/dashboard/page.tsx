import { StaticDailySummaryPanel } from '@/components/dashboard/StaticDailySummaryPanel';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { StaticDailyNarrativeCard } from '@/components/dashboard/StaticDailyNarrativeCard';
import { StaticWeatherCard } from '@/components/dashboard/StaticWeatherCard';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, User</p>
          </div>
          {/* Weather Card */}
          <div className="flex-shrink-0">
            <StaticWeatherCard />
          </div>
        </div>

        {/* Morning Section - Daily Summary */}
        <div className="mb-8">
          <StaticDailySummaryPanel />
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <StaticCalendarEvents />
        </div>

        {/* Primary Inbox */}
        <div className="mb-8">
          <StaticInboxList />
        </div>

        {/* Daily Narrative */}
        <div className="mb-8">
          <StaticDailyNarrativeCard />
        </div>

        {/* Connected Apps */}
        <div className="mb-8">
          <StaticConnectedApps />
        </div>
      </div>
    </div>
  );
}
