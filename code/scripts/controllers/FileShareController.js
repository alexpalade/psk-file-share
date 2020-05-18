import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import FileShareModel from "./../models/FileShareModel.js";

export default class FileShareController extends ContainerController {
    constructor(element) {
        super(element);
        this.fileShareModel = new FileShareModel();

        // Set some default values for the view model
        this.model = this.setModel(this.fileShareModel.toJSON());

        // Fetch data from EDFS and populate the view model
        //this.model.hydrate(this.model);

        // Echo!
        this.on('echo', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("attempting to create Dossier!");
            this.createDossier();
        })

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
}

