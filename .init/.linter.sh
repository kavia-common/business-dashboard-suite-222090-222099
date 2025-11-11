#!/bin/bash
cd /home/kavia/workspace/code-generation/business-dashboard-suite-222090-222099/dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

