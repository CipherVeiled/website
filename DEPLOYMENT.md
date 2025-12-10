# Quick Deployment Guide

## GitHub Setup

1. **Push this repository to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cipherveiled-website.git
   git push -u origin main
   ```

2. **After first push, make the container package public:**
   - Go to `https://github.com/YOUR_USERNAME?tab=packages`
   - Click on `cipherveiled-website` package
   - Package settings → Change visibility → Public
   - This allows your server to pull without authentication

## Server Deployment

1. **Clone repository on your VPS:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cipherveiled-website.git
   cd cipherveiled-website
   ```

2. **Edit docker-compose.yml:**
   ```bash
   nano docker-compose.yml
   ```
   Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username

3. **Start the containers:**
   ```bash
   docker-compose up -d
   ```

4. **Configure Nginx Proxy Manager:**
   - Add Proxy Host
   - Domain: `cipherveiled.org` (or your domain)
   - Forward Hostname: `cipherveiled-web` (or `localhost`)
   - Forward Port: `80` (or `8080` if using port mapping)
   - Enable SSL (Let's Encrypt)

## Updates

Just push to GitHub - everything happens automatically:
```bash
git add .
git commit -m "Update website"
git push
```

Watchtower will detect the new image within 5 minutes and automatically update your site.

## Troubleshooting

**Check if containers are running:**
```bash
docker ps
```

**View logs:**
```bash
docker logs cipherveiled-web
docker logs watchtower-cipherveiled
```

**Force update manually:**
```bash
docker-compose pull
docker-compose up -d
```

**Restart everything:**
```bash
docker-compose down
docker-compose up -d
```
