'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Zap, Star } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: 'Explore Universe',
    desc: 'Browse Pokémon and Superheroes with powerful search, sort, and pagination.',
  },
  {
    icon: <Heart className="w-6 h-6 text-red-400" />,
    title: 'Bookmarks',
    desc: 'Save your favorite Pokémon and Heroes and access them anytime.',
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: 'Secure Auth',
    desc: 'Authentication powered by NextAuth with Google & Credentials login.',
  },
  {
    icon: <Star className="w-6 h-6 text-purple-400" />,
    title: 'Modern Stack',
    desc: 'Built with Next.js App Router, TypeScript, MongoDB & TanStack Query.',
  },
];

const AboutPage = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 space-y-16">
      {/* ================= HERO ================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <Badge className="px-4 py-1 text-sm">About SuperPoke</Badge>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          A Universe of{' '}
          <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
            Pokémon
          </span>{' '}
          &{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Superheroes
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
          SuperPoke is a modern web application where users can explore Pokémon
          and Superheroes, view detailed stats, bookmark favorites, and enjoy a
          fast, secure, and interactive experience.
        </p>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* ================= TECH STACK ================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h2 className="text-3xl font-bold">Tech Stack</h2>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Next.js App Router',
            'TypeScript',
            'MongoDB',
            'NextAuth',
            'TanStack Query',
            'shadcn/ui',
            'Tailwind CSS',
            'Framer Motion',
          ].map((tech) => (
            <Badge key={tech} variant="secondary" className="px-4 py-1">
              {tech}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground">
          Designed with scalability, performance, and developer experience in
          mind.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutPage;
