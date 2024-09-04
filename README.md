# Form Builder Project

<video width="600" controls>
  <source src="./assets/demo.gif" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Overview

The Form Builder project is a web application that allows users to create custom forms using a drag-and-drop interface. It is designed to be intuitive and flexible, enabling users to build forms quickly without needing to write code. The application is built using a modern tech stack, ensuring it is both performant and scalable.

## Tech Stack

### 1. **Next.js**
   - **Description**: Next.js is a React framework that enables server-side rendering and static site generation. It provides a robust platform for building SEO-friendly web applications with improved performance and routing capabilities.
   - **Usage**: Used for developing the frontend of the application, handling routing, server-side rendering, and API routes.

### 2. **Prisma**
   - **Description**: Prisma is an open-source ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database management by providing a type-safe query builder and database migration tools.
   - **Usage**: Utilized for interacting with the database, managing data models, and performing queries.

### 3. **Shadcn UI**
   - **Description**: Shadcn UI is a customizable, accessible, and modern component library that integrates seamlessly with React. It provides pre-built components and styles that can be easily extended or overridden.
   - **Usage**: Employed for building the user interface, ensuring consistency in design, and providing a polished look and feel to the application.

### 4. **Supabase**
   - **Description**: Supabase is an open-source alternative to Firebase, offering features like real-time databases, authentication, and storage. It is built on top of PostgreSQL and provides a comprehensive backend solution.
   - **Usage**: Used as the backend database solution, handling user authentication, real-time data syncing, and storage.

### 5. **DND-Kit/core**
   - **Description**: DND-Kit is a set of performant, extensible, and accessible drag-and-drop utilities for modern web applications. It provides a React hook-based API to implement drag-and-drop functionality.
   - **Usage**: Core library for implementing the drag-and-drop interface within the form builder, allowing users to move and rearrange form elements easily.

### 6. **Clerk**
   - **Description**: Clerk is an authentication and user management solution that offers features like multi-factor authentication, social logins, and user profiles out of the box.
   - **Usage**: Integrated for managing user authentication, ensuring secure access to the form builder, and handling user sessions.

### 7. **Tailwind CSS**
   - **Description**: Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs quickly by applying pre-defined classes directly in the markup.
   - **Usage**: Used for styling the application, providing a consistent and responsive design across all components, and making it easy to implement custom styles.

## Features

- **Drag-and-Drop Form Building**: Users can drag form elements such as text inputs, checkboxes, and dropdowns onto the canvas to build custom forms.
- **Customizable Components**: Users can customize form elements, such as setting labels, placeholders, and validation rules.
- **User Authentication**: Secure login and registration using Clerk, with support for social logins and multi-factor authentication.
- **Responsive Design**: The application is fully responsive, providing an optimal user experience on both desktop and mobile devices.

## Getting Started

To get started with the project, clone the repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd form-builder
npm install
```

Set up the environment variables required for the application:
- copy all the variables from `.env.example` and make new `.env` file and setup enviroment.

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

