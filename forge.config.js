const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');
const { spawn } = require('child_process');

module.exports = {
  packagerConfig: {
    icon: 'icons/icon.icns',
    asar: true,
    extraResource: [
      "./bin"
    ],
    osxSign: process.env.CODESIGN_IDENTITY ? {
      identity: process.env.CODESIGN_IDENTITY,
      hardenedRuntime: true,
      gatekeeperAssess: false,
      entitlements: 'entitlements.mac.plist',
      'entitlements-inherit': 'entitlements.mac.plist',
      'signature-flags': 'library'
    } : {},
    osxNotarize: process.env.APPLE_ID && process.env.APPLE_ID_PASSWORD && process.env.APPLE_TEAM_ID ? {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    } : undefined,
    afterCopy: [
      async (buildPath, electronVersion, platform, arch, callback) => {
        if (platform === 'darwin' && process.env.CODESIGN_IDENTITY) {
          const binaryPath = path.join(buildPath, 'Hyperdrive Desktop.app', 'Contents', 'Resources', 'bin', 'mac', 'hyperdrive');
          console.log(`Signing binary at: ${binaryPath}`);

          const codesign = spawn('codesign', [
            '--sign', process.env.CODESIGN_IDENTITY,
            '--force',
            '--deep',
            '--timestamp',
            '--options', 'runtime',
            '--entitlements', 'entitlements.mac.plist',
            binaryPath
          ]);

          codesign.stdout.on('data', (data) => {
            console.log(`codesign stdout: ${data}`);
          });

          codesign.stderr.on('data', (data) => {
            console.error(`codesign stderr: ${data}`);
          });

          codesign.on('close', (code) => {
            if (code !== 0) {
              callback(new Error(`codesign process exited with code ${code}`));
            } else {
              console.log('Binary signed successfully');
              callback();
            }
          });
        } else {
          callback();
        }
      }
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin'],
    // },
    {
      name: '@electron-forge/maker-dmg',
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'icons/icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: 'icons/icon.png'
        }
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'hyperware-ai',
          name: 'hyperdrive-desktop'
        },
        prerelease: false,
        generateReleaseNotes: true
      }
    }
  ]
};
