import img1 from "../../assets/img/service-images/custombuiltofficespace1.jpg";
import img2 from "../../assets/img/service-images/custombuiltofficespace1.jpg";
import img3 from "../../assets/img/service-images/custombuiltofficespace3.jpeg";

const CustomBuiltOfficeSpacesData = {
  sections: [

    {
      type: "servicecard",
      props: {
        data: 
          {
            title: "Custom Built Office Spaces",

            description:
              "Our 100-Seater Workspace is ideal for large teams and companies looking for a spacious and comfortable place to work together. It’s perfect for corporate events, training programs, or day-to-day team operations. The space is designed to help your team stay focused and productive. With high-speed internet, comfortable seating, and access to meeting rooms, everything is set up to support smooth teamwork and collaboration.",

            points: [
              "Exclusively reserved floor with 100 seats",
              "Prime IT hub location in Doctors Colony, Madhapur",
              "Private floor with no co-working or shared zones",
              "Plug-and-play infrastructure with cabin/Conference Room customized as per your requirement",
              "Managed workspace with daily housekeeping"
            ],

            images: [img1, img2, img3],
          },
      },
    },

    {
      type: "contactcard",
      props: {
        content: "Join us and create a workspace tailored to your team’s size, culture, and workflow — from layout to amenities, everything can be custom-designed to match your operational needs.",
        action: "modal",
        serviceName: "Custom Built Office Spaces",
      },
    },
  ],
};

export default CustomBuiltOfficeSpacesData;
