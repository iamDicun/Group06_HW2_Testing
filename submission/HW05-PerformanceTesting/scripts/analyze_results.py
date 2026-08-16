#!/usr/bin/env python3
"""
Analyze JMeter JML results and check for performance regression.
MSSV: 23127459
"""

import csv
import sys
import argparse
from statistics import mean, median

def parse_jtl(filepath):
    """Parse JMeter JTL results file."""
    results = []
    with open(filepath, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            results.append({
                'timestamp': int(row['timeStamp']),
                'label': row['label'],
                'response_time': int(row['elapsed']),
                'success': row['success'] == 'true',
                'response_code': row['responseCode']
            })
    return results

def calculate_percentile(data, percentile):
    """Calculate percentile value."""
    sorted_data = sorted(data)
    index = int(len(sorted_data) * percentile / 100)
    return sorted_data[min(index, len(sorted_data) - 1)]

def analyze(results, threshold_ms):
    """Analyze results and check for regression."""
    response_times = [r['response_time'] for r in results]
    errors = [r for r in results if not r['success']]
    
    p95 = calculate_percentile(response_times, 95)
    avg = mean(response_times)
    med = median(response_times)
    error_rate = len(errors) / len(results) * 100
    
    print(f"Total Samples: {len(results)}")
    print(f"Average: {avg:.2f}ms")
    print(f"Median: {med:.2f}ms")
    print(f"p95: {p95}ms")
    print(f"Error Rate: {error_rate:.2f}%")
    
    if p95 > threshold_ms:
        print(f"\n❌ FAIL: p95 ({p95}ms) exceeds threshold ({threshold_ms}ms)")
        sys.exit(1)
    else:
        print(f"\n✅ PASS: p95 ({p95}ms) within threshold ({threshold_ms}ms)")
        sys.exit(0)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--jtl', required=True)
    parser.add_argument('--threshold', type=int, default=500)
    args = parser.parse_args()
    
    results = parse_jtl(args.jtl)
    analyze(results, args.threshold)
