import PricingCard from "@/components/PricingCard";

export interface Plan {
    planType: string;
    featureType: string;
    price: string;
    features: string[];
  }
  

const pricing = () => {
    const features = ["Create & share quizzes and flashcards", "Study on the go with our mobile app", "All AI features", "Detailed study stats", "Create assignments", "LMS export"] ; 
    const plans: Plan[] = [
        { planType: "Basic", featureType: "Limited features", price: "$0", features: features },
        { planType: "Student",featureType: "Premium", price: "$64", features: features },
        { planType: "Educator",featureType: "Premium", price: "$79", features: features },
      ];

  return (
    <div className="flex flex-col items-center justify-center mx-56 mt-28">
      <h3 className="">Compare Plans</h3>
      <h1 className="text-4xl font-bold p-4">Plans and Pricing</h1>
      <p className="p-4 m-4">
        Get started for free and then upgrade to unlock AI quizzes, flashcards
        and more.
      </p>
      <div className="flex flex-row">
      {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default pricing;
