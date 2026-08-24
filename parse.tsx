import React from 'react';
import { renderToString } from 'react-dom/server';
import * as cheerio from 'cheerio';
import App from './App.tsx';

const html = renderToString(<App />);
const $ = cheerio.load(`<div id="root">${html}</div>`);

const selector = 'div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > a:nth-of-type(1)';
const el = $(selector);

console.log("Found:", el.length);
if (el.length > 0) {
  console.log("HTML:", $.html(el));
  console.log("Text:", el.text());
} else {
  console.log("Not found with exact selector. Let's try matching parts.");
  const appDiv = $('div#root > div');
  console.log("appDiv length:", appDiv.length);
  const div3 = appDiv.find('> div:nth-of-type(3)');
  console.log("div3 length:", div3.length);
  console.log("div3 class:", div3.attr('class'));
  const div1 = div3.find('> div:nth-of-type(1)');
  console.log("div1 inside div3 length:", div1.length);
  console.log("div1 inside div3 class:", div1.attr('class'));
  const a1 = div1.find('> a:nth-of-type(1)');
  console.log("a1 inside div1 length:", a1.length);
  console.log("HTML of div1 inside div3:", $.html(div1));
}
