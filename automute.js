/**
 * @name AutoMute
 * @version 1.0.0
 * @description Automatically mutes and deafens when leaving a voice channel.
 * @author YourName
 * @source https://github.com/sak0v/automute.js
 */

module.exports = class AutoMuteOnLeave {
    start() {
        this.patchVoiceChannel();
    }

    stop() {
        this.unpatchVoiceChannel();
    }

    patchVoiceChannel() {
        const { getMutableVoiceStateForCurrentUser } = BdApi.findModuleByProps("getVoiceState", "getMutableVoiceStateForCurrentUser");
        const { getChannelId } = BdApi.findModuleByProps("getChannelId");
        
        this.interval = setInterval(() => {
            const voiceState = getMutableVoiceStateForCurrentUser();
            if (!getChannelId() && voiceState.mute === false) {
                voiceState.mute = true;
                voiceState.deaf = true;
            }
        }, 1000);
    }

    unpatchVoiceChannel() {
        if (this.interval) clearInterval(this.interval);
    }
}
