const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('search')
  .setDescription('プロジェクトを検索します')
  .addStringOption(option =>
    option.setName('type')
      .setDescription('タイプを選択してください')
      .setRequired(true)
      .addChoices(
        { name: 'プロジェクト / projects', value: 'projects' },
        { name: 'スタジオ / studios', value: 'studios' }
      ))
  .addStringOption(option =>
    option.setName('mode')
      .setDescription('モードを選択してください')
      .setRequired(true)
      .addChoices(
        { name: '人気 / popular', value: 'popular' },
        { name: '傾向 / trending', value: 'trending' }
      ))
.addStringOption(option =>      
      option.setName('word')
      .setDescription('検索ワードを書いてください')
      .setRequired(true)
  ),

  async execute(interaction) {

    var mode = interaction.options.getString('mode');
    var search = interaction.options.getString('word');
    var type = interaction.options.getString('type');
    const thumbnail = interaction.client.user.displayAvatarURL();

    const url = `https://api.scratch.mit.edu/search/${type}?limit=5&offset=0&mode=${mode}&q=${search}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      // ユーザー情報が存在しなければエラーメッセージを返す
      if (json.error) {
        interaction.reply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
        return;
      }

      fetch(url)
        .then(response => response.json())
      
      if(type === "projects"){
        try {
      // ユーザー情報から必要なデータを取得
      let      image = json[0].image;
      let     title1 = json[0].title;
      let        id1 = json[0].id;
      let  username1 = json[0].author.username;
      let     views1 = json[0].stats.views;
      let     loves1 = json[0].stats.loves;
      let favorites1 = json[0].stats.favorites;

      let     title2 = json[1].title;
      let        id2 = json[1].id;
      let  username2 = json[1].author.username;
      let     views2 = json[1].stats.views;
      let     loves2 = json[1].stats.loves;
      let favorites2 = json[1].stats.favorites;

      let     title3 = json[2].title;
      let        id3 = json[2].id;
      let  username3 = json[2].author.username;
      let     views3 = json[2].stats.views;
      let     loves3 = json[2].stats.loves;
      let favorites3 = json[2].stats.favorites;

      let     title4 = json[3].title;
      let        id4 = json[3].id;
      let  username4 = json[3].author.username;
      let     views4 = json[3].stats.views;
      let     loves4 = json[3].stats.loves;
      let favorites4 = json[3].stats.favorites;

      let     title5 = json[4].title;
      let        id5 = json[4].id;
      let  username5 = json[4].author.username;
      let     views5 = json[4].stats.views;
      let     loves5 = json[4].stats.loves;
      let favorites5 = json[4].stats.favorites;

      var embed = new EmbedBuilder()
        .setTitle(`${type} / ${search} / ${mode}`)
        .setURL(`https://scratch.mit.edu/search/${type}?mode=${mode}&q=${search}`)
        .addFields(
          {
            name: ` `,
            value: `**[${title1}](https://scratch.mit.edu/projects/${id1}/)**  (${id1})`,
            inline: false
          },
          {
            name: `👀${views1}`,
            value: " ",
            inline: true
          },
          {
            name: `❤️${loves1}`,
            value: " ",
            inline: true
          },
          {
            name: `⭐${favorites1}`,
            value: " ",
            inline: true
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
            name: `👀${views2}`,
            value: " ",
            inline: true
          },
          {
            name: `❤️${loves2}`,
            value: " ",
            inline: true
          },
          {
            name: `⭐${favorites2}`,
            value: " ",
            inline: true
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
            name: `👀${views3}`,
            value: " ",
            inline: true
          },
          {
            name: `❤️${loves3}`,
            value: " ",
            inline: true
          },
          {
            name: `⭐${favorites3}`,
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
            name: `👀${views4}`,
            value: " ",
            inline: true
          },
          {
            name: `❤️${loves4}`,
            value: " ",
            inline: true
          },
          {
            name: `⭐${favorites4}`,
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
            name: `👀${views5}`,
            value: " ",
            inline: true
          },
          {
            name: `❤️${loves5}`,
            value: " ",
            inline: true
          },
          {
            name: `⭐${favorites5}`,
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
          interaction.reply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
          return;
        }

      }else{
        try{
      let      image_st = json[0].image;
      let     title1_st = json[0].title;
      let        id1_st = json[0].id;
      var      created1 = json[0].history.created;
      var     modified1 = json[0].history.modified;
          
      var created1_time = created1.substr(created1.indexOf('T')+1);
      var created1_time = created1_time.substr(0, created1_time.indexOf('.'));
      var created1 = created1.substr(0, created1.indexOf('T'));
      var created1 = created1.replace(/-/g, "/");

      var modified1_time = modified1.substr(modified1.indexOf('T')+1);
      var modified1_time = modified1_time.substr(0, modified1_time.indexOf('.'));
      var modified1 = modified1.substr(0, modified1.indexOf('T'));
      var modified1 = modified1.replace(/-/g, "/");

      let     title2_st = json[1].title;
      let        id2_st = json[1].id;
      var      created2 = json[1].history.created;
      var     modified2 = json[1].history.modified;

      var created2_time = created2.substr(created2.indexOf('T')+1);
      var created2_time = created2_time.substr(0, created2_time.indexOf('.'));
      var created2 = created2.substr(0, created2.indexOf('T'));
      var created2 = created2.replace(/-/g, "/");

      var modified2_time = modified2.substr(modified2.indexOf('T')+1);
      var modified2_time = modified2_time.substr(0, modified2_time.indexOf('.'));
      var modified2 = modified2.substr(0, modified2.indexOf('T'));
      var modified2 = modified2.replace(/-/g, "/");

      let     title3_st = json[2].title;
      let        id3_st = json[2].id;
      var      created3 = json[2].history.created;
      var     modified3 = json[2].history.modified;

      var created3_time = created3.substr(created3.indexOf('T')+1);
      var created3_time = created3_time.substr(0, created3_time.indexOf('.'));
      var created3 = created3.substr(0, created3.indexOf('T'));
      var created3 = created3.replace(/-/g, "/");

      var modified3_time = modified3.substr(modified3.indexOf('T')+1);
      var modified3_time = modified3_time.substr(0, modified3_time.indexOf('.'));
      var modified3 = modified3.substr(0, modified3.indexOf('T'));
      var modified3 = modified3.replace(/-/g, "/");

      let     title4_st = json[3].title;
      let        id4_st = json[3].id;
      var      created4 = json[3].history.created;
      var     modified4 = json[3].history.modified;

      var created4_time = created4.substr(created4.indexOf('T')+1);
      var created4_time = created4_time.substr(0, created4_time.indexOf('.'));
      var created4 = created4.substr(0, created4.indexOf('T'));
      var created4 = created4.replace(/-/g, "/");

      var modified4_time = modified4.substr(modified4.indexOf('T')+1);
      var modified4_time = modified4_time.substr(0, modified4_time.indexOf('.'));
      var modified4 = modified4.substr(0, modified4.indexOf('T'));
      var modified4 = modified4.replace(/-/g, "/");

      let     title5_st = json[4].title;
      let        id5_st = json[4].id;
      var      created5 = json[4].history.created;
      var     modified5 = json[4].history.modified;

      var created5_time = created5.substr(created5.indexOf('T')+1);
      var created5_time = created5_time.substr(0, created5_time.indexOf('.'));
      var created5 = created5.substr(0, created5.indexOf('T'));
      var created5 = created5.replace(/-/g, "/");

      var modified5_time = modified5.substr(modified5.indexOf('T')+1);
      var modified5_time = modified5_time.substr(0, modified5_time.indexOf('.'));
      var modified5 = modified5.substr(0, modified5.indexOf('T'));
      var modified5 = modified5.replace(/-/g, "/");
      
      const url_2 = `https://api.scratch.mit.edu/studios/${id1_st}/`;
      const url_3 = `https://api.scratch.mit.edu/studios/${id2_st}/`;
      const url_4 = `https://api.scratch.mit.edu/studios/${id3_st}/`;
      const url_5 = `https://api.scratch.mit.edu/studios/${id4_st}/`;
      const url_6 = `https://api.scratch.mit.edu/studios/${id5_st}/`;
          
        const response_2 = await fetch(url_2);
        const json_2 = await response_2.json();
         var followers1_st = json_2.stats.followers;
         var managers1_st = json_2.stats.managers;

        const response_3 = await fetch(url_3);
        const json_3 = await response_3.json();
         var followers2_st = json_3.stats.followers;
         var managers2_st = json_3.stats.managers;

        const response_4 = await fetch(url_4);
        const json_4 = await response_4.json();
         var followers3_st = json_4.stats.followers;
         var managers3_st = json_4.stats.managers;

        const response_5 = await fetch(url_5);
        const json_5 = await response_5.json();
        var followers4_st = json_5.stats.followers;
        var managers4_st = json_5.stats.managers;

        const response_6 = await fetch(url_6);
        const json_6 = await response_6.json();
        var followers5_st = json_6.stats.followers;
        var managers5_st = json_6.stats.managers;

      if (json_2.code === "ResourceNotFound" || json_2.code === "NotFound") {
        followers1_st = "NotFound";
        managers1_st = "NotFound";
      }

      var embed = new EmbedBuilder()
        .setTitle(`${type} / ${search} / ${mode}`)
        .setURL(`https://scratch.mit.edu/search/${type}?mode=${mode}&q=${search}`)
        .addFields(
          {
            name: ` `,
            value: `**[${title1_st}](https://scratch.mit.edu/studios/${id1_st}/)**`,
            inline: false
          },
          {
            name: `Followers`,
            value: `${followers1_st}`,
            inline: true
          },
          {
            name: `Managers`,
            value: `${managers1_st}`,
            inline: true
          },
          {
            name: `Created(Y/M/D)`,
            value: `${created1}\n${created1_time}`,
            inline: true
          },
          {
            name: `LastModified(Y/M/D)`,
            value: `${modified1}\n${modified1_time}`,
            inline: true
          },
          {
            name: ` `,
            value: `**[${title2_st}](https://scratch.mit.edu/studios/${id2_st}/)**`,
            inline: false
          },
          {
            name: `Followers`,
            value: `${followers2_st}`,
            inline: true
          },
          {
            name: `Managers`,
            value: `${managers2_st}`,
            inline: true
          },
          {
            name: `Created(Y/M/D)`,
            value: `${created2}\n${created2_time}`,
            inline: true
          },
          {
            name: `LastModified(Y/M/D)`,
            value: `${modified2}\n${modified2_time}`,
            inline: true
          },
          {
            name: ` `,
            value: `**[${title3_st}](https://scratch.mit.edu/studios/${id3_st}/)**`,
            inline: false
          },
          {
            name: `Followers`,
            value: `${followers3_st}`,
            inline: true
          },
          {
            name: `Managers`,
            value: `${managers3_st}`,
            inline: true
          },
          {
            name: `Created(Y/M/D)`,
            value: `${created3}\n${created3_time}`,
            inline: true
          },
          {
            name: `LastModified(Y/M/D)`,
            value: `${modified3}\n${modified3_time}`,
            inline: true
          },
          {
            name: ` `,
            value: `**[${title4_st}](https://scratch.mit.edu/studios/${id4_st}/)**`,
            inline: false
          },
          {
            name: `Followers`,
            value: `${followers4_st}`,
            inline: true
          },
          {
            name: `Managers`,
            value: `${managers4_st}`,
            inline: true
          },
          {
            name: `Created(Y/M/D)`,
            value: `${created4}\n${created4_time}`,
            inline: true
          },
          {
            name: `LastModified(Y/M/D)`,
            value: `${modified4}\n${modified4_time}`,
            inline: true
          },
          {
            name: ` `,
            value: `**[${title5_st}](https://scratch.mit.edu/studios/${id5_st}/)**`,
            inline: false
          },
          {
            name: `Followers`,
            value: `${followers5_st}`,
            inline: true
          },
          {
            name: `Managers`,
            value: `${managers5_st}`,
            inline: true
          },
          {
            name: `Created(Y/M/D)`,
            value: `${created5}\n${created5_time}`,
            inline: true
          },
          {
            name: `LastModified(Y/M/D)`,
            value: `${modified5}\n${modified5_time}`,
            inline: true
          },
        )
        .setThumbnail(`${image_st}`)
        //.setImage(`https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`)
        .setColor("#855DD7")
        .setFooter({
          text: "Made by Scratch Stats Bot",
          iconURL: thumbnail,
        })
        .setTimestamp();

        await interaction.reply({ embeds: [embed] })
          } catch(error) {
          console.error(error);
          interaction.reply({ content: `傾向を取得できませんでした。\n__**[サポートサーバー](https://discord.gg/wRdXB8MBt6)**__で報告してください。`, ephemeral: true });
            return;
        }
      };

    } catch (error) {
      // エラーが発生したらコンソールに出力
      console.error(error);
      // エラーメッセージを返信
      interaction.reply({ content: `APIから取得できませんでした。\n検索ワード「${search}」は存在しない可能性があります。`, ephemeral: true });

    }
  },

}
