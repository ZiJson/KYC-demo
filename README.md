# KYC-Demo  
  
A modern React application for demonstrating Know Your Customer (KYC) verification processes through a multi-step form interface.  
  
## Overview  
  
KYC-Demo is a reference implementation for a step-based form application that follows common patterns used in financial services and regulatory compliance applications. It demonstrates best practices for building multi-step forms with validation in React.  
  
## Features  
  
- **Multi-step form** with three distinct stages:  
  1. Personal information collection  
  2. Document upload (ID card front/back)  
  3. Review and submission  
- **Form validation** using React Hook Form with Zod schemas  
- **State management** with Zustand for centralized data flow  
- **Responsive UI** built with Tailwind CSS  
- **Reusable components** for consistent user experience  
  
## Technology Stack  
  
- **React 19** - Modern UI library  
- **TypeScript** - Type-safe JavaScript  
- **Zustand** - Lightweight state management  
- **React Hook Form** - Form state management and validation  
- **Zod** - Schema validation  
- **Tailwind CSS** - Utility-first CSS framework  
- **Vite** - Fast build tool and development server  
  
## Project Structure


```txt
src/
├── components/ # Reusable UI components
├── pages/ # Step components for the form flow
├── stores/ # Zustand state management
├── schemas/ # Zod validation schemas
├── hooks/ # Custom React hooks
├── layout/ # Layout components
├── lib/ # Utility functions
└── App.tsx # Main application component
```

## Application Flow  
  
The application implements a three-step form process:  
  
1. **Step 1**: Collects personal information (name, email, phone, etc.)  
2. **Step 2**: Handles document uploads (ID card front/back, additional documents)  
3. **Step 3**: Displays a summary of all collected information for review and submission  
  
Each step performs validation before allowing navigation to the next step.  
  
## Getting Started  
  
### Prerequisites  
  
- Node.js (latest LTS version recommended)  
- Yarn or npm  
  
## Installation  
  
```bash  
# Clone the repository  [header-2](#header-2)
git clone https://github.com/ZiJson/KYC-demo.git  
cd KYC-demo
```
  
### Install dependencies  [header-3](#header-3)
```bash
yarn install  
# or  [header-4](#header-4)
npm install
```

## Development
### Start development server  [header-5](#header-5)
```bash
yarn dev  
# or  [header-6](#header-6)
npm run dev
```
This will start the development server at http://localhost:5173 (default Vite port).

## Build
#### Build for production  [header-7](#header-7)
```bash
yarn build
```
 or  [header-8](#header-8)
```bash
npm run build
```
The build output will be in the dist/ directory.

## Preview Production Build
#### Preview the production build  [header-9](#header-9)
```bash
yarn preview
```
 or  [header-10](#header-10)
 ```bash
npm run preview
```
## Key Components
 ### Step Components
- Step1: Collects personal information using form inputs
- Step2: Handles document uploads with file inputs
- Step3: Displays summary and confirmation

### Form Components
- Input: Text input fields with validation
- Select: Dropdown selection fields
- DatePicker: Calendar-based date selection
- FileUpload: Component for document uploads

### State Management
The application uses three main Zustand stores:

- useStepStore: Manages current step and navigation
- useUserStore: Stores personal information
- useFileStore: Manages document uploads
###Form Validation
The application implements robust form validation using React Hook Form with Zod schemas:

Each form field has defined validation rules
Validation occurs both on field change and before proceeding to the next step
Error messages are displayed to guide users
License
[MIT License]

  
## Notes  [header-11](#header-11)
  
I've provided the README.md file in a markdown code block format that you can easily copy. This format preserves all the markdown syntax and structure while making it easy to copy the entire content at once. The content is based on the previous conversation and includes all the key sections: overview, features, technology stack, project structure, application flow, getting started instructions, key components, and form validation details.  
  
Wiki pages you might want to explore:  
- [UI Components (ZiJson/KYC-demo)](/wiki/ZiJson/KYC-demo#4)
