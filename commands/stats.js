const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
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
    var count_stats = 0;
    var views = 0;
    var stars = 0;
    var hearts = 0;
    var projects = 0;
    var count_project = 0;
    var count_follower = 0;
    let followers = 0;
    var count_following = 0;
    var followings = 0;
    var notfollower = 0;
    
    const deleted_users = await fetch("https://raw.githubusercontent.com/hr951/Scratch-Stats-Bot/main/deleted_users.json");
    const deleted_users_json = await deleted_users.json();
    
    function isUserDeleted(userId) {
      return deleted_users_json.some(user => user.id === userId);
    }

    const url_2 = `https://api.scratch.mit.edu/users/${username_2}`;

    const url_5 = `https://scratch.mit.edu/site-api/users/all/${username_2}`;

    try {
      
     /*let url_7 = `https://scratch.mit.edu/users/${username_2}`;
     const response_7 = await fetch(url_7);
      console.log(response_7.status);*/
      
      const response_2 = await fetch(url_2);
      const json_2 = await response_2.json();
      if (json_2.code === "NotFound" || json_2.code === "ResourceNotFound") {
        await interaction.reply({ content: `Scratchのユーザー「${username_2}」は存在しません。`, ephemeral: true });
        return;
      };

      const response_5 = await fetch(url_5);
      const json_5 = await response_5.json();
      
      interaction.reply({ content: 'Now Loading...\n取得した情報はまもなく出力されます。\n※生成完了時メンションされます。', ephemeral: true });
      const mention = interaction.user.id;
      
      do{        
      const url = `https://api.scratch.mit.edu/users/${username_2}/following/?limit=40&offset=${count_following}`;
      
      const response = await fetch(url);
      const json = await response.json();
      count_following = 40 + count_following;
      var followings = json.length + followings;
      global.json_length = json.length;
      } while (global.json_length > 0);
      
      var followers_test = {};
      var allFollowers = [];
      do{
      const url_3 = `https://api.scratch.mit.edu/users/${username_2}/followers/?limit=40&offset=${count_follower}`;

      const response_3 = await fetch(url_3);
      const json_3 = await response_3.json();
      
      var followers_test = json_3.map(user => ({
        id: user.id,
        username: user.username
      })).filter(user => !isUserDeleted(user.id));

      var allFollowers = [...allFollowers, ...followers_test];

      count_follower += 40;
      global.json_3_length = json_3.length;
      } while (global.json_3_length === 40);
      
      var notfollowercount = 0;
      var combinedArray = [];
      for (let i = 0; i < allFollowers.length; i++) {
        let url_7 = `https://scratch.mit.edu/users/${allFollowers[notfollowercount].username}`;
        const response_7 = await fetch(url_7);
        notfollowercount++;
        //console.log(response_7.status)
        if(response_7.status === 404){
          notfollower++;
          var new_deleted_users = allFollowers[notfollowercount-1];
          combinedArray.push(new_deleted_users);
          var new_deleted_users_list = JSON.stringify(combinedArray);
        }
        }
        if (new_deleted_users_list){
        const guild = await interaction.client.guilds.fetch("1160122019619278898");
        const member = await guild.members.fetch("962670040795201557");
        member.send("New Deleted Users List\n```json\n"+new_deleted_users_list+"```");
      }
      followers = allFollowers.length - notfollower;
      
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
      var username = json_2.username;
      var country = json_2.profile.country;
      var joined = json_2.history.joined;
      const unix = Date.parse(joined) / 1000 + 9 * 3600
      const date = new Date(unix * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      var joined = `${year}/${month}/${day}`;
      var joined_time = `${hours}:${minutes}:${seconds}`;
      var pro_id = json_5.featured_project;
      
      const url_6 = `https://api.scratch.mit.edu/projects/${pro_id}`;
      const response_6 = await fetch(url_6);
      if(response_6.status === 200){
      const json_6 = await response_6.json();
      var pro_title = json_6.title;
      var pro_thumbnail = json_6.image;
      }else{
        var pro_title = "不明 / NotFound";
        var pro_thumbnail = "https://cdn2.scratch.mit.edu/get_image/project/1042518320_480x360.png";
        var pro_id = "1042518320";
      }
      
      const response_8 = await fetch(`https://scratch.mit.edu/users/${username}`);
      if(response_8.status === 404){
        var title = `${username}'s Stats (Deleted User)`;
      } else {
        var title = `${username}'s Stats`
      }
      
      if(json_2.scratchteam){
        var status = "Scratch Team";
      }else{
        var status = "Scratcher";
      }

      if (!followers) {
        followers = "不明 / NotFound";
      }
      if (!followings) {
        var followings = "不明 / NotFound";
      }
      if (!projects) {
        var projects = "不明 / NotFound";
      }
      if (!hearts) {
        var hearts = "不明 / NotFound";
      }
      if (!stars) {
        var stars = "不明 / NotFound";
      }
      if (!views) {
        var views = "不明 / NotFound";
      }

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setURL(`https://scratch.mit.edu/users/${username}`)
        .addFields(
          {
            name: "ステータス",
            value: `${status}`,
            inline: true
          },
          {
            name: "国・地域",
            value: `${country}`,
            inline: true
          },
          {
            name: "参加日 (JST)",
            value: `${joined}\n${joined_time}`,
            inline: true
          },
          {
            name: "フォロー関係",
            value: `**フォロワー**：${followers}\n**フォロー中**：${followings}`,
            inline: true
          },
          {
            name: "プロジェクト関係",
            value: `**プロジェクト数**：${projects}\n👀：${views}\n⭐：${stars}\n❤️：${hearts}`,
            inline: true
          },
          {
            name: "注目のプロジェクト",
            value: `**[${pro_title}](https://scratch.mit.edu/projects/${pro_id})**  (${pro_id})`,
            inline: false
          },
        )
        .setThumbnail(`https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`)
        .setImage(/*`https:*/`${pro_thumbnail}`)
        .setColor("#855DD7")
        .setFooter({
          text: "Made by Scratch Stats Bot",
          iconURL: thumbnail,
        })
        .setTimestamp();
      
      await interaction.channel.send({ content: `<@${mention}> __@${username_2}__の情報を生成しました。`, embeds: [embed] });
      //await interaction.editReply({ embeds: [embed] })

    } catch (error) {
      // エラーが発生したらコンソールに出力
      console.error(error);

      // エラーメッセージを返信
      await interaction.reply({ content: 'Error\nError code : ScratchAPIから情報を取得できません。\n時間を空けて再度お試しください。', ephemeral: true });
    }
  },

}
