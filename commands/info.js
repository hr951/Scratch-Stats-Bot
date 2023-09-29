const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('see the information of scratch stats bot'),

    async execute(interaction) {

    const thumbnail = interaction.client.user.displayAvatarURL();
    
    const embed = new EmbedBuilder()
    .setTitle("お知らせ / Info")
  .setURL(`https://github.com/hr951/Scratch-Stats-Bot`)
  .addFields(
    {
      name: "Status",
      value: "⭕Botは正常に稼働しています。",
      //value: "🔄Botはメンテナンス中です。",
      //value: "🔄ScratchStatsAPIの更新に対応中です。",
      //value: ":warning:一部使用できないコマンドがあります。",
      inline: false
    },
    {
      name: "stats",
      value: "⭕このコマンドは使用可能です。",
      //value: "❌このコマンドは使用不可です。",
      inline: true
    },
    /*{
      name: "rank",
      //value: "⭕このコマンドは使用可能です。",
      value: "❌このコマンドは使用不可です。",
      inline: true
    },*/
    {
      name: "info",
      value: "⭕このコマンドは使用可能です。",
      //value: "❌このコマンドは使用不可です。",
      inline: true
    },
    {
      name: "ping",
      value: "⭕このコマンドは使用可能です。",
      //value: "❌このコマンドは使用不可です。",
      inline: true
    },
  )
  .setColor("#855DD7")
  .setFooter({
    text: "Made by Scratch Stats Bot",
    iconURL: thumbnail,
  })
  .setTimestamp();
		await interaction.reply({ embeds: [embed]})
  }
}
