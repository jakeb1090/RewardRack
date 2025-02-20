const fs = require('fs');
const path = require('path');

// ...existing code...

// New JSON file read
const filePath = path.join(__dirname, 'resource', 'data.json');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const jsonData = JSON.parse(data);
    // ...existing code...
});

// ...existing code...
