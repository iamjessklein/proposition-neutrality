# How to Install Node.js (which includes npm)

## Step 1: Download Node.js

1. **Open your web browser** (Safari, Chrome, Firefox, etc.)
2. **Go to this website:** https://nodejs.org
3. **You'll see a big green button** that says "Download Node.js (LTS)" - click it!
   - LTS means "Long Term Support" - it's the stable version
   - It will automatically detect you're on a Mac

## Step 2: Install Node.js

1. **Find the downloaded file** - it's probably in your Downloads folder
   - It will be called something like: `node-v20.x.x.pkg`
2. **Double-click the file** to open it
3. **Follow the installation wizard:**
   - Click "Continue" on each screen
   - Click "Install" when it asks
   - You might need to enter your computer password
4. **Wait for it to finish** - it will say "Installation was successful"

## Step 3: Verify It Worked

1. **Open Terminal** (Command + Space, type "Terminal")
2. **Type this and press Enter:**
   ```bash
   node --version
   ```
3. **You should see a version number** like `v20.x.x`
4. **Type this and press Enter:**
   ```bash
   npm --version
   ```
5. **You should see a version number** like `10.x.x`

If you see version numbers, you're all set! 🎉

## Step 4: Now Install Your Project Libraries

Go back to your project folder and run:

```bash
cd /Users/amorentia/Documents/GitHub/proposition-neutrality
npm install
```

---

## Troubleshooting

**If the installation doesn't work:**
- Make sure you downloaded the Mac version (not Windows)
- Try restarting your computer after installing
- Make sure you entered your password correctly during installation

**If you still get errors:**
- Let me know what error message you see and I'll help!

