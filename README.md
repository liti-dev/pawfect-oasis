#Pawfect Oasis

##Demo
##Overview
Pawfect Oasis is a cosy and eco-friendly hotel for pets with 4 cabins, providing a home-from-home to your furry companions.

- They first need an internal app to manage bookings, cabins and guests.
- They need an API.
- Later they will need a website where customers can book stays.

##Tech Stack
Setting up a React project using Vite. Unlike CRA, Vite requires config (e.g ESLint, Prettier).

- Using ESLint is by far the easiest way to reduce bugs (aka problematic code). It's also configureable.
- Prettier is not difficult to setup, and it keeps my sanity.

Supabase is an efficient option for backend (Authentication, instant APIs, Edge Functions, Storage) with Postgres database.

styled-components enables writing CSS in JS. This means all the features of CSS including media queries, all pseudo-selectors, nesting, etc are accessible. I could have used ChakraUI or Tailwind but it’s good to practice writing more CSS.

Context API and Hooks for local state management.

React Query for server (remote) state management now that I store data in Supabase. A few benefits of React Query: automatic loading and error states, data being cached, automatic re-fetching to keep state synced.

React Router for SPA navigation

React Hook Form to handle big forms more easily

Others: date-fns, Recharts, React icons, React hot toast
