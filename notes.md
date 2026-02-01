# CS 260 Notes

## DON'T FORGET!

Commit often!
1. Pull the repository's latest changes from GitHub
```
git pull
```
2. Make changes to the code
 - If you create a new file, make sure to add it
 ```
 git add test.md
 ```
3. Commit the changes
```
git commit -am "add a comment"
```
4. Push the changes to GitHub
```
git push
```

### HTML

Common Elements
 - html - the page container
 - head - header information
 - title - title of the page
 - meta - metadata for the page such as character set or viewport settings
 - script - JavaScript reference. Either an external reference, or inline
 - include - external content reference
 - body - the entire content body of the page
 - header - header of the main content
 - footer - footer of the main content
 - nav - navigational inputs
 - main - main content of the page
 - section - a section of the main content
 - aside - aside content from the main content
 - div - a block division of content
 - span - an inline span of content
 - h<1-9> - text heading. From h1, the highest level, down to h9, the lowest level
 - p - a paragraph of text
 - b - bring attention
 - table - table
 - tr - table row
 - th - table header
 - td - table data
 - ol, ul - ordered or unordered list
 - li - list item
 - a - anchor the text to a hyperlink
 - img - graphical image reference
 - dialog - interactive component such as a confirmation
 - form - a collection of user input
 - input - user input field
 - audio - audio content
 - video - video content
 - svg - scalable vector graphic content
 - iframe - inline frame of another HTML page

User Data Input
 - form - input container and submission
 ```
 <form action="form.html" method="post">
 ```
 - fieldset - labeled input grouping
 ```
 <fieldset> ... </fieldset>
 ```
 - input - multiple types of user input
 ```
 <input type="" />
 ```
 - select - selection dropdown
 ```
 <select><option>1</option></select>
 ```
 - optgroup - grouped selection dropdown
 ```
 <optgroup><option>1</option></optgroup>
 ```
 - option - selection option
 ```
 <option selected>option2</option>
 ```
 - textarea - multiline text input
 ```
 <textarea></textarea>
 ```
 - label - individual input label
 ```
 <label for="range">Range: </label>
 ```
 - output - output of input
 ```
 <output for="range">0</output>
 ```
 - meter - display value with a known range
 ```
 <meter min="0" max="100" value="50"></meter>
 ```

Input Element Types
 - text - single line textual value
 - password - obscursed password
 - email - email address
 - tel - telephone number
 - url - url address
 - number - numerical value
 - checkbox - inclusive selection
 - radio - exclusive selection
 - range - range limited number
 - date - year, month, day
 - datetime-local - date and time
 - month - year, month
 - week - week of year
 - color - color
 - file - local file
 - submit - button to trigger form submission

Common Input Attributes
 - name - the name of the input. This is submitted as the name of the input if used in a form
 - disabled - disables the ability for the user to interact with the input
 - value - the initial value of the input
 - required - signifies that a value is required in order to be valid

External Media Tag URLS
 - Full path: protocol, domain name, and path to the file (https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg)
 - Relative path: file served from the same location as the HTML page rendering the element (images/photo.jpg)

Audio/Video Attributes
 - src - URL to the source audio file
 - controls - if you want the user to be able to control the audio playback
 - autoplay - starts the audio playing as soon as the audio file is loaded
 - loop - keeps audio playing over and over
***use crossorigin="anonymous" if you are requesting files from a different domain than the one serving your content

SVG Vector Graphics (SVG)
 - render graphics inline in your HTML

Canvas
 - introduced to facilitate 2D drawing and animation, requires JavaScript support

Deploy to Production
```
./deployFiles.sh -k <pemkey> -h <domain> -s <name of subdomain>
```

### CSS

Three Ways to Associate CSS with HTML
 1. Use the style attribute of an HTML element and explicitly assign one or more declarations
 ```
 <p style="color:green">CSS</p>
 ```
 2. Use the HTML style element to define CSS rules within the HTML document. The style element should appear in the head element of the document so that the rules apply to all elements of the document.
 ```
 <head>
  <style>
    p {
      color:green;
    }
  </style>
 </head>
 <body>
  <p>CSS</p>
 <body>
 ```
 3. Use the HTML link element to create a hyperlink reference to an external file containing CSS rules. The link element must appear in the head element of the document. This is the preferred way to define CSS.
 ```
 <link rel="stylesheet" href="styles.css" />
 ```

Precedence Rules (from highest to lowest)
 1. Inline Styles: style="color:black"
 2. ID Selectors: #myElement { color:blue; }
 3. Class Selectors, Attribute Selectors, and Pseudo-classes: .myClass { color: green; }
 4. Element Selectors and Pseudo-elements: p { color:red; }
 5. Universal Selector (*) and Inherited Styles

The Box Model
Margin: whitespace, external to actual styling of box
  Border: Color, thickness, line style
    Padding: Background color
      Content: text, image
*the width and height of an element is defined by the width and height of the content box

SELECTORS

Element Type Selector: make all elements of a specific type have the same style

Combinators
 - Descendant: a list of descendants
    -> body section: any section that is a descendant of a body
 - Child: a list of direct children
    -> section > p : any p that is a direct child of a section
 - General sibling: a list of siblings
    -> div ~ p : any p that has a div sibling
 - Adjacent sibling: a list of adjacent siblings
    -> div + p : any p that has an adjacent div sibling

Class Selector: like element type selector, but with specific classes of elements

ID Selector: references the ID of an element. All IDs should be unique within an HTML document and so this select targets a specific element

Attribute Selector: Select any element with a given attribute. You can also specify a required value for an attribute in order for the selector to match

Pseudo Selector: Select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes

Declarations
 - background-color: fill the background color (color: red)
 - border: sets the border using shorthand where any of all of the values may be provided (color width style: #fad solid medium)
 - border-radius: the size of the border radius (unit: 50%)
 - box-shadow: creates a shadow (x-offset y-offset blu-radius color: 2px 2px 2px gray)
 - columns: number of textual columns (number: 3)
 - column-rule: sets the border used between columns using border shorthand (color width style: sold thin black)
 - color: sets the text color (color: rgb(128, 0, 0))
 - cursor: sets the cursor to display when hovering over the element (type: grab)
 - display: defines how to display the element and its children (type: none)
 - filter: applies a visual filter (filter-function: grayscale(30%))
 - float: places the element to the left or right in the flow (direction: right)
 - flex: flex layout. used for responsive design
 - font: defines the text font using shorthand (family size style: arial 1.2em bold)
 - grid: grid layout. used for responsive design
 - height: sets the height of the box (unit: .25em)
 - margin: sets the margin spacing (unit: 5px 5px 0 0)
 - max-[width/height]: restricts the width or height to no more than the unit (unit: 20%)
 - min-[width/height]: restricts the width or height to no less than the unit (unit: 10vh)
 - opacity: sets how opaque the element is (number: .9)
 - overflow: defines what happens when the content does not fix in its box ([visible/hidden/scroll/auto]: scroll)
 - position: defines how the element is positioned in the document ([static/relative/absolute/sticky]: absolute)
 - padding: sets the padding spacing (unit: 1em 2em)
 - left: the horizontal value of a positioned element (unit: 10rem)
 - text-align: defines how the text is aligned in the element ([start/end/center/justify]: end)
 - top: the vertical value of a positioned element (unit: 50px)
 - transform: applies a transformation to the element (transform-function: rotate(0.5turn))
 - width: sets the width of the box (unit: 25vmin)
 - z-index: controls the positioning of the element on the z axis (number: 100)

Units (all units are prefixed with a number when used as a property value)
 - px: number of pixels
 - pt: number of points (1/72 of an inch)
 - in: number of inches
 - cm: number of centimeters
 - %: percentage of the parent element
 - em: multiplier of the width of the letter m in the parent's font
 - rem: multiplier of the width of the letter m in the root's font
 - ex: multiplier of the height of the element's font
 - vw: percentage of the viewport's width
 - vh: percentage of the viewport's height
 - vmin: percentage of the viewport's smaller dimension
 - vmax: percentage of the viewport's larger dimension

Ways to Describe Color
 - keyword (ex: red): a set of predefined colors
 - RGB hx (ex: #00FFAA@@ or #0FA2): red, green, and blue as a hexadecimal number, with an optional alpha opacity
 - RGB function (ex: rgb(128, 255, 128, 0.5)): red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage
 - HSL (ex: hsl(180, 30%, 90%, 0.5)): hue, saturation, and light, with an optional opacity percentage. Hue is the position of the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is

Font Families
 - Serif: extra strokes
 - Sans-serif: no extra strokes
 - Fixed: all the same size
 - Symbol: non-language characters such as arrows or emojis

Options for Importing Fonts
 1. @font-face rule, providing font name and source location. Hosts font files on your server
 ```
 @font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
 }
 p {
  font-family: Quicksand;
 }
 ```
 2. Loads font files from font provider instead of hosting files on server (ex: Google Fonts. The easiest way to use Google fonts is to use a CSS import statement to reference the Google Font Service. This will automatically generate the CSS for importing the font)
 ```
 @import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');
 p {
  font-family: 'Rubik Microbe';
 }
 ```

Animation
Create CSS animations using the animation properties and defining keyframes for what the element should look like at different times in the animation
 - animation-name: refers to the name of the keyframes
 - keyframes: tell what CSS properties should be applied at different key points in the animation sequence
  -> keyframes go from, to, with percentages in between if needed
 - animation-duration property: specifies how long the animation should last
 ```
 p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
 }

 @keyframes demo {
  from {
    font-size: 0vh
  }
  95% {
    font-size: 21vh;
  }
  to {
    font-size: 20vh;
  }
 }


# Start of Default Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
