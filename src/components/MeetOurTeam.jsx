import React from "react";
import { memo, useCallback, useState } from "react";
import shrawan from '../assets/team/shrawan.jpg';
import aditya from '../assets/team/aditya.JPG';
import aman from '../assets/team/aman.jpg';
import namrata from '../assets/team/namrata.jpg';
import arjun from '../assets/team/arjun.jpg';
import ritika from '../assets/team/ritika.jpg';
import eric from '../assets/team/eric.jpg';
import asmita from '../assets/team/asmita.jpg';
import roheeni from '../assets/team/roheeni.jpg';
import sakshiSonawne from '../assets/team/sakshi.jpg';
import saloni from '../assets/team/saloni.jpg';
import { FaLinkedin } from "react-icons/fa";


const organizingTeam = [
  {
    id: 1,
    name: "Shrawan Saproo",
    role: "Organizer",
    bio: "I'm Shrawan, a Community Builder, DevRel Leader, Technical Content Creator, and Region Lead at AI Camp, passionate about empowering developers and building thriving ecosystems. Currently leading the API Community and serving as a DigitalOcean Wavemaker, I bring 2+ years of experience in developer relations, community growth, and event management.",
    linkedin: "https://www.linkedin.com/in/shrawan513/",
    image: shrawan,
  },
  {
    id: 2,
    name: "Aditya Bisht",
    role: "Organizer",
    bio: "Hi, I'm Aditya Bisht, a curious and committed engineering student pursued B.E. in Robotics and Automation, with a passion for software development and community-driven tech innovation. With a strong foundation in C/C++, Python, JavaScript, and modern frameworks like React, Node.js, and Next.js, I thrive at the intersection of software and hardware. I enjoy exploring both front-end and back-end technologies, crafting solutions that are not only functional but also meaningful. Beyond development, I'm deeply invested in community building. I co-founded The API Community, organizing 10+ events to foster collaboration and API literacy among developers. As a competitive programmer, I've consistently sharpened my algorithmic thinking, ranking among the Top 11K globally in Google Kickstart and mentoring over 80+ students in Data Structures & Algorithms. My passion for learning and teaching is what fuels me every day.I'm currently diving deeper into DevOps, automation, and cloud-native tools, with a long-term vision to innovate at the intersection of AI and real-world problem-solving. When I'm not coding, you'll find me reading about aviation, defense tech, Geopolitics or playing badminton. I believe in the power of curiosity, code, and community to create meaningful change.",
    linkedin: "https://www.linkedin.com/in/aditya894/",
    image: aditya,
  },
];

const teamLeads = [
  {
    id: 1,
    name: "Aman Mogal",
    role: "Growth Lead",
    bio: "Aman Mogal is an AI & DevOps Engineer and Founder of localDev, passionate about automating intelligence in the cloud. As an open-source enthusiast and Community Representative at the API Community, he focuses on growth management, community relations, and driving impactful developer experiences. Currently pursuing his degree at MCOE (Class of 2026), Aman actively contributes to fostering collaboration and innovation in tech communities.",
    linkedin: "https://www.linkedin.com/in/aman-mogal-b7773b246/",
    image: aman,
  },
  {
    id: 2,
    name: "Namrata Bhalerao",
    role: "Design Lead",
    bio: "I'm Namrata, an Electronics & Telecommunication student with a enthusiasm for visual story telling, UI frameworks and crafting intuitive digital experiences. At the API Community, I bring my skills as a designer. I focus on shaping our visual presence and ensuring consistent aesthetics across platforms. With a keen eye for design and creativity, I lead the creation of engaging social media visuals and community-driven designs that reflect our vibrant spirit. My goal is to merge technology with creativity.",
    linkedin: "https://in.linkedin.com/in/namrata-bhalerao-66417a244",
    image: namrata,
  },
  {
    id: 3,
    name: "Arjun Khadse",
    role: "Operations Lead",
    bio: "I'm a creative Full-Stack Developer and Designer with expertise in modern JavaScript frameworks and libraries. Passionate about crafting intuitive, scalable, and visually engaging digital experiences, I seamlessly blend design with functionality to bring ideas to life. Skilled in custom visual effects, animations, and performance optimization, I specialize in building user-focused applications that leave a lasting impact. Driven by curiosity and continuous learning, I thrive on exploring new technologies, solving complex challenges, and collaborating to transform ideas into reality.",
    linkedin: "https://www.linkedin.com/in/arjunkh",
    image: arjun,
  },
  {
    id: 4,
    name: "Ritika Pasari",
    role: "Operations Lead",
    bio: "Building tech, growing communities, and creating impact. I'm Ritika Pasari — a Software Engineer and Community Builder passionate about blending technology with collaboration. With experience in AI, microservices, and AI full-stack development, I enjoy turning ideas into impactful solutions. Beyond code, I actively contribute to developer communities, fostering growth, knowledge-sharing, and meaningful connections. Driven by curiosity and creativity, I thrive on building both products and people.",
    linkedin: "https://www.linkedin.com/in/ritika-pasari-225139225",
    image: ritika,
  },
  {
    id: 5,
    name: "Eric Fernandes",
    role: "Support Lead",
    bio: "Eric Fernandes is a Graduate Engineer Trainee at iTech Robotics & Automation, working on robotics programming and computer vision. Alongside this, he serves as Community Support Manager at the API Community, where he contributes to community growth, developer support, and technical advocacy. Passionate about AI, automation, and open-source, Eric is building a career at the intersection of technology",
    linkedin: "https://www.linkedin.com/in/ericfernandes1681/",
    image: eric,
  },
  {
    id: 6,
    name: "Asmita Khuspe",
    role: "Anchors Lead",
    bio: "I'm a passionate technologist with a strong foundation in C, C++, Java, and Python, and a growing expertise in cloud technologies like AWS, GCP, Azure, DevOps, and system administration. I enjoy solving complex problems, exploring new tools, and bringing efficiency to the projects I work on. Currently preparing to pursue an MS in Cloud Computing abroad, I'm eager to deepen my knowledge and contribute meaningfully to the evolving tech landscape. Beyond coding, I love mentoring, public speaking, and guiding aspiring professionals, as I believe sharing knowledge is just as important as gaining it. At heart, I'm curious, collaborative, and always open to learning.",
    linkedin: "https://www.linkedin.com/in/asmita-khuspe/",
    image: asmita,
  },
  {
    id: 7,
    name: "Roheeni Naraynkar",
    role: " Anchors Lead",
    bio: "I'm Roheeni, currently a Full-Time Technology Analyst at Citi Bank and proud Citi Bridge Grad'24. I have held diverse roles such as Mentor, PR, Developer, and Editor in clubs like Vinidra Satellite Club and Kshitij during my college years. My internship experience spans Reknot Solution, Citi Bank, and a research role at my college. Alongside my career, I'm active in both social and tech volunteering initiatives, serving as an anchor for the API Community and volunteering at Bhumi.",
    linkedin: "http://www.linkedin.com/in/roheeni-narayankar-a7bb49199",
    image: roheeni,
  },
  {
    id: 8,
    name: "Sakshi Sonawane",
    role: "Media Lead",
    bio: "Hi there! I'm Sakshi, a passionate Data Science and Machine Learning enthusiast specialising in developing Python-based solutions to solve complex problems. With hands-on experience in building AI chatbots and creating robust ML pipelines, I am proficient in SQL and Power BI for data analysis and visualisation. I am actively seeking opportunities in Data Analytics and AI to apply my skills and contribute to innovative projects. Let's connect and drive data-driven success together!",
    linkedin: "https://www.linkedin.com/in/sakshi-s-284233206/",
    image: sakshiSonawne,
  },
  {
    id: 9,
    name: "Saloni Pawar",
    role: "Design Lead",
    bio: "I'm Saloni Pawar  an engineer who traded circuits for creativity. While my degree says engineering, my passion drives storytelling, design, and digital strategy. I bring ideas to life as a social media, content creator, and graphic designer, crafting digital experiences that make people stop, think, and connect. I thrive at the intersection of creativity and strategy shaping brand presence, curating stories that resonate, and designing visuals that speak with clarity and style. Currently, I'm working with the API Community a vibrant hub of innovators, developers, and API enthusiasts where technology meets creativity and community.",
    linkedin: "http://linkedin.com/in/saloni-pawar-949aa1178",
    image: saloni,
  },
];

const TeamMemberCard = memo(({ member, onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Team Member Image */}
        <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={member.image}
            alt={member.name}
            width={240}
            height={240}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center rounded-full" style="background: linear-gradient(to bottom right, #e6f4f7, #f3e8ff)">
                    <div class="text-center">
                      <div class="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style="background: linear-gradient(to bottom right, #3097B8, #9333ea)">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Team Member Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {member.name}
          </h3>
          <p className="text-sm font-semibold mb-1" style={{ color: '#3097B8' }}>
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
});

TeamMemberCard.displayName = "TeamMemberCard";

const TeamModal = memo(({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start md:items-center justify-center p-4 bg-black/30 backdrop-blur-sm overflow-auto animate-fadeIn"
      style={{ paddingTop: window.innerWidth < 768 ? "6rem" : undefined }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl md:max-w-4xl max-h-[85vh] overflow-y-auto relative transform transition-all duration-300 ease-out animate-slideUp">
      <button
        onClick={onClose}
        className="absolute text-2xl top-4 right-4 z-10 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-200 text-black font-bold hover:scale-110"
      >
        ×
      </button>


        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-48 md:h-48 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <p className="text-lg md:text-xl font-semibold mb-1" style={{ color: '#3097B8' }}>
                {member.role}
              </p>
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  About
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {member.bio}
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #3097B8 0%, #2a7a9a 50%, #1e5f7a 100%)' }}
                >
                  <FaLinkedin className="w-5 h-5 text-white text-2xl" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TeamModal.displayName = "TeamModal";

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = useCallback((member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMember(null);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Organizing Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-16">
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-left">
              Organizing Team
            </h2>
            <p className="text-lg text-gray-600 max-w-9xl mx-auto leading-relaxed text-left">
              Our mission is to equip our community members with practical skills, enabling them to communicate their insights and drive innovative solutions effectively. Whatever your challenge, these leaders on the front line of transformation, innovation, and exploration helped solve it with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {organizingTeam.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Team Leads Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-left">
              Team Leads & Members
            </h2>
            <p className="text-lg text-gray-600 max-w-9xl mx-auto leading-relaxed text-left ">
              Our Team Leads are the guiding stars, illuminating the path for our community members. They inspire, motivate, and empower our teams to achieve extraordinary results. By leveraging their strategic thinking and problem-solving abilities, they empower our community members to overcome obstacles and achieve groundbreaking results. They empower our community members by providing the tools, resources, and mentorship needed to unlock their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamLeads.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Team Modal */}
      <TeamModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
