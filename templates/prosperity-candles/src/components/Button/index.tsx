"use client";

import Link from "next/link";
import type React from "react";
import type { ElementType } from "react";

import classes from "./index.module.scss";

export type Props = {
	label?: string;
	appearance?: "default" | "primary" | "secondary" | "none" | "round";
	el?: "button" | "link" | "a";
	onClick?: () => void;
	href?: string;
	newTab?: boolean;
	className?: string;
	type?: "submit" | "button";
	disabled?: boolean;
	invert?: boolean;
};

export const Button: React.FC<Props> = ({
	el: elFromProps = "link",
	label,
	newTab,
	href,
	appearance,
	className: classNameFromProps,
	onClick,
	type = "button",
	disabled,
	invert,
}) => {
	let el = elFromProps;

	const newTabProps = newTab
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};

	const className = [
		classes.button,
		classNameFromProps,
		classes[`appearance--${appearance}`],
		invert && classes[`${appearance}--invert`],
	]
		.filter(Boolean)
		.join(" ");

	const content = (
		<div className={classes.content}>
			<span className={classes.label}>{label}</span>
		</div>
	);

	if (onClick || type === "submit") el = "button";

	if (el === "link") {
		return (
			<Link
				href={href || ""}
				className={className}
				{...newTabProps}
				onClick={onClick}
			>
				{content}
			</Link>
		);
	}

	const Element: ElementType = el;

	return (
		<Element
			href={href}
			className={className}
			type={type}
			{...newTabProps}
			onClick={onClick}
			disabled={disabled}
		>
			{content}
		</Element>
	);
};
