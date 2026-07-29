import { describe, expect, it, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { BlurReveal } from "@/shared/components/Animation/BlurReveal";

describe("BlurReveal Component", () => {
	it("exports BlurReveal component function", () => {
		expect(BlurReveal).toBeDefined();
		expect(typeof BlurReveal).toBe("function");
	});

	it("renders children and applies custom classNames", () => {
		const { getByText, container } = render(
			React.createElement(
				BlurReveal,
				{ className: "custom-wrapper", contentClassName: "custom-content" },
				React.createElement("span", null, "Text Blur Reveal"),
			),
		);

		expect(getByText("Text Blur Reveal")).toBeDefined();
		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper.className).toContain("custom-wrapper");
		expect(wrapper.firstChild).toBeDefined();
		const content = wrapper.firstChild as HTMLElement;
		expect(content.className).toContain("custom-content");
	});

	it("supports scrollTrigger as boolean", () => {
		const { container } = render(
			React.createElement(
				BlurReveal,
				{ scrollTrigger: true },
				React.createElement("div", null, "Content"),
			),
		);
		expect(container.firstChild).toBeDefined();
	});

	it("supports scrollTrigger as string selector and resolves target element", () => {
		const targetElement = document.createElement("div");
		targetElement.id = "target-container";
		document.body.appendChild(targetElement);

		const { container } = render(
			React.createElement(
				BlurReveal,
				{ scrollTrigger: "#target-container" },
				React.createElement("div", null, "Content"),
			),
		);
		expect(container.firstChild).toBeDefined();

		document.body.removeChild(targetElement);
	});

	it("warns if scrollTrigger target string selector is not found in DOM", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		render(
			React.createElement(
				BlurReveal,
				{ scrollTrigger: "#non-existent-selector" },
				React.createElement("div", null, "Content"),
			),
		);

		expect(warnSpy).toHaveBeenCalledWith(
			"[BlurReveal] scrollTrigger target not found for:",
			"#non-existent-selector",
		);

		warnSpy.mockRestore();
	});

	it("supports scrollTrigger as object configuration", () => {
		const triggerRef = { current: document.createElement("section") };
		const { container } = render(
			React.createElement(
				BlurReveal,
				{
					scrollTrigger: {
						trigger: triggerRef,
						start: "top 80%",
						toggleActions: "play pause resume reset",
						once: false,
					},
					textBlur: 12,
					duration: 0.8,
				},
				React.createElement("div", null, "Configured Content"),
			),
		);
		expect(container.firstChild).toBeDefined();
	});
});
