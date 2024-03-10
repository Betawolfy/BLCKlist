const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtoblacklist')
        .setDescription('Add a user to the blacklist.')
        .addNumberOption(option =>
            option.setName('id')
                .setDescription('The ID of the blacklist to review.')
                .setRequired(true)),
    async execute(interaction) {
        const id = interaction.options.getNumber('id');

        const submissions = require('../../submission.json');

        const submission = submissions.find(sub => sub.id === id);

        if (!submission) {
            return interaction.reply({ content: 'The provided ID does not match any in the submission.json file.', ephemeral: true });
        }

        const dir = path.join(__dirname, '..', '..', 'blacklist', submission.Submitter_regiment);

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

         fs.writeFileSync(path.join(dir, `${submission.main_id}.json`), JSON.stringify(submission, null, 2));

        return interaction.reply({ content: 'The blacklist entry has been successfully created.', ephemeral: true });
    },
};
