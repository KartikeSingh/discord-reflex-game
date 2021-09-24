const { Message, User } = require('discord.js');
const speed = require('./utility/speed');

class reflex {
    /**
     * Create a reflex game object
     * @param {Object} options The options for reflex game
     * @param {Array} options.words The array of random words
     * @param {"random" | Number} options.startAfter Time after which message collector starts
     * @param {Number} options.endIn Time after which message collector ends
     * @param {String} options.readyColor The color for ready embed
     * @param {String} options.readyTitle The title for ready embed
     * @param {String} options.startColor The color for start embed
     * @param {String} options.startTitle The title for start embed
     * @param {String} options.timeEndColor The color for embed sent when no one replied in time
     * @param {String} options.timeEndTitle The title for embed sent when no one replied in time
     * @param {String} options.endColor The color for embed sent when game is ended
     * @param {String} options.endTitle The title for embed sent when game is ended
     * @param {String} options.endDescription The title for embed sent when game is ended
     */
    constructor(options = {}) {
        this.endIn = options.endIn || 5000;
        this.startAfter = options.startAfter || "random";
        this.readyColor = options.readyColor || "#00d181";
        this.readyTitle = options.readyTitle || "Get ready to say what i want you to!";
        this.startColor = options.startColor || "#149ba3";
        this.startTitle = options.startTitle || "type \"{word}\" ( without quotes ) to win";
        this.timeEndColor = options.timeEndColor || "#ff0000";
        this.timeEndTitle = options.timeEndTitle || "You turtle are too damn slow";
        this.endColor = options.endColor || "#32df04";
        this.endTitle = options.endTitle || "The game ended";
        this.endDescription = options.endDescription || "The winner is **{winner}** They took **{time}** to respond";
        this.words = options.words || ["Taradiddle", "Fartlek", "Itadakimasu", "Bibliokept", "Cattywampus", "Schmooze", "Gobbledygook", "Slumgullion", "Flibbertigibbet", "Jackanapes", "Ragamuffin", "Whirligig", "Flibbertigibbet", "Fipple", "Ballyhoo", "Stumblebum", "Gardyloo", "Bumfuzzle", "Collywobbles", "Widdershins", "Abibliophobia", "Bumbershoot", "Pandiculation", "Snollygoster", "Nudiustertian", "Yarborough", "Comeuppance", "Donnybrook", "Brouhaha", "Pettifogger", "poggers", "Mollycoddle", "pogchimp", "Hoosegow", "Shisui", "Hullaballoo", "dattebayou", "Kawaii", "oniisan", "baka", "why??!!.."]

        if (typeof (this.endIn) !== "number") throw new Error(`The endIn param should be a number but we got ${JSON.stringify(this.endIn)}`);
        if (typeof (this.startAfter) !== "number") throw new Error(`The startAfter param should be a number but we got ${JSON.stringify(this.startAfter)}`);
        if (!Array.isArray(this.words) || this.words.length < 1) throw new Error("The words param should be an array but I got : " + JSON.stringify(this.words));

        Object.keys(this).filter(v => v !== "endIn" && v !== "startAfter" && v !== "words").forEach((v, i) => {
            if (typeof (this[v]) !== "string") throw new Error(`String type was expected for param ${v} but I got : ${JSON.stringify(this[v])}`);
        });

        this.words.forEach((v, i) => {
            if (typeof (v) !== "string") throw new Error(`Word should be an Array of string but we got ${JSON.stringify(v)} \nat : options.words[${index}]`)
        });
    }

    /**
     * Add a word to random word list
     * @param {String} word The word to Add
     * @returns {reflex} The class itself
     */
    async addWord(word) {
        if (typeof (word) !== "string") throw new Error("Only string can be added as a word");
        if (this.words.includes(word)) throw new Error(`${word} already exist in words list`);

        this.words.push(word);

        return this.words;
    }

    /**
     * remove a word from the random word list
     * @param {String} word The word to Add
     * @returns {reflex} The class itself
     */
    async removeWord(word) {
        if (typeof (word) !== "string") throw new Error("Only string can be removed from the word list");
        if (!this.words.includes(word)) throw new Error(`${word} do not exist in words list`);

        this.words = this.words.filter(v => v.toLowerCase() !== word);

        return this.words;
    }

    /**
     * Start a solo mode for a user
     * @param {Message} message The message in which command was used.
     * @returns {void | Error}
     */
    async solo(message) {
        if (!message || typeof (message) !== "object" || !message.channel || !message.author) throw new Error("Please provided a valid message Object");

        let randomWord = this.words[Math.floor(Math.random() * this.words.length)];

        return speed.bind(this)(m =>  m.author.id === message.author.id && m.content.toLowerCase() === randomWord.toLowerCase(), message, randomWord);
    }

    /**
     * Start a duo mode for two players
     * @param {Message} message The message in which command was used.
     * @param {User} player2 The econd player
     * @returns {void | Error}
     */
    async duo(message, player2) {
        if (!message || typeof (message) !== "object" || !message.channel || !message.author) throw new Error("Please provided a valid message Object");
        if (!player2 || typeof (player2) !== "object" || !player2.username) throw new Error("Please provided a valid player 2 Object, It should be a user object");

        let randomWord = this.words[Math.floor(Math.random() * this.words.length)];

        return speed.bind(this)(m => (m.author.id === message.author.id || m.author.id === player2.id) && m.content.toLowerCase() === randomWord.toLowerCase(), message, randomWord);
    }

    /**
     * Start a party mode for all human users
     * @param {Message} message The message in which command was used.
     * @returns {void | Error}
     */
    async party(message) {
        if (!message || typeof (message) !== "object" || !message.channel || !message.author) throw new Error("Please provided a valid message Object");

        let randomWord = this.words[Math.floor(Math.random() * this.words.length)];

        return speed.bind(this)(m => !m.bot && m.content.toLowerCase() === randomWord.toLowerCase(), message, randomWord);
    }
}

module.exports = reflex;