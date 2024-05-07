import { Request, Response } from 'express';
import userData from '../utils/MOCK_DATA.json';
import fs from 'fs';

async function handleGetUsers(req: Request, res: Response): Promise<Response> {
    const html = `
    <ul>
    ${userData.map((user: any) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    return res.send(html);
}

async function handleCreateUser(req: Request, res: Response): Promise<Response> {
    const newUser = req.body;
    console.log(newUser);
    userData.push({ id: userData.length + 1, ...newUser });
    fs.writeFile("./assignments/Assignment4/src/utils/MOCK_DATA.json", JSON.stringify(userData), (err) => {
        if (err) console.log("error while reading to file: ", err);
        else console.log("successfully updated MOCK_DATA");
    });

    return res.json(userData[userData.length - 1]);
}

export {
    handleGetUsers,
    handleCreateUser,
};

