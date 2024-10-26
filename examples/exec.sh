#!/bin/bash

for file in examples/*.ts; do
    yarn tsx "$file"
done