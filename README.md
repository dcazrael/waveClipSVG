# Waves as SVG clip paths

**This project is still work in progress.**

### Introduction

A current design trend is using waves for backgrounds.
I myself quite enjoy this trend.

Most of the time, waves are nice if they are colored in gradients or color shades.
They can be scaled, since they are SVGs and look overall very nice.

When you want to use an image as the background and then apply the SVG as clip path you can run into several issues.
One of these issues is that the viewport size has to match the image, otherwise you might run into cut of corners.
SVGs use absolute points and scale them accordingly, but clipPaths don't scale unless you use the contentBounding property.

For this to work properly, you want to use relative paths (between 0 and 1).

It can be a hassle to create or convert those SVGs to relative points.

This app is trying to make it a little bit easier, by creating relative paths directly.

### Current features

- generate random waves for clipPaths
- clipPaths are relative
- rotate clipPaths
- adjustable hight
- adjustable phases

- generate random waves (non clip path based)
- rotate waves
- adjustable hight
- adjustable phases

### Credits

This project is inspired by [SVG Wave](https://github.com/anup-a/svgwave).  
Looking at their code helped me figure out how to generate waves.  
I'm using the same algorithm for creating bezier splines.
