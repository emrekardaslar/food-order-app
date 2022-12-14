import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../store/auth-context'

export default function ForgotPasswordPage() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [message, setMessage] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      const response = await resetPassword(emailRef.current.value)
      console.log(response)
      setMessage('Check your inbox for further instructions ' + emailRef.current.value)
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link>
      </div>
    </>
  )
}