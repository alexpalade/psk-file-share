export default class ListModel {

    constructor() {
        this.data = {}
    }

    /**
    * Fetch data from EDFS and populate the view model
    */
    hydrate(model) {}

    /**
    * Save the model to EDFS
    */
    save(data) {}


    /**
    * Return a copy of the data
    */
    toJSON() {
        return JSON.parse(JSON.stringify(this.data));
    }
    
    

}
