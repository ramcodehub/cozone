import img1 from "../../assets/img/service-images/privatecabin1.jpg";
import img2 from "../../assets/img/service-images/privatecabin2.jpg";
import img3 from "../../assets/img/service-images/privatecabin3.jpg";

const PrivateCabinData = {
  sections: [
    {
      type: "servicecard",
      props: {
        data: 
          {
            title: "Private Cabins",

            description:
              "Our Private Cabins are perfect for professionals and teams seeking a secure, quiet, and dedicated workspace. Enjoy the privacy of a lockable cabin where you can focus, strategize, and collaborate without distractions. These cabins cater to businesses that value confidentiality and productivity, offering a professional setting equipped with high-speed WiFi (wired & wireless), ergonomic chairs, and access to meeting rooms. Stay connected while enjoying the comfort of a personalized workspace that balances privacy and community networking.",

            points: [
              "Lockable cabins ensuring maximum privacy",
              "Equipped with a 44-inch display screen",
              "Wired & wireless WiFi for seamless work",
              "Premium chairs and desks for long work hours",
              "Utilize professional conference and training spaces",
              "Ideal for sensitive discussions and strategic planning",
              "Enjoy the benefits of a professional ecosystem",
              "24/7 Power Backup & Security: Uninterrupted work environment"
            ],

            images: [img1, img2, img3],
          },
    
      },
    },

    {
      type: "contactcard",
      props: {
        content: "Join us and experience the comfort of a fully private, secure, and productivity-focused workspace designed for professionals and teams who value quiet, confidentiality, and efficiency.",
        action: "modal",
        serviceName: "Private Cabins",
      },
    },
  ],
};

export default PrivateCabinData;
