---
title: "题解：AT_abc397_c [ABC397C] Variety Split Easy"
date: 2025-03-16 10:12:00 +08:00
categories: [学习]
tags: [题解]
comments: true
toc: true
toc_sticky: true
share: false
kramdown:
  math_engine: mathjax
---
# ABC 397 C 题解
[洛谷题目传送门](https://www.luogu.com.cn/problem/AT_abc397_c)  
[atcoder 题目传送门](https://atcoder.jp/contests/abc397/tasks/abc397_c)

## 第一步理解题意

题目大意：给你一个长度为 $ n $ 的整数序列 $ a $ ，当把一个位置上的 $ a $ 分割成两个非空 **连续** 子数组时，求这两个子数组中不同整数的计数之和的最大值。

## 第二步结论

不难想到，对于每个分割点，两个子数组中不同整数的计数个数之和 分别为 左边不同整数的计数之和 $+$ 右边不同整数的计数之和。但算暴力算这个值时间复杂度是 $O(n ^ 2)$ 是要超时的，我们要考虑优化。这个可以用 **前后缀和** 去优化。可以用 $sum1 _ {i}$ 表示考虑前 $i$ 个数字的不同整数的计数个数，$sum2 _ {i}$ 表示考虑后 $i$ 个数字的不同整数的计数个数。对于每一个分割点 $i$ 答案就是 $sum1 _ {i} + sum2 _ {i + 1}$ 。最后只需要求最大值即可。

## 第三步细节

完成细节：对于前后缀和的维护，要用数据结构判断有没有出现过，可以用 $set$ 或 $map$ (这里就不放置用 $map$ 解的代码)，因为 $a \le n$ ，所以也可以用 $bool$ 数组。

## 第四步时间复杂度分析

$1.$ 用 $bool$ 数组做时间复杂度是 $O(n)$ 。

$2.$ 用 $set$ 做时间复杂度是 $O(nlog{n})$ 。

## 第五步代码

**码风不是很清晰勿喷。**

用 $set$ 做得 **AC** 代码。
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 3e5 + 5;
int n, a[N], ans, sum1[N], sum2[N];
set <int> s1, s2;
int main() {
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    cin >> n;
    for (int i = 1; i <= n; i ++)
        cin >> a[i];
    for (int i = 1; i <= n; i ++){
        sum1[i] = sum1[i - 1];
        if(!(s1.count(a[i])))
            sum1[i] ++;
        s1.insert(a[i]);
    }
    for (int i = n; i; i --){
        sum2[i] = sum2[i + 1];
        if(!(s2.count(a[i])))
            sum2[i] ++;
        s2.insert(a[i]);
    }
    for (int i = 1; i <= n; i ++)
        ans = max(ans, sum1[i] + sum2[i + 1]);
    cout << ans << '\n';
}
```

用 $bool$ 数组做得 **AC** 代码。


```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 3e5 + 5;
int n, a[N], ans, sum1[N], sum2[N];
bool b1[N], b2[N];
int main() {
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    cin >> n;
    for (int i = 1; i <= n; i ++)
        cin >> a[i];
    for (int i = 1; i <= n; i ++){
        sum1[i] = sum1[i - 1];
        if(!b1[a[i]])
            sum1[i] ++;
        b1[a[i]] = 1;
    }
    for (int i = n; i; i --){
        sum2[i] = sum2[i + 1];
        if(!b2[a[i]])
            sum2[i] ++;
        b2[a[i]] = 1;
    }
    for (int i = 1; i <= n; i ++)
        ans = max(ans, sum1[i] + sum2[i + 1]);
    cout << ans << '\n';
}
```

---
<h4 class="page__share-title">评论</h4>

<script src="https://utteranc.es/client.js"
        repo="jsntzth/jsntzth.github.io"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
</script>

{% include social-share.html %}
















