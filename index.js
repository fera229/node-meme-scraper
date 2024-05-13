import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

async function fetchImgs(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const imgUrls = [];

    const memesDir = path.join(process.cwd(), 'memes');

    $('img').each((index, element) => {
      if (imgUrls.length < 10) {
        const imgURL = $(element).attr('src');
        imgUrls.push(imgURL);
      }
    });
    console.log(imgUrls);
    for (let i = 0; i < imgUrls.length; i++) {
      const currentImgUrl = imgUrls[i];
      const fileNumber = String(i + 1).padStart(2, '0');
      const filePath = (memesDir, `${fileNumber}.jpeg`);
      console.log(fileNumber);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

await fetchImgs(url);
