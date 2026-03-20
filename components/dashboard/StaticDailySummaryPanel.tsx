'use client';

import { useState, type RefObject } from 'react';
import { HoverTypingTooltip } from '@/components/ui/HoverTypingTooltip';

interface StaticDailySummaryPanelProps {
  timeClashRef?: RefObject<HTMLDivElement | null>;
  inferredFactsRef?: RefObject<HTMLDivElement | null>;
  todosRef?: RefObject<HTMLDivElement | null>;
  eventsRef?: RefObject<HTMLDivElement | null>;
}

export function StaticDailySummaryPanel({ timeClashRef, inferredFactsRef, todosRef, eventsRef }: StaticDailySummaryPanelProps) {
  const [checkedTodos, setCheckedTodos] = useState<Set<number>>(new Set());

  const handleTodoToggle = (index: number) => {
    setCheckedTodos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 dark:ring-slate-700 p-6 mb-6 transition-shadow text-slate-900 dark:text-slate-100">
      <div className="flex justify-between items-center mb-2 bg-white z-10 pb-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Today's Overview</h2>
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Last updated: 1:55:45 PM
          </div>
          <button className="h-10 w-30  border-none rounded-full bg-blue-500 text-white text-sm font-medium cursor-pointer px-4 py-2 flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Time Clashes */}
      <div ref={timeClashRef} data-home-section="time_clash" className="mb-4">
        <div className="rounded-lg border border-red-200 shadow-sm bg-gradient-to-br from-red-50 via-white to-red-50 overflow-visible">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white font-semibold tracking-wide rounded-t-lg">
          <span className="text-xl">⏰</span>
          <HoverTypingTooltip text="Overlapping events that conflict." speed={35} variant="dark">
            Time Clash Alert
          </HoverTypingTooltip>
        </div>
        <ul className="list-disc marker:text-red-400 px-6 py-4 space-y-3 text-sm text-red-800">
          <li className="flex items-start justify-between gap-2 leading-relaxed">
            <div className="flex-1">
              <span className="font-medium">
                "Team Standup" overlaps with "Client Meeting"
              </span>
              <span className="text-slate-600 dark:text-slate-400 ml-2">
                from 10:00 AM to 10:30 AM
              </span>
            </div>
          </li>
        </ul>
        </div>
      </div>

      {/* Inferred Facts */}
      <div ref={inferredFactsRef} data-home-section="inferred_facts" className="mb-4">
        <h3 className="font-semibold mb-1 text-slate-900 dark:text-slate-100">
          <HoverTypingTooltip text="AI highlights from your emails and events." speed={35}>
            Inferred Facts
          </HoverTypingTooltip>
        </h3>
        <ul className="space-y-1">
          <li className="group flex items-start justify-between p-2 bg-gray-50 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700">
            <div className="flex-1 pr-3">
              <span className="text-slate-800 dark:text-slate-200">💡 Project deadline moved to next week</span>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-7">
                📧 9:30 AM • Mon Dec 16
              </div>
            </div>
          </li>
          <li className="group flex items-start justify-between p-2 bg-gray-50 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700">
            <div className="flex-1 pr-3">
              <span className="text-slate-800 dark:text-slate-200">💡 New feature request from client</span>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-7">
                📧 11:15 AM • Mon Dec 16
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Todos */}
      <div ref={todosRef} data-home-section="todos" className="mb-4">
        <h3 className="font-semibold mb-1 text-slate-900 dark:text-slate-100">
          <HoverTypingTooltip text="Action items from emails." speed={35}>
            Todos
          </HoverTypingTooltip>
        </h3>
        <ul className="space-y-2">
          <li className="group flex items-start p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center mr-3">
              <span className="text-lg">📝</span>
            </div>
            <div className="flex-1">
              <div className={`font-medium mb-2 text-slate-900 dark:text-slate-100 transition-all ${checkedTodos.has(0) ? 'line-through text-gray-400 dark:text-slate-500' : ''}`}>
                Review design mockups for new feature
              </div>
              {!checkedTodos.has(0) && (
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>📅 Mon Dec 16</span>
                  <span>⏰ Due: Wed Dec 18</span>
                  <span>📧 Design Review Thread</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <input
                type="checkbox"
                checked={checkedTodos.has(0)}
                onChange={() => handleTodoToggle(0)}
                className="w-5 h-5 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                style={{ accentColor: 'green' }}
              />
            </div>
          </li>
          <li className="group flex items-start p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center mr-3">
              <span className="text-lg">📝</span>
            </div>
            <div className="flex-1">
              <div className={`font-medium mb-2 text-slate-900 dark:text-slate-100 transition-all ${checkedTodos.has(1) ? 'line-through text-gray-400 dark:text-slate-500' : ''}`}>
                Update project documentation
              </div>
              {!checkedTodos.has(1) && (
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>📅 Mon Dec 18</span>
                  <span>⏰ Due: Wed Dec 19</span>
                  <span>📧 Project Documentation</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <input
                type="checkbox"
                checked={checkedTodos.has(1)}
                onChange={() => handleTodoToggle(1)}
                className="w-5 h-5 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                style={{ accentColor: '#16a34a' }}
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Events Timeline */}
      <div ref={eventsRef} data-home-section="events">
        <h3 className="font-semibold mb-1 text-slate-900 dark:text-slate-100">
          <HoverTypingTooltip text="Calendar meetings and appointments." speed={35}>
            Events
          </HoverTypingTooltip>
        </h3>
        <ul className="space-y-2">
          <li className="group flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">📅</span>
              <span className="font-medium truncate text-slate-900 dark:text-slate-100">Team Standup</span>
            </div>
            <div className="w-full sm:w-40 text-left sm:text-right text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap sm:ml-16">
              10:00 AM - 10:30 AM
            </div>
            <div className="w-6 text-center flex-shrink-0">
              <span className="text-red-500 text-lg" title="Clashes with: Client Meeting">
                ⚠️
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap min-w-0 w-full sm:w-auto">
              <span className="px-2 py-0.5 rounded text-xs whitespace-nowrap flex-shrink-0 bg-blue-100 text-blue-800">
                Google
              </span>
              <span className="px-2 py-1 text-xs rounded font-medium border bg-blue-50 text-blue-700 border-blue-200">
                user@gmail.com
              </span>
            </div>
          </li>
          <li className="group flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">📅</span>
              <span className="font-medium truncate text-slate-900 dark:text-slate-100">Client Meeting</span>
            </div>
            <div className="w-full sm:w-40 text-left sm:text-right text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap sm:ml-16">
              10:15 AM - 11:00 AM
            </div>
            <span className="text-red-500 text-lg" title="Clashes with: Client Meeting">
                ⚠️
             </span>
            <div className="flex items-center gap-2 flex-wrap min-w-0 w-full sm:w-auto">
              <span className="px-2 py-0.5 rounded text-xs whitespace-nowrap flex-shrink-0 bg-purple-100 text-purple-800">
                Outlook
              </span>
              <span className="px-2 py-1 text-xs rounded font-medium border bg-purple-100 text-purple-800 border-purple-200">
                user@outlook.com
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
