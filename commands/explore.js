const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('explore')
    .setDescription('傾向を取得します')
    .addStringOption(option =>
      option.setName('languages')
        .setDescription('言語を選んでください')
        .setRequired(true)
        .addChoices(
          { name: '日本語', value: 'ja' },
          { name: 'English', value: 'en' }
        )
    ),

  async execute(interaction) {

    var language = interaction.options.getString('languages');
    const thumbnail = interaction.client.user.displayAvatarURL();

    const url = `https://api.scratch.mit.edu/explore/projects?limit=5&offset=0&language=${language}&mode=trending`;

    try {
      
      interaction.deferReply();
      
      // ユーザー情報を取得するリクエストを送信
      const response = await fetch(url);
      const json = await response.json();
      // ユーザー情報が存在しなければエラーメッセージを返す
      if (json.error) {
        await interaction.editReply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
        return;
      }

      // fetch関数でAPIにリクエストを送る
      fetch(url)
        // レスポンスをJSON形式に変換する
        .then(response => response.json())
        // JSONデータをコンソールに出力する
        //.then(data => console.log(data));

      try {
      // ユーザー情報から必要なデータを取得
      const image = json[0].image;
      const title1 = json[0].title;
      const id1 = json[0].id;
      const username1 = json[0].author.username;
      const views1 = json[0].stats.views;
      const loves1 = json[0].stats.loves;
      const favorites1 = json[0].stats.favorites;

      const     title2 = json[1].title;
      const        id2 = json[1].id;
      const  username2 = json[1].author.username;
      const     views2 = json[1].stats.views;
      const     loves2 = json[1].stats.loves;
      const favorites2 = json[1].stats.favorites;

      const     title3 = json[2].title;
      const        id3 = json[2].id;
      const  username3 = json[2].author.username;
      const     views3 = json[2].stats.views;
      const     loves3 = json[2].stats.loves;
      const favorites3 = json[2].stats.favorites;

      const     title4 = json[3].title;
      const        id4 = json[3].id;
      const  username4 = json[3].author.username;
      const     views4 = json[3].stats.views;
      const     loves4 = json[3].stats.loves;
      const favorites4 = json[3].stats.favorites;

      const     title5 = json[4].title;
      const        id5 = json[4].id;
      const  username5 = json[4].author.username;
      const     views5 = json[4].stats.views;
      const     loves5 = json[4].stats.loves;
      const favorites5 = json[4].stats.favorites;

      const embed = new EmbedBuilder()
        .setTitle(`Explore / 傾向`)
        .setURL(`https://scratch.mit.edu/explore/projects/all/trending`)
        .addFields(
          {
            name: ` `,
            value: `**[${title1}](https://scratch.mit.edu/projects/${id1}/)**  (${id1})`,
            inline: false
          },
          {
            name: `👀${views1}    ❤️${loves1}    ⭐${favorites1}`,
            value: " ",
            inline: false
          },
          {
            name: ` `,
            value: `Made by __[${username1}](https://scratch.mit.edu/users/${username1}/)__\n**------------------------------------------------------**`,
            inline: false
          },
          {
            name: ` `,
            value: `**[${title2}](https://scratch.mit.edu/projects/${id2}/)**  (${id2})`,
            inline: false
          },
          {
            name: `👀${views2}    ❤️${loves2}    ⭐${favorites2}`,
            value: " ",
            inline: false
          },
          {
            name: ` `,
            value: `Made by __[${username2}](https://scratch.mit.edu/users/${username2}/)__\n**------------------------------------------------------**`,
            inline: false
          },
          {
            name: ` `,
            value: `**[${title3}](https://scratch.mit.edu/projects/${id3}/)**  (${id3})`,
            inline: false
          },
          {
            name: `👀${views3}    ❤️${loves3}    ⭐${favorites3}`,
            value: " ",
            inline: true
          },
          {
            name: ` `,
            value: `Made by __[${username3}](https://scratch.mit.edu/users/${username3}/)__\n**------------------------------------------------------**`,
            inline: false
          },
          {
            name: ` `,
            value: `**[${title4}](https://scratch.mit.edu/projects/${id4}/)**  (${id4})`,
            inline: false
          },
          {
            name: `👀${views4}    ❤️${loves4}    ⭐${favorites4}`,
            value: " ",
            inline: true
          },
          {
            name: ` `,
            value: `Made by __[${username4}](https://scratch.mit.edu/users/${username4}/)__\n**------------------------------------------------------**`,
            inline: false
          },
          {
            name: ` `,
            value: `**[${title5}](https://scratch.mit.edu/projects/${id5}/)**  (${id5})`,
            inline: false
          },
          {
            name: `👀${views5}    ❤️${loves5}    ⭐${favorites5}`,
            value: " ",
            inline: true
          },
          {
            name: ` `,
            value: `Made by __[${username5}](https://scratch.mit.edu/users/${username5}/)__`,
            inline: false
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
      await interaction.reply({ embeds: [embed] });
        
        } catch(error) {
          console.error(error);
          await interaction.editReply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
          return;
        }

    } catch (error) {
      // エラーが発生したらコンソールに出力
      console.error(error);
      // エラーメッセージを返信
      await interaction.editReply({ content: 'APIから傾向を取得できませんでした。', ephemeral: true });

    }
  },

}
