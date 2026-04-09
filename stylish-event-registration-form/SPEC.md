# Event Registration Form - Specification

## 1. Concept & Vision

A sleek, modern event registration form that feels premium and trustworthy. The design evokes the feeling of an exclusive tech conference or creative workshop — professional yet approachable. The form guides users through registration with subtle animations and clear feedback, making the process feel effortless and memorable.

## 2. Design Language

**Aesthetic Direction:** Modern gradient card design with glassmorphism accents, inspired by premium SaaS onboarding flows.

**Color Palette:**
- Primary: `#6366f1` (Indigo 500)
- Secondary: `#8b5cf6` (Violet 500)
- Accent: `#06b6d4` (Cyan 500)
- Background: `#0f172a` (Slate 900) with gradient overlay
- Card Background: `rgba(30, 41, 59, 0.8)` (Slate 800 with transparency)
- Text Primary: `#f1f5f9` (Slate 100)
- Text Secondary: `#94a3b8` (Slate 400)
- Error: `#ef4444` (Red 500)
- Success: `#22c55e` (Green 500)

**Typography:**
- Primary Font: Inter (Google Fonts) with system-ui fallback
- Heading: 600 weight, 2rem
- Body: 400 weight, 1rem
- Labels: 500 weight, 0.875rem

**Spatial System:**
- Card padding: 2.5rem
- Field spacing: 1.5rem
- Border radius: 0.75rem (xl)
- Input height: 3rem

**Motion Philosophy:**
- Input focus: border color transition 200ms ease-out
- Button hover: background shift + subtle lift (transform: translateY(-1px)) 200ms
- Error messages: fade-in with slight slide 300ms ease-out
- Success state: scale + fade transition 400ms ease-out
- Form submission: button loading spinner animation

## 3. Layout & Structure

**Page Structure:**
- Full viewport height centered layout
- Animated gradient background with floating orbs
- Single card container (max-width: 480px) with subtle shadow and border
- Form header with event icon and title
- Vertical form field stack
- Submit button full-width at bottom

**Responsive Strategy:**
- Mobile: Card fills width with 1rem padding
- Tablet+: Card has fixed max-width, centered with auto margins

## 4. Features & Interactions

**Core Features:**
1. **Text Input (Name):** Required field, minimum 2 characters
2. **Email Input:** Required, valid email format validation
3. **Phone Input:** Required, accepts 10+ digit phone numbers
4. **Organization Input:** Required, minimum 2 characters
5. **Event Dropdown:** Required, 5 event options
6. **Submit Button:** Triggers validation and submission

**Validation Behavior:**
- Real-time validation on blur (when user leaves a field)
- All fields validated on submit attempt
- Error messages appear below each field with red text
- Invalid fields show red border
- First error field receives focus

**Submission Flow:**
1. Button shows "Registering..." with spinner
2. Simulated 1.5s API delay
3. Success: Form replaced with success message + checkmark animation
4. Form can be reset via "Register Another" button

**Error Messages:**
- Name: "Please enter your full name (at least 2 characters)"
- Email: "Please enter a valid email address"
- Phone: "Please enter a valid phone number (at least 10 digits)"
- Organization: "Please enter your college or organization name"
- Event: "Please select an event"

## 5. Component Inventory

**Input Field Component:**
- Default: Dark background, slate border, placeholder text
- Focus: Indigo border glow, label color change
- Error: Red border, red label tint, error message below
- Disabled: Reduced opacity, not-allowed cursor

**Dropdown Component:**
- Default: Same as input
- Open: Options list with hover states
- Selected: Shows selected value

**Submit Button:**
- Default: Gradient background (indigo to violet), white text
- Hover: Brightness increase, slight lift shadow
- Loading: Spinner icon, "Registering..." text, disabled
- Disabled: Reduced opacity

**Success Card:**
- Green checkmark icon with circular animation
- "Registration Successful!" heading
- Confirmation message with user's name
- "Register Another" button to reset

## 6. Technical Approach

**Framework:** React with TypeScript, Vite, Tailwind CSS

**Architecture:**
- Single App.tsx component with internal state management
- useState for form data, errors, submission state
- Custom validation functions
- Tailwind CSS for all styling (no external CSS files)

**Form Data Structure:**
```typescript
interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  event: string;
}
```

**Validation Strategy:**
- Individual field validators returning boolean
- Form-level validation aggregates all field results
- Error state tracked per field for inline messaging
