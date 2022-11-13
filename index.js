const DiscordJS = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const rollTheDice = (dice) => {
  return Math.floor(Math.random() * dice) + 1;
};

const rollThe100 = () => {
  const tens = Math.floor(Math.random() * 10);
  const unity = Math.floor(Math.random() * 10);
  if (tens === 0 && unity === 0) return (res = 100);
  else return (res = Number('' + tens + unity));
};

const rollDis100 = (quantity) => {
  let result = 100;
  for (let i = 0; i < quantity; i++) {
    const num = rollThe100();
    if (result > num) {
      result = num;
    }
  }
  return result;
};

const rollAdv100 = (quantity) => {
  let result = 0;
  for (let i = 0; i < quantity; i++) {
    const num = rollThe100();
    if (result < num) {
      result = num;
    }
  }
  return result;
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('Bot is ready');

  const guildId = '719593089320353822';
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: 'roll',
    description: 'Rzut koscia wariacie',
    options: [
      {
        name: 'dice',
        description: 'Jaka kostka? Wariacie',
        required: true,
        type: DiscordJS.ApplicationCommandOptionType.Number,
      },
    ],
  });

  commands?.create({
    name: 'roll20',
    description: 'poprostu 20 lol',
  });

  commands?.create({
    name: 'roll100',
    description: 'Rzut k100 :)',
  });

  commands?.create({
    name: 'rolld',
    description: 'Rzut k100 z utrudnieniem',
    options: [
      {
        name: 'quantity',
        description: 'ile utrudnien? Byczku',
        required: true,
        type: DiscordJS.ApplicationCommandOptionType.Number,
      },
    ],
  });

  commands?.create({
    name: 'rolla',
    description: 'Rzut k100 z utrudnieniem',
    options: [
      {
        name: 'quantity',
        description: 'ile ulatwienie? Kolo',
        required: true,
        type: DiscordJS.ApplicationCommandOptionType.Number,
      },
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;
  console.log(commandName);

  switch (commandName) {
    case 'roll':
      const num = options.getNumber('dice');
      let result = rollTheDice(num);

      await interaction.reply({
        content: `Wynik na k${num} to ${result}`,
      });
      break;
    case 'roll20':
      let d20 = rollTheDice(20);

      await interaction.reply({
        content: `Wynik na k20 to ${d20}`,
      });
      break;
    case 'roll100':
      const d100 = rollTheDice(100);

      await interaction.reply({
        content: `Wynik na k100 to ${d100}`,
      });
      break;
    case 'rolld':
      const dis = options.getNumber('quantity');
      const disResult = rollDis100(dis);
      await interaction.reply({
        content: `Wynik na k100 to ${disResult}`,
      });
      break;
    case 'rolla':
      const adv = options.getNumber('quantity');
      const advResult = rollAdv100(adv);
      await interaction.reply({
        content: `Wynik na k100 to ${advResult}`,
      });
    default:
      await interaction.reply({
        content: 'Not Found',
      });
      break;
  }
});

client.login(process.env.TOKEN);
