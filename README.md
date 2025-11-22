# thebhavyapatel.com
Bhavya Patel - Portfolio Website
A modern, responsive portfolio website built with React and Tailwind CSS, showcasing my projects, experience, education, and certifications.
🚀 Features

Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
Smooth Scrolling: Navigate through sections with smooth scroll animations
Modern UI: Clean and professional design with gradient backgrounds
Dynamic Content: Easy to update through a centralized configuration object
Performance Optimized: Built with React best practices

🛠️ Technologies Used

React 18: Modern JavaScript library for building user interfaces
Tailwind CSS: Utility-first CSS framework
Lucide React: Beautiful, customizable icons
nginx: Web server for deployment

📋 Sections

Hero: Introduction with contact links
About: Personal bio and technical skills
Projects: Showcase of major projects with descriptions
Experience: Professional and research experience
Education: Academic background and achievements
Credentials: Certifications and licenses

🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation

Clone the repository:

bashgit clone https://github.com/bhavyapatel/portfolio.git
cd portfolio

Install dependencies:

bashnpm install

Start the development server:

bashnpm start
The app will open at http://localhost:3000
Build for Production
bashnpm run build
This creates an optimized production build in the build folder.
🌐 Deployment
Deploy with nginx

Build the project:

bashnpm run build

Copy build files to nginx:

bashcp -r build/* /path/to/nginx/html/

Configure nginx and restart:

bashnginx -s reload
Deploy to GitHub Pages

Install gh-pages:

bashnpm install --save-dev gh-pages

Add to package.json:

json"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

Deploy:

bashnpm run deploy
Deploy to Vercel

Install Vercel CLI:

bashnpm install -g vercel

Deploy:

bashvercel
Deploy to Netlify

Install Netlify CLI:

bashnpm install -g netlify-cli

Deploy:

bashnetlify deploy --prod
⚙️ Customization
All content can be customized by editing the config object in src/App.js:
javascriptconst config = {
  name: "Your Name",
  title: "Your Title",
  description: "Your Description",
  accentColor: "#1d4ed8", // Change theme color
  social: { /* ... */ },
  aboutMe: "Your bio",
  skills: [ /* ... */ ],
  projects: [ /* ... */ ],
  experience: [ /* ... */ ],
  education: [ /* ... */ ],
  credentials: [ /* ... */ ]
};
📱 Contact

Email: patelbhavya216@gmail.com
LinkedIn: linkedin.com/in/bhavya-patel-60877420a
GitHub: github.com/bhavyapatel

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Design inspired by modern portfolio trends
Icons by Lucide
Built with Create React App


Made with ❤️ by Bhavya Patel
