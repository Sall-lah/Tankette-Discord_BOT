const fetchUserByID = async(id) => {
    const api_response = await fetch(`https://discord.com/api/v10/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        });
        return await api_response.json();
}

module.exports = {fetchUserByID};