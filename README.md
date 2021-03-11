
# Install
**npm**
```bash
npm install jquery-characters-caculator
```
# Basic Setup
####
* Import jQuery
* Import js/jquery-characters-caculator.js
###
###
**HTML file**
```html
<form class="form1" action="">
    <h3>Limit true, whitespaces true</h3>
    <textarea id="textarea" rows="10" width="100%"></textarea>
    <span id='target' class="count"></span>
</form>
<form class="form2" action="">
    <h3>Limit true, whitespaces false</h3>

    <textarea id="textarea1" rows="10" width="100%"></textarea>
    <span id='target1' class="count"></span>
</form>
<form class="form2" action="">
    <h3>Limit fasle, whitespaces false</h3>

    <textarea id="textarea2" rows="10" width="100%"></textarea>
    <span id='target2' class="count"></span>
</form>
<form class="form2" action="">
    <h3>Limit fasle, whitespaces true</h3>

    <textarea id="textarea3" rows="10" width="100%"></textarea>
    <span id='target3' class="count"></span>
</form>
```
###
###
**Javascript file**
```js
 $(document).ready(function () {
     $('#textarea2').calculate('#target2');
    //defaultf is no limit and count spaces as character
   $('#textarea').calculate('#target',{limit: 500});
     //limit:  maximum number of characters 500
    var element1 = $('#textarea1');
    element1.calculate('#target1',{limit: 500,whitespaces: false});
     //whitespaces: false --> Not count spaces as character
    var element3 = $('#textarea3');
    element3.calculate('#target3',{whitespaces: true});
     //defaultf is no limit and count spaces as character

  });

```

# Features
A plugin to show the number while typing or paste.
<ul>
  <li>Count spaces as character or not</li>
  <li>Limit character</li>
 </ul>
