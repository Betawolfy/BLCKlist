const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription('Submit a blacklist.')
        .addStringOption(option =>
            option.setName('main_username')
                .setDescription('The username of the main account')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('main_displayname')
                .setDescription('The display name of the main account')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('main_id')
                .setDescription('The ID of the main account')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('blacklist_reason')
                .setDescription('The reason for blacklisting')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('proof')
                .setDescription('Proof of blacklisting (e.g., googledoc/rentry/imgur picture)')
                .setRequired(true))
        .addStringOption(option =>
                    option.setName('submitter_id')
                        .setDescription('Proof of blacklisting (e.g., googledoc/rentry/imgur picture)')
                        .setRequired(true)),
    async execute(interaction) {
        const main_username = interaction.options.getString('main_username');
        const main_displayname = interaction.options.getString('main_displayname');
        const main_id = interaction.options.getString('main_id');
        const blacklist_reason = interaction.options.getString('blacklist_reason');
        const proof = interaction.options.getString('proof');
        const Submitter_regiment = interaction.options.getString('submitter_id');

        // Read existing submissions from submission.json
        let submissions = [];
        try {
            const data = fs.readFileSync('submission.json', 'utf8');
            submissions = JSON.parse(data);
        } catch (err) {
            console.error(err);
        }

        // Generate the ID based on the number of existing submissions
        const id = submissions.length + 1;

        // Create a submission object
        const submission = {
            id: id,
            main_username: main_username,
            main_displayname: main_displayname,
            main_id: main_id,
            blacklist_reason: blacklist_reason,
            proof: proof || null,
            blacklist_date: new Date().toISOString(),
            Submitter_id: interaction.guild.id,
            Submitter_username: interaction.user.username,
            //Submitter_regiment: interaction.guild.name,
            Submitter_regiment: Submitter_regiment,
            Submitter_date: new Date().toISOString()
        };

        // Write the submission to submission.json
        submissions.push(submission);
        fs.writeFile('submission.json', JSON.stringify(submissions), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Submission saved to submission.json');
        });

        // Send a confirmation message
        await interaction.reply('Blacklist submission received. Thank you!');
    }
};
