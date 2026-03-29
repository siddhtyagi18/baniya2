---
phase: 01-foundation
plan: 05
type: execute
wave: 1
gap_closure: true
depends_on: [03]
files_modified: [
  ".eslintrc.js",
  ".prettierrc",
  "docs/README.md",
  "docs/CONTRIBUTING.md",
  ".github/workflows/ci.yml",
  "scripts/dev.js",
  "scripts/build.js",
  "scripts/test.js"
]
autonomous: true
user_setup: []

must_haves:
  truths:
    - "ESLint and Prettier are configured for consistent code formatting"
    - "Documentation is initialized with contributing guidelines"
    - "CI workflow is configured for automated testing"
    - "Root package.json includes useful scripts for development"
    - "Development script implementations exist and are functional"
  artifacts:
    - path: ".eslintrc.js"
      provides: "ESLint configuration with TypeScript support"
      min_lines: 10
    - path: ".prettierrc"
      provides: "Prettier configuration"
      min_lines: 3
    - path: "docs/README.md"
      provides: "Project documentation starting point"
      min_lines: 15
    - path: "docs/CONTRIBUTING.md"
      provides: "Guidelines for contributing to the project"
      min_lines: 20
    - path: ".github/workflows/ci.yml"
      provides: "GitHub Actions workflow for CI"
      min_lines: 25
    - path: "scripts/dev.js"
      provides: "Development script implementation"
      min_lines: 10
    - path: "scripts/build.js"
      provides: "Build script implementation"
      min_lines: 10
    - path: "scripts/test.js"
      provides: "Test script implementation"
      min_lines: 10
  key_links:
    - from: "package.json"
      to: ".eslintrc.js"
      via: "npm script lint"
      pattern: "\"lint\": \"eslint . --ext .ts,.js\""
    - from: "package.json"
      to: ".prettierrc"
      via: "npm script format"
      pattern: "\"format\": \"prettier --write .\""
    - from: "package.json"
      to: "scripts/dev.js"
      via: "npm script dev"
      pattern: "\"dev\": \"node scripts/dev.js\""
    - from: "package.json"
      to: "scripts/build.js"
      via: "npm script build"
      pattern: "\"build\": \"node scripts/build.js\""
    - from: "package.json"
      to: "scripts/test.js"
      via: "npm script test"
      pattern: "\"test\": \"node scripts/test.js\""
    - from: ".github/workflows/ci.yml"
      to: "scripts/lint.js"
      via: "CI step"
      pattern: "npm run lint"
    - from: ".github/workflows/ci.yml"
      to: "scripts/build.js"
      via: "CI step"
      pattern: "npm run build"
    - from: ".github/workflows/ci.yml"
      to: "scripts/test.js"
      via: "CI step"
      pattern: "npm run test"
---

<objective>
Close verification gaps by implementing missing development infrastructure: ESLint/Prettier configuration, documentation, CI workflow, and development scripts.

Purpose: Address the verification failures from phase 1 by creating the missing files that are essential for a proper development experience and automated workflow.
Output: All missing development infrastructure files created and configured correctly, allowing the phase 1 verification to pass.
</objective>

<execution_context>
@C:/Users/HP/.config/opencode/get-shit-done/workflows/execute-plan.md
@C:/Users/HP/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-foundation/01-foundation-VERIFICATION.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-foundation-03-SUMMARY.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create ESLint and Prettier configuration files</name>
  <files>.eslintrc.js, .prettierrc</files>
  <action>
    Create .eslintrc.js with:
      * TypeScript ESLint configuration using @typescript-eslint/parser and @typescript-eslint/eslint-plugin
      * Extend recommended rules from eslint:recommended and @typescript-eslint/recommended
      * Configure parser options for TypeScript (ecmaVersion: 2020, sourceType: module)
      * Set rules for consistent code style (quotes, semi, etc.)
      * Ignore node_modules and dist directories
    Create .prettierrc with:
      * Prettier configuration matching project standards
      * Use single quotes, trailing commas, semicolons
      * Set printWidth to 100, tabWidth to 2
      * Enable bracket spacing
    Both files should be formatted as JSON or JavaScript as appropriate.
  </action>
  <verify>
    .eslintrc.js exists and is valid JavaScript
    .prettierrc exists and is valid JSON
    npx eslint . --ext .ts,.js runs without configuration errors
    npx prettier --check . runs without configuration errors
    Both files are properly formatted for their respective tools
  </action>
  <done>
    ESLint and Prettier are configured for consistent code formatting with proper TypeScript support.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create documentation directory and files</name>
  <files>docs/README.md, docs/CONTRIBUTING.md</files>
  <action>
    Create docs directory if it doesn't exist.
    Create docs/README.md with:
      * Project overview from context.md (what is Baniya, vision, tagline)
      * Technology stack summary (frontend, backend, devops)
      * Monorepo structure explanation
      * Getting started instructions (install, dev, build, test)
      * Links to detailed documentation (to be created in later phases)
    Create docs/CONTRIBUTING.md with:
      * How to report bugs (use GitHub issues)
      * How to suggest features (use GitHub issues)
      * Development workflow instructions (fork, branch, commit, PR)
      * Coding standards and conventions (follow existing code, use TypeScript strict)
      * Pull request guidelines (description, linking issues, review process)
      * Testing procedures (write unit tests, run test suite)
    Both files should be well-formatted markdown.
  </action>
  <verify>
    docs/README.md exists and contains project overview
    docs/CONTRIBUTING.md exists and contains contributing guidelines
    Both files are properly formatted markdown
    Documentation is clear and actionable for new contributors
    Files are in the correct location (docs/ directory)
  </action>
  <done>
    Documentation is initialized with clear project overview and contributing guidelines that help developers understand and contribute to the project.
  </done>
</task>

<task type="auto">
  <name>Task 3: Create CI workflow configuration</name>
  <files>.github/workflows/ci.yml</files>
  <action>
    Create .github/workflows directory if it doesn't exist.
    Create .github/workflows/ci.yml with:
      * Trigger on push and pull request to main branch
      * Set up Node.js environment (use node-version: 18)
      * Install pnpm dependencies (run: pnpm install)
      * Run linting checks (run: pnpm lint)
      * Run build process (run: pnpm build)
      * Run tests (run: pnpm test)
      * Cache node_modules and pnpm store for faster builds
      * Use matrix builds if needed for different Node versions
      * Include proper error handling and notifications
    The workflow should be valid YAML and follow GitHub Actions best practices.
  </action>
  <verify>
    .github/workflows/ci.yml exists and is valid YAML
    Workflow triggers on push and pull request
    Includes steps for setup, install, lint, build, test
    Uses caching for performance
    Workflow syntax is valid (can be verified with yamllint or similar)
  </action>
  <done>
    CI workflow is configured to automatically lint, build, and test the project on every push and pull request.
  </done>
</task>

<task type="auto">
  <name>Task 4: Create development script implementations</name>
  <files>scripts/dev.js, scripts/build.js, scripts/test.js</files>
  <action>
    Create scripts directory if it doesn't exist.
    Create scripts/dev.js that:
      * Runs pnpm dev in all packages and apps in parallel
      * Handles errors gracefully
      * Provides useful output about what's being started
    Create scripts/build.js that:
      * Runs pnpm -r build to build all packages
      * Exits with error code if build fails
      * Provides timing information
    Create scripts/test.js that:
      * Runs pnpm -r test to run all tests
      * Exits with error code if tests fail
      * Provides test results summary
    All scripts should be executable JavaScript files with proper shebang if needed.
  </action>
  <verify>
    scripts/dev.js exists and is executable
    scripts/build.js exists and is executable
    scripts/test.js exists and is executable
    npm run dev executes without errors (shows usage when no dev servers running)
    npm run build completes successfully
    npm run test executes without errors (no tests yet, but should run successfully)
    Scripts handle basic error cases appropriately
  </action>
  <done>
    Development scripts are properly configured and executable, providing standard commands for development workflow.
  </done>
</task>

</tasks>

<verification>
All missing files from the verification gaps have been created and are properly configured. ESLint/Prettier configuration exists, documentation is in place, CI workflow is configured, and development scripts are implemented.
</verification>

<success_criteria>
- .eslintrc.js and .prettierrc files are present and correctly configured
- docs/README.md and docs/CONTRIBUTING.md exist with appropriate content
- .github/workflows/ci.yml exists and is a valid GitHub Actions workflow
- scripts/dev.js, scripts/build.js, scripts/test.js are executable and functional
- npm run lint and npm run format work correctly
- Development scripts can be executed without errors
- All verification gaps from phase 1 are addressed
</success_criteria>

<output>
After completion, create .planning/phases/01-foundation/01-foundation-05-SUMMARY.md
</output>