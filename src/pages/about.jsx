import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">About Our Chat App</h1>
          <p className="text-xl text-purple-700/80 max-w-3xl mx-auto">
            Connecting people with seamless, real-time messaging powered by modern technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Founder Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://avatars.githubusercontent.com/u/95424257?v=4" 
                  alt="Mohsin Ali Mughal"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                />
              </div>
              <h2 className="text-2xl font-bold text-center text-purple-900 mb-2">Mohsin Ali Mughal</h2>
              <p className="text-purple-600 text-center mb-4">Founder & Developer</p>
              <p className="text-purple-700/80 text-center mb-6">
                Building intuitive digital experiences that bring people together.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/mohsinalimughal" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com/mohsinali1699" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mohsin-ali-mughal-3118472ab/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Technologies Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Technologies Used</h2>
              <div className="space-y-4">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Firebase', icon: '🔥' },
                  { name: 'Tailwind CSS', icon: '🎨' },
                  { name: 'React Router', icon: '🔄' },
                  { name: 'Firestore', icon: '🗄️' },
                  { name: 'Firebase Auth', icon: '🔐' }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-3">
                    <span className="text-xl">{tech.icon}</span>
                    <span className="text-purple-800">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Future Plans Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Future Improvements</h2>
              <ul className="space-y-3">
                {[
                  "Group chat functionality",
                  "Message read receipts",
                  "File sharing support",
                  "Video calling integration",
                  "Dark mode toggle",
                  "End-to-end encryption",
                  "Mobile app development",
                  "Message reactions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-purple-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* App Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Vision</h2>
          <p className="text-purple-700/80 mb-4">
            This chat application was born out of a passion for creating simple yet powerful communication tools that bring people closer together. 
          </p>
          <p className="text-purple-700/80">
            Our mission is to provide a secure, intuitive platform for real-time messaging while continuously improving based on user feedback. The current version is just the beginning of what we plan to build.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-purple-700 mb-6">Have suggestions or want to contribute?</p>
          <a 
            href="mailto:mohsinalimughalofficial786@gmail.com" 
            className="inline-block bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;