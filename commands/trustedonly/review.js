const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('review')
        .setDescription('Review a user\'s blacklist.')
        .addNumberOption(option =>
            option.setName('id')
                .setDescription('The ID of the blacklist to review.')
                .setRequired(true)),
    async execute(interaction) {
        // Get the blacklist ID from the interaction
        const blacklistId = interaction.options.getNumber('id');

        try {
            // Read the submission.json file
            const data = fs.readFileSync('submission.json', 'utf8');
            const submissions = JSON.parse(data);

            // Find the submission with the matching ID
            const submission = submissions.find(sub => sub.id === blacklistId);

            if (submission) {
                // Extract the required information from the submission
                const { main_username, main_displayname, main_id, blacklist_reason, proof, blacklist_date, Submitter_id, Submitter_username, Submitter_regiment, Submitter_date } = submission;

                // Create an embed with the blacklist information
const blacklistEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Blacklist ID: ${submission.id} - ${main_username} sended from ${Submitter_regiment}`)
    .setAuthor({ 
        name: `${Submitter_username} from ${Submitter_regiment})`, 
        iconURL: 'https://i.imgur.com/AfFp7pu.png', // URL de l'icône de votre choix
        url: 'https://betawolfy.xyz' // URL de votre choix
    })
    .setDescription('Revew of a blacklist. Please review the information below and take the appropriate action.')
    .addFields(
        { name: 'Main Username', value: main_username || 'N/A', inline: false },
        { name: 'Main Display Name', value: main_displayname || 'N/A', inline: false },
        { name: 'Main ID', value: main_id || 'N/A', inline: false },
        { name: '\u200B', value: '\u200B', inline: false  },
    )
    .addFields(
        { name: 'Reason', value: blacklist_reason },
        { name: 'Proof', value: proof, inline: false },
        { name: 'Blacklist Date', value: blacklist_date, inline: false },
        { name: '\u200B', value: '\u200B', inline: false  },
    )
    .addFields(
        { name: 'Submitter ID', value: Submitter_id, inline: false },
        { name: 'Submitter Username', value: Submitter_username, inline: false },
        { name: 'Submitter Regiment', value: Submitter_regiment, inline: false },
        { name: 'Submitter Date', value: Submitter_date, inline: false },
    )
    .setFooter({ text: `submitted the ${Submitter_date}`, iconURL: 'https://i.imgur.com/siVDhIZ.png' }); // Texte et URL de l'icône de votre choix

                // Send the embed as a reply
                await interaction.reply({ embeds: [blacklistEmbed] });
            } else {
                // No submission found with the given ID
                await interaction.reply('No blacklist found with the given ID.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while retrieving the blacklist information.');
        }
    }
};