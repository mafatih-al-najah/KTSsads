export type HistoryBounds = { first: number; last: number };

export function nextHistoryBounds(bounds: HistoryBounds, index: number, action: string): HistoryBounds {
  return { first: Math.min(bounds.first, index), last: action === "PUSH" ? index : Math.max(bounds.last, index) };
}

export function historyAvailability(bounds: HistoryBounds, index: number) {
  return { back: index > bounds.first, forward: index < bounds.last };
}