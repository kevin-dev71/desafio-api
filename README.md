# desafio-api

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kevin-dev71/desafio-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `src/config.js`
   ```JS
   const ACCESS_TOKEN_SECRET = 'ENTER YOUR SECRET TO GENERATE JWT';
   const REFRESH_TOKEN_SECRET = 'ENTER YOUR SECRET TO REFRESH JWT';
   const MONGODB_URL = 'ENTER MONGODB URL and USE desafiodb'
   const PORT = 'PORT'
   ```
4. Run Developer enviroment
   ```sh
   npm run dev
   ```