# How to Install the Sentiment Library

Don't worry - this is super easy! Just follow these steps:

## Step 1: Open Terminal

### On Mac:
1. Press `Command + Space` (the ⌘ key and spacebar together)
2. Type "Terminal"
3. Press Enter

### On Windows:
1. Press `Windows key + R`
2. Type "cmd" and press Enter

## Step 2: Go to Your Project Folder

In Terminal, type this command and press Enter:

```bash
cd /Users/amorentia/Documents/GitHub/proposition-neutrality
```

(Or if you're already in the project folder, you can skip this step)

## Step 3: Install the Library

Type this command and press Enter:

```bash
npm install
```

This will install all the libraries your project needs, including the new sentiment library.

## Step 4: Wait for It to Finish

You'll see a bunch of text scrolling by - that's normal! Just wait until you see something like:

```
added 50 packages in 5s
```

or

```
npm install completed successfully
```

## Step 5: You're Done! 🎉

That's it! The sentiment library is now installed. You can now run your app with:

```bash
npm run dev
```

---

## Troubleshooting

**If you get an error about "npm: command not found":**
- You need to install Node.js first
- Go to https://nodejs.org and download the LTS version
- Install it, then try again

**If you get permission errors:**
- On Mac/Linux, you might need to use `sudo npm install` (but try without sudo first)
- On Windows, make sure you're running Terminal as Administrator

**If something else goes wrong:**
- Copy the error message and let me know - I'll help you fix it!

