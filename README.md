A simple task board application built with React, vite and tailwind.

## Features

- Create, toggle task completion status, and delete tasks.
- Persistent storage using localStorage.

## Installation

1. Clone the repository:

   ```bash
    git clone git@github.com:siqiluo7/taskboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd taskboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173` (default).

## Architecture

The application follows Dependency Inversion Principle in a way the components only interact with the state management layer which is taskContext. It makes
sure single responsibility by keeping persistence logic in a isolated TaskService which handles data storage to local storage or remote in the future and reducer only deals with state trainsition. This separation of concerns allows for easy testing (mockable service layer) and no component changes needed when switching persistence methods.

### Data flow

```
UI Components → Context Actions → Task Service → LocalStorage
(Triggers)       (Dispatches)     (Persists)        (Storage)
```

- **src**
  - **components**: contains all the UI components.
  - **state**: contains context and reducer for state management.
  - **services**: contains task persistence services to get/save tasks to localStorage.

## Design Decisions

1. State management: uses Context API and useReducer for centralized state management. I don't use Redux or other state management library because it's overkill for this simple app.

2. API: implemented simple CRUD operations which to be consisit with user intention and focus on performance and scalability.

3. Error handling: there are three types of errors that can occur in the application:
   Validation Errors (Invalid input)
   Persistence Errors (Storage failures)
   Application Errors (Unexpected failures)

Validation error is dislayed at form level when user hit add task.

Persistence Errors and Application Errors are handled at the service level. I have
implemented a centralized error handling mechanism to catch and log errors during storage operations. Currently, it logs and displays errors (`ErrorNotification` component), the error will be cleared after the next successful operation. In the future, it can be implement a auto retry and more sophisticated error handling mechanism to handle different types of errors and provide better user feedback.
