---
phase: 01-foundation
plan: 04
type: execute
wave: 1
depends_on: []
files_modified: [.eslintrc.js, .prettierrc, docs/README.md, docs/CONTRIBUTING.md, .github/workflows/ci.yml, scripts/dev.js, scripts/build.js, scripts/test.js]
autonomous: true
gap_closure: true
user_setup: []

must_haves:
  truths:
    - "ESLint and Prettier are configured for consistent code formatting"
    - "Documentation is initialized with contributing guidelines"
    - "CI workflow is configured for automated testing"
    - "Root package.json includes useful scripts for development"
  artifacts:
    - path: ".eslintrc.js"
      provides: "ESLint configuration for TypeScript"
      min_lines: 10
    - path: ".prettierrc"
      provides: "Prettier configuration"
      min_lines: 5
    - path: "docs/README.md"
      provides: "Project overview documentation"
      min_lines: 20
    - path: "docs/CONTRIBUTING.md"
      provides: "Contributing guidelines"
      min_lines: 20
    - path: ".github/workflows/ci.yml"
      provides: "GitHub Actions CI workflow"
      min_lines: 15
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
      via: "eslint script"
      pattern: "\"lint\":.*eslint"
    - from: "package.json"
      to: ".prettierrc"
      via: "prettier script"
      pattern: "\"format\":.*prettier"
    - from: "package.json"
      to: "scripts/dev.js"
      via: "dev script"
      pattern: "\"dev\":.*node scripts/dev.js"
    - from: "package.json"
      to: "scripts/build.js"
      via: "build script"
      pattern: "\"build\":.*node scripts/build.js"
    - from: "package.json"
      to: "scripts/test.js"
      via: "test script"
      pattern: "\"test\":.*node scripts/test.js"
    - from: ".github/workflows/ci.yml"
      to: "scripts/test.js"
      via: "test step in CI"
      pattern: "node scripts/test.js"
---

<objective>
Close verification gaps by adding missing development infrastructure: ESLint/Prettier config, documentation, CI workflow, and script implementations.

Purpose: Complete the foundation phase with proper tooling for maintainable development.
Output: All missing configuration and implementation files created and verified.
</objective>

<execution_context>
@C:/Users/HP/.config/opencode/get-shit-done/workflows/execute-plan.md
@C:/Users/HP/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-foundation/01-foundation-01-SUMMARY.md
@.planning/phases/01-foundation/01-foundation-02-SUMMARY.md
@.planning/phases/01-foundation/01-foundation-03-SUMMARY.md
@.planning/phases/01-foundation/01-foundation-VERIFICATION.md
@.planning/ROADMAP.md
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create ESLint and Prettier configuration files</name>
  <files>.eslintrc.js, .prettierrc</files>
  <action>
    Create .eslintrc.js with TypeScript ESLint configuration:
    - Use eslint-config-standard-with-typescript or similar
    - Configure for Node.js environment
    - Enable recommended rules
    
    Create .prettierrc with Prettier configuration:
    - Set trailing comma to es5
    - Set tab width to 2
    - Use single quotes
    - Enable semi-colons
  </action>
  <verify>
    npx eslint --version && npx prettier --version &&
    [ -f .eslintrc.js ] && [ -f .prettierrc ] &&
    npx eslint . --print-config 2>/dev/null | head -5 &&
    npx prettier --check . 2>/dev/null | head -5
  </verify>
  <done>
    ESLint and Prettier are installed and configured. Running `npm run lint` and `npm run format` (if defined) would work without configuration errors.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create documentation directory and files</name>
  <files>docs/README.md, docs/CONTRIBUTING.md</files>
  <action>
    Create docs directory if it doesn't exist.
    
    Create docs/README.md with:
    - Project title: Baniya
    - Tagline: Shrewd routing. Zero waste. Your data stays where it belongs.
    - Brief description of what Baniya is (visual AI pipeline builder with data sensitivity classification)
    - Links to key documentation (architecture, API, etc.)
    
    Create docs/CONTRIBUTING.md with:
    - How to report bugs
    - How to suggest features
    - Development setup instructions
    - Coding standards (referencing ESLint/Prettier)
    - Pull request process
  </action>
  <verify>
    [ -d docs ] && [ -f docs/README.md ] && [ -f docs/CONTRIBUTING.md ] &&
    wc -l docs/README.md | awk '{print $1}' >= 10 &&
    wc -l docs/CONTRIBUTING.md | awk '{print $1}' >= 10
  </verify>
  <done>
    Documentation directory exists with README.md containing project overview and CONTRIBUTING.md containing contributing guidelines, each with sufficient content.
  </done>
</task>

<task type="auto">
  <name>Task 3: Create CI workflow configuration</name>
  <files>.github/workflows/ci.yml</files>
  <action>
    Create .github/workflows directory if it doesn't exist.
    
    Create .github/workflows/ci.yml with:
    - Name: CI
    - Triggers: push and pull_request to main branch
    - Jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                node-version: '20'
                cache: 'pnpm'
            - name: Install dependencies
              run: pnpm install
            - name: Lint code
              run: pnpm run lint  (if lint script exists, otherwise run eslint)
            - name: Run tests
              run: pnpm test     (if test script exists, otherwise run vitest)
            - name: Build
              run: pnpm run build (if build script exists)
  </action>
  <verify>
    [ -d .github/workflows ] && [ -f .github/workflows/ci.yml ] &&
    grep -q "name: CI" .github/workflows/ci.yml &&
    grep -q "actions/checkout" .github/workflows/ci.yml &&
    grep -q "setup-node" .github/workflows/ci.yml &&
    grep -q "pnpm install" .github/workflows/ci.yml
  </verify>
  <done>
    GitHub Actions CI workflow file exists with basic CI pipeline for Node.js project using pnpm.
  </done>
</task>

<task type="auto">
  <name>Task 4: Create development script implementations</name>
  <files>scripts/dev.js, scripts/build.js, scripts/test.js</files>
  <action>
    Create scripts directory if it doesn't exist.
    
    Create scripts/dev.js:
    - Simple script that runs the development server for both server and editor
    - Could use concurrently to run both
    - For now, implement as a placeholder that explains how to run dev
    
    Create scripts/build.js:
    - Script to build all packages and apps
    - Run pnpm build in each package/app that has a build script
    
    Create scripts/test.js:
    - Script to run tests across the monorepo
    - Run pnpm test or vitest as appropriate
    
    Make sure to check what scripts are defined in package.json and implement accordingly.
  </action>
  <verify>
    [ -d scripts ] && [ -f scripts/dev.js ] && [ -f scripts/build.js ] && [ -f scripts/test.js ] &&
    [ -x scripts/dev.js ] || true  # Not required to be executable, node will run it
  </verify>
  <done>
    Scripts directory exists with implementations for dev, build, and test scripts that match those defined in the root package.json.
  </done>
</task>

</tasks>

<verification>
Run the following to verify all gap closure tasks:
- Check that all created files exist and have appropriate content
- Verify ESLint and Prettier can run without configuration errors
- Verify documentation files are present and non-empty
- Verify CI workflow file is correctly formatted YAML
- Verify script implementations exist and are valid JavaScript
</verification>

<success_criteria>
All verification gaps from 01-foundation-VERIFICATION.md are closed:
- ESLint and Prettier configuration files exist and are configured
- Documentation directory and files (README.md, CONTRIBUTING.md) exist with content
- CI workflow file (.github/workflows/ci.yml) exists
- Development script implementations (scripts/dev.js, scripts/build.js, scripts/test.js) exist
</success_criteria>

<output>
After completion, create .planning/phases/01-foundation/01-foundation-04-SUMMARY.md
</output>