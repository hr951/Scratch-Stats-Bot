const {Client, GatewayIntentBits, Collection} = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log("Bot準備完了！");
  setInterval(() => {
        client.user.setActivity({
          //name: `再起動しています。少々お待ちください。`
          name: `メンテナンス中です。動作が不安定になる場合があります。ご了承ください。`
          //name: `/stats | ${client.guilds.cache.size}サーバー | ${client.ws.ping}ms`
        })
    }, 1000)
});

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

client.login(process.env.DISCORD_BOT_TOKEN);
