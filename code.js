const { Client, GatewayIntentBits, Collection, ActivityType, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [
    Partials.Channel, Partials.Message
  ]
  });

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
  if (interaction.isButton()){
    const dm_del_msg = new EmbedBuilder()
  .addFields(
    {
      name: "メッセージを削除しました。",
      value: ` `,
      inline: true
    },
    )
  .setColor("#855DD7");
    
    try{
    const dm_del_chan = await interaction.client.channels.fetch(process.env.DM_ID);
    const dm_del_msg = await dm_del_chan.messages.fetch(interaction.customId);
    dm_del_msg.delete();
    const dm_from_id = interaction.message.id;
    const dm_from_ch_id = interaction.channelId;
    const dm_from_chdel = await interaction.client.channels.fetch(dm_from_ch_id);
    const dm_from_del = await dm_from_chdel.messages.fetch(dm_from_id);
    await interaction.reply("削除しました。")
    dm_from_del.delete();
    } catch (error) {
      await interaction.reply("エラーが発生しました。\n既に削除されている可能性があります。")
      console.error(error)}
  }
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
  if (message.channel.type === 1 && !message.author.bot) {
    const dm_user = message.author.id;
    const dm_msg = message.content;
    const dm_id = message.id;
    try {
          const sent_msg = await client.users.cache.get(process.env.My_ID).send(`From <@${dm_user}>(${dm_user})\n「**${dm_msg}**」`);
          global.msg_id = sent_msg.id; 
        } catch (error) {
            await message.channel.send("メッセージの送信中にエラーが発生しました。\n定期再起動中またはメッセージが長すぎる可能性があります。");
            console.error('メッセージの送信中にエラーが発生しました:\n', error);
          return;
        }
    const Button = new ButtonBuilder()
		.setCustomId(`${global.msg_id}`)
		.setStyle(ButtonStyle.Primary)
		.setLabel("削除する")
		.setEmoji("🗑️");
    
    const dm_emb = new EmbedBuilder()
  .addFields(
    {
      name: " ",
      value: `<@${process.env.My_ID}> に\n「**${dm_msg}**」\nを送信しました。\n取り消す場合は下のボタンを押してください。`,
      inline: true
    },
    )
  .setColor("#855DD7");
    
        try {
            await message.reply({ embeds: [dm_emb], components: [new ActionRowBuilder().setComponents(Button)]});
        } catch (error) {
            console.error('メッセージの返信中にエラーが発生しました:\n', error);
        }
    }
    if (!message.content.startsWith('!')) return
    if (message.channel.id === "1215637785873227887"){
    if (message.content === '!setting') {
       const setting_status = await message.channel.messages.fetch("1253986110787555338");
       const setting_stats = await message.channel.messages.fetch("1253986139065421884");
       const setting_rank = await message.channel.messages.fetch("1253986159487619133");
       const setting_explore = await message.channel.messages.fetch("1253986178538012714");
       const setting_info = await message.channel.messages.fetch("1253986198633058365");
       const setting_ping = await message.channel.messages.fetch("1253986215976505344");
       const setting_search = await message.channel.messages.fetch("1253986237698543646");
       const reply = await message.reply("設定が完了しました。");
       const delset = await message.channel.messages.fetch({after : "1215672856076222505"});
       //message.channel.bulkDelete();      
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
      if (setting_search.content.split("\n")[1].match(/@/)){
        const setting_search_main = setting_search.content.split("\n")[1];
        global.search = setting_search_main.slice(0, -1);
      }else if (setting_search.content.split("\n")[2].match(/@/)){
        const setting_search_main = setting_search.content.split("\n")[2];
        global.search = setting_search_main.slice(0, -1);
      }
      }}
    });

client.login(token);
