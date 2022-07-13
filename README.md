### Trivvy - Minimalistic trivia app

This app was built with minimal UI as a test for G2i Inc. Here's what the app can do:

- Play a 10 true/false question based trivia game
- Exit the game any time and resume where you left off without losing your progress

### How to run locally

The app uses a remote api and assuming the api continues to work, you can run the app by following these steps:

1. Clone the repo
2. Make sure you have expo setup on your machine https://docs.expo.dev/
3. Install all dependencies by running `npm i`
4. Run the app with the commands `npm run ios` or `npm run android` depending on your preferred platform

### Architecture

The codebase uses feature based modular architecture. Most of the functionality of the app can be found in [features/game](./features/game). Assuming the app will be extended with more functionality in the future, we also have a `features/shared` directory with all the code that are written in a generic way intended to be shared among features, such as generic styles helpers and main navigator of the app.

The game feature is split into 3 screens as per the spec. All the business logic that powers the feature is isolated in the [useGame](./features/game/useGame.tsx) hook.

We are using a few external libraries, here are their usages:
1. react-navigation: Used to easily handle routing
2. zustand: Used to manage app state
3. async-storage: Used to store game progress in device so that user can close and re-open app without losing progress
4. html-entities: Used to decode html entities in the api data