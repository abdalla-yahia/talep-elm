# [Demo](https://talep-elm.vercel.app)
# Talep Elm

## Talep Elm of Contents
1. [Overview](#overview-top)
2. [Features](#features-top)
3. [Technologies Used](#technologies-used-top)
4. [Installation & Setup](#installation--setup-top)
5. [Project Structure](#project-structure-top)
6. [Contributing](#contributing-top)
7. [Contact](#contact-top)


---

## Overview [^Top](#talep-elm-of-contents)

**Talep Elm** is an interactive Qur'an platform built with Next.js 15, React.js, PostgreSQL, Prisma ORM, Tailwind CSS, Bootstrap, Redux Toolkit, Axios, and deployed on Vercel. The platform provides users with a rich experience while reading the Qur'an online, featuring real-time radio broadcasting, private lectures for subscribers, role-based access control (RBAC), and detailed tracking of student progress.

The project was developed using modern technologies to ensure scalability, maintainability, and performance. It optimizes SEO performance and reduces load times by up to 30%.

---

## Features [^Top](#talep-elm-of-contents)

- **Interactive Qur'an Platform:**
  - Displays entire surahs with the ability to select preferred readers.
  - Real-time radio broadcasting feature on the homepage for updates.

- **Private Lectures:**
  - Subscribers can create private lectures that appear on their control panel.
  - Students can access these lectures based on their subscription status.

- **Role-Based Access Control (RBAC):**
  - Secure user permissions for admins and students using JWT authentication.
  - Site owners can assign job codes to new administrators, enabling them to register according to their responsibilities.

- **Gender-Specific Groups:**
  - Separate groups for male and female students with matching administrators.
  - Registration within groups is gender-specific.

- **Commenting System:**
  - Students and administrators can comment on lessons and open internal discussions.
  - Comments are filtered to display only those from the same gender as the student and administrator.

- **Student Progress Tracking:**
  - A database powered by PostgreSQL and Prisma ORM tracks each student's progress and test results.
  - Automated analytics for test results.

- **SEO Optimization:**
  - Server-side rendering (SSR) with Next.js 15 improves SEO and reduces load times by 30%.

- **User Authentication:**
  - Secure login system using JWT tokens.

- **Admin Dashboard:**
  - Administrators can manage content, view user data, and track subscriptions.

---

## Technologies Used [^Top](#talep-elm-of-contents)

- **Frontend:**
  - React.js: For building reusable UI components.
  - Next.js 15: For server-side rendering and enhanced performance.
  - Tailwind CSS: For utility-first styling.
  - Bootstrap: For responsive design and layout.
  - Redux Toolkit: For state management.

- **Backend:**
  - RESTful APIs: For communication between frontend and backend.
  - Axios: For making HTTP requests.

- **Database:**
  - PostgreSQL: Relational database for storing user data and progress.
  - Prisma ORM: For simplifying database interactions.

- **Authentication:**
  - JWT (JSON Web Tokens): For secure user authentication.

- **Deployment:**
  - Vercel: For deploying the application with zero downtime.

---

## Installation & Setup [^Top](#talep-elm-of-contents)

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/abdalla-yahia/Islamy.git
   cd talep-elm
2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set Environment Variables:**
 Create a ``` .env ``` file in the root directory and add the following variables:
    ```bash

    DATABASE_URL=postgresql://username:password@localhost:5432/your-database-name
    SALT = your salt
    JWT_SECRET_KEY = your-secret-key
    NODE_ENV = your state env
    SITE_TITLE = title of your project
    EMAL_SERVICE = email service present 
    EMAL_HOST = your email host
    EMAIL_PORT = port of your email 
    EMAIL_USER = user name of user name
    EMAIL_PASS = password of send email
    EMAIL_FROM = email or name of sender email
    NODE_PATH= path of files
    ```
4. **Run the Application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
5. **Access the App: **
   Open your browser and navigate to ``` http://localhost:3000 ```.

# Project Structure [^Top](#talep-elm-of-contents)
```
talep-elm/
├── public/
│   ├── Audios/         # Static Audio
│   ├── images/         # Static images
│   ├── avatar/         # Static images
│   ├── favicon/        # Static images
│   └── uploads/        # Custom Uploads Files (Images-Audios-Videos-Pdf)
├── src/
│   ├── components/     # Reusable UI components
│   ├── app/            # Next.js pages
│   ├── Base/           # Project Domain
│   ├── Hook/           # Context API providers
│   ├── Interfaces/     # Global Interfaces 
│   ├── Moshaf/         # Moshaf Content And Data
│   ├── Types/          # Global Types 
│   ├── Lib/            # Redux Toolkit store and slices
│   └── utils/          # Helper functions
├── prisma/             # Prisma schema and migrations
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md           # Project documentation
```
# Contributing [^Top](#talep-elm-of-contents)
We welcome contributions from the community! To contribute:

1. **Fork the repository.**
2. ** Create a new branch for your feature or bug fix:**
   ```bash
    git checkout -b feature/your-feature-name
   ```
3. **Commit your changes and push to your fork.**
4.  **Submit a pull request detailing your changes.**

Please ensure that your code adheres to the existing coding standards and includes appropriate tests.

# Contact [^Top](#talep-elm-of-contents)
For any questions or inquiries, feel free to reach out to the developer:

- Name: Abdalla Yahia
- Email: abdallayahia75@gmail.com
- LinkedIn: [linkedin.com/in/abdalla-yahia](https://www.linkedin.com/in/abdalla-yahia/)
- GitHub: [github.com/abdalla-yahia](https://github.com/abdalla-yahia/)
- Tel: +2012-111-00554 - whatsapp: +2012-111-00554



