"use client";

import type {
  ResultBlock,
  RichTextBlock,
  ListBlock,
  StatsBlock,
  LinksBlock,
  ContactBlock,
  CardsBlock,
} from "@/lib/types";
import { KNOWN_BLOCK_TYPES } from "@/lib/types";

const ICONS = ["check", "star", "bulb", "atom", "layers", "compass"] as const;
type IconName =
  | (typeof ICONS)[number]
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "user"
  | "dot";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5-5.9-3.4-5.9 3.4 1.3-6.5-4.9-4.5 6.6-.7z" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.5 10.9c.5.4.9 1 .9 1.6V16h5.2v-1.5c0-.6.4-1.2.9-1.6A6 6 0 0 0 12 2z" />
        </svg>
      );
    case "atom":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5-10-5z" />
          <path d="M2 13l10 5 10-5M2 8l0 5M22 8l0 5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 6-6 2 2-6z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "dot":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

function iconForLabel(label: string): IconName {
  const l = label.toLowerCase();
  if (l.includes("phone") || l.includes("mobile") || l.includes("contact no")) return "phone";
  if (l.includes("email") || l.includes("mail")) return "mail";
  if (l.includes("location") || l.includes("address") || l.includes("room") || l.includes("office"))
    return "pin";
  if (l.includes("time") || l.includes("hour") || l.includes("available")) return "clock";
  if (l.includes("name") || l.includes("contact person")) return "user";
  return "dot";
}

function getInitials(name: string): string {
  const cleaned = name.replace(/\b(Dr|Mr|Ms|Mrs|Prof)\.?\s*/gi, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ResultBlocks({
  blocks,
  visibleCount,
}: {
  blocks: ResultBlock[];
  visibleCount: number;
}) {
  return (
    <div className="flex flex-col gap-10">
      {blocks.slice(0, visibleCount).map((block, i) => (
        <div key={i} className="animate-inkReveal">
          <BlockRenderer block={block} />
        </div>
      ))}
    </div>
  );
}

function SectionLabel({
  children,
  isNew,
}: {
  children: React.ReactNode;
  isNew?: boolean;
}) {
  return (
    <h3 className="font-display text-lg sm:text-xl text-heading font-medium mb-4 flex items-center gap-2.5">
      {children}
      {isNew && (
        <span className="text-[9.5px] font-mono font-normal uppercase tracking-[0.14em] text-cyan border border-cyan/40 rounded-full px-2 py-0.5 bg-cyan/10">
          New field
        </span>
      )}
    </h3>
  );
}

function BlockRenderer({ block }: { block: ResultBlock }) {
  const isKnown = KNOWN_BLOCK_TYPES.includes(block.type as (typeof KNOWN_BLOCK_TYPES)[number]);

  if (block.type === "richtext") {
    const b = block as RichTextBlock;
    return (
      <div className="panel-card rounded-xl px-6 py-6 sm:px-8 sm:py-7">
        <h3 className="font-display text-lg sm:text-xl text-heading font-medium">
          {b.heading}
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-body">{b.body}</p>
        {b.bullets && b.bullets.length > 0 && (
          <ul className="mt-4 pt-4 border-t border-rule space-y-2">
            {b.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2.5 text-[13.5px] text-body">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (block.type === "list") {
    const b = block as ListBlock;
    return (
      <div>
        <SectionLabel>{b.heading}</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {b.items.map((item, i) => (
            <div key={i} className="panel-card rounded-xl px-5 py-5">
              <div className="w-8 h-8 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center text-amber mb-3">
                <Icon name={ICONS[i % ICONS.length]} />
              </div>
              <p className="text-[13.5px] text-heading font-medium leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "stats") {
    const b = block as StatsBlock;
    return (
      <div>
        <SectionLabel>{b.heading}</SectionLabel>
        <div className="panel-card rounded-xl px-6 py-6 sm:px-8 sm:py-7">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
            {b.items.map((stat, i) => (
              <div key={i} className="border-t-2 border-amber/70 pt-2.5">
                <div className="font-display text-2xl sm:text-3xl text-amber font-semibold [text-shadow:0_0_18px_rgba(240,169,78,0.35)]">
                  {stat.value}
                </div>
                <div className="text-[12px] text-muted leading-snug mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "contact") {
    const b = block as ContactBlock;
    return (
      <div>
        <SectionLabel>{b.heading}</SectionLabel>
        <div className="panel-card rounded-xl divide-y divide-rule/70">
          {b.items.map((item, i) => {
            const iconName = iconForLabel(item.label);
            const content = (
              <>
                <div className="w-9 h-9 rounded-full bg-cyan/10 border border-cyan/35 flex items-center justify-center text-cyan shrink-0">
                  <Icon name={iconName} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </div>
                  <div className="text-[14px] text-heading font-medium mt-0.5 truncate">
                    {item.value}
                  </div>
                </div>
              </>
            );
            return item.href ? (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-3.5 px-5 py-4 hover:bg-cyan/5 transition-colors"
              >
                {content}
              </a>
            ) : (
              <div key={i} className="flex items-center gap-3.5 px-5 py-4">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (block.type === "cards") {
    const b = block as CardsBlock;
    return (
      <div>
        <SectionLabel>{b.heading}</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          {b.items.map((card, i) => (
            <div key={i} className="panel-card rounded-xl px-5 py-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center text-amber font-mono text-[12px] font-semibold shrink-0">
                  {getInitials(card.title)}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-heading font-medium leading-snug">
                    {card.title}
                  </p>
                  <p className="text-[13px] text-muted leading-relaxed mt-1.5">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "links") {
    const b = block as LinksBlock;
    return (
      <div>
        {b.heading && <SectionLabel>{b.heading}</SectionLabel>}
        <div className="flex flex-wrap gap-2.5">
          {b.items.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[13px] text-body border border-rule rounded-full px-4 py-2 hover:border-amber/60 hover:bg-amber/10 transition-colors"
            >
              {link.label}
              <span className="text-amber transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }
  return <GenericBlock block={block as Record<string, unknown>} isNew={!isKnown} />;
}

function GenericBlock({ block, isNew }: { block: Record<string, unknown>; isNew: boolean }) {
  const heading =
    typeof block.heading === "string"
      ? block.heading
      : `Section: ${String(block.type ?? "unknown")}`;
  const items = Array.isArray(block.items) ? (block.items as unknown[]) : null;
  const body = typeof block.body === "string" ? block.body : null;

  return (
    <div>
      <SectionLabel isNew={isNew}>{heading}</SectionLabel>

      {body && (
        <div className="panel-card rounded-xl px-6 py-6 sm:px-8 sm:py-7 mb-4">
          <p className="text-[14.5px] leading-relaxed text-body">{body}</p>
        </div>
      )}

      {items && items.length > 0 && <GenericItems items={items} />}

      {!items && !body && (
        <div className="panel-card rounded-xl px-6 py-5">
          <pre className="text-[12px] font-mono text-body whitespace-pre-wrap break-words">
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function GenericItems({ items }: { items: unknown[] }) {
  const first = items[0];

  // array of plain strings -> chip grid
  if (typeof first === "string") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(items as string[]).map((item, i) => (
          <div key={i} className="panel-card rounded-xl px-5 py-5">
            <div className="w-8 h-8 rounded-full bg-cyan/10 border border-cyan/35 flex items-center justify-center text-cyan mb-3">
              <Icon name="dot" />
            </div>
            <p className="text-[13.5px] text-heading font-medium leading-snug">{item}</p>
          </div>
        ))}
      </div>
    );
  }

  if (first && typeof first === "object") {
    const obj = first as Record<string, unknown>;

    // label/value(/href) -> data rows
    if ("label" in obj && "value" in obj) {
      return (
        <div className="panel-card rounded-xl divide-y divide-rule/70">
          {(items as { label: string; value: string; href?: string }[]).map((item, i) => (
            <div key={i} className="flex items-center gap-3.5 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-cyan/10 border border-cyan/35 flex items-center justify-center text-cyan shrink-0">
                <Icon name={iconForLabel(item.label)} />
              </div>
              <div className="min-w-0">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-muted">
                  {item.label}
                </div>
                <div className="text-[14px] text-heading font-medium mt-0.5 truncate">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // title/description -> card grid
    if ("title" in obj && "description" in obj) {
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {(items as { title: string; description: string }[]).map((card, i) => (
            <div key={i} className="panel-card rounded-xl px-5 py-5">
              <p className="text-[14px] text-heading font-medium leading-snug">{card.title}</p>
              <p className="text-[13px] text-muted leading-relaxed mt-1.5">{card.description}</p>
            </div>
          ))}
        </div>
      );
    }

    // label/url -> link pills
    if ("label" in obj && "url" in obj) {
      return (
        <div className="flex flex-wrap gap-2.5">
          {(items as { label: string; url: string }[]).map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-body border border-rule rounded-full px-4 py-2 hover:border-amber/60 hover:bg-amber/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      );
    }
  }

  // unrecognized item shape — show raw so nothing is lost
  return (
    <div className="panel-card rounded-xl px-6 py-5">
      <pre className="text-[12px] font-mono text-body whitespace-pre-wrap break-words">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}
