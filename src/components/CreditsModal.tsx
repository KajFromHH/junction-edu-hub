import { motion } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-1">📜 Credits & Licenses</h2>
              <p className="text-white/90 text-sm">Acknowledgments and Third-Party Resources</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Figma Make AI Attribution */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🤖 Development Tool
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>This application was created using Figma Make AI</strong>
              </p>
              <p className="text-sm">
                Figma Make is an AI-powered tool by Figma that enables rapid prototyping and web application development.
              </p>
              <p className="text-sm">
                © 2025 Figma, Inc. All rights reserved.
              </p>
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm mt-2"
              >
                Learn more about Figma <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </section>

          {/* License Information */}
          <section className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              ⚖️ License
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>MIT License</strong>
              </p>
              <p>
                This educational software is provided for learning purposes. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the Software for educational purposes.
              </p>
              <p className="text-xs text-gray-600 mt-3">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. This is an educational project and should not be used for collecting personal identifiable information (PII) or handling sensitive data.
              </p>
            </div>
          </section>

          {/* Core Technologies */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🛠️ Core Technologies
            </h3>
            <div className="grid gap-3">
              <CreditItem
                name="React"
                description="A JavaScript library for building user interfaces"
                license="MIT License"
                link="https://react.dev"
              />
              <CreditItem
                name="TypeScript"
                description="Typed superset of JavaScript"
                license="Apache License 2.0"
                link="https://www.typescriptlang.org"
              />
              <CreditItem
                name="Tailwind CSS"
                description="A utility-first CSS framework"
                license="MIT License"
                link="https://tailwindcss.com"
              />
            </div>
          </section>

          {/* UI Libraries */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🎨 UI Libraries & Components
            </h3>
            <div className="grid gap-3">
              <CreditItem
                name="shadcn/ui"
                description="Re-usable components built with Radix UI and Tailwind CSS"
                license="MIT License"
                link="https://ui.shadcn.com"
              />
              <CreditItem
                name="Radix UI"
                description="Unstyled, accessible components for building high‑quality design systems"
                license="MIT License"
                link="https://www.radix-ui.com"
              />
              <CreditItem
                name="Motion (Framer Motion)"
                description="A production-ready motion library for React"
                license="MIT License"
                link="https://motion.dev"
              />
              <CreditItem
                name="Lucide React"
                description="Beautiful & consistent icon toolkit"
                license="ISC License"
                link="https://lucide.dev"
              />
            </div>
          </section>

          {/* Additional Libraries */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              📦 Additional Libraries
            </h3>
            <div className="grid gap-3">
              <CreditItem
                name="Recharts"
                description="A composable charting library built on React components"
                license="MIT License"
                link="https://recharts.org"
              />
              <CreditItem
                name="Sonner"
                description="An opinionated toast component for React"
                license="MIT License"
                link="https://sonner.emilkowal.ski"
              />
              <CreditItem
                name="React Hook Form"
                description="Performant, flexible and extensible forms with easy-to-use validation"
                license="MIT License"
                link="https://react-hook-form.com"
              />
              <CreditItem
                name="React DnD"
                description="Drag and Drop for React with a declarative API"
                license="MIT License"
                link="https://react-dnd.github.io/react-dnd"
              />
              <CreditItem
                name="Class Variance Authority (CVA)"
                description="CSS-in-TS variant system for component styling"
                license="Apache License 2.0"
                link="https://cva.style"
              />
            </div>
          </section>

          {/* Image Resources */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🖼️ Image Resources
            </h3>
            <div className="grid gap-3">
              <CreditItem
                name="Unsplash"
                description="Free high-quality images for commercial and non-commercial use"
                license="Unsplash License"
                link="https://unsplash.com"
              />
            </div>
            <p className="text-sm text-gray-600 mt-3 bg-gray-50 rounded-xl p-3">
              All images used in this application are sourced from Unsplash and are free to use under the Unsplash License. Credits to the individual photographers whose work enhances this educational experience.
            </p>
          </section>

          {/* Finnish Resources Reference */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🇫🇮 Finnish Educational Content
            </h3>
            <div className="grid gap-3">
              <CreditItem
                name="vero.fi"
                description="Finnish Tax Administration - Educational resource references"
                license="Public Information"
                link="https://www.vero.fi"
              />
              <CreditItem
                name="Kela"
                description="The Social Insurance Institution of Finland - Educational references"
                license="Public Information"
                link="https://www.kela.fi"
              />
            </div>
            <p className="text-sm text-gray-600 mt-3 bg-gray-50 rounded-xl p-3">
              This game references Finnish financial institutions and regulations for educational purposes only. All scenarios are fictional and simplified for learning.
            </p>
          </section>

          {/* Project Information */}
          <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              📚 Project Information
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Suomi Life</strong> - An Educational Finance Game for Finnish Youth
              </p>
              <p>
                Target Audience: Ages 12-18
              </p>
              <p>
                Purpose: Teaching financial literacy through interactive gameplay
              </p>
              <p className="mt-3">
                <strong>Created for:</strong> Junction 2025 Hackathon
              </p>
              <p>
                <strong>Challenge Track:</strong> Helsinki Education Hub Challenge
              </p>
              <p className="mt-3 text-xs text-gray-600">
                This project is designed for educational purposes and is not intended for collecting personal identifiable information or handling sensitive data.
              </p>
            </div>
          </section>

          {/* Hackathon Information */}
          <section className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              🏆 Junction 2025 Hackathon
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                This project was developed for Junction 2025, one of Europe's leading hackathons.
              </p>
              <p>
                <strong>Challenge:</strong> Helsinki Education Hub Challenge - Creating innovative solutions for Finnish youth education.
              </p>
              <p>
                <strong>Focus Area:</strong> Financial literacy education for teenagers aged 12-18.
              </p>
              <a
                href="https://www.hackjunction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm mt-2"
              >
                Learn more about Junction <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </section>

          {/* Special Thanks */}
          <section>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              💖 Special Thanks
            </h3>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-gray-700 text-sm">
                Thank you to all open-source contributors, developers, and designers who made these tools and resources available to the community. Your work enables educational projects like this to exist and thrive.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface CreditItemProps {
  name: string;
  description: string;
  license: string;
  link: string;
}

function CreditItem({ name, description, license, link }: CreditItemProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-gray-800 mb-1">{name}</h4>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-gray-500 text-xs">License: {license}</p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-700 flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}