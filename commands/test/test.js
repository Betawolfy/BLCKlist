const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Sends a greeting and a farewell message.'),
    async execute(interaction) {
        await interaction.reply('Hello world!');
        await interaction.followUp('Goodbye darkness.');
    },
};