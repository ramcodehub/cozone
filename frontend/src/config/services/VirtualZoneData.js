import img1 from "../../assets/img/CoZone_Workspace/Reception.jpg";
import img2 from "../../assets/img/Asiansuncity.jpeg";
import img3 from "../../assets/img/service-images/virtualzone2.jpeg";

const VirtualZoneData = {
  sections: [
    
    {
      type: "servicecard",
      props: {
        data: 
          {
            title: "Virtual Zone",

            description:
              "The Communication / Virtual Zone is built for professionals who need a tech-ready space for online meetings, virtual events, or hybrid team sessions. It’s a smart setup for people who work with remote teams or host webinars and video calls. With a large display, strong internet, and good sound control, you’ll always look and sound professional — no matter where your audience is.",

            points: [
              "Not for Company Registration or GST Filing",
              "Professional business address"
            ],

            images: [img1 , img2 , img3],
          },
        
      },
    },

    {
      type: "contactcard",
      props: {
        content: "Join us and elevate your virtual presence with a tech-ready environment built for online meetings, remote collaborations, webinars, and professional communication.",
        action: "modal",
        serviceName: "Virtual Zone",
      },
    },
  ],
};

export default VirtualZoneData;
