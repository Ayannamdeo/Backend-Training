const path = require("path");
const argv = process.argv.slice(2);
const defaultFolder = "./Assignment-1";
const defaultFile = "index.js";

const folder = argv[0] || defaultFolder;
const file = argv[1] || defaultFile;

// const scriptPath = "./assignments"+path.join(folder, file);
const scriptPath = "./project/dist/";

require(scriptPath);

