#!/bin/bash

for file in examples/*.ts; do
    deno -A --unstable-sloppy-imports "$file"
done