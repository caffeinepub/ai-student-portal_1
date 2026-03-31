# AI Student Portal – Coding Section Enhancements

## Current State
- CodingPractice.tsx has a 2-column layout: left (problem description + test cases after submit) and right (code editor)
- Test cases are only revealed **after** the user clicks Submit
- No in-problem AI help is available
- All 3 test cases currently return the same simulated "Passed" output; they are not visually differentiated with distinct expected outputs

## Requested Changes (Diff)

### Add
- **DJ AI Chatbot panel** inside the coding problem view (not a full-page redirect): a collapsible side/bottom panel labelled "Ask DJ"
  - Has a chat interface where student can ask questions about errors or the problem
  - DJ responds with hints only (not full solutions)
  - **Maximum 5 hints per question** — after 5 hints are given, DJ says "You've used all 5 hints for this question. Try solving it yourself!"
  - Hint counter visible: "Hints used: X / 5"
  - When a new problem is opened, hint counter resets to 0
  - DJ responds in a friendly, teaching style — gives partial clues, not full answers
  - "Ask DJ" toggle button in the editor panel header
  - DJ is an AI assistant that uses rule-based responses based on keywords in the question + problem topic

- **Test Cases shown in problem description BEFORE coding starts**
  - In the left panel (Problem Description card), after the hint box, add a "Test Cases" section visible immediately when the problem is opened
  - Show all 3 test cases: Input and Expected Output for each
  - These are read-only preview cards (not result cards)
  - Styled as a code/reference block so students know what output to target before coding

### Modify
- **Test case result panel (after Submit)**: Each test case should show a distinct comparison between "Your Output" (simulated) and "Expected Output"
  - Test Case 1, 2, 3 should have visually different expected output values so students can clearly compare
  - The current implementation returns identical outputs for all 3 — update `extractTestCases` or the problem data structure to ensure each test case has a distinct expected output
  - After submit, show: Input | Expected Output | Your Output (side by side)

### Remove
- Nothing removed

## Implementation Plan
1. Update `CodingPractice.tsx`:
   a. Add DJ chatbot state: `djOpen`, `djMessages`, `djHintsUsed`, `djInput`
   b. Add `handleDJSend()` function that generates a hint response based on problem topic/description keywords
   c. Add DJ panel UI (collapsible, appears below the editor or as a right-side panel on large screens)
   d. Add hint counter badge on the "Ask DJ" button
   e. Reset DJ state (hints counter + messages) when `openProblem()` is called
2. Move test case preview to be always visible in the Problem Description card (before Submit)
   a. Show Input + Expected Output for each of the 3 test cases as read-only reference
   b. Keep the existing post-Submit result panel as-is for pass/fail status
3. Update post-Submit test case display to show a 3-column comparison: Input / Expected / Your Output
   - Simulate distinct "Your Output" values (e.g., slightly different from expected for failed cases)
   - Each test case should have a distinct expected output in the data
