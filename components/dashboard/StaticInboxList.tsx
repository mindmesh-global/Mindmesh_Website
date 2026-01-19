'use client';

import { useState, useRef, useEffect } from 'react';

export function StaticInboxList() {
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accounts = [
    'All Accounts',
    'user@gmail.com',
    'user@outlook.com',
    'user@smtp.com'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 dark:ring-slate-700 p-6 transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-6 w-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-bold text-black">
                  Inbox
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  2 Emails today
                </span>
              </div>
              <p className="text-xs text-black mt-1">
                Last refreshed: Dec 16, 2:30:45 PM
              </p>

              <div className="flex items-center gap-2 mt-2 ">
              <span className="px-2 py-1 text-xs rounded font-medium border bg-blue-50 text-blue-700 border-blue-200">
                user@gmail.com
              </span>
              <span className="px-2 py-1 text-xs rounded font-medium border bg-purple-100 text-purple-800 border-purple-200">
                user@outlook.com
              </span>
              </div>

            </div>
            
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-10">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by email..."
                className="h-8 pl-8 pr-4 border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"/>
            </div>
            <button className="h-10 w-30 border-none rounded-full bg-blue-500 text-white text-sm font-medium cursor-pointer px-4 py-2 flex items-center justify-center gap-2">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
          {/* Custom Dropdown Filter */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-40 pl-3 pr-8 border border-slate-200 rounded-md bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex items-center justify-between min-w-[240px] hover:border-slate-300 transition-colors"
            >
              <span>{selectedAccount}</span>
              <svg 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden">
                {accounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAccount(account);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      account === selectedAccount
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-900 hover:bg-gray-50 font-normal'
                    }`}
                  >
                    {account}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-semibold flex-shrink-0">
              G
            </div>
            <div className="flex-1 min-w-0">

              <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-black mb-1">Project Update Request</p>
              <span className="px-2 py-1 text-xs rounded font-medium border bg-blue-50 text-blue-700 border-blue-200">
                user@gmail.com
              </span>
                
              </div>

              <div className="flex items-center gap-2 mb-2 justify-between">
                  <span className="text-xs text-black">user@gmail.com</span>
                  <span className="text-xs text-black flex items-end ">Dec 16, 1:45 PM</span>
                  
                </div>

              <p className="text-sm text-black line-clamp-2 ">
                Hi, could you please provide an update on the current project status?
              </p>

            </div>
          </div>
        </div>

        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-semibold flex-shrink-0">
              O
            </div>
            <div className="flex-1 min-w-0">

              <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-black mb-1">Design Review Meeting</p>
              <span className="px-2 py-1 text-xs rounded font-medium border bg-purple-100 text-purple-800 border-purple-200">
                user@outlook.com
              </span>
                
              </div>

              <div className="flex items-center gap-2 mb-2 justify-between">
                  <span className="text-xs text-black">user@outlook.com</span>
                  <span className="text-xs text-black flex items-end "> Dec 16, 1:45 PM</span>
                </div>

              <p className="text-sm text-black line-clamp-2">
              Let&apos;s schedule a design review for the new feature mockups.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
