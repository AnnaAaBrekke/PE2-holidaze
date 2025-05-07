# Holidaze – Booking Venue Application

<img width="1415" alt="Home-Holidaze" src="https://github.com/user-attachments/assets/584c72dd-d867-48dc-b7c7-98554e0a1f7a" />

## Overview

**Holidaze** is a modern, responsive accommodation booking application built as part of the Front-End Development 2 course exam. This project demonstrates skills in project planning, responsive UI design, front-end development using React and Tailwind CSS, with Vite as the build tool for fast local development and optimized production builds.

The application features two main user experiences:

- **Customer-facing side**: for browsing, searching, and booking venues.
- **Admin (Venue Manager) side**: for managing venues and their bookings.
- **Not logged in side**: for browsing and searching.

## Features

### All Users (not logged in)

- View and search venues
- View venue details
- View availability calendar

### Customers

- Register and login
- Book a venue
- View upcoming bookings
- Update avatar/profile picture

### Venue Managers

- Register and login
- Create, update, and delete venues
- View bookings for managed venues
- Update avatar/profile picture

## Pages

- `/` – Home page with venue listings and search
- `/login` – Login form for customers and venue managers
- `/register` – Registration page for new users
- `/profile` – Customer or manager profile (avatar, info)
- `/venue/:id` – Single venue detail view
- `/bookings` – Customer bookings view
- `/manager` – Venue Manager dashboard (create, edit and delete)
- `/about` – About the platform
- `*` – Not Found page (404)

## Tech Stack

- **Framework**: React with Vite (v18+)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Noroff Holidaze API
- **Design**: Figma
- **Planning**: GitHub Projects / Trello
- **Hosting**: Netlify

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/AnnaAaBrekke/PE2-holidaze.git
cd holidaze
npm install
```

## Running Locally

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev # Start the local development server
npm run build # Build the app for production
npm run preview # Preview the production build
```

## Deployment

This project is deployed using Netlify.

Live Site: https://holidaze-annaaab.netlify.app/

## Testing

- HTML Validation: https://validator.w3.org/
- Accessibility: https://wave.webaim.org/
- Performance & SEO: Lighthouse (Chrome DevTools)

All key views were manually tested for responsiveness, accessibility, and logic errors.

## Author

Anna Aasprong Brekke,
Front-End Development Student

## License

This project is developed for educational purposes as part of Project Exam 2 in Frontend Developer Studies.
