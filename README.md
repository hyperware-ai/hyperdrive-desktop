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
