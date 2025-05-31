import { Check, X } from "lucide-react";
import { cn } from "src/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { containerVariants, itemVariants } from "./../../utils/motionVariants";

export const Pricing = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden text-zinc-800 selection:bg-zinc-300 dark:bg-zinc-950 dark:text-zinc-200 dark:selection:bg-zinc-600"
    >
      <div className="relative z-10 mx-auto max-w-5xl py-10">
        <motion.div variants={itemVariants} className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Pricing
          </h2>
          <p className="text-center text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* Basic */}
          <PriceCard
            tier="Basic"
            price="$10"
            bestFor="Best for personal use."
            CTA={
              <GhostButton className="w-full border">Get started</GhostButton>
            }
            benefits={[
              { text: "100 AI credits included", checked: true },
              { text: "Create up to 5 presentations", checked: true },
              { text: "Generate 100 AI slides", checked: true },
              { text: "Access to 10 design templates", checked: true },
              { text: "Basic analytics reports", checked: false },
            ]}
          />

          {/* Advanced */}
          <PriceCard
            tier="Advanced"
            price="$50"
            bestFor="Best for business use."
            CTA={
              <GhostButton className="w-full border">Get started</GhostButton>
            }
            benefits={[
              { text: "500 AI credits included", checked: true },
              { text: "Create up to 30 presentations", checked: true },
              { text: "Generate 600 AI slides", checked: true },
              { text: "Access to 50 premium templates", checked: true },
              { text: "Advanced analytics and reports", checked: false },
            ]}
          />

          {/* Business */}
          <PriceCard
            tier="Business"
            price="$250"
            bestFor="Best for enterprise use."
            CTA={
              <GhostButton className="w-full ring-1 ring-amber-600 shadow-lg shadow-amber-500/50">
                Get started
              </GhostButton>
            }
            benefits={[
              { text: "5000 AI credits included", checked: true },
              { text: "Unlimited presentations", checked: true },
              { text: "Unlimited AI slides generation", checked: true },
              { text: "Access to full design libraries", checked: true },
              { text: "Enterprise-grade analytics", checked: true },
            ]}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

const PriceCard = ({ tier, price, bestFor, CTA, benefits }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <div className="flex flex-col items-center border-b border-zinc-200 dark:border-zinc-700 pb-6">
          <span className="mb-6 inline-block text-zinc-600 dark:text-zinc-200">
            {tier}
          </span>
          <span className="mb-3 inline-block text-4xl font-bold text-zinc-800 dark:text-zinc-50">
            {price}
          </span>
          <span className="text-center text-zinc-500 dark:text-zinc-400">
            {bestFor}
          </span>
        </div>

        <div className="space-y-4 py-9">
          {benefits.map((b, i) => (
            <Benefit {...b} key={i} />
          ))}
        </div>

        {CTA}
      </Card>
    </motion.div>
  );
};

const Benefit = ({ text, checked }) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-ufo text-sm text-white">
          <Check className="h-3 w-3" />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-300 dark:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
          <X className="h-3 w-3" />
        </span>
      )}
      <span className="text-sm text-zinc-700 dark:text-zinc-300">{text}</span>
    </div>
  );
};

const Card = ({ className, children, style = {} }) => {
  return (
    <div
      style={style}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-700 dark:bg-gradient-to-br dark:from-zinc-950/50 dark:to-zinc-900/80 dark:shadow-none",
        className
      )}
    >
      {children}
    </div>
  );
};

const GhostButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 text-lg font-semibold text-zinc-700 dark:text-zinc-100 transition-all hover:scale-105 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
