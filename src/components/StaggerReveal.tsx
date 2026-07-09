import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
    },
  },
};

export const StaggerContainer: React.FC<{ children: ReactNode; className?: string; staggerDelay?: number }> = ({ children, className, staggerDelay = 0.15 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div variants={itemVariants} className={className}>
    {children}
  </motion.div>
);
