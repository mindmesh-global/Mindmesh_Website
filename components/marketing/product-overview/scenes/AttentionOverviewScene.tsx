'use client';

import { AlertTriangle, ChevronDown, ChevronRight, ExternalLink, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import {
  ATTENTION_BOARD_FIXTURES_ACME,
  type AttentionBoardFixture,
  type AttentionCardFixture,
  type AttentionDossierFixture,
  type AttentionEvidenceFixture,
  type AttentionSourceLabel,
  type ProductOverviewSceneId,
  type QuietRowFixture,
} from '@/lib/marketing-product-overview-data';

const SOURCE_ICON_BY_LABEL: Record<AttentionSourceLabel, string | undefined> = {
  Gmail: MARKETING_INTEGRATIONS.find((app) => app.id === 'gmail')?.iconSrc,
  'Google Calendar': MARKETING_INTEGRATIONS.find((app) => app.id === 'google-calendar')
    ?.iconSrc,
  Jira: MARKETING_INTEGRATIONS.find((app) => app.id === 'jira')?.iconSrc,
  Slack: MARKETING_INTEGRATIONS.find((app) => app.id === 'slack')?.iconSrc,
  'Outlook Email': MARKETING_INTEGRATIONS.find((app) => app.id === 'outlook-email')
    ?.iconSrc,
  'Outlook Calendar': MARKETING_INTEGRATIONS.find((app) => app.id === 'outlook-calendar')
    ?.iconSrc,
  'SMTP Mailbox': MARKETING_INTEGRATIONS.find((app) => app.id === 'smtp')?.iconSrc,
};

type OpenButtonState = 'idle' | 'cue' | 'press';
type DossierMotion = 'enter' | 'open' | 'exit' | null;
type TourFocus = 'open' | 'later' | 'quietly' | null;

const TOUR_HINTS: Record<Exclude<TourFocus, null>, string> = {
  open: 'Open the dossier to see every connected source behind this priority.',
  later: 'Later Today holds ranked work that can wait until after Now.',
  quietly: 'Quietly Handled shows noise MindMesh already filed for you.',
};

function SourceBadge({ label }: { label: AttentionSourceLabel }) {
  const iconSrc = SOURCE_ICON_BY_LABEL[label];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-mm-outline-variant/70 bg-mm-surface px-2.5 py-1 text-[11px] text-mm-on-surface-variant">
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="" width={12} height={12} className="h-3 w-3" />
      ) : null}
      {label}
    </span>
  );
}

function SourceGlyph({ label }: { label: AttentionSourceLabel }) {
  const iconSrc = SOURCE_ICON_BY_LABEL[label];
  if (iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconSrc} alt="" className="h-full w-full object-cover" />
    );
  }
  return (
    <span className="text-xs font-semibold text-mm-primary">{label.charAt(0)}</span>
  );
}

function AttentionActionCard({
  card,
  weight,
  onOpen,
  openState = 'idle',
  tourFocus = false,
}: {
  card: AttentionCardFixture;
  weight: 'now' | 'later';
  onOpen?: () => void;
  openState?: OpenButtonState;
  tourFocus?: boolean;
}) {
  const isNow = weight === 'now';
  const isAnchor = Boolean(card.isAnchor);

  return (
    <article
      className={[
        'relative overflow-hidden rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container-high',
        isNow ? 'p-3.5 md:p-4' : 'p-3 opacity-95',
        isAnchor ? 'border-l-4 border-l-mm-primary-fixed' : '',
      ].join(' ')}
      data-attention-card={card.id}
      data-attention-weight={weight}
      data-attention-anchor={isAnchor ? 'true' : 'false'}
      data-attention-tour-focus={tourFocus ? 'true' : undefined}
      data-attention-tour-anchor={tourFocus ? 'open' : undefined}
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
          <SourceGlyph label={card.sourceLabel} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={[
                'font-semibold text-mm-on-surface',
                isNow ? 'text-sm md:text-base' : 'text-sm',
              ].join(' ')}
            >
              {card.title}
            </h4>
          </div>
          {card.summary ? (
            <p className="mt-1 text-xs text-mm-on-surface-variant md:text-sm">
              {card.summary}
            </p>
          ) : null}
          <p
            className={[
              'mt-2 leading-relaxed text-mm-on-surface-variant',
              isNow ? 'text-sm' : 'text-xs',
            ].join(' ')}
          >
            <span className="font-medium text-mm-on-surface">Why now: </span>
            {card.whyNow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {card.sourceApps.map((source) => (
                <SourceBadge key={`${card.id}-${source}`} label={source} />
              ))}
            </div>
            {onOpen ? (
              <div className="ml-auto flex flex-col items-end gap-1">
                <button
                  type="button"
                  onClick={onOpen}
                  data-attention-open={card.id}
                  data-attention-open-state={openState}
                  data-attention-tour-anchor="open-button"
                  aria-label="Open Dossier"
                  title="Open Dossier"
                  className={[
                    'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md px-3.5 text-xs font-semibold transition-[background-color,box-shadow,transform]',
                    'bg-mm-primary text-mm-on-primary ring-2 ring-mm-primary/40',
                    'hover:brightness-110 focus-visible:outline-none focus-visible:ring-mm-primary',
                  ].join(' ')}
                >
                  Open Dossier
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
                <span className="text-[10px] font-medium text-mm-primary">
                  Opens a separate dossier window
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function evidenceDeepLinkScene(
  kind: AttentionEvidenceFixture['kind']
): ProductOverviewSceneId | null {
  switch (kind) {
    case 'email':
      return 3;
    case 'calendar':
      return 2;
    case 'slack':
    case 'jira':
      return 5;
    default:
      return null;
  }
}

function EvidenceRow({
  item,
  onOpenDeepLink,
}: {
  item: AttentionEvidenceFixture;
  onOpenDeepLink?: (item: AttentionEvidenceFixture) => void;
}) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-xl border border-mm-outline-variant/50 bg-mm-surface-container px-3 py-2.5"
      data-attention-evidence={item.id}
      data-attention-evidence-kind={item.kind}
    >
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
        <SourceGlyph label={item.source} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-mm-on-surface">{item.title}</p>
          <span className="text-[10px] font-medium uppercase tracking-wide text-mm-on-surface-variant">
            {item.source}
          </span>
        </div>
        {item.meta ? (
          <p className="mt-0.5 text-[11px] text-mm-on-surface-variant">{item.meta}</p>
        ) : null}
        <p className="mt-1 text-xs leading-snug text-mm-on-surface-variant">{item.summary}</p>
      </div>
      <button
        type="button"
        onClick={() => onOpenDeepLink?.(item)}
        className="inline-flex shrink-0 items-center gap-1 self-center rounded-md border border-mm-outline-variant/60 bg-mm-surface px-2.5 py-1.5 text-[11px] font-medium text-mm-primary transition-colors hover:border-mm-primary/40 hover:bg-mm-primary/10"
        data-attention-evidence-link={item.kind}
        title={item.deepLinkLabel}
      >
        <span className="max-w-[7.5rem] truncate sm:max-w-none">{item.deepLinkLabel}</span>
        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
      </button>
    </div>
  );
}

function AttentionDossierPanel({
  dossier,
  onClose,
  motion,
  onOpenDeepLink,
}: {
  dossier: AttentionDossierFixture;
  onClose: () => void;
  motion: Exclude<DossierMotion, null>;
  onOpenDeepLink?: (item: AttentionEvidenceFixture) => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close dossier backdrop"
        data-attention-dossier-veil
        data-attention-dossier-motion={motion}
        className="cursor-default border-0 p-0"
        onClick={onClose}
      />
      <div
        className="flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="attention-dossier-title"
        data-attention-dossier
        data-attention-dossier-shell
        data-attention-dossier-motion={motion}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-mm-primary/25 bg-mm-primary/10 px-3.5 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mm-primary">
              Dossier
            </p>
            <h4
              id="attention-dossier-title"
              className="mt-0.5 text-sm font-semibold leading-snug text-mm-on-surface md:text-base"
            >
              {dossier.title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-mm-on-surface-variant transition-colors hover:bg-mm-surface-container-high hover:text-mm-on-surface"
            aria-label="Close dossier"
            data-attention-dossier-close
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3.5 py-3.5">
          <section>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-mm-on-surface-variant">
              Summary
            </p>
            <p className="rounded-xl border border-mm-outline-variant/50 bg-mm-surface-container/80 px-3 py-2.5 text-sm leading-relaxed text-mm-on-surface">
              {dossier.summary}
            </p>
          </section>

          <section>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-mm-on-surface-variant">
              Related evidence
            </p>
            <ul className="space-y-2" role="list">
              {dossier.evidence.map((item) => (
                <li key={item.id}>
                  <EvidenceRow item={item} onOpenDeepLink={onOpenDeepLink} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

function QuietHandledRow({
  row,
  forceExpanded,
}: {
  row: QuietRowFixture;
  forceExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const showDetails = forceExpanded || expanded;
  const iconSrc = SOURCE_ICON_BY_LABEL[row.sourceLabel];

  return (
    <div
      className="rounded-lg border border-mm-outline-variant/40 bg-mm-surface-container/80 px-3 py-2.5"
      data-attention-quiet={row.id}
    >
      <button
        type="button"
        className="flex min-h-11 w-full items-center gap-2 text-left"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={showDetails}
      >
        <span className="h-6 w-6 shrink-0 overflow-hidden rounded-md">
          {iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-mm-surface text-[10px] font-semibold text-mm-primary">
              {row.sourceLabel.charAt(0)}
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1 text-sm font-medium text-mm-on-surface">
          {row.label}
        </span>
        <span className="hidden text-xs text-mm-on-surface-variant sm:inline">
          {row.sourceLabel}
        </span>
        {row.count > 1 ? (
          <span className="rounded-full bg-mm-surface px-1.5 py-0.5 text-[10px] tabular-nums text-mm-on-surface-variant">
            {row.count}
          </span>
        ) : null}
        <ChevronDown
          className={[
            'h-3.5 w-3.5 shrink-0 text-mm-on-surface-variant transition-transform',
            showDetails ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>
      {showDetails ? (
        <ul className="mt-2 space-y-1.5 border-t border-mm-outline-variant/30 pt-2">
          {row.detailLines.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-xs leading-relaxed text-mm-on-surface-variant"
            >
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-mm-primary/70"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CollapsibleBoardSection({
  sectionId,
  title,
  count,
  expanded,
  onToggle,
  tourFocus,
  children,
}: {
  sectionId: 'later' | 'quietly';
  title: string;
  count: number;
  expanded: boolean;
  onToggle: () => void;
  tourFocus: boolean;
  children: ReactNode;
}) {
  return (
    <section
      data-attention-section={sectionId === 'later' ? 'later-today' : 'quietly-handled'}
      data-attention-tour-focus={tourFocus ? 'true' : undefined}
      data-attention-tour-anchor={sectionId}
      className="rounded-xl border border-transparent"
    >
      <button
        type="button"
        className={[
          'flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
          tourFocus
            ? 'border-mm-primary/40 bg-mm-primary/10'
            : 'border-mm-outline-variant/50 bg-mm-surface-container/70 hover:border-mm-outline-variant hover:bg-mm-surface-container',
        ].join(' ')}
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-mm-on-surface-variant">
          {title}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[11px] tabular-nums text-mm-on-surface-variant">
            {count}
          </span>
          <ChevronDown
            className={[
              'h-4 w-4 text-mm-on-surface-variant transition-transform',
              expanded ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden
          />
        </span>
      </button>
      {expanded ? <div className="mt-2 space-y-2">{children}</div> : null}
    </section>
  );
}

function OverlapAlert({
  alert,
}: {
  alert: AttentionBoardFixture['overlapAlert'];
}) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-lg border border-mm-error/40 bg-mm-error-container/25 px-3 py-2.5"
      data-attention-overlap={alert.id}
      role="status"
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-mm-error/20 text-mm-error">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-mm-error">{alert.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-mm-on-error-container md:text-sm">
          {alert.detail}
        </p>
      </div>
    </div>
  );
}

export type AttentionOverviewSceneProps = {
  board?: AttentionBoardFixture;
  showOverlapChip?: boolean;
  initialDossierOpen?: boolean;
  /** @deprecated Use playGuidedTour */
  playDossierDemo?: boolean;
  /** Guided Attention tour: Open Dossier + Later Today + Quietly Handled. */
  playGuidedTour?: boolean;
  /** Fired once when the auto tour finishes. `completed` is false if the user took over. */
  onGuidedTourComplete?: (completed: boolean) => void;
  /** Jump to another overview scene from dossier deep links. */
  onSelectScene?: (scene: ProductOverviewSceneId) => void;
  className?: string;
};

/**
 * Attention Board overview scene.
 * Guided tour highlights Open Dossier, then expands Later Today and Quietly Handled.
 */
export function AttentionOverviewScene({
  board = ATTENTION_BOARD_FIXTURES_ACME,
  showOverlapChip = true,
  initialDossierOpen = false,
  playDossierDemo = false,
  playGuidedTour,
  onGuidedTourComplete,
  onSelectScene,
  className,
}: AttentionOverviewSceneProps) {
  const runTour = playGuidedTour ?? playDossierDemo;
  const prefersReducedMotion = usePrefersReducedMotion();
  const boardRef = useRef<HTMLDivElement>(null);
  const [dossierOpen, setDossierOpen] = useState(initialDossierOpen);
  const [dossierMotion, setDossierMotion] = useState<DossierMotion>(
    initialDossierOpen ? 'open' : null
  );
  const [openState, setOpenState] = useState<OpenButtonState>('idle');
  const [laterExpanded, setLaterExpanded] = useState(false);
  const [quietlyExpanded, setQuietlyExpanded] = useState(false);
  const [tourFocus, setTourFocus] = useState<TourFocus>(null);
  const [guidePos, setGuidePos] = useState({ x: 24, y: 24 });
  const [hintPos, setHintPos] = useState({ x: 36, y: 48 });
  const [showGuide, setShowGuide] = useState(false);

  const userTookOverRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const demoActiveRef = useRef(false);
  const guideTargetRef = useRef({ x: 24, y: 24 });
  const mouseBlendRef = useRef({ x: 24, y: 24, active: false });
  const completedRef = useRef(false);

  const nowCard = board.now[0];
  const canOpenDossier =
    Boolean(nowCard) && board.dossier.cardId === nowCard?.id;

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const finishTour = useCallback((completed: boolean) => {
    if (completedRef.current) return;
    completedRef.current = true;
    demoActiveRef.current = false;
    setShowGuide(false);
    setTourFocus(null);
    setOpenState('idle');
    onGuidedTourComplete?.(completed);
  }, [onGuidedTourComplete]);

  const markUserTakeover = () => {
    userTookOverRef.current = true;
    demoActiveRef.current = false;
    clearTimers();
    setOpenState('idle');
    setShowGuide(false);
    setTourFocus(null);
    finishTour(false);
  };

  const resolveAnchorPoint = useCallback((anchor: string | null) => {
    const root = boardRef.current;
    if (!root || !anchor) return null;
    const node = root.querySelector<HTMLElement>(
      `[data-attention-tour-anchor="${anchor}"]`
    );
    if (!node) return null;
    const rootRect = root.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    return {
      x: rect.left - rootRect.left + rect.width * 0.72,
      y: rect.top - rootRect.top + rect.height * 0.55,
    };
  }, []);

  const openDossier = (fromDemo = false) => {
    if (!fromDemo) markUserTakeover();
    setDossierOpen(true);
    setDossierMotion(prefersReducedMotion ? 'open' : 'enter');
    if (!prefersReducedMotion) {
      schedule(() => setDossierMotion('open'), 560);
    }
  };

  const closeDossier = (fromDemo = false) => {
    if (!fromDemo) markUserTakeover();
    if (prefersReducedMotion) {
      setDossierOpen(false);
      setDossierMotion(null);
      return;
    }
    setDossierMotion('exit');
    schedule(() => {
      setDossierOpen(false);
      setDossierMotion(null);
    }, 420);
  };

  const handleEvidenceDeepLink = (item: AttentionEvidenceFixture) => {
    const scene = evidenceDeepLinkScene(item.kind);
    markUserTakeover();
    setDossierOpen(false);
    setDossierMotion(null);
    if (scene != null) onSelectScene?.(scene);
  };

  // Smooth guide cursor: lerp toward tour target, gently blend toward mouse when near.
  useEffect(() => {
    if (!showGuide || prefersReducedMotion) return undefined;
    let frame = 0;
    const tick = () => {
      const target = guideTargetRef.current;
      const mouse = mouseBlendRef.current;
      const aim =
        mouse.active
          ? {
              x: target.x * 0.7 + mouse.x * 0.3,
              y: target.y * 0.7 + mouse.y * 0.3,
            }
          : target;
      setGuidePos((prev) => {
        const next = {
          x: prev.x + (aim.x - prev.x) * 0.14,
          y: prev.y + (aim.y - prev.y) * 0.14,
        };
        setHintPos({ x: next.x + 18, y: Math.max(8, next.y - 42) });
        return next;
      });
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [showGuide, prefersReducedMotion]);

  useEffect(() => {
    if (!tourFocus) return;
    const point = resolveAnchorPoint(
      tourFocus === 'open' ? 'open-button' : tourFocus
    );
    if (point) guideTargetRef.current = point;
  }, [tourFocus, laterExpanded, quietlyExpanded, resolveAnchorPoint]);

  useEffect(() => {
    if (!runTour || !canOpenDossier || prefersReducedMotion) {
      if (runTour && prefersReducedMotion) {
        setLaterExpanded(true);
        setQuietlyExpanded(true);
        finishTour(true);
      }
      return undefined;
    }

    userTookOverRef.current = false;
    completedRef.current = false;
    demoActiveRef.current = true;
    clearTimers();
    setDossierOpen(false);
    setDossierMotion(null);
    setLaterExpanded(false);
    setQuietlyExpanded(false);
    setShowGuide(true);
    setTourFocus('open');
    setOpenState('cue');

    const stillDemo = () => demoActiveRef.current && !userTookOverRef.current;

    // Hold on the Open Dossier cue long enough to read the board + hint
    // before the auto-click fires.
    schedule(() => {
      if (!stillDemo()) return;
      setOpenState('press');
    }, 2800);
    schedule(() => {
      if (!stillDemo()) return;
      setOpenState('idle');
      openDossier(true);
    }, 3200);
    schedule(() => {
      if (!stillDemo()) return;
      closeDossier(true);
    }, 8200);
    schedule(() => {
      if (!stillDemo()) return;
      setTourFocus('later');
      setLaterExpanded(true);
    }, 8900);
    schedule(() => {
      if (!stillDemo()) return;
      setTourFocus('quietly');
      setQuietlyExpanded(true);
    }, 11200);
    schedule(() => {
      if (!stillDemo()) return;
      setTourFocus(null);
      setShowGuide(false);
      finishTour(true);
    }, 13800);

    return () => {
      demoActiveRef.current = false;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runTour, canOpenDossier, prefersReducedMotion]);

  return (
    <div
      ref={boardRef}
      className={['relative min-h-[22rem] overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      data-overview-scene="attention"
      data-attention-board
      data-attention-dossier-open={dossierOpen ? 'true' : 'false'}
      data-attention-dossier-motion={dossierMotion ?? undefined}
      data-attention-tour={runTour ? 'true' : 'false'}
      onPointerMove={(event) => {
        const root = boardRef.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        mouseBlendRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          active: demoActiveRef.current,
        };
      }}
      onPointerLeave={() => {
        mouseBlendRef.current.active = false;
      }}
    >
      <div className="space-y-4" data-attention-board-plane>
        {showOverlapChip && board.overlapAlert ? (
          <OverlapAlert alert={board.overlapAlert} />
        ) : null}

        <section data-attention-section="now">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-mm-on-surface-variant">
              Now
            </h4>
            <span className="text-[11px] tabular-nums text-mm-on-surface-variant">
              {board.now.length}
            </span>
          </div>
          <ul className="space-y-2.5" role="list">
            {board.now.map((card) => (
              <li key={card.id}>
                <AttentionActionCard
                  card={card}
                  weight="now"
                  tourFocus={tourFocus === 'open'}
                  openState={
                    canOpenDossier && card.id === board.dossier.cardId
                      ? openState
                      : 'idle'
                  }
                  onOpen={
                    canOpenDossier && card.id === board.dossier.cardId
                      ? () => openDossier(false)
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </section>

        <CollapsibleBoardSection
          sectionId="later"
          title="Later Today"
          count={board.laterToday.length}
          expanded={laterExpanded}
          tourFocus={tourFocus === 'later'}
          onToggle={() => {
            markUserTakeover();
            setLaterExpanded((prev) => !prev);
          }}
        >
          <ul className="space-y-2" role="list">
            {board.laterToday.map((card) => (
              <li key={card.id}>
                <AttentionActionCard card={card} weight="later" />
              </li>
            ))}
          </ul>
        </CollapsibleBoardSection>

        <CollapsibleBoardSection
          sectionId="quietly"
          title="Quietly Handled"
          count={board.quietlyHandled.length}
          expanded={quietlyExpanded}
          tourFocus={tourFocus === 'quietly'}
          onToggle={() => {
            markUserTakeover();
            setQuietlyExpanded((prev) => !prev);
          }}
        >
          <ul className="space-y-2" role="list">
            {board.quietlyHandled.map((row) => (
              <li key={row.id}>
                <QuietHandledRow
                  row={row}
                  forceExpanded={tourFocus === 'quietly'}
                />
              </li>
            ))}
          </ul>
        </CollapsibleBoardSection>
      </div>

      {showGuide && tourFocus ? (
        <>
          <div
            data-attention-guide-cursor
            style={{ left: guidePos.x, top: guidePos.y }}
            aria-hidden
          />
          <div
            data-attention-tour-hint
            style={{
              left: hintPos.x,
              top: hintPos.y,
            }}
            role="status"
          >
            {TOUR_HINTS[tourFocus]}
          </div>
        </>
      ) : null}

      {dossierOpen && dossierMotion ? (
        <AttentionDossierPanel
          dossier={board.dossier}
          motion={
            dossierMotion === 'enter'
              ? 'enter'
              : dossierMotion === 'exit'
                ? 'exit'
                : 'open'
          }
          onClose={() => closeDossier(false)}
          onOpenDeepLink={handleEvidenceDeepLink}
        />
      ) : null}
    </div>
  );
}
