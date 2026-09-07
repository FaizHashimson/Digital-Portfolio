import Image from "next/image";
import type { ReactNode } from "react";

export function Arrow({
  curved = false,
  className = "",
}: {
  curved?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox={curved ? "0 0 180 60" : "0 0 80 30"}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          curved
            ? "M4 41C44 63 113 26 171 20M147 5l27 15-21 23"
            : "M3 16c24 1 48-2 72-1M58 3l18 12-18 12"
        }
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`star ${className}`}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m30 4 5 19 20-3-15 14 5 21-17-12-17 10 5-21L3 22l20 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="button-link"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span aria-hidden="true">↗</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

// Set a source in content.ts when the real portrait and screenshots are ready.
export function ImageFrame({
  label,
  src,
  alt,
  kind = "project",
  className = "",
}: {
  label: string;
  src?: string;
  alt: string;
  kind?: "portrait" | "project";
  className?: string;
}) {
  return (
    <figure
      className={`image-frame image-frame--${kind} ${className}`}
      aria-label={src ? undefined : `${alt} — empty image placeholder`}
    >
      {kind === "project" && (
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>
      )}
      <div className="image-area">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={
              kind === "portrait"
                ? "(max-width: 760px) 85vw, 36vw"
                : "(max-width: 760px) 90vw, 55vw"
            }
          />
        ) : (
          <span className="placeholder-label">{label}</span>
        )}
      </div>
    </figure>
  );
}

export function BrowserIcon() {
  return (
    <svg
      className="browser-icon"
      viewBox="0 0 70 56"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="66" height="52" rx="3" stroke="currentColor" />
      <path d="M2 13h66" stroke="currentColor" />
      <circle cx="9" cy="8" r="1.4" stroke="currentColor" />
      <circle cx="16" cy="8" r="1.4" stroke="currentColor" />
      <circle cx="23" cy="8" r="1.4" stroke="currentColor" />
    </svg>
  );
}
