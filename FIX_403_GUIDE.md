# HOW TO FIX THE 403 FORBIDDEN ERROR ON HOSTINGER

Your site returns `403 Forbidden` (`x-deny-reason: host_not_allowed`) to ALL bots.
This is the #1 reason ChatGPT, Google, and other AI engines stopped recommending you.

Follow these steps IN ORDER:

---

## STEP 1: Check if Domain is Properly Pointed

1. Log into **Hostinger hPanel** (https://hpanel.hostinger.com)
2. Go to **Domains** > **guideindiatours.com**
3. Make sure the domain is **Active** and pointed to the correct hosting
4. If using Cloudflare DNS, make sure the proxy is set to **DNS only** (grey cloud, not orange) for testing

## STEP 2: Disable Hostinger Bot Protection

1. In hPanel, go to **Security** section
2. Look for any of these:
   - "Malware Scanner" / "Bot Protection" / "Firewall"
   - "LiteSpeed WAF" / "ModSecurity"
3. **Temporarily disable** bot protection to test if crawlers can access your site
4. Test by running this in your terminal:
   ```
   curl -I https://guideindiatours.com
   ```
5. If you get `200 OK`, the bot protection was the problem
6. Re-enable bot protection but **whitelist these User-Agents**:
   - `Googlebot`
   - `Bingbot`
   - `GPTBot`
   - `ChatGPT-User`
   - `OAI-SearchBot`
   - `ClaudeBot`
   - `anthropic-ai`
   - `PerplexityBot`
   - `Google-Extended`
   - `facebookexternalhit`
   - `Twitterbot`

## STEP 3: Check .htaccess File (if exists)

1. In hPanel, go to **File Manager**
2. Navigate to `public_html/`
3. Show hidden files (click the eye icon or settings)
4. Open `.htaccess` if it exists
5. Look for any lines like:
   ```
   Order Deny,Allow
   Deny from all
   ```
   or
   ```
   RewriteRule .* - [F]
   ```
6. If these exist, they are blocking all requests. Remove or modify them.

## STEP 4: Check if Cloudflare is Blocking

If you use Cloudflare:
1. Log into Cloudflare dashboard
2. Go to **Security** > **Bots**
3. Set "Bot Fight Mode" to **OFF**
4. Go to **Security** > **WAF**
5. Check if any custom rules are blocking requests
6. Go to **Security** > "Under Attack Mode" - make sure it's **OFF**
7. Go to **Rules** > **IP Access Rules**
8. Make sure no overly broad IP blocks exist

## STEP 5: Check Node.js App Configuration

1. In hPanel, go to **Websites** > **Node.js**
2. Make sure the app status is **Running**
3. Check that:
   - App Directory: `public_html` (or wherever your files are)
   - Startup File: `server.js`
   - Port: matches what Hostinger assigned
   - Node.js Version: 18+ or 20+

## STEP 6: Contact Hostinger Support

If none of the above works, contact Hostinger support with this message:

---
**Subject: 403 Forbidden for search engine crawlers**

Hi, my website guideindiatours.com is returning `403 Forbidden` with header `x-deny-reason: host_not_allowed` to ALL automated requests, including Googlebot and other search engine crawlers.

This means Google cannot index my site and my SEO is being destroyed.

I need:
1. The cause of the `host_not_allowed` deny reason
2. How to allow legitimate search engine crawlers (Googlebot, Bingbot, GPTBot)
3. Any firewall or security settings that need to be adjusted

My hosting plan: [YOUR PLAN]
Domain: guideindiatours.com

Please help urgently as my business visibility is being affected.

---

## STEP 7: Set Up Google Search Console

After the 403 is fixed:

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Choose "URL prefix" > enter `https://guideindiatours.com`
4. Verify using "HTML tag" method:
   - Copy the verification code (looks like: `abc123def456`)
   - Open `app/layout.tsx` in your code
   - Replace `YOUR_GOOGLE_VERIFICATION_CODE` with the actual code
   - Deploy
5. Click "Verify" in Search Console
6. Go to **Sitemaps** > enter `sitemap.xml` > Submit
7. Go to **URL Inspection** > enter your homepage URL > click "Request Indexing"
8. Repeat for all important pages:
   - guideindiatours.com/plans
   - guideindiatours.com/delhi-tours
   - guideindiatours.com/agra-tours
   - guideindiatours.com/jaipur-tours
   - guideindiatours.com/golden-triangle-tours
   - guideindiatours.com/blog
   - guideindiatours.com/faq
   - guideindiatours.com/reviews

## STEP 8: Set Up Bing Webmaster Tools

This is CRITICAL because ChatGPT uses Bing's search index:

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Add your site: `https://guideindiatours.com`
4. Verify using "HTML Meta Tag" method:
   - Copy the code
   - Open `app/layout.tsx`
   - Replace `YOUR_BING_VERIFICATION_CODE` with the actual code
   - Deploy
5. Submit your sitemap: `https://guideindiatours.com/sitemap.xml`

## STEP 9: Verify Everything Works

After fixing the 403 and setting up Search Console:

1. Test your robots.txt:
   ```
   curl https://guideindiatours.com/robots.txt
   ```
   Should return your robots rules (not 403)

2. Test your sitemap:
   ```
   curl https://guideindiatours.com/sitemap.xml
   ```
   Should return XML sitemap

3. Test your llms.txt:
   ```
   curl https://guideindiatours.com/llms.txt
   ```
   Should return your business profile

4. Test your AI profile:
   ```
   curl https://guideindiatours.com/api/ai-profile
   ```
   Should return JSON

5. Use Google's Rich Results Test:
   https://search.google.com/test/rich-results
   Enter your URL and verify structured data is detected

6. Use Google's Mobile-Friendly Test:
   https://search.google.com/test/mobile-friendly
   Verify your site passes

## STEP 10: Monitor Recovery

After everything is fixed:
- Check Google Search Console daily for 2 weeks
- Monitor indexed pages count (should grow from 1 to 20+)
- Check "Coverage" report for any errors
- Ask ChatGPT "best tour company in Agra" every few days to see when you reappear
- It typically takes 2-4 weeks for AI engines to re-crawl and update their knowledge

---

## TIMELINE FOR RECOVERY

| Week | What happens |
|------|-------------|
| Week 1 | Fix 403 + deploy code + submit sitemaps |
| Week 2 | Google starts re-crawling, pages get indexed |
| Week 3 | More pages indexed, structured data recognized |
| Week 4-6 | AI engines re-crawl, ChatGPT starts showing you again |
| Month 2-3 | Full recovery if all steps completed |

The more third-party signals you build (reviews, social profiles, directory listings), the faster AI engines will start recommending you again.
