# Overview  
  
<details>  
<summary>Relevant source files</summary>  
  
The following files were used as context for generating this wiki page:  
  
- [index.html](index.html)  
- [package.json](package.json)  
- [src/App.tsx](src/App.tsx)  
- [yarn.lock](yarn.lock)  
  
</details>  
  
  
  
This document provides a high-level introduction to the KYC-demo project, a demonstration application for Know Your Customer (KYC) processes. The KYC-demo implements a multi-step form that collects and validates user information and document uploads, following common patterns used in financial services and regulatory compliance applications.  
  
Sources: [package.json:1-41](), [src/App.tsx:1-26]()  
  
## Purpose and Scope  
  
The KYC-demo serves as a reference implementation for a step-based form application that:  
  
1. Collects personal information from users  
2. Manages document uploads (ID card front and back)  
3. Reviews and submits collected information  
4. Validates data at each step before proceeding  
  
This overview document covers the high-level architecture, key components, and core concepts of the application. For detailed information about the project structure, refer to [Project Structure](#1.1), and for information about the technology stack, see [Technology Stack](#1.2).  
  
Sources: [src/App.tsx:1-26]()  
  
## Application Architecture  
  
The KYC-demo follows a component-based architecture with a centralized state management approach. The application is structured around a multi-step form flow with distinct components for each step and shared UI components.  
  
### High-Level Architecture Diagram  
  
```mermaid  
flowchart TD  
    subgraph "Application Core"  
        App["App Component"] --> Layout["Layout"]  
        Layout --> StepIndicator["StepIndicator"]  
        StepIndicator --> Step1["Step1"]  
        StepIndicator --> Step2["Step2"]  
        StepIndicator --> Step3["Step3"]  
    end  
      
    subgraph "State Management"  
        Step1 --> UserStore["useUserStore"]  
        Step2 --> FileStore["useFileStore"]  
        Step3 -.-> UserStore  
        Step3 -.-> FileStore  
        StepIndicator --> StepStore["useStepStore"]  
    end  
      
    subgraph "UI Components"  
        Step1 --> FormComponents["Form Components"]  
        Step2 --> FormComponents  
        FormComponents --> Input["Input"]  
        FormComponents --> Select["Select"]  
        FormComponents --> DatePicker["DatePicker"]  
        FormComponents --> FileUpload["FileUpload"]  
        FormComponents --> Button["Button"]  
    end
