particle-statsd
===============

A simple Node.JS daemon that listens for published events on your Particle event stream, parses them, and pushes them to StatsD.

By default, it publishes to a StatsD instance listening on 127.0.0.1 on UDP port 8125.  The default path prefix is `stats.particle.`.

Place your access token in the `ACCESS_TOKEN` file on a single line at the top.

Data format is: `[device name]`;`[metric name]`:`[metric value]`|`[metric type]`,`[metric name]`:`[metric value]`|`[metric type]`

 - `device name` is optional.  If not specified with a name (followed by a semi-colon), the Particle device ID will be used instead.
 - `metric name` is the name of the metric you wish to record.  Keep it short so you can fit more data in a single publish.
 - `metric value` is the value of the metric you wish to record.
 - `metric type` is the StatsD metric type to use.
 - Multiple metrics can be passed as long as each metric set (`metric name`, `metric value`, and `metric type`) is separated by commas.
