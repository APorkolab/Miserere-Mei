module.exports = {
  // TypeScript files (frontend)
  'frontend/**/*.{ts,tsx}': [
    'prettier --write'
  ],
  
  // JavaScript files (backend)
  'backend/**/*.{js,jsx}': [
    'prettier --write'
  ],
  
  // HTML template files
  'frontend/**/*.html': [
    'prettier --write'
  ],
  
  // SCSS/CSS files
  'frontend/**/*.{scss,css}': [
    'prettier --write'
  ],
  
  // JSON files
  '**/*.json': [
    'prettier --write'
  ],
  
  // YAML files
  '**/*.{yml,yaml}': [
    'prettier --write'
  ],
  
  // Markdown files
  '**/*.md': [
    'prettier --write'
  ],
  
  // Package.json files
  '**/package.json': [
    'prettier --write'
  ]
};
