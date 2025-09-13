module.exports = {
  branches: [
    'main',
    'master',
    { name: 'next', prerelease: true },
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  plugins: [
    // Analyze commits to determine the type of release
    '@semantic-release/commit-analyzer',
    
    // Generate release notes
    '@semantic-release/release-notes-generator',
    
    // Update changelog
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    
    // Update version in package.json files (skip npm publish)
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    
    // Update version in all package.json files
    [
      '@semantic-release/exec',
      {
        prepareCmd: [
          'npm version ${nextRelease.version} --no-git-tag-version',
          'cd backend && npm version ${nextRelease.version} --no-git-tag-version',
          'cd ../frontend && npm version ${nextRelease.version} --no-git-tag-version'
        ].join(' && ')
      }
    ],
    
    // Create GitHub release
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/**',
            label: 'Built application'
          },
          {
            path: 'docker-compose.yml',
            label: 'Docker Compose configuration'
          },
          {
            path: 'docs/**',
            label: 'Documentation'
          }
        ],
        addReleases: 'bottom'
      }
    ],
    
    // Commit and push the version bump
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'package-lock.json',
          'backend/package.json',
          'backend/package-lock.json',
          'frontend/package.json',
          'frontend/package-lock.json',
          'CHANGELOG.md'
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ],
  
  // Commit analyzer configuration
  preset: 'conventionalcommits',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'docs', release: 'patch' },
    { type: 'style', release: 'patch' },
    { type: 'refactor', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'test', release: 'patch' },
    { type: 'chore', release: 'patch' },
    { type: 'ci', release: 'patch' },
    { type: 'build', release: 'patch' },
    { type: 'security', release: 'patch' },
    { type: 'deps', release: 'patch' },
    { type: 'revert', release: 'patch' },
    { scope: 'no-release', release: false },
    { breaking: true, release: 'major' }
  ],
  
  // Parser options for commit analysis
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
  },
  
  // Writer options for release notes generation
  writerOpts: {
    commitsSort: ['subject', 'scope'],
    groupBy: 'type',
    commitGroupsSort: [
      'feat',
      'fix',
      'perf',
      'security',
      'refactor',
      'style',
      'test',
      'docs',
      'build',
      'ci',
      'chore'
    ],
    commitsSort: ['scope', 'subject'],
    transform: (commit, context) => {
      const issues = [];

      commit.notes.forEach(note => {
        note.title = 'BREAKING CHANGES';
      });

      // Map commit types to user-friendly section names
      if (commit.type === 'feat') {
        commit.type = '✨ Features';
      } else if (commit.type === 'fix') {
        commit.type = '🐛 Bug Fixes';
      } else if (commit.type === 'perf') {
        commit.type = '⚡ Performance Improvements';
      } else if (commit.type === 'security') {
        commit.type = '🔒 Security';
      } else if (commit.type === 'refactor') {
        commit.type = '♻️ Code Refactoring';
      } else if (commit.type === 'docs') {
        commit.type = '📚 Documentation';
      } else if (commit.type === 'style') {
        commit.type = '💎 Styles';
      } else if (commit.type === 'test') {
        commit.type = '🚨 Tests';
      } else if (commit.type === 'build') {
        commit.type = '🛠 Build System';
      } else if (commit.type === 'ci') {
        commit.type = '⚙️ Continuous Integration';
      } else if (commit.type === 'chore') {
        commit.type = '🔧 Chores';
      } else if (commit.type === 'revert') {
        commit.type = '⏪ Reverts';
      } else {
        return;
      }

      if (commit.scope === '*') {
        commit.scope = '';
      }

      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;
        if (url) {
          url = `${url}/issues/`;
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue);
            return `[#${issue}](${url}${issue})`;
          });
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`;
            }

            return `[@${username}](${context.host}/${username})`;
          });
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true;
        }

        return false;
      });

      return commit;
    }
  }
};