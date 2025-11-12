# 🚀 Heroku Deployment Guide

## Prerequisites

1. **Heroku Account**: Sign up at [heroku.com](https://heroku.com)
2. **Heroku CLI**: Install from [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Ensure git is installed

---

## 📦 Files Created for Heroku

- **package.json** - Node.js dependencies and scripts
- **server.js** - Express server to serve the application
- **Procfile** - Tells Heroku how to run the app
- **.gitignore** - Files to exclude from git

---

## 🚀 Deployment Steps

### 1. Install Node Dependencies

```bash
cd ~/agentforce-roadmap
npm install express
```

### 2. Initialize Git Repository (if not already)

```bash
git init
git add .
git commit -m "Initial commit - Agentforce Roadmap"
```

### 3. Login to Heroku

```bash
heroku login
```

This will open your browser to authenticate.

### 4. Create Heroku App

```bash
heroku create agentforce-roadmap
```

Or with a custom name:

```bash
heroku create your-custom-name
```

### 5. Deploy to Heroku

```bash
git push heroku master
```

Or if you're on the `main` branch:

```bash
git push heroku main
```

### 6. Open Your App

```bash
heroku open
```

---

## 🌐 Your App URL

After deployment, your app will be available at:
```
https://your-app-name.herokuapp.com
```

---

## 📊 Useful Heroku Commands

### View Logs
```bash
heroku logs --tail
```

### Check App Status
```bash
heroku ps
```

### Restart App
```bash
heroku restart
```

### Set Config Variables (if needed)
```bash
heroku config:set NODE_ENV=production
```

### View App Info
```bash
heroku info
```

### Open Heroku Dashboard
```bash
heroku dashboard
```

---

## 🔄 Updating Your Deployment

When you make changes:

```bash
git add .
git commit -m "Description of changes"
git push heroku master
```

---

## ⚙️ Configuration

### Environment Variables
If you need environment variables:

```bash
heroku config:set KEY=value
```

### Custom Domain
To add a custom domain:

```bash
heroku domains:add www.yourdomain.com
```

---

## 🐛 Troubleshooting

### Check Build Logs
```bash
heroku logs --tail
```

### If deployment fails:
1. Check that `package.json` is valid
2. Ensure `Procfile` exists
3. Verify `server.js` has no errors
4. Check Node version compatibility

### View Remote Git URL
```bash
git remote -v
```

### Re-add Heroku Remote (if needed)
```bash
heroku git:remote -a your-app-name
```

---

## 💡 Tips

1. **Free Tier**: Heroku free tier sleeps after 30 minutes of inactivity
2. **Keep Active**: Use services like [Kaffeine](http://kaffeine.herokuapp.com/) to prevent sleep
3. **Custom Domain**: Available on paid plans
4. **SSL**: Automatic SSL on all Heroku apps
5. **Logs**: Check logs regularly for errors

---

## 🔒 Security Notes

- Never commit sensitive data
- Use environment variables for secrets
- Keep dependencies updated
- Enable 2FA on Heroku account

---

## 📱 Mobile Optimization

The app is already responsive and will work great on mobile devices accessed via Heroku URL!

---

## 🎯 Production Checklist

- [ ] Test locally: `npm start`
- [ ] Initialize git repository
- [ ] Install express: `npm install express`
- [ ] Create Heroku app
- [ ] Deploy to Heroku
- [ ] Test deployed app
- [ ] Check logs for errors
- [ ] Set up monitoring (optional)

---

## 📞 Support

- **Heroku Docs**: [devcenter.heroku.com](https://devcenter.heroku.com)
- **Status**: [status.heroku.com](https://status.heroku.com)
- **Support**: [help.heroku.com](https://help.heroku.com)

---

**Last Updated**: November 12, 2025  
**Deployment Ready**: ✅ All files configured!

