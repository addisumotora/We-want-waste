# WeWantWaste Skip Hire App

## Overview

This project is a modern React (Next.js) application for skip hire, featuring a multi-step form for address entry, skip selection, permit checking, and payment. It uses TypeScript, Tailwind CSS, and React Hook Form for robust type safety, styling, and form validation.

---

## Project Structure

```
wewantwaste/
├── app/
    └── waste
         └── page.tsx       
    └── layout.tsx  
│   └── page.tsx                # Main multi-step form logic and routing
├── components/
│   ├── RegularSkipCard.tsx     # Card UI for displaying skip options
│   ├── SkipSelection.tsx       # Handles skip selection logic and rendering
│   ├── PermitCheck.tsx         # Handles permit requirements and photo upload
│   └── PaymentPage.tsx         # Payment and user details form
|    .... check components under components/
├── types/
│   ├── types.tsx               # Shared TypeScript interfaces
├── public/                     # Static assets (images, icons, etc.)
└── README.md                   # Project documentation
```

---

## Key Components

### 1. `RegularSkipCard.tsx`
- **Purpose:** Displays a single skip option with details (size, price, road/land rules).
- **Props:**  
  - `skip`: Skip object (size, price, etc.)
  - `isSelected`: Highlight if selected
  - `onSelect`: Callback when selected
  - `calculateTotal`: Function to calculate price with VAT
- **How to update:**  
  - Change skip display or add new skip attributes by updating the `Skip` interface in `types.tsx` and the card UI.

---

### 2. `SkipSelection.tsx`
- **Purpose:** Renders a grid of `RegularSkipCard` components for the user to select a skip.
- **Props:**  
  - `skipData`: Array of skip options
  - `selectedSkip`: Currently selected skip
  - `onSkipSelect`: Handler for selection
  - `calculateTotal`: Price calculation function
- **How to update:**  
  - Add new skip options to the data array.
  - Update selection logic as needed.

---

### 3. `PermitCheck.tsx`
- **Purpose:** Guides users through permit requirements based on skip placement (private property or public road).
- **Features:**
  - Lets user select placement type.
  - Shows permit info and council processing time if "public road" is selected.
  - Modal dialog for uploading a placement photo (required for both options).
  - Validates photo upload before continuing.
- **How to update:**  
  - Add more placement options by updating the `selected` state and UI.
  - Change permit logic or info text in the JSX.
  - Update file upload logic in `handleFileUpload`.

---

### 4. `PaymentPage.tsx`
- **Purpose:** Collects user details and payment information.
- **Features:**
  - Uses React Hook Form for validation.
  - Shows error messages only if they are strings to avoid ReactNode errors.
  - Handles modal for email confirmation and file upload.
- **How to update:**  
  - Add new fields by updating the form and validation rules.
  - Update error handling to always check for string messages:
    ```tsx
    {typeof errors.fieldName?.message === "string" && (
      <p>{errors.fieldName.message}</p>
    )}
    ```

---

### 5. `types/types.tsx`
- **Purpose:** Central place for TypeScript interfaces and types.
- **How to update:**  
  - Add or update interfaces as your data model changes.
  - Always import and use these types in your components for type safety.

---

### 6. `types/react-pay-icons.d.ts`
- **Purpose:** Declares types for third-party packages that don’t provide their own TypeScript types.
- **How to update:**  
  - Add new declarations as needed for other untyped packages.

---

## Best Practices

- **Type Safety:**  
  Use TypeScript for all components, props, and state.
- **Error Handling:**  
  Only render error messages if they are strings to avoid ReactNode errors.
- **Component Reuse:**  
  Break down large components into smaller, reusable ones.
- **Styling:**  
  Use Tailwind CSS utility classes for consistent styling.
- **Documentation:**  
  Update this README and add comments for complex logic.

---

## Running the Project

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Run the development server:**
   ```
   npm run dev
   ```
3. **Build for production:**
   ```
   npm run build
   ```

---

## Contributing

- **Add new features:** Create new components in `/components` and update types in `/types`.
- **Update forms:** Add new fields to the form, update validation, and ensure error handling is type-safe.
- **Handle untyped packages:** Add `.d.ts` files in `/types` for any third-party packages without types.
- **Ask questions:** Open an issue or contact the maintainers for help.

---

## Questions?

If you have questions about a specific component or want to contribute, please open an issue or contact the maintainers.

---

**Happy coding!**