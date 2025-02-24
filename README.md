# Todo Application UI

This is the main repository for local development. It controls both the UI and API development environments locally.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Git

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/KristofferHebert/todo-ui.git
   cd todo-ui
   ```

2. Install dependencies
   ```bash
   npm install

3. Start the development server
   ```bash
   npm run dev
   ```

4. Prisma Setup (Todo API Only)
   ```bash
   # Navigate to the todo-api directory
    cd ../todo-api
    npm install
    npm run prisma:migrate
    npm run prisma:generate
    npm run prisma:seed
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run test` - Run tests

## Project Structure

- `app/` - Application code
- `components/` - Reusable UI components
- `constants/` - Constants and configuration
- `pages/` - Next.js pages
- `public/` - Static assets
- `types/` - TypeScript types
