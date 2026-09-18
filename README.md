# 🍔 FoodRush

FoodRush is a food ordering mobile application built as a client-side
web application and packaged for Android using Capacitor.

The application allows users to browse restaurants, explore their menus,
add products to a shopping cart, manage favorites, enter delivery
information and complete the checkout process.

## ✨ Features

- 🏠 Home page with available restaurants
- 🍕 Restaurant and menu browsing
- 🛒 Shopping cart
- ❤️ Favorites
- 📍 Address selection
- 🗺️ Interactive map
- 🔐 Authentication interface
- 💳 Checkout flow
- 📱 Android application using Capacitor
- 🍪 Cookie preferences

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- Leaflet
- OpenStreetMap
- Geocoding / Address API
- Capacitor
- Android

## 🗺️ Maps & Location

FoodRush uses Leaflet for displaying interactive maps.

Map data is provided through OpenStreetMap, while an external
address/geocoding service is used for address-related functionality.

## 📱 Android

The web application is packaged as an Android application using
Capacitor.

The Android-specific project is located in:

    android/

## 🚀 Installation

Clone the repository:

    git clone YOUR_REPOSITORY_URL

Navigate to the project directory:

    cd foodrush

Install the dependencies:

    npm install

## ▶️ Running the Web Application

The main web application is located inside:

    www/

The application can be served using a local web server.

## 📦 Capacitor

To synchronize the web application with the native Android project:

    npx cap sync android

To open the Android project:

    npx cap open android

## 📂 Project Structure

    foodrush/
    ├── android/              # Native Android project
    ├── www/                  # Frontend application
    │   ├── icons/            # Application icons
    │   ├── imgs/             # Restaurant and food images
    │   ├── *.html            # Application pages
    │   └── *.js              # Application logic
    ├── capacitor.config.json
    ├── package.json
    └── package-lock.json

## 🔒 Data & Backend

FoodRush does not use a database or a custom backend.

The application operates on the client side and uses external services
for map and address-related functionality.

## 📸 Screenshots

Screenshots of the application can be added here.

## 👨‍💻 Author

Miltiadis Papavramidis
