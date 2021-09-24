const { MessageCollector } = require('discord.js');
const ms = require('ms-prettify');

module.exports = function speed(filter, message, word) {
    return new Promise(async (res, rej) => {
        try {
            let msg = await message.channel.send({ embeds: [{ color: this.readyColor, title: this.readyTitle }] });

            await new Promise(res => setTimeout(res, this.startAfter === "random" ? Math.random() * 3500 + 1000 : this.startAfter));

            msg = await msg.edit({ embeds: [{ color: this.startColor, title: this.startTitle.replace(/{word}/g, word) }] });

            const start = Date.now();

            const collector = msg.channel.createMessageCollector({ time: this.endIn, filter: filter });

            collector.on('collect', (m) => {
                collector.stop(m.author);
            });

            collector.on('end', (f, r) => {
                if (r === "time") {
                    message.channel.send({ embeds: [{ color: this.timeEndColor, title: this.timeEndTitle }] });
                    return;
                }

                let time = ms(Date.now() - start, {
                    expanded: true,
                });

                message.channel.send({ embeds: [{ color: this.endColor, title: this.endTitle.replace(/{winner}/g, r.username).replace(/{time}/g, time), description: this.endDescription.replace(/{winner}/g, r.username).replace(/{time}/g, time) }] })

                res();
            });
        } catch (e) {
            rej(e);
        }
    })
}