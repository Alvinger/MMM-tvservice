/* tvservice - Turn HDMI On or Off */

/* Magic Mirror
 * Module: MMM-tvservice
 *
 * By Johan Alvinger https://github.com/Alvinger/MMM-tvservice
 * MIT Licensed.
 */
Module.register("MMM-TVOnOff",{
	start: function() {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification("SET_CONFIG", this.config);
	}
});
