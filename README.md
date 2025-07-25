# Hyperdrive for Desktop

Currently supports Windows and Linux.

1.0 and MacOS support coming Soon™.

## Tour

We're excited to release the Hyperdrive Desktop beta for Windows and Linux!
You can download the binaries here: https://github.com/hyperware-ai/hyperdrive-desktop/releases

![home](https://github.com/user-attachments/assets/870ec4c0-a562-45ff-905a-a5beca18e08f)

If you're a Linux user, it should Just Work™.

If you're a Windows user, during install you will probably see a warning about an "Unrecognized app" and "Unknown publisher".
This is expected, and we're working on removing this warning in a future version

If you're a MacOS user, we're working on getting a version out for you soon

A quick guided tour:

When you first open the application after installing, you should see a splash screen that looks like this

You'll need to select an existing node home directory or create a new one using the `Select Directory` dialog. If creating a new one, you'll need to connect your favorite wallet

![splash](https://github.com/user-attachments/assets/40fcdefb-7fb4-4333-91a3-cafc35874046)

![select a node](https://github.com/user-attachments/assets/647e379e-9dca-4ca0-bed4-2ff00137786d)

![submit a node](https://github.com/user-attachments/assets/cc175130-fd12-4106-bb1b-2fc65fd289a2)

![login](https://github.com/user-attachments/assets/45690daa-5a32-4ece-9720-f4d87522130c)

Once you're in, there's one more thing of interest to call your attention to.
In the top-left menu, you've got a `File > Home` button that will take you back to your homescreen when clicked (hotkey `Ctrl + H`).
Very important to get back home after using an app!

![image](https://github.com/user-attachments/assets/faa9a8b5-6196-4cb7-9b58-ddc56793b193)

## Building

1. Get or build Hyperdrive,
2. Hyperdrive must be named `hyperdrive` for MacOS or Linux.
   Hyperdrive must be named `hyperdrive.exe` for Windows.
3. Place Hyperdrive in `bin/` in the appropriate OS directory (`linux/`, `mac/`, or `win/`).

### Build from source

```
npm i
npm run make
```

## Signing

### Prerequisites

#### macOS Signing

1. **Apple Developer Account**: You need an active Apple Developer account ($99/year)
   - Sign up at https://developer.apple.com/programs/
   - Complete the enrollment process with payment

2. **Developer ID Certificate**: Create a "Developer ID Application" certificate
   - Log in to https://developer.apple.com/account
   - Navigate to "Certificates, Identifiers & Profiles"
   - Click the "+" button to create a new certificate
   - Select "Developer ID Application" under "Software"
   - Follow the instructions to generate a Certificate Signing Request (CSR) using Keychain Access
   - Upload the CSR and download the certificate
   - Double-click the downloaded certificate to install it in your macOS Keychain
   - If certificate installation doesn't work, make sure Keychain Access app is open with `login` keychain selected under the `Default Keychains` on the left

3. **Find Your Team ID**:
   - In your Apple Developer account, go to "Membership"
   - Your Team ID is displayed there (10 alphanumeric characters)

### Environment Variables

The build process uses the following environment variables for signing:

#### macOS Code Signing

- `CODESIGN_IDENTITY`: Your Developer ID Application certificate identity
  - To find this, open Keychain Access on macOS
  - Look for your "Developer ID Application" certificate
  - The full name should be: "Developer ID Application: Your Name (TEAMID)"
  - Example: `"Developer ID Application: Acme Corp (ABC123DEF4)"`

- `APPLE_ID`: Your Apple ID email used for the developer account
  - This is the email you use to log into developer.apple.com
  - Example: `developer@example.com`

- `APPLE_ID_PASSWORD`: An app-specific password for your Apple ID
  - Go to https://appleid.apple.com/sign-in
  - Sign in and navigate to "Sign-In and Security"
  - Under "App-Specific Passwords", click "Generate Password"
  - Give it a name like "Electron Notarization"
  - Copy the generated password (format: `xxxx-xxxx-xxxx-xxxx`)
  - Store this securely - you won't be able to see it again

- `APPLE_TEAM_ID`: Your Apple Developer Team ID
  - Found in your Apple Developer account under "Membership"
  - 10 character alphanumeric string
  - Example: `ABC123DEF4`

### Building with Code Signing

#### macOS

```bash
# Set environment variables
export CODESIGN_IDENTITY="Developer ID Application: Your Name (TEAMID)"
export APPLE_ID="your-email@example.com"
export APPLE_ID_PASSWORD="xxxx-xxxx-xxxx-xxxx"
export APPLE_TEAM_ID="TEAMID"

# Build for macOS with signing and notarization
npm run make:mac
```

#### Notes

- If environment variables are not set, the app will be built without signing
- Notarization is only performed when all Apple credentials are provided
- The signing process may take several minutes due to notarization
- Windows and Linux builds are not affected by macOS signing configuration
- Check the status of notarization with
  ```
  xcrun notarytool history --apple-id "your-email@example.com" --password "xxxx-xxxx-xxxx-xxxx" --team-id "TEAMID"
  ```
- Make sure you have accepted all terms on developer.apple.com/account
  Apple periodically puts out new T&Cs for signing and you notarization will sit with status "In Progress" forever until you accept them
- Make sure to
  ```
  npm run install appdmg
  ```
  on your macOS to be able to package the app

#### Cross-Platform Builds

```bash
# Build for specific platforms
npm run make:mac    # macOS only
npm run make:win    # Windows only
npm run make:linux  # Linux only

# Build for all platforms (signing only applies where configured)
npm run make
```
