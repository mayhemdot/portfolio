import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'fs';

const cssPath = './src/app/(frontend)/globals.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

console.log("Compiling CSS with Tailwind v4...");
postcss([tailwindcss])
  .process(cssContent, { from: cssPath })
  .then(result => {
    console.log("Compilation successful!");
    const compiledCss = result.css;
    
    // Check if text-primary-foreground is generated
    const hasTextPrimaryForeground = compiledCss.includes('text-primary-foreground');
    console.log("Has text-primary-foreground class:", hasTextPrimaryForeground);
    
    if (hasTextPrimaryForeground) {
      // Find the rule for text-primary-foreground
      const regex = /\.text-primary-foreground\s*\{[^}]*\}/g;
      const matches = compiledCss.match(regex);
      console.log("Matches:", matches);
    } else {
      console.log("text-primary-foreground class was NOT generated!");
    }

    // Check if bg-primary is generated
    const hasBgPrimary = compiledCss.includes('bg-primary');
    console.log("Has bg-primary class:", hasBgPrimary);

    // Let's write the first 500 characters of compiled CSS to see how custom variables are defined
    console.log("\nSample CSS variables output:");
    const variablesSection = compiledCss.substring(0, 1000);
    console.log(variablesSection);
  })
  .catch(err => {
    console.error("Compilation failed:", err);
  });
