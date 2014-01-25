#TextY v0.1

Manage text size in javascript

@author Diono CORBEL

• http://www.diono.fr/

• http://www.dionofolio.com/

• http://www.dionoportfolio.com/

##Introduction

Texty is a tool to measure the length of a text pixel. Texty relies on a database gathering the size of each character in a font.

##How to use

Texty is attached to window. we call directly or through window:

```javascript
TextY();
```
or 

```javascript
window.TextY();
```

##What are the arguments it expects

The first argument is the DOM element and the second argument is the list of setup options

```javascript
TextY(DOM, options);
```

• __DOM__ is a _DOM element_

!! WARNING !!
```javascript
// TextY is written in pure JavaScript, it does not use any library like jQuery

TextY($('#my_element')); // Doesn't works

// instead use :

TextY($('#my_element')[0]); // access to the DOM element
```

• __OPTIONS__ is an _object_ that parameter :

```javascript
var options = {
    limit: true, //[Boolean/Number] enforce a size limit for text and adjust its size and its contents so that it does not exceed
    clear: true, //[Boolean] deletes the reference text container to the update before calculating its size
    min: 7 //[Number] defines the threshold beyond which the text can not be reduced
}
```


##What you can do

1. Retrieve the size of a text of a DOM element

```javascript
TextY(document.getElementById('my_element'));
// return the size
```

2. Forcing text to fit the width of the container

```javascript
TextY(document.getElementById('my_element'), {limit: true});
```

3. Force the text to fit a given width (here 300pixels)

```javascript
TextY(document.getElementById('my_element'), {limit: 300});
```

##Extras

TextY can calculate the size of the characters in a font

```javascript
TextY.addFont(font, override);
```

• __font__     _[String/Object]_ name of the new font or size chart of characters in the new font

• __override__ _[Boolean]_       overwrites a definition if it already exists

Once generated, TextY add the font in its database
