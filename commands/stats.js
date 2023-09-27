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

        var username = interaction.options.getString('username');     
    const thumbnail = interaction.client.user.displayAvatarURL();
      const username_2 = username;
      
       const url = `https://scratchdb.lefty.one/v3/user/info/${username}/`;

  try {
    // ユーザー情報を取得するリクエストを送信
    const response = await fetch(url);

    // レスポンスをJSONに変換
    const json = await response.json();

    // ユーザー情報が存在しなければエラーメッセージを返す
    if (json.error) {
      interaction.reply({content: `Scratchのユーザー「${username_2}」は存在しません。`, ephemeral: true });
      return;
    }

    // ユーザー情報から必要なデータを取得
    const id = json.id;
    const username = json.username;
    var followers = json.statistics.followers;
    var following = json.statistics.following;
    var comments = json.statistics.comments;
    var loves = json.statistics.loves;
    var favorites = json.statistics.favorites;
    var views = json.statistics.views;
    var status = json.status;
    var country = json.country;
    var joined = json.joined;
    console.log(`Username:${username}\nID:${id}\nFollowerCount:${followers}\nFollowingCount:${following}\nComenntCount:${comments}\nLoves:${loves}\nFavorites:${favorites}\nViews:${views}\nStatus:${status}\nCountry:${country}\njoined:${joined}`)
    
    if(!followers){
      var followers = "0";
    } 
    if(!following){
      var following = "0";
    } 
    if(!comments){
      var comments = "0";
    } 
    if(!loves){
      var loves = "0";
    } 
    if(!favorites){
      var favorites = "0";
    } 
    if(!views){
      var views = "0";
    } 
    var joined = joined.substr(0, joined.indexOf('T'));
    
    const embed = new EmbedBuilder()
    .setTitle(username)
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
      name: "Joined",
      value: `${joined}`,
      inline: true
    },
    {
      name: "Followers Count",
      value: `${followers}`,
      inline: true
    },
    {
      name: "Followings Count",
      value: `${following}`,
      inline: true
    },
    {
      name: "Messages Count",
      value: `${comments}`,
      inline: true
    },
    {
      name: "Stars",
      value: `${favorites}`,
      inline: true
    },
    {
      name: "Hearts",
      value: `${loves}`,
      inline: true
    },
    {
      name: "Views",
      value: `${views}`,
      inline: true
    },
  )
 .setThumbnail(`https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`)
  .setColor("#855DD7")
  .setFooter({
    text: "Made by Scratch Stats Bot",
    iconURL: thumbnail,
  })
  .setTimestamp();
		await interaction.reply({ embeds: [embed]})

        } catch (error) {
    // エラーが発生したらコンソールに出力
    console.error(error);

    // エラーメッセージを返信
    await interaction.reply({content:'ScratchStatsAPIからユーザー情報を取得できませんでした', ephemeral: true});
  }
},

}
