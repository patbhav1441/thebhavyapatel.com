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
        description: "Built an AI-powered book recommendation system that combines semantic vector search with emotion classification to surface titles that match a reader’s interests and mood. Integrated a BERT-based emotion model, a Gradio interface for interaction, and Gemini API support to make recommendations more dynamic and personalized.",
        link: "https://github.com/bhavyapatel",
        skills: ["Python", "NLP", "BERT", "Vector Search", "Gradio"]
      },
      {
        name: "GHP (Gwinnett Housing Prediction)",
        description: "Developed a machine learning project to analyze housing data and predict home values in Gwinnett County. Cleaned and explored real estate datasets, engineered features, and evaluated predictive models in Python to better understand pricing patterns and key market drivers.",
        link: "https://github.com/bhavyapatel",
        skills: ["Python", "Machine Learning", "Pandas", "Data Analysis", "Feature Engineering"]
      },
      {
        name: "Personal Website Hosting",
        description: "Deployed and maintained a personal portfolio website on a Raspberry Pi home server, configuring domain routing, HTTPS, and port forwarding for public access. Managed the Linux environment, build pipeline, and production hosting setup to keep the site accessible and reliable. (Utilized Cloudflare to host the website later on, since hosting a website on pi was less reliable than I thought it would be.)",
        link: "https://github.com/bhavyapatel",
        skills: ["Linux", "Caddy", "Raspberry Pi", "Networking", "Web Hosting", "Cloudflare Setup"]
      }
    ],
        videos: [
      {
        title: "Quantum Rise Foundation Overview",
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
        description: "Overview of the mission, goals, and impact of the foundation."
      },
      {
        title: "Agentic AI Demo",
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
        description: "Demo of the local AI workflow, edge deployment, and core features."
      }
    ],
    testimonials: [
      {
        name: "Dr. Jane Smith",
        role: "Research Mentor",
        quote: "Bhavya brings a rare combination of curiosity, technical skill, and execution. He takes initiative and follows through."
      },
      {
        name: "John Doe",
        role: "Project Collaborator",
        quote: "Working with Bhavya was seamless. He is thoughtful, organized, and consistently delivers polished work."
      },
      {
        name: "Aisha Patel",
        role: "Student Leader",
        quote: "Bhavya adds real energy to every team he joins. He communicates clearly, solves problems fast, and supports others well."
      }
    ],
    
    experience: [
      {
        company: "Kennesaw State University - Student Government Association",
        title: "Senator of College of Computing and Software Engineering",
        dateRange: "Nov 2025 - Present",
        bullets: [
          "Represent CCSE students by collecting feedback, advocating for academic and campus needs, and communicating updates back to the college.",
          "Collaborate with SGA leaders to draft, debate, and vote on initiatives that improve student experience and engagement.",
          "Help plan and support student-facing events, outreach efforts, and initiatives across CCSE."
        ]
      },
      {
        company: "QuantumRise Foundation",
        title: "Founder and CEO",
        dateRange: "Nov 2025 - Present",
        bullets: [
          "Lead strategy, operations, and platform development as the sole founder of a student-led initiative focused on expanding access to emerging technology.",
          "Built and managed the organization’s public presence, including website development, content, and digital outreach for quantumrisefoundation.org.",
          "Develop partnerships, shape programs, and oversee community-facing initiatives to grow visibility, engagement, and long term impact.",
          "Design and test hands-on technology access programs, including equipment lending and rental concepts for students, schools, and other interested groups.",
          "*Currently operating independently and open to bringing on mission-aligned cofounders or officers to support growth, programming, and execution.*"
        ]
      },
      {
        company: "StuddyBuddy App",
        title: "Founder and Product Lead",
        dateRange: "Dec 2025 - Present",
        bullets: [
          "Built an iOS app designed to help students study more effectively by combining academic support with social matching.",
          "Developed features for finding study partners by course and shared interests, making it easier for students to connect with people who match their goals and schedules.",
          "Shaped the product vision, user experience, and feature roadmap for tools such as course-based matching, group communication, and AI-supported study assistance."
        ]
      },
      {
        company: "Kennesaw State University Information Technology Advisory Committee",
        title: "Student Representative, SGA",
        dateRange: "Dec 2025 - Present",
        bullets: [
          "Serve as a student representative on KSU’s Information Technology Advisory Committee, helping bring student perspectives into university technology discussions and planning.",
          "Represent student needs and feedback in conversations around technology priorities, digital resources, security, and campus-wide IT initiatives.",
          "Collaborate with university stakeholders across academic, administrative, and technical areas to support a more effective and innovative technology environment for students."
        ]
      },
      {
        company: "American Society of Mechanical Engineers (ASME)",
        title: "Apprentice Marketing Officer",
        dateRange: "Sep 2025 - Present",
        bullets: [
          "Create and schedule content that promotes meetings, workshops, and projects to grow attendance and membership.",
          "Design flyers, posts, and announcements while maintaining consistent branding across platforms.",
          "Support outreach efforts by partnering with other orgs and highlighting member projects and accomplishments."
        ]
      },
      {
        company: "Kennesaw Indian Students Organization (KISO)",
        title: "Secretary",
        dateRange: "Jun 2025 - Present",
        bullets: [
          "Record meeting notes, maintain documentation, and share clear action items to keep the org organized.",
          "Manage communications and coordination for events, including logistics, scheduling, and member updates.",
          "Support leadership by tracking plans, deadlines, and follow-ups to ensure smooth execution."
        ]
      },
      {
        company: "Student Managed Investment Fund (SMIF)",
        title: "Junior Analyst",
        dateRange: "Jan 2025 - Present",
        bullets: [
          "Conduct equity research by analyzing financial statements, valuation metrics, and industry trends to support investment decisions.",
          "Monitor assigned holdings and market news, providing updates that inform portfolio adjustments.",
          "Oversee over ~$530,000 in investments.",
          "Pitching a market sector or a company to the committee."
        ]
      },
      {
        company: "System Technology Works LLC",
        title: "Intern",
        dateRange: "Oct 2025 - Present",
        bullets: [
          "Training LLMs and experimenting with Ollama",
          "Implementing AI models into mechanical systems",
          "Working extensively with mechatronics and machine learning applications."
        ]
      },
      {
        company: "KSU - VIP Research (Emotional AI)",
        title: "Undergraduate Student Researcher",
        dateRange: "Aug 2025 - Present",
        bullets: [
          "Developing an agentic AI capable of understanding human behavior and emotion",
          "Creating response systems that adapt to emotional contexts",
          "Collaborating with the research team on AI ethics and implementation.",
          "Shipped an AI model on an SBC for personal use and developing an iOS app for other students."
        ]
      },
      {
        company: "KSU - IMPACT Assessment Faculty Research",
        title: "Undergraduate Research Assistant",
        dateRange: "Aug 2025 - Present",
        bullets: [
          "Collecting and filtering data from student surveys",
          "Assessing student performance and setting benchmarks",
          "Contributing to educational assessment methodologies."
        ]
      },
      {
        company: "KSU - FYSP Research",
        title: "Student Researcher (Quantum Computing & Cybersecurity)",
        dateRange: "Sep 2025 - Present",
        bullets: [
          "Exploring applications of quantum computing in cybersecurity",
          "Built a prediction model, utilizing both a classical model and a quantum-optimized model, to detect phishing emails",
          "Learning quantum algorithms and their practical implementations."
        ]
      },
      {
        company: "Chesstronics",
        title: "Instructor/Coach (Internship)",
        dateRange: "May 2025 - Aug 2025",
        bullets: [
          "Instructed students on Scratch, Python, APCSA/APCSP online",
          "Guided students in constructing robots from Vex IQ",
          "Developed curriculum materials for programming education."
        ]
      },
      {
        company: "Mathnasium @ North Alpharetta",
        title: "Team Lead",
        dateRange: "Aug 2025 - Mar 2026",
        bullets: [
          "Supervised instructors and maintained quality standards",
          "Graded assessments and provided feedback to students",
          "Greeted students and parents, ensuring a positive learning environment."
        ]
      },
      {
        company: "Keller Williams | 400 North",
        title: "Real Estate Agent and Realtor",
        dateRange: "Oct 2025 - Mar 2026",
        bullets: [
          "Finding, following up on, and solidifying leads",
          "Managing client relationships and property transactions",
          "Licensed Real Estate Salesperson in Georgia"
        ]
      },
      {
        company: "DECA",
        title: "Chapter Awards Officer",
        dateRange: "Sep 2024 - May 2025",
        bullets: [
          "Tracked chapter achievements and submitted award applications while keeping records organized and deadline-ready.",
          "Coordinated with officers and members to document participation, competitions, and service impact for recognition.",
          "Supported chapter operations by assisting with event planning, communication, and member engagement."
        ]
      },
      {
        company: "Kennesaw State University - Student Government Association",
        title: "IT Role Intern",
        dateRange: "Sep 2025 - Dec 2025",
        bullets: [
          "Serving the IT committee in SGA and contributing to projects under the director",
          "Bridging the gap between students and faculty members as Senator",
          "Sending out surveys to students to gather opinions on IT infrastructure at Kennesaw."
        ]
      },
    ],
    education: [
      {
        school: "Kennesaw State University (Honors)",
        degree: "Bachelor's Degree in Progress",
        dateRange: "2025 - 2027",
        achievements: [
          "Current GPA: 4.0",
          "Secretary of KISO (Kennesaw Indian Students Organization)",
          "Senator of the College of Computing and Software Engineering",
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
      { name: "GA Real Estate License Examination", issuer: "PSI" },
      { name: "Bloomberg Market Concepts", issuer: "Bloomberg"}
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
              <button onClick={() => scrollToSection('videos')} className="text-slate-600 hover:text-slate-900 transition">Videos</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-slate-600 hover:text-slate-900 transition">Testimonials</button>
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
              <button onClick={() => scrollToSection('videos')} className="text-left text-slate-600 hover:text-slate-900 transition">Videos</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-slate-600 hover:text-slate-900 transition">Testimonials</button>
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

      {/* Videos Section */}
      <section id="videos" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Videos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {config.videos.map((video, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    {video.title}
                  </h4>
                  <p className="text-slate-600">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {config.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
              >
                <p className="text-slate-600 leading-relaxed mb-6 italic">
                  “{testimonial.quote}”
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p
                    className="font-medium"
                    style={{ color: config.accentColor }}
                  >
                    {testimonial.role}
                  </p>
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
          © 2026 {config.name}. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
