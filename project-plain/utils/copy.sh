#!/bin/sh
cd /Users/junkong/AiCherish/Lesson/node-lesson/blog/project-plain/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log