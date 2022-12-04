

const KEYCLOAK_URL = process.env['KEYCLOAK_URL'] || 'http://localhost:8080'
const KEYCLOAK_REALM = process.env['KEYCLOAK_REALM'] || 'zloi-dev'
const KEYCLOAK_CLIENTID = process.env['KEYCLOAK_CLIENTID'] || 'web-admin'

const auth = {
    strategies: {
        keycloak: {
            scheme: 'openIDConnect',
            clientId: KEYCLOAK_CLIENTID,
            endpoints: {
                configuration: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/.well-known/openid-configuration`,
            },
            idToken: {
                property: 'id_token',
                maxAge: 60 * 60 * 24 * 30,
                prefix: '_id_token.',
                expirationPrefix: '_id_token_expiration.'
            },
            responseType: 'code',
            grantType: 'authorization_code',
            scope: ['openid', 'profile', 'offline_access'],
            acrValues: ['0', '1']
        },
    },
    redirect: {
        login: '/',
        callback: '/',
        home: '/panel/about'
    },
}

export default auth