import Card from "react-bootstrap/Card"
import Container from 'react-bootstrap/Container'
import "./About.css"

export default function About() {
  return (
    <section className="about">
        <article className="bg-warning mb-5 p-5 text-dark">
            <h1 className="text-center">About</h1>
        </article>
        <Container>
            <Card className="m-5 border-dark text-center">
                <Card.Header className='bg-dark text-white'>
                    <h2>About my ToDo App</h2>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </Container>
    </section>
  )
}