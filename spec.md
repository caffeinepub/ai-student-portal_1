# AI Student Portal

## Current State
The project has a base React + Motoko scaffold with no App.tsx and no custom backend. The previous build failed because the frontend was never generated.

## Requested Changes (Diff)

### Add
- Full Student Portal app with 6 core modules:
  1. **Courses** -- Course catalog with 9 YouTube-linked courses: Java, Python, C, DSA, Frontend Technologies, SQL, Pattern Programs, Aptitude, Advanced Java. Each course card links directly to the YouTube playlist/video.
  2. **MCQ Tests** -- Multiple choice quiz module with topic-based tests and score tracking
  3. **Coding Practice** -- Practice problems list with difficulty levels and a simple in-browser code editor
  4. **Job Listings** -- Curated tech job listings with role, company, location, and apply link
  5. **AI Resume Builder** -- Guided resume builder form that generates a formatted resume preview
  6. **AI Chat Assistant** -- Simple chat UI for Q&A assistance (frontend-only, no external API)
- Dashboard home page with module navigation cards and progress overview
- Dark/light mode toggle
- Gamification: points/XP system displayed in header
- Admin panel to manage courses, tests, and job listings (protected by Internet Identity login)
- Responsive sidebar navigation

### Modify
- Backend: Add Motoko actors for storing courses, MCQ questions, user progress, job listings, and resume data
- Frontend: Create App.tsx with routing and all module components

### Remove
- Nothing to remove (fresh build)

## Implementation Plan
1. Generate Motoko backend with data types and CRUD for: courses, MCQ tests/questions, job listings, user progress (XP/points), resume profiles
2. Build frontend App.tsx with React Router and sidebar layout
3. Build Dashboard page
4. Build Courses page with 9 hardcoded YouTube course cards
5. Build MCQ Tests page with sample questions per topic
6. Build Coding Practice page with problem list and code editor textarea
7. Build Job Listings page with sample listings
8. Build AI Resume Builder page with form + preview
9. Build AI Chat Assistant page (static Q&A bot)
10. Build Admin panel (login-gated) for managing content
11. Dark/light mode and XP gamification in header
