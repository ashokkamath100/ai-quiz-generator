import { Plan } from "@/app/pricing/page";


const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    return (
      <div className="border bg-white p-8 m-2 rounded-2xl">
        <h2 className="text-xl font-bold">{plan.planType}</h2>
        <h3 className="text-med">{plan.featureType}</h3>
        <div className="flex flex-row p-4 ">
            <p className="text-4xl font-bold">{plan.price}</p>
            <p className="text-sm mt-auto">/year</p>
        </div>
        <button className="py-2 px-4 m-2 border border-gray-300 w-full text-center rounded-lg">Buy Plan</button>
        <ul>
          {plan.features.map((feature, index) => (
            <li className="p-2 text-sm" key={index}>- {feature}</li>
          ))}
        </ul>
      </div>
    );
  };

export default PricingCard ; 