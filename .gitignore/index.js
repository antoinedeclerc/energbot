const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "!";

client.login("NjIwNjcxNTcxNjIyNzU2MzUy.XXlQJQ.PBhlTGidZx6FBMlFXPxF6ZSRwGE");

client.on("ready", () => {

    console.log("Je suis prêt !");
    client.user.setActivity(`!hlelp | Membres : ${client.users.size}`);
    client.guilds.get("285853683957104642").channels.get("437362304493944832").send(`Prêt à vous servir ! ^^ `).then(async msg => {
        setTimeout(() => {
            msg.delete();
        }, 5000)
    })
});

//Join-leave
/*client.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "join-leave").send(`<:like:437362304493944832> ${member} a rejoint le serveur !`);
})*/

/*client.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "join-leave").send(`<:dislike:437362304493944832> ${member} a quitté le serveur !`);
})*/

client.on("guildMemberAdd", member => {
    if (member.guild.id === "285853683957104642") {
        let règlement = member.guild.channels.find('id', "620285557444050954");
        let role = member.guild.roles.find("id", "620714237160980482");
        member.send(`Bienvenue sur le serveur ${message.guild.name} ! Va lire le ${règlement}.`);
        member.addRole(role).catch(console.error);
    };
});

//Messages déclancheurs ****************************************************************************************************
client.on('message', async message => { 
    if (!message.content.startsWith(prefix)) return;
        message.delete();

//Help, mhelp, fun, etc ****************************************************************************************************
if (message.content === prefix + "help") {
    message.delete();

    var help_embed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/481105805161005068/481850027216732160/elpbot-4.png")
        .setColor('#666666')
        .setTitle("Voici la liste des commandes :")
        .setDescription("Ici professent mes commandes")
        .addField("**Commandes générales, utilisables par tous!**", "** **")
        .addField("!help", "Affiche ce message")
        .addField("!inv", "Invitation temporaire")
        .addField("!bug", "T'as trouvé un bug ? Reporte - le")
        .addField("**Commandes détentes, funs :**", "** **")
        .addField("!infos-bot", "Donne des infos me concernant")
        .addField("!serv", "Donne des informations sur le serveur")
        .setFooter("Menu d'aide")
    message.author.send(help_embed);
    message.reply("Commandes envoyées en privé !").then(async msg => {
        setTimeout(() => {
            msg.delete();
        }, 6000)
        console.log("Un utilisateur a effectué la commande d'aide");
    })
}

if (message.content === `${client.user}`) {
    message.delete();
}
//help modo ****************************************************************************************************
if (message.content.startsWith(prefix + "modo")) {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");
    if (message.content === prefix + "modo") {
        var mhelp_embed = new Discord.RichEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/481105805161005068/481850027216732160/elpbot-4.png")
            .setColor('#990000')
            .setTitle("Voici mes commandes de modération !")
            .setDescription("Commande uniquement utilisables par les modérateurs !")
            .addField("!kick", "Sert à kick une personne !kick @xxx")
            .addField("!ban", "Sert à bannir une personne")
            .addField("!clear", "Sert à clear les msg")
            .addField("!invitation", "Invitation temporaire")
            .addField("!mute", "Sert à mute une personne dans le chat")
            .addField("!unmute", "Sert à demute une personne dans le chat")
            /*.addField("!sond", "Sert à faire un sondage")
            .addField("!warn", "Sert à avertir un utilisateur")
            .addField("!unwarn", "Sert à unwarn un utilisateur")
            .addField("!seewarn", "Sert à voir les warns d'un utilisateur")*/
            .setFooter("Menu d'aide - staff")
        message.author.send(mhelp_embed);
        console.log("Un Modérateur à effectuer la commande d'aide de modération !");
    };
}


//invvitation ****************************************************************************************************
if(message.content === prefix + "inv"){
    let invitation = await message.channel.createInvite({max_age:300000,max_uses:1,temporary:true}).catch(console.log);

      message.author.send("Voici l'invitation à partager ! Attention elle ne dure que 5 minutes !"+ invitation)
} 

//infos serveur + bot****************************************************************************************************
if(message.content === prefix + "infos-bot") {
    message.delete();

        var info_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setThumbnail("https://cdn.discordapp.com/attachments/481105805161005068/481850027216732160/elpbot-4.png%22")
            .setTitle("Informations me concernant")
            .addField("__Nom du bot :__", ""+client.user.tag, true)
            .addField("__ID :__", ""+client.user.id)
            .addField("__Mon prefix :__", "!commande")
            .addField("__Nombre de membres :__", ""+client.users.size+" membres")
            .addField("__Nombre de serveur où je suis :__", ""+client.guilds.size+" serveur")
            .addField("__Développeur :__", "NerWiiZ et MHoroide")
            .addField("__Béta-testeurs :__", "NerWiiZ et MHoroide")
            message.channel.send(info_embed)
            console.log("Un utilisateur a effectué la commande d'infos !")
}
//bug***********************************************************************************************************************
if (message.content.startsWith(prefix + "bug")) {
    message.delete();
        
    var args = message.content.split(' ').join(' ').slice(5);
  
    if(!args) return message.channel.send("Tu dois spécifier un bug !")
  
    var bug_embed = new Discord.RichEmbed()
    .setColor('#00FFFF')
    .setTitle(`Report de bug de : ${message.author.username}`)
    .addField('Report :',`${args}`)
    client.guilds.get("285853683957104642").channels.get("622362925364936704").send(bug_embed)
    message.channel.send("Ton raport a bien été pris en compte !").then(async msg => {
        setTimeout(() => {
            msg.delete();
        }, 6000)
    })
    
}

//infos-joueur****************************************************************************************************
if (message.content.startsWith(prefix+ "infos-perso")) {

    var args = message.content.substring(prefix.length).split(" ");
    

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#6699FF")
        .setTitle(`Statistiques de joueur :`)
        .addField("Pseudo :", `${message.author.username}`)
        .addField(`ID:`, msgauthor, true)
        .addField(`Date d'inscription sur discord :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .addField(`Date de venue sur ${message.guild.name} :`, message.guild.member(message.author).joinedAt.toDateString())
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés !").then(async msg => {
        setTimeout(() => {
            msg.delete();
        }, 6000)
        })
        message.author.send(stats_embed);

}
//info serv***********************************************************************************
if(message.content === prefix + "serv") {
    message.delete();
    var server_embed = new Discord.RichEmbed()
    .setColor("#40A497")
    .setTitle("Informations sur le serveur discord !")
    .setThumbnail("https://cdn.discordapp.com/attachments/481105805161005068/481850027216732160/elpbot-4.png")
    .addField("Nom du serveur :", `${message.guild.name}`)
    .addField("Créé le :", `${message.guild.createdAt}`)
    .addField("Tu as rejoint le :", `${message.member.joinedAt}`)
    .addField("Nombre de membres :", `${message.guild.memberCount}`+" membres")
    .addField("Nombre de catégories et de salons :", `${message.guild.channels.size}`)
    .setFooter("Infos - serveur")
    message.channel.send(server_embed)
    console.log("Commande infos - serveur!")
}

//kick ****************************************************************************************************
if(message.content.startsWith(prefix + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner un utilisateur");
    }

    var kick = message.guild.member(message.mentions.users.first());
    if(!kick) {
        return message.channel.send("L'utilisateur ne se trouve pas sur Terre !");
    }

    if(message.guild.member(kick).hasPermission("KICK_MEMBERS")) return message.channel.send("Impossible de l'expulser !");

    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send("Je n'ai pas la permission pour kick !");
    }

    kick.kick().then(member => {
        var kick_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle("Kick :")
            .addField("Membre kick:", `${member.user.username}`)
            .addField("ID :", `${member.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
        client.guilds.get("285853683957104642").channels.get("622362925364936704").send(kick_embed)
        console.log("Un utilisateur a été kick !")
    });
    
}


//ban ****************************************************************************************************
if(message.content.startsWith(prefix + "ban")) {

    var args = message.content.split(' ').join(' ').slice(5);
    if(!args) return message.channel.send("Tu dois spécifier la raison du ban !")

    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner un utilisateur");
    }

    var ban = message.guild.member(message.mentions.users.first());
    if(!ban) {
        return message.channel.send("L'utilisateur ne se trouve pas sur Terre !");
    }

    if(message.guild.member(ban).hasPermission("BAN_MEMBERS")) return message.channel.send("Impossible de l'expulser !");

    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("Je n'ai pas la permission pour ban !");
    }
    

    ban.ban().then(member => {
        var ban_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle("Ban :")
            .addField("Membre ban:", `${member.user.username}`)
            .addField("ID :", `${member.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            .addField("Raison :", `${args}`)
        client.guilds.get("285853683957104642").channels.get("622362925364936704").send(ban_embed)
        console.log("Un utilisateur a été ban !")
    });
    
}

//clear***********************************************************************************************************************
if(message.content.startsWith(prefix + "clear")) {
    message.delete();

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !");
    if(!args[0] > 100) return message.channel.send("Tu dois préciser un nombre inférieur à 1000 !");
    if(!args[0] < 0) return message.channel.send("Tu dois préciser un nombre correct !");
    message.channel.bulkDelete(args[0]).then(() => {
      var clear_embed = new Discord.RichEmbed()
          .setColor("#40A497")
          .setTitle("Clear :")
          .addField("Messages supprimés:", `${args[0]}`)
          .addField("Dans le salon :", `${message.channel.name}`)
          .addField("Modérateur :", `${message.author.username}`)
          client.guilds.get("285853683957104642").channels.get("622362925364936704").send(clear_embed)
          console.log("Un modo a supprimé des msg !")
    });
    
    message.channel.send(`${args[0]} messages ont été supprimés !`).then(async msg => {
        setTimeout(() => {
        msg.delete();
        }, 3000)

        
    })
    
}

//mute******************************************************************************
if(message.content.startsWith(prefix + "mute")) {
    message.delete();
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
      var mute_embed = new Discord.RichEmbed()
      .setColor("#40A497")
      .setTitle("Mute :")
      .addField('Membre muté :', `${message.mentions.users.first().username}`)
      .addField("ID :", `${mute.user.id}`)
      .addField("Modérateur :", `${message.author.username}`)
      client.guilds.get("285853683957104642").channels.get("622362925364936704").send(mute_embed)
      console.log("Un utilisateur a été mute !")
  });
}
//unmute*********************************************************************************************
if(message.content.startsWith(prefix + "unmute")) {
message.delete();
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
        client.guilds.get("285853683957104642").channels.get("622362925364936704").send(`${mute.user.username} n'est plus mute !`)
        console.log("Utilisateur unmute !");
    });
}


});
