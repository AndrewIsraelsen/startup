# CS 260 Notes

Now this is gonna be epic

In this github reading, I primarily learned about Personal Access Tokens. The last time I used Github from command line, they weren't required, and I don't like that they are now. It makese sense though, they're definitely far more secure than a password. They're a pain though, and I wish there was an option to use passwords still.

Other than that, basically it's what I remember.
















# Pre-made notes I guess:


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

### Inputs
Using the type attribute on input elements can give lots of good specific functionality. For example, "file" as a type for an input will help the user select a local file. "Date" will help pick a date, and the list goes on and on.

Other common attributes other than "type" for inputs are "name", "disabled", "value", and "required"
"pattern" can also be used to use a regular expression to check input
"hidden" type can send data unseen to the user

### Media

Use "alt" attribute to have text replacement under html media element that won't load.

"controls" attribute for audio to let user control audio playback. "autoplay" starts as soon as it loads, and "loop" has it loop over and over.



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

#
#
# Final Exam Topic Notes
## What is the default port for HTTP/HTTPS/SSH? 
### 80/443/22

## What does an HTTP status code in the range of 300/400/500 indicate?
### Errors, first is a redirection error, then client side error, then server error respectively.

## What does the HTTP header content-type allow you to do?
### Used to specify what type media type the resource is

## What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
### Cookie is only sent over HTTPS/can't be accessed by Javascript (like Document.cookies)/Determines if cookeis can travel to other sites (Strict & Lax)

## Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
### Whatever is in the req function

## Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
### whatever is in the res function

## Given the following MongoDB query, select all of the matching documents {name:Mark}
### Probably Mark idek

## How should user passwords be stored?
### Encrypted in DB

## Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
### prolly connected or something

## What is the websocket protocol intended to provide?
### A way for the server to push to clients, as well as clients to push to eachother in a way.

## What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
### Javascript XML(Extensible Markup Language), Javascript, Amazon Web service, Node Package Manager, Node Version Manager

## Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.
### Probably whatever's in the component lmbo

## Given a set of React components that include each other, what will be generated
### Probably a really cool component

## What does a React component with React.useState do?
### useState stores values for the component to use, like a variable specific to it, or more like a class attribute.

## What are React Hooks used for?
### They let you organize and hook into things within a component. Access states and when states change and more.

### What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks
## Remember variables/Gets information from distant parent Components/Variables that aren't rendered with the component (internal data)/Runs function every time a dependancy updates. Especially used for syncing with external systems/Used for memoization of data; not having to do all the rerendering or other work again if it's been done.

## Given React Router code, select statements that are true.
### Prolly routing and true and false and such ayo

## What does the package.json file do?
### Has info about your node project. Name, version, dependancies, scripts, etc... Many edits are handled with npm commands (ie: npm install adds packages automatically)

## What does the fetch function do?
### It allows javascript code to make HTTP requests and specify them.

## What does node.js do?
### Runs javascript outside of the browser.

## What does pm2 do?
### It's Process Manager, so it helps run node.js in the background.

## What does Vite do?
### Transpiles JSX into Javascript and HTML/CSS. 













