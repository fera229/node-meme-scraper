import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

async function fetchImgs(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const imgUrls = [];

    $('img').each((index, element) => {
      if (imgUrls.length < 10) {
        const imgURL = $(element).attr('src');
        imgUrls.push(imgURL);
      }
    });
    console.log(imgUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

await fetchImgs('https://memegen-link-examples-upleveled.netlify.app/');
