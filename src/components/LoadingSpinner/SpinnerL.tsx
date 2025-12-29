'use client';

import { motion } from 'framer-motion';

type SpinnerProps = {
  size?: number;
  color?: string;
};

export default function SpinnerL({
  size = 40,
  color = '#EF4444',
}: SpinnerProps) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `4px solid ${color}`,
        borderTopColor: 'transparent',
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      }}
      aria-label="Loading"
    />
  );
}
