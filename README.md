## Tech Stack

- Next.js 13+ (App Router)
- React 18
- TypeScript
- tRPC for type-safe API calls
- React Query for data fetching and caching
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
`git clone https://github.com/betodevq/slideet.git`

2. Install dependencies:
`npm install`
or
`yarn install`

3. Run the development server:
`npm run dev`
or
`yarn dev`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js 13 app directory containing pages and layouts
- `components/`: React components used throughout the application
- `contexts/`: React contexts, including language context
- `hooks/`: Custom React hooks
- `public/`: Static assets
- `server/`: tRPC router definitions and server-side code
- `styles/`: Global styles and Tailwind CSS configuration
- `utils/`: Utility functions and helpers

## Key Components

- `Game`: Main game component handling puzzle logic
- `ImageSelection`: Component for selecting predefined or custom images
- `PuzzleGrid`: Renders the puzzle grid
- `PuzzlePiece`: Individual puzzle piece component
- `LanguageSelector`: Component for switching between supported languages

## Internationalization

The app supports English and Spanish languages. Language strings are managed through the `useLabels` hook and can be easily extended to support additional languages.
