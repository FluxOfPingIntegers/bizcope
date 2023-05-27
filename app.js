const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.get('/scrape/*', (req, res) => {
  const domain = req.params[0];
  const baseUrl = decodeURIComponent(domain);

  const emails = new Set();
  const linkedInAccounts = new Set();
  const visitedUrls = new Set();
  const urlsToVisit = [baseUrl];

  function crawl() {
    if (urlsToVisit.length === 0) {
      res.json({ emails: [...emails], linkedInAccounts: [...linkedInAccounts] });
      return;
    }

    const nextUrl = urlsToVisit.pop();
    visitedUrls.add(nextUrl);

    axios.get(nextUrl)
      .then(response => {
        const html = response.data;

        if (response.status === 200) {
          const $ = cheerio.load(html);

          $('a').each((i, link) => {
            const href = $(link).attr('href');

            if (href) {
              if (href.startsWith('mailto:')) {
                const email = href.replace('mailto:', '');
                emails.add(email);
              } else if (href.includes('linkedin.com')) {
                const linkedInUrl = new URL(href);
                const linkedInAccount = "https://www.linkedin.com/" + linkedInUrl.pathname.substr(1);
                linkedInAccounts.add(linkedInAccount);
              } else {
                const absoluteUrl = url.resolve(baseUrl, href);
                if (absoluteUrl.startsWith(baseUrl) && !visitedUrls.has(absoluteUrl)) {
                  urlsToVisit.push(absoluteUrl);
                }
              }
            }
          });

          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          const text = $('body').text();
          const matches = text.match(emailRegex);

          if (matches) {
            for (const match of matches) {
              if (match.endsWith(`@${domain}`)) {
                emails.add(match);
              }
            }
          }
        }

        crawl();
      })
      .catch(error => {
        console.log('Error:', error.message);
        crawl();
      });
  }

  if (baseUrl.startsWith('https://')) {
    axios.head(baseUrl)
      .then(response => {
        if (response.status === 200) {
          crawl();
        } else {
          const secureBaseUrl = `https://${domain}`;
          urlsToVisit[0] = secureBaseUrl;
          crawl();
        }
      })
      .catch(error => {
        console.log('Error:', error.message);
        crawl();
      });
  } else {
    crawl();
  }
});

const port =process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
