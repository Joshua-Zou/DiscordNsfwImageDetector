const {MongoClient} = require('mongodb');
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
var NSFAI = require('nsfai');
const getUrls = require('get-urls');
/////end of requiring packages
client.once('ready', () => {

  console.log('Ready!');
  client.user.setPresence({activity: {name: "I'm watching you! @me to see my current prefix"}, status: 'online'})

})
const uri = "_____________MONGODB_CONNECTION_STRING_____________________";
const mongoclient = new MongoClient(uri, {poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});
mongoclient.connect(async function(err, mongoclient){
  const db = mongoclient.db("discordbot");
client.login("____________________DISCORD_API_KEY_____________")
client.on('message', message => {
  var guildSettings; //the kinda global settings that I will put data in, in the first if (message) statement
  var prefix = "?" // the default prefix that will get overwritten if admins change it.
  var prefixlength = 1;
  main()
async function main(){
    try{
    if (message.author.bot) return;
let serverid = message.guild.id;
if (message){
await db.listCollections({name: serverid}, message)
.next(async function(err, collinfo){
  if (!collinfo){
    message.channel.send("This seems to be the first time I have seen this server. To start using my features, you can do ?help")
    await createCollection(serverid);
    await createListing(mongoclient, {
      name: "serverSettings",
      prefix: "?",
      blacklist: []
    }, message)//creates server setting document in mongodb. This contains the confidence threshold, the blacklist, and the prefix.
  }
})
guildSettings = await checkStuff(mongoclient, "serverSettings", message);//gets the server settings.
prefix = guildSettings.prefix;
prefixlength = prefix.length;
signup(mongoclient, message);//creates a document for the person that contains number of infractions.
} //in here is the create collection stuff, and thes stuff that manages mongo. It's in an if statement because I'm an organization freak and I need this collapsed sry if this causes you guys any trouble.
checkImage(mongoclient, message)
if (message){
  if (message.mentions.users.first()){


  let word2 = message.mentions.users.first().id;
  if (word2 === "811668584559935488" ){
  message.channel.send("My current prefix is: "+prefix+"\n"+ "Type " +prefix+"help for help");
}
}
}
if (message.content.startsWith(prefix+"blacklist")){
          if (message.content.length<(14+prefixlength)) {
            message.channel.send("You must input a word that is longer than 3 characters to blacklist");//limitation becuase if user blacklists a one character word, then bad things happen.
            return;
          }
          if (message.member.hasPermission('ADMINISTRATOR')){

          let proccesedwordx = message.content.toLowerCase().slice(9+prefixlength).trim().split();
          let proccesedword = proccesedwordx.toString();
          await updateListing(mongoclient, {blacklist: proccesedword}, message);
          return;
          }
            else{
            message.channel.send("You don't have sufficient permissions to use that specified commmand.");
             }

      }
if (message.content.startsWith(prefix+"delist")){
        if (message.member.hasPermission('ADMINISTRATOR')){
          message.channel.send('Authorized');

          let exword = message.content.toLowerCase().slice(7+prefixlength).trim().split();
          let exxword = exword.toString();
          await updateDelListing(mongoclient, {blacklist: exxword}, message);
        }
        else{
          message.channel.send("You don't have sufficient permissions to use that specified commmand.");
        }
      }
if (message.content.toLowerCase() === prefix+"show blacklist"){
        if (!message.member.hasPermission('ADMINISTRATOR')){
          message.channel.send("You don't have sufficient permissions to use that specified commmand.");
          return;
        }
        let result = await mongoclient.db("discordbot").collection(message.guild.id)
        .findOne({ name: "serverSettings"});
        if (result){
          let dbwords = JSON.parse(JSON.stringify(result));
            local104();
            async function local104(){

            if (dbwords.blacklist.length === 0){
              message.channel.send("There are no words in the blacklist. To start blacklisting words, send: `"+prefix+"blacklist `word`");
              return;
            }else
            message.channel.send("Sent it to you in your DM's");
            let list = dbwords.blacklist;
            list = list.join('\n')
          message.member.send("The blacklist: \n"+ list);
      }

      }
      else message.channel.send("There are no words in the blacklist. To start, send: " + prefix + "blacklist `word`.");
      }
if(message.content.toLowerCase() === prefix+"clear blacklist"){
        if (message.member.hasPermission('ADMINISTRATOR')){
        message.channel.send("Clearing the blacklist...");
        updateDocumentSet(mongoclient, "serverSettings", {blacklist: []}, message);
        message.channel.send("Done")
      }
      else{
        message.channel.send("You don't have sufficient permissions to use that specified commmand.");
      }
}
if (message.content.toLowerCase() === prefix+"set confidence"){
  if (!message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send("You don't have sufficient permissions to use that specified commmand.");
    return;
  }
  let alert = new Discord.MessageEmbed()
  .setTitle("Enter the confidence level that an image is NSFW that I must have to delete an image. (Must be between 5 and 95)")
  .setColor('#9c4cfb')
  .setDescription("Please note that lower confidence levels will increase the chances of false positives. For example: \n Confidence of 5% would label people swimming as NSFW\n Confidence of 50% would label naked dummies as NSFW\n Confidence of 75% is normally the sweet spot\n Confidence of 90% wouldn't label some NSFW things as NSFW")
  message.channel.send(alert)
  message.channel.awaitMessages(m => m.author.id === message.author.id,
  {max: 1, time: 30000}).then(collected => {
  let confidence = Number(collected.first().content);
  if (confidence.toString().toLowerCase() === "nan"){
    message.channel.send("Confidence must a number.");
    return;
  }else if (confidence>95){
    message.channel.send("Confidence must be below 96%.");
    return;
  }else if (confidence<5){
    message.channel.send("Confidence must be above 4%.");
    return;
  }
  updateDocumentSet(mongoclient, "serverSettings", {confidence: confidence}, message);
  message.channel.send("Done. Now, my confidence that an image is NSFW must be above "+confidence+"% to delete messages and increase infractions.")
  }).catch(() => {
    message.channel.send("No response after 30 seconds, operation canceled.");
  })
}
if (message.content.toLowerCase() === prefix+"reset bot"||message.content.toLowerCase() === "?reset bot"){
        if (message.guild.ownerID !== message.author.id){
          message.channel.send("You don't have sufficient permissions to use that specified commmand.");
          return;
        }
        message.channel.send("WARNING: this will clear the entire database's entry on your server. This will reset EVERYTHING RELATED TO THIS BOT IN THIS SERVER. \n YOU SHOULD ONLY USE THIS COMMAND IF THERE IS A BUG AND I DON'T WORK ANYMORE! WE FIRST ENCOURAGE YOU TO ASK THE COMMNUITY FIRST BEFORE YOU DO THIS!\n https://discord.gg/B8s6KeMh \nARE YOU SURE YOU WANT TO DO THIS? \n If you are sure, type the name of your server below (case sensitive)")
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
      if (collected.first().content === message.guild.name){
        dropcollection().catch();
        async function dropcollection(){
      message.channel.send("This will take a minute or two. DO NOT INTERRUPT THE OPERATION (Please don't send any messages)\nDropping Collection...");
      let guildid = collected.first().guild.id;
      const db = mongoclient.db("discordbot");
      await mongoclient.db("discordbot").collection(guildid).drop();
      }
      return;
      }
        else message.reply('Operation aborted');
        return;
        }).catch(() => {
        message.reply('No answer after 30 seconds, operation canceled.');
        return;
        });
        return;
      } // we made this command since our bot is in early development, and things can go wrong, so this just allows the user to reset it.
checkBadWord(mongoclient, message); //check bad word is after blacklist and delist becuase if it was before, then the user wouldn't be able to delist words.
checkAutoKick(mongoclient, message);
checkAutoBan(mongoclient, message);
if (message.content.startsWith(prefix+"check infractions")){
        if(message.member.hasPermission('ADMINISTRATOR')){
          let myword = message.content.toLowerCase().slice(18+prefixlength).trim().split();
          //let word2 = myword.toString();
          let word2 = message.mentions.users.first().id;
          //message.channel.send(word2)
          await findOneListingByName(mongoclient, word2, message.mentions.users.first().tag, message);
          //const user = mongoclient.users.get("741793729509064704"); // Getting the user by ID.
          //message.channel.send(user);

        }
        else{
          message.channel.send("You don't have sufficient permissions to use that specified commmand.");
        }
      }
if (message.content.startsWith(prefix+"clear infractions")){
              if (message.member.hasPermission('ADMINISTRATOR')){
                message.channel.send('Authorized');
                let myword = message.content.toLowerCase().slice(18+prefixlength).trim().split();
                //let word2 = myword.toString();
                let word2 = message.mentions.users.first().id;
                await clearInfractions(mongoclient, word2 , {infractions: 0}, message)
              }
              else{
                message.channel.send("You don't have sufficient permissions to use that specified commmand.");
              }
            }
if (message.content.toLowerCase().startsWith(prefix+"change prefix")){
              if (!message.member.hasPermission('ADMINISTRATOR')){
                message.channel.send("You don't have sufficient permissions to use that specified commmand.");
                return;
              }
            let length1 = message.content.length;
            let lastchar = message.content.slice(length1-1);
            var goodprefix = "?";
              let badprefix = message.content.slice(14+prefixlength);
              if (badprefix.length === 0){
                message.channel.send("The prefix must be one or more characters long.");
                return;
              }
              if (badprefix.length > 3){
                message.channel.send("The prefix must be 3 or less characters");
                  return;
              }
              badprefix = badprefix.toLowerCase();
                if (!/^[a-zA-Z]+$/.test(lastchar)&&!/^[0-9]+$/.test(lastchar)){
                  message.channel.send("I have just made: "+ badprefix+"my prefix. You will now run commands like this: "+badprefix+"help");
                  goodprefix = badprefix;
                }else{
                  goodprefix = badprefix+" ";
                  message.channel.send("The last character of your prefix must be a special character, otherwise it must contain a space at the end. I will add a space, so now when you run commands, do: "+ goodprefix+"bot info")
                }
               message.channel.send("Are you sure that you want to make: "+goodprefix+" your prefix? you will type commands like: "+goodprefix+"help. Type yes if you want to make it the new prefix.");
               message.channel.awaitMessages(m => m.author.id === message.author.id,
               {max: 1, time: 30000}).then(collected => {
               if (collected.first().content.toLowerCase() === 'yes') {
                   message.reply('making: '+goodprefix+" the new prefix");
                   updateDocumentSet(mongoclient, "serverSettings", {prefix: goodprefix}, message);
                   message.reply('Done.')
               }
               else message.reply('aborted');
               }).catch(() => {
               message.reply('No response after 30 seconds, operation canceled.');
               });

            }
if (message.content.toLowerCase().startsWith(prefix+"ban")){
              if (!message.member.hasPermission("ADMINISTRATOR")){
                message.channel.send("You don't have sufficient permissions to use that specified commmand.");
                return;
              }
              if (message.mentions.members.first()) {
                message.channel.send("Now type in a reason that you want to ban this person, (it can be anything)");

                message.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: 30000}).then(collected => {
                let reason = collected.first().content;
                message.mentions.members.first().ban({reason: reason}).then((member) => {
                message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: with the reason: " + reason);

                }).catch(() => {
                  message.reply("Oops, something happened, I probably don't have the permissions to ban that user."+ message.mentions.members.first().displayName+"if you really want to ban this person, you should first remove their admin role.");
                });

                   }).catch(() => {
                       message.channel.send("I do not have permissions to do this");
                   });
               }else message.channel.send("You have to mention a user to ban!");
            }
if (message.content.toLowerCase().startsWith(prefix+"kick")){
              if (!message.member.hasPermission("ADMINISTRATOR")){
                message.channel.send("You don't have sufficient permissions to use that specified commmand.");
                return;
              }
              if (message.mentions.members.first()) {
                message.channel.send("Now type in a reason that you want to kick this person, (it can be anything)");

                message.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: 30000}).then(collected => {
                let reason = collected.first().content;
                message.mentions.members.first().kick({reason: reason}).then((member) => {
                message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: with the reason: " + reason);

                }).catch(() => {
                message.reply("Oops, something happened, I probably don't have the permissions to kick "+ message.mentions.members.first().displayName+" if you really want to kick this person, consider removing their admin role");
                });

                   }).catch(() => {
                       message.channel.send("I do not have permissions to do this.");
                   });
               }else message.channel.send("You have to mention a user to kick!");
            }
if (message.content.toLowerCase().startsWith(prefix+"help")){
  if (message.content.toLowerCase() === prefix+"help"){
    let help = new Discord.MessageEmbed()
      .setTitle('Help Menu')
      .setColor('#9c4cfb')
      .addFields(
      { name: prefix+'help admin', value: 'Administrator commands', inline: true },
      { name: prefix+'help about', value: 'About me', inline: true },
   )
      message.channel.send(help);
  }
  if (message.content.toLowerCase() === prefix+"help admin"){
       let help = new Discord.MessageEmbed()
         .setTitle('Help Admin Menu')
         .setColor('#9c4cfb')
         .addFields(
         { name: prefix+'blacklist `word`', value: 'Blacklists a word', inline: true },
         { name: prefix+'delist `word`', value: 'Unblacklists a word', inline: true },
         { name: prefix+'clear blacklist', value: 'Removes all words from the blacklist', inline: true },
         { name: prefix+'show blacklist', value: 'Displays the blacklist', inline: true },
         { name: prefix+'check infractions `@user`', value: 'Displays the infraction count for the specified user', inline: true },
         { name: prefix+"clear infractions `@user`", value: "Clears all the infractions for a specified user", inline: true },
         { name: prefix+'change prefix `new prefix`', value: "Changes the bot's prefix", inline: true},
         { name: prefix+'kick `@user`', value: 'Kicks specified user from the server', inline: true},
         { name: prefix+'ban `@user`', value: 'Bans specified user from the server', inline: true},
         { name: prefix+'set confidence', value: 'Every time an image is sent, I have a confidence for the chances of it being NSFW. Doing the command will explain what each confidence will do.', inline: true},
         { name: prefix+'change auto settings', value: 'Lets you customize the automatic kicking/banning system', inline: true},
         { name: prefix+'show settings', value: 'Shows all of the settings you have customized', inline: true},
         { name: prefix+'reset bot', value: 'Resets the bot and all its information. Only do this if there is a bug, but please report the bug first.', inline: true },
      )
         message.channel.send(help);

   }
  if (message.content.toLowerCase() === prefix+"help about"){
     let help = new Discord.MessageEmbed()
       .setTitle('About Me')
       .setColor('#9c4cfb')
       .setDescription("What do I do?\n I use advanced machine learning to detect NSFW components in an image. I then delete the image and do one or more of the following: \n 1. Increase the infraction count for the user\n 2. Kick the user after x infractions\n 3. Ban user after x infractions")
       message.channel.send(help);
   }
}
if (message.content.toLowerCase().startsWith(prefix+"change auto settings")){
  if (!message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send("You don't have enough permissions to run this command");
    return;
  }
  var mode;
  let option = await selOption();
  if (option === "restart"){
    message.channel.send("That isn't an option, please restart.");
    return;
  }else if (option === "1") mode = "kick"
  else if (option === "2") mode = "ban"
  let number = await selInfractions();
  if (number === "restart"){
    message.channel.send("That wasn't a valid number. Please restart the process.");
    return;
  }else if (number === "none") number = "none"
  if (mode === "kick"){
    updateDocumentSet(mongoclient, "serverSettings", {kick: number}, message);
  }else if (mode === "ban"){
    updateDocumentSet(mongoclient, "serverSettings", {ban: number}, message);
  }
  message.channel.send("Ok, I will now automatically "+mode+" a user when they reach "+ number+" infractions.")
  function selOption(){
    return new Promise(resolve => {
      let settings = new Discord.MessageEmbed()
      .setTitle("Select which option you want to change.")
      .setColor('#9c4cfb')
      .setDescription("1. Auto kicks\n2. Auto bans")
      .setFooter("Input 1 or 2")
    message.channel.send(settings);
      message.channel.awaitMessages(m => m.author.id === message.author.id,
      {max: 1, time: 30000}).then(collected => {
        if (collected.first().content === "1"||collected.first().content === "2"){
        resolve(collected.first().content);
      }else resolve("restart")
      }).catch(() => {
      message.channel.send('No answer after 30 seconds, operation canceled.');
      });
    });
  }
  function selInfractions(){
    return new Promise(resolve => {
      let embed = new Discord.MessageEmbed()
      .setTitle("Set the threshold of infractions for banning/kicking a user.")
      .setColor('#9c4cfb')
      .setDescription("Enter a number between 2 and 1000")
      .setFooter("If you want to set to never ban/kick based off of infractions, enter 'none'.")
    message.channel.send(embed);
      message.channel.awaitMessages(m => m.author.id === message.author.id,
      {max: 1, time: 30000}).then(collected => {
        if (collected.first().content.toLowerCase() === "none"){
          resolve("none")
        }else if (Number(collected.first().content).toString().toLowerCase() === "nan"){
          resolve("restart");
        }else if (Number(collected.first().content)>1000){
          resolve("restart")
        }else if (Number(collected.first().content)<2){
          resolve("restart")
        }else{
        resolve(Number(collected.first().content));
        }
      }).catch(() => {
      message.channel.send('No answer after 30 seconds, operation canceled.');
      });
    });
  }
}
if (message.content.toLowerCase() === prefix+"show settings"){
  let serverstats = await checkStuff(mongoclient, "serverSettings", message)
  var conf;
  var kicks;
  var bans;
  if (!serverstats.confidence){
    conf = "default-75"
  }else conf = serverstats.confidence
  if (!serverstats.kick) kicks = "default-(none)"
  else kicks = serverstats.kick;
  if (!serverstats.ban) bans = "default-(none)"
  else bans = serverstats.ban
  let random = new Discord.MessageEmbed()
  .setTitle("Server settings")
  .setColor('#9c4cfb')
  .setDescription("Current Prefix: "+prefix)
  .addFields(
    {name: "Blacklist", value: "Do "+prefix+"show blacklist to see the blacklist", inline: true},
    {name: "NSFW threshold", value: conf+"%", inline: true},
    {name: "Kicking threshold", value: kicks+" infractions", inline: true},
    {name: "Banning threshold", value: bans+" infractions", inline: true},
  )
  message.channel.send(random)
}

}catch(err){
  if (err) console.log(err)
}
}
});

////start of edited messages, so we can detect if someone edited their message, we can still delete it.
client.on('messageUpdate', (oldMessage, newMessage) => {
main();
  async function main(){
    try {
      //start of blacklist detection
      checkBadWord(mongoclient, newMessage);
      //start of image detection
     checkImage(mongoclient, newMessage);
    } catch (e) {
      console.error(e);
    }
  }

}
)

async function updateDocumentSet(mongoclient, name, updatedlisting, message){
            let result = await mongoclient.db("discordbot").collection(message.guild.id)
            .updateOne({ name: name}, {$set: updatedlisting});
}
async function createCollection(collectionname, message){
    //const uri = "mongodb+srv://monkey:monkey2008@cluster0.exqqa.mongodb.net/test";
    const db = mongoclient.db("discordbot");
    db.createCollection(collectionname, function(err, result){
      console.log ("Server Created!");

    })
  }
async function findOneListingByName(mongoclient, nameOfListing, tag, message){
    let result = await mongoclient.db("discordbot").collection(message.guild.id)
    .findOne({name: nameOfListing});
    if (result){
      let dbwords = JSON.parse(JSON.stringify(result));
      let random = new Discord.MessageEmbed()
      .setTitle(`${tag}'s stats'`)
        .addFields(
        { name: 'id: ', value: nameOfListing, inline: false },
    		{ name: 'infractions:', value: dbwords.infractions, inline: false },
    	)
        message.channel.send(random);
    }
    else{
      message.channel.send("either you did not specify a user, or that user does not exist, or that person has not signed up yet");
    }
  }
async function clearInfractions(mongoclient, name, updatedlisting, message){
    let result = await mongoclient.db("discordbot").collection(message.guild.id)
    .updateOne({ name: name}, {$set: updatedlisting});
    message.channel.send("Done");
  }
async function updateListing(mongoclient, updatedlisting, message){
     let result = await mongoclient.db("discordbot").collection(message.guild.id)
     .updateOne({ name: "serverSettings"}, {$push: updatedlisting});
     message.channel.send("Done");
   }
async function updateDelListing(mongoclient, updatedlisting, message){
        let result = await mongoclient.db("discordbot").collection(message.guild.id)
        .updateOne({name: "serverSettings"}, {$pull: updatedlisting});
        //console.log(result)
        if (Number(result.modifiedCount) === 0) message.channel.send("That was not delisted because there was no previous word called: "+updatedlisting.blacklist)
        else message.channel.send("Done")
      }
async function createListing(mongoclient, newWord, message){

      let result = await mongoclient.db("discordbot").collection(message.guild.id).insertOne(newWord);

    }
async function checkBadWord(mongoclient, message){
          let result = await mongoclient.db("discordbot").collection(message.guild.id)
          .findOne({ name: "serverSettings"});
          if (result){
            let dbwords = JSON.parse(JSON.stringify(result));
              for (var k = 0; k<dbwords.blacklist.length; k++){
                if ( message.content.toLowerCase().includes(dbwords.blacklist[k])){
                  message.delete();
                  let userid = message.author.id;
                message.channel.send('Message deleted and updated your infractions for the admins to see.');
                let random = Math.floor(Math.random()*10);
                    await updateInfractions(mongoclient, userid, 1, message);
                    return "stop";
                }
              }
          } else {
          }
          let dbwords = result;
        }
async function updateInfractions(mongoclient, nameOfListing, addpoints, message){
            let userid = message.author.id;
            let collection = message.guild.id;
            let result = await mongoclient.db("discordbot").collection(message.guild.id)
            .findOne({ name: userid});
            if (result){
              let lookup = JSON.parse(JSON.stringify(result));
              let numofpoints = lookup.infractions;
              let x = Number(numofpoints);
              let updatepoints = x + addpoints;

              result = await mongoclient.db("discordbot").collection(message.guild.id)
              .updateOne({ name: nameOfListing}, {$set: {infractions: updatepoints}})
            }
        }
async function findlisting(mongoclient, nameOfListing, message){
      let result = await mongoclient.db("discordbot").collection(message.guild.id)
      .findOne({name: nameOfListing});
      if (result){
        let authorpoints = JSON.parse(JSON.stringify(result));
        if (message.author.bot) return;
        let realpoints = authorpoints.points;
      }
      else {
        exists = 0;
        message.channel.send("the person you specified either doesn't have an acount yet, or you entered the id wrong.")
      }
    }
async function signup(mongoclient, message){
      let userid = message.author.id;
      let tag = message.author.tag
      let collection = message.guild.id;
      const db = mongoclient.db("discordbot");
      let testresult = await db.collection(message.guild.id).find( {"name": userid}).count();

      if (testresult === 0){
        await createListing(mongoclient,
        {
          name: userid,
          tag: tag,
          infractions: 0
        }, message)

        //message.channel.send("done.");
      }
      else {
        //message.channel.send("you cannot have two acounts, sorry");
      }
    }
async function checkStuff(mongoclient, name, message){
  let result = await mongoclient.db("discordbot").collection(message.guild.id)
  .findOne({name: name});
  if (result){
    return result;
  }
}
async function checkAutoKick(mongoclient, message){
  let serverstuff = await checkStuff(mongoclient, "serverSettings", message);
  var kickInfrac;
  var userprofile;
  if (!serverstuff.kick) return;
  if (serverstuff.kick === "none") return;
  kickInfrac = Number(serverstuff.kick);
  let result = await mongoclient.db("discordbot").collection(message.guild.id)
  .findOne({name: message.author.id});
  if (result){
    userprofile = JSON.parse(JSON.stringify(result));
   }
  //let userProfile = await checkStuff(mongoclient, message.author.id, message);
  if (Number(userprofile.infractions)>kickInfrac){
    message.channel.send("kicking this person because they reached the limit of infractions set by their admin.");
    await kick(message);
    await mongoclient.db("discordbot").collection(message.guild.id)
    .deleteOne({name: message.author.id});
  }
}
async function checkAutoBan(mongoclient, message){
  let serverstuff = await checkStuff(mongoclient, "serverSettings", message);
  var banInfrac;
  var userprofile;
  if (!serverstuff.ban) return;
  if (serverstuff.ban === "none") return;
  banInfrac = Number(serverstuff.ban);
  let result = await mongoclient.db("discordbot").collection(message.guild.id)
  .findOne({name: message.author.id});
  if (result){
    userprofile = JSON.parse(JSON.stringify(result));
   }
  //let userProfile = await checkStuff(mongoclient, message.author.id, message);
  if (Number(userprofile.infractions)>banInfrac){
    message.channel.send("banning this person because they reached the limit of infractions set by their admin.");
    await ban(message);
    await mongoclient.db("discordbot").collection(message.guild.id)
    .deleteOne({name: message.author.id});
  }
}
async function checkImage(mongoclient, message){
  ////////////
  if (message.channel.nsfw === true) return; //doesn't do image moderation if the discord channel's setting is set to true.
  //start of link moderation, since discord automatically shows links that are pictures
  var nsfai = new NSFAI("c7cfaa839ce94f61aa95016cd94837e7");
  let data = await checkStuff(mongoclient, "serverSettings", message);
  var setConfidence = 75;
  if (!data) setConfidence = 75;
  else
  setConfidence = 1-(data.confidence/100);
  //start of clipboard image moderation
    //if (!message.attachments) return;// checks if there is an image in the message
    var Attachment = (message.attachments).array();
    var image = Attachment[0]
    Attachment.forEach(function(attachment) { // cycles through all of the images if there are multiple
    nsfai.predict(image.url).then(async function(result) {
      if (result.sfw) {
        //this is safe for work section, so here nothing happens
        //this chunk of code is just for demo and testing purposes, becuase we don't wan't to send actual nsfw pics, and we only did it once to confirm that this wou
        if (Number(result.confidence)<setConfidence){
    message.delete();
    let userid = message.author.id;
    await updateInfractions(mongoclient, userid, 1, message)
    message.channel.send("User "+message.author.tag+" just sent a message that contains an image that is nsfw. My confidence in this is: "+ (1-Number(result.confidence))*100+"%");
    return;
  }
          //message.channel.send(`This image is safe for work with a confidence of ${Number(result.confidence)*100}%`);//used for testing purposes, but should be commented out.
          return;
      } else {
        //this detects bad stuff, and it will delete the message, give that user an infraction,
        //and send a message saying the something like this: "User joshy#4178 just sent a message that contains an image that is nsfw. My confidence is 94.39%"
        message.delete();
        let userid = message.author.id;
        await updateInfractions(mongoclient, userid, 1, message)
        message.channel.send("User "+message.author.tag+" just sent a message that contains an image that is nsfw. My confidence in this is: Definitely NSFW % ");
      }
  }).catch(function (error) {
  });
  })




  let string = message.content.toLowerCase();
  let position = string.indexOf("https://")
  var ending;
  string = string.slice(position)
  if (string.includes(".png"))
  ending = (string.indexOf(".png")+4)
  else if (string.includes(".jpeg"))
    ending = (string.indexOf(".jpeg")+5)
  else if (string.includes(".jpg"))
      ending = (string.indexOf(".jpg")+4)


  string = string.slice(0, ending)
  if (string === null) return;
  var matches = string.match(/\bhttps?:\/\/\S+/gi);
  let picUrl = matches
  if (picUrl === null) return;
  nsfai.predict(picUrl[0]).then(async function(result) {
    if (result.sfw) {
      //this is safe for work section, so here nothing happens
      if (Number(result.confidence)<setConfidence){
    message.delete();
    let userid = message.author.id;
    await updateInfractions(mongoclient, userid, 1, message)
    message.channel.send("User "+message.author.tag+" just sent a message that contains an image that is nsfw. My confidence in this is: "+ (1-Number(result.confidence))*100+"%");
    return;
  }
        //message.channel.send(`This image is safe for work with a confidence of ${Number(result.confidence)*100}%`);//used for testing purposes, but should be commented out.
        return;
    } else {
      //this detects bad stuff, and it will delete the message, give that user an infraction,
      //and send a message saying the something like this: "User joshy#4178 just sent a message that contains an image that is nsfw. My confidence is 94.39%"
      message.delete();
      let userid = message.author.id;
      await updateInfractions(mongoclient, userid, 1, message)
      message.channel.send("User "+message.author.tag+" just sent a message that contains an image that is nsfw. My confidence in this is: Definitely NSFW% ");
    }
  }).catch(function (error) {
  });


}
async function kick(message){
message.member.kick({reason: "Too much NSFW image posting"}).catch(err=>{
  message.channel.send(err.toString())
})
}
async function ban(message){
  message.member.ban({reason: "Too much NSFW image posting"}).catch(err=>{
    message.channel.send(err.toString())
  })
}
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
});
mongoclient.close();
