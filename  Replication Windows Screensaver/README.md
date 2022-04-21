## 🔸 Description:

Replication of Windows Screensaver - Bounce (https://www.youtube.com/watch?v=NVp6GMHpYvo).

(0, 0) coordinate (x, y) at the very top left of your screen. The box moves diagonally and each time it reaches a border it will change direction of the border it touched. 

If the box is moving bottom-right: 

-- when it reaches the bottom border it will go top. 

-- when it reaches the right border it will go left.

## 🔸 How to know that Box touched the wall?

1. Top: box.style.top = 0px

2. Left: box.style.left = 0px

3. Bottom, Right: problematic...

1) Get full width (screen_width) & height(screen_height) of the screen.

2) Get the width (box_width) & height(box_height) of our box.

3) Then, we reached the right wall `if (Screen_width-box_width) == box.style.left`.
Same for the bottom wall.

<img src="Scheme.JPG" width="250"/>


## 🔸 Moving Directions

1. We declare two variables to store the moving direction of our box: toTop and toLeft

2. If toTop is True, `distance_from_top--;`

3. If toLeft is True, `distance_from_left--;`

4. & vice versa.

## 🔸 JavaScript specifics

1. To get width of screen -> `window.innerWidth;`

2. To get height of screen -> `window.innerHeight;`

3. To get width of box -> `document.getElementById("my_bouncing_box").clientWidth;`

4. To get height of box -> `document.getElementById("my_bouncing_box").clientHeight;`

5. How to use setInterval function?

var x = setInterval(function () {... our main logic 
}, timeStep);

Note: we can pass function as an argument to the function

## 🔸 What I did: 

Learned how to detect if box touched the wall, and how to change directions, using JS specifics

## 🔸 Resources:

• https://www.w3schools.com/Jsref/prop_style_top.asp

• https://www.w3schools.com/jsref/prop_style_left.asp 
