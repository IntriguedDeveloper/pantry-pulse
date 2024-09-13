# Pantry Pulse

### Your Local Grocery Shopping & Delivery Solution

Pantry Pulse is a web application designed to make grocery shopping from local stores easier. Users can browse, order, and get groceries delivered to their doorstep. It’s built with Next.js, Firebase, and a clean and user-friendly UI.

## Features
- **Localized Shopping**: Shop from nearby local grocery stores.
- **Product Listings**: Browse detailed product descriptions and images.
- **Easy Delivery**: Quick delivery to your location from trusted local suppliers.
- **Secure User Authentication**: Sign in securely with Firebase Authentication.
- **Real-time Data**: Firestore-powered dynamic updates for products and orders.
- **Cloud Storage Integration**: Product images are stored efficiently using Firebase Cloud Storage.
- **Mobile Responsive**: Seamless experience across desktop and mobile devices.
- **Localization**: Multi-language support for better accessibility.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)
- **Cloud Storage**: [Firebase Cloud Storage](https://firebase.google.com/products/storage)
- **Styling**: CSS Modules with a custom color scheme using soft mint green, sky blue, medium teal, and very light gray.

## Getting Started

### Prerequisites

To run this project, you will need:

- Node.js installed
- A Firebase project set up (Firestore and Storage)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pantry-pulse.git
    cd pantry-pulse
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your Firebase configuration:
    - Create a `.env.local` file and add your Firebase configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Firebase Integration

- **Firestore**: Store product details, user orders, and other dynamic content.
- **Cloud Storage**: Store and manage images for products.
- **Authentication**: Secure sign-in and user management using Firebase Authentication.

## Contributing

Feel free to fork the project, submit pull requests, or file issues for features or bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
