import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'motion/react';

interface MasonryGridProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
}

export function MasonryGrid({ 
  children, 
  gutter = '2rem' 
}: MasonryGridProps) {
  return (
    <div className="px-2 sm:px-0">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}
      >
        <Masonry gutter={gutter}>
          {children}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

// Container with stagger animation
export function AnimatedMasonryGrid({ 
  children, 
  gutter = '2rem' 
}: MasonryGridProps) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="px-2 sm:px-0">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}
      >
        <Masonry gutter={gutter}>
          {childrenArray.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {child}
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}