# AI Student Portal

## Current State
The Job Listings page shows job cards fetched from the backend (with fallback static data). Each card has company, title, location, description, job type badge, and a single "Apply Now" button linking to a company careers page. Filters exist for All / Full-time / Internship / Part-time.

## Requested Changes (Diff)

### Add
- A dedicated "Internships" visual section / highlighted area at the top of job listings to make internship opportunities more prominent.
- LinkedIn direct apply button on every job card (opens the job's LinkedIn posting or LinkedIn Jobs search for that role).
- More internship listings in the fallback data (across Google, Microsoft, Amazon, Zomato, Razorpay, etc.) with real LinkedIn job search URLs.
- A "linkedin_url" field in the fallback job data type so each job can carry its own LinkedIn link.
- Visual LinkedIn branding (blue LinkedIn icon/badge) on the apply button.

### Modify
- FALLBACK_JOBS expanded with 5+ more internships and jobs, each with both an apply_url (company careers) and a linkedin_url (LinkedIn job search URL).
- Job cards: replace single "Apply Now" button with two side-by-side buttons: "Apply Now" (company site) and "LinkedIn" (LinkedIn apply link).
- Header description updated to mention internships explicitly.

### Remove
- Nothing removed.

## Implementation Plan
1. Add `linkedin_url` field to the `JobListing` type in JobListings.tsx (frontend only, no backend change needed).
2. Expand FALLBACK_JOBS with 8+ entries including full_time, part_time, and internship types, each carrying a `linkedin_url` pointing to LinkedIn Jobs search.
3. Update the job card UI: two buttons per card — "Apply Now" (company site) and a LinkedIn button with LinkedIn's blue branding.
4. Add a highlighted "Internships" section header/banner above the grid when internship filter is active or always visible as a callout.
5. Validate and build.
