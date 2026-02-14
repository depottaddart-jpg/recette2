# ⚡ Quick Start Guide

Get your Moroccan Recipe Website running in under 2 minutes!

## 🎯 Step 1: Download Files

You should have these files:
- `index.html` - Main page
- `styles.css` - All styling
- `app.js` - JavaScript functionality
- `recipes-ar.json` - Recipe data
- `README.md` - Full documentation
- `.gitignore` - Git ignore file
- `LICENSE` - MIT license
- `CONTRIBUTING.md` - Contribution guidelines
- `DEPLOYMENT.md` - Hosting guide

## 🚀 Step 2: Run Locally

### Option A: Double-Click (Easiest)
Simply **double-click** `index.html` to open it in your default browser!

### Option B: Local Server (Recommended)

**Using Python:**
```bash
# Navigate to folder
cd path/to/moroccan-recipes

# Start server
python -m http.server 8000

# Open browser to:
http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server (once)
npm install -g http-server

# Navigate to folder
cd path/to/moroccan-recipes

# Start server
http-server

# Open browser to:
http://localhost:8080
```

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## ✅ Step 3: Verify It Works

You should see:
- ✓ Hero section with "مطبخ النكهات"
- ✓ Search bar
- ✓ Filter buttons (الكل, سريعة التحضير, etc.)
- ✓ Statistics (75 وصفة, etc.)
- ✓ Grid of recipe cards
- ✓ Working search functionality
- ✓ Clickable recipe cards opening modals
- ✓ Favorites button (♥) working

## 🎨 Features to Try

1. **Search**: Type "سمك" or "دجاج" in search bar
2. **Filter**: Click "سريعة التحضير" button
3. **Sort**: Use dropdown to sort by time/cost
4. **Favorites**: Click ♥ on any recipe card
5. **Recipe Details**: Click any recipe card to see full details
6. **View Favorites**: Click favorites button (♥ 0) in header

## 📁 File Structure

```
your-folder/
├── index.html          ← Open this!
├── styles.css          ← Don't modify unless needed
├── app.js             ← JavaScript magic
├── recipes-ar.json    ← 75 recipes data
└── README.md          ← Full documentation
```

## 🐛 Troubleshooting

### Problem: Recipe cards not showing
**Solution**: Make sure `recipes-ar.json` is in the same folder as `index.html`

### Problem: Styles not working
**Solution**: Ensure `styles.css` is in the same folder and not blocked by browser

### Problem: Search not working
**Solution**: Open browser console (F12) and check for JavaScript errors

### Problem: Favorites not persisting
**Solution**: Check that browser allows localStorage (not in private mode)

## 🌐 Deploy to Internet

**Fastest Way - GitHub Pages:**
```bash
# 1. Create GitHub account if needed
# 2. Create new repository
# 3. Upload all files
# 4. Go to Settings > Pages
# 5. Enable Pages from main branch
# 6. Wait 2-3 minutes
# 7. Your site is live!
```

**URL will be:**
`https://YOUR_USERNAME.github.io/REPO_NAME/`

See `DEPLOYMENT.md` for more hosting options!

## 📱 Mobile Testing

To test on your phone:
1. Run local server on your computer
2. Find your computer's local IP:
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`
3. On phone, visit: `http://YOUR_IP:8000`

## 🎓 Next Steps

- Read `README.md` for full features
- Check `DEPLOYMENT.md` to go live
- See `CONTRIBUTING.md` to add features
- Customize colors in `styles.css`
- Add your own recipes to `recipes-ar.json`

## 💡 Pro Tips

1. **Bookmark your favorites** - They're saved in browser!
2. **Use filters** - Find recipes faster
3. **Check stats** - See average time and cost
4. **Mobile-friendly** - Works great on phones
5. **RTL support** - Perfect for Arabic text

## 🎉 You're All Set!

Your recipe website is ready to use. Enjoy exploring 75 authentic Moroccan recipes!

Need help? Check the full README.md or open an issue on GitHub.

---

**Happy Cooking! 👨‍🍳**
