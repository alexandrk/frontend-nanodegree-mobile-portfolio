# Website Performance Optimization portfolio project

- Performed set of steps to optimize index page of the portfolio to achieve a pageSpeed score in the 90s from 40s.
- Added gulp processor to minify and compress css, js, html and image files automatically.
- Optimized views/js/main.js file to increase page rendering speed and fps results to above 60.

**_Note: access the optimized version from the `./build/` directory or run gulp to generate one yourself_**

## \[index.html\] optimizations:

### Images
    - Resized and compressed the original 'views/images/pizzeria.jpg'
    - Resized and compressed the original 'img/profilepic.jpg'
    - Created a thumbnail for 'views/images/pizzeria.jpg' to be used in the index.html

### Styles:
    - added media="print" directive to "css/print.css" declaration
    - moved 'css/style.css' to inline

### Javascript:
    - added 'async' to 'analytics.js' script (no speed boost)

## \[views/js/main.js\] optimizations:

### Javascript:
    - added 'async' to 'analytics.js' script (no speed boost)

    - main.js:
      - updatePosition()
        - moved document.body.scrollTop out of the loop, to decrease number of DOM queries

      - changePizzaSizes()
        - moved querying DOM and calculations of new width out of the loop

      - generateSlidingPizzas()
        - number of sliding pizzas is generated dynamically based on screen real estate,
          which speeds up rendering time by having less elements to manipulate with

      - for loop for pizzaElementGenerator()
        - moved pizzasDiv variable definition out of the loop, so it will not be set on each
          loop iteration


### Optimization Tips and Tricks:
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api").