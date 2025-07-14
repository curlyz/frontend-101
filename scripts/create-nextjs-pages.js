const fs = require('fs');
const path = require('path');

// Route mappings - mapping paths to their corresponding slide components
const routeToComponentMap = {
  // React Fundamentals
  '/developer-tools': 'DeveloperToolsSlide',
  '/react-scan': 'ReactScanSlide',
  '/performance': 'PerformanceSlide',
  '/state-update-batching': 'StateUpdateBatchingSlide',
  '/state-optimization': 'StateOptimizationSlide',
  '/redux-concepts': 'ReduxConceptsSlide',
  '/state-batching': 'StateUpdateBatchingSlide',

  // Development Tools
  '/layout-routing': 'LayoutAndRoutingSlide',
  '/pkg-mgt-overview': 'PkgMgtOverviewSlide',
  '/npm-vs-yarn': 'NpmVsYarnSlide',
  '/build-deploy': 'BuildDeploySlide',
  '/kubb': 'KubbSlide',

  // Network & Security
  '/network-in-onclick': 'NetworkRequestInOnClickSlide',
  '/data-fetching': 'DataFetchingSlide',
  '/idempotency': 'IdempotencySlide',
  '/frontend-security': 'FrontendSecuritySlide',
  '/cors': 'CORSSlide',
  '/network-protocols': 'NetworkProtocolsSlide',

  // Mobile & Desktop
  '/capacitor': 'CapacitorSlide',
  '/electron': 'ElectronSlide',
  '/pwa': 'PWASlide',

  // Advanced Topics
  '/props-drilling': 'PropsDrillingSlide',
  '/nuqs': 'NuqsSlide',
  '/client-components': 'ClientComponentsSlide',
  '/server-components': 'ServerComponentsSlide',

  // Other slides
  '/state-lifting': 'StateLiftingSlide',
  '/form-handling': 'FormHandlingSlide',
  '/redux-demo': 'ReduxDemoSlide',
  '/package-managers': 'PackageManagerSlide',

  // AI Module (already created but including for completeness)
  '/ai-llms/what-is-ai': 'WhatIsAISlide',
  '/ai-llms/what-are-llms': 'WhatAreLLMsSlide',
  '/ai-llms/what-llms-can-do': 'LLMCapabilitiesSlide',
  '/ai-llms/misconceptions': 'CommonMisconceptionsSlide',
  '/ai-llms/learning-resources': 'LearningResourcesSlide',
  '/ai-llms/model-comparison': 'AIModelComparisonSlide',
  '/ai-llms/pricing-comparison': 'AIPricingComparisonSlide',
  '/ai-llms/simple-prompt-engineering': 'SimplePromptEngineeringSlide',
};

// Import path mappings - where to import each component from
const componentImportMap = {
  // Direct slides from src/slides/
  'DeveloperToolsSlide': '@/slides/DeveloperToolsSlide',
  'ReactScanSlide': '@/slides/ReactScanSlide',
  'PerformanceSlide': '@/slides/PerformanceSlide',
  'StateLiftingSlide': '@/slides/StateLiftingSlide',
  'FormHandlingSlide': '@/slides/FormHandlingSlide',
  'DataFetchingSlide': '@/slides/DataFetchingSlide',
  'ReduxDemoSlide': '@/slides/ReduxDemoSlide',
  'StateOptimizationSlide': '@/slides/StateOptimizationSlide',
  'IdempotencySlide': '@/slides/IdempotencySlide',
  'FrontendSecuritySlide': '@/slides/FrontendSecuritySlide',
  'PWASlide': '@/slides/PWASlide',
  'CORSSlide': '@/slides/CORSSlide',

  // Slides from subdirectories
  'NetworkRequestInOnClickSlide': '@/slides/NetworkRequestInOnClick/NetworkRequestInOnClickSlide',
  'PackageManagerSlide': '@/slides/PackageManagerSlide/PackageManagerSlide',

  // Markdown slides
  'StateUpdateBatchingSlide': '@/slides/MarkdownSlides/StateUpdateBatchingSlide',
  'ReduxConceptsSlide': '@/slides/MarkdownSlides/ReduxConceptsSlide',
  'LayoutAndRoutingSlide': '@/slides/MarkdownSlides/LayoutAndRoutingSlide',
  'PkgMgtOverviewSlide': '@/slides/MarkdownSlides/PkgMgtOverviewSlide',
  'NpmVsYarnSlide': '@/slides/MarkdownSlides/NpmVsYarnSlide',
  'BuildDeploySlide': '@/slides/MarkdownSlides/BuildDeploySlide',
  'KubbSlide': '@/slides/MarkdownSlides/KubbSlide',
  'NetworkProtocolsSlide': '@/slides/MarkdownSlides/NetworkProtocolsSlide',
  'CapacitorSlide': '@/slides/MarkdownSlides/CapacitorSlide',
  'ElectronSlide': '@/slides/MarkdownSlides/ElectronSlide',
  'PropsDrillingSlide': '@/slides/MarkdownSlides/PropsDrillingSlide',
  'NuqsSlide': '@/slides/MarkdownSlides/NuqsSlide',
  'ClientComponentsSlide': '@/slides/MarkdownSlides/ClientComponentsSlide',
  'ServerComponentsSlide': '@/slides/MarkdownSlides/ServerComponentsSlide',

  // AI slides
  'WhatIsAISlide': '@/slides/MarkdownSlides/AISlides/WhatIsAISlide',
  'WhatAreLLMsSlide': '@/slides/MarkdownSlides/AISlides/WhatAreLLMsSlide',
  'LLMCapabilitiesSlide': '@/slides/MarkdownSlides/AISlides/LLMCapabilitiesSlide',
  'CommonMisconceptionsSlide': '@/slides/MarkdownSlides/AISlides/CommonMisconceptionsSlide',
  'LearningResourcesSlide': '@/slides/MarkdownSlides/AISlides/LearningResourcesSlide',
  'AIModelComparisonSlide': '@/slides/MarkdownSlides/AISlides/AIModelComparisonSlide',
  'AIPricingComparisonSlide': '@/slides/MarkdownSlides/AISlides/AIPricingComparisonSlide',
  'SimplePromptEngineeringSlide': '@/slides/MarkdownSlides/AISlides/SimplePromptEngineeringSlide',
};

// Helper function to create a page component
function createPageComponent(componentName, importPath) {
  return `'use client'

import ${componentName} from '${importPath}'

export default function Page() {
  return <${componentName} />
}
`;
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Create pages for all routes
function createAllPages() {
  const appDir = path.join(__dirname, '..', 'app');
  let created = 0;
  let skipped = 0;

  console.log('Creating Next.js pages...');

  Object.entries(routeToComponentMap).forEach(([routePath, componentName]) => {
    // Skip root path
    if (routePath === '/') return;

    // Convert route path to file system path
    const segments = routePath.split('/').filter(Boolean);
    const pageDir = path.join(appDir, ...segments);
    const pageFile = path.join(pageDir, 'page.tsx');

    // Check if page already exists
    if (fs.existsSync(pageFile)) {
      console.log(`  ⏭️  Skipped ${routePath} (already exists)`);
      skipped++;
      return;
    }

    // Get import path for component
    const importPath = componentImportMap[componentName];
    if (!importPath) {
      console.log(`  ❌ Missing import path for ${componentName}`);
      return;
    }

    // Create directory if it doesn't exist
    ensureDirectoryExists(pageDir);

    // Create page component
    const pageContent = createPageComponent(componentName, importPath);

    // Write file
    fs.writeFileSync(pageFile, pageContent);
    console.log(`  ✅ Created ${routePath}`);
    created++;
  });

  console.log(`\nDone! Created ${created} pages, skipped ${skipped} existing pages.`);
}

// Run the script
createAllPages();