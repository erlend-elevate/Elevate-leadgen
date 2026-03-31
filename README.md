# Elevate Marketing: IT Consultancy Landing Page

High-converting landing page for UK IT consultancies. Commission-only lead generation model. Built with pure HTML/CSS/JS, deployed on Netlify.

## Project Structure

```
├── index.html          # Landing page
├── css/styles.css      # All styles
├── js/main.js          # Animations, sticky bar, FAQ accordion, UTM capture, conversion tracking
├── images/             # SVG assets (if needed)
├── netlify.toml        # Netlify deploy config + security headers
└── .gitignore
```

## Setup

### 1. Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** > **"Import an existing project"**
3. Select this GitHub repository
4. Branch to deploy: `main`
5. Build command: leave blank (no build step)
6. Publish directory: `.`
7. Click **Deploy site**

### 2. Custom Domain

1. In Netlify, go to **Domain management** > **Add custom domain**
2. Enter your subdomain (e.g. `it.yourdomain.com`)
3. Add the DNS records Netlify provides to your domain registrar
4. Netlify will auto-provision an SSL certificate

### 3. Replace Typeform ID

In `index.html`, find this line in the form section:

```html
<div data-tf-live="TYPEFORM_ID"
```

Replace `TYPEFORM_ID` with your actual Typeform form ID (found in Typeform's share/embed settings).

### 4. Configure Facebook Pixel

The Facebook Pixel (ID: `1396679842249197`) is already installed in `index.html`. It fires:

- **PageView** on every page load
- **Lead** event when the Typeform is submitted (via `js/main.js`)

To change the Pixel ID, edit the `fbq('init', '...')` line in `index.html`.

### 5. Configure Google Analytics 4

In `index.html`, uncomment the GA4 block in `<head>` and replace `GA_MEASUREMENT_ID` with your actual GA4 Measurement ID (format: `G-XXXXXXXXXX`).

GA4 events fired:
- **page_view** automatically
- **generate_lead** on Typeform submit (via `js/main.js`)

## Duplicating for Other Verticals

1. Copy the entire repository
2. Update industry-specific copy (see brief Section 8 for swap table)
3. Key areas to change: hero tag, pain points, "who this is for" cards, process steps, form copy, meta title/description
4. Deploy as a separate Netlify site with its own subdomain

## UTM Tracking

UTM parameters from the URL are automatically passed to Typeform as hidden fields. Use URLs like:

```
https://yourdomain.com/?utm_source=meta&utm_medium=cpc&utm_campaign=it_consultancy
```

## Tech Stack

- **HTML/CSS/JS** (no frameworks, no build tools)
- **Google Fonts**: Plus Jakarta Sans
- **Typeform**: Embedded conversational form
- **Netlify**: Hosting with auto-deploy on push
- **Facebook Pixel**: Conversion tracking
- **GA4**: Analytics (placeholder, configure before launch)
