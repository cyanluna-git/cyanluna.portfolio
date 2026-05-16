// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCounter } from "../useCounter";

const mockMatchMedia = (prefersReduced: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: prefersReduced && query.includes("reduce"),
      media: query,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

describe("useCounter", () => {
  beforeEach(() => {
    mockMatchMedia(false);
    vi.useFakeTimers();
  });

  it("returns '0' initially before enabled", () => {
    const { result } = renderHook(() =>
      useCounter({ end: 100, enabled: false }),
    );
    expect(result.current).toBe("0");
  });

  it("counts to end value when enabled (zero duration)", async () => {
    const { result } = renderHook(() =>
      useCounter({ end: 10, duration: 0, enabled: true, suffix: "" }),
    );
    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });
    expect(result.current).toBe("10");
  });

  it("appends suffix to the value", async () => {
    const { result } = renderHook(() =>
      useCounter({ end: 5, duration: 0, enabled: true, suffix: "+" }),
    );
    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });
    expect(result.current).toBe("5+");
  });

  it("skips animation and returns end value when prefers-reduced-motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() =>
      useCounter({ end: 42, duration: 400, enabled: true, suffix: "%" }),
    );
    act(() => {});
    expect(result.current).toBe("42%");
  });

  it("stays at 0 when not enabled, even after time passes", () => {
    const { result } = renderHook(() =>
      useCounter({ end: 99, duration: 400, enabled: false }),
    );
    act(() => { vi.runAllTimers(); });
    expect(result.current).toBe("0");
  });
});
