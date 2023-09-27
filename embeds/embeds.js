const Discord = require('discord.js');
const ENV = process.env;

const github = 'https://github.com/hr951/Music-Bot';
const bot_version = "1.3.2"

const bot_name = "Scratch Stats Bot";
const color = "#a257ff";


module.exports = {
    Embed_ping: function (ping1, ping2) {
        const Embed_ping = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription(`片道のPing : **${ping1}**ms\n往復のPing : **${ping2}**ms`)
        return Embed_ping;
    }
}
