export const playSound = (type: 'open' | 'reveal') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);

    if (type === 'open') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);
    } else if (type === 'reveal') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
    }

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.2);
};
