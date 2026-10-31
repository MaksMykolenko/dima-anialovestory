// Interactive scripts for serega.html (Love Story Сергія і Ані)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Web Audio API Gazelle Dual-Tone Horn Synthesizer
    let audioCtx = null;

    function playGazelleHorn() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const now = audioCtx.currentTime;
            const duration = 0.65;

            // Two tones for authentic truck / vehicle dual-horn
            const freq1 = 293.66; // D4
            const freq2 = 369.99; // F#4
            const freq3 = 220.00; // A3 undertone

            [freq1, freq2, freq3].forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                osc.type = idx === 2 ? 'sawtooth' : 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                // slight pitch drop like a mechanical air horn
                osc.frequency.exponentialRampToValueAtTime(freq * 0.97, now + duration);

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1400, now);

                const volume = idx === 2 ? 0.15 : 0.25;
                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(volume, now + 0.04);
                gain.gain.setValueAtTime(volume, now + duration - 0.1);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + duration);
            });
        } catch (e) {
            console.warn('AudioContext not permitted or failed', e);
        }
    }

    // Horn interaction logic
    let hornCount = 0;
    const hornPhrases = [
        "БІ-БІ-І-ІП! Серьога передає привіт Ані! 📢❤️",
        "ГАЗЕЛЬ POWER! Траса Київ — Чоп вільна! 🚚💨",
        "Данило Костів та noyvash аплодують красунчику! 🔥",
        "Картопля надійно в кузові, Аня на пасажирському — щастя є! 🥔✨",
        "Повний газ на 4-й передачі! Кохання мчить без зупинок! ⚡",
        "БІ-БІП! Сергій сигналить на всю вулицю заради Ані! 🎺"
    ];

    const megaHornBtn = document.getElementById('megaHornBtn');
    const heroHornBtn = document.getElementById('horn-btn-hero');
    const hornStatus = document.getElementById('hornStatus');
    const hornCountVal = document.getElementById('hornCountVal');
    const metricSpeed = document.getElementById('metricSpeed');

    function triggerHornEvent() {
        playGazelleHorn();
        hornCount++;
        
        if (hornCountVal) {
            hornCountVal.textContent = hornCount;
        }

        if (hornStatus) {
            const randomPhrase = hornPhrases[Math.floor(Math.random() * hornPhrases.length)];
            hornStatus.textContent = randomPhrase;
            hornStatus.classList.remove('horn-pulse');
            void hornStatus.offsetWidth; // trigger reflow
            hornStatus.classList.add('horn-pulse');
        }

        // Temporary boost speed metric for fun
        if (metricSpeed) {
            const boosted = 90 + Math.floor(Math.random() * 35);
            metricSpeed.textContent = boosted;
            setTimeout(() => {
                metricSpeed.textContent = '90';
            }, 1200);
        }
    }

    if (megaHornBtn) {
        megaHornBtn.addEventListener('click', triggerHornEvent);
    }
    if (heroHornBtn) {
        heroHornBtn.addEventListener('click', () => {
            triggerHornEvent();
            // Scroll smoothly to horn section if desired
            const hornSection = document.getElementById('horn');
            if (hornSection) {
                hornSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. Instagram Like and Heart Pop Interaction
    const instaHeartBtn = document.getElementById('instaHeartBtn');
    const instaHeartAnim = document.getElementById('instaHeart');
    const instaLikesCount = document.getElementById('instaLikesCount');
    const instaMainPic = document.querySelector('.insta-main-pic');

    let isLiked = false;
    let baseLikes = 14;

    function toggleLike() {
        isLiked = !isLiked;
        if (instaHeartBtn) {
            instaHeartBtn.classList.toggle('active', isLiked);
        }

        const currentCount = isLiked ? baseLikes + 1 : baseLikes;
        if (instaLikesCount) {
            instaLikesCount.textContent = `Вподобано _tarasiks та ще ${currentCount} іншим`;
        }

        if (isLiked && instaHeartAnim) {
            instaHeartAnim.classList.add('pop');
            setTimeout(() => {
                instaHeartAnim.classList.remove('pop');
            }, 800);
        }
    }

    if (instaHeartBtn) {
        instaHeartBtn.addEventListener('click', toggleLike);
    }

    // Double click on Instagram photo to like
    if (instaMainPic) {
        instaMainPic.addEventListener('dblclick', () => {
            if (!isLiked) {
                toggleLike();
            } else if (instaHeartAnim) {
                instaHeartAnim.classList.add('pop');
                setTimeout(() => {
                    instaHeartAnim.classList.remove('pop');
                }, 800);
            }
        });
    }
});
