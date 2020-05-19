import BindableController from "./base-controllers/BindableController.js";

export default class FileShareController extends BindableController {
	        
	viewModel = {
		selectedFile: {
			name: "",
			size: "",
			type: "",
		},
		files: []
	};
	
    constructor(element) {
        super(element);

        this.files = null; // Will be set by the "files-selected" event handler
		this.model = this.setModel(this.viewModel);
		this.rootSeed = parent.parent.APP_CONFIG.WALLET_SEED;
		
		let uploadFileInfo = element.querySelector("#upload-file-info");
		if (uploadFileInfo) {
			uploadFileInfo.style.display = 'none';
		}
		
		this._getFiles();

        this.on('refresh-files', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("Mount point seed: " + this.seed);
            this._getFiles();
		})
		
        this.on('files-selected', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            this.model.selectedFile = {}
			this.model.selectedFile.name = e.data[0].name;
			this.model.selectedFile.size = e.data[0].size;
			this.model.selectedFile.type = e.data[0].type;
			this.selectedFile = e.data[0];            
			
			let uploadFileInfo = this._element.querySelector("#upload-file-info");
			if (uploadFileInfo) {
				uploadFileInfo.style.display = 'block';
			}
			let uploadButton = this._element.querySelector("#upload-button");
			if (uploadButton) {
				uploadButton.setAttribute("button-class", uploadButton.getAttribute("button-class").replace("btn-success", "btn-secondary"))
			}

            //this._listSelectedFiles(e.data);
        })

        this.on('upload-single-file', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
			let uploadButton = this._element.querySelector("#upload-button");
			if (uploadButton) {
				uploadButton.setAttribute("button-class", uploadButton.getAttribute("button-class").replace("btn-success", "btn-secondary"))
			} else {
				console.log("no upload button");
			}
			this._uploadSingleFile();
        });

        this.on('download-file', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            let file = e.path[1].children[1].innerText;
            this._downloadSingleFile(file);
        });
        
		// Echo!
        this.on('echo', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("attempting to create Dossier!");
            this.createDossier();
        })
        
    }
    
    _getFiles() {
		if (!this.seed) {
			let endpoint = "http://localhost:8080";
			const EDFS = parent.parent.require("edfs");
			const edfs = EDFS.attachToEndpoint(endpoint);
			console.log("Controller: attempting to get mounted dossiers ...");
			let rootSeed = parent.parent.APP_CONFIG.WALLET_SEED;
			edfs.loadRawDossier(rootSeed, (err, dossier) => {
				if (err) {
					console.log("Error mounting root wallet");
					throw err;
				}
				
				dossier.listMountedDossiers("/", (err, list) => {
					console.log("Found " + list.length + " mount points.");
					list.forEach((dossier) => {
						if (dossier.path == "apps") {
							//console.log(dossier.identifier + " is app!");
							edfs.loadRawDossier(dossier.identifier, (err, mount) => {
								if (err) {
									console.log("Error mounting dossier.");
									throw err;
								}
								mount.listFiles("/app", (err, list) => {
									let index = list.indexOf("FILE_SHARE_APP");
									
									if (index !== -1) {
										console.log("Found file sharing app seed: " + mount.getSeed());
										this.seed = mount.getSeed();
										
										this._listFiles();
									}
								});
							});
						}
					});
				});
			});
		} else {
			this._listFiles();
		}
	}
		
    _listFiles() {
		if (this.seed) {
			let EDFS = parent.parent.require("edfs");
			let endpoint = "http://localhost:8080";
			let edfs = EDFS.attachToEndpoint(endpoint);
			
			console.log("Controller: attempting to get list of files...");
			edfs.loadRawDossier(this.seed, (err, dossier) => {
				if (err) {
					console.log("Error mounting wallet");
					throw err;
				}
				dossier.listFiles("/private", (err, list) => {
					console.log("Files: " + list);
					this.model.files = [];
					list.forEach((f) => {
						this.model.files.push({"name": {"label": f}});
					});
					
				});
			});
		}
	}

    _listSelectedFiles(files) {
		let uploadFileInfo = this._element.querySelector("#upload-file-info");
		if (uploadFileInfo) {
			uploadFileInfo.style.display = 'block';
		}

		let f = files[0];
		this.model.file = {
			name: f.name,
			size: f.size,
			type: f.type
		},
        // Store a reference to the files
        this.files = files;
    }
    
    _uploadSingleFile() {

        let file = this.selectedFile;

        // Upload endpoint
        const url = `/upload?path=/private/&filename=${file.name}&maxSize=16m`
        console.log(`File upload url: ${url}`);

        // Send the request
        fetch(url, {
            method: 'POST',
            body: file // pass the File object directly to the request body
        }).then((response) => {
            response.json().then((result) => {
                console.log(result);
                if (response.ok) {
                    console.log("Upload was successful!");
                } else {
                    console.log("Upload failed!");
                }

                // Success or file level validation error
                if (Array.isArray(result)) {
                    for (const item of result) {
                        if (item.error) {
                            console.error(`Unable to upload ${item.file.name} due to an error. Code: ${item.error.code}. Message: ${item.error.message}`);
                            continue;
                        }
                        console.log(`Uploaded ${item.file.name} to ${item.result.path}`);
						let uploadButton = this._element.querySelector("#upload-button");
						if (uploadButton) {
							uploadButton.setAttribute("button-class", uploadButton.getAttribute("button-class").replace("btn-secondary", "btn-success"))
						} else {
							console.log("no upload button");
						}
                    }
                    return;
                }

                // Validation error. Can happend when HTTP status is 400
                if (typeof result === 'object') {
                    console.error(`An error occured: ${result.message}. Code: ${result.code}`);
                    return;
                }

                // Error is a string. This happens when the HTTP status is 500
                console.error(`An error occured: ${result}`);
            })
        }).catch((err) => {
            console.error(err);
        })
    }


    _defaultDownloadCallback = (downloadedFile, fileName) => {
        window.URL = window.URL || window.webkitURL;
        let blob = downloadedFile.rawBlob;
        

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            const file = new File([blob], fileName);
            window.navigator.msSaveOrOpenBlob(file);
            return;
        }

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }

    _downloadSingleFile(file) {
		console.log(`Trying to download /private/${file}`);
        this._getFileBlob('/private', file,
                          this._defaultDownloadCallback);

    }
    _getFileBlob(path, fileName, callback) {
        let url = `/download${path}/${fileName}`;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.blob().then((blob) => {
                        callback({
                            contentType: response.headers.get('Content-Type') || '',
                            rawBlob: blob
                        }, fileName);
                    });
                } else {
                    console.error(`Error on download file ${path}/${fileName}: `, response);
                }
            });
    }
    
	createDossier() {
		
		const pskCommunicationNodeAddrs = ["http://localhost:8080/"];

		const se = require("swarm-engine");

		try {
			se.initialise();
		}	catch(err) {
			console.log(err.message);
		}
		
		const powerCord = new se.SmartRemoteChannelPowerCord(pskCommunicationNodeAddrs);
		$$.swarmEngine.plug("*", powerCord);

		$$.interactions.startSwarmAs("demo/agent/system", "DossierUtils", "newDossier", "Hello swarm world!")
			.onReturn((err, result)=>{
				  if(err){
					  throw err;
				  }
				  console.log("from swarm: " + result);
			});	
	}

    echo() {
        const pskCommunicationNodeAddrs = ["http://localhost:8080/"];
        const se = require("swarm-engine");
        se.initialise();
        const powerCord = new se.SmartRemoteChannelPowerCord(pskCommunicationNodeAddrs);
        $$.swarmEngine.plug("*", powerCord);

        $$.interactions.startSwarmAs("demo/agent/system", "Echo", "say", "Hello swarm world!")
          .onReturn((err, result)=>{
              if(err){
                  throw err;
              }
              console.log("from swarm: " + result);
          });
    }

    /*
	mountPublic() {
		console.log("Calling swarm...");
		const pskCommunicationNodeAddrs = ["http://localhost:8080/"];
		const se = require("swarm-engine");
		se.initialise();
		const powerCord = new se.SmartRemoteChannelPowerCord(pskCommunicationNodeAddrs);
		$$.swarmEngine.plug("*", powerCord);
		$$.interactions.startSwarmAs("demo/agent/system", "DossierUtils", "mountPublic", "Hello swarm world!")
			.onReturn((err, result)=>{
				if(err){
					throw err;
				}
				console.log(result);
			});
	}*/
}
