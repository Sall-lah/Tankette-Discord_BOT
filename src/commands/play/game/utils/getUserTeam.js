module.exports = (team) => {
    let string = "Traitor:\n";
    team.traitor.forEach(id => { string += `<@${id}>\n` });
    string += "Crew:\n";
    team.crew.forEach(id => { string += `<@${id}>\n` });
    return string;
};