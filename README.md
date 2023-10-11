# Welcome to pizzeria simulator!

## Run

```
npm i
npm run dev
```

## File structure

|-- src/                      # Source code
|   |-- assets/               # Static assets 
|   |   |-- images/           # Image files
|   |-- components/           # Reusable UI components 
|   |   |-- Button/
|   |   |   |-- index.tsx  
|   |   |   |-- Button.module.css 
|   |-- icons/                # Icons components
|   |   |-- SomeIcon.tsx/
|   |-- containers/           # Smart components or pages, connected to redux or context, etc.
|   |   |-- CoolPanel/
|   |   |   |-- index.tsx  
|   |   |   |-- CoolPanel.module.css 
|   |-- contexts/             # React contexts 
|   |-- hooks/                # Custom React hooks
|   |-- services/             # Business logic, API calls, etc.
|   |-- utils/                # Utility functions
|   |-- styles/               # Global styles
|   |-- App.tsx               # Main app 
|   |-- main.tsx              # Entry point
