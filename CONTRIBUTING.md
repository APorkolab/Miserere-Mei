# Contributing to Miserere Mei

🎉 Thank you for your interest in contributing to Miserere Mei! This document
provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Architecture Guidelines](#architecture-guidelines)

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to
uphold this code. Please report unacceptable behavior to
[adam@porkolab.digital](mailto:adam@porkolab.digital).

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- Use of sexualized language or imagery
- Trolling, insulting comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **Docker** 20.10+ with Docker Compose
- **Git** (latest version)
- **Code Editor**: VS Code recommended with extensions

### Setup Development Environment

1. **Fork and Clone**

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Miserere-Mei.git
cd Miserere-Mei

# Add upstream remote
git remote add upstream https://github.com/APorkolab/Miserere-Mei.git
```

2. **Install Dependencies**

```bash
# Install all project dependencies
npm run install:all

# Set up Git hooks
npm run prepare
```

3. **Start Development Environment**

```bash
# Option 1: Docker (recommended)
npm run docker:dev

# Option 2: Manual
npm start
```

4. **Verify Setup**

```bash
# Run tests
npm test

# Run linting
npm run lint

# Run build
npm run build
```

## 🔄 Development Process

### Branch Strategy

We use **Git Flow** with the following branches:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `hotfix/*`: Critical production fixes
- `release/*`: Release preparation

### Workflow Steps

1. **Create Feature Branch**

```bash
# Always branch from develop
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

2. **Make Changes**

```bash
# Make your changes following the style guide
# Write tests for new functionality
# Update documentation if needed
```

3. **Test Your Changes**

```bash
# Run all tests
npm test

# Run linting
npm run lint:fix

# Test build
npm run build
```

4. **Commit Changes**

```bash
# Use conventional commits
git add .
git commit -m "feat(scope): add amazing new feature

This commit adds the amazing new feature that does X, Y, and Z.

Closes #123"
```

5. **Push and Create PR**

```bash
git push origin feature/your-feature-name
# Create PR on GitHub targeting develop branch
```

## 📝 Commit Guidelines

We use [Conventional Commits](https://conventionalcommits.org/) for automated
versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `security`: Security improvements

### Scopes

Choose appropriate scope from:

**Frontend**: `ui`, `components`, `services`, `guards`, `routing`, `styles`
**Backend**: `api`, `controllers`, `models`, `middleware`, `database`, `auth`
**Game**: `game-engine`, `locations`, `characters`, `inventory`, `combat`
**Infrastructure**: `docker`, `ci`, `deployment`, `monitoring`, `security`

### Examples

```bash
# Good commits
git commit -m "feat(auth): add JWT refresh token mechanism"
git commit -m "fix(game-engine): resolve inventory duplication bug"
git commit -m "docs(api): update authentication endpoints"

# With body and footer
git commit -m "feat(combat): implement turn-based battle system

- Add combat state management
- Implement damage calculation
- Add victory/defeat conditions

Closes #42"
```

## 🔀 Pull Request Process

### PR Requirements

- [ ] **Branch**: Target `develop` branch (unless hotfix)
- [ ] **Tests**: All tests pass
- [ ] **Linting**: Code follows style guidelines
- [ ] **Documentation**: Updated if needed
- [ ] **Description**: Clear description of changes
- [ ] **Issue**: Links to related issue(s)

### PR Template

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to
      not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Documentation updated
- [ ] No new warnings introduced
```

### Review Process

1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one approval from maintainer
3. **Testing**: Manual testing if needed
4. **Documentation**: Verify docs are updated
5. **Merge**: Squash and merge to maintain clean history

## 🎨 Code Style

### General Principles

- **Consistency**: Follow existing patterns
- **Readability**: Write self-documenting code
- **Simplicity**: Prefer simple solutions
- **Performance**: Consider performance implications
- **Security**: Always consider security implications

### Frontend (Angular/TypeScript)

```typescript
// Good: Descriptive names and proper typing
interface GameCharacter {
  readonly id: string;
  name: string;
  level: number;
  health: number;
}

// Good: Service with proper error handling
@Injectable({ providedIn: 'root' })
export class GameService {
  public async saveGame(gameState: GameState): Promise<SaveResult> {
    try {
      const response = await this.http
        .post<SaveResult>('/api/game/save', gameState)
        .toPromise();
      return response;
    } catch (error) {
      this.logger.error('Failed to save game', error);
      throw new SaveGameError('Unable to save game progress');
    }
  }
}

// Good: Component with lifecycle management
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.gameService.gameState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.updateGameBoard(state));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Backend (Node.js/Express)

```javascript
// Good: Proper error handling and logging
const express = require('express');
const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');

/**
 * Save game state for authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const saveGameState = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { gameState } = req.body;
    const userId = req.user.id;

    const result = await gameService.saveGameState(userId, gameState);

    logger.info(`Game saved for user ${userId}`, { gameId: result.id });

    res.status(200).json({
      success: true,
      data: result,
      message: 'Game saved successfully',
    });
  } catch (error) {
    logger.error('Failed to save game state', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Good: Input validation middleware
const validateGameState = [
  body('gameState.level').isInt({ min: 1, max: 100 }),
  body('gameState.health').isInt({ min: 0, max: 100 }),
  body('gameState.location').isString().isLength({ min: 1, max: 100 }),
];

module.exports = { saveGameState, validateGameState };
```

### CSS/SCSS

```scss
// Good: BEM methodology and logical organization
.game-board {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  padding: 1rem;

  &__content {
    background: var(--surface-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
  }

  &__sidebar {
    background: var(--sidebar-bg);
    border-radius: var(--border-radius);
    padding: 1rem;
  }

  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--z-fullscreen);
  }
}

// Good: Responsive design
@media (max-width: 768px) {
  .game-board {
    grid-template-columns: 1fr;

    &__sidebar {
      order: -1;
    }
  }
}
```

## 🧪 Testing

### Testing Philosophy

- **Unit Tests**: Test individual functions/methods
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Coverage**: Aim for >80% code coverage

### Testing Guidelines

```javascript
// Good: Descriptive test names and setup
describe('GameService', () => {
  let gameService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    gameService = new GameService(mockHttpClient);
  });

  describe('saveGame', () => {
    it('should save game state successfully', async () => {
      // Given
      const gameState = { level: 1, health: 100 };
      const expectedResponse = { id: '123', success: true };
      mockHttpClient.post.and.returnValue(of(expectedResponse));

      // When
      const result = await gameService.saveGame(gameState);

      // Then
      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/api/game/save',
        gameState
      );
    });

    it('should handle save errors gracefully', async () => {
      // Given
      const gameState = { level: 1, health: 100 };
      mockHttpClient.post.and.returnValue(throwError('Network error'));

      // When & Then
      await expectAsync(gameService.saveGame(gameState)).toBeRejectedWith(
        jasmine.any(SaveGameError)
      );
    });
  });
});
```

## 🏗️ Architecture Guidelines

### Frontend Architecture

- **Feature Modules**: Organize code by features, not by file type
- **Shared Modules**: Common functionality in shared modules
- **Services**: Business logic in services, not components
- **State Management**: Use reactive patterns with RxJS
- **Performance**: Use OnPush change detection, lazy loading

### Backend Architecture

- **Layered Architecture**: Controller → Service → Repository
- **Error Handling**: Centralized error handling middleware
- **Validation**: Input validation on all endpoints
- **Security**: Authentication, authorization, rate limiting
- **Logging**: Structured logging for observability

### Database Guidelines

- **Migrations**: All schema changes via migrations
- **Indexing**: Proper indexes for query performance
- **Relationships**: Use foreign keys for data integrity
- **Transactions**: Use transactions for multi-step operations

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. **Feature Complete**: All features merged to `develop`
2. **Release Branch**: Create `release/x.y.z` branch
3. **Testing**: Comprehensive testing on release branch
4. **Documentation**: Update docs and changelog
5. **Merge**: Merge to `main` and tag release
6. **Deploy**: Automated deployment via CI/CD

## 🤝 Community

### Communication Channels

- **Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Email**: [adam@porkolab.digital](mailto:adam@porkolab.digital) for private
  matters

### Recognition

Contributors will be:

- Added to the AUTHORS file
- Mentioned in release notes
- Featured in project documentation

## 📚 Resources

### Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/api/)

### Tools and Extensions

**VS Code Extensions:**

- Angular Language Service
- ESLint
- Prettier
- GitLens
- Docker

**Recommended Reading:**

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

## 🎉 Thank You!

Your contributions make this project better for everyone. We appreciate your
time and effort in helping build an amazing text adventure game!

_This contributing guide is a living document. Please suggest improvements via
issues or pull requests._
