module.exports = (player) => {
    let string = "Alive:\n";
    player.alive.forEach(id => { string += `<@${id}>\n` });
    string += "Dead:\n";
    player.dead.forEach(id => { string += `<@${id}>\n` });
    return string;
};