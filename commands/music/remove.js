module.exports.run = async (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id), member = message.guild.members.cache.get(message.author.id);
  if (!queue) return message.channel.send(client.comment(`There is nothing playing.`));
  if (member.voice.channel !== member.guild.me.voice.channel) return message.channel.send(client.comment(`You need to be in the same voice channel as the bot!`));
  if (!args.length || isNaN(args[0])) return client.src.invalid(message);
  const song = queue.songs.splice(args[0] - 1, 1);
  queue.textChannel.send(client.comment(`❌ removed '${song[0].title}' from the queue.`));
  return client.log(message);
}

module.exports.code = {
  title: "remove",
  about: "Remove a track from the queue",
  usage: ["%P% remove"],
}