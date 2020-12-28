// Used as reference: https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

const request = require('supertest')
const app = require('../src/server/server')

import '@babel/polyfill'

describe('Test server endpoint', () => {

    it('Should test the endpoint for testing', async () => {
        const res = await request(app).get('/test')
        expect(res.body.statusCode).toBe(200)
    })
})