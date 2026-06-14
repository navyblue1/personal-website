# Personal website

A lightweight personal portfolio built with HTML, CSS, and JavaScript. It has no dependencies or
build step and is ready to deploy to Vercel.

## Personalize it

Open `index.html` and replace:

- The name, introduction, and About copy
- Both `hello@example.com` email links
- The three sample projects and their `href="#"` links
- The LinkedIn and GitHub profile URLs
- The page title and description in the `<head>`

Colors, spacing, and typography live in `styles.css`. The main palette is defined at the top using
CSS custom properties.

## Preview locally

From this directory, run:

```powershell
npx serve .
```

Then open the local URL printed in the terminal.

## Deploy free on Vercel

### Dashboard

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Leave the framework preset as `Other` and the build settings empty.
4. Select **Deploy**.

### Command line

```powershell
npx vercel --prod
```

Vercel will ask you to sign in and confirm the project settings. The included `vercel.json` adds
clean URLs and basic security headers.
