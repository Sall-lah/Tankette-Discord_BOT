module.exports = async (title) => {
    let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(e){
        console.log(e);
    }
};

