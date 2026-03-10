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
```

Responsive Design: the ability to reconfigure the interface so the application accomodates and takes advantage of the screen's size and orientation

Display Property Options
 - none - don't display this element. The element still exists, but the browser will not render it
 - block - display this element with a width that fills its parent element. A p or div element has block display by default
 - inline - display this element with a width that is only as big as its content. A b or span element has inline display by default
 - flex - display the element's children in a flexible orientation
 - grid - display this element's children in a grid orientation

Viewport Meta Tag: tells browser to not scale the page. Included in head element of all HTML pages
```
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

Float: moves an element to the left or right of its container element and allows inline elements to wrap around it

@media: dynamically detects the size and orientation of the device and applies CSS rules to represent the strcture of the HTML in a way that accomodates the change

Grid
 1. Start with a container element that has a bunch of child elements
 2. Include CSS display property with the value of grid on the container element
 3. Add properties
    - grid-template-columns: specifies layout of grid columns
    - grid-auto-rows: specifies height of rows
    - grid-gap: specifies size of gaps

How to Debug CSS
 1. Use browser's developer tool to inspect CSS properties and visualize HTML layout
 2. Open directory with VS Code and use Live Server extension to view HTML in Chrome browser. On the broswer, right click on text and select inspect. This will open debugger window and display Elements tab. Styles pane shows all CSS properties applied to currently selected element
 3. You can change any of the CSS properties, and even add new properties, directly in the debugger

Bootstrap
 - Most common CSS framework
 - To integrate:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
  </head>
  <body>
    ...
  </body>
</html>
```
 - To use Bootstrap components that require Javascript, also include this at the end of HTML body element:
```
<body>
  ...

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
```
 - To download Bootstrap and include it in source code (with current version): 
```
npm install bootstrap@5.3.3
```
 - When using in CSS, use btn


### React 1

Steps to Use Node, Json, and NPM
 1. Create your project directory
 2. Initialize it for use with NPM by running
 ```
 npm init -y
 ```
 3. Make sure 
 ```
 .gitignore
 ``` 
 file contains 
 ```
 node_modules
 ```
 4. Install any desired packages with
 ```
 npm install <package name here>
 ```
 5. Add 
 ```
 require('<package name here>')
 ```
  to your application's JavaScript
 6. Use the code the package provides in your JavaScript
 7. Run your code with
 ```
 node index.js
 ```

Debugging JavaScript
 - Insert console.log functions that output the state of the code as it executes
 - Use Chrome browser debugger (press F12)
    -> set breakpoints

Node --watch
```
node --watch main.js
```
How to have node restart automatically and update the browser as the changes are saved
With VS Code, use this launch configuration (specifies the watch parameter whenever debugging with VS Code)
 1. Press CTRL-SHIFT-P
 2. Type "Debug: Add configuration"
 3. Select "Node.js" option
    -> This creates a launch configuration named .vscode/launch.json
 4. Modify configuration so that it includes the --watch parameter. It should look like this:
 ```
 {
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeArgs": ["--watch"],
      "program": "${workspaceFolder}/main.js"
    }
  ]
 }
```

Insert JavaScript into HTML
 1. Script block: directly including it in the HTML within the content of a <script> element
 2. External code: Using the src attribute of the script element to reference an external JavaScript file
 3. Inline event attribute: putting JavaScript directly inline as part of an event attribute handler

Components
 - Reusable UI elements made of combined markup (html tag groups), CSS, and JavaScript
 - Primary purpose: generate the user interface. This is done with the JSX (JavaScript XML) returned from a component
 - If you don't want to directly style components with inline CSS rule sets, you can reference an external CSS file and reference the rules in JSX just like HTML (you will need to use className attribute on an element instead of class because class is a keyword in JavaScript)
 ```
 import './index.css';
 ```
 - Can have child components (components within components)
 - Element properties: another way to pass information to React components. The component receives the properties in its constructor and then can display them when it renders
    JSX
    ```
    <div>Component: <Demo who="Walke" /><div>
    ```
    React Component
    ```
    function Demo(props) {
      return <b>Hello {props.who}</b>;
    }
    ```
 - Internal state: created by calling React.useState hook function. The useState function returns a variable that contains the current state and a function to update the state
 - Component's properties and state are used by React framework to determine the reactivity of the interface. Reactivity controls how a component reacts to actions taken by the user or events that happen within the application. Whenever a component's state or properties change, the render function for the component and all of its dependent component render functions are called

Toolchains
 - code repository - stores code in a shared, versioned location
 - linter - removes, or warns of, non-idiomatic code usage
 - prettier - formats code according to a shared standard
 - transpiler - compiles code into a different format (ex: from JSX to JavaScript, TypeScript to JavaScript, SCSS to CSS)
 - polyfill - generates backward compatible code for supporting old browser versions that do not support the latest standards
 - bundler - packages code into bundles for delivery to the browser. This enables compatibility (ex: ES6 module support) or performance (ex: lazy loading)
 - minifier - removes whitespace and renames variables in order to make code smaller and more efficient to deploy
 - testing - automated tests at multiple levels to ensure correctness
 - deployment - automated packaging and delivery of code from the development environment to the production environment
TOOLCHAIN FOR THIS PROJECT
 - code repository - GitHub
 - JSX, TS, development and debugging support - Vite
 - converting to ES6 modules and transpiling - ESBuild with Babel underneath
 - bundling and tree shaking - Rollup
 - CSS transpiling - PostCSS
 - deployment - simple bash script (deployReact.sh)

### React 2

JavaScript Console Objects
 - console.log() - outputs log message
 - console.time() - outputs how long it takes code to run
 - console.count() - outputs how many times a block of code is called

Types
 - Primitive types
   - Null: the type of a variable that has not been assigned a value
   - Undefined: the type of a variable that has not been defined
   - Boolean: true or false
   - Number: a 64-bit signed number
   - BigInt: a number of arbitrary magnitude
   - String: a textual sequence of characters
   - Symbol: a unique value
 - Object types
   - Object: a collection of properties represented by name-value pairs
   ```
   {a:3, b:'fish'}
   ```
   - Function: an object that has the ability to be called
   ```
   function a() {}
   ```
   - Date: calendar dates and times
   ```
   new Date('1995-12-17')
   ```
   - Array: an ordered sequence of any type
   ```
   [3, 'fish']
   ```
   - Map: a collection of key-value pairs that support efficient lookups
   ```
   new Map()
   ```
   - JSON: a lightweight data-interchange format used to share information across programs
   ```
   {"a":3, "b":"fish"}
   ```

Operators
 - JavaScript supports standard mathematical operators (+ add, - subtract, * multiply, / divide, === equality)
 - String variables: + (concatenation), === (equality)
***Strict equality (===) and unequality (!==): these skip type conversion when computing equality. You can use == and !=, but may get unexpected results, but strict is preferred

Conditionals
 - JavaScript supports if, else, and if else
 - Ternary operator (compact if else representation)
 ```
 a === 1 ? console.log(1) : console.log('not 1');
 ```
 - Boolean operators: &&, ||, !

Loops
 - for
 ```
 for (let i = 0; i < 2; i++) {
  console.log(i);
 }
 // OUTPUT: 0 1
 ```
 - do while
 let i = 0;
 do {
  console.log(i);
  i++;
 } while (i < 2);
 // OUTPUT: 0 1
 ```
 - while
 ```
 let i = 0;
 while (i < 2) {
  console.log(i);
  i++;
 }
 // OUTPUT 0 1
 ```
 - for in - iterates over an object's property names
 ```
 const obj = { a: 1, b: 'fish' };
 for (const name in obj) {
  console.log(name);
 }
 // OUTPUT: a
 // OUTPUT: b
 ```
 for arrays, the object's name is the array index
 ```
 const arr = ['a', 'b'];
 for (const name in arr) {
  console.log(name);
 }
 // OUTPUT: 0
 // OUTPUT: 1
 ```
 - for of - iterates over an iterable's property values
 ```
 const arr = ['a', 'b'];
 for (const val of arr) {
  console.log(val);
 }
 // OUTPUT: 'a'
 // OUTPUT: 'b'
 **All of the looping constructs demonstrated above allow for either a break or continue statement to abort or advance the loop

String
 - Can be defined by surrounding characters with single quotes ('), double quotes ("), or backticks (`)
   - the meaning of single or double quotes are equivalent
   - backtick defines a string literal that may contain JavaScript that is evaluated in place and concatenated into the string. String literal replacement specifier is declared with a dollar sign followed by a curly brace pair. Anything inside curly braces is evaluated as JavaScript
   ```
   console.log(`string${1 + (1 + 1)} text`)
   ```
   - backticks can also be used to create multiline strings without explicitly using \n

String Functions
 - length: the number of characters in the string
 - indexOf(): the starting index of a given substring
 - split(): split the string into an array on the given delimiter string
 - startsWith() - true if the string has a given prefix
 - endsWith() - true if the string has a given suffix
 - toLowerCase() - converts all characters to lowercase

Functions in JavaScript
 - begins with function keyword, 0+ parameters, 0+ return statements, no type declaration
 - if a parameter is not provided then the value of the parameter is undefined when the function executes; function can define default value in function declaration
 - anonymous functions: functions assigned to variable so they can be passed as a parameter to another function
 - functions can be declared inside other functions

Arrow Functions
 - arrow syntax replaces need for the function keyword with teh symbols => placed after the parameter declaration. Curly braces are also optional
 - ex: function in arrow syntax that takes no parameters and always returns 3
 ```
 () => 3;
 ```
 - Return keyword is optional if no curly braces are provided and function contains single expression. Result of expression is automatically returned
 - Closure: allows function to continue referencing its creation even after it has passed out of that scope

Arrays
 - push: add an item to the end of the array
 ```
 a.push(4)
 ```
 - pop: remove an item from the end of the array
 ```
 x = a.pop()
 ```
 - slice: return a sub-array
 ```
 a.slice(1,-1)
 ```
 - sort: run a function to sort an array in place
 ```
 a.sort((a,b) => b-a)
 ```
 - values: creates an iterator for use with a for of loop
 ```
 for (i of a.values()) {...}
 ```
 - find: find the first item satisfied by a test function
 ```
 a.find(i => i < 2)
 ```
 - forEach: run a function on each array item
 ```
 a.forEach(console.log)
 ```
 - reduce: run a function to reduce each array item to a single item
 ```
 a.reduce((a,c) => a + c)
 ```
 - map: run a function to map an array to a new array
 ```
 a.map(i => i+i)
 ```
 - filter: run a function to remove items
 ```
 a.filter(i => i%2)
 ```
 - every: run a function to test if all items match
 ```
 a.every(i => i < 3)
 ```
 - some: run a function to test if any items match
 ```
 a.some(i => i < 1)
 ```

JavaScript Object
 - declare a variable of object type with object-literal syntax
 - Static functions
   - entries: returns an array of key value pairs
   - keys: returns an array of keys
   - values: returns an array of values
 - any function that returns an object is considered a constructor and can be invoked with the new operator
 - this: pointer to the object
 - can use class to define objects
 - more class keywords
   - use extends keyword to define inheritance
   - parameters that need to be passed to the parent class are delivered using the super function
   - any functions defined on the child that have the same name as the parent override the parent's implementation
   - parent's function can be explicitly accessed using super keyword

JSON
 - convert JSON to and from JavaScript using JSON.parse and JSON.stringify functions

localStorage
 - setItem(name, value) - sets a named item's value into local storage
 - getItem(name) - gets a named item's value from local storage
 - removeItem(name) - removes a named item from local storage
 - clear() - clears all items in local storage
 - localStorage value must be of type string, number, or boolean
 - to store a JavaScript object or array, first convert to JSON string (JSON.stringify()) on insertion, and parse back to JavaScript (JSON.parse()) when retrieved

Promise
 - allows main rendering thread to continue while some action is executed in the background
 - use for long running or blocking tasks
 - possible states
   - pending: currently running asynchronously
   - fulfilled: completed successfully
   - rejected: failed to complete
 - set state to fulfilled when things complete correctly or to rejected when an error happens (promise executor function takes resolve and reject functions as parameters)
 - promise object has three functions: then, catch, finally
   - then: called if promise is fulfilled
   - catch: called if promise is rejected
   - finally: always called after all processing is completed

Async/Await syntax
 - async: wraps execution of a promise and removed need to chain functions
   - turns any function into an asynchronous function, so it can in turn make asynchronous requests
   - declares that a function returns a promise
 - await: block until the promise state moves to fulfilled, or throws exception if state moves to rejected
 - combining async with await, you can create code that is asynchronous but still maintains the flow of the code without explicitly using callbacks

Destructuring
 - process of pulling individual items out of an existing one, or removing structure
 - example of destructuring arrays
 ```
 const a = [1, 2, 4, 5];
 // destructure the first two items from a, into the new variables b and c
 const [b, c] = a;
 console.log(b, c);
 // OUTPUT: 1, 2
 ```
 - React makes extensive use of destructuring when you pass parameters to components and create state
 - example of React deconstructing object
 ```
 function Clicker({ initialCount }) {
  const [count, updateCount] = React.useState(initialCount);
  return <div onClick={() => updateCount(count + 1)}>Click Count: {count}</div>;
 }
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<Clicker initialCount={3} />);
 ```

Reactivity
 - React enables reactivity with three major pieces of a React component: props, state, render
 - React keeps a table of state values for every component and records requested state in the table whenever an updateState method is called

Hooks
 - React hooks allow React function style components to be able to do everything that a class style component can do and more
 - useState: declare and update state in a function component
 - useEffect: represent lifecycle effects (ex: run a function every time the component completes a rendering)
   - useEffect callback is called by default every time the component is rendered (to change, add second parameter with dependencies to useEffect call)
 - hooks must be called at top scope of function and can't be called inside loop or conditional


### Service

The Internet
 - dig console utility: look up IP address for any domain name
 - traceroute console utility: determine hops in a connection

TCP/IP (Internal protocol suite) layers
 - Application: functionality like web browsing (ex: HTTPS)
 - Transport: moving connection information packets (ex: TCP)
 - Internet: establishing connections (ex: IP)
 - Link: physical connections (ex: fiber, hardware)

Web Servers
 - web server: physical computing device
 - web service: provides a web application functionality
 - every web server allows for access to multiple services by referring to a different port number for each service
 - service gateway (reverse proxy): simple web service that listens on the common HTTPS port 443, looks at the request URL, and maps it to other services running on different ports (ex: Caddy)
 - microservices: web services that providde a single functional purpose

Web Services
 - To make a web service request, supply the URL of the web service to the fetch function built into browser
 - All files running on browser comprise the frontend of application
 - Functionality provided by web service represents the backend of application
 - Functions provided by a web service are called endpoints (or sometimes APIs). Web service endpoints are accessed from frontend JavaScript with fetch function

URL
 - Uniform Resource Locator (URL) represents location of a web resource
 - Naming Convention: <scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
 - Scheme: the protocol required to ask for the resource
   - For web applications, this is usually HTTPS, but could be any internal protocal such as FTP or MAILTO
 - Domain name: the domain name that owns the resource represented by the URL
   - Ex: byu.edu
 - Port: specifies the numbered network port used to connect to the domain server
   - Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose
   - The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS
 - Path: the path to the resource on the domain
   - The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema
   - Ex: /school/byu/user/8014
 - Parameters: represent a list of key value pairs
   - Usually it provides additional qualifiers on resource represented by the path
   - This might be a filter on the returned resource or how to highlight the resource.
   - The parameters are also sometimes called the query string
   - Ex: filter=names&highlight=intro,summary
 - Anchor: represents sub-location in the resource
   - For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor
    - The anchor is sometimes called the hash or fragment ID
    - Ex: summary
 - URN: Uniform Resource Name, a unique resource name that does not specify location information
 - URI: Uniform Resource Identifier, general resource identifier that could refer to either a URL or a URN

Ports
 - Common port numbers
   - 20: File Transfer Protocol (FTP) for data transfer
   - 22: Secure Shell (SSH) for connecting to remote devices
   - 25: Simple Mail Transfer Protocol (SMTOP) for sending email
   - 53: Domain Name System (DNS) for looking up IP addresses
   - 80: Hypertext Transfer Protocol (HTTP) for web requests
   - 110: Post Office Protocol (POP3) for retrieving email
   - 123: Network Time Protocol (NTP) for managing time
   - 161: Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers
   - 194: Internet Relay Chat (IRC) for chatting
   - 443: HTTP Secure (HTTPS) for secure web requests

HTTP
 - Request syntax
 ```
 <verb> <url path, parameters, anchor> <version>
 [<header key: value>]*
 [
    <body>
 ]
 ```
 - Response syntax
 ```
 <version> <status code> <status string>
 [<header key: value>]*
 [
    <body>
 ]
 ```
 - Common HTTP request verbs
   - GET: get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources
   - POST: create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource
   - PUT: update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource.
   - DELETE: delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete
   - OPTIONS: get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned
 - Status Codes
   - 1xx - informational
   - 2xx - success
   - 3xx - redirect to some other location, or that the previously cached resource is still valid
   - 4xx - client errors. The request is invalid
   - 5xx - server errors. The request cannot be satisfied due to an error on the server
   - Common Codes
     - 100 Continue - the service is working on the request
     - 200 Success - the requested resource was found and returned as appropriate
     - 201 Created - the request was successful and a new resource was created
     - 204 No Content - the request was successful but no resource is returned
     - 304 Not Modified - the cached version of the resource is still valid
     - 307 Permanent redirect - the resource is no longer at the requested location. The new location is specified in the response location header
     - 308 Temporary redirect - the resource is temporarily lcoated at a different location. The temporary location is specified in the response location header
     - 400 Bad request - the request was malformed or invalid
     - 401 Unauthorized - the request did not provide a valid authentication token
     - 403 Forbidden - the provided authentication token is not authorized for the resource
     - 404 Not found - an unknown resource was requested
     - 408 Request timeout - the request takes too long
     - 409 Conflict - the provided resource represents an out of date version of the resource
     - 418 I'm a teapot - the service refuses to brew coffee in a teapot
     - 429 Too many requests - the client is making too many requests in too short of a time period
     - 500 Internal server error - the server failed to properly process the request
     - 503 Service unavailable - the server is temporarily down. The client should try again with an exponential back off
 - Headers: specify metadata about a request or response (things like how to handle security, caching, data formats, and cookies)
   - Authorization: a token that authorized the user making the request
     - Ex: Bearer bGciOiJUIzl1Nilsl
   - Accept: the format the client accepts. This may include wildcards
     - Ex: image/*
   - Content-Type: the format of the content being sent. These are described using standard MIME types
     - Ex: text/html; charset=utf-8
   - Cookie: key value pairs that are generated by the server and stored on the client
     - Ex: SessionID=39s8cgj34;csrftoken=9dck2
   - Host: the domain name of the server. This is required in all requests
     - Ex: info.cern.ch
   - Origin: identifies the origin that caused the request. A host may only allow requests from specific origins
     - Ex: cs260.click
   - Access-Control-Allow-Origin: server response of what origins can make a request. This may include a wildcard
     - Ex: https://cs260.click
   - Content-Length: the number of bytes contained in the response
     - Ex: 368
   - Cache-Control: tells the client how it can cache the response
     - Ex: public, max-age=604800
   - User-Agent: the client application making the request
     - Ex: Mozilla/5.0 (Macintosh)

Troubleshoot 502
1. SSH into your production environment in a bash terminal using the command:
```
ssh -i <path to pem file> ubuntu@<your domain name>
```
2. Navigate to affected service directory
3. List out the files inside your directory using ls. Check to see if all files that need to be there are present.
4. Check to see that your javascript file containing the code to start your node server is named index.js (needs to be all lowercase)
5. Check to see that your file structure is correct. For example, that you have a node_modules directory, a public folder with frontend code inside, server files in project root directory, and the proper configuration files
6. Check to see if the port listed inside of index.js is correct for the service
*If you edited anything to fix the problem in your production environment, run ```pm2 restart <service>``` to restart your service and check your browser (make sure you replace <service> with the service you are trying to fix)
Additional Steps (if the server error still won't resolve)
7. While still in your production environment and in the affected service directory, run ```node index.js```
8. If an error message appears in the terminal then read it carefully and fix the problem
   - If a node module is missing, you need to install the module (npm install <module>) in your development environment, and redeploy
   - If a file is missing, or a file path is incorrect, move the file to the proper location / fix the file path in your development environment and redeploy
9. If no error message appears then you can verify that the service is reachable from your browser. If that works press ctrl c to stop the node server from running. This means that the problem is with how PM2 is configured to run your service. Check to see what PM2 is running with the command ```pm2 describe <service>```

SOP AND CORS
 - Same Origin Policy (SOP) - only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing
 - Cross Origin Resource Sharing (CORS) - allows client (eg browser) to specify origin of a request and then let the server respond with what origins are allowed

Endpoints
 - often called Application Programming Interface (API)
 - considerations when designing endpoints
   - Grammatical: with HTTP everything is a resource. You act on the resource with an HTTP verb
   - Readable: the resource you are referencing with an HTTP request should be clearly readable in the URL path
   - Discoverable: as you expose resources that contain other resources you can provide the endpoints for the aggregated resources. This makes it so someone using your endpoints only needs to remember the top level endpoint and then they can discover everything else
   - Compaitible: when you build your endpoints you want to make it so that you can add new functionality without breaking existing clients. Usually this means that the clients of your service endpoints should ignore anything that they don't understand
   - Simple: keeping your endpoints focused on the primary resources of your applciation helps to avoid the temptation to add endpoints that duplicate or create parallel access to primary resources
   - Documented: it is highly suggested that you make use of tools that help create, use, and maintain documentation of your service endpoints in order to provide client libraries for your endpoints and a sandbox for experimentation
 - Remote Procedure Calls (RPC) - expose service endpoints as simple function calls
 - Representational State Transfer (REST) - attempts to take advantage of foundational principles of HTTP
 - Graph QL - focuses on manipulation of data instead of a function call (RPC) or a resource (REST). The heart of GraphQL is a query that specifies the desired data and how it should be joined and filtered

Account Creation and Login
 - Three service endpoints: one to initially ```register```, a second to ```login``` on future visits, and a third to ```logout```
   - Registration: create account (create user and auth)
   - Login: log into account (create auth)
   - Logout: logout of account (delete auth)
   - Get me: returns information about authenticated user


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
