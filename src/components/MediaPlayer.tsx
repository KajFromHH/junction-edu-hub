import { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Headphones, X, Play, Pause } from 'lucide-react';

interface MediaPlayerProps {
  scenarioId: string;
  onClose: () => void;
}

// ============================================================
// VIDEO AND PODCAST CONFIGURATION
// ============================================================
// TO ADD YOUR OWN VIDEOS AND PODCASTS:
// 1. Place your video files in /public/videos/ folder
// 2. Place your podcast files in /public/podcasts/ folder
// 3. Update the MEDIA_LIBRARY object below with your file paths
// 
// Format:
// 'scenarioId': {
//   video: '/videos/your-video-file.mp4',
//   podcast: '/podcasts/your-podcast-file.mp3',
//   videoTitle: 'Video Title in Finnish',
//   podcastTitle: 'Podcast Title in Finnish'
// }
// ============================================================

const MEDIA_LIBRARY: Record<string, {
  video?: string;
  podcast?: string;
  videoTitle?: string;
  podcastTitle?: string;
}> = {
  // HOME SCENARIOS
  'rent': {
    video: '/videos/rent-payment-tips.mp4', // REPLACE WITH YOUR VIDEO PATH
    podcast: '/podcasts/rent-and-budgeting.mp3', // REPLACE WITH YOUR PODCAST PATH
    videoTitle: 'Vuokranmaksu ja budjetointi',
    podcastTitle: 'Podcast: Asumiskustannukset Suomessa'
  },
  'furniture': {
    video: '/videos/impulse-buying.mp4',
    podcast: '/podcasts/delayed-gratification.mp3',
    videoTitle: 'Impulssiostojen välttäminen',
    podcastTitle: 'Podcast: Säästämisen psykologia'
  },
  'utility': {
    video: '/videos/energy-saving-finland.mp4',
    podcast: '/podcasts/utility-bills-tips.mp3',
    videoTitle: 'Energiansäästö Suomessa',
    podcastTitle: 'Podcast: Sähkölaskun ymmärtäminen'
  },

  // BANK SCENARIOS
  'savings': {
    video: '/videos/savings-account-finland.mp4',
    podcast: '/podcasts/compound-interest.mp3',
    videoTitle: 'Säästötili ja korkokorko',
    podcastTitle: 'Podcast: Säästämisen aloittaminen'
  },
  'credit-card': {
    video: '/videos/credit-cards-finland.mp4',
    podcast: '/podcasts/credit-score-finland.mp3',
    videoTitle: 'Luottokortin vastuullinen käyttö',
    podcastTitle: 'Podcast: Luottotiedot Suomessa'
  },
  'debt': {
    video: '/videos/debt-management.mp4',
    podcast: '/podcasts/debt-free-journey.mp3',
    videoTitle: 'Velkojen hallinta',
    podcastTitle: 'Podcast: Velaton elämä'
  },
  'capital-gains': {
    video: '/videos/capital-gains-tax-finland.mp4',
    podcast: '/podcasts/investing-taxes.mp3',
    videoTitle: 'Myyntivoittovero Suomessa',
    podcastTitle: 'Podcast: Sijoittaminen ja verotus'
  },
  'investment': {
    video: '/videos/index-funds-finland.mp4',
    podcast: '/podcasts/investing-for-beginners.mp3',
    videoTitle: 'Indeksirahastoihin sijoittaminen',
    podcastTitle: 'Podcast: Sijoittamisen ABC'
  },
  'student-loan': {
    video: '/videos/finnish-student-loan.mp4',
    podcast: '/podcasts/studying-in-finland.mp3',
    videoTitle: 'Opintolaina Suomessa',
    podcastTitle: 'Podcast: Opiskelu ja talous'
  },
  'church-tax': {
    video: '/videos/church-tax-finland.mp4',
    podcast: '/podcasts/finnish-taxes-explained.mp3',
    videoTitle: 'Kirkollisvero Suomessa',
    podcastTitle: 'Podcast: Suomen verojärjestelmä'
  },

  // STORE SCENARIOS
  'groceries': {
    video: '/videos/budget-grocery-shopping.mp4',
    podcast: '/podcasts/food-budgeting-finland.mp3',
  },
  'vat': {
    video: '/videos/finnish-vat-explained.mp4',
    podcast: '/podcasts/understanding-alv.mp3',
    videoTitle: 'ALV eli arvonlisävero',
    podcastTitle: 'Podcast: Hintojen sisältämät verot'
  },
  'phone': {
    video: '/videos/smartphone-costs.mp4',
    podcast: '/podcasts/tech-spending.mp3',
    videoTitle: 'Älypuhelinten todelliset kustannukset',
    podcastTitle: 'Podcast: Tekniikkaostokset'
  },
  'bnpl': {
    video: '/videos/buy-now-pay-later-risks.mp4',
    podcast: '/podcasts/klarna-and-debt.mp3',
    videoTitle: 'Osta nyt, maksa myöhemmin -riskit',
    podcastTitle: 'Podcast: Pikavippi 2.0'
  },

  // OFFICE SCENARIOS
  'verokortti': {
    video: '/videos/tax-card-finland.mp4',
    podcast: '/podcasts/verokortti-guide.mp3',
    videoTitle: 'Verokortti - mitä, miksi, miten?',
    podcastTitle: 'Podcast: Verokortin tilaaminen'
  },
  'tax-return': {
    video: '/videos/tax-return-finland.mp4',
    podcast: '/podcasts/tax-deductions.mp3',
    videoTitle: 'Veroilmoitus Suomessa',
    podcastTitle: 'Podcast: Verovähennysten ABC'
  },
  'summer-job': {
    video: '/videos/student-summer-work.mp4',
    podcast: '/podcasts/summer-job-taxes.mp3',
    videoTitle: 'Opiskelijan kesätyö ja verotus',
    podcastTitle: 'Podcast: Kesätyön talous'
  },

  // CASINO SCENARIOS
  'gambling': {
    video: '/videos/gambling-risks.mp4',
    podcast: '/podcasts/gambling-addiction.mp3',
    videoTitle: 'Uhkapelien riskit',
    podcastTitle: 'Podcast: Peliriippuvuus ja talous'
  },

  // HOSPITAL SCENARIOS
  'healthcare': {
    video: '/videos/finnish-healthcare-system.mp4',
    podcast: '/podcasts/kela-benefits.mp3',
    videoTitle: 'Suomen terveydenhuolto',
    podcastTitle: 'Podcast: Kelan etuudet'
  },

  // DEFAULT FALLBACK - if no specific media found
  'default': {
    video: '/videos/financial-literacy-basics.mp4',
    podcast: '/podcasts/money-management-101.mp3',
    videoTitle: 'Talousosaamisen perusteet',
    podcastTitle: 'Podcast: Rahan hallinta 101'
  }
};

export function MediaPlayer({ scenarioId, onClose }: MediaPlayerProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'podcast'>('video');
  const [isPlaying, setIsPlaying] = useState(false);

  // Get media for current scenario or use default
  const media = MEDIA_LIBRARY[scenarioId] || MEDIA_LIBRARY['default'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'video'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Video className="w-5 h-5" />
              <span>Video</span>
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'podcast'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Headphones className="w-5 h-5" />
              <span>Podcast</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'video' && (
            <div>
              <h3 className="mb-4 text-indigo-600">{media.videoTitle || 'Oppimisvideo'}</h3>
              
              {/* VIDEO PLAYER PLACEHOLDER */}
              {/* TO USE: Replace the placeholder div below with actual video element */}
              {/* <video controls className="w-full rounded-xl" src={media.video}>
                   Your browser does not support video playback.
                  </video> */}
              
              <div className="bg-gray-100 rounded-xl aspect-video flex flex-col items-center justify-center">
                <Video className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center px-4">
                  Video coming soon<br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    File path: {media.video}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-3 text-center px-8">
                  For developers: Replace this div with video element
                </p>
              </div>
            </div>
          )}

          {activeTab === 'podcast' && (
            <div>
              <h3 className="mb-4 text-indigo-600">{media.podcastTitle || 'Talouspodcast'}</h3>
              
              {/* PODCAST PLAYER PLACEHOLDER */}
              {/* TO USE: Replace the placeholder div below with actual audio element */}
              {/* <audio controls className="w-full" src={media.podcast}>
                   Your browser does not support audio playback.
                  </audio> */}
              
              <div className="bg-gray-100 rounded-xl p-8 flex flex-col items-center">
                <Headphones className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-4">
                  Podcast coming soon<br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    File path: {media.podcast}
                  </span>
                </p>
                
                {/* Placeholder audio controls */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <div className="bg-gray-300 rounded-full h-2 w-64">
                    <div className="bg-indigo-500 h-2 rounded-full w-0"></div>
                  </div>
                  <span className="text-sm text-gray-500">0:00</span>
                </div>
                
                <p className="text-xs text-gray-400 mt-6 text-center">
                  For developers: Replace this div with audio element
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl mt-6 hover:shadow-lg transition-all"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}