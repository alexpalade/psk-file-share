# File storage/sharing PSK SSApp

A privatesky SSApp for storing and sharing files through a users' wallet.

- file sharing is not implemented (only storage)
- the app needs refresh to see the latest uploads
- file size limited to 64K

## How to install

Please follow the "How to create... a SSApp" [tutorial](https://privatesky.xyz/?Howto/a-ssapp&chapter=ssapp-tutorial) from the Privatesky [development hub](https://privatesky.xyz/).
Instead of `https://github.com/username/todo-app.git`, use `https://github.com/alexpalade/psk-file-share`.

**Additional requirement:**

 - (not recommended) currently, we expect to find the root app's seed in `APP_CONFIG.WALLET_SEED`. You might do it by adding `APP_CONFIG.WALLET_SEED = wallet.getSeed();` in `web-server/secure-channels/loader/controllers/MainController.js`
 - (better) refactor the application to get the seed from a swarm
 - (some day) load the dossier from the PIN (not yet possible in privatesky)
