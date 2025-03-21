## Deploying Angular/Ionic Projects to GitHub Pages

This guide outlines the steps to deploy your Angular or Ionic project to GitHub Pages.

**One-Time Setup**

1.  **Create and Checkout `gh-pages` Branch:**

    ```bash
    git branch gh-pages
    git checkout gh-pages
    ```

    Alternatively, for a combined create and checkout:

    ```bash
    git checkout -b gh-pages
    ```

2.  **Publish the `gh-pages` Branch:**

    ```bash
    git push origin gh-pages
    ```

3.  **Install `angular-cli-ghpages` Globally:**

    ```bash
    npm install -g angular-cli-ghpages
    ```

**Deployment Process (Repeat for Each Deployment)**

1.  **Build the Project:**

    For Angular projects, use:

    ```bash
    ng build --prod --base-href https://[username].github.io/[repo]/
    ```

    Example:

    ```bash
    ng build --configuration production --base-href [https://tathagatamukherjee044.github.io/cramm/](https://tathagatamukherjee044.github.io/cramm/) // dont use as having a href blocks CORS
    ```

    Instead use:

    ng build --configuration production

    For Ionic projects, the build directory might be `www/browser`:

    ```bash
    ionic build --prod
    ```

2.  **Deploy to GitHub Pages using `ngh`:**

    For Angular projects:

    ```bash
    ngh --dir=dist/[project-name]
    ```

    Example:

    ```bash
    ngh --dir=dist/cramm
    ```

    For Ionic projects:

    ```bash
    ngh --dir=www/browser
    ```

3.  **Configure GitHub Pages:**

    * Go to your repository on GitHub.
    * Navigate to **Settings** -> **Pages** in the left-hand menu.
    * Ensure the source is set to the `gh-pages` branch.
    * If you have a custom domain, enter it in the "Custom domain" field.

4.  **Verify Deployment:**

    Check your deployed site at:

    ```
    https://[username].github.io/[repo]/
    ```

    Example:

    ```
    [https://tathagatamukherjee044.github.io/cramm/](https://tathagatamukherjee044.github.io/cramm/)
    ```

    Or at your custom domain, if configured:

    ```
    www.cramm.in
    ```

**Troubleshooting CORS Issues**

If you encounter Cross-Origin Resource Sharing (CORS) issues, try setting the `baseHref` to `""` (an empty string) in your `index.html` file. This can sometimes resolve pathing problems.