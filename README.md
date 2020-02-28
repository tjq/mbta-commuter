# MBTA Commuter Rail Schedule App
Available at [https://mbta-commuter.firebaseapp.com/#/](https://mbta-commuter.firebaseapp.com/#/).
### Features
 - Cache last selected stop in localStorage for successive visits
 -  Lazy-loaded components for small entrypoint size (~120kB gzipped)
 - Offline enabled using Service Workers
 - Installable as home screen application in iOS (Safari Add to Home Screen)
### How to use
1. Clone repository and enter directory
2. Run `npm install`
3. Place your MBTA API key in a file named /src/services/api-key.js as such: `export const apiKey = 'YOUR_API_KEY';`
4. Run `npm serve` to preview locally on port 8080
5. Run `npm build` to produce a production-ready, minified bundle
