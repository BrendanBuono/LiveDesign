(function(){

 function Editor(element,updateFunc){
  this.element = element;
  this.update = updateFunc;
  this.element.onkeyup = this.reload.bind(this);
 };

 Editor.prototype= {

  initialize: function(){
   this.element.contentEditable = true;
   this.element.spellcheck = false;

  },
  setText: function(text){
   this.element.innerText = text;
  },
  reload: function(){
   this.update(this.element.innerText);
   var caretPosition = window.getSelection().getRangeAt(0);
   hljs.highlightBlock(this.element);
   var temp = window.getSelection();
   if(temp.rangeCount > 0){
    temp.removeAllRanges();
   }
   temp.addRange(caretPosition);

  }
 };

 var appendStyles= function(styles) {
   var css = document.styleSheets[0];

   if (css.styleSheet) css.styleSheet.cssText = styles;
   else css.appendChild(document.createTextNode(styles));

 }


 var init = function(){

  var stylesheet = document.createElement('style');
  document.body.appendChild(stylesheet);

   var htmlEditor = new Editor(document.getElementById('html'), function(html){
       document.getElementById('content').innerHTML = html;
   });
   var cssEditor = new Editor(document.getElementById('css'),function(css){
    stylesheet.innerHTML = css;
   });

   htmlEditor.initialize();
   cssEditor.initialize();


 };

 window.onload = init;
})();
