const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    // Read file name inside the derictory
    const files = fs.readdirSync(directory, {withFileTypes: true});
    for(const file of files) {
        const filepath = path.join(directory, file.name);

        // Only push folder name
        if(foldersOnly) {
            if(file.isDirectory()){
                fileNames.push(filepath);
            }
        } 
        // Only push file name
        else {
            if(file.isFile()){
                fileNames.push(filepath);
            }
        }
    }

    return fileNames;
};