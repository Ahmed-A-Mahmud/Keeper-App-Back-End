# Keeper App Back-End

This is the back-end repository for the Keeper App, a project developed for the course COMSW3102 Development Technology, instructed by Professor Shoaib Ahamed. The back-end development and integration have been carried out by Ahmed Mahmud.

## Overview

The back-end of the Keeper App provides an API for managing user-specific notes in a MongoDB database, complementing the React-based front-end of the application.

## Features

- **RESTful API**: Provides endpoints for adding, deleting, and fetching notes.
- **User Authentication**: Integrates with Firebase Authentication to manage user-specific data.
- **MongoDB Database**: Utilizes MongoDB for storing and retrieving notes.

## Technical Details

- Built using Node.js and Express.js for handling API requests.
- MongoDB is used as the database, with Mongoose for schema definition and data management.
- Firebase Admin SDK is used for validating Firebase ID tokens for user authentication.

## Phase Implementation

1. **API Creation**: Development of a Node.js/Express.js server with endpoints for adding, deleting, and fetching notes.
2. **Database Integration**: Incorporation of MongoDB for persistent data storage and retrieval.
3. **Firebase Integration**: Implementation of Firebase Authentication for handling user-specific notes.
4. **Schema Update**: Modification of the MongoDB schema to include `userId` in notes, ensuring user-specific data management.

## Acknowledgements

Special thanks to Professor Shoaib Ahamed, TA Shivam Shekhar, and TA Esme Li for providing guidance and educational support throughout the development process.