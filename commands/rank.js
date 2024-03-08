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
      var status = json.status;
      if(json.statistics){
      var love = json.statistics.ranks.country.loves;
      var favorite = json.statistics.ranks.country.favorites;
      var follower = json.statistics.ranks.country.followers;
      var following = json.statistics.ranks.country.following;
      var views = json.statistics.ranks.country.views;
      var comment = json.statistics.ranks.country.comments;
      var love_rank = json.statistics.ranks.loves;
      var favorite_rank = json.statistics.ranks.favorites;
      var follower_rank = json.statistics.ranks.followers;
      var following_rank = json.statistics.ranks.following;
      var views_rank = json.statistics.ranks.views;
      var comment_rank = json.statistics.ranks.comments;
      }
      if ( status === "New Scratcher" ){
        var love = "Not Found";
        var favorite =  "Not Found";
        var follower =  "Not Found";
        var following =  "Not Found";
        var views =  "Not Found";
        var comment =  "Not Found";
        var love_rank =  "Not Found";
        var favorite_rank =  "Not Found";
        var follower_rank =  "Not Found";
        var following_rank =  "Not Found";
        var views_rank =  "Not Found";
        var comment_rank =  "Not Found";
        console.log(status)
      }

      // 数値を序数形式に変換する関数
      function ordinal(n) {
        // 整数でない場合はエラーを返す
        if (!Number.isInteger(n)) {
          return "Not Found";
        }
        // 末尾の数字
        let lastDigit = n % 10;
        // 末尾から2桁目の数字
        let secondLastDigit = Math.floor(n / 10) % 10;
        // 末尾が1,2,3以外はth
        if (lastDigit > 3 || lastDigit === 0 || secondLastDigit === 1) {
          return n + "th";
        }
        // 末尾が1はst
        if (lastDigit === 1) {
          return n + "st";
        }
        // 末尾が2はnd
        if (lastDigit === 2) {
          return n + "nd";
        }
        // 末尾が3はrd
        if (lastDigit === 3) {
          return n + "rd";
        }
      }
      
    var love = ordinal(love);
    var favorite = ordinal(favorite);
    var follower = ordinal(follower);
    var following = ordinal(following);
    var views = ordinal(views);
    var comment = ordinal(comment);
    var love_rank = ordinal(love_rank);
    var favorite_rank = ordinal(favorite_rank);
    var follower_rank = ordinal(follower_rank);
    var following_rank = ordinal(following_rank);
    var views_rank = ordinal(views_rank);
    var comment_rank = ordinal(comment_rank);
    



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
            value: `${follower}`,
            inline: true
          },
          {
            name: "Following Rank",
            value: `${following}`,
            inline: true
          },
          {
            name: "Comment Rank",
            value: `${comment}`,
            inline: true
          },
          {
            name: "Love Rank",
            value: `${love}`,
            inline: true
          },
          {
            name: "Star Rank",
            value: `${favorite}`,
            inline: true
          },
          {
            name: "View Rank",
            value: `${views}`,
            inline: true
          },
          {
            name: `**Global Rank**`,
            value: " ",
            inline: false
          },
          {
            name: "Follower Rank",
            value: `${follower_rank}`,
            inline: true
          },
          {
            name: "Following Rank",
            value: `${following_rank}`,
            inline: true
          },
          {
            name: "Comment Rank",
            value: `${comment_rank}`,
            inline: true
          },
          {
            name: "Love Rank",
            value: `${love_rank}`,
            inline: true
          },
          {
            name: "Star Rank",
            value: `${favorite_rank}`,
            inline: true
          },
          {
            name: "View Rank",
            value: `${views_rank}`,
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

      const response = await fetch(url);
      const json = await response.json();
      const status = json.status;
      
      if(status !== "New Scratcher"){
      // エラーメッセージを返信
      await interaction.reply({ content: 'ScratchStatsAPIからRankを取得できませんでした。', ephemeral: true });
      }else{
        await interaction.reply({ content: 'New ScratcherのRankは取得できません。', ephemeral: true });
      }
    }
  },

}
