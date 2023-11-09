# MyWheels Frontend Challenge

## Development

- Install the dependencies: `yarn install`
- Run the development server: `yarn dev`
- Execute the tests: `yarn test`

## Installation

Before starting, make sure you have [Node.js](https://nodejs.org/) installed on your machine. Then, follow these steps to install the necessary dependencies for the project:

```bash
# Clone the repository
git clone https://github.com/YassineGherbi/mywheels-frontend-challenge.git
# Navigate to the project directory
cd mywheels-frontend-challenge
# Install dependencies
yarn install
```

## Running the Application Locally

To run the application on your local machine, execute the following command:

```bash
yarn dev
```

This will start a development server on port 9009. You can access the application by navigating to http://localhost:9009 in your browser.

## Testing

The project is set up to use Jest for testing. You can run the tests using the following command:

```bash
yarn test
```

To watch for changes and re-run tests, use:

```bash
yarn test:watch
```

## Building for Production

To create a production build, run:

```bash
yarn build
```

## Deploying to Vercel

The project is set up for easy deployment to Vercel. Ensure you have the Vercel CLI installed as a local dependency. You can deploy the application to production using the following command:

```bash
yarn deploy
```

This command triggers the vercel --prod command, which deploys the latest build to the production environment.

Ensure you have configured your Vercel project settings properly before deploying. For detailed instructions on setting up Vercel deployment, refer to the official [Vercel documentation](https://vercel.com/docs).

## Demo

You can explore a live demo of the application [here](https://mywheels-frontend-challenge.vercel.app/). 
Please note that due to CORS restrictions on the API used for this challenge, some features may not be fully operational.

## Assignment

Create a small application that displays a list of resources (cars) that are provided by the API. Use the `useApi` method provided in `src/api.js` to fetch the JSON containing the resources.

1. Display a list of resources, for each of the items in the list display at least the following information:

   - Brand
   - Model
   - Address
   - Fuel type
   - Availability
   - Rate per/hour

2. Add an input field that searches for specific resource models.
3. Create a way to filter the list on fuel type, availability, winter tires and towbar.
4. Show the number of found resources.

## Optional tasks

As a bonus one of the following additional features could be added to the application.

- [x] Create automated tests for (a part) of the application.
- [ ] Add the option to toggle between a list view and a map view.
- [x] Convert the code to use TypeScript
- [ ] Use [Next.js](https://nextjs.org/docs/) instead of the Webpack setup.
- [ ] Add a personal touch by styling the application.
- [x] Pitch an idea for a great additional feature and show (in rough lines) how that could be implemented.


### Idea pitch

**Suggested Feature**: "MyWheels Favorites"

**Feature Description**:
Implement a "Favorites" feature that allows users to mark certain cars as their favorites. This feature will enable users to quickly access the cars they are most interested in, enhancing the user experience.

**Rough Implementation Outline**:

- **User Interface Update**:
   - Add a "heart" icon or a similar symbol to each car listing.
   - Users can click this icon to add the car to their list of favorites.
   - Highlighted or filled-in icons indicate that a car is a favorite.

- **State Management**:
   - Implement a state to track user's favorite cars.
   - This could be local state initially, with potential to sync with user profiles for registered users in the future.

- **Favorites View**:
   - Add a new section or a filter in the application that displays only the user's favorite cars.
   - Ensure this view is easily accessible from the main interface.

- **Data Persistence**:
   - Initially, use local storage to persist the favorites.
   - In the long term, integrate this feature with a backend to save favorites per user account.

- **User Testing and Feedback**:
   - After implementation, conduct user testing to gather feedback.
   - Iterate on the feature based on the feedback to enhance its usability and functionality.
