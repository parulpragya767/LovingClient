# Welcome to your Expo app 👋
## Supabase Auth Setup

- **What was added**
  - `src/lib/supabase.ts`: Supabase client with AsyncStorage, `autoRefreshToken=true`, `persistSession=true`.
  - `src/context/AuthContext.tsx`: Auth provider using `supabase.auth.getSession()` and `onAuthStateChange` to keep session in sync.
  - `app/auth/login.tsx`: Email/password login screen.
  - `app/_layout.tsx`: App is gated. When not authenticated, only `auth/login` is accessible. When authenticated, the existing tabs open.

- **Dependencies** (already installed)
  - `@supabase/supabase-js`
  - `@react-native-async-storage/async-storage`
  - `react-native-url-polyfill`

- **Environment variables**
  - Create a `.env` file in the project root with:
    ```bash
    EXPO_PUBLIC_SUPABASE_URL=your-project-url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```
  - Values can be found in your Supabase project settings.
  - Expo automatically exposes variables prefixed with `EXPO_PUBLIC_` to your app at runtime.

- **Run the app**
  - Install pods on iOS if needed: `npx pod-install`
  - Start: `npm run start`
  - Open the app and sign in with an existing email/password user from your Supabase Auth users.

- **Notes**
  - Token refresh is handled by Supabase via `autoRefreshToken` and the auth state listener; sessions persist in `AsyncStorage`.
  - Redirect-based flows are disabled with `detectSessionInUrl: false` since we use native email/password.
  - To sign out, use `useAuth().signOut()` from `src/context/AuthContext.tsx`.


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
