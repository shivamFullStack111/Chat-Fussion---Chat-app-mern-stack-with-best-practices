# Environment Variables Setup (Vite React)

This project uses Vite environment variables to manage different settings for development, local testing, and production environments.

Environment variables help us store configuration values like API URLs, app information, and feature settings separately from the source code.

---

# Environment Files

This project contains these environment files:

```
.env
.env.development
.env.production
.env.local
```

Each file has a different purpose.

---

# 1. `.env`

The `.env` file contains common environment variables.

These variables are available in all environments unless they are overridden by another environment file.

Example:

```env
# App Information
VITE_APP_NAME="Chat Fussion"
VITE_APP_VERSION=1.0.0


# API Configuration
VITE_API_URL=http://your-ip-address:8000


# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173


# Environment
VITE_NODE_ENV=development


# Pagination Defaults
VITE_PAGE_LIMIT=10
```

## Variables Explanation

### VITE_APP_NAME

```env
VITE_APP_NAME="Chat Fussion"
```

Stores the application name.

Usage:

```js
const appName = import.meta.env.VITE_APP_NAME;
```

Example use:

* Showing app name in navbar
* Page title
* Branding

---

### VITE_APP_VERSION

```env
VITE_APP_VERSION=1.0.0
```

Stores application version.

Usage:

```js
const version = import.meta.env.VITE_APP_VERSION;
```

Example use:

* Display version in footer
* Debug information

---

### VITE_API_URL

```env
VITE_API_URL=http://your-ip-address:8000
```

Stores backend API URL.

Usage:

```js
const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/users`);
```

Purpose:

* Connecting React frontend with backend server
* Making API requests using Axios or Fetch

---

### VITE_FRONTEND_URL

```env
VITE_FRONTEND_URL=http://localhost:5173
```

Stores frontend application URL.

Usage:

Example:

* OAuth redirect URLs
* Email links
* Sharing URLs

---

### VITE_NODE_ENV

```env
VITE_NODE_ENV=development
```

Stores current environment name.

Usage:

```js
if(import.meta.env.VITE_NODE_ENV === "development"){
    console.log("Development mode");
}
```

---

### VITE_PAGE_LIMIT

```env
VITE_PAGE_LIMIT=10
```

Default pagination limit.

Usage:

```js
const limit = import.meta.env.VITE_PAGE_LIMIT;
```

Example:

* Show 10 records per page
* API pagination requests

---

# 2. `.env.development`

This file is used when running the project in development mode.

Command:

```
npm run dev
```

Content:

```env
VITE_API_URL=http://localhost:8000
VITE_DEBUG=true
```

---

## VITE_API_URL

```env
VITE_API_URL=http://localhost:8000
```

During development, the React app connects to the local backend.

Example:

```
React App
localhost:5173

      |
      |
      v

Backend API
localhost:8000
```

---

## VITE_DEBUG

```env
VITE_DEBUG=true
```

Enables debugging features.

Usage:

```js
if(import.meta.env.VITE_DEBUG === "true"){
    console.log("Debug mode enabled");
}
```

---

# 3. `.env.production`

This file is used when creating a production build.

Command:

```
npm run build
```

Content:

```env
VITE_API_URL=https://chat-fusion-backend.onrender.com // Backend API URL
VITE_DEBUG=false
```

---

## VITE_API_URL

Production backend URL:

```
https://chat-fusion-backend.onrender.com
```

When the app is deployed, all API requests go to this server.

---

## VITE_DEBUG

```env
VITE_DEBUG=false
```

Debug logs are disabled in production.

---

# 4. `.env.local`

This file is for personal machine settings.

It is useful when your local setup is different from the team setup.

Example:

```env
VITE_API_URL=http://your-ip-address:8000
VITE_DEBUG=true
```

Purpose:

* Testing with a different backend
* Using local network IP
* Personal configuration

Usually `.env.local` should not be pushed to GitHub.

---

# import.meta.env

Vite provides all environment variables through:

```js
import.meta.env
```

Example output:

```js
{
  BASE_URL: "/",
  MODE: "development",
  DEV: true,
  PROD: false,
  SSR: false,
  VITE_API_URL: "http://localhost:5000/api"
}
```

---

# Built-in Vite Variables

## BASE_URL

```js
import.meta.env.BASE_URL
```

Returns the base path of the application.

Default:

```
/
```

Usage:

```js
<img src={`${import.meta.env.BASE_URL}/logo.png`} />
```

---

## MODE

```js
import.meta.env.MODE
```

Returns current environment mode.

Example:

Development:

```
development
```

Production:

```
production
```

Usage:

```js
console.log(import.meta.env.MODE);
```

---

## DEV

```js
import.meta.env.DEV
```

Returns true when running development mode.

Example:

```js
if(import.meta.env.DEV){
    console.log("Development");
}
```

Output:

```
true
```

---

## PROD

```js
import.meta.env.PROD
```

Returns true when running production build.

Example:

```js
if(import.meta.env.PROD){
    console.log("Production");
}
```

Output:

```
true
```

---

## SSR

```js
import.meta.env.SSR
```

Checks if the application is running with Server Side Rendering.

Normal Vite React apps:

```
false
```

---

# Using Environment Variables in React

Example API configuration:

```js
const API_URL = import.meta.env.VITE_API_URL;

api.get(`${API_URL}/users`);
```

---

Example debug check:

```js
if(import.meta.env.VITE_DEBUG === "true"){
    console.log("Debug enabled");
}
```

---

# Environment Priority

If the same variable exists in multiple files, Vite uses the higher priority value.

Priority:

```
.env.local
        ↓
.env.development / .env.production
        ↓
.env
```

Example:

`.env`

```env
VITE_API_URL=http://default.com
```

`.env.local`

```env
VITE_API_URL=http://your-ip-address:8000
```

Final value:

```
http://your-ip-address:8000
```

because `.env.local` overrides `.env`.

---

# Important Notes

## 1. Only variables starting with VITE_ are available in React

Correct:

```env
VITE_API_URL=http://localhost:8000
```

Access:

```js
import.meta.env.VITE_API_URL
```

Wrong:

```env
API_URL=http://localhost:8000
```

It will not be available.

---

## 2. Do not store secrets in Vite env files

Never put:

* Database passwords
* JWT secrets
* Private API keys
* Backend secrets

inside React `.env` files.

Frontend variables are visible in the browser after build.

---

# Summary

| File               | Purpose                     |
| ------------------ | --------------------------- |
| `.env`             | Common application settings |
| `.env.development` | Local development settings  |
| `.env.production`  | Live production settings    |
| `.env.local`       | Personal machine override   |

```
Development:
.env + .env.development + .env.local

Production:
.env + .env.production
```

This setup keeps API URLs and application configuration clean and easy to manage.
