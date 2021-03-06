let time = new Date().getTime();
let Discord = require(`discord.js`);
let client = new Discord.Client({ disableMentions: `everyone` });
require(`dotenv`).config();
require(`./resources/cmd.js`)(client, time);
client.on(`ready`, async () => require(`./resources/src.js`).startup(client, time));
client.on(`message`, async message => require(`./resources/msg.js`)(message, new Date().getTime()));
client.on(`presenceUpdate`, async (oldMember, newMember) => client.src.status(oldMember, newMember));
process.on(`unhandledRejection`, async error => client.error(`Uncaught Promise Rejection ${error}`));
client.login(process.env.TOKEN);