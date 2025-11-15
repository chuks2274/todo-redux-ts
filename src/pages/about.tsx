import React from 'react'; // Import React

// About page component
export default function About() {
  // Render the about page content
  return (
    <div className="container mt-5 about-page">
      <h2 className="about-title">About This Todo App</h2>
      
      <p className="about-description">
        This is a professional Todo application built with <strong>React</strong>, <strong>Redux</strong>, <strong>TypeScript</strong>, <strong>CSS</strong>, and <strong>Bootstrap</strong>, designed to help users efficiently manage their daily tasks. Users can add, update, and delete tasks, set custom reminders for when tasks should be completed, and track the progress of their tasks across <strong>pending, in process, and completed</strong> statuses.
      </p>

      <p className="about-description">
        The app also allows users to update their profile, ensuring a personalized experience. With responsive design, intuitive alerts, and theme support (<strong>light, dark, blue modes</strong>), it helps users stay organized, prioritize tasks, and meet deadlines effectively.
      </p>

      <p className="about-description">
        This project demonstrates modern front-end development skills, state management with <strong>Redux</strong>, type safety with <strong>TypeScript</strong>, and responsive UI design with <strong>CSS</strong> and <strong>Bootstrap</strong>. Additionally, the app is deployed on <strong>Vercel</strong> using CI/CD, ensuring that updates are automatically tested and deployed for a seamless production experience.
      </p>
    </div>
  );
}
