const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('see the information of scratch stats bot'),

  async execute(interaction) {
    
    const thumbnail = interaction.client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setTitle("Scratch Stats Bot ver.6.8")
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
          name: "project",
          value: `${global.project}`,
          inline: true
        },
        {
          name: "explore",
          value: `${global.explore}`,
          inline: true
        },
        {
          name: "search",
          value: `${global.search}`,
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
        
        {
          name: " ",
          value: `定期再起動予定時刻：<t:${global.unix}>`,
          inline: false
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
