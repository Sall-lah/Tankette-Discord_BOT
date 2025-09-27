module.exports = ((client, interaction, playerIds) =>{
    const totalPlayer = playerIds.length;

    // Pick the Saboteur(Killer) by random;
    const rollNumber = Math.floor(Math.random() * totalPlayer);

    const killer = playerIds[rollNumber];
    const crew = playerIds.filter(id => id != rollNumber);

    
});