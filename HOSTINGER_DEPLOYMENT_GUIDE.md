# Hostinger Deployment Guide

This guide explains how to deploy the **Travel Trove Experience (Guide India Tours)** Next.js application to Hostinger Shared Hosting.

## 📦 Prerequisites

1.  **Node.js Support**: Ensure your Hostinger plan supports Node.js (available on Business and Cloud plans).
2.  **Filesystem Access**: You'll need access to the Hostinger File Manager or FTP.

## 🚀 Deployment Steps

### 1. Upload the Build
I have prepared a `hostinger-deploy.zip` file which contains the standalone production build.
1.  Log in to your Hostinger hPanel.
2.  Go to **File Manager**.
3.  Upload `hostinger-deploy.zip` to your domain's root directory (usually `public_html`, or a subfolder if you prefer).
4.  **Extract** the zip file. Ensure the contents (like `server.js`, `.next`, `public`, `node_modules`) are at the root level of your domain folder.

### 2. Configure Node.js on Hostinger
1.  In hPanel, search for **Node.js**.
2.  Select your domain.
3.  **App Directory**: Set this to the location where you extracted the files (e.g., `public_html`).
4.  **Startup File**: Set this to `server.js`.
5.  **Environment Variables**:
    *   `PORT`: `3000` (or whatever Hostinger assigns).
    *   `NODE_ENV`: `production`
6.  **Node.js Version**: Select the latest stable version (v18+ or v20+ recommended).
7.  Click **Run/Start**.

### 3. Handle Static Assets
The standalone build already includes the `public` and `.next/static` folders in the correct locations inside the zip. Hostinger's Node.js server will serve these automatically.

### 4. Verify External Links
Ensure your domain is properly pointed to Hostinger. Once the Node.js app is running, visit:
- `https://guideindia.tours/`
- `https://guideindia.tours/plans/1002`

## 🛠️ Troubleshooting

- **Check Logs**: If the app fails to start, check the "Console" or "Logs" section in Hostinger's Node.js panel.
- **Permission Errors**: Ensure that the Node.js user has read/write permissions for the `public_html` directory.
- **Port Conflict**: If port 3000 is occupied, Hostinger will usually provide a random port. The Next.js standalone server handles the `PORT` environment variable automatically.

---
*Prepared by Antigravity*
