# Quick Deployment Guide

## 🚀 Fastest Way: Deploy to Vercel (Recommended)

### Using Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your repository
   - Vercel auto-detects Vite - just click "Deploy"
   - Done! Your app is live with a URL like `your-app.vercel.app`

### Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

## 🌐 Alternative: Deploy to Netlify

### Using Netlify Dashboard

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Sign in with GitHub
4. Click "Add new site" → "Import an existing project"
5. Select your repository
6. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

### Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📦 Build Locally First (Optional)

Test the production build before deploying:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

The `dist` folder contains your production-ready app.

## ✅ Post-Deployment Checklist

- [ ] Test your live URL
- [ ] Check that all proposals load correctly
- [ ] Verify analysis details expand/collapse
- [ ] Test on mobile device
- [ ] Share your live URL!

## 🔄 Updating Your Deployed App

After making changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update app"
   git push
   ```

2. Vercel/Netlify will automatically redeploy (if auto-deploy is enabled)
   - Or manually trigger a new deployment from the dashboard

## 💡 Pro Tips

- **Custom Domain**: Both Vercel and Netlify offer free custom domains
- **Environment Variables**: Add any needed env vars in the platform dashboard
- **Analytics**: Consider adding analytics to track usage
- **Performance**: The app is already optimized with Vite's production build

