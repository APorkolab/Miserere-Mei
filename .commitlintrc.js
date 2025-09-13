module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only changes
        'style',    // Changes that do not affect the meaning of the code
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf',     // Code change that improves performance
        'test',     // Adding missing tests or correcting existing tests
        'chore',    // Changes to the build process or auxiliary tools
        'ci',       // Changes to CI configuration files and scripts
        'build',    // Changes that affect the build system or external dependencies
        'revert',   // Reverts a previous commit
        'security', // Security improvements
        'deps',     // Dependency updates
        'config',   // Configuration changes
        'release'   // Release commits
      ]
    ],
    
    // Subject and body rules
    'subject-min-length': [2, 'always', 10],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    // Header rules
    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 15],
    
    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    
    // Type and scope rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-enum': [
      2,
      'always',
      [
        // Frontend scopes
        'frontend',
        'ui',
        'components',
        'services',
        'guards',
        'interceptors',
        'pipes',
        'directives',
        'pages',
        'routing',
        'styles',
        'i18n',
        
        // Backend scopes
        'backend',
        'api',
        'controllers',
        'models',
        'middleware',
        'routes',
        'services',
        'utils',
        'database',
        'migrations',
        'seeders',
        'auth',
        'validation',
        
        // Game specific scopes
        'game-engine',
        'locations',
        'characters',
        'inventory',
        'combat',
        'save-system',
        'story',
        
        // Infrastructure scopes
        'docker',
        'ci',
        'deployment',
        'monitoring',
        'logging',
        'security',
        'performance',
        'tests',
        'docs',
        'config',
        'deps',
        
        // General scopes
        'core',
        'shared',
        'common',
        'types',
        'interfaces',
        'constants',
        'helpers'
      ]
    ]
  },
  
  // Custom plugins for enhanced validation
  plugins: [
    {
      rules: {
        'jira-ticket-reference': (parsed, when = 'always') => {
          const { subject } = parsed;
          const jiraPattern = /\b[A-Z]+-\d+\b/;
          
          // Allow commits without JIRA references for certain types
          const exemptTypes = ['docs', 'style', 'chore', 'ci', 'config'];
          if (exemptTypes.includes(parsed.type)) {
            return [true];
          }
          
          const hasJiraReference = jiraPattern.test(subject);
          return [
            when === 'never' ? !hasJiraReference : hasJiraReference,
            `Subject must ${when === 'never' ? 'not ' : ''}contain JIRA ticket reference (e.g., PROJ-123)`
          ];
        }
      }
    }
  ],
  
  // Additional rules for enhanced commit message validation
  defaultIgnores: true,
  helpUrl: 'https://conventional-commits.org/',
  
  // Custom prompt configuration for commitizen
  prompt: {
    questions: {
      type: {
        description: 'Select the type of change that you are committing',
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description: 'Changes that do not affect the meaning of the code',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description: 'Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description: 'Changes to our CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: 'Other changes that do not modify src or test files',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑'
          },
          security: {
            description: 'Security improvements',
            title: 'Security',
            emoji: '🔒'
          }
        }
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)'
      },
      subject: {
        description: 'Write a short, imperative tense description of the change'
      },
      body: {
        description: 'Provide a longer description of the change'
      },
      isBreaking: {
        description: 'Are there any breaking changes?'
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
      },
      breaking: {
        description: 'Describe the breaking changes'
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?'
      },
      issuesBody: {
        description: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123")'
      }
    }
  }
};