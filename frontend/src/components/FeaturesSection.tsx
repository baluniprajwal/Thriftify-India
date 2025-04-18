import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSection() {
    const features = [
        {
          title: "Curated Vintage Finds",
          description:
            "Each item is handpicked for style, quality, and uniqueness you won’t find anywhere else.",
          icon: <IconHeart />,
        },
        {
          title: "Seamless Shopping",
          description:
            "Easy navigation and fast checkout – shopping vintage has never been this smooth.",
          icon: <IconEaseInOut />,
        },
        {
          title: "Budget-Friendly Fashion",
          description:
            "Style shouldn't be expensive. Our prices make vintage accessible for everyone.",
          icon: <IconCurrencyDollar />,
        },
        {
          title: "Always Online",
          description: "Shop anytime, anywhere – we’re open 24/7 for your fashion needs.",
          icon: <IconCloud />,
        },
        {
          title: "Share the Style",
          description:
            "Tell your friends. Tag your fits. Great finds are meant to be shared.",
          icon: <IconRouteAltLeft />,
        },
        {
          title: "Support That Cares",
          description:
            "Got questions? We’re here for you. Real help, real humans (most of the time).",
          icon: <IconHelp />,
        },
        {
          title: "Easy Returns",
          description:
            "Not your vibe? No worries. Simple returns because we want you to love what you keep.",
          icon: <IconAdjustmentsBolt />,
        },
        {
          title: "Sustainably Stylish",
          description:
            "Fashion that looks good and does good. Reduce waste and slay sustainably.",
          icon: <IconTerminal2 />,
        },
      ];
      
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-8xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800 bg-[#faf6ee]",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#c47a56] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
