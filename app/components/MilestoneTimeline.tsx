'use client';

import Image from 'next/image';
import { Calendar, Baby, Smile, Utensils, BabyIcon, Heart, Cake } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Milestone {
  id: string;
  month: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
  image?: string; // Optional image path (e.g., '/milestones/month-1.jpg')
}

const milestones: Milestone[] = [
  {
    id: '1',
    month: 'Month 0',
    title: 'Welcome to the World',
    description: 'Nora arrived and filled our hearts with joy',
    icon: <Baby className="w-6 h-6" />,
    date: 'January 11, 2025',
    image: '/milestones/month-0.jpg',
  },
  {
    id: '2',
    month: 'Month 1',
    title: 'First Month',
    description: 'Growing stronger every day',
    icon: <Heart className="w-6 h-6" />,
    image: '/milestones/month-1.jpg',
  },
  {
    id: '3',
    month: 'Month 2',
    title: 'First Real Smile',
    description: 'That heart-melting smile that lights up the room',
    icon: <Smile className="w-6 h-6" />,
    image: '/milestones/month-2.jpg',
  },
  {
    id: '4',
    month: 'Month 3',
    title: 'First Laugh',
    description: 'The sweetest sound we\'ve ever heard',
    icon: <Smile className="w-6 h-6" />,
    image: '/milestones/month-3.jpg',
  },
  {
    id: '5',
    month: 'Month 4',
    title: 'Rolling Over',
    description: 'On the move! Rolling from back to tummy',
    icon: <BabyIcon className="w-6 h-6" />,
    image: '/milestones/month-4.jpg',
  },
  {
    id: '6',
    month: 'Month 5',
    title: 'Sitting Up',
    description: 'Sitting independently and exploring the world',
    icon: <BabyIcon className="w-6 h-6" />,
    image: '/milestones/month-5.jpg',
  },
  {
    id: '7',
    month: 'Month 6',
    title: 'First Solid Food',
    description: 'Trying new flavors and textures',
    icon: <Utensils className="w-6 h-6" />,
    image: '/milestones/month-6.jpg',
  },
  {
    id: '8',
    month: 'Month 7',
    title: 'Crawling',
    description: 'Exploring every corner of the house',
    icon: <BabyIcon className="w-6 h-6" />,
    image: '/milestones/month-7.jpg',
  },
  {
    id: '9',
    month: 'Month 8',
    title: 'First Word',
    description: 'The beginning of many conversations to come',
    icon: <Smile className="w-6 h-6" />,
    image: '/milestones/month-8.jpg',
  },
  {
    id: '10',
    month: 'Month 9',
    title: 'Standing Up',
    description: 'Pulling up and standing with support',
    icon: <BabyIcon className="w-6 h-6" />,
    image: '/milestones/month-9.jpg',
  },
  {
    id: '11',
    month: 'Month 10',
    title: 'First Steps',
    description: 'Taking those wobbly first steps',
    icon: <BabyIcon className="w-6 h-6" />,
    image: '/milestones/month-10.jpg',
  },
  {
    id: '12',
    month: 'Month 12',
    title: 'Turning ONE!',
    description: 'A whole year of love, laughter, and precious memories',
    icon: <Cake className="w-6 h-6" />,
    date: 'January 11, 2026',
    image: '/milestones/month-12.jpg',
  },
];

export default function MilestoneTimeline() {

  return (
    <div className="relative py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
              <Calendar className="w-7 h-7 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Nora's First Year</h2>
            <p className="text-sm text-slate-600">A journey of milestones and memories</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-3"></div>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-pink-200 transform md:-translate-x-1/2"></div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
                <ScrollReveal key={milestone.id} delay={index * 50}>
                  <div className="relative flex items-start gap-4 md:gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-4 border-white">
                        <div className="text-white">
                          {milestone.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 glass-effect rounded-2xl p-5 md:p-6 shadow-lg border border-white/20 ${
                      index % 2 === 0 ? 'md:mr-auto md:max-w-[45%]' : 'md:ml-auto md:max-w-[45%]'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                          {milestone.month}
                        </span>
                        {milestone.date && (
                          <span className="text-xs text-slate-500">• {milestone.date}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        {milestone.description}
                      </p>
                      {/* Image display */}
                      {milestone.image && (
                        <div className="mt-4 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            width={400}
                            height={300}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
