import express from 'express'
import Keycloak from 'keycloak-connect';
import session from 'express-session';
import createMemoryStore from 'memorystore'


const KEYCLOAK_URL = process.env['KEYCLOAK_URL'] || 'http://localhost:8080'
const KEYCLOAK_REALM = process.env['KEYCLOAK_REALM'] || 'zloi-dev'
const KEYCLOAK_CLIENTID = process.env['KEYCLOAK_CLIENTID'] || 'web-admin'

const MemoryStore = createMemoryStore(session)
const memoryStore = new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
});

const sessionMiddleware = session({
    secret: 'auto',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: { maxAge: 86400000 },
})

const keycloakConfig: Keycloak.KeycloakConfig = {
    "realm": KEYCLOAK_REALM,
    "auth-server-url": KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": KEYCLOAK_CLIENTID,
    "confidential-port": 0,
    'bearer-only': true
};

Keycloak.prototype.accessDenied = function (_request: express.Request, response: express.Response) {
    response.status(403).json({
        error: true,
        message: 'Access denied'
    })
}

export const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

export function authMiddleware() {
    return [sessionMiddleware, ...keycloak.middleware()]
}



