'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { HoverTypingTooltip } from '@/components/ui/HoverTypingTooltip';
import { useSectionHover } from '@/context/SectionHoverContext';
import {
  INBOX_FIXTURES_ACME,
  type InboxEmailSource,
  type InboxMessageFixture,
} from '@/lib/marketing-demo-data';

const INBOX_SOURCE_ICONS: Record<InboxEmailSource, string> = {
  Gmail: '/images/icons/gmail.png',
  'Outlook Email': '/images/icons/outlook.png',
  'SMTP Mailbox': '/images/icons/smtp.png',
};

type BodyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'signature'; text: string };

interface InboxMessage {
  id: string;
  from: string;
  fromEmail?: string;
  to?: string;
  subject: string;
  preview: string;
  fullBody: BodyBlock[];
  avatar: string;
  date: string;
  accountTag: string;
  accountStyle: string;
}

const MESSAGES: InboxMessage[] = [
  {
    id: '1',
    from: 'Sarah Chen',
    fromEmail: 'sarah.chen@gmail.com',
    to: 'me@mindmesh.com',
    subject: 'Project Update Request',
    preview: 'Hi, could you please provide an update on the current project status?',
    fullBody: [
      { type: 'paragraph', text: 'Hi,' },
      { type: 'paragraph', text: 'Could you please provide an update on the current project status? We need to present the progress to stakeholders by end of week. Please include:' },
      { type: 'list', items: ['Timeline for remaining tasks', 'Any blockers or dependencies', 'Resource allocation status'] },
      { type: 'paragraph', text: 'Looking forward to your response.' },
      { type: 'signature', text: 'Thanks,\nSarah Chen\nProject Manager' },
    ],
    avatar: 'SC',
    date: 'Dec 16, 1:45 PM',
    accountTag: 'user@gmail.com',
    accountStyle: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  },
  {
    id: '2',
    from: 'Oliver Park',
    fromEmail: 'oliver.park@outlook.com',
    to: 'me@mindmesh.com',
    subject: 'Design Review Meeting',
    preview: "Let's schedule a design review for the new feature mockups.",
    fullBody: [
      { type: 'paragraph', text: 'Hi,' },
      { type: 'paragraph', text: "Let's schedule a design review for the new feature mockups. I've prepared the UI updates for the dashboard and would like your feedback before we move to development." },
      { type: 'paragraph', text: "I've attached:" },
      { type: 'list', items: ['Dashboard redesign mockups', 'Mobile responsive layouts', 'Updated component library'] },
      { type: 'paragraph', text: "Can we meet tomorrow afternoon? I'm free between 2–4 PM." },
      { type: 'signature', text: 'Best,\nOliver Park\nLead Designer' },
    ],
    avatar: 'OP',
    date: 'Dec 16, 1:45 PM',
    accountTag: 'user@outlook.com',
    accountStyle: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  },
];

export type StaticInboxListProps = {
  variant?: 'dashboard' | 'marketing';
  messages?: readonly InboxMessageFixture[];
  maxRows?: number;
  interactive?: boolean;
  dimmed?: boolean;
  highlightIds?: readonly string[];
  className?: string;
};

function DashboardInboxListPanel() {
  const sectionHover = useSectionHover();
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accounts = ['All Accounts', 'user@gmail.com', 'user@outlook.com', 'user@smtp.com'];

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-gray-100 dark:ring-gray-700 p-6 transition-shadow text-gray-900 dark:text-gray-100">
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  <HoverTypingTooltip text="Your unified email inbox." speed={35} controlledHover={sectionHover?.hoveredSectionId === 'inbox'}>
                    Inbox
                  </HoverTypingTooltip>
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  2 Emails today
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Last refreshed: Dec 16, 2:30:45 PM</p>
              <div className="flex items-center gap-2 mt-2 ">
                <span className="px-2 py-1 text-xs rounded font-medium border bg-blue-50 text-blue-700 border-blue-200">user@gmail.com</span>
                <span className="px-2 py-1 text-xs rounded font-medium border bg-purple-100 text-purple-800 border-purple-200">user@outlook.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-10">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by email..."
                className="h-8 pl-8 pr-4 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <button type="button" className="h-10 w-30 border-none rounded-full bg-blue-500 text-white text-sm font-medium cursor-pointer px-4 py-2 flex items-center justify-center gap-2">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-40 pl-3 pr-8 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex items-center justify-between min-w-[240px] hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
            >
              <span>{selectedAccount}</span>
              <svg className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen ? (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50 overflow-hidden">
                {accounts.map((account) => (
                  <button
                    key={account}
                    type="button"
                    onClick={() => {
                      setSelectedAccount(account);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      account === selectedAccount
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 font-normal'
                    }`}
                  >
                    {account}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {MESSAGES.map((msg) => {
          const isExpanded = expandedId === msg.id;
          const hasTo = Boolean(msg.to);
          return (
            <div
              key={msg.id}
              onClick={() => setExpandedId(isExpanded ? null : msg.id)}
              className={`border rounded-lg transition-all cursor-pointer overflow-hidden ${
                isExpanded
                  ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 border-blue-200 dark:border-blue-800 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {!isExpanded ? (
                <div className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{msg.subject}</p>
                      <span className={`px-2 py-1 text-xs rounded-md font-medium border flex-shrink-0 ${msg.accountStyle}`}>{msg.accountTag}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{msg.from}</span>
                      <span>{msg.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{msg.preview}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800/50">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-semibold flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm shadow-md">
                        {msg.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-0.5">{msg.subject}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-gray-500 dark:text-gray-400">From:</span> {msg.from} &lt;{msg.fromEmail ?? msg.from}&gt;
                        </p>
                        {hasTo ? (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                            <span className="font-medium text-gray-500 dark:text-gray-400">To:</span> {msg.to}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`px-2.5 py-1 text-xs rounded-md font-medium border ${msg.accountStyle}`}>{msg.accountTag}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{msg.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-5">
                    <div className="max-w-none space-y-4">
                      {msg.fullBody.map((block, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          {block.type === 'paragraph' ? (
                            <p className="text-gray-700 dark:text-gray-200 leading-relaxed m-0">{block.text}</p>
                          ) : null}
                          {block.type === 'list' ? (
                            <ul className="mt-2 mb-0 pl-5 space-y-1 text-gray-700 dark:text-gray-200 leading-relaxed list-disc">
                              {(block.items ?? []).map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                          {block.type === 'signature' ? (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap m-0 italic">{block.text}</p>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Click anywhere to collapse</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type MarketingInboxListPanelProps = {
  messages: readonly InboxMessageFixture[];
  maxRows: number;
  interactive: boolean;
  dimmed: boolean;
  highlightIds: readonly string[];
  className?: string;
};

function MarketingInboxListPanel({
  messages,
  maxRows,
  interactive,
  dimmed,
  highlightIds,
  className,
}: MarketingInboxListPanelProps) {
  const rows = messages.slice(0, maxRows);
  const unreadCount = rows.filter((message) => message.unread).length;

  return (
    <div
      className={`rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 transition-opacity ${className ?? ''}`}
      data-marketing-inbox
      data-inbox-interactive={interactive ? 'true' : 'false'}
      data-inbox-dimmed={dimmed ? 'true' : 'false'}
      style={{ opacity: dimmed ? 0.35 : 1 }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-mm-on-background">Inbox</h3>
        {unreadCount > 0 ? (
          <span className="rounded-full bg-mm-primary-container/30 px-2 py-0.5 text-[11px] font-medium text-mm-primary">
            {unreadCount} unread
          </span>
        ) : null}
      </div>
      <div className="space-y-2">
        {rows.map((message) => {
          const highlighted = highlightIds.includes(message.id) || message.highlight;
          return (
            <div
              key={message.id}
              data-inbox-message-id={message.id}
              data-inbox-highlight={highlighted ? 'true' : 'false'}
              className={`flex gap-2.5 rounded-lg border px-3 py-2.5 ${
                highlighted
                  ? 'border-mm-primary/50 bg-mm-surface-container-high ring-1 ring-mm-primary/30'
                  : 'border-mm-outline-variant/50 bg-mm-surface-container-high'
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mm-surface-container-highest">
                <Image
                  src={INBOX_SOURCE_ICONS[message.source]}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-medium text-mm-on-background">
                    {message.subject}
                  </p>
                  <span className="shrink-0 text-[10px] font-medium text-mm-on-surface-variant">
                    {message.source}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <p className="truncate text-xs text-mm-on-surface-variant">{message.from}</p>
                  {message.unread ? (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-mm-primary"
                      aria-label="Unread"
                    />
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-mm-on-surface-variant/80">
                  {message.preview}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StaticInboxList({
  variant = 'dashboard',
  messages = INBOX_FIXTURES_ACME,
  maxRows = 3,
  interactive = false,
  dimmed = false,
  highlightIds = [],
  className,
}: StaticInboxListProps = {}) {
  if (variant === 'dashboard') {
    return <DashboardInboxListPanel />;
  }

  return (
    <MarketingInboxListPanel
      messages={messages}
      maxRows={maxRows}
      interactive={interactive}
      dimmed={dimmed}
      highlightIds={highlightIds}
      className={className}
    />
  );
}
