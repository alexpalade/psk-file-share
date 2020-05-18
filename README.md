# File Share PSK SSApp

Based on ssapp-template.

## How to install

### Prerequisites (see [docs](https://privatesky.xyz/?Start/installation))
You need Python 2.7 and Node 12.14.0

    python --version
    node --version

Tip: you can use `virtualenv` and `nvm install 12.14.0` on Linux.

### Install web-wallet (from [docs](https://privatesky.xyz/?Start/installation))
    git clone https://github.com/PrivateSky/web-wallet.git web-wallet
    cd web-wallet
    npm install
    npm run server
    npm run build-all
Check if the this page works: [http://localhost:8080/secure-channels/loader](http://localhost:8080/secure-channels/loader)

### Add SSApp

Make sure the web-wallet web server is running.

Fetch the application from git:

    npm run add file-share https://github.com/alexpalade/psk-file-share
