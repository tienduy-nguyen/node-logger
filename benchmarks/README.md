# BENCHMARKS

- Benchmark basic
```bash
node ./benchmarks/basic.js
```

Tested on Nodejs 22.10.0
```bash
┌─────────┬──────────────────────┬───────────┐
│ (index) │ library              │ ops/sec   │
├─────────┼──────────────────────┼───────────┤
│ 0       │ 'Pino'               │ '188,005' │
│ 1       │ '@ekino/logger v3.x' │ '162,575' │
│ 2       │ '@ekino/logger v2.x' │ '143,041' │
│ 3       │ 'Winston'            │ '96,834'  │
└─────────┴──────────────────────┴───────────┘
```

- Benchmark with complex object

```bash
node ./benchmarks/complex.js
```

Tested on Nodejs 22.10.0
```bash
┌─────────┬──────────────────────┬──────────┐
│ (index) │ library              │ ops/sec  │
├─────────┼──────────────────────┼──────────┤
│ 0       │ 'Pino'               │ '26,506' │
│ 1       │ '@ekino/logger v3.x' │ '21,915' │
│ 2       │ '@ekino/logger v2.x' │ '18,826' │
│ 3       │ 'Winston'            │ '4,251'  │
└─────────┴──────────────────────┴──────────┘
```