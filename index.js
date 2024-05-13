import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

let memesDir = path.join(process.cwd(), 'memes');
if (!fs.existsSync(memesDir)) {
  fs.mkdirSync(memesDir);
}

async function fetchAndDownloadImgs() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const imgUrls = [];

    memesDir = path.join(process.cwd(), 'memes');

    $('img').each((index, element) => {
      const imgURL = $(element).attr('src');

      if (imgUrls.length < 10) {
        imgUrls.push(imgURL);
      }
    });
    // console.log(imgUrls);
    for (let i = 0; i < imgUrls.length; i++) {
      const currentImgUrl = imgUrls[i];
      const fileNumber = String(i + 1).padStart(2, '0');
      const filePath = path.join(memesDir, `${fileNumber}.jpeg`);

      // download binary data via axios with response type as array buffer
      const response = await axios.get(currentImgUrl, {
        responseType: 'arraybuffer',
      });

      // write the data locally to a file
      fs.writeFileSync(filePath, response.data);
      console.log(`Downloaded: ${filePath}`);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

await fetchAndDownloadImgs(url);
