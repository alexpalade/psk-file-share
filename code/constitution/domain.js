domainRequire=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./../../domain":[function(require,module,exports){
//Add specific code here (swarms, flows, assets, transactions)

$$.swarms.describe("Echo", {
    say: function(input){
        this.return(null, "Echo: "+ input);
    }
});

const abstractFunctions = {
	mountDossier: function (rawDossier, path, newDossierSEED) {
		let self = this;
		rawDossier.mount(path, newDossierSEED, (err) => {
			if (err) {
				return self.return(err);
			}

			self.return(undefined, newDossierSEED);
		});
	}
}

$$.swarms.describe("DossierUtils", {
	newDossier: function (path) {
			let endpoint = "http://localhost:8080";
			const EDFS = require("edfs");
			const edfs = EDFS.attachToEndpoint(endpoint);

			edfs.createRawDossier((err, newRawDossier) => {
				console.log(`New dossier called. New dossier seed: ${newRawDossier.getSeed()}`);
				if (err) {
					return this.return(err);
				}
				
				abstractFunctions.mountDossier
					.call(this, rawDossier, path, newRawDossier.getSeed());
			});
		},
		
    mountPublic: function() {
		console.log("Requiring edfs...");
		const EDFS = require("edfs");
		console.log("OK?");
		const edfs = EDFS.attachToEndpoint("http://localhost:8080");
		const pin = "1234";
		edfs.loadWallet(undefined, pin, (err, wallet) => {
			if (err) {
				throw err;
			}

			console.log("The wallet has been loaded. This is its SEED:", wallet.getSeed());

			//let walletSeed = wallet.getSeed();
			let walletSeed = APP_CONFIG.WALLET_SEED;
			//let walletSeed = "3L3kWZG1xFxFzTwzmfttpNVFU4u5F2wWwRKPgTE24vATh5PB2J4ja9JTTKhCSEfcYwKALP7NTGaKy9m71VR1wf1U2YnTL9KKw2KKWThh8dVaXCf7snaWZd";
			console.log(`Trying to mount /public dossier on wallet dossier with seed ${walletSeed}`);
			if (walletSeed) {

				let endpoint = "http://localhost:8080";
				console.log("Attaching to edfs endpoint...");
				let edfs = EDFS.attachToEndpoint(endpoint);
				let publicDossierSeed = "2FnY5WvjMFVVVfrChCxCem1n1L5195q8nfXie1VvaoBVhYrwizFgWLTGYbKhZLzVo2jVuExGCpBvwQReo6BVgrWXW8rsTYLC8KQSBRowfCrgn1kAwjJdwV";

				console.log("Loading wallet dossier...");
				edfs.loadRawDossier(walletSeed, (err, dossier) => {
					if (err) {
						console.trace(`error loading wallet dossier, err:`, err);
						return this.return(err);
					}
					
					walletDossier = dossier;
					
					console.log("Mounting public dossier to /public...");
					walletDossier.mount("/public", publicDossierSeed, {}, (err) => {
						if (err) {
							console.trace(`error mounting public dossier, err:`, err);
							return self.return(err);
						}
						console.log("Mounted /public dossier");
					});
					
				});
			} else {
				console.log("Error: wallet dossier seed is not available.");
			}
		});		
	}
		
})

},{"edfs":false}],"/home/alex/master/pcd/hw4/web-wallet/file-share/builds/tmp/domain_intermediar.js":[function(require,module,exports){
(function (global){
global.domainLoadModules = function(){ 

	if(typeof $$.__runtimeModules["./../../domain"] === "undefined"){
		$$.__runtimeModules["./../../domain"] = require("./../../domain");
	}
};
if (true) {
	domainLoadModules();
}
global.domainRequire = require;
if (typeof $$ !== "undefined") {
	$$.requireBundle("domain");
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../domain":"./../../domain"}]},{},["/home/alex/master/pcd/hw4/web-wallet/file-share/builds/tmp/domain_intermediar.js"])