# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4ed397dc-d132-4b4c-94e9-16f06bc23a29

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4ed397dc-d132-4b4c-94e9-16f06bc23a29) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages (puzatisushi.com.ua)

This project is configured to deploy automatically to GitHub Pages at **puzatisushi.com.ua**.

#### Initial Setup (One-time)

1. Go to your GitHub repository settings
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. Under **Custom domain**, enter `puzatisushi.com.ua` (if not already set)
5. Wait for DNS check to complete

#### DNS Configuration

Make sure your DNS provider has the following records:

**A Records** (point to GitHub Pages servers):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (if using www subdomain):
```
www.puzatisushi.com.ua CNAME <your-github-username>.github.io
```

#### Automatic Deployment

Every push to the `main` branch will automatically trigger a deployment via GitHub Actions. The workflow will:
1. Build the project
2. Copy the CNAME file
3. Deploy to GitHub Pages

You can also manually trigger a deployment from the **Actions** tab in GitHub.

### Alternative: Lovable

Simply open [Lovable](https://lovable.dev/projects/4ed397dc-d132-4b4c-94e9-16f06bc23a29) and click on Share -> Publish.
