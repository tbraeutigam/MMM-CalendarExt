#!/bin/bash
oIFS=$IFS
IFS='
'
for wzone in `grep mapZone windowsZones.xml \
              | grep -oP 'other=".*?"'      \
              | cut -d'"' -f2 \
              | uniq`; do
  echo -ne '"';
  echo -ne "$wzone";
  gzone=$(echo '"'$wzone'"');
  ianaz=$(grep "$gzone" windowsZones.xml \
          | head -n1                     \
          | grep -oP 'type=".*?"'        \
          | cut -d'"' -f2                \
          | awk '{print $1}');
  echo -ne "|$ianaz";
  echo '",';
done \
| grep -v '|"' | sort
IFS=$oIFS
