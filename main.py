import argparse
parser = argparse.ArgumentParser(description="desc.")

# Required positional argument
parser.add_argument('--count', type=int, help='Shot count')

args = parser.parse_args()

print("Shout count: ", args.count)

if args.count > 6:
    parser.error("count cannot be larger than 6")
