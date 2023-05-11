# CodeOffer NodeJS Package

This is a Node JS package that provides an API wrapper for the public CodeOffer API. The package simplifies authentication and management of in-app assets for developers who use the CodeOffer API in their applications.

## Installation

To install the package, run the following command:

```
npm i codeoffer
``` 

## Usage

### Authentication & Sessions

Initialize a new session, but first you need to require the `Session` class from `codeoffer/oauth`

```js
const {Session} = require("codeoffer/oauth");
```

```js
const session = new Session("APP_ID");
```

After that you can create a new session token:

```js
const token = await session.createSessionToken();
```

Now get the login link and ask the user to log in:
`console.log(token.getLoginLink());`

Right after that call the `await token.waitForConfirmation();` method, this method will wait until the user completed the login-process.

To return the current logged-in user you need to import the `user` class from `codeoffer/user`

```js
const {User} = require("codeoffer/user");
```

Then you can return the current user by using the `getUser` method and passing the token as a parameter:

```js
const user = await User.getUser(token);
```

And now you can get the username, email, profile picture and access to the current logged in app (if the user purchased / downloaded the app with his account)

```js
console.log(`Welcome: ${user.username}, do you own this App? ${user.access ? "Yes" : "No"}`);
```

### Assets

You can return all the apps your app contains.

First import the `App` class from `codeoffer`

```js
const {App} = require("codeoffer/app");
```

After that you can return all the assets your app contains and return properties like the name, identifier and if the user has access to that asset.

```js
const assets = await App.getAssetDirectory(token);
```

#### Complete Example

```js
const session = new Session("APP_ID");
const token = await session.createSessionToken();
console.log(`Login Link: ${token.getLoginLink()}`);
await token.waitForConfirmation();
const user = await User.getUser(token);
console.log(`Welcome: ${user.username}, do you own this App? ${user.access ? "Yes" : "No"}`);
const assets = await App.getAssetDirectory(token);
for(const asset of assets) {
    console.log(`Name: ${asset.name}, Access: ${user.access ? "Yes" : "No"}`);
}
```

## License

This package is licensed under the Apache-2.0 License.