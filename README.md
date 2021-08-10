# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Skeleton Component`

A Skeleton Loader is created using the react-content-loader library, already available in the project.

### PROGRESS BAR

You can use the ProgressBar component inside the Utils component to show a feedback
to the User when a page or a component is loading. The component was created with Chakra UI Progress animated Component. See the progressBar in: https://chakra-ui.com/docs/feedback/progress.

### Spinner Components

The Spinner component used the Chakra UI library, which is implemented in the project. The Spinner element offered by this library is used in the Feedback section (https://chakra-ui.com/docs/feedback/spinner)

### `Alerts`

Alerts component is inside the Utils component. With them you can show information, success, error and confirmation alerts.

How to use?
You need to call Alert function and pass the following parameters in this order:

- type
- title
- text

example:

```javascript
import Alert from "../Utils/Alert";
Alert("success", "Alert title", "Alert description text");
```

Alert types:

- success (show a success message and dissapears after 2.5 seconds).
- error (show a error message).
- info (show a info message).
- confirm or question (show a confirmation alert whit accept and cancel buttons)

This function returns a promise that is resolved when it is accepted or canceled, returning true or false respectively.
Example:

```javascript
const response => await Alert('confirm','Are you sure?', 'Deleting this user');
console.log(response); // print true if accept the alert or false if alert is canceled.
```
