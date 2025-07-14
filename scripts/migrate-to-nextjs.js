const fs = require('fs');
const path = require('path');

// Define the new URL structure and file mappings
const migrations = [
  // Frontend slides
  {
    source: 'src/slides/ReactScanSlide.tsx',
    destination: 'app/frontend/scan/page.tsx',
    urlPath: '/frontend/scan'
  },
  {
    source: 'src/slides/PerformanceSlide.tsx',
    destination: 'app/frontend/performance/page.tsx',
    urlPath: '/frontend/performance'
  },
  {
    source: 'src/slides/StateLiftingSlide.tsx',
    destination: 'app/frontend/state/page.tsx',
    urlPath: '/frontend/state'
  },
  {
    source: 'src/slides/DataFetchingSlide.tsx',
    destination: 'app/frontend/data/page.tsx',
    urlPath: '/frontend/data'
  },
  {
    source: 'src/slides/FormHandlingSlide.tsx',
    destination: 'app/frontend/forms/page.tsx',
    urlPath: '/frontend/forms'
  },
  {
    source: 'src/slides/ReduxDemoSlide.tsx',
    destination: 'app/frontend/redux/page.tsx',
    urlPath: '/frontend/redux'
  },
  {
    source: 'src/slides/StateOptimizationSlide.tsx',
    destination: 'app/frontend/context/page.tsx',
    urlPath: '/frontend/context'
  },
  {
    source: 'src/slides/FrontendSecuritySlide.tsx',
    destination: 'app/frontend/security/page.tsx',
    urlPath: '/frontend/security'
  },
  {
    source: 'src/slides/CORSSlide.tsx',
    destination: 'app/frontend/cors/page.tsx',
    urlPath: '/frontend/cors'
  },
  {
    source: 'src/slides/DeveloperToolsSlide.tsx',
    destination: 'app/frontend/tools/page.tsx',
    urlPath: '/frontend/tools'
  },
  {
    source: 'src/slides/PWASlide.tsx',
    destination: 'app/frontend/pwa/page.tsx',
    urlPath: '/frontend/pwa'
  },
  {
    source: 'src/slides/IdempotencySlide.tsx',
    destination: 'app/frontend/idempotency/page.tsx',
    urlPath: '/frontend/idempotency'
  },

  // Frontend markdown slides
  {
    source: 'src/slides/MarkdownSlides/StateUpdateBatchingSlide.tsx',
    destination: 'app/frontend/batching/page.tsx',
    urlPath: '/frontend/batching'
  },
  {
    source: 'src/slides/MarkdownSlides/ReduxConceptsSlide.tsx',
    destination: 'app/frontend/redux-concepts/page.tsx',
    urlPath: '/frontend/redux-concepts'
  },
  {
    source: 'src/slides/MarkdownSlides/LayoutAndRoutingSlide.tsx',
    destination: 'app/frontend/routing/page.tsx',
    urlPath: '/frontend/routing'
  },
  {
    source: 'src/slides/MarkdownSlides/PkgMgtOverviewSlide.tsx',
    destination: 'app/frontend/packages/page.tsx',
    urlPath: '/frontend/packages'
  },
  {
    source: 'src/slides/MarkdownSlides/NpmVsYarnSlide.tsx',
    destination: 'app/frontend/npm-yarn/page.tsx',
    urlPath: '/frontend/npm-yarn'
  },
  {
    source: 'src/slides/MarkdownSlides/BuildDeploySlide.tsx',
    destination: 'app/frontend/build/page.tsx',
    urlPath: '/frontend/build'
  },
  {
    source: 'src/slides/MarkdownSlides/KubbSlide.tsx',
    destination: 'app/frontend/kubb/page.tsx',
    urlPath: '/frontend/kubb'
  },
  {
    source: 'src/slides/MarkdownSlides/NetworkProtocolsSlide.tsx',
    destination: 'app/frontend/network/page.tsx',
    urlPath: '/frontend/network'
  },
  {
    source: 'src/slides/MarkdownSlides/CapacitorSlide.tsx',
    destination: 'app/frontend/mobile/page.tsx',
    urlPath: '/frontend/mobile'
  },
  {
    source: 'src/slides/MarkdownSlides/ElectronSlide.tsx',
    destination: 'app/frontend/electron/page.tsx',
    urlPath: '/frontend/electron'
  },
  {
    source: 'src/slides/MarkdownSlides/PropsDrillingSlide.tsx',
    destination: 'app/frontend/props/page.tsx',
    urlPath: '/frontend/props'
  },
  {
    source: 'src/slides/MarkdownSlides/NuqsSlide.tsx',
    destination: 'app/frontend/url-state/page.tsx',
    urlPath: '/frontend/url-state'
  },
  {
    source: 'src/slides/MarkdownSlides/ClientComponentsSlide.tsx',
    destination: 'app/frontend/client-components/page.tsx',
    urlPath: '/frontend/client-components'
  },
  {
    source: 'src/slides/MarkdownSlides/ServerComponentsSlide.tsx',
    destination: 'app/frontend/server-components/page.tsx',
    urlPath: '/frontend/server-components'
  },

  // Slides from subdirectories
  {
    source: 'src/slides/NetworkRequestInOnClick/NetworkRequestInOnClickSlide.tsx',
    destination: 'app/frontend/network-onclick/page.tsx',
    urlPath: '/frontend/network-onclick'
  },
  {
    source: 'src/slides/PackageManagerSlide/PackageManagerSlide.tsx',
    destination: 'app/frontend/package-demo/page.tsx',
    urlPath: '/frontend/package-demo'
  },

  // AI slides  
  {
    source: 'src/slides/MarkdownSlides/AISlides/WhatIsAISlide.tsx',
    destination: 'app/ai/intro/page.tsx',
    urlPath: '/ai/intro'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/WhatAreLLMsSlide.tsx',
    destination: 'app/ai/llms/page.tsx',
    urlPath: '/ai/llms'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/LLMCapabilitiesSlide.tsx',
    destination: 'app/ai/capabilities/page.tsx',
    urlPath: '/ai/capabilities'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/CommonMisconceptionsSlide.tsx',
    destination: 'app/ai/myths/page.tsx',
    urlPath: '/ai/myths'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/LearningResourcesSlide.tsx',
    destination: 'app/ai/resources/page.tsx',
    urlPath: '/ai/resources'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/AIModelComparisonSlide.tsx',
    destination: 'app/ai/compare/page.tsx',
    urlPath: '/ai/compare'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/AIPricingComparisonSlide.tsx',
    destination: 'app/ai/pricing/page.tsx',
    urlPath: '/ai/pricing'
  },
  {
    source: 'src/slides/MarkdownSlides/AISlides/SimplePromptEngineeringSlide.tsx',
    destination: 'app/ai/prompts/page.tsx',
    urlPath: '/ai/prompts'
  }
];

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper function to convert React component to Next.js page
function convertToNextJSPage(content, componentName) {
  // Extract the default component name from the existing file
  const componentMatch = content.match(/const\s+(\w+):\s*React\.FC/);
  const existingComponentName = componentMatch ? componentMatch[1] : componentName;
  
  // Replace component declaration with Next.js page export
  content = content.replace(
    new RegExp(`const\\s+${existingComponentName}:\\s*React\\.FC\\s*=\\s*\\(\\)\\s*=>\\s*{`),
    'export default function Page() {'
  );
  
  // Remove the export statement at the end
  content = content.replace(new RegExp(`export\\s+default\\s+${existingComponentName};?\\s*$`), '');
  
  return content;
}

// Helper function to update import paths
function updateImportPaths(content) {
  // Update relative imports to use @ alias
  content = content.replace(/from\s+['"]\.\.?\//g, 'from "@/');
  
  return content;
}

// Main migration function
function migrateFiles() {
  console.log('Starting Next.js migration...\n');
  
  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  migrations.forEach(({ source, destination, urlPath }) => {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);
    
    console.log(`📄 ${urlPath}`);
    
    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`  ❌ Source file not found: ${source}`);
      errors++;
      return;
    }
    
    // Check if destination already exists
    if (fs.existsSync(destinationPath)) {
      console.log(`  ⏭️  Already exists`);
      skipped++;
      return;
    }
    
    try {
      // Create destination directory
      ensureDirectoryExists(path.dirname(destinationPath));
      
      // Read source file
      let content = fs.readFileSync(sourcePath, 'utf8');
      
      // Extract component name from filename
      const componentName = path.basename(source, '.tsx');
      
      // Convert to Next.js page format
      content = convertToNextJSPage(content, componentName);
      content = updateImportPaths(content);
      
      // Write to destination
      fs.writeFileSync(destinationPath, content);
      
      console.log(`  ✅ Migrated successfully`);
      migrated++;
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      errors++;
    }
  });

  console.log(`\n📊 Migration Summary:`);
  console.log(`  ✅ Migrated: ${migrated} files`);
  console.log(`  ⏭️  Skipped: ${skipped} files`);
  console.log(`  ❌ Errors: ${errors} files`);
  
  // Create URL mapping file for reference
  const urlMappings = migrations.map(({ urlPath, destination }) => ({
    url: urlPath,
    file: destination
  }));
  
  fs.writeFileSync(
    'scripts/url-mappings.json', 
    JSON.stringify(urlMappings, null, 2)
  );
  
  console.log(`\n📋 URL mappings saved to scripts/url-mappings.json`);
}

// Run migration
migrateFiles();