const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('see the rank of scratch users')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('write a username')
        .setRequired(true)
    ),

  async execute(interaction) {

    var username = interaction.options.getString('username');
    const thumbnail = interaction.client.user.displayAvatarURL();
    const username_2 = username;

    const url = `https://scratchdb.lefty.one/v3/user/info/${username}/`;

    try {
      // ユーザー情報を取得するリクエストを送信
      const response = await fetch(url);
      const json = await response.json();
      // ユーザー情報が存在しなければエラーメッセージを返す
      if (json.error) {
        interaction.reply({ content: `Scratchのユーザー「${username_2}」は存在しません。`, ephemeral: true });
        return;
      }

      // ユーザー情報から必要なデータを取得
      const id = json.id;
      const username = json.username;
      var country = json.country;
      const love = json.statistics.ranks.country.loves;
      const favorite = json.statistics.ranks.country.favorites;
      const follower = json.statistics.ranks.country.followers;
      const following = json.statistics.ranks.country.following;
      const views = json.statistics.ranks.country.views;
      const comment = json.statistics.ranks.country.comments;
      const love_rank = json.statistics.ranks.loves;
      const favorite_rank = json.statistics.ranks.favorites;
      const follower_rank = json.statistics.ranks.followers;
      const following_rank = json.statistics.ranks.following;
      const views_rank = json.statistics.ranks.views;
      const comment_rank = json.statistics.ranks.comments;


      const embed = new EmbedBuilder()
        .setTitle(`${username}'s Rank`)
        .setURL(`https://scratch.mit.edu/users/${username}`)
        .addFields(
          {
            name: `**${country} Rank**`,
            value: " ",
            inline: false
          },
          {
            name: "Follower Rank",
            value: `${follower}th`,
            inline: true
          },
          {
            name: "Following Rank",
            value: `${following}th`,
            inline: true
          },
          {
            name: "Comment Rank",
            value: `${comment}th`,
            inline: true
          },
          {
            name: "Love Rank",
            value: `${love}th`,
            inline: true
          },
          {
            name: "Star Rank",
            value: `${favorite}th`,
            inline: true
          },
          {
            name: "View Rank",
            value: `${views}th`,
            inline: true
          },
          {
            name: `**Global Rank**`,
            value: " ",
            inline: false
          },
          {
            name: "Follower Rank",
            value: `${follower_rank}th`,
            inline: true
          },
          {
            name: "Following Rank",
            value: `${following_rank}th`,
            inline: true
          },
          {
            name: "Comment Rank",
            value: `${comment_rank}th`,
            inline: true
          },
          {
            name: "Love Rank",
            value: `${love_rank}th`,
            inline: true
          },
          {
            name: "Star Rank",
            value: `${favorite_rank}th`,
            inline: true
          },
          {
            name: "View Rank",
            value: `${views_rank}th`,
            inline: true
          },
        )
        .setThumbnail(`https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`)
        //.setImage(`https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`)
        .setColor("#855DD7")
        .setFooter({
          text: "Made by Scratch Stats Bot",
          iconURL: thumbnail,
        })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] })

    } catch (error) {
      // エラーが発生したらコンソールに出力
      console.error(error);

      // エラーメッセージを返信
      await interaction.reply({ content: 'ScratchStatsAPIからユーザー情報を取得できませんでした', ephemeral: true });
    }
  },

}
