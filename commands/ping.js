const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embeds/embeds')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get Ping'),
	async execute(interaction) {
		await interaction.reply({ embeds: [embed.Embed_ping(interaction.client.ws.ping, '...')], allowedMentions: { repliedUser: false } })
    let msg = await interaction.fetchReply();
		await interaction.editReply({ embeds: [embed.Embed_ping(interaction.client.ws.ping, msg.createdTimestamp - interaction.createdTimestamp)]});
	},
};
