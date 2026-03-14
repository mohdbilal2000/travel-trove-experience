# Hostinger Deployment Guide - Guide India Tours

Next.js 16 app deployed to Hostinger Business/Cloud hosting with Node.js.

---

## Prerequisites

- Hostinger **Business** or **Cloud** plan (must support Node.js)
- Domain `guideindiatours.com` on GoDaddy
- Node.js 18+ or 20+ on your local machine

---

## Step 1: Build Locally

```bash
# Install dependencies
npm install

# Build the standalone production bundle
npm run build
```

This creates `.next/standalone/` with everything needed to run the server.

## Step 2: Prepare the Deploy Package

After building, you need to copy these to your Hostinger server:

```
.next/standalone/          --> entire folder (contains server.js + node_modules)
.next/static/              --> copy INTO .next/standalone/.next/static/
public/                    --> copy INTO .next/standalone/public/
```

Quick way to prepare:

```bash
# Copy static assets into standalone folder
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Create a zip for upload
cd .next/standalone
zip -r ../../hostinger-deploy.zip .
cd ../..
```

## Step 3: Upload to Hostinger

1. Log into **Hostinger hPanel** (https://hpanel.hostinger.com)
2. Go to **File Manager**
3. Navigate to your domain's root directory (`public_html` or a subdirectory)
4. **Delete** any old files from previous deployments
5. Upload `hostinger-deploy.zip`
6. **Extract** the zip file
7. Make sure the folder structure looks like:
   ```
   public_html/
   ├── server.js
   ├── node_modules/
   ├── package.json
   ├── .next/
   │   ├── static/
   │   └── ...
   └── public/
       ├── favicon.ico
       ├── favicon.svg
       ├── manifest.json
       ├── images/
       └── ...
   ```

## Step 4: Configure Node.js on Hostinger

1. In hPanel, go to **Websites** > select your domain
2. Search for **"Node.js"** in the sidebar or advanced settings
3. Configure:
   - **Node.js Version**: `20.x` (or latest LTS)
   - **App Directory**: `public_html` (or wherever you extracted)
   - **Startup File**: `server.js`
4. **Environment Variables** - add these:
   | Variable | Value |
   |----------|-------|
   | `PORT` | `3000` (or whatever Hostinger assigns) |
   | `NODE_ENV` | `production` |
   | `HOSTNAME` | `0.0.0.0` |
5. Click **Start** / **Restart**

## Step 5: Point GoDaddy DNS to Hostinger

1. Log into **GoDaddy** (https://dcc.godaddy.com)
2. Go to **DNS Management** for `guideindiatours.com`
3. Get Hostinger's nameservers from hPanel > **Domains** > **DNS/Nameservers**
4. **Option A - Use Hostinger Nameservers (recommended):**
   - In GoDaddy, change nameservers to Hostinger's:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - (Get exact values from your Hostinger panel)
   - DNS propagation takes 24-48 hours

5. **Option B - Keep GoDaddy DNS, point A record:**
   - In GoDaddy DNS, set:
     | Type | Name | Value | TTL |
     |------|------|-------|-----|
     | A | @ | [Hostinger IP from hPanel] | 600 |
     | CNAME | www | guideindiatours.com | 600 |

## Step 6: Enable SSL

1. In Hostinger hPanel, go to **SSL**
2. Install a **free SSL certificate** for `guideindiatours.com`
3. Enable **Force HTTPS** redirect

## Step 7: Disable Bot Protection (CRITICAL FOR SEO)

This is what was killing your AI visibility:

1. In hPanel, go to **Security**
2. Find **"Malware Scanner"** or **"Bot Protection"**
3. Make sure it is NOT blocking legitimate crawlers
4. If there's a WAF (Web Application Firewall):
   - Keep it ON for security
   - But **whitelist** these User-Agents in the rules:
     - `Googlebot`, `Bingbot`, `GPTBot`, `ChatGPT-User`
     - `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`
     - `Google-Extended`, `facebookexternalhit`, `Twitterbot`

## Step 8: Verify Deployment

Test all these URLs in your browser:

```
https://guideindiatours.com                    --> Homepage
https://guideindiatours.com/plans              --> Tour plans
https://guideindiatours.com/robots.txt         --> Should show AI bot rules
https://guideindiatours.com/sitemap.xml        --> Should show XML sitemap
https://guideindiatours.com/llms.txt           --> Should show business profile
https://guideindiatours.com/api/ai-profile     --> Should show JSON profile
https://guideindiatours.com/delhi-tours        --> City page
https://guideindiatours.com/agra-tours         --> City page
https://guideindiatours.com/jaipur-tours       --> City page
https://guideindiatours.com/faq               --> FAQ page
```

Also test from terminal:
```bash
curl -I https://guideindiatours.com
# Should return: HTTP/2 200
```

## Step 9: Set Up Search Console (After DNS Propagation)

1. **Google Search Console**: https://search.google.com/search-console
   - Add property > URL prefix > `https://guideindiatours.com`
   - Verify with HTML tag method
   - Update `YOUR_GOOGLE_VERIFICATION_CODE` in `app/layout.tsx`
   - Submit sitemap: `sitemap.xml`
   - Request indexing for all pages

2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
   - Add site > verify with meta tag
   - Update `YOUR_BING_VERIFICATION_CODE` in `app/layout.tsx`
   - Submit sitemap

---

## Troubleshooting

### App won't start
- Check hPanel **Logs/Console** for error messages
- Make sure `server.js` is in the root of your app directory
- Verify Node.js version is 18+ or 20+
- Check that `node_modules` folder was extracted properly

### 502 Bad Gateway
- The Node.js app crashed - check logs
- Make sure PORT env variable matches what Hostinger expects
- Restart the Node.js app in hPanel

### Images not loading
- Make sure `public/` folder with `images/` is in the app directory
- Check `.next/static/` folder is present

### Site works but crawlers get blocked
- Check Security > Bot Protection settings
- Temporarily disable WAF to test
- Check if Hostinger auto-enabled DDoS protection

---

## Re-deploying Updates

When you make code changes:

```bash
# 1. Build locally
npm run build

# 2. Prepare standalone package
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# 3. Zip it
cd .next/standalone && zip -r ../../hostinger-deploy.zip . && cd ../..

# 4. Upload to Hostinger File Manager and extract
# 5. Restart Node.js app in hPanel
```
