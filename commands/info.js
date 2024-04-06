const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('see the information of scratch stats bot'),

  async execute(interaction) {

    const thumbnail = interaction.client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setTitle("Scratch Stats Bot ver.2.3")
      .setURL(`https://github.com/hr951/Scratch-Stats-Bot`)
      .addFields(
        {
          name: "Status",
          value: `${global.status}`,
          inline: false
        },
        {
          name: "stats",
          value: `${global.stats}`,
          inline: true
        },
        {
          name: "rank",
          value: `${global.rank}`,
          inline: true
        },
        {
          name: "explore",
          value: `${global.explore}`,
          inline: true
        },
        {
          name: "info",
          value: `${global.info}`,
          inline: true
        },
        {
          name: "ping",
          value: `${global.ping}`,
          inline: true
        },
      )
      .setColor("#855DD7")
      .setFooter({
        text: "Made by Scratch Stats Bot",
        iconURL: thumbnail,
      })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] })
  }
}
