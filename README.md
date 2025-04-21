# EventBook - Event Booking System

This is a full-stack event booking application built with modern web technologies that allows users to create, browse, and book events.

## Project Overview

EventBook is a comprehensive event booking platform where:
- Users can browse and search for events
- Create and manage their own events
- Book tickets for events
- Manage their bookings

## Tech Stack

### Frontend
- **Next.js 15.3** - React framework for server-side rendering and static site generation
- **React 19.0** - UI library for building user interfaces
- **TypeScript** - For type-safe code
- **TailwindCSS** - For styling and responsive design
- **HeadlessUI** - For accessible UI components
- **React Hook Form** - For form handling with validation
- **Zod** - For schema validation
- **Axios** - For HTTP requests

### Backend
- **Next.js API Routes** - For serverless API endpoints
- **Prisma** - ORM for database operations
- **NextAuth.js** - For authentication
- **bcrypt** - For password hashing

### Database
- **PostgreSQL** - Main database (via Prisma)

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── bookings/     # Booking management
│   │   └── events/       # Event management
│   ├── (routes)/         # Frontend pages
│   └── layout.tsx        # Root layout
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Authentication setup
│   └── db.ts             # Database configuration
└── prisma/               # Database schema and migrations
```

## Database Schema

The application uses Prisma as ORM with the following main models:

```prisma
// Main models (simplified view)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  events    Event[]  // Events created by user
  bookings  Booking[] // User's bookings
}

model Event {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  date        DateTime
  location    String
  capacity    Int
  price       Float
  creatorId   Int
  creator     User     @relation(fields: [creatorId], references: [id])
  bookings    Booking[]
}

model Booking {
  id        Int      @id @default(autoincrement())
  eventId   Int
  userId    Int
  event     Event    @relation(fields: [eventId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

## Features

- **Authentication & Authorization**
  - User registration and login
  - Protected routes and API endpoints
  - Role-based access control

- **Event Management**
  - Create, update, and delete events
  - Event search and filtering
  - Event details with booking functionality

- **Booking System**
  - Book event tickets
  - View and manage bookings
  - Booking confirmation and history

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/JunaidAhammedU/Event_Booking_System.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDAwZGEzNDAtNWY1Zi00OWE5LThlNzgtNmZjYjUzYjEzN2NhIiwidGVuYW50X2lkIjoiMDRkYmM2OGExZjkzZmJlNGIwNzE3NGRlNGE2YmJhNDUxZGQ0MmIzYWQwOGQ5NDI4NDBkOWQ5YTdlMzAwMGQ0OCIsImludGVybmFsX3NlY3JldCI6IjA0ZjJhMzA2LTljYTAtNDM3My04YTI4LWViNzhiMjMyZGNiMSJ9.iUJ2NlEPpcXC71Y4VNQ9a0tjmyLt-BL4B25WbIxykJs"
NEXTAUTH_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

4. Run database migrations
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server
```bash
npm run dev
```

Open https://event-booking-system-xd99.vercel.app/events with your browser to see the result.

## Development

The project uses modern development practices:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks

## Deployment

The application can be deployed on:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- Any platform supporting Next.js

## API Documentation

The API follows RESTful principles with the following main endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - Authentication endpoints

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Bookings
- `GET /api/bookings` - List user's bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
