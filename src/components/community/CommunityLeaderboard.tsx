"use client";

import { useEffect, useMemo, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { colors } from "@/constants/colors";

// Mirrors PublicLeaderboardDto on the API (name + reps only).
type Period = "Month" | "Year";

interface LeaderboardEntry {
  Rank: number;
  Username: string;
  TotalReps: number;
}

// SignalR may serialize the DTO as PascalCase (Period/TopEntries) or camelCase
// (period/topEntries) depending on server config, so read both.
interface RawEntry {
  Rank?: number;
  rank?: number;
  Username?: string;
  username?: string;
  TotalReps?: number;
  totalReps?: number;
}

interface RawPayload {
  Period?: string;
  period?: string;
  TopEntries?: RawEntry[];
  topEntries?: RawEntry[];
}

function normalizePayload(
  raw: RawPayload | null | undefined,
): { period: Period; entries: LeaderboardEntry[] } | null {
  const periodValue = raw?.Period ?? raw?.period;
  if (typeof periodValue !== "string" || !isPeriod(periodValue)) return null;

  const rawEntries = raw?.TopEntries ?? raw?.topEntries ?? [];
  const entries: LeaderboardEntry[] = rawEntries.map((e) => ({
    Rank: e.Rank ?? e.rank ?? 0,
    Username: e.Username ?? e.username ?? "Anonymous",
    TotalReps: e.TotalReps ?? e.totalReps ?? 0,
  }));

  return { period: periodValue, entries };
}

const PERIODS: { key: Period; label: string }[] = [
  { key: "Month", label: "This Month" },
  { key: "Year", label: "This Year" },
];

// Anonymous, receive-only SignalR hub on the app API. Sends the current
// Month and Year snapshots on connect, and again whenever a workout is logged.
const HUB_URL = process.env.NEXT_PUBLIC_LEADERBOARD_HUB_URL;
const LEADERBOARD_UPDATED_EVENT = "LeaderboardUpdated";

const formatter = new Intl.NumberFormat("en-GB");

// Fixed row height so the scroll viewport shows a whole number of rows.
const ROW_HEIGHT = 48;
const DESKTOP_VISIBLE_ROWS = 6;
const MOBILE_VISIBLE_ROWS = 5;
const MOBILE_QUERY = "(max-width: 640px)";

function isPeriod(value: string): value is Period {
  return value === "Month" || value === "Year";
}

export function CommunityLeaderboard() {
  const [boards, setBoards] = useState<Record<Period, LeaderboardEntry[]>>({
    Month: [],
    Year: [],
  });
  const [period, setPeriod] = useState<Period>("Month");
  const [connected, setConnected] = useState(false);
  const [visibleRows, setVisibleRows] = useState(DESKTOP_VISIBLE_ROWS);

  // Show 6 rows on desktop, 5 on mobile; the rest scroll.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const apply = () =>
      setVisibleRows(mq.matches ? MOBILE_VISIBLE_ROWS : DESKTOP_VISIBLE_ROWS);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!HUB_URL) return;

    const connection = new HubConnectionBuilder()
      // Anonymous hub: no cookies/auth, so don't send credentials.
      .withUrl(HUB_URL, { withCredentials: false })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    connection.on(LEADERBOARD_UPDATED_EVENT, (payload: RawPayload) => {
      const normalized = normalizePayload(payload);
      if (!normalized) return;
      setBoards((prev) => ({ ...prev, [normalized.period]: normalized.entries }));
    });

    connection.onreconnected(() => setConnected(true));
    connection.onclose(() => setConnected(false));

    connection
      .start()
      .then(() => setConnected(true))
      .catch(() => setConnected(false));

    return () => {
      connection.stop().catch(() => {});
    };
  }, []);

  const rows = boards[period];

  const content = useMemo(() => {
    if (rows.length === 0) {
      return (
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.55)",
            padding: "2.5rem 0",
            fontSize: "1rem",
          }}
        >
          {connected
            ? "No entries yet for this period."
            : "Loading the leaderboard…"}
        </p>
      );
    }

    return (
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          maxHeight: `${ROW_HEIGHT * visibleRows}px`,
          overflowY: "auto",
        }}
      >
        {rows.map((entry) => {
          const topThree = entry.Rank <= 3;
          return (
            <li
              key={`${period}-${entry.Rank}-${entry.Username}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                height: `${ROW_HEIGHT}px`,
                boxSizing: "border-box",
                padding: "0 1rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                style={{
                  width: "2.25rem",
                  flexShrink: 0,
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  color: topThree ? colors.accentLight : "rgba(255,255,255,0.5)",
                }}
              >
                {entry.Rank}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: topThree ? 600 : 500,
                  color: "white",
                }}
              >
                {entry.Username}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  color: "white",
                }}
              >
                {formatter.format(entry.TotalReps)}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }, [rows, period, connected, visibleRows]);

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <div
        role="tablist"
        aria-label="Leaderboard period"
        style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        {PERIODS.map(({ key, label }) => {
          const selected = key === period;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={selected}
              onClick={() => setPeriod(key)}
              style={{
                flex: 1,
                padding: "1rem",
                background: "transparent",
                border: "none",
                borderBottom: selected
                  ? `2px solid ${colors.brandBlue}`
                  : "2px solid transparent",
                color: selected ? "white" : "rgba(255,255,255,0.55)",
                fontWeight: selected ? 700 : 500,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.75rem 1rem 0.5rem",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <span>Rank · Member</span>
        <span>Burpees</span>
      </div>

      {content}
    </div>
  );
}
