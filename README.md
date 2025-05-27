Weather App
===========

Overview
--------

This is a simple desktop weather application built using **Electron** and **OpenWeatherMap API**. It displays real-time weather information for a specific location (currently set to latitude 8.4762, longitude 76.9600) with a modern, transparent UI. The app supports minimizing and closing the window with animations and dynamically updates the background based on whether it is day or night.

Features
--------

-   Displays current weather data including temperature, weather condition, location, and time.
-   Supports a transparent window with a custom, frameless design.
-   Includes minimize and close functionality with a shrink animation.
-   Dynamically updates the background image based on day or night conditions.
-   Fetches weather data from the OpenWeatherMap API.

## Preview:
--------
<div align="center">

  <img src="https://github.com/user-attachments/assets/7af09baf-88cc-4084-8a80-9903bffae8b4" width="400" />

<img src="https://github.com/user-attachments/assets/52137997-cea7-43c4-9acb-d08e20967abc" width="400" />

</div>


Prerequisites
-------------

To run this application, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   An active internet connection to fetch weather data from the OpenWeatherMap API.
-   An API key from [OpenWeatherMap](https://openweathermap.org/api). The current key is hardcoded in `homepage.js` but should be replaced with your own for production use.

Installation
------------

1.  **Clone the repository** or download the project files:

    ```
    git clone <repository-url>
    cd weather-app

    ```

2.  **Install dependencies**:\
    Run the following command in the project directory to install the required Node.js packages:

    ```
    npm install

    ```

3.  **Set up the OpenWeatherMap API key**:

    -   The app currently uses a hardcoded API key in `homepage.js`. Replace the `apiKey` variable in `homepage.js` with your own OpenWeatherMap API key:

        ```
        const apiKey = "your-api-key-here";

        ```

4.  **Ensure assets are available**:

    -   The app uses background images (`assets/light.png` and `assets/dark.png`). Ensure these files exist in the `assets` folder relative to the project root.

Project Structure
-----------------

-   `index.js`: Main Electron process script that creates the browser window and handles IPC (Inter-Process Communication) events.
-   `preload.js`: Preload script to expose safe APIs to the renderer process using Electron's `contextBridge`.
-   `src/renderer/homepage.html`: The main HTML file for the app's UI.
-   `src/renderer/homepage.js`: JavaScript for fetching weather data and updating the UI.
-   `assets/`: Directory containing background images (`light.png` and `dark.png`).

Running the Application
-----------------------

To start the application, run the following command in the project directory:

```
npm start

```

This will launch the Electron app, displaying the weather for the configured location (latitude: 8.4762, longitude: 76.9600).

Usage
-----

-   **Minimize**: Click the "F°" button to minimize the window with a shrink animation.
-   **Close**: Click the "C" button to close the window with a shrink animation.
-   **Weather Data**: The app automatically fetches and displays weather data for the specified location on startup.
-   **Background**: The background image changes based on whether it is day or night at the specified location.

Notes
-----

-   The app is configured to be non-resizable and frameless with a transparent background for a modern look.
-   The weather data is fetched using the OpenWeatherMap API with units set to metric (Celsius).
-   The location is currently hardcoded (latitude: 8.4762, longitude: 76.9600). To change the location, update the `latitude` and `longitude` variables in `homepage.js`.
-   The app includes a window restore handler to remove the shrink animation when the window is restored from a minimized state.

Troubleshooting
---------------

-   **API Key Issues**: Ensure the OpenWeatherMap API key is valid. If you encounter errors like "Failed to fetch weather data," check the API key and your internet connection.
-   **Missing Background Images**: If the background does not load, verify that `assets/light.png` and `assets/dark.png` exist in the `assets` folder.
-   **Animation Issues**: If the shrink animation or window restore does not work as expected, ensure the `frame1` class in `homepage.html` has the correct CSS for the `shrink-out` animation.

Future Improvements
-------------------

-   Allow users to input custom locations or use geolocation to fetch weather data dynamically.
-   Add support for switching between Celsius and Fahrenheit units.
-   Enhance the UI with additional weather details (e.g., humidity, wind speed).
-   Implement error handling for missing assets or network issues.
-   Securely store the API key (e.g., using environment variables).

License
-------

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details.
