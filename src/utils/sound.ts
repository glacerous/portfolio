// Audio manager for Windows 95/98 retro sound effects and atmosphere

class SoundEffectsManager {
    private mouseDownAudio: HTMLAudioElement | null = null;
    private mouseUpAudio: HTMLAudioElement | null = null;
    private atmosphereAudio: HTMLAudioElement | null = null;
    private computerHumAudio: HTMLAudioElement | null = null;
    private startupAudio: HTMLAudioElement | null = null;
    private isMuted: boolean = false;
    private isInitialized: boolean = false;

    constructor() {
        // Defer audio creation until browser environment
        if (typeof window !== 'undefined') {
            this.init();
        }
    }

    private init() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        try {
            this.mouseDownAudio = new Audio('/audio/mouse/mouse_down.mp3');
            this.mouseDownAudio.volume = 0.55;

            this.mouseUpAudio = new Audio('/audio/mouse/mouse_up.mp3');
            this.mouseUpAudio.volume = 0.55;

            this.startupAudio = new Audio('/audio/startup/startup.mp3');
            this.startupAudio.volume = 0.4;

            this.atmosphereAudio = new Audio('/audio/atmosphere/office.mp3');
            this.atmosphereAudio.loop = true;
            this.atmosphereAudio.volume = 0.08;

            this.computerHumAudio = new Audio('/audio/computer/idle.wav');
            this.computerHumAudio.loop = true;
            this.computerHumAudio.volume = 0.05;

            // Global mouse click sounds
            window.addEventListener('mousedown', () => {
                this.playMouseDown();
                this.startAtmosphere();
            });

            window.addEventListener('mouseup', () => {
                this.playMouseUp();
            });
        } catch (e) {
            console.warn('Audio setup failed:', e);
        }
    }

    public playMouseDown() {
        if (this.isMuted || !this.mouseDownAudio) return;
        try {
            this.mouseDownAudio.currentTime = 0;
            this.mouseDownAudio.play().catch(() => {});
        } catch (_) {}
    }

    public playMouseUp() {
        if (this.isMuted || !this.mouseUpAudio) return;
        try {
            this.mouseUpAudio.currentTime = 0;
            this.mouseUpAudio.play().catch(() => {});
        } catch (_) {}
    }

    public playStartup() {
        if (this.isMuted || !this.startupAudio) return;
        try {
            this.startupAudio.currentTime = 0;
            this.startupAudio.play().catch(() => {});
        } catch (_) {}
    }

    public startAtmosphere() {
        if (this.isMuted) return;
        try {
            if (this.atmosphereAudio && this.atmosphereAudio.paused) {
                this.atmosphereAudio.play().catch(() => {});
            }
            if (this.computerHumAudio && this.computerHumAudio.paused) {
                this.computerHumAudio.play().catch(() => {});
            }
        } catch (_) {}
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            if (this.atmosphereAudio) this.atmosphereAudio.pause();
            if (this.computerHumAudio) this.computerHumAudio.pause();
        } else {
            this.startAtmosphere();
        }
        return this.isMuted;
    }

    public getMuted(): boolean {
        return this.isMuted;
    }
}

export const soundManager = new SoundEffectsManager();
export default soundManager;
