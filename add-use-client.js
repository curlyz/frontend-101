const fs = require('fs');
const path = require('path');

const pagesToUpdate = [
  'app/frontend/client-components/page.tsx',
  'app/frontend/redux-concepts/page.tsx',
  'app/frontend/tools/page.tsx',
  'app/frontend/context/page.tsx',
  'app/frontend/forms/page.tsx',
  'app/frontend/security/page.tsx',
  'app/frontend/props/page.tsx',
  'app/frontend/network-onclick/page.tsx',
  'app/frontend/network/page.tsx',
  'app/frontend/idempotency/page.tsx',
  'app/frontend/state/page.tsx',
  'app/frontend/url-state/page.tsx',
  'app/frontend/mobile/page.tsx',
  'app/frontend/batching/page.tsx',
  'app/frontend/pwa/page.tsx',
  'app/frontend/packages/page.tsx',
  'app/frontend/cors/page.tsx',
  'app/frontend/kubb/page.tsx',
  'app/frontend/routing/page.tsx',
  'app/frontend/build/page.tsx',
  'app/frontend/performance/page.tsx',
  'app/frontend/electron/page.tsx',
  'app/frontend/data/page.tsx',
  'app/frontend/redux/page.tsx',
  'app/frontend/server-components/page.tsx',
  'app/ai/capabilities/page.tsx',
  'app/ai/compare/page.tsx',
  'app/ai/intro/page.tsx',
  'app/ai/llms/page.tsx',
  'app/ai/myths/page.tsx',
  'app/ai/pricing/page.tsx',
  'app/ai/prompts/page.tsx',
  'app/ai/resources/page.tsx'
];

pagesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if "use client" is already present
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      // Add "use client" at the beginning
      const updatedContent = '"use client";\n\n' + content;
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Added "use client" to: ${filePath}`);
    } else {
      console.log(`Already has "use client": ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Done adding "use client" directives!');