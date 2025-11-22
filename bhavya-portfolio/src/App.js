import React, { useState } from 'react';
import { Mail, Linkedin, Github, Twitter, ExternalLink, Menu, X, Award } from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const config = {
    name: "Bhavya Patel",
    title: "Student Researcher & Developer",
    description: "Building AI solutions and exploring quantum computing applications",
    accentColor: "#1d4ed8",
    social: {
      email: "patelbhavya216@gmail.com",
      linkedin: "https://www.linkedin.com/in/bhavya-patel-60877420a/",
      github: "https://github.com/bhavyapatel"
    },
    aboutMe: "I'm an undergraduate student at Kennesaw State University with a passion for AI, machine learning, and quantum computing. Currently involved in multiple research projects including emotional AI development, quantum computing applications in cybersecurity, and IMPACT assessment research. I'm also a licensed Real Estate Agent and work with various technologies from LLMs to mechatronics. When I'm not coding or researching, I'm serving as a Senator for the College of Computing and Software Engineering, bridging the gap between students and faculty.",
    skills: ["Python", "Java", "JavaScript", "HTML/CSS", "SQL", "Machine Learning", "AI/LLMs", "Quantum Computing", "Linux", "Kubernetes", "Raspberry Pi", "MATLAB", "React", "Data Analysis"],
    projects: [
      {
        name: "Personal Agentic AI + Quantum Stock Predictor",
        description: "Built an agentic AI utilizing OpenAI, Claude, and Gemini APIs. Deployed on Raspberry Pi 5 with Kubernetes, managing both a website and AI processing. Includes quantum-optimized stock price prediction using fundamental, technical, and sentiment analysis.",
        link: "https://github.com/bhavyapatel",
        skills: ["Python", "OpenAI API", "Kubernetes", "Raspberry Pi", "Quantum Computing"]
      },
      {
        name: "Book Recommender Program",
        description: "Program using vector search and BERT model to classify books based on seven common emotions. Hosted on local network using Gradio interface and integrated with Gemini API.",
        link: "https://github.com/bhavyapatel",
        skills: ["Python", "BERT", "Gradio", "Gemini API", "Vector Search"]
      },
      {
        name: "GHP (Gwinnett Housing Prediction)",
        description: "Housing price prediction program for Gwinnett County using machine learning. Built with Python libraries including Pandas and NumPy, utilizing Google Colab for development.",
        link: "https://github.com/bhavyapatel",
        skills: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Analysis"]
      },
      {
        name: "Personal Website Hosting",
        description: "Hosted personal website on Raspberry Pi using nginx to serve files via public IP address. Configured port forwarding and utilized Linux command line for server management.",
        link: "https://github.com/bhavyapatel",
        skills: ["Linux", "nginx", "Raspberry Pi", "Networking"]
      }
    ],
    experience: [
      {
        company: "Kennesaw State University - Student Government Association",
        title: "Senator of CCSE",
        dateRange: "Nov 2025 - Present",
        bullets: [
          "cool fact #1",
          "cool fact #2",
          "cool fact #3"
        ]
      },
      {
        company: "DECA",
        title: "Chapter Awards Officer",
        dateRange: "Sep 2024 - May 2025",
        bullets: [
          "cool fact #1",
          "cool fact #2",
          "cool fact #3"
        ]
      },
      {
        company: "American Society of Mechanical Engineers (ASME)",
        title: "Apprentice Marketing Officer",
        dateRange: "Sep 2025 - Present",
        bullets: [
          "cool fact #1",
          "cool fact #2",
          "cool fact #3"
        ]
      },
      {
        company: "Kennesaw Indian Students Organization (KISO)",
        title: "Secretary",
        dateRange: "Jun 2025 - Present",
        bullets: [
          "cool fact #1",
          "cool fact #2",
          "cool fact #3"
        ]
      },
      {
        company: "QuantumRise Foundation",
        title: "Co-Founder and CEO",
        dateRange: "Nov 2025 - Present",
        bullets: [
          "cool fact #1",
          "Cool fact #2",
          "https://quantumrisefoundation.org"
        ]
      },
      {
        company: "Student Managed Investment Fund (SMIF)",
        title: "Junior Analyst",
        dateRange: "Oct 2025 - Present",
        bullets: [
          "cool fact #1",
          "cool fact #2",
          "cool fact #3"
        ]
      },
      {
        company: "Kennesaw State University - Student Government Association",
        title: "IT Role Intern",
        dateRange: "Sep 2025 - Present",
        bullets: [
          "Serving the IT committee in SGA and contributing to projects under the director",
          "Bridging the gap between students and faculty members as Senator",
          "Sending out surveys to students to gather opinions on IT infrastructure at Kennesaw"
        ]
      },
      {
        company: "System Technology Works",
        title: "Intern",
        dateRange: "Oct 2025 - Present",
        bullets: [
          "Training LLMs and experimenting with Ollama",
          "Implementing AI models into mechanical systems",
          "Working extensively with mechatronics and machine learning applications"
        ]
      },
      {
        company: "Keller Williams | 400 North",
        title: "Real Estate Agent and Realtor",
        dateRange: "Oct 2025 - Present",
        bullets: [
          "Finding, following up on, and solidifying leads",
          "Managing client relationships and property transactions",
          "Licensed Real Estate Salesperson in Georgia"
        ]
      },
      {
        company: "KSU - VIP Research (Emotional AI)",
        title: "Undergraduate Student Researcher",
        dateRange: "Aug 2025 - Present",
        bullets: [
          "Developing an agentic AI capable of understanding human behavior and emotion",
          "Creating response systems that adapt to emotional contexts",
          "Collaborating with research team on AI ethics and implementation"
        ]
      },
      {
        company: "KSU - IMPACT Assessment Research",
        title: "Student Researcher",
        dateRange: "Aug 2025 - Present",
        bullets: [
          "Collecting and filtering data from student surveys",
          "Assessing student performance and setting benchmarks",
          "Contributing to educational assessment methodologies"
        ]
      },
      {
        company: "KSU - FYSP Research",
        title: "Student Researcher (Quantum Computing & Cybersecurity)",
        dateRange: "Sep 2025 - Present",
        bullets: [
          "Exploring applications of quantum computing in cybersecurity",
          "Collecting and analyzing data through hands-on research",
          "Learning quantum algorithms and their practical implementations"
        ]
      },
      {
        company: "Chesstronics",
        title: "Instructor/Coach (Internship)",
        dateRange: "May 2025 - Aug 2025",
        bullets: [
          "Instructed students on Scratch, Python, APCSA/APCSP online",
          "Guided students in constructing robots from Vex IQ",
          "Developed curriculum materials for programming education"
        ]
      },
      {
        company: "Mathnasium @ North Alpharetta",
        title: "Team Lead",
        dateRange: "Aug 2025 - Present",
        bullets: [
          "Supervised instructors and maintained quality standards",
          "Graded assessments and provided feedback to students",
          "Greeted students and parents, ensuring positive learning environment"
        ]
      }
    ],
    education: [
      {
        school: "Kennesaw State University (Honors)",
        degree: "Bachelor's Degree in Progress",
        dateRange: "2025 - ~2028",
        achievements: [
          "Current GPA: 4.0",
          "Secretary of KISO (Kennesaw Indian Students Organization)",
          "Senator of College of Computing and Software Engineering",
          "Multiple concurrent research positions (VIP, IMPACT, FYSP)"
        ]
      },
      {
        school: "Sequoyah High School",
        degree: "High School Diploma",
        dateRange: "2021 - 2025",
        achievements: [
          "GPA: 4.26",
          "Scholar-Athlete Award (Wrestling)",
          "DECA Chapter Awards Officer",
          "13 AP Courses: Statistics, Calculus AB, Literature, Lang & Comp, Psychology, US History, World History, Biology, Physics C, Physics A-1, Microeconomics, Government, Computer Science, Human Geography"
        ]
      }
    ],
    credentials: [
      { name: "Data Fundamentals", issuer: "IBM" },
      { name: "AI Fundamentals", issuer: "IBM" },
      { name: "Cybersecurity Fundamentals", issuer: "IBM" },
      { name: "Generative AI Fundamentals", issuer: "DataBricks" },
      { name: "MATLAB Certified", issuer: "MathWorks" },
      { name: "NOCTI Java Programming", issuer: "NOCTI" },
      { name: "Responsive Web Design", issuer: "FreeCodeCamp" },
      { name: "Real Estate Salesperson License", issuer: "RealEstateU" },
      { name: "GA Real Estate License Examination", issuer: "Passed on 1st attempt" }
    ]
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold" style={{ color: config.accentColor }}>
              {config.name}
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-slate-900 transition">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-slate-600 hover:text-slate-900 transition">Projects</button>
              <button onClick={() => scrollToSection('experience')} className="text-slate-600 hover:text-slate-900 transition">Experience</button>
              <button onClick={() => scrollToSection('education')} className="text-slate-600 hover:text-slate-900 transition">Education</button>
              <button onClick={() => scrollToSection('credentials')} className="text-slate-600 hover:text-slate-900 transition">Credentials</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('about')} className="text-left text-slate-600 hover:text-slate-900 transition">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-left text-slate-600 hover:text-slate-900 transition">Projects</button>
              <button onClick={() => scrollToSection('experience')} className="text-left text-slate-600 hover:text-slate-900 transition">Experience</button>
              <button onClick={() => scrollToSection('education')} className="text-left text-slate-600 hover:text-slate-900 transition">Education</button>
              <button onClick={() => scrollToSection('credentials')} className="text-left text-slate-600 hover:text-slate-900 transition">Credentials</button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            {config.name}
          </h2>
          <p className="text-2xl md:text-3xl text-slate-600 mb-6">
            {config.title}
          </p>
          <p className="text-lg text-slate-500 mb-8">
            {config.description}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {config.social.email && (
              <a 
                href={`mailto:${config.social.email}`}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition"
                style={{ color: config.accentColor }}
              >
                <Mail size={24} />
              </a>
            )}
            {config.social.linkedin && (
              <a 
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition"
                style={{ color: config.accentColor }}
              >
                <Linkedin size={24} />
              </a>
            )}
            {config.social.github && (
              <a 
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition"
                style={{ color: config.accentColor }}
              >
                <Github size={24} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">About Me</h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {config.aboutMe}
          </p>
          
          <h4 className="text-xl font-semibold text-slate-900 mb-4">Skills</h4>
          <div className="flex flex-wrap gap-3">
            {config.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full text-white font-medium"
                style={{ backgroundColor: config.accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {config.projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold text-slate-900">
                    {project.name}
                  </h4>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: config.accentColor }}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Experience</h3>
          <div className="space-y-8">
            {config.experience.map((exp, index) => (
              <div key={index} className="border-l-4 pl-6" style={{ borderColor: config.accentColor }}>
                <h4 className="text-xl font-semibold text-slate-900">
                  {exp.title}
                </h4>
                <p className="text-lg font-medium" style={{ color: config.accentColor }}>
                  {exp.company}
                </p>
                <p className="text-slate-500 mb-4">{exp.dateRange}</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Education</h3>
          <div className="space-y-8">
            {config.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-semibold text-slate-900">
                  {edu.degree}
                </h4>
                <p className="text-lg font-medium" style={{ color: config.accentColor }}>
                  {edu.school}
                </p>
                <p className="text-slate-500 mb-4">{edu.dateRange}</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Award size={32} style={{ color: config.accentColor }} />
            Credentials & Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {config.credentials.map((cred, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
              >
                <Award size={20} style={{ color: config.accentColor }} className="mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">{cred.name}</h4>
                  <p className="text-sm text-slate-600">{cred.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-white text-center">
        <p className="text-slate-400">
          © 2025 {config.name}. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
