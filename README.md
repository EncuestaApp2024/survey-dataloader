# Survey Data Loader

This project is designed to load survey data from CSV files into a Firestore database. The script reads CSV files from `data` directory, processes the data, and updates the Firestore database accordingly.

## How to Run the Project

1. **Install Dependencies**:
   Ensure you have [pnpm](https://pnpm.io/) installed. Then, install the project dependencies by running:
   ```sh
   pnpm install
    ```

2. **Set Up Environment Variables**:
    Create a `.env` file in the root directory of the project and add the following environment variables:
    ```sh
    FIREBASE_API_KEY=API_KEY
    FIREBASE_AUTH_DOMAIN=AUTH_DOMAIN
    FIREBASE_PROJECT_ID=PROJECT_ID
    FIREBASE_STORAGE_BUCKET=STORAGE_BUCKET
    FIREBASE_MESSAGING_SENDER_ID=MESSAGING_SENDER_ID
    FIREBASE_APP_ID=APP_ID
    FIREBASE_MEASUREMENT_ID=MEASUREMENT_ID
    ```
    Replace the values with your Firebase project configuration. To create credentials for a Firebase project, follow the instructions [Firebase Config Object](https://firebase.google.com/docs/web/setup#config-object).

3. **Run the Project**:
    Run the project by executing the following command:
    ```sh
    pnpm start
    ```
    The script will read the CSV files from the `data` directory and update the Firestore database accordingly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
