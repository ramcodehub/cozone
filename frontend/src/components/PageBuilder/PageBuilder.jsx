import ServiceCard from "../ServiceCard/ServiceCard";
import ContactCard from "../ContactCard/ContactCard";

const PageBuilder = ({ sections }) => {
  const COMPONENT_MAP = {
    'servicecard': ServiceCard,
    'contactcard': ContactCard,
  };
  return (
    <>
      {sections.map((section, idx) => {
        const SectionComponent = COMPONENT_MAP[section.type];
        if (!SectionComponent) return null;

        return <SectionComponent key={idx} {...section.props} />;
      })}
    </>
  );
};

export default PageBuilder;