import { extendTailwindMerge } from 'tailwind-merge';

const config = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            (value) => /^\d+\/\d+$/.test(value)
          ]
        }
      ]
    }
  }
};

// Let's see how tailwind-merge resolves it
const myMerge = extendTailwindMerge(config);

// Let's test if we can do custom config using createTailwindMerge
import { createTailwindMerge, getDefaultConfig } from 'tailwind-merge';

const customTwMerge = createTailwindMerge(() => {
  const defaultConfig = getDefaultConfig();
  // Find font-size classGroup
  const fontSizeGroup = defaultConfig.classGroups['font-size'];
  // We can push to the text list
  const textObj = fontSizeGroup.find(item => typeof item === 'object' && item.text);
  if (textObj) {
    textObj.text.push((value) => /^\d+\/\d+$/.test(value));
  }
  return defaultConfig;
});

console.log("Merging text-primary-foreground with text-12/16 using createTailwindMerge:");
console.log(customTwMerge("text-primary-foreground", "text-12/16"));

console.log("\nMerging text-12/16 with text-primary-foreground using createTailwindMerge:");
console.log(customTwMerge("text-12/16", "text-primary-foreground"));
