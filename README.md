# Next Notes Boilerplate

This is a boilerplate project built with Next.js, Prisma, and TypeScript. It provides a foundation for creating a full-stack application with authentication, protected routes, and a structured folder organization.

## Features

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Prisma**: A modern ORM for database management.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Authentication**: Pre-configured authentication routes for sign-in and sign-up.
- **Protected Routes**: Layouts and pages for authenticated users.
- **Theming**: Light and dark mode toggle.
- **Docker Support**: Includes a `Dockerfile` for containerization.
- **ESLint**: Configured for code linting.
- **PostCSS**: For advanced CSS processing.

## Folder Structure

- **app/**: Contains the main application pages and layouts.
  - **auth/**: Authentication-related routes (e.g., sign-in, sign-up).
  - **main/**: Protected routes for authenticated users (e.g., dashboard, posts).
- **components/**: Reusable UI components (e.g., buttons, dropdown menus).
- **generated/**: Auto-generated Prisma files (e.g., models, enums).
- **lib/**: Utility functions and libraries (e.g., Prisma client, authentication helpers).
- **prisma/**: Prisma schema and migrations.
- **public/**: Static assets (e.g., images, icons).

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PNPM (preferred package manager)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd next-notes
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the database:

   - Update the `DATABASE_URL` in your `.env` file.
   - Run Prisma migrations:
     ```bash
     pnpm prisma migrate dev
     ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint to check for code quality.
- `pnpm prisma studio`: Open Prisma Studio to manage your database visually.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Docker

To run the application in a Docker container:

1. Build the Docker image:

   ```bash
   docker build -t project-name .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 project-name
   ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
