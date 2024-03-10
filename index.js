// Import the all the necessary modules
const config = require('./config')
const { Client, ActivityType, Collection, Events, Guilds } = require('discord.js')
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { Database } = require('quickmongo');
const os = require('os');

const db = new Database(config.connectionString);

db.on("ready", () => {
    console.log("Connected to the database");
    doStuff();
});

// Create a new client with the necessary intents
const client = new Client({
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildMessageReactions',
        'MessageContent',
        'GuildMembers',
        'GuildPresences',
    ],
});

client.on('ready', () => {
    const status = "BLCKlist v0.1"
    var d = new Date();

    // Enregistrez l'heure de d but
    const start = Date.now();
    // Une fois que le bot a d marr 
    const end = Date.now();

    console.log(`${client.user.tag} is starting...\n\n
    OS Name: ${os.type()} v${os.release()} \n
    Copyright (c) 2024, APLEBOT team, inc\n\n
    Processor: ${os.cpus()[0].model}\n
    Memory test: ${Math.round(os.totalmem() / 1024 / 1024)} M Ok\n\n
    Startup time: ${end - start} ms\n 
    current time :` + new Date().toLocaleString() + `\n\n
    Award Plug and Play BIOS Exension v1.0A\nInictialize Plug and Play Card...\n
    PnP init Completed\n\n
    Detecting Primary Master ... ${os.userInfo().username}\n
    Detecting Primary System ... ${os.type()}\n
    Detecting Secondary Master ... Skip\n
    Detecting Secondary System ... none_\n\n
    Press <DEL> to enter SETUP, <ALT-F2> to enter PER-SERVER SETTINGS
    \n\n\n\n Loading ${status}`);
    console.log(`Ready! Logged in as ${client.user.tag}.`);

    client.user.setActivity(`${status}`, {
        type: ActivityType.Watching,
    })
    console.log(`actual status of the client: ${status}. `)
});

client.commands = new Collection();

client.categories = new Collection();

// const commandsPath = path.join(__dirname, 'commands');
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);
// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     // Set a new item in the Collection with the key as the command name and the value as the exported module
//     if ('data' in command && 'execute' in command) {
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//     }
//   }
// }

// command handler
const commandsFolder = path.join(__dirname, "commands");
const categories = fs.readdirSync(commandsFolder);

for (const category of categories) {
  const details = require(`${commandsFolder}/${category}/details.json`);
    console.log(category);
    const categoryFolderContent = fs.readdirSync(path.join(commandsFolder, category));
    const commandFiles = categoryFolderContent.filter(file => file.endsWith(".js"));
    const commandsName = [];
    
    for (const commandFile of commandFiles) {
        const commandName = commandFile.replace(".js", "");
        /** @type {import("../types/command")} */
        const command = require(`${commandsFolder}/${category}/${commandFile}`);
        
        // On ajoute la commande à la catégorie.
        commandsName.push(commandName);
        
        // On ajoute la catégorie a la collection.
        client.commands.set(commandName, {
            category,
            ...command
        });

        console.log(`La commande ${commandName} a bien été chargée !`);
    }
    
    // On définit toutes les commandes dans cette catégorie.
    client.categories.set(category, {
        details,
        commandsName
    });
    console.log(`La catégorie ${category} a bien été chargée !`);
}

// command execution
client.on(Events.InteractionCreate, async interaction => {

  if (interaction.isCommand()) {
    /**
     * Log message containing the date, channel ID, executed command, and user tag.
     * @type {string}
     */
    const logMessage = `Date: ${new Date().toISOString()}, Canal: ${interaction.channelId}, Commande ex cut e: ${interaction.commandName} par ${interaction.user.tag}\n`;
    fs.appendFile('logs.txt', logMessage, err => {
      if (err) {
        console.error('Erreur lors de l\' criture du fichier de log:', err);
      }
    });
  }

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {

      const errorImages = [
        'https://i.imgur.com/ee6uxBE.png',
        'https://i.imgur.com/G9MPjzA.png',
        'https://i.imgur.com/7wBeubr.png'
      ];

      const randomImage = errorImages[Math.floor(Math.random() * errorImages.length)];



      await interaction.followUp({ content: `e`, ephemeral: true });
    } else {

      const errorImages = [
        'https://i.imgur.com/ee6uxBE.png',
        'https://i.imgur.com/G9MPjzA.png',
        'https://i.imgur.com/7wBeubr.png'
      ];

      const specialImage = 'https://i.imgur.com/60vwsSO.png';

      // Cr er un tableau de 50 images, o  49 sont des images d'erreur normales et 1 est l'image sp ciale
      const images = [];
      for (let i = 0; i < 28; i++) {
        images.push(errorImages[i % errorImages.length]);
      }
      images.push(specialImage);

      // S lectionner une image au hasard
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const errorMessages = [
        `There was an error while executing this command!\n ${randomImage}`,
        `An error occurred while executing this command!\n ${randomImage}`,
        `I'm sorry, what the actual frick you mean?\n ${randomImage}`
      ]

      const randomMessages = errorMessages[Math.floor(Math.random() * errorMessages.length)];

      await interaction.reply({ content: `<:BOOT_msg_warning0:1175379265743761428> - ${randomMessages}`, ephemeral: true });
    }
  }
});

// Log the bot in using the token from the config file
client.login(config.token)