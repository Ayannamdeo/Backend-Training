const userData = require('../utils/MOCK_DATA.json');
const fs = require('fs');

async function handleGetUsers(req, res){
    const html = `
    <ul>
    ${userData.map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html);
}

async function handleCreateUser(req, res){
    const newUser = req.body;
    console.log(newUser);
    userData.push({id:userData.length+1, ...newUser});
    fs.writeFile("./assignments/Assignment4/src/utils/MOCK_DATA.json", JSON.stringify(userData), (err, data)=> {
        if (err) console.log("error while reading to file: ", err);
        else console.log("successfully updated MOCK_DATA");
    });

    return res.json(userData[userData.length-1]);
}

module.exports = {
    handleGetUsers,
    handleCreateUser,
}
