# Landing Page Design Specification

## 1. Purpose

Create a modern SaaS-style landing page for the **Project Management Web App**.

The visual direction should closely follow the style demonstrated in the provided reference video:

- Clean SaaS/product website
- Large amount of white space
- Soft pastel purple/blue gradient backgrounds
- Purple as the main accent
- Large centered typography
- Rounded cards
- Product screenshots used as visual proof
- Subtle borders and shadows
- Minimal, premium, calm appearance
- Smooth section-to-section visual rhythm
- Light, spacious layouts rather than dense dashboards

**Important:** The reference video is the visual inspiration. Do not copy its branding, text, logo, or proprietary assets.

---

# 2. Critical Existing Theme Rule

## DO NOT CHANGE THE EXISTING FONT OR COLOR SCHEME

The existing Project Management Web App already has its own font and color system.

The landing page MUST reuse the existing:

- Font family
- Font weights
- Typography tokens
- Primary color
- Secondary color
- Background colors
- Text colors
- Border colors
- Accent colors
- CSS variables / Tailwind theme values
- Existing design tokens

Do **not** introduce a new font.

Do **not** replace the application's existing color palette.

If the reference video uses a slightly different font or color, adapt the reference design to the existing application's font and colors.

### Priority

```text
Existing project font + color scheme
                ↓
        MUST NOT CHANGE
                ↓
Reference video's layout + visual language
                ↓
Adapt to existing project
```

---

# 3. Overall Visual Language

The page should feel like a polished modern SaaS product.

### Main characteristics

- White/light base
- Very generous spacing
- Soft purple/blue atmospheric gradients
- Rounded UI
- Thin subtle borders
- Light shadows
- Large headings
- Short paragraphs
- Compact navigation
- Purple primary CTA
- Product UI screenshots inside rounded containers
- Minimal decorative elements
- Strong visual hierarchy

Avoid:

- Dense layouts
- Excessive gradients
- Heavy shadows
- Sharp rectangular cards everywhere
- Too many colors
- Excessive animations
- Large amounts of text
- Visually noisy backgrounds

---

# 4. Page Structure

The landing page should follow this structure:

```text
Landing Page
│
├── Navbar
│
├── Hero Section
│   ├── Small Eyebrow / Badge
│   ├── Large Headline
│   ├── Supporting Description
│   ├── Primary CTA
│   ├── Secondary CTA
│   └── Dashboard/Product Preview
│
├── Trust / Social Proof
│   └── Company / Team Logos or Product Metrics
│
├── How It Works
│   ├── Section Label
│   ├── Heading
│   ├── Description
│   └── 3 Step Cards
│
├── Features
│   ├── Section Label
│   ├── Heading
│   └── Feature Showcase Cards
│
├── Pricing
│   ├── Section Label
│   ├── Heading
│   ├── Billing Toggle
│   └── Pricing Cards
│
├── Testimonials
│   ├── Section Label
│   ├── Heading
│   └── Testimonial Cards
│
├── FAQ
│   ├── Section Label
│   ├── Heading
│   └── Accordion Questions
│
├── Final CTA
│
└── Footer
```

---

# 5. Navbar

The reference uses a very clean SaaS navbar.

### Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Logo       Features   How It Works   Testimonials   Pricing   │
│                                                  My Dashboard │
└──────────────────────────────────────────────────────────────┘
```

### Requirements

- Keep the navbar minimal.
- Logo on the left.
- Navigation links centered/right.
- Primary action on the right.
- Use a rounded CTA button.
- Keep the navbar visually lightweight.
- Use generous horizontal padding.
- Use a subtle background or transparent appearance depending on scroll state.

### Authentication-aware CTA

#### Logged out

```text
Login
Get Started
```

#### Logged in

```text
My Dashboard
```

The **My Dashboard** button must navigate to the existing dashboard.

---

# 6. Hero Section

The hero is the most important section.

The reference video uses:

- Large centered headline
- Small eyebrow/badge above it
- Short supporting paragraph
- Two CTA buttons
- Large product screenshot underneath
- Soft gradient atmosphere behind the entire hero

### Layout

```text
                    [ Small Badge ]

             LARGE HERO HEADLINE
          Large, bold, clean typography

        Short supporting description
       explaining the product's value

          [ Primary CTA ] [ Secondary CTA ]


       ┌──────────────────────────────┐
       │                              │
       │      PRODUCT DASHBOARD       │
       │          PREVIEW             │
       │                              │
       └──────────────────────────────┘

       Soft purple / blue background glow
```

### Hero heading

Use a strong value proposition for project management.

Example direction:

> Manage Your Projects Smarter,
> Built for Teams That Get Things Done.

Do not use the exact wording from the reference video.

### Hero CTA

For logged-in users:

**My Dashboard**

For logged-out users:

**Get Started**

Optional secondary CTA:

**See How It Works**

---

# 7. Hero Background

The reference has a soft atmospheric background.

Create:

- Very light base
- Purple glow
- Blue/cyan glow
- Soft blurred gradient blobs
- Very subtle cloud-like/blurred visual treatment

The background must remain subtle.

The content must always have stronger contrast than the background.

### Important

Use the existing project's colors as the source of truth.

Do not introduce an unrelated color palette.

---

# 8. Product Screenshot / Dashboard Showcase

The reference heavily uses screenshots of the actual product.

This should be one of the strongest visual elements.

### Requirements

Display the existing Project Management Dashboard inside a large rounded container.

```text
        ┌───────────────────────────────────────┐
        │                                       │
        │          PROJECT DASHBOARD            │
        │                                       │
        │   Sidebar | Projects | Tasks | ...   │
        │                                       │
        └───────────────────────────────────────┘
```

### Styling

- Large rounded corners
- Thin border
- Very subtle shadow
- Slight depth
- Soft gradient glow behind it
- Do not distort the dashboard UI
- Use the actual application's UI whenever possible

The screenshot should appear to float slightly above the page.

---

# 9. Trust / Social Proof

Immediately after the hero, add a small trust section.

Possible structure:

```text
Trusted by modern teams

[ Logo ] [ Logo ] [ Logo ] [ Logo ] [ Logo ]
```

If the application does not have real customers or companies, do NOT invent customer claims.

Instead use factual product information such as:

```text
Built for modern project teams
```

or actual product capabilities.

---

# 10. How It Works Section

The reference uses a clean three-step section.

### Layout

```text
              HOW IT WORKS

        Get Started in Three Simple Steps

   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
   │     01      │ │     02      │ │     03      │
   │             │ │             │ │             │
   │ Create      │ │ Create      │ │ Invite      │
   │ Account     │ │ Projects    │ │ Team        │
   │             │ │             │ │             │
   └─────────────┘ └─────────────┘ └─────────────┘
```

### Three steps

1. Create your account
2. Create and organize projects
3. Invite teammates and track progress

Use small UI illustrations/cards inside the step cards if appropriate.

---

# 11. Features Section

The reference uses feature sections with product screenshots inside large cards.

### Main heading

Example:

> Manage Projects With Confidence

### Feature cards

Recommended features:

#### Smart Project Management
Create, organize and monitor projects from one place.

#### Seamless Collaboration
Assign tasks, communicate and work with your team.

#### Smart Task Management
Track task status, priority, deadlines and progress.

#### Progress Tracking
Understand project progress at a glance.

Only advertise features that actually exist in the application.

---

# 12. Feature Card Design

Cards should be:

- Large
- Rounded
- Minimal
- White/light background
- Thin border
- Very subtle shadow
- Generous internal spacing

Example:

```text
┌──────────────────────────────────────────────────┐
│                                                  │
│  Feature title                                   │
│  Short description                               │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  │             PRODUCT UI                    │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

Use different screenshot crops for different features.

---

# 13. Pricing Section

The reference uses a very clean pricing section.

### Layout

```text
                 CLEAR & SIMPLE PRICING

             Choose the plan that fits you

               [ Monthly ] [ Yearly ]

        ┌────────────┐      ┌────────────┐
        │   Free     │      │    Pro     │
        │            │      │            │
        │    $0      │      │   $20      │
        │            │      │            │
        │  Features  │      │  Features  │
        │  Features  │      │  Features  │
        │            │      │            │
        │  [Choose]  │      │  [Choose]  │
        └────────────┘      └────────────┘
```

If the application does not actually have paid plans, do not fabricate pricing.

Instead, replace this section with a factual product section such as:

- What you get
- Workspace capabilities
- Free features

---

# 14. Testimonials

The reference uses multiple testimonial cards in a horizontal grid.

### Layout

```text
              TRUSTED BY TEAMS

        See how teams use the platform

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ ⭐⭐⭐⭐⭐      │ │ ⭐⭐⭐⭐⭐      │ │ ⭐⭐⭐⭐⭐      │
│             │ │             │ │             │
│ Testimonial │ │ Testimonial │ │ Testimonial │
│             │ │             │ │             │
│ User Name   │ │ User Name   │ │ User Name   │
└─────────────┘ └─────────────┘ └─────────────┘
```

### Important

Do not invent real customer testimonials.

If there are no real users, use:

- Clearly marked demo testimonials, or
- A different factual section.

---

# 15. FAQ Section

The reference has a two-column FAQ layout.

### Layout

```text
┌───────────────────────┬──────────────────────────────┐
│                       │  01  Is there a free plan?  +│
│ Frequently Asked      ├──────────────────────────────┤
│ Questions             │  02  Can I invite members? +│
│                       ├──────────────────────────────┤
│ Still have a          │  03  Can I manage projects?+│
│ question?             ├──────────────────────────────┤
│                       │  04  Can I track tasks?     +│
│ [Contact Us]          ├──────────────────────────────┤
│                       │  05  Is my data secure?     +│
└───────────────────────┴──────────────────────────────┘
```

Use accordion interaction.

### FAQ topics

- What is this project management app?
- Can I create multiple projects?
- Can I invite team members?
- Can I assign tasks?
- Can I track project progress?
- What happens when I log out?

Only include questions relevant to actual functionality.

---

# 16. Final CTA

End the main content with a strong but minimal CTA.

Example:

```text
        Ready to manage your projects better?

       Start organizing your work today.

          [ Get Started ]
```

For authenticated users:

```text
        Continue Managing Your Projects

             [ My Dashboard ]
```

Use the same soft gradient atmosphere as the hero.

---

# 17. Footer

Keep the footer minimal.

### Structure

```text
┌────────────────────────────────────────────────────────────┐
│ Logo                                                       │
│ Short product description                                 │
│                                                            │
│ Product       Company       Resources       Legal          │
│ Features      About        Help             Privacy        │
│ Dashboard     Contact      FAQ              Terms          │
│                                                            │
│ ────────────────────────────────────────────────────────── │
│ © 2026 Project Management App                              │
└────────────────────────────────────────────────────────────┘
```

Only include links that actually exist.

---

# 18. Typography

The reference uses large, clean SaaS typography.

However:

## DO NOT CHANGE THE EXISTING PROJECT FONT.

Use the existing font family.

### Hierarchy

```text
Hero Heading
↓
Very large / bold

Section Heading
↓
Large / semibold

Card Heading
↓
Medium / semibold

Body
↓
Regular / comfortable line height

Labels
↓
Small / medium weight
```

Maintain strong hierarchy through size and weight, not by introducing new fonts.

---

# 19. Color System

## Existing Project Colors Are the Source of Truth

Do not create a new color system.

The reference visually suggests:

- White / off-white backgrounds
- Dark purple text
- Purple primary CTA
- Soft lavender
- Pale blue
- Light gray borders

But these are **visual references only**.

The implementation must use the project's existing colors.

If the existing project already has:

```text
--primary
--secondary
--background
--foreground
--muted
--border
```

reuse those variables.

---

# 20. Cards

All major cards should follow a consistent design language.

### Card properties

- Rounded corners
- Thin border
- Light shadow
- Comfortable padding
- Clean typography
- Minimal decoration

Avoid excessive glassmorphism unless it already exists in the project.

---

# 21. Buttons

Primary buttons should be visually prominent.

### Primary

```text
┌──────────────────────┐
│    My Dashboard →    │
└──────────────────────┘
```

Characteristics:

- Existing primary project color
- Rounded corners
- Medium/bold text
- Comfortable horizontal padding
- Subtle hover transition

### Secondary

Use an outlined/light button where appropriate.

---

# 22. Animation & Interaction

The reference has a polished presentation feel.

Use subtle animations:

### On page load

- Hero content fades/slides upward
- Product preview gently appears
- Background gradients softly animate

### On scroll

- Sections reveal progressively
- Cards fade/translate slightly
- Product screenshots appear smoothly

### Hover

- Buttons slightly change appearance
- Cards can subtly lift
- Navigation links have subtle hover states

### Important

Animations must be:

- Smooth
- Fast enough to feel responsive
- Subtle
- Not distracting

Do not add excessive animations.

Respect `prefers-reduced-motion`.

---

# 23. Section Spacing

The reference uses very generous spacing.

Use a consistent vertical rhythm.

```text
Navbar
    ↓
Large spacing
    ↓
Hero
    ↓
Large spacing
    ↓
Trust
    ↓
Large spacing
    ↓
How It Works
    ↓
Large spacing
    ↓
Features
    ↓
Large spacing
    ↓
Pricing
    ↓
Large spacing
    ↓
Testimonials
    ↓
Large spacing
    ↓
FAQ
    ↓
Large spacing
    ↓
Final CTA
    ↓
Footer
```

Avoid tightly packed sections.

---

# 24. Responsive Design

Desktop should resemble the reference most closely.

### Desktop

- Wide content container
- Large hero typography
- Multi-column feature cards
- Large dashboard preview
- Spacious sections

### Tablet

- Reduce typography slightly
- Reduce horizontal padding
- Adjust card columns
- Preserve visual hierarchy

### Mobile

- Stack all multi-column sections
- Collapse navbar into mobile menu
- Reduce hero heading size
- Full-width CTA buttons where appropriate
- Product screenshot remains readable
- FAQ becomes single-column
- Pricing cards stack vertically

---

# 25. Container

Use a consistent maximum-width content container.

Suggested conceptual structure:

```text
Viewport
│
├── Full-width background
│
└── Centered content container
        │
        ├── Navbar
        ├── Hero
        ├── Sections
        └── Footer
```

Do not allow text or cards to stretch unnecessarily across the entire screen.

---

# 26. Content Rules

The landing page should communicate:

- What the product is
- Who it is for
- What problems it solves
- How it works
- What features it provides
- How the user gets started

Keep copy concise.

Avoid large paragraphs.

Use:

- Strong headings
- Short descriptions
- Bullet points
- Visual demonstrations

---

# 27. Product-Specific Content

The landing page is for a **Project Management Web App**.

Use terminology such as:

- Projects
- Tasks
- Team Members
- Deadlines
- Progress
- Collaboration
- Workspaces
- Project Overview
- Task Management
- Project Tracking
- Team Productivity

Do not claim unsupported features.

---

# 28. Authentication-Based Landing Page Behavior

## Logged Out

```text
/
↓
Landing Page

Navbar:
Login | Get Started

Hero:
Get Started
```

## Logged In

```text
/
↓
Landing Page

Navbar:
My Dashboard

Hero:
My Dashboard
```

### Important

After successful login:

```text
Login
  ↓
Landing Page
  ↓
User clicks "My Dashboard"
  ↓
Dashboard
```

Do NOT do:

```text
Login
  ↓
Dashboard
```

---

# 29. Existing Dashboard Integration

The landing page should showcase the **real existing dashboard**.

Do not build a fake dashboard merely for decoration if the actual dashboard can be reused.

Prefer:

```text
Existing Dashboard Component
        ↓
Landing Page Product Preview
```

If a screenshot is required, generate/use an appropriate static preview from the existing UI without changing the dashboard itself.

---

# 30. Component Structure

Recommended conceptual structure:

```text
src/
│
├── components/
│   └── landing/
│       ├── LandingNavbar
│       ├── HeroSection
│       ├── TrustSection
│       ├── HowItWorks
│       ├── FeaturesSection
│       ├── PricingSection
│       ├── TestimonialsSection
│       ├── FAQSection
│       ├── FinalCTA
│       └── LandingFooter
│
└── pages/
    └── LandingPage
```

Adapt this to the project's existing folder structure rather than forcing a new architecture.

---

# 31. Reference Video Style Summary

The final page should feel like:

```text
                 MODERN SAAS
                      +
               PROJECT MANAGEMENT
                      +
               CLEAN WHITE SPACE
                      +
             PURPLE/BLUE ATMOSPHERE
                      +
              PRODUCT SCREENSHOTS
                      +
               ROUNDED UI CARDS
                      +
             LARGE TYPOGRAPHY
                      +
             SUBTLE ANIMATIONS
```

The most important visual characteristics observed in the reference are:

1. Extremely clean layout
2. Large whitespace
3. Centered hero
4. Large product screenshot
5. Soft purple/blue gradient glow
6. Rounded cards
7. Minimal borders
8. Large typography
9. Short copy
10. Consistent spacing
11. Repeated product UI previews
12. Simple navigation
13. Clean pricing cards
14. Testimonial card grid
15. Two-column FAQ
16. Strong final CTA

---

# 32. Implementation Priority

When implementing, prioritize in this order:

### Priority 1
Existing font and color system

### Priority 2
Overall layout and spacing

### Priority 3
Hero + product showcase

### Priority 4
Features + How It Works

### Priority 5
Pricing / Testimonials / FAQ

### Priority 6
Animations and micro-interactions

### Priority 7
Responsive polish

---

# 33. Final Acceptance Criteria

The landing page is complete only when:

- [ ] Existing font has not been changed
- [ ] Existing color scheme has not been changed
- [ ] Existing dashboard remains functional
- [ ] Login still works
- [ ] Signup still works
- [ ] Logout still works
- [ ] Login redirects to Landing Page
- [ ] Landing Page has a working My Dashboard button for authenticated users
- [ ] My Dashboard opens the existing Dashboard
- [ ] Dashboard remains protected
- [ ] Navbar adapts to authentication state
- [ ] Hero matches the reference visual language
- [ ] Product dashboard preview is included
- [ ] How It Works section exists
- [ ] Features section exists
- [ ] FAQ exists
- [ ] Footer exists
- [ ] Responsive design works
- [ ] Animations are subtle and performant
- [ ] No unsupported product claims are added
- [ ] No unrelated existing functionality is modified

---

# Design Goal

The final landing page should look like a **premium modern SaaS project-management product**, using the **visual language of the reference video** while remaining completely consistent with the **existing project's font, colors, branding, and functionality**.
