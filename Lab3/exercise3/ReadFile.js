const fs = require('fs');

const filePath = process.argv[2]; 

if (!filePath) {
    process.exit(1);
}

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log(fileContent);

} catch (err) {
    process.exit(1);
}