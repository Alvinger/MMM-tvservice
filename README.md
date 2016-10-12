# MMM-tvservice

A module for MagicMirror2 (https://github.com/MichMich/MagicMirror) which uses tvservice to turn HDMI On or Off.

The module relies on external schedulers/scripts (e.g. MMM-ModuleScheduler) to decide when to turn the HDMI on or off.


# Install

1. Clone repository into `../modules/` inside your MagicMirror folder.
2. Run `npm install` inside `../modules/MMM-tvservice/` folder.
3. Add the module to the MagicMirror config.
```
	{
		module: "MMM-tvservice"
        }
```

Add a schedule using MMM-ModuleScheduler to schedule On and Off times.
```
	{
		module: "MMM-ModuleScheduler",
		config: {
			notification_schedule: [
				{notification: "HDMI_ON", schedule: "30 6 * * *", payload: {type: "notification"}},
				{notification: "HDMI_OFF", schedule: "0 23 * * *", payload: {type: "notification"}}
			]
		}
        }
```

An alternative way is for your own module to send a notification. The following notifications are recognized:
- HDMI_ON, turn HDMI ON
- HDMI_OFF, turn HDMI OFF
- HDMI_STATUS, outputs status from tvservice into log

