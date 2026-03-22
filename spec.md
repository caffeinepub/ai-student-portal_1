# AI Student Portal

## Current State
Job section shows job cards with an external Apply Now link that redirects to the company website. No in-app application flow exists.

## Requested Changes (Diff)

### Add
- JobApplication backend type: id, job_id, applicant_name, email, phone, cover_letter, applied_at
- Backend: applyForJob, getMyApplications, getAllApplications (admin)
- In-app Apply dialog on each job card with form: Name, Email, Phone, Cover Letter
- Applied badge on cards once student has applied
- My Applications tab to track submitted applications
- New badge on recently added jobs
- Admin view of all applications

### Modify
- JobListings.tsx: replace external link with in-app apply dialog
- AdminPanel.tsx: add Applications tab

### Remove
- Nothing

## Implementation Plan
1. Regenerate Motoko backend with JobApplication type and functions
2. Rebuild JobListings.tsx with apply dialog, My Applications tab, New badges
3. Update AdminPanel.tsx with applications view
