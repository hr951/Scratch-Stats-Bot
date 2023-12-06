const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('explore')
    .setDescription('傾向を取得します')
    .addStringOption(option =>
      option.setName('languages')
        .setDescription('言語を選んでください')
        .addChoices(
          { name: '日本語', value: 'ja' },
          { name: 'English', value: 'en' }
        )
    ),

  async execute(interaction) {

    var language = interaction.options.getString('languages');
    const thumbnail = interaction.client.user.displayAvatarURL();

    const url = `https://api.scratch.mit.edu/explore/projects?limit=1&offset=0&language=${language}&mode=trending`;

    try {
      // ユーザー情報を取得するリクエストを送信
      const response = await fetch(url);
      const json = await response.json();
      // ユーザー情報が存在しなければエラーメッセージを返す
      if (json.error) {
        interaction.reply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
        return;
      }

      // fetch関数でAPIにリクエストを送る
      fetch(url)
        // レスポンスをJSON形式に変換する
        .then(response => response.json())
        // JSONデータをコンソールに出力する
        .then(data => console.log(data));


      // ユーザー情報から必要なデータを取得
      const image = json.image;
      const title1 = json.title;
      const id1 = json.id;
      const username1 = "hi_ro951";//json.author.id;
      const views1 = json.stats.views;
      const loves1 = json.stats.loves;
      const favorites1 = json.stats.favorites;

      const     title2 = json.title;
      const        id2 = json.id;
      const  username2 = json.author.username;
      const     views2 = json.stats.views;
      const     loves2 = json.stats.loves;
      const favorites2 = json.stats.favorites;

      const     title3 = json.title;
      const        id3 = json.id;
      const  username3 = json.author.username;
      const     views3 = json.stats.views;
      const     loves3 = json.stats.loves;
      const favorites3 = json.stats.favorites;

      const     title4 = json.title;
      const        id4 = json.id;
      const  username4 = json.author.username;
      const     views4 = json.stats.views;
      const     loves4 = json.stats.loves;
      const favorites4 = json.stats.favorites;

      const     title5 = json.title;
      const        id5 = json.id;
      const  username5 = json.author.username;
      const     views5 = json.stats.views;
      const     loves5 = json.stats.loves;
      const favorites5 = json.stats.favorites;

      const embed = new EmbedBuilder()
        .setTitle(`Explore / 傾向`)
        .setURL(`https://scratch.mit.edu/explore/projects/all/trending`)
        .addFields(
          {
            name: `__**[${title1}](https://scratch.mit.edu/projects/${id1}/)**__`,
            value: `Made by __[${username1}](https://scratch.mit.edu/users/${username1}/)__`,
            inline: false
          },
          {
            name: `👀${views1}`,
            value: " ",
            inline: true
          },
          {
            name: `♥${loves1}`,
            value: " ",
            inline: true
          },
          {
            name: `★${favorites1}`,
            value: " ",
            inline: true
          },
          {
            name: `__**[${title2}](https://scratch.mit.edu/projects/${id2}/)**__`,
            value: `Made by __[${username2}](https://scratch.mit.edu/users/${username2}/)__`,
            inline: false
          },
          {
            name: `👀${views2}`,
            value: " ",
            inline: true
          },
          {
            name: `♥${loves2}`,
            value: " ",
            inline: true
          },
          {
            name: `★${favorites2}`,
            value: " ",
            inline: true
          },
          {
            name: `__**[${title3}](https://scratch.mit.edu/projects/${id3}/)**__`,
            value: `Made by __[${username3}](https://scratch.mit.edu/users/${username3}/)__`,
            inline: false
          },
          {
            name: `👀${views3}`,
            value: " ",
            inline: true
          },
          {
            name: `♥${loves3}`,
            value: " ",
            inline: true
          },
          {
            name: `★${favorites3}`,
            value: " ",
            inline: true
          },
          {
            name: `__**[${title4}](https://scratch.mit.edu/projects/${id4}/)**__`,
            value: `Made by __[${username4}](https://scratch.mit.edu/users/${username4}/)__`,
            inline: false
          },
          {
            name: `👀${views4}`,
            value: " ",
            inline: true
          },
          {
            name: `♥${loves4}`,
            value: " ",
            inline: true
          },
          {
            name: `★${favorites4}`,
            value: " ",
            inline: true
          },
          {
            name: `__**[${title5}](https://scratch.mit.edu/projects/${id5}/)**__`,
            value: `Made by __[${username5}](https://scratch.mit.edu/users/${username5}/)__`,
            inline: false
          },
          {
            name: `👀${views5}`,
            value: " ",
            inline: true
          },
          {
            name: `♥${loves5}`,
            value: " ",
            inline: true
          },
          {
            name: `★${favorites5}`,
            value: " ",
            inline: true
          },
        )
        .setThumbnail(`${image}`)
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
      await interaction.reply({ content: 'APIから傾向を取得できませんでした。', ephemeral: true });

    }
  },

}
