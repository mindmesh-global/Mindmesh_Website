'use client';

import { useEffect, useState, type RefObject } from 'react';
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
} from 'lucide-react';
import { useSectionHover } from '@/context/SectionHoverContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';

type AttentionCardId = 'now' | 'later_today' | 'quietly_handled';

function getAttentionGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 4) return 'Hello, User!';
  if (hour < 12) return 'Good morning, User!';
  if (hour < 17) return 'Good afternoon, User!';
  return 'Good evening, User!';
}

const CARDS: {
  id: AttentionCardId;
  title: string;
  description: string;
  accent: string;
  accentBorder: string;
  iconBg: string;
  Icon: typeof Bell;
  badge?: string;
  handledItems?: { text: string; detail?: string }[];
  handledSummary?: string;
  nowItems?: {
    kind: 'email' | 'calendar';
    tag: string;
    context: string;
    message: string;
  }[];
}[] = [
  {
    id: 'now',
    title: 'Now',
    description: 'Urgent items that need your immediate attention',
    accent: 'text-red-700',
    accentBorder: 'border-red-200',
    iconBg: 'bg-red-50 text-red-600 ring-1 ring-red-100',
    Icon: Bell,
    badge: '2 items',
    nowItems: [
      {
        kind: 'email',
        tag: 'Email',
        context: 'Urgent — join the meeting call now',
        message: 'Leadership stand-up moved to 2:15 PM — dial in ASAP',
      },
      {
        kind: 'calendar',
        tag: 'Calendar',
        context: 'Starts in 10 minutes — room link inside',
        message: 'Board review with investors — join Zoom now',
      },
    ],
  },
  {
    id: 'later_today',
    title: 'Later Today',
    description: 'All other ranked items for today',
    accent: 'text-purple-600',
    accentBorder: 'border-purple-200',
    iconBg: 'bg-violet-50 text-purple-600 ring-1 ring-purple-100 bg-purple-50',
    Icon: Clock,
  },
  {
    id: 'quietly_handled',
    title: 'Quietly Handled',
    description: 'Completed or archived items',
    accent: 'text-green-500',
    accentBorder: 'border-green-200',
    iconBg: 'bg-teal-50 text-green-600 ring-1 ring-green-100 bg-green-50',
    Icon: CheckCircle2,
    badge: '3 items',
    handledSummary: '3 low-signal items filtered',
    handledItems: [
      {
        text: 'That "Reply All" draft? Gone before anyone saw it.',
    
      },
      {
        text: 'Newsletter pile → archived. Your inbox breathes again.',
     
      },
      {
        text: 'Snoozed "Water the plants" to Sunday. Future-you approved.',
       
      },
    ],
  },
];

interface AttentionSectionProps {
  attentionRef?: RefObject<HTMLDivElement | null>;
}

export function AttentionSection({ attentionRef }: AttentionSectionProps) {
  const [expanded, setExpanded] = useState<Set<AttentionCardId>>(new Set(['now']));
  const [greeting, setGreeting] = useState('Hello, User!');
  const sectionHover = useSectionHover();

  useEffect(() => {
    setGreeting(getAttentionGreeting());
  }, []);

  const createSectionHandlers = (sectionId: HomeSectionId, ref: RefObject<HTMLDivElement | null> | undefined) => ({
    onMouseEnter: () => {
      const rect = ref?.current?.getBoundingClientRect();
      if (rect) sectionHover?.setHoveredSection(sectionId, rect);
    },
    onMouseLeave: () => sectionHover?.clearHoveredSection(),
  });

  const sectionHighlight = (id: HomeSectionId) =>
    sectionHover?.hoveredSectionId === id ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]' : '';

  const toggle = (id: AttentionCardId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      ref={attentionRef}
      data-home-section="attention"
      className={`mb-4 relative z-[100] transition-all duration-200 rounded-xl cursor-default ${sectionHighlight('attention')}`}
      {...createSectionHandlers('attention', attentionRef)}
    >
      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm dark:border-gray-600 dark:bg-gray-800/60">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Attention
        </p>
        <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          {greeting} 👋
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here&apos;s what needs your attention.
        </p>

        <div className="mt-4 space-y-3">
          {CARDS.map((card) => {
            const isOpen = expanded.has(card.id);
            const { Icon } = card;

            const borderAccent =
              card.id === 'now'
                ? 'border-l-red-500'
                : card.id === 'later_today'
                  ? 'border-l-violet-500'
                  : 'border-l-teal-500';

            return (
              <div
                key={card.id}
                className={`overflow-hidden rounded-lg border border-l-4 bg-white shadow-sm dark:bg-gray-800 ${borderAccent} ${card.accentBorder} dark:border-gray-600`}
              >
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-700/40"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${card.accent}`}>
                      {card.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                      {card.description}
                    </span>
                  </span>
                  {card.badge && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        card.id === 'now'
                          ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                          : 'border border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-300'
                      }`}
                    >
                      {card.badge}
                    </span>
                  )}
                  <span className="shrink-0 text-gray-400" aria-hidden>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {isOpen && card.handledItems && (
                  <div className="border-t border-green-100 bg-green-50/40 py-2.5 pl-16 pr-5 dark:border-green-900/40 dark:bg-green-950/20">
                    {card.handledSummary && (
                      <div className="-ml-12 mb-2.5 flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex shrink-0 items-center justify-center rounded border border-gray-300/90 bg-gray-200 font-medium text-gray-900"
                          style={{
                            fontSize: '12px',
                            lineHeight: '11px',
                            padding: '1px 5px',
                            color: 'grey',
                          }}
                        >
                          System
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {card.handledSummary}
                        </span>
                      </div>
                    )}
                    <ul>
                    {card.handledItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 border-b border-green-100/80 py-2 last:border-b-0 last:pb-0 first:pt-0 dark:border-green-900/30"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500"
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <p className="text-xs leading-snug text-gray-700 dark:text-gray-200">
                            {item.text}
                          </p>
                          {item.detail && (
                            <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                              {item.detail}
                            </p>
                          )}
                        </span>
                      </li>
                    ))}
                    </ul>
                  </div>
                )}

                {isOpen && card.nowItems && (
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    {card.nowItems.map((item, index) => {
                      const isCalendar = item.kind === 'calendar';
                      const ItemIcon = isCalendar ? Calendar : Mail;
                      const tagStyle = isCalendar
                        ? {
                            backgroundColor: '#E8F5E9',
                            borderColor: '#A5D6A7',
                            color: '#2E7D32',
                          }
                        : {
                            backgroundColor: '#F3E5F5',
                            borderColor: '#CE93D8',
                            color: '#4A148C',
                          };
                      const iconCircleClass = isCalendar
                        ? 'bg-green-50 text-green-600 ring-1 ring-green-100 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-900/50'
                        : 'bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/50';

                      return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 py-3.5 pl-9 pr-4 ${
                          index < card.nowItems!.length - 1
                            ? 'border-b border-gray-100 dark:border-gray-700'
                            : ''
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconCircleClass}`}
                        >
                          <ItemIcon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="inline-flex shrink-0 origin-left scale-[0.82]"
                            >
                              <span
                                className="inline-flex items-center rounded-full border px-1.5 py-px font-medium"
                                style={{
                                  fontSize: '11px',
                                  lineHeight: '12px',
                                  ...tagStyle,
                                }}
                              >
                                {item.tag}
                              </span>
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.context}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {item.message}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-lg border-0 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                          style={{
                            background: 'linear-gradient(90deg, #e53935 0%,rgb(244, 166, 89) 100%)',
                          }}
                        >
                          Open
                        </button>
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Last updated: Today, 10:18 AM</span>
        </div>
      </div>
    </div>
  );
}
