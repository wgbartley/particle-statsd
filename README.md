particle-statsd
===============

A simple Node.JS daemon that listens for published events on your Particle event stream, parses them, and pushes them to StatsD.


Options
-------
Options are now set via environment variables.  Available options are:

 - `ACCESS_TOKEN` - (Required) Your Particle cloud access token
 - `EVENT_NAME` - The name of the event to listen for - default: `statsd`
 - `METRIC_PATH` - The metric path prefix for Graphite - default: `particle`
 - `STATSD_HOST` - The hostname or IP address of your StatsD instance - default: `127.0.0.1`
 - `STATSD_PORT` - The UDP port of your StatsD instance - default: `8125`


Data format
-----------
Data format is: `[device name]`;`[metric name]`:`[metric value]`|`[metric type]`,`[metric name]`:`[metric value]`|`[metric type]`

 - `device name` - (Optional)  If not specified with a name (followed by a semi-colon), the Particle device ID will be used instead.
 - `metric name` - The name of the metric you wish to record.  Keep it short so you can fit more data in a single publish.
 - `metric value` - The value of the metric you wish to record.
 - `metric type` - The StatsD metric type to use.

Multiple metrics can be passed as long as each metric set (`metric name`, `metric value`, and `metric type`) is separated by commas.
