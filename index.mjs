// const API_KEY = 'H3P75KmBbzpyr5K9gSjzyAohSWX2QSaV';

export const handler = async (event) => {
  const q = event['queryStringParameters']['q'];
  const API_KEY = event['queryStringParameters']['api_key'];

  if (!API_KEY) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'API Key is missing' })
    }
  }
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Search Param is missing' })
    }
  }
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}`)

      if (!response.ok) return JSON.stringify({ message: `GIPHY API error: ${response}` });
      const data = await response.json();
      if (!data.data || data.data.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'There is no gif for the given search parameter' })
        }
      }
      const gifUrl = data?.data[0]?.images.original.url;
      const htmlContent = 
      `
        <img src=${gifUrl} alt='Giphy gif'/> 
      `
       

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        },
        body:  htmlContent
      };

    } catch (error) {
      console.log("Error: ", JSON.stringify(error.message));
    }
}

