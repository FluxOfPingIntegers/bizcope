# Bizcope

## Description
The Bizcope API is a Node/Express application. It is designed to scrape LinkedIn accounts and email addresses from any given URL and present the results in JSON format.  The Bizcope API is currently deployed [here](https://bizcope.onrender.com/scrape/).  NOTE: remember to append the URL you wish to scrape to the link!

The API utilizes the following technologies:
- Node.js
- Express.js
- Axios
- Cheerio
- URL

## Getting Started
To get started with the Bizcope API, follow the installation instructions below.

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:
```bash
npm install
```
4. Start the API server with the following command:
```bash
node app.js
```
5. The server will start listening on port 3000. You can access the API endpoints using `http://localhost:3000`.

## Usage
To use the Bizcope API, make a GET request to the `/scrape/*` endpoint with the desired URL to scrape. The URL should be URL-encoded and appended to the `/scrape/` path.

Example:
```bash
GET /scrape/http%3A%2F%2Fexample.com
```

The API will scrape the provided URL for LinkedIn accounts and email addresses. The results will be returned in JSON format, containing two arrays: `emails` and `linkedInAccounts`. The `emails` array will contain the scraped email addresses, while the `linkedInAccounts` array will contain the scraped LinkedIn account URLs.

## Contributing
This is a personal project and I am not looking for Contributions at this time.

## Author
The Bizcope API was created by Ryan Schleck - [LinkedIn](https://www.linkedin.com/in/ryan-schleck/) | [Blog](https://ryan-m-schleck.medium.com/)

## License
This project is licensed under the MIT License. See the [MIT](https://choosealicense.com/licenses/mit/) file for details.

