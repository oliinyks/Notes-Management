# Welcome to the Notes Management Prototype App 👋

This prototype app allows users to create, edit, and delete notes with options to associate notes with a location on a map and add images. The app is developed using Expo for easy testing and deployment on iOS and Android platforms.

## Technologies and Tools Used

1. **Expo**:

   - Expo CLI is used for managing development, testing, and running the app.
   - Simplifies API integrations and permission management.

2. **React Native**:

   - The primary framework used to build the mobile application.

3. **TypeScript**:

   - Provides type safety, helping to prevent errors with a robust type system.

4. **AsyncStorage**:

   - Used for local storage of notes on the user's device.

5. **Formik and Yup**:

   - `Formik` facilitates form state management and submission handling, while `Yup` enables form field validation.

6. **React Native Maps**:

   - Displays notes on a map using each note’s geographic coordinates as map markers.

7. **expo-image-picker**:

   - Enables users to select images from their gallery to add to notes.

8. **expo-location**:

   - Accesses device geolocation data, allowing notes to be tagged with the creation location.

9. **React Navigation**:
   - Manages navigation between screens, including the note list, note editor, and map screens.

## Core App Features

1. **Create Notes**:

   - Users can create new notes by entering the date, title, note content, image, and location (if location permissions are granted).

2. **Edit Notes**:

   - Users can modify existing notes, including updating the title, content, image, and location.

3. **Map View of Notes**:

   - All notes with location data are displayed on a map as markers. Tapping a marker opens the note details for viewing and editing.

4. **Note List**:
   - Displays all created notes in a list view, allowing users to browse, view details, and edit notes.

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
