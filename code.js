const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ]});

const token = process.env['DISCORD_BOT_TOKEN']

client.on('ready', () => {
  client.channels.cache.get("1215637785873227887").send("!setting")
  var now_unix = new Date().getTime();
  const unix_12 = now_unix + 12 * 3600 * 1000;
  const unix = String(unix_12).slice(0,-3);
  global.unix = unix;
  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: `/info | ${client.guilds.cache.size}サーバー | ${client.ws.ping}ms`,
          type: ActivityType.Playing
        }
      ],
      status: `${global.online_status}`//online : いつもの, dnd : 赤い奴, idle : 月のやつ, invisible : 表示なし
    });
  }, 1000)
})

//ここから

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`${filePath} に必要な "data" か "execute" がありません。`);
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`${interaction.commandName} が見つかりません。`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'error', ephemeral: true });
  }
});


client.on('messageCreate', async message => {
    if (!message.content.startsWith('!')) return
    if (message.channel.id === "1215637785873227887"){
    if (message.content === '!setting') {
       const setting_status = await message.channel.messages.fetch("1215638473482960926");
       const setting_stats = await message.channel.messages.fetch("1215639736169922560");
       const setting_rank = await message.channel.messages.fetch("1215639808609751050");
       const setting_explore = await message.channel.messages.fetch("1215639888473489429");
       const setting_info = await message.channel.messages.fetch("1215639920694009916");
       const setting_ping = await message.channel.messages.fetch("1215639950461243412");
       const reply = await message.reply("設定が完了しました。");
       const delset = await message.channel.messages.fetch({after : "1215672856076222505"});
       //message.channel.bulkDelete(delset);      
      setTimeout(() => {
        message.delete();
        reply.delete();
      },2000);
      if (setting_status.content.split("\n")[1].match(/@/)){
        const setting_status_main = setting_status.content.split("\n")[1];
        global.status = setting_status_main.slice(0, -1);
        global.online_status = "online";
      }else if (setting_status.content.split("\n")[2].match(/@/)){
        const setting_status_main = setting_status.content.split("\n")[2];
        global.status = setting_status_main.slice(0, -1);
        global.online_status = "dnd";
      }else if (setting_status.content.split("\n")[3].match(/@/)){
        const setting_status_main = setting_status.content.split("\n")[3];
        global.status = setting_status_main.slice(0, -1);
        global.online_status = "dnd";
      }else if (setting_status.content.split("\n")[4].match(/@/)){
        const setting_status_main = setting_status.content.split("\n")[4];
        global.status = setting_status_main.slice(0, -1);
        global.online_status = "dnd";
      }else if (setting_status.content.split("\n")[5].match(/@/)){
        const setting_status_main = setting_status.content.split("\n")[5];
        global.status = setting_status_main.slice(0, -1);
        global.online_status = "dnd";
      }
      if (setting_stats.content.split("\n")[1].match(/@/)){
        const setting_stats_main = setting_stats.content.split("\n")[1];
        global.stats = setting_stats_main.slice(0, -1);
      }else if (setting_stats.content.split("\n")[2].match(/@/)){
        const setting_stats_main = setting_stats.content.split("\n")[2];
        global.stats = setting_stats_main.slice(0, -1);
      }
      if (setting_rank.content.split("\n")[1].match(/@/)){
        const setting_rank_main = setting_rank.content.split("\n")[1];
        global.project = setting_rank_main.slice(0, -1);
      }else if (setting_rank.content.split("\n")[2].match(/@/)){
        const setting_rank_main = setting_rank.content.split("\n")[2];
        global.project = setting_rank_main.slice(0, -1);
      }
      if (setting_explore.content.split("\n")[1].match(/@/)){
        const setting_explore_main = setting_explore.content.split("\n")[1];
        global.explore = setting_explore_main.slice(0, -1);
      }else if (setting_explore.content.split("\n")[2].match(/@/)){
        const setting_explore_main = setting_explore.content.split("\n")[2];
        global.explore = setting_explore_main.slice(0, -1);
      }
      if (setting_info.content.split("\n")[1].match(/@/)){
        const setting_info_main = setting_info.content.split("\n")[1];
        global.info = setting_info_main.slice(0, -1);
      }else if (setting_info.content.split("\n")[2].match(/@/)){
        const setting_info_main = setting_info.content.split("\n")[2];
        global.info = setting_info_main.slice(0, -1);
      }
      if (setting_ping.content.split("\n")[1].match(/@/)){
        const setting_ping_main = setting_ping.content.split("\n")[1];
        global.ping = setting_ping_main.slice(0, -1);
      }else if (setting_ping.content.split("\n")[2].match(/@/)){
        const setting_ping_main = setting_ping.content.split("\n")[2];
        global.ping = setting_ping_main.slice(0, -1);
      }
      }}
    });

client.login(token);
