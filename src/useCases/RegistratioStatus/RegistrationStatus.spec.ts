/* eslint-disable no-undef */
import request from 'supertest'
import app from '../../app'

describe('Registration Status', (): void => {
  it('Should return equal to status 200', async (): Promise<void> => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
