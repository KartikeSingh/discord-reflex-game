# Installations
```
npm i discord-reflex-speed
```

# Introduction 
This package is for seeing who have the best reflexes.
In this game / package bot sends a message than after x amount of time user have to repond with aWord to win, The first person to send the word wins.

# How ? 
```js
const reflex = require("discord-reflex-speed");
const game = new reflex();

/**
 * Start a solo mode for a user
 * @param {Message} message The message in which command was used.
 * @returns {void | Error}
 */
game.solo(message)

/**
 * Start a duo mode for two players
 * @param {Message} message The message in which command was used.
 * @param {User} player2 The econd player
 * @returns {void | Error}
 */
game.duo(message, player2)

/**
 * Start a party mode for all human users
 * @param {Message} message The message in which command was used.
 * @returns {void | Error}
 */
game.party(message)
```

# Advanced Settings
```js
const reflex = require("discord-reflex-speed");

/**
  * The options for relfex game
  * @property {Array} words The array of random words
  * @property {"random" | Number} startAfter Time after which message collector starts
  * @property {Number} endIn Time after which message collector ends
  * @property {String} readyColor The color for ready embed
  * @property {String} readyTitle The title for ready embed
  * @property {String} startColor The color for start embed
  * @property {String} startTitle The title for start embed
  * @property {String} timeEndColor The color for embed sent when no one replied in time
  * @property {String} timeEndTitle The title for embed sent when no one replied in time
  * @property {String} endColor The color for embed sent when game is ended
  * @property {String} endTitle The title for embed sent when game is ended
  * @property {String} endDescription The title for embed sent when game is ended
  */
const game = new reflex({
    // Normal game settings 
    endIn: 6969,
    startAfter: "random", // or time in millseconds

    // Embed settings when game is getting ready
    readyColor: "#fr7434",
    readyTitle: "Get your toes ready",

    // Embed settings when game is started
    startColor: "#1c64e3",
    startTitle: "TYPE {word} FAST AS F else you looooose",

    // Embed settings when game ends after a timeout
    timeEndColor: "#000000",
    timeEndTitle: "You all are faliures",

    // Embed settings when game is ended
    endTitle: "GAME ENDEDED",
    endDescription: "Game ended winner is : {winner} in time {time}",
    endColor: "#ff0000",

    // The array of random words
    words: ["hi", "die"]
})
```

# Images
- ## Ready
![ready.png](https://cdn.discordapp.com/attachments/880732844220100608/890866564470046760/unknown.png)

- ## Started
![started.png](https://cdn.discordapp.com/attachments/880732844220100608/890865312369635338/unknown.png)

- ## Time end
![timeend.png](https://cdn.discordapp.com/attachments/880732844220100608/890865697956200468/unknown.png)

- ## Game end
![end.png](https://cdn.discordapp.com/attachments/880732844220100608/890866410870435890/unknown.png)

# Support
for support or issues or queries contace me on my [discord server](https://discord.gg/XYnMTQNTFh).