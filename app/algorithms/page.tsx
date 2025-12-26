"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Terminal, Brain, Clock, CheckCircle, ExternalLink, Code, ArrowUp, ChevronDown, 
    Layers, Hash, Cpu, ArrowUpRight, Activity, Zap
} from "lucide-react";

// --- DATA SETS ---
const companyPrepQuestions = [
   { id: 1, title: "Contains Duplicate", category: "Arrays", difficulty: "Easy", url: "https://leetcode.com/problems/contains-duplicate/" },
  { id: 2, title: "Valid Anagram", category: "Arrays", difficulty: "Easy", url: "https://leetcode.com/problems/valid-anagram/" },
  { id: 3, title: "Valid Palindrome", category: "Two Pointers", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/" },
  { id: 4, title: "Best Time to Buy And Sell Stock", category: "Sliding Window", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 5, title: "Valid Parentheses", category: "Stack", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 6, title: "Binary Search", category: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/" },
  { id: 7, title: "Reverse Linked List", category: "Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: 8, title: "Invert Binary Tree", category: "Trees", difficulty: "Easy", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: 9, title: "Same Tree", category: "Trees", difficulty: "Easy", url: "https://leetcode.com/problems/same-tree/" },
  { id: 10, title: "Climbing Stairs", category: "1-D DP", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/" },
  { id: 11, title: "Plus One", category: "Math", difficulty: "Easy", url: "https://leetcode.com/problems/plus-one/" },
  { id: 12, title: "Two Sum", category: "Arrays", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/" },
  { id: 13, title: "Two Sum II Input Array Is Sorted", category: "Two Pointers", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  { id: 14, title: "Min Stack", category: "Stack", difficulty: "Easy", url: "https://leetcode.com/problems/min-stack/" },
  { id: 15, title: "Merge Two Sorted Lists", category: "Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 16, title: "Maximum Depth of Binary Tree", category: "Trees", difficulty: "Easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: 17, title: "Kth Largest Element in a Stream", category: "Priority Queue", difficulty: "Easy", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
  { id: 18, title: "Subsets", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/" },
  { id: 19, title: "Min Cost Climbing Stairs", category: "1-D DP", difficulty: "Easy", url: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
  { id: 20, title: "Happy Number", category: "Math", difficulty: "Easy", url: "https://leetcode.com/problems/happy-number/" },
  { id: 21, title: "Group Anagrams", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/" },
  { id: 22, title: "Longest Substring Without Repeating Characters", category: "Sliding Window", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 23, title: "Evaluate Reverse Polish Notation", category: "Stack", difficulty: "Medium", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: 24, title: "Koko Eating Bananas", category: "Binary Search", difficulty: "Medium", url: "https://leetcode.com/problems/koko-eating-bananas/" },
  { id: 25, title: "Reorder List", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/reorder-list/" },
  { id: 26, title: "Subtree of Another Tree", category: "Trees", difficulty: "Easy", url: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { id: 27, title: "K Closest Points to Origin", category: "Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/" },
  { id: 28, title: "Combination Sum", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/" },
  { id: 29, title: "Permutations", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/" },
  { id: 30, title: "Letter Combinations of a Phone Number", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
  { id: 31, title: "Number of Islands", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/" },
  { id: 32, title: "Walls And Gates", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/walls-and-gates/" },
  { id: 33, title: "Rotting Oranges", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/rotting-oranges/" },
  { id: 34, title: "Longest Palindromic Substring", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: 35, title: "Longest Common Subsequence", category: "2-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/" },
  { id: 36, title: "Gas Station", category: "Greedy", difficulty: "Medium", url: "https://leetcode.com/problems/gas-station/" },
  { id: 37, title: "Merge Intervals", category: "Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/" },
  { id: 38, title: "Spiral Matrix", category: "Math", difficulty: "Medium", url: "https://leetcode.com/problems/spiral-matrix/" },
  { id: 39, title: "Reverse Bits", category: "Bit Manipulation", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-bits/" },
  { id: 40, title: "Reverse Integer", category: "Bit Manipulation", difficulty: "Medium", url: "https://leetcode.com/problems/reverse-integer/" },
  { id: 41, title: "Top K Frequent Elements", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { id: 42, title: "Generate Parentheses", category: "Stack", difficulty: "Medium", url: "https://leetcode.com/problems/generate-parentheses/" },
  { id: 43, title: "Find Minimum in Rotated Sorted Array", category: "Binary Search", difficulty: "Medium", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: 44, title: "Remove Nth Node From End of List", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { id: 45, title: "Lowest Common Ancestor of a Binary Search Tree", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: 46, title: "Kth Largest Element in an Array", category: "Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { id: 47, title: "Combination Sum II", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum-ii/" },
  { id: 48, title: "Subsets II", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/subsets-ii/" },
  { id: 49, title: "Surrounded Regions", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/surrounded-regions/" },
  { id: 50, title: "Palindromic Substrings", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/palindromic-substrings/" },
  { id: 51, title: "Best Time to Buy and Sell Stock With Cooldown", category: "2-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
  { id: 52, title: "Encode and Decode Strings", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/encode-and-decode-strings/" },
  { id: 53, title: "3Sum", category: "Two Pointers", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
  { id: 54, title: "Longest Repeating Character Replacement", category: "Sliding Window", difficulty: "Medium", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { id: 55, title: "Daily Temperatures", category: "Stack", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/" },
  { id: 56, title: "Search in Rotated Sorted Array", category: "Binary Search", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: 57, title: "Copy List With Random Pointer", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { id: 58, title: "Binary Tree Level Order Traversal", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: 59, title: "Task Scheduler", category: "Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/task-scheduler/" },
  { id: 60, title: "Word Search", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/word-search/" },
  { id: 61, title: "Implement Trie (Prefix Tree)", category: "Tries", difficulty: "Medium", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { id: 62, title: "Clone Graph", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/" },
  { id: 63, title: "Decode Ways", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/decode-ways/" },
  { id: 64, title: "Coin Change II", category: "2-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change-ii/" },
  { id: 65, title: "Hand of Straights", category: "Greedy", difficulty: "Medium", url: "https://leetcode.com/problems/hand-of-straights/" },
  { id: 66, title: "Non Overlapping Intervals", category: "Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
  { id: 67, title: "Meeting Rooms II", category: "Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/meeting-rooms-ii/" },
  { id: 68, title: "Product of Array Except Self", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: 69, title: "Container With Most Water", category: "Two Pointers", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/" },
  { id: 70, title: "Permutation in String", category: "Sliding Window", difficulty: "Medium", url: "https://leetcode.com/problems/permutation-in-string/" },
  { id: 71, title: "Add Two Numbers", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/add-two-numbers/" },
  { id: 72, title: "Binary Tree Right Side View", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
  { id: 73, title: "Palindrome Partitioning", category: "Backtracking", difficulty: "Medium", url: "https://leetcode.com/problems/palindrome-partitioning/" },
  { id: 74, title: "Pacific Atlantic Water Flow", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { id: 75, title: "Coin Change", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/" },
  { id: 76, title: "Target Sum", category: "2-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/target-sum/" },
  { id: 77, title: "Merge Triplets to Form Target Triplet", category: "Greedy", difficulty: "Medium", url: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/" },
  { id: 78, title: "Multiply Strings", category: "Math", difficulty: "Medium", url: "https://leetcode.com/problems/multiply-strings/" },
  { id: 79, title: "Valid Sudoku", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/valid-sudoku/" },
  { id: 80, title: "Minimum Window Substring", category: "Sliding Window", difficulty: "Hard", url: "https://leetcode.com/problems/minimum-window-substring/" },
  { id: 81, title: "Car Fleet", category: "Stack", difficulty: "Medium", url: "https://leetcode.com/problems/car-fleet/" },
  { id: 82, title: "Time Based Key Value Store", category: "Binary Search", difficulty: "Medium", url: "https://leetcode.com/problems/time-based-key-value-store/" },
  { id: 83, title: "Find The Duplicate Number", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
  { id: 84, title: "Count Good Nodes in Binary Tree", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
  { id: 85, title: "Longest Consecutive Sequence", category: "Arrays", difficulty: "Medium", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { id: 86, title: "Trapping Rain Water", category: "Two Pointers", difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" },
  { id: 87, title: "Largest Rectangle In Histogram", category: "Stack", difficulty: "Hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { id: 88, title: "Median of Two Sorted Arrays", category: "Binary Search", difficulty: "Hard", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { id: 89, title: "Merge K Sorted Lists", category: "Linked List", difficulty: "Hard", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  { id: 90, title: "Construct Binary Tree From Preorder And Inorder Traversal", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { id: 91, title: "Find Median From Data Stream", category: "Priority Queue", difficulty: "Hard", url: "https://leetcode.com/problems/find-median-from-data-stream/" },
  { id: 92, title: "N Queens", category: "Backtracking", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/" },
  { id: 93, title: "Word Search II", category: "Tries", difficulty: "Hard", url: "https://leetcode.com/problems/word-search-ii/" },
  { id: 94, title: "Word Ladder", category: "Graphs", difficulty: "Hard", url: "https://leetcode.com/problems/word-ladder/" },
  { id: 95, title: "Reconstruct Itinerary", category: "Advanced Graphs", difficulty: "Hard", url: "https://leetcode.com/problems/reconstruct-itinerary/" },
  { id: 96, title: "Partition Equal Subset Sum", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
  { id: 97, title: "Distinct Subsequences", category: "2-D DP", difficulty: "Hard", url: "https://leetcode.com/problems/distinct-subsequences/" },
  { id: 98, title: "Edit Distance", category: "2-D DP", difficulty: "Hard", url: "https://leetcode.com/problems/edit-distance/" },
  { id: 99, title: "Reverse Nodes In K Group", category: "Linked List", difficulty: "Hard", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
  { id: 100, title: "Binary Tree Maximum Path Sum", category: "Trees", difficulty: "Hard", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  { id: 101, title: "Min Cost to Connect All Points", category: "Advanced Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
  { id: 102, title: "Cheapest Flights Within K Stops", category: "Advanced Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
  { id: 103, title: "Burst Balloons", category: "2-D DP", difficulty: "Hard", url: "https://leetcode.com/problems/burst-balloons/" },
  { id: 104, title: "Serialize And Deserialize Binary Tree", category: "Trees", difficulty: "Hard", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  { id: 105, title: "Swim In Rising Water", category: "Advanced Graphs", difficulty: "Hard", url: "https://leetcode.com/problems/swim-in-rising-water/" },
  { id: 106, title: "Alien Dictionary", category: "Advanced Graphs", difficulty: "Hard", url: "https://leetcode.com/problems/alien-dictionary/" },
  { id: 107, title: "Regular Expression Matching", category: "2-D DP", difficulty: "Hard", url: "https://leetcode.com/problems/regular-expression-matching/" },
  { id: 108, title: "House Robber", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/" },
  { id: 109, title: "House Robber II", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber-ii/" },
  { id: 110, title: "Longest Increasing Subsequence", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { id: 111, title: "Word Break", category: "1-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/word-break/" },
  { id: 112, title: "Unique Paths", category: "2-D DP", difficulty: "Medium", url: "https://leetcode.com/problems/unique-paths/" },
  { id: 113, title: "Jump Game", category: "Greedy", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game/" },
  { id: 114, title: "Insert Interval", category: "Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/insert-interval/" },
  { id: 115, title: "Pow(x, n)", category: "Math", difficulty: "Medium", url: "https://leetcode.com/problems/powx-n/" },
  { id: 116, title: "Rotate Image", category: "Math", difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/" },
  { id: 117, title: "Number of 1 Bits", category: "Bit Manipulation", difficulty: "Easy", url: "https://leetcode.com/problems/number-of-1-bits/" },
  { id: 118, title: "Counting Bits", category: "Bit Manipulation", difficulty: "Easy", url: "https://leetcode.com/problems/counting-bits/" },
  { id: 119, title: "Missing Number", category: "Bit Manipulation", difficulty: "Easy", url: "https://leetcode.com/problems/missing-number/" },
  { id: 120, title: "Sum of Two Integers", category: "Bit Manipulation", difficulty: "Medium", url: "https://leetcode.com/problems/sum-of-two-integers/" },
  { id: 121, title: "Sliding Window Maximum", category: "Sliding Window", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/" },
  { id: 122, title: "LRU Cache", category: "Linked List", difficulty: "Medium", url: "https://leetcode.com/problems/lru-cache/" },
  { id: 123, title: "Validate Binary Search Tree", category: "Trees", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { id: 124, title: "Design Add and Search Words Data Structure", category: "Tries", difficulty: "Medium", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
  { id: 125, title: "Course Schedule", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule/" },
  { id: 126, title: "Course Schedule II", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule-ii/" },
  { id: 127, title: "Graph Valid Tree", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/graph-valid-tree/" },
  { id: 128, title: "Number of Connected Components in an Undirected Graph", category: "Graphs", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  { id: 129, "title": "Maximum Product Subarray", "category": "1-D DP", "difficulty": "Medium", "url": "https://leetcode.com/problems/maximum-product-subarray/" },
  { id: 130, "title": "Jump Game II", "category": "Greedy", "difficulty": "Medium", "url": "https://leetcode.com/problems/jump-game-ii/" },
  { id: 131, "title": "Meeting Rooms", "category": "Intervals", "difficulty": "Easy", "url": "https://leetcode.com/problems/meeting-rooms/" },
  { id: 132, "title": "Set Matrix Zeroes", "category": "Math", "difficulty": "Medium", "url": "https://leetcode.com/problems/set-matrix-zeroes/" },
  { id: 133, "title": "Single Number", "category": "Bit Manipulation", "difficulty": "Easy", "url": "https://leetcode.com/problems/single-number/" },
  { id: 134, "title": "Maximum Subarray", "category": "1-D DP", "difficulty": "Medium", "url": "https://leetcode.com/problems/maximum-subarray/" },
  { id: 135, "title": "Contains Duplicate II", "category": "Arrays", "difficulty": "Easy", "url": "https://leetcode.com/problems/contains-duplicate-ii/" },
  { id: 136, "title": "Longest Palindrome", "category": "Arrays", "difficulty": "Easy", "url": "https://leetcode.com/problems/longest-palindrome/" },
  { id: 137, "title": "Is Subsequence", "category": "Two Pointers", "difficulty": "Easy", "url": "https://leetcode.com/problems/is-subsequence/" },
  { id: 138, "title": "Backspace String Compare", "category": "Stack", "difficulty": "Easy", "url": "https://leetcode.com/problems/backspace-string-compare/" },
  { id: 139, "title": "Search a 2D Matrix", "category": "Binary Search", "difficulty": "Medium", "url": "https://leetcode.com/problems/search-a-2d-matrix/" },
  { id: 140, "title": "Linked List Cycle", "category": "Linked List", "difficulty": "Easy", "url": "https://leetcode.com/problems/linked-list-cycle/" },
  { id: 141, "title": "Diameter of Binary Tree", "category": "Trees", "difficulty": "Easy", "url": "https://leetcode.com/problems/diameter-of-binary-tree/" },
  { id: 142, "title": "Last Stone Weight", "category": "Priority Queue", "difficulty": "Easy", "url": "https://leetcode.com/problems/last-stone-weight/" },
  { id: 143, "title": "Generate Subsets (Power Set)", "category": "Backtracking", "difficulty": "Medium", "url": "https://leetcode.com/problems/subsets/" },
  { id: 144, "title": "Flood Fill", "category": "Graphs", "difficulty": "Easy", "url": "https://leetcode.com/problems/flood-fill/" },
  { id: 145, "title": "Best Time to Buy and Sell Stock II", "category": "Greedy", "difficulty": "Medium", "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
  { id: 146, "title": "Maximum Units on a Truck", "category": "Greedy", "difficulty": "Easy", "url": "https://leetcode.com/problems/maximum-units-on-a-truck/" },
  { id: 147, "title": "Sort Colors", "category": "Math", "difficulty": "Medium", "url": "https://leetcode.com/problems/sort-colors/" },
  { id: 148, "title": "Find All Anagrams in a String", "category": "Sliding Window", "difficulty": "Medium", "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
  { id: 149, "title": "Remove Duplicates from Sorted List", "category": "Linked List", "difficulty": "Easy", "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
  { id: 150, "title": "Balanced Binary Tree", "category": "Trees", "difficulty": "Easy", "url": "https://leetcode.com/problems/balanced-binary-tree/" },
];

const top100Questions = [
  { id: 1, title: "Two Sum", category: "Arrays", difficulty: "Easy" },
  { id: 2, title: "Best Time to Buy and Sell Stock", category: "Arrays", difficulty: "Easy" },
  { id: 3, title: "Contains Duplicate", category: "Arrays", difficulty: "Easy" },
  { id: 4, title: "Product of Array Except Self", category: "Arrays", difficulty: "Medium" },
  { id: 5, title: "Maximum Subarray", category: "Arrays", difficulty: "Medium" },
  { id: 6, title: "Maximum Product Subarray", category: "Arrays", difficulty: "Medium" },
  { id: 7, title: "Find Minimum in Rotated Sorted Array", category: "Binary Search", difficulty: "Medium" },
  { id: 8, title: "Search in Rotated Sorted Array", category: "Binary Search", difficulty: "Medium" },
  { id: 9, title: "3Sum", category: "Two Pointers", difficulty: "Medium" },
  { id: 10, title: "Container With Most Water", category: "Two Pointers", difficulty: "Medium" },
  { id: 11, title: "Longest Substring Without Repeating Characters", category: "Sliding Window", difficulty: "Medium" },
  { id: 12, title: "Longest Repeating Character Replacement", category: "Sliding Window", difficulty: "Medium" },
  { id: 13, title: "Minimum Window Substring", category: "Sliding Window", difficulty: "Hard" },
  { id: 14, title: "Valid Anagram", category: "Strings", difficulty: "Easy" },
  { id: 15, title: "Group Anagrams", category: "Strings", difficulty: "Medium" },
  { id: 16, title: "Valid Parentheses", category: "Stack", difficulty: "Easy" },
  { id: 17, title: "Min Stack", category: "Stack", difficulty: "Easy" },
  { id: 18, title: "Evaluate Reverse Polish Notation", category: "Stack", difficulty: "Medium" },
  { id: 19, title: "Generate Parentheses", category: "Stack", difficulty: "Medium" },
  { id: 20, title: "Daily Temperatures", category: "Stack", difficulty: "Medium" },
  { id: 21, title: "Car Fleet", category: "Stack", difficulty: "Medium" },
  { id: 22, title: "Largest Rectangle in Histogram", category: "Stack", difficulty: "Hard" },
  { id: 23, title: "Reverse Linked List", category: "Linked List", difficulty: "Easy" },
  { id: 24, title: "Merge Two Sorted Lists", category: "Linked List", difficulty: "Easy" },
  { id: 25, title: "Reorder List", category: "Linked List", difficulty: "Medium" },
  { id: 26, title: "Remove Nth Node From End of List", category: "Linked List", difficulty: "Medium" },
  { id: 27, title: "Linked List Cycle", category: "Linked List", difficulty: "Easy" },
  { id: 28, title: "Merge K Sorted Lists", category: "Linked List", difficulty: "Hard" },
  { id: 29, title: "Add Two Numbers", category: "Linked List", difficulty: "Medium" },
  { id: 30, title: "Copy List with Random Pointer", category: "Linked List", difficulty: "Medium" },
  { id: 31, title: "LRU Cache", category: "Linked List", difficulty: "Medium" },
  { id: 32, title: "Invert Binary Tree", category: "Trees", difficulty: "Easy" },
  { id: 33, title: "Maximum Depth of Binary Tree", category: "Trees", difficulty: "Easy" },
  { id: 34, title: "Diameter of Binary Tree", category: "Trees", difficulty: "Easy" },
  { id: 35, title: "Balanced Binary Tree", category: "Trees", difficulty: "Easy" },
  { id: 36, title: "Same Tree", category: "Trees", difficulty: "Easy" },
  { id: 37, title: "Subtree of Another Tree", category: "Trees", difficulty: "Easy" },
  { id: 38, title: "Lowest Common Ancestor of a BST", category: "Trees", difficulty: "Medium" },
  { id: 39, title: "Binary Tree Level Order Traversal", category: "Trees", difficulty: "Medium" },
  { id: 40, title: "Binary Tree Right Side View", category: "Trees", difficulty: "Medium" },
  { id: 41, title: "Count Good Nodes in Binary Tree", category: "Trees", difficulty: "Medium" },
  { id: 42, title: "Validate Binary Search Tree", category: "Trees", difficulty: "Medium" },
  { id: 43, "title": "Kth Smallest Element in a BST", "category": "Trees", "difficulty": "Medium" },
  { id: 44, "title": "Construct Tree from Preorder and Inorder Traversal", "category": "Trees", "difficulty": "Medium" },
  { id: 45, "title": "Binary Tree Maximum Path Sum", "category": "Trees", "difficulty": "Hard" },
  { id: 46, "title": "Serialize and Deserialize Binary Tree", "category": "Trees", "difficulty": "Hard" },
  { id: 47, "title": "Implement Trie (Prefix Tree)", "category": "Tries", "difficulty": "Medium" },
  { id: 48, "title": "Design Add and Search Words Data Structure", "category": "Tries", "difficulty": "Medium" },
  { id: 49, "title": "Word Search II", "category": "Tries", "difficulty": "Hard" },
  { id: 50, "title": "Find Median from Data Stream", "category": "Heap", "difficulty": "Hard" },
  { id: 51, "title": "Top K Frequent Elements", "category": "Heap", "difficulty": "Medium" },
  { id: 52, "title": "Subsets", "category": "Backtracking", "difficulty": "Medium" },
  { id: 53, "title": "Combination Sum", "category": "Backtracking", "difficulty": "Medium" },
  { id: 54, "title": "Permutations", "category": "Backtracking", "difficulty": "Medium" },
  { id: 55, "title": "Word Search", "category": "Backtracking", "difficulty": "Medium" },
  { id: 56, "title": "Palindrome Partitioning", "category": "Backtracking", "difficulty": "Medium" },
  { id: 57, "title": "N-Queens", "category": "Backtracking", "difficulty": "Hard" },
  { id: 58, "title": "Climbing Stairs", "category": "DP", "difficulty": "Easy" },
  { id: 59, "title": "Coin Change", "category": "DP", "difficulty": "Medium" },
  { id: 60, "title": "Longest Increasing Subsequence", "category": "DP", "difficulty": "Medium" },
  { id: 61, "title": "Longest Common Subsequence", "category": "DP", "difficulty": "Medium" },
  { id: 62, "title": "Word Break", "category": "DP", "difficulty": "Medium" },
  { id: 63, "title": "Combination Sum IV", "category": "DP", "difficulty": "Medium" },
  { id: 64, "title": "House Robber", "category": "DP", "difficulty": "Medium" },
  { id: 65, "title": "House Robber II", "category": "DP", "difficulty": "Medium" },
  { id: 66, "title": "Decode Ways", "category": "DP", "difficulty": "Medium" },
  { id: 67, "title": "Unique Paths", "category": "DP", "difficulty": "Medium" },
  { id: 68, "title": "Jump Game", "category": "DP", "difficulty": "Medium" },
  { id: 69, "title": "Number of Islands", "category": "Graphs", "difficulty": "Medium" },
  { id: 70, "title": "Clone Graph", "category": "Graphs", "difficulty": "Medium" },
  { id: 71, "title": "Course Schedule", "category": "Graphs", "difficulty": "Medium" },
  { id: 72, "title": "Pacific Atlantic Water Flow", "category": "Graphs", "difficulty": "Medium" },
  { id: 73, "title": "Number of Connected Components", "category": "Graphs", "difficulty": "Medium" },
  { id: 74, "title": "Graph Valid Tree", "category": "Graphs", "difficulty": "Medium" },
  { id: 75, "title": "Word Ladder", "category": "Graphs", "difficulty": "Hard" },
  { id: 76, "title": "Rotting Oranges", "category": "Graphs", "difficulty": "Medium" },
  { id: 77, "title": "Min Cost to Connect All Points", "category": "Graphs", "difficulty": "Medium" },
  { id: 78, "title": "Cheapest Flights Within K Stops", "category": "Graphs", "difficulty": "Medium" },
  { id: 79, "title": "Insert Interval", "category": "Intervals", "difficulty": "Medium" },
  { id: 80, "title": "Merge Intervals", "category": "Intervals", "difficulty": "Medium" },
  { id: 81, "title": "Non-overlapping Intervals", "category": "Intervals", "difficulty": "Medium" },
  { id: 82, "title": "Meeting Rooms", "category": "Intervals", "difficulty": "Easy" },
  { id: 83, "title": "Meeting Rooms II", "category": "Intervals", "difficulty": "Medium" },
  { id: 84, "title": "Reverse Bits", "category": "Bit Manipulation", "difficulty": "Easy" },
  { id: 85, "title": "Number of 1 Bits", "category": "Bit Manipulation", "difficulty": "Easy" },
  { id: 86, "title": "Counting Bits", "category": "Bit Manipulation", "difficulty": "Easy" },
  { id: 87, "title": "Missing Number", "category": "Bit Manipulation", "difficulty": "Easy" },
  { id: 88, "title": "Sum of Two Integers", "category": "Bit Manipulation", "difficulty": "Medium" },
  { id: 89, "title": "Gas Station", "category": "Greedy", "difficulty": "Medium" },
  { id: 90, "title": "Hand of Straights", "category": "Greedy", "difficulty": "Medium" },
  { id: 91, "title": "Merge Triplets to Form Target", "category": "Greedy", "difficulty": "Medium" },
  { id: 92, "title": "Maximum Subarray", "category": "Greedy", "difficulty": "Medium" },
  { id: 93, "title": "Jump Game", "category": "Greedy", "difficulty": "Medium" },
  { id: 94, "title": "Trapping Rain Water", "category": "Advanced", "difficulty": "Hard" },
  { id: 95, "title": "Find Median from Data Stream", "category": "Advanced", "difficulty": "Hard" },
  { id: 96, "title": "Sliding Window Maximum", "category": "Advanced", "difficulty": "Hard" },
  { id: 97, "title": "Word Ladder II", "category": "Advanced", "difficulty": "Hard" },
  { id: 98, "title": "Basic Calculator", "category": "Advanced", "difficulty": "Hard" },
  { id: 99, "title": "Text Justification", "category": "Advanced", "difficulty": "Hard" },
  { id: 100, "title": "Integer to English Words", "category": "Advanced", "difficulty": "Hard" },

    // ... all 100 questions (URLs added in original logic)
];

const faangQuestions = {
     "Arrays & Matrix": ["Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate", "Product of Array Except Self", "Maximum Subarray", "Maximum Product Subarray", "Find Minimum in Rotated Sorted Array"],
    "Strings": ["Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Minimum Window Substring", "Valid Anagram", "Group Anagrams", "Valid Parentheses"],
    "Linked Lists": ["Reverse Linked List", "Merge Two Sorted Lists", "Reorder List", "Remove Nth Node From End of List", "Linked List Cycle"],
    "Trees & Graphs": ["Invert/Flip Binary Tree", "Maximum Depth of Binary Tree", "Same Tree", "Subtree of Another Tree", "Lowest Common Ancestor of a BST", "Binary Tree Level Order Traversal", "Number of Islands"],
    "Dynamic Programming": ["Climbing Stairs", "Coin Change", "Longest Increasing Subsequence", "Longest Common Subsequence", "Word Break Problem"],
    // ... rest of FAANG categories
};


// --- NAVIGATION LINKS CONFIG ---
const navLinks = [
    { name: "150_PREP_LOGS", targetId: "prep150" },
    { name: "CURATED_TOP_100", targetId: "top100" },
    { name: "FAANG_MATRIX", targetId: "faang" },
    { name: "SUCCESS_TIPS", targetId: "tips" },
];

// --- HELPER STYLES ---
const getDifficultyStyle = (val: string) => {
    switch (val) {
        case "Hard": return 'text-cyan-400 border-cyan-900/50 bg-cyan-900/10';
        case "Medium": return 'text-blue-400 border-blue-900/50 bg-blue-900/10';
        default: return 'text-slate-500 border-slate-800 bg-slate-900/20';
    }
};

const DSAVaultPage = () => {
    const router = useRouter();
    const [showAllPrep, setShowAllPrep] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleNav = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
            {/* Background Grid */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* HEADER */}
            <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors"
                        >
                            {"<"} BACK_PROTOCOL
                        </button>
                        <div className="h-6 w-px bg-slate-800 mx-2" />
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">DSA_VAULT</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
                        <span className="text-[10px] text-blue-500 uppercase tracking-widest">Archive_Ready</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* SIDEBAR NAVIGATION */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-2 border-l border-slate-800 pl-6">
                            <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6">Directory</h3>
                            {navLinks.map(link => (
                                <button
                                    key={link.targetId}
                                    onClick={() => handleNav(link.targetId)}
                                    className="w-full text-left py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors block"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* CONTENT MODULES */}
                    <div className="flex-1 space-y-32">
                        
                        {/* MODULE: 150 PREP */}
                        <section id="prep150" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Module_150_Prep</h2>
                                <div className="h-px flex-grow bg-slate-800" />
                            </div>
                            
                            <div className="border border-slate-800 bg-slate-900/20 overflow-hidden">
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 bg-slate-900/40 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                                    <div className="col-span-1">ID</div>
                                    <div className="col-span-6">Problem_Name</div>
                                    <div className="col-span-3">Difficulty</div>
                                    <div className="col-span-2 text-right">Link</div>
                                </div>
                                <div className="divide-y divide-slate-800/50">
                                    {companyPrepQuestions.slice(0, showAllPrep ? 150 : 10).map(q => (
                                        <div key={q.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-600/5 transition-colors">
                                            <div className="col-span-1 text-[10px] font-mono text-slate-600">{q.id < 10 ? `0${q.id}` : q.id}</div>
                                            <div className="col-span-6">
                                                <div className="text-[11px] font-bold text-white uppercase">{q.title}</div>
                                                <div className="text-[8px] font-mono text-slate-500 mt-1 uppercase">{q.category}</div>
                                            </div>
                                            <div className="col-span-3">
                                                <span className={`text-[8px] font-mono px-2 py-0.5 border ${getDifficultyStyle(q.difficulty)}`}>{q.difficulty.toUpperCase()}</span>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <a href={q.url} target="_blank" className="text-[9px] font-mono text-blue-500 hover:text-white flex items-center justify-end gap-1 uppercase">
                                                    Source <ArrowUpRight className="w-2 h-2" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setShowAllPrep(!showAllPrep)}
                                    className="w-full py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-900 transition-colors border-t border-slate-800"
                                >
                                    {showAllPrep ? "[ Close_Archive ]" : "[ Expand_Protocol ]"}
                                </button>
                            </div>
                        </section>

                        {/* MODULE: TOP 100 */}
                        <section id="top100" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Curated_Top_100</h2>
                                <div className="h-px flex-grow bg-slate-800" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {top100Questions.map(q => (
                                    <div key={q.id} className="group relative bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-600/50 transition-all overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-[8px] font-mono px-2 py-0.5 border ${getDifficultyStyle(q.difficulty)}`}>{q.difficulty.toUpperCase()}</span>
                                            <span className="text-[9px] font-mono text-slate-700">NODE_{q.id + 100}</span>
                                        </div>
                                        <h3 className="text-[11px] font-black text-white uppercase group-hover:text-blue-400">{q.title}</h3>
                                        <p className="text-[9px] font-mono text-slate-500 uppercase border-t border-slate-800 pt-3 mt-4">{q.category}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* MODULE: FAANG MATRIX */}
                        <section id="faang" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">FAANG_Matrix</h2>
                                <div className="h-px flex-grow bg-slate-800" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(faangQuestions).map(([category, problems]) => (
                                    <div key={category} className="bg-slate-900/20 border border-slate-800 p-8">
                                        <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                            <Activity className="w-3 h-3" /> {category.replace(/\s/g, '_')}
                                        </h3>
                                        <ul className="space-y-3">
                                            {problems.map(p => (
                                                <li key={p} className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                                                    <div className="w-1.5 h-px bg-slate-700" />
                                                    {p.toUpperCase()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* MODULE: TIPS */}
                        <section id="tips" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Success_Protocols</h2>
                                <div className="h-px flex-grow bg-slate-800" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/10 border border-slate-800 p-10 font-mono">
                                <div>
                                    <h4 className="text-[10px] text-blue-400 uppercase mb-6 flex items-center gap-2"><Zap className="w-3 h-3" /> Preparation</h4>
                                    <ul className="space-y-4 text-[10px] text-slate-400">
                                        <li className="flex gap-3"><span className="text-blue-600">01</span> Master patterns over specific solutions.</li>
                                        <li className="flex gap-3"><span className="text-blue-600">02</span> Maintain daily consistency (1 problem min).</li>
                                        <li className="flex gap-3"><span className="text-blue-600">03</span> Analyze Big-O for every submission.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-blue-400 uppercase mb-6 flex items-center gap-2"><Cpu className="w-3 h-3" /> Live_Session</h4>
                                    <ul className="space-y-4 text-[10px] text-slate-400">
                                        <li className="flex gap-3"><span className="text-blue-600">01</span> Verbalize logic stream constantly.</li>
                                        <li className="flex gap-3"><span className="text-blue-600">02</span> Clarify constraints before coding.</li>
                                        <li className="flex gap-3"><span className="text-blue-600">03</span> Test edge cases manually first.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {showBackToTop && (
                <button 
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center hover:bg-blue-500 z-50 transition-colors"
                >
                    ^
                </button>
            )}

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.DATAPOINT // DSA_VAULT // 2025
            </footer>
        </div>
    );
};

export default DSAVaultPage;