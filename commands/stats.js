const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('see the information of scratch users')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('write a username')
        .setRequired(true)
    ),

  async execute(interaction) {

    const username = interaction.options.getString('username');
    const thumbnail = interaction.client.user.displayAvatarURL();
    const username_2 = username;
    var count_stats = 0;
    var views = 0;
    var stars = 0;
    var hearts = 0;
    var projects = 0;
    var count_project = 0;
    var count_follower = 0;
    var followers = 0;
    var count_following = 0;
    var followings = 0;

    const url_2 = `https://scratchdb.lefty.one/v3/user/info/${username}/`;

    try {
      
      const response_2 = await fetch(url_2);
      const json_2 = await response_2.json();
      if (json_2.error) {
        interaction.reply({ content: `Scratchのユーザー「${username_2}」は存在しません。`, ephemeral: true });
        return;
      }else{
         interaction.reply("Now Loading...")
      }
      
      do{        
      const url = `https://api.scratch.mit.edu/users/${username_2}/following/?limit=40&offset=${count_following}`;
      
      const response = await fetch(url);
      const json = await response.json();
      count_following = 40 + count_following;
      var followings = json.length + followings;
      global.json_length = json.length;
      } while (global.json_length > 0);
      
      do{
      const url_3 = `https://api.scratch.mit.edu/users/${username_2}/followers/?limit=40&offset=${count_follower}`;

      const response_3 = await fetch(url_3);
      const json_3 = await response_3.json();
        count_follower = 40 + count_follower;
      var followers = json_3.length + followers;
      global.json_3_length = json_3.length;
      } while (global.json_3_length > 0);
      
      do{
      const url_4 = `https://api.scratch.mit.edu/users/${username_2}/projects?limit=40&offset=${count_project}`;
        count_stats = 0;
      
      const response_4 = await fetch(url_4);
      const json_4 = await response_4.json();
      for(let i = 0; i < json_4.length ; i++) {
      var views = json_4[count_stats].stats.views + views;
      var stars = json_4[count_stats].stats.favorites + stars;
      var hearts = json_4[count_stats].stats.loves + hearts;
        count_stats ++;
      }
      count_project = 40 + count_project;
      var projects = json_4.length + projects;
      global.json_4_length = json_4.length;
      } while (global.json_4_length > 0);

      // ユーザー情報から必要なデータを取得
      const id = json_2.id;
      const username = json_2.username;
      var status = json_2.status;
      var country = json_2.country;
      var joined = json_2.joined;

      if (!followers) {
        var followers = "Not Found";
      }
      if (!followings) {
        var followings = "Not Found";
      }
      if (!projects) {
        var projects = "Not Found";
      }
      if (!hearts) {
        var hearts = "Not Found";
      }
      if (!stars) {
        var favorites = "Not Found";
      }
      if (!views) {
        var views = "Not Found";
      }
      var joined = joined.substr(0, joined.indexOf('T'));

      const embed = new EmbedBuilder()
        .setTitle(`${username}'s Stats`)
        .setURL(`https://scratch.mit.edu/users/${username}`)
        .addFields(
          {
            name: "Status",
            value: `${status}`,
            inline: true
          },
          {
            name: "Country",
            value: `${country}`,
            inline: true
          },
          {
            name: "Joined (Y/M/D)",
            value: `${joined}`,
            inline: true
          },
          {
            name: "Follower Count",
            value: `${followers}`,
            inline: true
          },
          {
            name: "Following Count",
            value: `${followings}`,
            inline: true
          },
          {
            name: "Project Count",
            value: `${projects}`,
            inline: true
          },
          {
            name: "Stars",
            value: `${stars}`,
            inline: true
          },
          {
            name: "Hearts",
            value: `${hearts}`,
            inline: true
          },
          {
            name: "Views",
            value: `${views}`,
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
      await interaction.editReply("Loading Completed !")
      await interaction.editReply({ embeds: [embed] })

    } catch (error) {
      // エラーが発生したらコンソールに出力
      console.error(error);

      // エラーメッセージを返信
      await interaction.reply({ content: 'ScratchStatsAPIからユーザー情報を取得できませんでした', ephemeral: true });
    }
  },

}
