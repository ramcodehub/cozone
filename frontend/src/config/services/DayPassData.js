import img1 from "../../assets/img/service-images/daypass1.webp";
import img2 from "../../assets/img/service-images/daypass2.webp";
import img3 from "../../assets/img/service-images/daypass3.jpeg";

const DayPassData = {
  sections: [

    {
      type: "servicecard",
      props: {
        data: 
          {
            title: "Day Pass",

            description:
              "Our Hot Desks and Semi-Open Workspace Cabins offer a flexible, open, and collaborative environment tailored for professionals seeking a dynamic, productive, and cost-effective workspace. Whether you're an individual professional or a team, this space provides the freedom to work in a modern, shared setting with essential office amenities. Enjoy seamless connectivity, ergonomic seating, and access to premium facilities designed to enhance productivity.",

            points: [
              "Ideal for individuals & teams in a shared, open environment",
              "Wired & Wireless Networking for uninterrupted work",
              "Includes Whiteboard, Conference Room, Training Room, & Meeting Room",
              "Secure space for important documents & belongings",
              "Convenience & Comfort: Cafeteria & Housekeeping Services included",
              "Daily booking options for your convenience"
            ],

            images: [img1, img2, img3],
          },
      },
    },

    {
      type: "contactcard",
      props: {
        content: "Join us for a day and get full access to a flexible, ready-to-use workspace that supports productivity, comfort, and convenience — perfect for freelancers, travellers, or teams on the go.",
        action: "modal",
        serviceName: "Day Pass",
      },
    },
  ],
};

export default DayPassData;
