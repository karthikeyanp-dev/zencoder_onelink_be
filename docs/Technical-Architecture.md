# OneLink - Technical Architecture & Development Plan

## Table of Contents
1. [Development Phases](#development-phases)
2. [Application Pages](#application-pages)
3. [Frontend Architecture (Angular)](#frontend-architecture-angular)
4. [Backend Architecture (NestJS)](#backend-architecture-nestjs)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Development Timeline](#development-timeline)

## Development Phases

### Phase 1: Foundation & Authentication (Weeks 1-2)
- Project setup and configuration
- User authentication system
- Basic routing and navigation
- Core UI components

### Phase 2: Core Functionality (Weeks 3-5)
- Collection management
- Link management
- Basic CRUD operations
- Link metadata extraction

### Phase 3: Advanced Features (Weeks 6-7)
- Drag & drop functionality
- Bulk operations
- Search and filtering
- Privacy controls

### Phase 4: Sharing & Social Features (Weeks 8-9)
- Sharing mechanisms
- Public collections
- Social login integration
- Email sharing

### Phase 5: Polish & Optimization (Weeks 10-11)
- Performance optimization
- Mobile responsiveness
- PWA features
- Testing and bug fixes

### Phase 6: Deployment & Launch (Week 12)
- Production deployment
- Monitoring setup
- Documentation
- Launch preparation

## Application Pages

### Public Pages
1. **Landing Page** (`/`)
   - Hero section with app overview
   - Feature highlights
   - Call-to-action buttons

2. **Login Page** (`/login`)
   - Email/password form
   - Social login options
   - Guest mode option
   - Forgot password link

3. **Register Page** (`/register`)
   - Registration form
   - Email verification flow
   - Terms and privacy links

4. **Forgot Password** (`/forgot-password`)
   - Password reset form
   - Email verification

5. **Public Collection View** (`/public/:collectionId`)
   - View shared collections
   - Link previews
   - Collection metadata

### Authenticated Pages
6. **Dashboard** (`/dashboard`)
   - Collections overview
   - Recent activity
   - Quick actions
   - Statistics

7. **Collections List** (`/collections`)
   - All user collections
   - Search and filter
   - Create new collection
   - Collection management

8. **Collection Detail** (`/collections/:id`)
   - Collection metadata
   - Links list/grid view
   - Add new links
   - Collection settings

9. **Link Detail/Edit** (`/collections/:collectionId/links/:linkId`)
   - Link metadata editing
   - Tags management
   - Privacy settings

10. **Profile Settings** (`/profile`)
    - User information
    - Profile picture
    - Privacy settings
    - Account management

11. **Search Results** (`/search`)
    - Global search results
    - Filter options
    - Search suggestions

12. **Shared Collections** (`/shared`)
    - Collections shared with user
    - Collaboration features

## Frontend Architecture (Angular)

### Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   └── models/
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/
│   ├── features/
│   │   ├── auth/
│   │   ├── collections/
│   │   ├── links/
│   │   ├── profile/
│   │   └── dashboard/
│   ├── layout/
│   └── assets/
```

### Core Services

#### Authentication Services
- **AuthService** - Handle login/logout, token management
- **UserService** - User profile management
- **TokenService** - JWT token handling

#### Data Services
- **CollectionService** - Collection CRUD operations
- **LinkService** - Link management
- **MetadataService** - Link metadata extraction
- **SearchService** - Search functionality
- **SharingService** - Sharing mechanisms

#### Utility Services
- **NotificationService** - Toast notifications
- **LoadingService** - Loading states
- **ThemeService** - Theme management
- **StorageService** - Local storage management
- **ValidationService** - Form validation helpers

### Guards

- **AuthGuard** - Protect authenticated routes
- **GuestGuard** - Redirect authenticated users
- **OwnershipGuard** - Verify resource ownership
- **PermissionGuard** - Check user permissions

### Components

#### Shared Components
- **HeaderComponent** - Navigation header
- **SidebarComponent** - Navigation sidebar
- **FooterComponent** - Page footer
- **LoadingSpinnerComponent** - Loading indicator
- **ConfirmDialogComponent** - Confirmation dialogs
- **ToastComponent** - Notification toasts
- **SearchBarComponent** - Search input
- **PaginationComponent** - Pagination controls

#### Collection Components
- **CollectionCardComponent** - Collection preview card
- **CollectionListComponent** - Collections list view
- **CollectionGridComponent** - Collections grid view
- **CreateCollectionComponent** - Collection creation form
- **EditCollectionComponent** - Collection editing form
- **CollectionSettingsComponent** - Collection settings

#### Link Components
- **LinkCardComponent** - Link preview card
- **LinkListComponent** - Links list view
- **LinkGridComponent** - Links grid view
- **AddLinkComponent** - Link addition form
- **EditLinkComponent** - Link editing form
- **LinkPreviewComponent** - Rich link preview
- **BulkActionsComponent** - Bulk operations toolbar

#### Form Components
- **LoginFormComponent** - Login form
- **RegisterFormComponent** - Registration form
- **ProfileFormComponent** - Profile editing form
- **PasswordResetFormComponent** - Password reset form

### Directives

- **DragDropDirective** - Drag and drop functionality
- **LazyLoadDirective** - Lazy loading images
- **ClickOutsideDirective** - Click outside detection
- **AutofocusDirective** - Auto focus elements
- **TooltipDirective** - Tooltip functionality
- **InfiniteScrollDirective** - Infinite scrolling

### Pipes

- **TruncatePipe** - Text truncation
- **TimeAgoPipe** - Relative time display
- **DomainPipe** - Extract domain from URL
- **HighlightPipe** - Search term highlighting
- **SafeUrlPipe** - Safe URL sanitization
- **FileSizePipe** - File size formatting

### State Management

#### NgRx Store Structure
```
store/
├── auth/
│   ├── auth.actions.ts
│   ├── auth.reducer.ts
│   ├── auth.effects.ts
│   └── auth.selectors.ts
├── collections/
│   ├── collections.actions.ts
│   ├── collections.reducer.ts
│   ├── collections.effects.ts
│   └── collections.selectors.ts
├── links/
│   ├── links.actions.ts
│   ├── links.reducer.ts
│   ├── links.effects.ts
│   └── links.selectors.ts
└── ui/
    ├── ui.actions.ts
    ├── ui.reducer.ts
    └── ui.selectors.ts
```

## Backend Architecture (NestJS)

### Project Structure
```
src/
├── auth/
│   ├── guards/
│   ├── strategies/
│   ├── decorators/
│   └── dto/
├── users/
│   ├── entities/
│   ├── dto/
│   └── services/
├── collections/
│   ├── entities/
│   ├── dto/
│   └── services/
├── links/
│   ├── entities/
│   ├── dto/
│   └── services/
├── sharing/
│   ├── entities/
│   ├── dto/
│   └── services/
├── metadata/
│   ├── services/
│   └── dto/
├── common/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   ├── decorators/
│   └── filters/
└── config/
```

### Modules

#### Core Modules
- **AuthModule** - Authentication and authorization
- **UsersModule** - User management
- **CollectionsModule** - Collection operations
- **LinksModule** - Link management
- **SharingModule** - Sharing functionality
- **MetadataModule** - Link metadata extraction
- **EmailModule** - Email services
- **FileUploadModule** - File upload handling

#### Database Modules
- **DatabaseModule** - Database configuration
- **MigrationModule** - Database migrations

### Controllers

- **AuthController** - Authentication endpoints
- **UsersController** - User management endpoints
- **CollectionsController** - Collection CRUD endpoints
- **LinksController** - Link management endpoints
- **SharingController** - Sharing endpoints
- **MetadataController** - Metadata extraction endpoints
- **SearchController** - Search endpoints

### Services

#### Business Logic Services
- **AuthService** - Authentication logic
- **UsersService** - User operations
- **CollectionsService** - Collection business logic
- **LinksService** - Link operations
- **SharingService** - Sharing logic
- **MetadataService** - Metadata extraction
- **SearchService** - Search functionality
- **NotificationService** - Email notifications

#### Utility Services
- **HashingService** - Password hashing
- **TokenService** - JWT token management
- **FileService** - File operations
- **ValidationService** - Data validation
- **CacheService** - Caching operations

### Guards

- **JwtAuthGuard** - JWT authentication
- **RolesGuard** - Role-based access
- **OwnershipGuard** - Resource ownership
- **ThrottlerGuard** - Rate limiting

### Interceptors

- **LoggingInterceptor** - Request logging
- **TransformInterceptor** - Response transformation
- **ErrorInterceptor** - Error handling
- **CacheInterceptor** - Response caching

### Pipes

- **ValidationPipe** - Input validation
- **ParseIntPipe** - Integer parsing
- **ParseUUIDPipe** - UUID validation

## Database Schema

### Tables

#### Users
```sql
users {
  id: UUID (PK)
  email: VARCHAR(255) UNIQUE
  username: VARCHAR(50) UNIQUE
  password_hash: VARCHAR(255)
  display_name: VARCHAR(100)
  bio: TEXT
  profile_picture: VARCHAR(255)
  email_verified: BOOLEAN
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### Collections
```sql
collections {
  id: UUID (PK)
  user_id: UUID (FK)
  name: VARCHAR(255)
  description: TEXT
  cover_image: VARCHAR(255)
  privacy: ENUM('private', 'shared', 'public')
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### Links
```sql
links {
  id: UUID (PK)
  collection_id: UUID (FK)
  url: TEXT
  title: VARCHAR(500)
  description: TEXT
  favicon: VARCHAR(255)
  preview_image: VARCHAR(255)
  domain: VARCHAR(255)
  tags: JSON
  privacy_override: ENUM('show', 'hide')
  position: INTEGER
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### Shares
```sql
shares {
  id: UUID (PK)
  collection_id: UUID (FK)
  shared_by: UUID (FK)
  shared_with: UUID (FK)
  permission: ENUM('view', 'edit')
  created_at: TIMESTAMP
}
```

#### Public_Links
```sql
public_links {
  id: UUID (PK)
  collection_id: UUID (FK)
  short_id: VARCHAR(10) UNIQUE
  expires_at: TIMESTAMP
  created_at: TIMESTAMP
}
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset
- `POST /auth/verify-email` - Email verification

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/upload-avatar` - Upload profile picture
- `DELETE /users/account` - Delete user account

### Collections
- `GET /collections` - Get user collections
- `POST /collections` - Create collection
- `GET /collections/:id` - Get collection details
- `PUT /collections/:id` - Update collection
- `DELETE /collections/:id` - Delete collection
- `GET /collections/:id/links` - Get collection links

### Links
- `POST /collections/:id/links` - Add link to collection
- `GET /links/:id` - Get link details
- `PUT /links/:id` - Update link
- `DELETE /links/:id` - Delete link
- `POST /links/bulk-move` - Bulk move links
- `POST /links/bulk-delete` - Bulk delete links
- `PUT /links/:id/position` - Update link position

### Sharing
- `POST /collections/:id/share` - Share collection
- `GET /collections/:id/shares` - Get collection shares
- `DELETE /shares/:id` - Remove share
- `GET /public/:shortId` - Get public collection
- `POST /collections/:id/public-link` - Create public link

### Metadata
- `POST /metadata/extract` - Extract URL metadata
- `GET /metadata/favicon/:domain` - Get domain favicon

### Search
- `GET /search/collections` - Search collections
- `GET /search/links` - Search links
- `GET /search/global` - Global search

## Development Timeline

### Week 1-2: Foundation
- [ ] Project setup (Angular + NestJS)
- [ ] Database setup and migrations
- [ ] Authentication system
- [ ] Basic routing and navigation
- [ ] Core UI components

### Week 3-4: Core Features
- [ ] Collection CRUD operations
- [ ] Link management
- [ ] Metadata extraction service
- [ ] Basic UI for collections and links

### Week 5-6: Advanced Features
- [ ] Drag & drop functionality
- [ ] Search and filtering
- [ ] Bulk operations
- [ ] Privacy controls

### Week 7-8: Sharing Features
- [ ] Collection sharing
- [ ] Public links
- [ ] Social login integration
- [ ] Email sharing

### Week 9-10: Polish
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] PWA features
- [ ] Testing

### Week 11-12: Deployment
- [ ] Production setup
- [ ] Monitoring and logging
- [ ] Documentation
- [ ] Launch preparation

## Technology Stack

### Frontend
- **Framework**: Angular 17+
- **State Management**: NgRx
- **UI Library**: Angular Material
- **Styling**: SCSS
- **Build Tool**: Angular CLI
- **Testing**: Jasmine, Karma, Cypress

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **File Storage**: AWS S3 / Local Storage
- **Email**: SendGrid / Nodemailer
- **Testing**: Jest

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: AWS / Vercel
- **Monitoring**: Sentry
- **Analytics**: Google Analytics

## Security Considerations

- JWT token management with refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- SQL injection prevention
- XSS protection
- CSRF protection
- HTTPS enforcement
- Data encryption at rest

## Performance Optimization

- Lazy loading of modules
- Image optimization and caching
- Database query optimization
- CDN for static assets
- Gzip compression
- Service worker for caching
- Virtual scrolling for large lists
- Debounced search
- Connection pooling
- Redis caching