import React from "react";
import star from "../assets/star.png";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import {
  MessageSquare,
  ChevronsLeftRight,
  Package,
  Database,
} from "lucide-react";
import digitalOcean from "../assets/partners/digitalOcean.svg";
import kotlin from "../assets/partners/kotlin.svg";
import devDisplay from "../assets/partners/devDisplay.svg";
import GDSC from "../assets/partners/gdsc.svg";
import girlInTech from "../assets/partners/girlInTech.svg";
import MLH from "../assets/partners/MLH.svg";
import puneDAO from "../assets/partners/puneDAO.svg";
import spheron from "../assets/partners/spheron.svg";
import Email from "./Email";
import About from "./About";
import konfhub from '../assets/partners/konfhub.svg'
import heroIllustration from "../assets/homeImg.svg";

function Home() {
  const partners = [
    { name: "devDisplay", img: devDisplay },
    { name: "digitalOcean", img: digitalOcean },
    { name: "spheron", img: spheron },
    { name: "konfhub", img: konfhub },
    { name: "kotlin", img: kotlin },
    { name: "GDSC", img: GDSC },
    { name: "girlInTech", img: girlInTech },
    { name: "MLH", img: MLH },
    { name: "konfhub", img: konfhub },
    { name: "devDisplay", img: devDisplay },
    { name: "digitalOcean", img: digitalOcean },
    { name: "spheron", img: spheron },
    { name: "kotlin", img: kotlin },
    { name: "puneDAO", img: puneDAO },
    { name: "devDisplay", img: devDisplay },
    { name: "GDSC", img: GDSC },
    { name: "girlInTech", img: girlInTech },
    { name: "MLH", img: MLH },
    { name: "puneDAO", img: puneDAO },
    { name: "konfhub", img: konfhub },
  ];

  const available = [
    {
      icon: <MessageSquare />,
      label: "Online Forums",
      description: "Engage in discussions with peers",
    },
    {
      icon: <ChevronsLeftRight />,
      label: "Collaboration",
      description: "Work together on open-source projects",
    },
    {
      icon: <Package />,
      label: "Resources",
      description: "Access exclusive learning materials",
    },
    {
      icon: <Database />,
      label: "Job Board",
      description: "Find API-related career opportunities",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center mt-24">

      {/* ===== HERO SECTION ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 max-w-full">
        {/* Tagline */}
        <div className="text-center mb-12">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-widest uppercase" style={{ color: '#34acb6' }}>
            Community • Connect • Collaborate
          </div>
        </div>

        {/* Hero content - two column layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-12 max-w-7xl w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Left side - Text content */}
          <div className="flex flex-col items-center lg:w-1/2">
            {/* Join Our Community heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-4 text-center tracking-wide">
              JOIN OUR COMMUNITY
            </h1>

            {/* Subtitle description */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 text-center max-w-2xl">
              A space for developers to collaborate, explore, and shape the future of APIs.
            </p>

            {/* Learn More button */}
            <button
              onClick={() => {
                const aboutSection = document.querySelector('#about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Learn More
            </button>
          </div>

          {/* Right side - Hero illustration */}
          <div className="lg:w-1/2 w-full max-w-2xl">
            <img
              src={heroIllustration}
              alt="Community collaboration illustration"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* ===== SHOWCASE SECTION ===== */}
      <div className="w-full py-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-hidden scrollbar-hide pb-2">
            <div className="flex animate-scroll gap-4">
              {/* Showcase Cards */}
              {[...Array(2)].flatMap(() => [
                {
                  id: 1,
                  title: "API Testing Workshop",
                  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center",
                  category: "Workshop"
                },
                {
                  id: 2,
                  title: "REST API Best Practices",
                  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop&crop=center",
                  category: "Tutorial"
                },
                {
                  id: 3,
                  title: "GraphQL Integration",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center",
                  category: "Project"
                },
                {
                  id: 4,
                  title: "Microservices Architecture",
                  image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop&crop=center",
                  category: "Guide"
                },
                {
                  id: 5,
                  title: "API Security Fundamentals",
                  image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop&crop=center",
                  category: "Security"
                },
                {
                  id: 6,
                  title: "Community Hackathon 2024",
                  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop&crop=center",
                  category: "Event"
                },
                {
                  id: 7,
                  title: "Mobile API Development",
                  image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop&crop=center",
                  category: "Mobile"
                },
                {
                  id: 8,
                  title: "API Documentation Guide",
                  image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop&crop=center",
                  category: "Documentation"
                }
              ]).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-none w-64 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div className="w-full mt-10 flex flex-col gap-8 justify-center items-center px-4">
        <div className="overflow-hidden w-full max-w-screen-xl">
          <div className="flex animate-scroll-left gap-6 w-max">
            {[...partners, ...partners].map(({ name, img }, i) => (
              <img
                key={i}
                src={img}
                alt={name}
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto rounded-xl object-cover flex-shrink-0 p-2"
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full max-w-screen-xl">
          <div className="flex animate-scroll-right gap-6 w-max">
            {[...partners, ...partners].map(({ name, img }, i) => (
              <img
                key={i + partners.length}
                src={img}
                alt={name}
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto rounded-xl object-cover flex-shrink-0 p-2"
              />
            ))}
          </div>
        </div>
      </div>

      <div id="about-section">
        <About />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 lg:px-10 mt-10 mb-10 max-w-7xl mx-auto">
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col justify-center items-start text-black mt-10 lg:mt-0">
            <div className="w-fit rounded-full text-white text-center text-sm font-bold py-2 px-4 mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #3097B8 0%, #2a7a9a 50%, #1e5f7a 100%)' }}>
              Join Our Community
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Become Part of the
              <span style={{ color: '#3097B8' }}> API Revolution</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 w-full max-w-xl mb-6">
              Join our growing community of developers, testers, and API
              enthusiasts. Share knowledge, collaborate on projects, and stay
              updated with the latest trends in API development.
            </p>

            <div className="w-full max-w-xl flex flex-col items-start text-black">
              {available.map((item, index) => (
                <div key={index} className="flex items-start gap-3 mb-4">
                  <div className="mt-1" style={{ color: '#3097B8' }}>{item.icon}</div>
                  <div>
                    <h3 className="text-black text-lg font-semibold">
                      {item.label}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 mt-10 lg:mt-0">
          <Email />
        </div>
      </div>
    </div>
  );
}

export default Home;
