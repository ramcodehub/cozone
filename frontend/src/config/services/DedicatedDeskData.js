import img1 from "../../assets/img/service-images/dedicateddesk4.jpeg";
import img2 from "../../assets/img/service-images/dedicateddesk4.jpeg";
import img3 from "../../assets/img/service-images/dedicateddesk4.jpeg";

const DedicatedDeskData = {
  sections: [
    {
      type: "servicecard",
      props: {
        data: 
          {
            title: "Dedicated Desk",

            description:
              "Our Private Cabins are perfect for professionals and teams seeking a secure, quiet, and dedicated workspace. Enjoy the privacy of a lockable cabin where you can focus, strategize, and collaborate without distractions.These cabins cater to businesses that value confidentiality and productivity, offering a professional setting equipped with high-speed WiFi (wired & wireless), ergonomic chairs, and access to meeting rooms. Stay connected while enjoying the comfort of a personalized workspace that balances privacy and community networking.",
            points: [
              "Lockable cabins ensuring maximum privacy",
              "Wired & wireless WiFi for seamless work",
              "Premium chairs and desks for long work hours",
              "Utilize professional conference and training spaces",
              "Ideal for sensitive discussions and strategic planning",
              "Enjoy the benefits of a professional ecosystem",
              "24/7 Power Backup & Security: Uninterrupted work environment",
            ],

            images: [img1, img2, img3],
          },
        
      },
    },

    {
      type: "contactcard",
      props: {
        content:
          "Join us to enjoy a permanent, personalized workstation where you can work comfortably every day while staying connected to a vibrant and collaborative coworking community.",
        action: "modal",
        serviceName: "Dedicated Desk",
      },
    },
  ],
};

export default DedicatedDeskData;
