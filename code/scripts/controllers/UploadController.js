// Controller
import BindableController from "./base-controllers/BindableController.js";

export default class UploadController extends BindableController {
    constructor(element) {
        super(element);

        this.files = null; // Will be set by the "files-selected" event handler

        this.on('files-selected', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this._listSelectedFiles(e.data);
        })

        this.on('upload-single-file', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this._uploadSingleFile();
        });

        this.on('download', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("HELLO!");
            this._downloadSingleFile();
        });
    }


    /**
     * Show the list of selected files
     * @param {Array} files
     */
    _listSelectedFiles(files) {
        // Render the list of files
        const filesList = this._element.querySelector('#files-for-upload');

        for (const f of files) {
            const listItem = document.createElement('li');
            listItem.innerText = f.name;

            filesList.appendChild(listItem);
        }

        // Store a reference to the files
        this.files = files;
    }

    /**
     * Upload a file using the request body method
     */
    _uploadSingleFile() {
        const file = this.files.shift(); // Get the first file from the array

        // Upload endpoint
        const url = '/upload?path=/data/uploads&filename=image.jpg&maxSize=16m&allowedTypes=image/jpeg,image/png,image/gif'

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

    _defaultDownloadCallback = (downloadedFile) => {
        window.URL = window.URL || window.webkitURL;
        let blob = downloadedFile.rawBlob;

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            const file = new File([blob], this.fileName);
            window.navigator.msSaveOrOpenBlob(file);
            return;
        }

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.fileName;
        link.click();
    }

    _downloadSingleFile() {
        const url = '/download/data/uploads/image.jpg'
        this._getFileBlob('/data/uploads', 'image.jpg',
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
                        });
                    });
                } else {
                    console.error(`Error on download file ${path}/${fileName}: `, response);
                }
            });
    }
}
