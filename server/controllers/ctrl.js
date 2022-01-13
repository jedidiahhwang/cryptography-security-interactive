const bcrypt = require("bcrypt");
const chats = [];

module.exports = {
    createMessage: (req, res) => {


        console.log(req.body);
        const {pin, message} = req.body;

        for(let i = 0; i < chats.length; i++) {
            const existingPin = bcrypt.compareSync(pin, chats[i].pinHash);

            if(existingPin) {
                chats[i].messages.push(message);
                
                let securedMessage = {...chats[i]};

                delete securedMessage.pinHash;

                res.status(200).send(securedMessage);
                return;
            }
        }

        const salt = bcrypt.genSaltSync(5);
        console.log(salt);
        const pinHash = bcrypt.hashSync(pin, salt);
        console.log(pinHash);

        let chatObj = {
            pinHash, // pinHash: pinHash
            messages: [message]
        }

        chats.push(chatObj);

        let securedMessage = {...chatObj};
        delete securedMessage.pinHash;
        res.status(200).send(securedMessage);
        console.log(chats);
    }
}