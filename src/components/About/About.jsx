import image from "../../assets/images/headshot.jpg"
import "./About.css"

export default function About() {
  return (
    <section className="about">
        <article className="bg-warning mb-5 p-5 text-dark">
            <h1 className="text-center">About</h1>
        </article>
        <div className="container">
          <div className="row">
            <div className="mt-5 mb-5 col-md-3">
              <img src={image} alt="Catie headshot" className="profilePic" border="2"/>
            </div>
            <div className="about-text mt-5 mb-5 col-md-9">
              <h3>About Me & The React ToDo App</h3>
                <p>
                Hey there! My name is Catie Watson. Thanks for checking out my ToDo app! This application allows the user to sign in with GitHub and see items on their to do list.  Users will be able to add, edit, delete, or mark to do items as complete.  This application leverages the .NET Web API as the backend of the application. The full source code is <a href="https://github.com/catgwat/react-todo">available on GitHub</a>. 
                </p>
            </div>
          </div>
        </div>
        

    </section>
  )
}