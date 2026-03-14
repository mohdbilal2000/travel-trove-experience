# HOW TO FIX LOW GOOGLE INDEXING & AI VISIBILITY

## Your Setup: Render (hosting) + GoDaddy (domain)

Your site is live but **Google has only indexed 2 out of 25+ pages**.
This means most of your content is invisible to Google, ChatGPT, Gemini, and other AI engines.

Follow these steps IN ORDER:

---

## STEP 1: Verify Your Render Service is Healthy

1. Log into **Render Dashboard** (https://dashboard.render.com)
2. Find your web service for guideindiatours.com
3. Check:
   - Service status is **Live** (green)
   - No deploy errors in recent deploys
   - Environment variables are set: `NODE_ENV=production`
4. Check the **Logs** tab for any errors
5. Make sure your service is NOT on a free plan (free plans spin down after inactivity - crawlers will hit a cold start timeout)

**Important:** If you're on Render's **free tier**, your service goes to sleep after 15 minutes of inactivity. When Googlebot or GPTBot tries to crawl your site, it times out waiting for the cold start. **Upgrade to at least the Starter plan ($7/mo)** to keep your service always running.

## STEP 2: Verify GoDaddy DNS is Correct

1. Log into **GoDaddy** (https://dcc.godaddy.com)
2. Go to **DNS Management** for guideindiatours.com
3. You should have these records:

   **For root domain (guideindiatours.com):**
   | Type | Name | Value |
   |------|------|-------|
   | A | @ | Your Render IP (check Render dashboard) |

   OR if using CNAME flattening:
   | Type | Name | Value |
   |------|------|-------|
   | CNAME | @ | your-service-name.onrender.com |

   **For www subdomain:**
   | Type | Name | Value |
   |------|------|-------|
   | CNAME | www | your-service-name.onrender.com |

4. In Render dashboard > your service > **Settings** > **Custom Domains**:
   - Make sure `guideindiatours.com` is listed AND shows **Verified** with valid SSL
   - Make sure `www.guideindiatours.com` is also added if you use www

5. If the domain shows "DNS not configured" or "Pending" in Render, the connection is broken

## STEP 3: Test Your Site Accessibility

Run these from your own computer terminal (not from this tool):

```bash
# Test main site
curl -I https://guideindiatours.com

# Test robots.txt - CRITICAL for SEO
curl https://guideindiatours.com/robots.txt

# Test sitemap
curl https://guideindiatours.com/sitemap.xml

# Test llms.txt (AI crawlers use this)
curl https://guideindiatours.com/llms.txt

# Test AI profile endpoint
curl https://guideindiatours.com/api/ai-profile
```

All should return `200 OK`. If any return errors, your Render deploy needs fixing.

## STEP 4: Deploy the Code Fixes

The code fixes in this branch need to be deployed:

```bash
# Merge this branch to your main branch
git checkout main
git merge claude/audit-seo-ai-crawl-LH0ae
git push origin main
```

Or create a PR and merge it. Render should auto-deploy from your main branch.

**What this deploy fixes:**
- Removes conflicting static robots.txt (was hiding AI bot rules)
- Removes `nocache` directive (was preventing AI from storing your pages)
- Removes hidden SEO text (Google penalty risk)
- Removes duplicate schema markup
- Adds 10 more FAQ questions for AI extraction
- Fixes broken sameAs URLs
- Adds proper crawlability headers
- Removes exposed PHP files with database credentials

## STEP 5: Set Up Google Search Console (CRITICAL)

This is the **most important step** for getting indexed:

1. Go to https://search.google.com/search-console
2. Click **"Add Property"**
3. Choose **"URL prefix"** > enter `https://guideindiatours.com`
4. Choose **"HTML tag"** verification method
5. Copy the verification code (looks like: `google1234567890abcdef`)
6. Open `app/layout.tsx` in your code
7. Find this line:
   ```
   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
   ```
8. Replace `YOUR_GOOGLE_VERIFICATION_CODE` with your actual code
9. Deploy to Render
10. Go back to Search Console and click **"Verify"**
11. Go to **Sitemaps** > enter `sitemap.xml` > click **Submit**
12. Go to **URL Inspection** > enter your homepage URL > click **"Request Indexing"**
13. Repeat "Request Indexing" for ALL these pages:
    - `https://guideindiatours.com/plans`
    - `https://guideindiatours.com/delhi-tours`
    - `https://guideindiatours.com/agra-tours`
    - `https://guideindiatours.com/jaipur-tours`
    - `https://guideindiatours.com/golden-triangle-tours`
    - `https://guideindiatours.com/blog`
    - `https://guideindiatours.com/faq`
    - `https://guideindiatours.com/reviews`
    - `https://guideindiatours.com/about`
    - `https://guideindiatours.com/services`
    - `https://guideindiatours.com/contact`

## STEP 6: Set Up Bing Webmaster Tools (CRITICAL for ChatGPT)

**ChatGPT uses Bing's search index.** If Bing doesn't know your pages, ChatGPT won't recommend you.

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Click **"Add Your Site"** > enter `https://guideindiatours.com`
4. Choose **"HTML Meta Tag"** verification
5. Copy the verification code
6. Open `app/layout.tsx`
7. Find this line:
   ```
   'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
   ```
8. Replace `YOUR_BING_VERIFICATION_CODE` with your actual code
9. Deploy to Render
10. Verify in Bing Webmaster Tools
11. Go to **Sitemaps** > submit `https://guideindiatours.com/sitemap.xml`
12. Go to **URL Submission** > submit all your important page URLs

## STEP 7: Submit to AI Engines Directly

### ChatGPT (OpenAI)
- Your robots.txt now allows `GPTBot`, `ChatGPT-User`, and `OAI-SearchBot`
- Your `/llms.txt` endpoint gives ChatGPT structured business info
- Getting indexed in Bing (Step 6) is the primary way to appear in ChatGPT

### Google Gemini
- Uses Google's index - Google Search Console (Step 5) handles this
- Your `Google-Extended` is allowed in robots.txt

### Perplexity
- Submit your site at: https://perplexity.ai/submit
- Your robots.txt allows `PerplexityBot`

## STEP 8: Build Third-Party Authority

AI engines cross-reference multiple sources. Create profiles on:

1. **TripAdvisor** - Claim/create your business listing, actively collect reviews
2. **Google Business Profile** - Make sure it's complete, post weekly updates
3. **Instagram** (@guideindiatours) - Post tour photos/reels regularly
4. **Facebook Business Page** - Complete profile with reviews
5. **YouTube** - Tour videos, destination guides
6. **LinkedIn** - Company page

After creating these, add the URLs to `sameAs` in:
- `lib/schemaGenerator.ts` (in the `generateConnectedGraphSchema` function)
- `app/api/ai-profile/route.ts`

## STEP 9: Verify Everything Works

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Enter `https://guideindiatours.com` and verify all schemas are detected

2. **Schema Validator**: https://validator.schema.org/
   - Test your homepage, a tour page, and your FAQ page

3. **Check robots.txt is served correctly:**
   - Visit `https://guideindiatours.com/robots.txt` in your browser
   - Should show all the AI bot rules (GPTBot, ChatGPT-User, ClaudeBot, etc.)

4. **Check sitemap works:**
   - Visit `https://guideindiatours.com/sitemap.xml`
   - Should list all your pages with lastmod dates

## STEP 10: Monitor Recovery

- Check Google Search Console **daily** for 2 weeks
- Monitor **indexed pages count** (should grow from 2 to 20+)
- Check the **"Pages"** report for crawl errors
- Ask ChatGPT "best tour company in Agra" weekly to track when you reappear
- Check Bing Webmaster Tools for indexing progress

---

## TIMELINE FOR RECOVERY

| Week | What happens |
|------|-------------|
| Week 1 | Deploy code fixes + set up Search Console + submit sitemaps |
| Week 2 | Google starts re-crawling, more pages get indexed |
| Week 3 | 10-15 pages indexed, structured data recognized in rich results |
| Week 4-6 | AI engines re-crawl, ChatGPT may start showing you again |
| Month 2-3 | Full recovery with consistent content updates + reviews |

---

## WHY ONLY 2 PAGES ARE INDEXED

Possible reasons (check all):

1. **No Search Console submitted** - Google didn't know about your other pages
2. **Render free tier** - Service sleeps, crawlers time out
3. **The old static robots.txt was blocking `/_next/`** - Google couldn't render pages properly (FIXED in this commit)
4. **`nocache: true`** told Google not to store pages (FIXED in this commit)
5. **No internal linking strategy** - Pages without links from other pages don't get discovered
6. **Site is too new** - If recently launched, Google takes time to discover all pages
7. **Sitemap wasn't submitted** - Google didn't know your pages existed
