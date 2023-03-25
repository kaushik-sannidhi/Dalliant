const hereco = async (url) => {
    const cohereApiKey = 'uOojAENFsI7Pr6AzK1OP0j8xLPgGR8x0k2yIBhxR';
    const cohereEndpointUrl = 'https://api.cohere.ai/classify';

    const cohereReq = {
        model: 'fb532845-9e54-40cb-bdfa-20ab37c36ef5-ft',
        inputs: [url]
    };

    const reqBody = JSON.stringify(cohereReq);

    const response = await fetch(cohereEndpointUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cohereApiKey}`,
            'Content-Type': 'application/json'
        },
        body: reqBody
    });

    const responseBody = await response.json();
    return responseBody.classifications[0].prediction;
};

const maxEntertainmentTime = (parseInt(ent_h) * 60) + parseInt(ent_m);
const maxShoppingTime = (parseInt(sh_h) * 60) + parseInt(sh_m);
const maxEducationTime = (parseInt(ed_h) * 60) + parseInt(ed_m);
const maxNewsTime = (parseInt(ne_h) * 60) + parseInt(ne_m);

const startTime = Date.now();

const getTimeSpent = (startTime) => {
    const currentTime = Date.now();
    return Math.floor((currentTime - startTime) / 60000);
};

const blockedGenres = [];

window.addEventListener('load', async () => {
    const timeSpentOnEntertainment = getTimeSpent(startTime);
    if (timeSpentOnEntertainment >= maxEntertainmentTime) {
        blockedGenres.push("Entertainment");
    }

    const timeSpentOnShopping = getTimeSpent(startTime);
    if (timeSpentOnShopping >= maxShoppingTime) {
        blockedGenres.push("Shopping");
    }

    const timeSpentOnEducation = getTimeSpent(startTime);
    if (timeSpentOnEducation >= maxEducationTime) {
        blockedGenres.push("Education");
    }

    const timeSpentOnNews = getTimeSpent(startTime);
    if (timeSpentOnNews >= maxNewsTime) {
        blockedGenres.push("News");
    }

    const url = window.location.href;
    const genre = await hereco(url);
    if (blockedGenres.includes(genre)) {
        document.querySelector('body').innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #881fe1; z-index: 999999;">
        <p style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 66px; font-weight: bold; color: #fff; text-align: center;">
          The website is blocked!
        </p>
      </div>
    `;
    }
});
