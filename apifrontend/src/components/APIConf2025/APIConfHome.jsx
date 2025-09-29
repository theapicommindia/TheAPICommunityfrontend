import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIConf from '../../assets/APIConf/APIConf.jpg';
// import postmanFun from "../assets/postman-fun.svg";
// import speaker from "../assets/callForSpeaker.svg";
// import sponser from "../assets/callForSponsors.svg";
// import GridBackground from "../GridBackground";
import SpeakerSubmissionModal from "./SpeakerSubmissionModal";
import { FloatingDock } from "../ui/floating-dock";
import { Megaphone, Handshake } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import APINavbar from "./APINavbar";

function APIConfHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSponsorClick = () => {
    navigate("/sponsor");
  };

  const dockItems = [
    {
      title: "Call For Speakers",
      icon: <Megaphone className="w-6 h-6 text-orange-600" />,
      href: "#",
      onClick: () => setIsModalOpen(true),
    },
    {
      title: "Call For Sponsors",
      icon: <Handshake className="w-6 h-6 text-orange-600" />,
      href: "#",
      onClick: handleSponsorClick,
    },
  ];

  const dockItemsWithClick = dockItems.map((item) => ({
    ...item,
    icon: (
      <span onClick={item.onClick} style={{ cursor: "pointer" }}>
        {item.icon}
      </span>
    ),
  }));

  return (
    <div className="relative w-screen min-h-screen bg-white overflow-hidden">
      <APINavbar />
      <FloatingDock
        items={dockItemsWithClick}
        desktopClassName="fixed top-10 right-8 z-50"
        mobileClassName="fixed top-18 right-4 z-50"
      />

      <div className="relative pt-24">
        {" "}
        <div className="flex flex-col w-full justify-center items-center gap-6 mt-10 sm:mt-2">
          <img src={APIConf} alt="" className="h-auto w-auto" />
        </div>
        <section className="flex flex-col md:flex-row gap-8 justify-center items-start mt-16 px-4 md:px-0">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              About API Conf 2025
            </h2>
            <p className="text-gray-800 font-medium">
              At KoiAmor, we believe that true well-being begins with
              remembering who you are — beneath the noise, the roles, and the
              expectations.
            </p>
          </div>
          <div className="max-w-lg">
            <p className="text-gray-800 mb-2">
              We were born not out of a business plan, but a lived experience:
            </p>
            <p className="text-gray-800 mb-2">
              the ache of burnout, the silence around mental health, the
              disconnection from the body, and the longing for something deeper.
            </p>
            <p className="italic text-gray-500 mb-2">
              KoiAmor is a return —{" "}
              <span className="font-medium">
                to your rhythm, your truth, and your wholeness.
              </span>
            </p>
            <p className="text-gray-800">
              We’re here to create experiences that don’t just inform,{" "}
              <span className="font-bold italic">but transform.</span>
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-row justify-center items-center mt-12 px-4">
          <div className="bg-white rounded-2xl border-2 border-blue-300 md:p-8 p-6 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between shadow">
            <p className="text-gray-800 text-lg md:text-xl mb-4 md:mb-0">
              We were born not out of a business plan, but a lived experience:
              the ache of burnout, the silence around mental health, the
              disconnection from the body.
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className="text-sm bg-yellow-400 hover:bg-yellow-300 text-black py-2 px-4 rounded-full shadow transition-all relative"
                  style={{ border: "1px solid #000" }}
                >
                  Book A Ticket &gt;
                </button>
              </DialogTrigger>

              <DialogContent
                className="w-full max-w-[85vw] sm:max-w-3xl p-0 bg-white overflow-hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style jsx>{`
                  /* Hide scrollbar in WebKit browsers */
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                <DialogHeader className="flex flex-row justify-between items-center p-4 border-b bg-white text-black">
                  <DialogTitle className="text-base sm:text-lg">
                    Book Your Ticket
                  </DialogTitle>
                  <button
                    onClick={handleClose}
                    className="text-black hover:text-gray-700 text-2xl font-bold bg-transparent"
                    aria-label="Close popup"
                    style={{
                      border: "none",
                      outline: "none",
                      focus: 'none',
                    }}
                  >
                    &times;
                  </button>
                </DialogHeader>

                <div
                  className="hide-scrollbar"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "80vh",
                  }}
                >
                  <iframe
                    src="https://konfhub.com/widget/api-conf-pune-2025?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=002E6E&ticketCl=002E6E&btnColor=fb5850&fontFamily=Prompt&borderRadius=10"
                    id="konfhub-widget"
                    title="Register for THE API CONF PUNE 2025"
                    width="100%"
                    height="100%"
                    style={{
                      border: "none",
                      minHeight: "60vh",
                      maxHeight: "80vh",
                    }}
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        {/* <div className="m-20 flex flex-wrap justify-center gap-8 lg:gap-12">
          <div className="w-full max-w-[400px] border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white">
            <div className="h-64 bg-green-100 border-b-2 border-gray-200 relative">
              <img
                src={speaker}
                alt="Call for Speakers"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Call For Speakers
              </h2>
              <p className="text-gray-600 mb-6">
                Share your expertise with Postman community. Submit your
                proposal to speak at our event.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-100 w-full text-gray-500 py-3 px-6 font-semibold transition-colors"
                style={{
                  border: "2px solid",
                  borderImage:
                    "linear-gradient(to right, #cc5200, #ff8000, #ffd580) 1",
                }}
              >
                Call For Speakers
              </button>
            </div>
          </div>
          <div className="w-full max-w-[400px] border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white relative z-20">
            <div className="h-64 bg-red-100 border-b-2 border-gray-200 relative">
              <img
                src={sponser}
                alt="Call for Sponsors"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Call For Sponsors
              </h2>
              <p className="text-gray-600 mb-6">
                Support our event and connect with the Postman community.
                Explore our sponsorship packages.
              </p>
              <button
                onClick={handleSponsorClick}
                className="bg-gray-100 w-full text-gray-500 py-3 px-6 font-semibold transition-colors"
                style={{
                  border: "2px solid",
                  borderImage:
                    "linear-gradient(to right, #cc5200, #ff8000, #ffd580) 1",
                }}
              >
                Call For Sponsors
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <SpeakerSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default APIConfHome;
