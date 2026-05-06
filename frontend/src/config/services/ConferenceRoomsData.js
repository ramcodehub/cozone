import img1 from "../../assets/img/service-images/conferencerooms1.jpg";
import img2 from "../../assets/img/service-images/conferencerooms2.jpg";
import img3 from "../../assets/img/service-images/conferencerooms 3.jpg";

const ConferenceRoomsData = {
  sections: [

    {
      type: "servicecard",
      props: {
        data: {
            title: "Conference Rooms",

            description:
              "Our Meeting Rooms are designed for focused discussions, brainstorming sessions, and professional meetings, offering a quiet, well-equipped, and collaborative atmosphere. These spaces provide ergonomic seating, high-speed internet, and essential meeting amenities to ensure productive sessions. Whether you're hosting a team meeting, client presentation, or strategic discussion, our rooms offer a professional and comfortable setting.",

            points: [
              "Wired & Wireless High-Speed Internet",
              "Equipped with a 32-inch display screen",
              "Ergonomic Chairs & Lockable Storage",
              "Access to Cafeteria & Housekeeping Services",
              "Well-lit, noise-free, and air-conditioned rooms"
            ],

            images: [img1, img2, img3],
        },
      
      },
    },

    {
      type: "contactcard",
      props: {
        content: "Join us and take your meetings to the next level with fully equipped, modern conference spaces designed for presentations, discussions, client interactions, and team collaboration.",
        action: "modal",
        serviceName: "Conference Rooms",
      },
    },
  ],
};

export default ConferenceRoomsData;
