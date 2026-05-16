// @vitest-environment jsdom
import { render, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createElement } from "react";
import { useInView } from "../useInView";

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

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

const makeObserverMock = () => {
  let callback: IntersectionCallback | null = null;
  const observeMock = vi.fn();
  const unobserveMock = vi.fn();
  const disconnectMock = vi.fn();

  class MockIntersectionObserver {
    constructor(cb: IntersectionCallback) { callback = cb; }
    observe = observeMock;
    unobserve = unobserveMock;
    disconnect = disconnectMock;
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });

  const trigger = (isIntersecting: boolean) => {
    callback?.([{ isIntersecting } as IntersectionObserverEntry]);
  };

  return { observeMock, unobserveMock, disconnectMock, trigger };
};

let capturedInView: boolean | undefined;

function TestComponent(props: Parameters<typeof useInView>[0]) {
  const [ref, inView] = useInView(props);
  capturedInView = inView;
  return createElement("div", { ref });
}

describe("useInView", () => {
  beforeEach(() => {
    mockMatchMedia(false);
    capturedInView = undefined;
  });

  it("starts as false when element is not intersecting", () => {
    makeObserverMock();
    act(() => { render(createElement(TestComponent)); });
    expect(capturedInView).toBe(false);
  });

  it("sets inView=true when prefers-reduced-motion is active", () => {
    mockMatchMedia(true);
    makeObserverMock();
    act(() => { render(createElement(TestComponent)); });
    expect(capturedInView).toBe(true);
  });

  it("sets inView=true when intersection fires", () => {
    const { trigger } = makeObserverMock();
    act(() => { render(createElement(TestComponent)); });
    act(() => { trigger(true); });
    expect(capturedInView).toBe(true);
  });

  it("does not set inView=true when isIntersecting is false", () => {
    const { trigger } = makeObserverMock();
    act(() => { render(createElement(TestComponent)); });
    act(() => { trigger(false); });
    expect(capturedInView).toBe(false);
  });

  it("calls disconnect on unmount", () => {
    const { disconnectMock } = makeObserverMock();
    let unmount: () => void;
    act(() => {
      const result = render(createElement(TestComponent));
      unmount = result.unmount;
    });
    act(() => { unmount(); });
    expect(disconnectMock).toHaveBeenCalled();
  });
});
