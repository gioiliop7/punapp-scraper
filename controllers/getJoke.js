const getConfig = require("./requestConfig");

module.exports = function () {
  const axios = require("axios");

  const getJokes = async function () {
    let lastPage = false;
    let page = 1;
    try {
      const jokesArray = [];
      while (lastPage == false) {
        const url = `https://punapp.gr/api/v1/posts/latest?page=${page}`;
        let config = getConfig(url, "post");
        const response = await axios(config);
        const data = response.data.data;
        const isLastPage = response.data.isLastPage;
        if (isLastPage && isLastPage == true) lastPage = true;
        data.forEach((e) => {
          let content = e.content;
          content = content.replaceAll("<br>", "");
          jokesArray.push(content);
        });
        page++;
      }
      return jokesArray;
    } catch (error) {
      console.error(error);
    }
  };

  async function selectRandomJoke() {
    const jokes = await getJokes();
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  async function randomJoke() {
    const randomJoke = await selectRandomJoke();
    console.log(randomJoke);
  }

  randomJoke()
};
