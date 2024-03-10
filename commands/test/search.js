const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search a user in the blacklist.')
        .addNumberOption(option =>
            option.setName('main_id')
                .setDescription('The main_id of the user to search.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('main_username')
                .setDescription('The main_username of the user to search.')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('id')
                .setDescription('The id of the user to search.')
                .setRequired(false)),
    async execute(interaction) {
        const main_id = interaction.options.getNumber('main_id');
        const main_username = interaction.options.getString('main_username');
        const id = interaction.options.getNumber('id');

        const blacklistDir = path.join(__dirname, '..', '..', 'blacklist');
        const regiments = fs.readdirSync(blacklistDir);
        const found = [];

        for (const regiment of regiments) {
            const regimentDir = path.join(blacklistDir, regiment);
            const files = fs.readdirSync(regimentDir);

            for (const file of files) {
                const data = require(path.join(regimentDir, file));

                if (main_id && file.replace('.json', '') === String(main_id)) {
                    found.push({ regiment, reason: data.blacklist_reason });
                } else if ((main_username && data.main_username === main_username) || (id && data.id === id)) {
                    found.push({ regiment, reason: data.blacklist_reason });
                }
            }
        }

        if (found.length === 0) {
            return interaction.reply({ content: 'No occurrences found.', ephemeral: true });
        }

        const reasons = [...new Set(found.map(f => f.reason))].join(', ');
        const regimentsFound = found.map(f => f.regiment).join(', ');

        return interaction.reply({ content: `🟢 - Occurrence found!\n-> On ${regimentsFound}\n> Blacklisted for following reason(s): ${reasons}`, ephemeral: true });
    },
};