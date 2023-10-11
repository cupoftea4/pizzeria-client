# Welcome to Pizzeria Simulator

## Run
First you need to install dependencies.
```
npm i
```
And then you can run your project locally.
```
npm run dev
```

## Project Conventions

## File structure

```text
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
```

### Commits prefixes

- [feat] - new feature, that is added to an app
- [fix] - bugfixing
- [style] - changes related to code style
- [refactor] - refactoring of a piece of codebase
- [test] - everything, related to testing
- [docs] - everything that is related to documentation
- [config] - change configuration files
- [CI/CD] - changes in CI/CD

### Branches naming style

- feat/branch-name - for new features
- fix/branch-name - for bugfixing
- style/branch-name - for styling
- refactor/branch-name - for refactoring
- test/branch-name - for testing
- docs/branch-name - for documentation
- config/branch-name - for configuration
