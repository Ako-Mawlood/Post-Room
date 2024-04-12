import SwitchFeatureBtn from "./SwitchFeatureBtn";
import Features from "./Features";
const FeaturesPreview = () => {
  return (
    <section className="flex  flex-col justify-between items-center w-60 overflow-hidden mb-12 ">
      <Features />
      <div className=" flex w-24 mt-3  justify-between items-center ">
        <SwitchFeatureBtn switchIndex={0} />
        <SwitchFeatureBtn switchIndex={1} />{" "}
        <SwitchFeatureBtn switchIndex={2} />{" "}
        <SwitchFeatureBtn switchIndex={3} />
      </div>
    </section>
  );
};

export default FeaturesPreview;
