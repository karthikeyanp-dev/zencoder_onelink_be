---
description: Repository Information Overview
alwaysApply: true
---

# OneLink Backend Information

## Summary
OneLink is a mobile-first bookmark management application that enables users to organize, curate, and share collections of links with rich visual previews and seamless social sharing capabilities. This repository contains the backend implementation built with NestJS.

## Structure
- **src/**: Main source code directory containing application logic
  - **main.ts**: Application entry point
  - **app.module.ts**: Root module of the application
  - **app.controller.ts**: Basic controller
  - **app.service.ts**: Basic service
- **test/**: Contains e2e tests
- **dist/**: Compiled JavaScript output
- **docs/**: Project documentation including requirements, design, architecture, and roadmap

## Language & Runtime
**Language**: TypeScript
**Version**: ES2023 target
**Framework**: NestJS v11
**Node.js**: Compatible with latest LTS
**Build System**: NestJS CLI
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- @nestjs/common: ^11.0.1
- @nestjs/core: ^11.0.1
- @nestjs/platform-express: ^11.0.1
- reflect-metadata: ^0.2.2
- rxjs: ^7.8.1

**Development Dependencies**:
- TypeScript: ^5.7.3
- Jest: ^30.0.0
- ESLint: ^9.18.0
- Prettier: ^3.4.2
- ts-jest: ^29.2.5

## Build & Installation
```bash
# Install dependencies
npm install

# Development build
npm run build

# Development with watch mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## Testing
**Framework**: Jest
**Test Location**: src/**/*.spec.ts for unit tests, test/ for e2e tests
**Configuration**: jest.config in package.json, test/jest-e2e.json for e2e tests
**Run Command**:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Planned Architecture
According to the technical architecture documentation, the backend will follow a modular structure:

**Core Modules**:
- AuthModule: Authentication and authorization
- UsersModule: User management
- CollectionsModule: Collection operations
- LinksModule: Link management
- SharingModule: Sharing functionality
- MetadataModule: Link metadata extraction

**Database**:
- PostgreSQL with TypeORM
- Entities for Users, Collections, Links, Shares, and PublicLinks

**API Endpoints**:
- Authentication endpoints (register, login, etc.)
- User management endpoints
- Collection CRUD endpoints
- Link management endpoints
- Sharing endpoints
- Metadata extraction endpoints

The application is currently in the initial setup phase according to the development roadmap, with plans to implement the core functionality in phases over a 12-week development timeline.