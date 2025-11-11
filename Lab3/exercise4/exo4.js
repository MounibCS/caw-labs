const fs = require('fs');

const fileName = process.argv[2]; 
const fileContent = process.argv[3]; 

fs.writeFileSync(fileName, fileContent);

console.log("The file has been saved!");

const savedContent = fs.readFileSync(fileName, 'utf8');

console.log(`> cat ${fileName}`);
console.log(savedContent);