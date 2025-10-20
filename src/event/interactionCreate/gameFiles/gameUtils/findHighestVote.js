const vote = require("../vote");

module.exports = (voteResult) => {
    let countSame = 0;
    let highest = {
        id: "dummy",
        voteNum: 0
    };

    for(let id in voteResult.voteID){
        if(voteResult.voteID[id] > highest.voteNum){
            highest.id = id;
            highest.voteNum = voteResult.voteID[id];
        }
        else if(voteResult[id] == highest.voteNum){
            countSame = 1;
        }
    }

    if(countSame === 1 || voteResult.crewID.length === 0){
        return null;
    }
    else{
        return highest.id;
    }
}