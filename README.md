# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


# React-Based Rule Engine (JSON) Creator

## Overview
This project is a **React-based Rule Engine JSON Creator**, designed to provide a dynamic UI for defining and managing rule-based logic using JSON structures. It enables users to configure complex conditional rules through an intuitive interface and outputs a structured JSON representation of the configured rules.

## Key Features
- **Dynamic Rule Creation**: Users can define multiple conditions, actions, and steps interactively.
- **React Hook Form (RHF) Integration**: Efficient form handling using RHF for validation and performance.
- **Field Arrays for Dynamic Input Handling**: Enables nested rule structures using `useFieldArray`.
- **Live JSON Preview**: Displays the live structured JSON output based on user inputs.
- **Clipboard Copy Functionality**: Easily copy the generated JSON output using a custom hook.
- **Toaster Notifications**: User feedback via a notification system for successful actions.
- **Styled Components**: Uses modular CSS for a clean and maintainable UI.

## Installation
```sh
# Clone the repository
https://github.com/RaghavanSD/Rule_Engine_UI
cd react-rule-engine

# Install dependencies
npm install   # or npm install
```

## Usage
```sh
# Start the development server
npm run dev     # or npm start
```

## How It Works
1. **Define Rule Types**: Select logical conditions (`AND` / `OR`).
2. **Configure Steps and Actions**: Define multiple steps with actions dynamically.
3. **Live JSON Output**: View the generated JSON reflecting user configurations.
4. **Copy to Clipboard**: Use the copy button to copy JSON output for external use.

## Folder Structure
```
/src
  ├── components
  │   ├── StepTypeField.tsx  # Step configuration UI
  │   ├── ConditionBuilder.tsx # Handles rule conditions
  │   ├── Toaster.tsx # Notification system
  │   ├── JsonPreview.tsx # Displays JSON output with copy functionality
  │
  ├── hooks
  │   ├── useClipboard.ts # Custom hook for copying text
  │
  ├── styles
  │   ├── StepForm.module.css
  │   ├── Toaster.module.css
  │
  ├── App.tsx  # Main application entry point
```

## Contribution
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
MIT License

