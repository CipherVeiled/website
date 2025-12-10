# CipherVeiled Website

Official website for CipherVeiled [CV] - Privacy-focused cryptocurrency.

## Features

- Responsive design with cyberpunk/terminal aesthetic
- Animated faulty terminal background effect
- Neon green color scheme matching the CipherVeiled brand
- Docker-ready with automated deployment

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks)
- Nginx web server
- Docker & Docker Compose
- Watchtower for automatic updates

## Local Development

Simply open `index.html` in a web browser to view the site locally.

## Docker Deployment

### Prerequisites

- Docker
- Docker Compose
- GitHub account with container registry access

### GitHub Actions Setup

1. **Enable GitHub Container Registry:**
   - Go to your GitHub repository settings
   - Navigate to "Packages" and ensure GHCR is enabled
   - The workflow will automatically push images on every commit to main/master

2. **Make the package public (optional but recommended):**
   - After first push, go to the package settings on GitHub
   - Change visibility to public (avoids auth issues on your server)

### Server Setup

1. **Update docker-compose.yml:**
   Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:
   ```yaml
   image: ghcr.io/YOUR_GITHUB_USERNAME/cipherveiled-website:latest
   ```

2. **If using private registry, authenticate Docker:**
   ```bash
   echo $GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
   ```
   (Create a Personal Access Token with `read:packages` scope)

3. **Deploy on your server:**
   ```bash
   docker-compose up -d
   ```

   The site will be available at `http://localhost:8080`

4. **Configure your reverse proxy (Nginx Proxy Manager):**
   - Create a new proxy host
   - Point to `cipherveiled-web:80` (or `localhost:8080`)
   - Configure your domain (e.g., cipherveiled.org)
   - SSL is handled by your reverse proxy

### Automatic Updates with Watchtower

Watchtower is configured to:
- Check for updates every 5 minutes (300 seconds)
- Only monitor containers with the label `com.centurylinklabs.watchtower.enable=true`
- Automatically pull new images and restart containers
- Clean up old images after updates

**How it works:**
1. Push changes to your GitHub repository
2. GitHub Actions automatically builds and pushes the Docker image to GHCR
3. Watchtower detects the new image (checks every 5 minutes)
4. Pulls the new image and restarts the container
5. Cleans up old images

### Manual Update

**On GitHub:**
- Push to main/master branch to trigger automatic build
- Or manually trigger workflow from Actions tab

**On your server (force pull):**
```bash
# Pull latest image and restart
docker-compose pull
docker-compose up -d
```

### Configuration

**Change the exposed port:**
Edit `docker-compose.yml` and modify:
```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

**Adjust Watchtower update interval:**
Edit `docker-compose.yml`:
```yaml
command: --interval 300  # Change 300 to desired seconds
```

## Directory Structure

```
website/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript (terminal effect, animations)
├── logo.png            # CipherVeiled logo
├── nginx.conf          # Nginx configuration
├── Dockerfile          # Docker image definition
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # This file
```

## Fonts

- **Rubik Glitch** - Used for the CipherVeiled title
- **Bruno Ace SC** - Used for all other text

Both fonts are loaded from Google Fonts.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

See the main CipherVeiled repository for license information.

## Support

For issues or questions, please visit https://github.com/cipherveiled/cipherveiled
