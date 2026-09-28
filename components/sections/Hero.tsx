"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import { HeroSystem } from "./HeroSystem";

const WORDS = "Transform the way your business works, operates and grows.".split(" ");
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[112px] sm:pt-[132px]">
      <div className="grid-paper fade-mask-b pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid items-center gap-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="min-w-0 lg:col-span-6">
          <motion.p
            className="eyebrow mb-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Digital Transformation Company
          </motion.p>

          <h1 id="hero-title" className="display text-[clamp(2.6rem,5vw,4.7rem)] [text-wrap:balance]">
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block ${w === "grows." ? "text-[var(--signal)]" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.08 + i * 0.045, ease }}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            <p className="lede mt-8 max-w-[34rem] !text-[var(--ink-3)]">
              Viral Inbound helps businesses design, build and optimize digital systems that make them more
              connected, automated, intelligent and scalable.
            </p>
            <p className="lede mt-4 max-w-[34rem]">
              We combine technology, software, automation, AI and data to solve real business problems and create
              measurable transformation.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#start" className="btn btn-primary">
                Start Your Transformation <Arrow />
              </a>
              <a href="#solutions" className="btn btn-ghost">
                Explore Our Solutions
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="min-w-0 lg:col-span-6"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
        >
          <HeroSystem />
          <p className="mono mt-4 text-center text-[11px] text-[var(--muted)]">
            Hover a system to follow how one business event moves through a connected stack.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
