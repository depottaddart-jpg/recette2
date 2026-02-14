# 🚀 Deployment Guide

This guide covers multiple ways to deploy the Moroccan Recipe Website.

## 📦 Quick Deployment Options

### 1. GitHub Pages (Recommended for Static Sites)

**Steps:**
```bash
# 1. Create a GitHub repository
# 2. Push your code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moroccan-recipes.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings > Pages
# Source: Deploy from a branch
# Branch: main / (root)
# Click Save
```

**Your site will be live at:**
`https://YOUR_USERNAME.github.io/moroccan-recipes/`

**Pros:**
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ Easy updates (just push)
- ✅ Custom domain support

**Cons:**
- ❌ Static sites only
- ❌ Limited bandwidth

---

### 2. Netlify (Best for Continuous Deployment)

**Method A: Drag & Drop**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Drag the project folder onto the deploy area
4. Done! Site is live

**Method B: GitHub Integration**
1. Push code to GitHub
2. Connect Netlify to your repository
3. Configure build settings (not needed for this project)
4. Deploy

**Pros:**
- ✅ Free tier available
- ✅ Instant previews
- ✅ Automatic deploys on push
- ✅ Built-in CDN
- ✅ Custom domains
- ✅ Form handling
- ✅ Split testing

**Cons:**
- ❌ Limited build minutes on free tier

**Custom Domain:**
```
Domain settings > Add custom domain
```

---

### 3. Vercel (Similar to Netlify)

**Steps:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd moroccan-recipes
vercel

# Follow prompts to:
# - Log in/sign up
# - Link to project
# - Deploy
```

**Or via GitHub:**
1. Import your GitHub repository
2. Configure (defaults work)
3. Deploy

**Pros:**
- ✅ Excellent performance
- ✅ Free SSL
- ✅ Edge network
- ✅ Zero configuration
- ✅ Preview deployments

---

### 4. Firebase Hosting

**Setup:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: . (current directory)
# - Single-page app: No
# - Set up automatic builds: No
# - Overwrite files: No

# Deploy
firebase deploy --only hosting
```

**Pros:**
- ✅ Fast CDN
- ✅ Free tier
- ✅ Custom domains
- ✅ Analytics integration

---

### 5. Surge (Simplest Deployment)

**Steps:**
```bash
# Install Surge
npm install -g surge

# Deploy
cd moroccan-recipes
surge

# Follow prompts:
# - Email & password (first time)
# - Confirm project path
# - Choose domain name
```

**Pros:**
- ✅ Super simple
- ✅ Free custom domains
- ✅ Fast deployment

**Cons:**
- ❌ Basic features only

---

### 6. Traditional Web Hosting (cPanel, etc.)

**Steps:**
1. Compress project folder to `.zip`
2. Access your hosting cPanel
3. Go to File Manager
4. Navigate to `public_html` or `www`
5. Upload and extract the ZIP file
6. Visit your domain

**Pros:**
- ✅ Full control
- ✅ Can add backend later
- ✅ Works with existing hosting

**Cons:**
- ❌ Manual updates
- ❌ Costs money

---

## 🔧 Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Check responsive design on multiple devices
- [ ] Verify search functionality
- [ ] Test favorites persistence
- [ ] Validate JSON data structure
- [ ] Check for console errors
- [ ] Test in different browsers
- [ ] Optimize images (if added later)
- [ ] Review README.md
- [ ] Update any placeholder text

---

## 🌐 Custom Domain Setup

### For GitHub Pages:
1. Add `CNAME` file with your domain
2. Configure DNS:
   - Add A records pointing to GitHub IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or CNAME: `YOUR_USERNAME.github.io`

### For Netlify/Vercel:
1. Add domain in dashboard
2. Update DNS with provided nameservers or records
3. Wait for DNS propagation (up to 48 hours)

---

## 📊 Performance Optimization

### Before Deployment:
- **Minify CSS**: Use online tools or build process
- **Minify JavaScript**: Use online tools or build process
- **Compress Images**: If you add images later
- **Enable Caching**: Configure headers
- **Use CDN**: Most platforms provide this automatically

### Example Build Script (Optional):
```json
{
  "scripts": {
    "build": "npm run minify",
    "minify": "minify app.js -o app.min.js && minify styles.css -o styles.min.css"
  }
}
```

---

## 🔒 Security Considerations

1. **HTTPS**: Ensure SSL is enabled (most platforms provide free SSL)
2. **Headers**: Add security headers if platform supports
3. **Input Sanitization**: Already handled in the code
4. **No Secrets**: No API keys or sensitive data in frontend

---

## 📈 Analytics Setup (Optional)

### Google Analytics:
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🐛 Troubleshooting

### Issue: Site not loading
- Check DNS propagation
- Verify files are in correct directory
- Check browser console for errors

### Issue: JSON not loading
- Ensure `recipes-ar.json` is in same directory as HTML
- Check MIME types in server configuration
- Verify JSON is valid

### Issue: Styles not working
- Check CSS file path
- Verify CSS file uploaded
- Clear browser cache

---

## 📱 Mobile App (Future)

Consider these options for mobile app versions:
- **PWA**: Convert to Progressive Web App
- **React Native**: Port to mobile framework
- **Ionic/Capacitor**: Hybrid app framework

---

## 🔄 Continuous Deployment

### GitHub Actions Example:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 📞 Support

Need help deploying? Check:
- Platform-specific documentation
- Community forums
- GitHub Issues for this project

---

**Happy Deploying! 🎉**
