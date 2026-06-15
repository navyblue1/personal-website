# Jeffrey Zhang / 张郅睿

Personal website for Jeffrey Zhang, an incoming University of Toronto Engineering Science student
interested in quantitative research, software, and entrepreneurship.

Live at [navyblue1.vercel.app](https://navyblue1.vercel.app).

## Content

- Education and experience
- Mathematics and entrepreneurship distinctions
- W-Model quantitative research project
- VolunTrack frontend work
- Junior Achievement cork slipper venture

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
