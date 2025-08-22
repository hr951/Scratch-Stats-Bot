const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('project')
    .setDescription('see the project of scratch')
  　.addStringOption(option =>
      option.setName('id')
        .setDescription('write a id of project')
        .setRequired(true)
    ),

  async execute(interaction) {

    var id = interaction.options.getString('id');
    const thumbnail = interaction.client.user.displayAvatarURL();
    var id_2 = id;
    
    function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}
    
    const check = containsOnlyNumbers(id);
    
    if(check === false){
      const match = id_2.match(/projects\/(\d+)/);
    if (match) {
        var id_2 = match[1];
    } else {
        interaction.reply({ content: `Error\nError code : URLが正しくありません。\nURLを確かめてください。`, ephemeral: true });
        return;
    }}

    const url = `https://api.scratch.mit.edu/projects/${id_2}`;

    try {
      // ユーザー情報を取得するリクエストを送信
      const response = await fetch(url);
      const json = await response.json();
      if (json.code === "NotFound") {
        interaction.reply({ content: `Scratchのプロジェクト「${id_2}」は存在しません。`, ephemeral: true });
        return;
      }

      // ユーザー情報から必要なデータを取得
      const title = json.title;
      const username = json.author.username;
      var create = json.history.created;
      var modify = json.history.modified;
      var share = json.history.shared;
      var view = json.stats.views;
      var heart = json.stats.loves;
      var star = json.stats.favorites;
      var remix = json.stats.remixes;
      var root = json.remix.root;
      var parent = json.remix.parent;
      
      function unixtodate(UTC) {
    const unix = Date.parse(UTC) / 1000 + 9 * 3600
    const date = new Date(unix * 1000); // UNIXタイムスタンプをミリ秒単位で指定
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1する
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // フォーマット化した日時を返す
    return `${year}/${month}/${day}\n${hours}:${minutes}:${seconds}`;
    }
      var created = unixtodate(create);
      var modified = unixtodate(modify);
      var shared = unixtodate(share);
      
      if(!json.remix.root){
        var remixroot = "不明 / NotFound";
      }else{
        var remixroot = `__[RootProject](https://scratch.mit.edu/projects/${root}/)__`;
      }
      if(!json.remix.parent){
        var remixparent = "不明 / NotFound";
      }else{
        var remixparent = `__[ParentProject](https://scratch.mit.edu/projects/${parent}/)__`;
      }
      
      const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setURL(`https://scratch.mit.edu/projects/${id_2}/`)
        .addFields(
          {
            name: "作者",
            value: `__[@${username}](https://scratch.mit.edu/users/${username}/)__`,
            inline: false
          },
          {
            name: `👀：${view}`,
            value: ` `,
            inline: true
          },
          {
            name: `❤️：${heart}`,
            value: ` `,
            inline: true
          },
          {
            name: `⭐：${star}`,
            value: ` `,
            inline: true
          },
          {
            name: "リミックス数",
            value: `${remix}`,
            inline: true
          },
          {
            name: "総リミックス元",
            value: remixroot,
            inline: true
          },
          {
            name: "リミックス元",
            value: remixparent,
            inline: true
          },
          {
            name: "作成日 (JST)",
            value: `${created}`,
            inline: true
          },
          {
            name: "最終更新日 (JST)",
            value: `${modified}`,
            inline: true
          },
          {
            name: "共有日 (JST)",
            value: `${shared}`,
            inline: true
          },
        )
        .setImage(`https://cdn2.scratch.mit.edu/get_image/project/${id_2}_480x360.png`)
        .setColor("#855DD7")
        .setFooter({
          text: "Made by Scratch Stats Bot",
          iconURL: thumbnail,
        })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] })
      
    } catch (error) {
      console.error(error);      
      await interaction.reply({ content: 'ScratchStatsAPIからProjectを取得できませんでした。', ephemeral: true });
    }
  },

}
