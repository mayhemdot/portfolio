import { describe, expect, it } from "vitest";
import { AboutUs, defaultSkills, defaultSkillsList } from "@/payload/blocks/AboutUs/config";

describe("AboutUs Configuration and Default Skills Data", () => {
	it("exports the AboutUs Payload block configuration with skills and skillsList fields", () => {
		expect(AboutUs).toBeDefined();
		expect(AboutUs.slug).toBe("aboutUs");

		const skillsField = AboutUs.fields.find((f: any) => f.name === "skills");
		expect(skillsField).toBeDefined();
		expect(skillsField?.type).toBe("array");

		const skillsListField = AboutUs.fields.find((f: any) => f.name === "skillsList");
		expect(skillsListField).toBeDefined();
		expect(skillsListField?.type).toBe("array");
	});

	it("exports defaultSkills and defaultSkillsList with complete technology stack", () => {
		expect(defaultSkills).toBeDefined();
		expect(defaultSkillsList).toBeDefined();
		expect(Array.isArray(defaultSkills)).toBe(true);

		const categories = defaultSkills.map((s) => s.category);
		expect(categories).toContain("Frontend");
		expect(categories).toContain("Backend");
		expect(categories).toContain("Databases");
		expect(categories).toContain("CI & CD");
		expect(categories).toContain("3D & Animation");
		expect(categories).toContain("Design");

		const frontend = defaultSkills.find((s) => s.category === "Frontend");
		const frontendItems = frontend?.items.map((i) => i.name);
		expect(frontendItems).toEqual([
			"HTML",
			"CSS/SCSS",
			"JavaScript",
			"TypeScript",
			"React",
			"Next.js",
			"Tailwind",
		]);

		const backend = defaultSkills.find((s) => s.category === "Backend");
		const backendItems = backend?.items.map((i) => i.name);
		expect(backendItems).toEqual(["Node.js", "Python", "PHP", "Rust"]);

		const databases = defaultSkills.find((s) => s.category === "Databases");
		const databaseItems = databases?.items.map((i) => i.name);
		expect(databaseItems).toEqual(["MySQL", "PostgreSQL", "MongoDB"]);

		const cicd = defaultSkills.find((s) => s.category === "CI & CD");
		const cicdItems = cicd?.items.map((i) => i.name);
		expect(cicdItems).toEqual(["Docker", "Vercel", "Git", "GitHub", "Redis"]);

		const animation = defaultSkills.find((s) => s.category === "3D & Animation");
		const animationItems = animation?.items.map((i) => i.name);
		expect(animationItems).toEqual(["GSAP", "Lenis", "Three.js", "WebGL", "Blender"]);

		const design = defaultSkills.find((s) => s.category === "Design");
		const designItems = design?.items.map((i) => i.name);
		expect(designItems).toEqual(["Photoshop", "Figma"]);
	});
});
