# Development Guidelines - Futurizame Frontend

## Project Overview
Astro-based multilingual website (English/Spanish) with i18n support built using Astro 5.16.4.

## Build & Configuration

### Project Structure
```
src/
├── components/
│   ├── common/          # Reusable wrapper components
│   ├── templates/       # Page templates
│   └── ui/              # UI components (Button, Link, etc.)
├── i18n/
│   ├── res/             # Translation JSON files (en/, es/)
│   └── index.ts         # i18n utilities
├── layouts/             # Layout components
├── pages/               # Astro pages with i18n routing
└── styles/              # Global styles
public/
└── assets/              # Static assets (fonts, images, favicons)
```

### Configuration Files

#### astro.config.mjs
- **i18n Configuration**: Locales `en` and `es` with `prefixDefaultLocale: true`
- **Routing**: Default locale prefix enabled, no redirect to default locale

#### tsconfig.json
- Extends `astro/tsconfigs/base`
- Uses `verbatimModuleSyntax: true` for explicit import/export syntax

#### .prettierrc.json
- **Print Width**: 100 characters
- **Plugin**: `prettier-plugin-astro` for `.astro` file formatting
- **Command**: `npx prettier --write .` to format code

### NPM Scripts
```bash
npm run dev       # Start dev server with --host flag (accessible on network)
npm run build     # Build for production
npm run preview   # Preview production build with --host flag
```

### Development Server
The dev and preview commands use `--host` flag, making the server accessible on the local network (not just localhost).

## Internationalization (i18n)

### Custom i18n Implementation
The project uses a custom i18n system (not an external library):

**Location**: `src/i18n/index.ts`

**Structure**:
- Translation files organized in `src/i18n/res/{locale}/{resource}.json`
- Resources: layout, header, footer, routes, home, eye, etc.

**Usage**:
```typescript
import { getTranslator } from "@/i18n";

const t = getTranslator(locale); // locale: "en" | "es"
const translation = t("resource", "key"); // e.g., t("layout", "title")
```

**Implementation Details**:
- Returns the key if translation not found (fallback behavior)
- Supports both English (`en`) and Spanish (`es`) locales
- JSON files must be imported for each resource and locale

### Routing
- Pages use `[locale]` dynamic routing: `src/pages/[locale]/[...slug].astro`
- Default locale (`en`) is prefixed in URLs
- No automatic redirect to default locale

## Testing

### Current Setup
The project currently has no test framework configured (`package.json` shows placeholder test script).

### Recommended Setup: Node.js Built-in Test Runner

**Requirements**: Node.js v18+ (project uses v22.21.0)

**Advantages**:
- No additional dependencies required
- Native ES module support
- Fast and lightweight

#### Creating Tests

**Test File Naming**: `*.test.js` or `*.test.ts`

**Example Test** (`src/i18n/index.test.js`):
```javascript
import { test } from "node:test";
import { strict as assert } from "node:assert";

function isValidLocale(locale) {
  const validLocales = ["en", "es"];
  return validLocales.includes(locale);
}

test("isValidLocale returns true for valid locales", () => {
  assert.equal(isValidLocale("en"), true);
  assert.equal(isValidLocale("es"), true);
});

test("isValidLocale returns false for invalid locales", () => {
  assert.equal(isValidLocale("fr"), false);
  assert.equal(isValidLocale("de"), false);
});
```

#### Running Tests

**Single file**:
```bash
node --test src/i18n/index.test.js
```

**All test files** (recursive):
```bash
node --test
```

**With coverage** (Node.js v22+):
```bash
node --test --experimental-test-coverage
```

#### Adding to package.json
Update the test script:
```json
{
  "scripts": {
    "test": "node --test"
  }
}
```

Then run with:
```bash
npm test
```

#### Important Notes for Testing
- **ES Modules**: The project uses ES modules. If you get module warnings, consider adding `"type": "module"` to `package.json`
- **JSON Imports**: Node.js v22 requires import attributes for JSON files: `import data from "./file.json" with { type: "json" }`
- **Astro Components**: Testing `.astro` components requires additional setup (component testing framework like Vitest with Astro plugin)

### Alternative: Vitest (Recommended for Component Testing)
For testing Astro components, consider installing Vitest:

```bash
npm install --save-dev vitest @vitest/ui
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
});
```

## Code Style

### Astro Components
- **Props Interface**: Use TypeScript interfaces extending appropriate HTML attributes
  ```typescript
  interface Props extends astroHTML.JSX.ButtonHTMLAttributes {}
  ```
- **Component Structure**:
  1. Frontmatter with TypeScript/JavaScript
  2. Template with JSX-like syntax
  3. Scoped `<style>` block (if needed)
- **Slots**: Use `<slot />` for component composition
- **Props Access**: `Astro.props` for component props

### Styling
- **Scoped Styles**: Component styles are scoped by default
- **CSS Variables**: Use CSS custom properties for theming (e.g., `--color-primary`, `--color-on-primary`)
- **Line Length**: 100 characters (enforced by Prettier)

### TypeScript
- **Import Syntax**: Use explicit import/export syntax (`verbatimModuleSyntax: true`)
- **Type Safety**: Define interfaces for component props
- **Astro Types**: Auto-generated in `.astro/types.d.ts`

### General Conventions
- **Component Naming**: PascalCase for component files (e.g., `Button.astro`, `SectionTitle.astro`)
- **Utility Files**: camelCase for utility modules (e.g., `index.ts`)
- **Directories**: lowercase or camelCase (e.g., `common`, `ui`, `i18n`)

## Common Development Tasks

### Adding a New Component
1. Create file in appropriate directory (`ui/`, `common/`, or `templates/`)
2. Define TypeScript interface for props
3. Add scoped styles using CSS variables where applicable
4. Use slots for flexible composition

### Adding Translations
1. Add key-value pairs to relevant JSON files in `src/i18n/res/{locale}/`
2. Import new JSON files in `src/i18n/index.ts`
3. Add to resources object for both locales
4. Access using `getTranslator(locale)("resource", "key")`

### Debugging
- **Dev Server**: Runs on `http://localhost:4321` by default (with network access via `--host`)
- **Build Errors**: Check TypeScript errors in `.astro` frontmatter
- **i18n Issues**: Verify JSON file structure and imports in `src/i18n/index.ts`
- **Style Issues**: Check CSS variable definitions and scoped style conflicts

## Version Information
- **Astro**: 5.16.4
- **Node.js**: v22.21.0 (confirmed working)
- **Prettier**: ^3.7.4
- **prettier-plugin-astro**: ^0.14.1
