//Add specific code here (swarms, flows, assets, transactions)

$$.swarms.describe("Echo", {
    say: function(input){
        this.return(null, "Echo: "+ input);
    }
});
