/* MMM-tvservice - Turn HDMI On or Off */

/* Magic Mirror
 * Module: MMM-tvservice
 *
 * By Johan Alvinger https://github.com/Alvinger
 * MIT Licensed.
 */
const NodeHelper = require("node_helper");
var exec = require("child_process").exec;

module.exports = NodeHelper.create({

	// Define start sequence.
	start: function() {
		console.log("Starting node_helper for module: " + this.name);
	},

	// Receive notification
	notificationReceived: function(notification, payload, sender) {
		var self = this;
   		console.log("node_helper for " + self.name + " received a notification: " + notification);
		switch (notification) {
		case "HDMI_ON":
			self.sendCommand("ON");
			break;
		case "HDMI_OFF":
			self.sendCommand("OFF");
			break;
		case "HDMI_STATUS":
			self.sendCommand("STATUS");
			break;
		}
		return true;
	},

	// Receive notification
	socketNotificationReceived: function(notification, payload) {
		var self = this;
   		console.log("node_helper for " + self.name + " received a socket notification: " + notification + " - Payload: " + payload);
		if (notification === "SET_CONFIG") {
			this.config = payload;
			return true;
		}
	},

	/* sendCommand()
	 * Calls tvservice with ON or OFF command.
	 */
	sendCommand: function(action) {
		var self = this;
		var cmd = "";

		// create command
		switch (action) {
		case "ON":
			cmd = "tvservice -p";
			break;
		case "OFF":
			cmd = "tvservice -o";
			break;
		default:
			cmd = "tvservice -s";
			break;
		}
		console.log(self.name + " is executing command: " + cmd);
		// Send command
		exec(cmd, function(error, stdout, stderr) {
			if (error !== null) {
				console.log(self.name + " Error in executing tvservice command");
				console.log(stderr);
			} else {
				console.log("Executed command: " + cmd);
				console.log(stdout);
				switch (action) {
				case "ON":
					self.sendNotification("HDMI_IS_ON",stdout);
					break;
				case "OFF":
					self.sendNotification("HDMI_IS_OFF",stdout);
					break;
				default:
					self.sendNotification("HDMI_CURRENT_STATUS",stdout);
					break;
				}
			}
		})
	}
});
