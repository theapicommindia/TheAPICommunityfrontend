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
import konfhub from "../assets/partners/konfhub.svg";
import heroIllustration from "../assets/homeImg.svg";
import buildops from "../assets/Highlights/buildops.jpg";
import AIagentunplugged from "../assets/Highlights/AIagentunplugged.jpg";
import API101 from "../assets/Highlights/API101.jpg";
import builtWithAI from "../assets/Highlights/builtWithAI.jpg";
import devDay from "../assets/Highlights/devDay.jpg";
import dioApr from "../assets/Highlights/dioApr.jpg";
import dioOct from "../assets/Highlights/dioOct.jpg";
import hacktoberFest24 from "../assets/Highlights/hacktoberFest24.jpg";
import kotlinConf from "../assets/Highlights/kotlinConf.jpg";
import tour from "../assets/Highlights/tour.jpg";
import artWork from '../assets/artwork.png';

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
      <div className="relative z-10 flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 max-w-full">
        <div className="text-center mb-12">
          <div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-widest uppercase"
            style={{ color: "#3097B8" }}
          >
            Community • Connect • Collaborate
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-12 max-w-7xl w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="flex flex-col items-center lg:w-1/2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center tracking-wide"
              style={{ color: "#3097B8" }}
            >
              JOIN OUR COMMUNITY
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 text-center max-w-2xl">
              A space for developers to collaborate, explore, and shape the
              future of APIs.
            </p>

            <button
              onClick={() => {
                const aboutSection = document.querySelector("#about-section");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, #3097B8 0%, #2a7a9a 50%, #1e5f7a 100%)",
              }}
            >
              Learn More
            </button>
          </div>

          <div className="lg:w-1/2 w-full max-w-2xl">
            <div className="relative group w-full h-72 sm:h-80 md:h-96">
              <img
                src={artWork}
                alt="Community collaboration illustration"
                className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-300 group-hover:blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-hidden scrollbar-hide pb-2">
            <div className="flex animate-scroll gap-4">
              {[...Array(2)]
                .flatMap(() => [
                  {
                    id: 1,
                    title: "API 101 - Introduction to POSTMAN & API",
                    image: API101,
                    category: "Workshop",
                  },
                  {
                    id: 2,
                    title: "Digital Ocean October Meetup 2024",
                    image: dioOct,
                    category: "Meetup",
                  },
                  {
                    id: 3,
                    title: "Hacktober Fest Pune Fusion 2024",
                    image: hacktoberFest24,
                    category: "Workshop",
                  },
                  {
                    id: 4,
                    title: "Dev Day Pune Dev Fusion Cohort 2024",
                    image: devDay,
                    category: "Meetup",
                  },
                  {
                    id: 5,
                    title: "The Supermove Tour - Pune 2024",
                    image: tour,
                    category: "Tour",
                  },
                  {
                    id: 6,
                    title: "Kotlin Conf 2024 Delhi NCR",
                    image: kotlinConf,
                    category: "Conference",
                  },
                  {
                    id: 7,
                    title: "Digital Ocean April Meetup 2025",
                    image: dioApr,
                    category: "Meetup",
                  },
                  {
                    id: 8,
                    title: "Build with ai: AI Camp Pune",
                    image: builtWithAI,
                    category: "Meetup",
                  },
                  {
                    id: 9,
                    title: "AI Agents unplugged : Think. Build. Deploy",
                    image: AIagentunplugged,
                    category: "Meetup",
                  },
                  {
                    id: 10,
                    title: "BuildOps: Flow Triggered by MCP",
                    image: buildops,
                    category: "Meetup",
                  },
                ])
                .map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex-none w-64 bg-white rounded-lg shadow-sm cursor-pointer group"
                  >
                    <div
                      className="relative"
                      onClick={() => (window.location.href = "/event")}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-t-lg transition-all duration-300 group-hover:blur-sm"
                      />
                      <div className="absolute top-2 left-2 rounded-4xl">
                        <span className="bg-black/40 backdrop-blur-lg text-white text-xs px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <button
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: "auto" }}
                      >
                        <span className="text-white font-semibold py-2 px-6 rounded-full shadow-lg bg-[#1e5f7a] transition-colors duration-200">
                          See Events
                        </span>
                      </button>
                    </div>

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

      <div className="w-full mt-10 flex flex-col gap-8 justify-center items-center px-4">

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
            <div
              className="w-fit rounded-full text-white text-center text-sm font-bold py-2 px-4 mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #3097B8 0%, #2a7a9a 50%, #1e5f7a 100%)",
              }}
            >
              Join Our Community
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Become Part of the
              <span style={{ color: "#3097B8" }}> API Revolution</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 w-full max-w-xl mb-6">
              Join our growing community of developers, testers, and API
              enthusiasts. Share knowledge, collaborate on projects, and stay
              updated with the latest trends in API development.
            </p>

            <div className="w-full max-w-xl flex flex-col items-start text-black">
              {available.map((item, index) => (
                <div key={index} className="flex items-start gap-3 mb-4">
                  <div className="mt-1" style={{ color: "#3097B8" }}>
                    {item.icon}
                  </div>
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
