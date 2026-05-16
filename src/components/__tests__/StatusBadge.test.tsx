// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  it("renders 'Live' text for live status in English", () => {
    render(<StatusBadge status="live" lang="en" />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders '운영 중' for live status in Korean", () => {
    render(<StatusBadge status="live" lang="ko" />);
    expect(screen.getByText("운영 중")).toBeInTheDocument();
  });

  it("renders 'In Development' for active status in English", () => {
    render(<StatusBadge status="active" lang="en" />);
    expect(screen.getByText("In Development")).toBeInTheDocument();
  });

  it("renders 'Beta' for beta status in English", () => {
    render(<StatusBadge status="beta" lang="en" />);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders the pulse dot only for live status", () => {
    const { container: liveContainer } = render(<StatusBadge status="live" lang="en" />);
    const { container: activeContainer } = render(<StatusBadge status="active" lang="en" />);
    expect(liveContainer.querySelector(".animate-pulse")).toBeTruthy();
    expect(activeContainer.querySelector(".animate-pulse")).toBeFalsy();
  });

  it("applies the correct color class for beta", () => {
    const { container } = render(<StatusBadge status="beta" lang="en" />);
    const span = container.querySelector("span");
    expect(span?.className).toContain("amber");
  });
});
