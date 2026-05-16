// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import RecruiterBanner from "../RecruiterBanner";

describe("RecruiterBanner", () => {
  it("renders nothing when inactive", () => {
    const { container } = render(
      <RecruiterBanner active={false} step={1} completed={false} onNext={vi.fn()} onExit={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders step indicator when active and not completed", () => {
    render(
      <RecruiterBanner active={true} step={2} completed={false} onNext={vi.fn()} onExit={vi.fn()} />,
    );
    expect(screen.getByText("Recruiter path · Step 2/3")).toBeInTheDocument();
  });

  it("renders 'Tour complete' when completed", () => {
    render(
      <RecruiterBanner active={true} step={3} completed={true} onNext={vi.fn()} onExit={vi.fn()} />,
    );
    expect(screen.getByText("Tour complete ✓")).toBeInTheDocument();
  });

  it("hides Next button when completed", () => {
    render(
      <RecruiterBanner active={true} step={3} completed={true} onNext={vi.fn()} onExit={vi.fn()} />,
    );
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
  });

  it("calls onNext when Next button is clicked", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(
      <RecruiterBanner active={true} step={1} completed={false} onNext={onNext} onExit={vi.fn()} />,
    );
    await user.click(screen.getByText("Next →"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onExit when Exit button is clicked", async () => {
    const user = userEvent.setup();
    const onExit = vi.fn();
    render(
      <RecruiterBanner active={true} step={1} completed={false} onNext={vi.fn()} onExit={onExit} />,
    );
    await user.click(screen.getByText("Exit"));
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
