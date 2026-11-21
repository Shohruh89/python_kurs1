#!/bin/bash

# Runs a command in GitHub Actions. If it fails, the end of its output is also
# reported as an error annotation, which is visible on the run page (and via the API)
# without needing access to the full logs.

log=$(mktemp)
"$@" 2>&1 | tee "$log"
status=${PIPESTATUS[0]}
if [ "$status" -ne 0 ]; then
  message=$(tail -n 40 "$log" | tr -d '\r' | sed 's/%/%25/g' | sed ':a;N;$!ba;s/\n/%0A/g')
  echo "::error title=Failed: $*::${message}"
fi
rm -f "$log"
exit "$status"
