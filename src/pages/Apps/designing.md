# Design System & Styling Standards

## 🎨 Color Palette

### Background Colors
- **Primary Background**: `bg-zinc-900/30` - Semi-transparent dark background
- **Secondary Background**: `bg-zinc-900/25` - Lighter semi-transparent background
- **Card Background**: `bg-zinc-900/30` with `backdrop-blur-lg`
- **Hover Background**: `bg-zinc-900/50`
- **Input Background**: `bg-zinc-900/30`
- **Button Background**: `bg-zinc-800/30` or `bg-zinc-700`

### Border Colors
- **Primary Border**: `border-zinc-800/40`
- **Hover Border**: `border-zinc-700/50`
- **Secondary Border**: `border-zinc-700/40`
- **Accent Border**: `border-zinc-600/50`

### Text Colors
- **Primary Text**: `text-zinc-100` - Main headings
- **Secondary Text**: `text-zinc-200` - Subheadings
- **Body Text**: `text-zinc-300` - Regular text
- **Muted Text**: `text-zinc-400` - Descriptions
- **Subtle Text**: `text-zinc-500` - Meta information
- **Super Subtle**: `text-zinc-600` - Labels, timestamps
- **Darkest**: `text-zinc-700` - Disabled states

### Accent Colors
- **Success**: `text-green-400`, `bg-green-900/30`
- **Warning**: `text-yellow-400`, `bg-yellow-900/30`
- **Error**: `text-red-400`, `bg-red-900/30`
- **Info**: `text-blue-400`, `bg-blue-900/30`
- **Highlight**: `text-amber-400`, `bg-amber-900/30`

---

## 📐 Layout System

### Spacing Philosophy
**Always use Flexbox with `gap` instead of Grid with `margin`**

```tsx
// ✅ CORRECT
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ❌ AVOID
<div className="grid grid-rows-2">
  <div className="mb-4">Item 1</div>
  <div>Item 2</div>
</div>
```

### Standard Gaps
- **Tiny**: `gap-1` (4px)
- **Extra Small**: `gap-1.5` (6px)
- **Small**: `gap-2` (8px)
- **Medium**: `gap-3` (12px)
- **Default**: `gap-4` (16px)
- **Large**: `gap-6` (24px)
- **Extra Large**: `gap-8` (32px)

### Container Patterns
```tsx
// Page Container
<div className="flex min-h-screen w-full flex-col">
  <div className="flex-1 w-full">
    {/* Content */}
  </div>
  <Footer />
</div>

// Section Container
<div className="flex flex-col gap-6">
  {/* Section content */}
</div>

// Card Container
<div className="rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-4 backdrop-blur-lg sm:p-6">
  {/* Card content */}
</div>
```

---

## 🎯 Component Patterns

### 1. Card Component
```tsx
<div className="group flex flex-col gap-4 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-4 backdrop-blur-lg transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 sm:p-6">
  {/* Card Header */}
  <div className="flex flex-col gap-2">
    <h3 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-white sm:text-lg">
      Card Title
    </h3>
    <p className="text-sm text-zinc-400">Card description</p>
  </div>
  
  {/* Card Body */}
  <div className="flex flex-col gap-3">
    {/* Content */}
  </div>
  
  {/* Card Footer */}
  <div className="flex items-center justify-between border-t border-zinc-800/40 pt-4">
    <span className="text-xs text-zinc-500">Footer text</span>
  </div>
</div>
```

### 2. Button Component
```tsx
// Primary Button
<button className="flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-all duration-300 hover:bg-zinc-600 active:scale-95">
  <Icon className="h-4 w-4" />
  <span>Button Text</span>
</button>

// Secondary Button
<button className="flex items-center gap-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-zinc-300">
  <Icon className="h-4 w-4" />
  <span>Button Text</span>
</button>

// Icon Button
<button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:bg-zinc-700/50 hover:text-zinc-200">
  <Icon className="h-4 w-4" />
</button>
```

### 3. Input Component
```tsx
<div className="flex flex-col gap-2">
  <label className="text-sm text-zinc-400">Label Text</label>
  <input
    type="text"
    placeholder="Placeholder text..."
    className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 backdrop-blur-lg outline-none transition-all duration-300 focus:border-zinc-700/50 focus:bg-zinc-900/50"
  />
</div>

// With Icon
<div className="relative flex items-center">
  <input
    type="text"
    placeholder="Search..."
    className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-2.5 pl-12 pr-4 text-sm text-zinc-200 placeholder-zinc-500 backdrop-blur-lg outline-none transition-all duration-300 focus:border-zinc-700/50 focus:bg-zinc-900/50"
  />
  <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
    <FaSearch className="h-4 w-4 text-zinc-500" />
  </span>
</div>
```

### 4. Badge/Tag Component
```tsx
<span className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600/50 hover:text-zinc-300">
  Tag Text
</span>

// With Icon
<span className="flex items-center gap-1.5 rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-xs text-zinc-400">
  <Icon className="h-3 w-3" />
  <span>Tag Text</span>
</span>
```

### 5. Toggle/Segmented Control
```tsx
<div className="flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-1 backdrop-blur-lg">
  <button
    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
      isActive
        ? "bg-zinc-800 text-zinc-100"
        : "text-zinc-500 hover:text-zinc-300"
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>Option 1</span>
  </button>
  <button
    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
      !isActive
        ? "bg-zinc-800 text-zinc-100"
        : "text-zinc-500 hover:text-zinc-300"
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>Option 2</span>
  </button>
</div>
```

### 6. Section Header
```tsx
<div className="flex flex-col gap-2">
  <p className="text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
    Section Label
  </p>
  <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
    Section Title
  </h2>
  <p className="text-sm text-zinc-400">
    Section description text goes here.
  </p>
</div>
```

### 7. List Item with Icon
```tsx
<div className="flex items-center gap-3 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50">
  {/* Icon */}
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800/50">
    <Icon className="h-5 w-5 text-zinc-400" />
  </div>
  
  {/* Content */}
  <div className="flex min-w-0 flex-1 flex-col gap-1">
    <span className="truncate text-sm font-medium text-zinc-200">Title</span>
    <span className="text-xs text-zinc-500">Description</span>
  </div>
  
  {/* Action */}
  <div className="shrink-0">
    <Icon className="h-4 w-4 text-zinc-600" />
  </div>
</div>
```

---

## 🎬 Animation & Transitions

### Standard Transitions
```tsx
// All transitions
transition-all duration-300

// Specific transitions
transition-colors duration-300
transition-transform duration-300
transition-opacity duration-300

// Easing
ease-in-out
ease-out
```

### Hover Effects
```tsx
// Scale on hover
hover:scale-105
active:scale-95

// Transform
hover:translate-x-0.5
hover:-translate-y-1

// Opacity
hover:opacity-100
opacity-0 group-hover:opacity-100

// Shadow
hover:shadow-lg hover:shadow-zinc-900/20
```

### Group Hover Pattern
```tsx
<div className="group">
  <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    Hidden until parent hover
  </div>
  <span className="text-zinc-400 transition-colors group-hover:text-zinc-200">
    Changes on parent hover
  </span>
</div>
```

---

## 🖼️ Visual Effects

### Glassmorphism
```tsx
className="bg-zinc-900/30 backdrop-blur-lg"
```

### Gradient Overlays
```tsx
// Gradient from bottom
<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />

// Gradient from top
<div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-transparent to-transparent" />

// Radial gradient
<div className="bg-gradient-to-br from-zinc-700 to-zinc-800" />
```

### Shadows
```tsx
// Subtle shadow
shadow-lg

// With color
shadow-lg shadow-zinc-900/20

// Hover shadow
hover:shadow-xl hover:shadow-zinc-900/30
```

---

## 🔤 Typography

### Font Sizes
- **Tiny**: `text-[10px]` - Small tags
- **Extra Small**: `text-xs` (12px) - Meta info, labels
- **Small**: `text-sm` (14px) - Body text, descriptions
- **Base**: `text-base` (16px) - Headings
- **Large**: `text-lg` (18px) - Section titles
- **Extra Large**: `text-xl` (20px) - Page titles
- **2XL**: `text-2xl` (24px) - Main headings
- **3XL**: `text-3xl` (30px) - Hero titles

### Font Weights
- **Normal**: `font-normal` - Body text
- **Medium**: `font-medium` - Emphasized text
- **Semibold**: `font-semibold` - Subheadings
- **Bold**: `font-bold` - Main headings

### Line Height
```tsx
leading-tight    // Headings
leading-relaxed  // Body text
leading-loose    // Large text blocks
```

### Text Truncation
```tsx
// Single line
truncate

// Multiple lines
line-clamp-2
line-clamp-3
```

---

## 🎯 Responsive Design

### Breakpoint Strategy
```tsx
// Mobile first approach
className="text-sm sm:text-base md:text-lg lg:text-xl"

// Common patterns
className="flex flex-col sm:flex-row"
className="gap-3 sm:gap-4 md:gap-6"
className="p-4 sm:p-6"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

### Standard Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Responsive Spacing
```tsx
// Padding
p-4 sm:p-6
px-4 sm:px-6
py-3 sm:py-4

// Gap
gap-3 sm:gap-4 md:gap-6
gap-y-2 gap-x-4 sm:gap-6

// Size
h-12 sm:h-14 md:h-16
w-full sm:w-auto
```

---

## 🎨 Icon Standards

### Icon Library
**Always use React Icons** (`react-icons`)

```tsx
import { IoSearch, IoGrid, IoList } from "react-icons/io5";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
```

### Icon Sizes
```tsx
// Extra Small
h-3 w-3          // 12px - Inline with text

// Small
h-3.5 w-3.5      // 14px - Small icons
h-4 w-4          // 16px - Standard icons

// Medium
h-5 w-5          // 20px - Emphasized icons
h-6 w-6          // 24px - Large icons

// Large
h-8 w-8          // 32px - Feature icons
h-10 w-10        // 40px - Hero icons
```

### Icon Patterns
```tsx
// Icon with text
<span className="flex items-center gap-1.5">
  <Icon className="h-4 w-4" />
  <span>Text</span>
</span>

// Icon button
<button className="flex h-8 w-8 items-center justify-center rounded-full">
  <Icon className="h-4 w-4" />
</button>

// Icon container
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50">
  <Icon className="h-5 w-5 text-zinc-400" />
</div>
```

---

## 📦 Reusable Patterns

### Image with Fallback
```tsx
const [imgError, setImgError] = useState(false);

{imgError ? (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
    <span className="text-2xl font-bold text-zinc-500">
      {name.charAt(0)}
    </span>
  </div>
) : (
  <img
    src={imageSrc}
    alt={name}
    className="h-full w-full object-cover"
    onError={() => setImgError(true)}
  />
)}
```

### Empty State
```tsx
<div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800/60 bg-zinc-900/10 py-16 text-center">
  <Icon className="h-8 w-8 text-zinc-700" />
  <p className="text-sm text-zinc-500">
    No items found
  </p>
  <button className="text-xs text-zinc-400 underline transition-colors hover:text-zinc-300">
    Action
  </button>
</div>
```

### Loading Skeleton
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 w-3/4 rounded bg-zinc-800/50"></div>
  <div className="h-4 w-1/2 rounded bg-zinc-800/50"></div>
</div>
```

### Divider
```tsx
// Horizontal
<div className="border-t border-zinc-800/40" />

// With text
<div className="flex items-center gap-4">
  <div className="flex-1 border-t border-zinc-800/40" />
  <span className="text-xs text-zinc-600">OR</span>
  <div className="flex-1 border-t border-zinc-800/40" />
</div>
```

---

## 🎨 Complete Example Component

```tsx
import { useState } from "react";
import { IoSearch, IoGrid } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

export default function ExampleComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 w-full">
        <div className="h-[120px]" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-6">
            {/* Title Section */}
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
                Section Label
              </p>
              <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
                Page Title
              </h1>
              <p className="text-sm text-zinc-400">
                Description text goes here.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative flex flex-1 items-center sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-2.5 pl-12 pr-4 text-sm text-zinc-200 placeholder-zinc-500 backdrop-blur-lg outline-none transition-all duration-300 focus:border-zinc-700/50 focus:bg-zinc-900/50"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <IoSearch className="h-4 w-4 text-zinc-500" />
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-1 backdrop-blur-lg">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    isGridView
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <IoGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="mt-6 flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group flex w-full flex-col overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/30 backdrop-blur-lg transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50">
                      <IoGrid className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-white">
                        Card Title {item}
                      </h3>
                      <p className="text-xs text-zinc-500">Metadata</p>
                    </div>
                  </div>
                  <FaArrowRight className="h-4 w-4 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-zinc-400" />
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-3 border-t border-zinc-800/40 px-4 py-3">
                  <p className="text-sm leading-relaxed text-zinc-400">
                    This is a description that explains what this card is about.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Tag 1", "Tag 2", "Tag 3"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-xs text-zinc-400 transition-colors group-hover:border-zinc-600/50 group-hover:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-600">
            <span>3 items</span>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
```

---

## ✅ Best Practices Checklist

### Layout
- ✅ Use `flex` with `gap` instead of `grid` with `margin`
- ✅ Use `flex-col` for vertical stacking
- ✅ Use `flex-1` for flexible growing elements
- ✅ Use `min-w-0` to prevent flex overflow issues

### Spacing
- ✅ Consistent gap values: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- ✅ Padding values: `p-4`, `p-6` with responsive variants
- ✅ Avoid margin except for specific cases

### Colors
- ✅ Always use zinc palette for dark theme
- ✅ Use opacity modifiers: `/30`, `/40`, `/50`
- ✅ Consistent border colors: `border-zinc-800/40`
- ✅ Consistent background: `bg-zinc-900/30`

### Transitions
- ✅ Always add `transition-all duration-300` or specific transition
- ✅ Use `group` and `group-hover:` for child element effects
- ✅ Add `hover:` states for interactive elements
- ✅ Use `active:scale-95` for buttons

### Typography
- ✅ Headings: `text-zinc-100` or `text-zinc-200`
- ✅ Body: `text-zinc-300` or `text-zinc-400`
- ✅ Meta: `text-zinc-500` or `text-zinc-600`
- ✅ Consistent font sizes with responsive variants

### Icons
- ✅ Always from `react-icons`
- ✅ Standard size: `h-4 w-4`
- ✅ Consistent color: `text-zinc-400` or `text-zinc-500`
- ✅ Always with proper spacing in flex containers

### Glassmorphism
- ✅ Always combine `bg-zinc-900/30` with `backdrop-blur-lg`
- ✅ Use for cards, modals, overlays
- ✅ Combine with borders for definition

### Responsive
- ✅ Mobile-first approach
- ✅ Use `sm:`, `md:`, `lg:` breakpoints consistently
- ✅ Responsive padding: `p-4 sm:p-6`
- ✅ Responsive typography: `text-sm sm:text-base`

---

## 🚀 Quick Reference

### Standard Card
```tsx
<div className="rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-4 backdrop-blur-lg sm:p-6">
  {/* Content */}
</div>
```

### Standard Button
```tsx
<button className="flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-all duration-300 hover:bg-zinc-600">
  <Icon className="h-4 w-4" />
  <span>Text</span>
</button>
```

### Standard Input
```tsx
<input className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 backdrop-blur-lg outline-none transition-all duration-300 focus:border-zinc-700/50 focus:bg-zinc-900/50" />
```

### Standard Section Header
```tsx
<div className="flex flex-col gap-2">
  <p className="text-xs uppercase tracking-widest text-zinc-600">Label</p>
  <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">Title</h2>
  <p className="text-sm text-zinc-400">Description</p>
</div>
```

---

**This design system ensures consistency, maintainability, and a cohesive dark glassmorphism aesthetic across all components.**