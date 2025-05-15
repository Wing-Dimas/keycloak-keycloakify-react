<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Keycloakify</a> v11 starter 🚀</i>
    <br/>
    <br/>
</p>

# Theme Existing

-   `keycloakify-public`
-   `keycloakify-government`

# Testing the theme locally

[Documentation](https://docs.keycloakify.dev/testing-your-theme)

# How to customize the theme

[Documentation](https://docs.keycloakify.dev/customization-strategies)

# Building the theme

You need to have [Maven](https://maven.apache.org/) installed to build the theme (Maven >= 3.1.1, Java >= 7).
The `mvn` command must be in the $PATH.

-   On macOS: `brew install maven`
-   On Debian/Ubuntu: `sudo apt-get install maven`
-   On Windows: `choco install openjdk` and `choco install maven` (Or download from [here](https://maven.apache.org/download.cgi))

```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/targeting-specific-keycloak-versions).

# Testing Keyloack Theme

Run Dokcer first

Once the prerequisites are set up, you're ready to start Keycloak. Run the following command in your Keycloakify project:

```bash
npx keycloakify start-keycloak
```
