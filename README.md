# Hyperdrive for Desktop

Currently supports Windows and Linux.

1.0 and MacOS support coming Soon™.

## Tour

We're excited to release the Hyperdrive Desktop beta for Windows and Linux!
You can download the binaries here: https://github.com/hyperware-ai/hyperdrive-desktop/releases

![image](https://github.com/user-attachments/assets/22314b54-61ab-4e65-a1c4-0765ef5f02f5)

If you're a Linux user, it should Just Work™.

If you're a Windows user, during install you will probably see a warning about an "Unrecognized app" and "Unknown publisher".
This is expected, and we're working on removing this warning in a future version

If you're a MacOS user, we're working on getting a version out for you soon

A quick guided tour:

When you first open the application after installing, you should see a splash screen that looks like this

You'll need to select an existing node home directory or create a new one using the `Select Directory` dialog. If creating a new one, you'll need to connect your favorite wallet

![image](https://github.com/user-attachments/assets/867e9f1a-be55-4280-9ba5-f2bfe64e4ad5)

![image](https://github.com/user-attachments/assets/e58a140e-1793-49dd-80be-629b60a1f514)

![image](https://github.com/user-attachments/assets/8cb81f23-cbf4-4475-a50d-0c014d9caf39)

![image](https://github.com/user-attachments/assets/feb2a3ef-8173-4a22-bfb7-e39b944fd137)

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
2. **Developer ID Certificate**: Create a "Developer ID Application" certificate in your Apple Developer account
3. **Install Certificate**: Download and install the certificate in your macOS Keychain

### Environment Variables

The build process uses the following environment variables for signing:

#### macOS Code Signing

- `CODESIGN_IDENTITY`: Your Developer ID Application certificate identity (e.g., "Developer ID Application: Your Name (TEAMID)")
- `APPLE_ID`: Your Apple ID email used for the developer account
- `APPLE_ID_PASSWORD`: An app-specific password for your Apple ID (generate at appleid.apple.com)
- `APPLE_TEAM_ID`: Your Apple Developer Team ID

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

#### Cross-Platform Builds

```bash
# Build for specific platforms
npm run make:mac    # macOS only
npm run make:win    # Windows only
npm run make:linux  # Linux only

# Build for all platforms (signing only applies where configured)
npm run make
```

### Notes

- If environment variables are not set, the app will be built without signing
- Notarization is only performed when all Apple credentials are provided
- The signing process may take several minutes due to notarization
- Windows and Linux builds are not affected by macOS signing configuration
