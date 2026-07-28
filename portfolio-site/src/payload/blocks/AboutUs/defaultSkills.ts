export interface SkillItem {
	name: string;
	id?: string;
}

export interface SkillCategory {
	category: string;
	items: SkillItem[];
	id?: string;
}

export const defaultSkills: SkillCategory[] = [
	{
		category: "Frontend",
		items: [
			{ name: "HTML" },
			{ name: "CSS/SCSS" },
			{ name: "JavaScript" },
			{ name: "TypeScript" },
			{ name: "React" },
			{ name: "Next.js" },
			{ name: "Tailwind" },
		],
	},
	{
		category: "Backend",
		items: [
			{ name: "Node.js" },
			{ name: "Python" },
			{ name: "PHP" },
			{ name: "Rust" },
		],
	},
	{
		category: "Databases",
		items: [
			{ name: "MySQL" },
			{ name: "PostgreSQL" },
			{ name: "MongoDB" },
		],
	},
	{
		category: "CI & CD",
		items: [
			{ name: "Docker" },
			{ name: "Vercel" },
			{ name: "Git" },
			{ name: "GitHub" },
			{ name: "Redis" },
		],
	},
	{
		category: "3D & Animation",
		items: [
			{ name: "GSAP" },
			{ name: "Lenis" },
			{ name: "Three.js" },
			{ name: "WebGL" },
			{ name: "Blender" },
		],
	},
	{
		category: "Design",
		items: [
			{ name: "Photoshop" },
			{ name: "Figma" },
		],
	},
];

export const defaultSkillsList = defaultSkills;
