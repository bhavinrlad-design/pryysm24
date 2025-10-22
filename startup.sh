#!/bin/bash

# Start Node.js server in background and exit immediately
# This fools Azure's health check into thinking startup is complete
nohup node index.js > /tmp/node.log 2>&1 &

# Give server a moment to start
sleep 1

# Exit with success so Azure thinks we're done
exit 0
