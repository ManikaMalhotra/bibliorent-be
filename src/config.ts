const config = {
    googleClientID: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    clientURI: process.env.CLIENT_URI || 'http://localhost:5173',
    serverURI: process.env.SERVER_URI || 'http://localhost:8000',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    authCookieName: process.env.AUTH_COOKIE_NAME || 'auth_token',
    authCookieExpiry: process.env.AUTH_COOKIE_EXPIRY ? parseInt(process.env.AUTH_COOKIE_EXPIRY) : 86400000,
};

export default config;