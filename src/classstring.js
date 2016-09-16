var hasOwn = {}.hasOwnProperty;

function classArray() {
  var classes = [];
  var i = -1;
  var arg;
  var argType;
  while (++i < arguments.length) {
    if (!arguments[i]) continue;
    arg = arguments[i];
    argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      var c = classArray.apply(null, arg);
      classes = classes.length ? classes.join(' ').split(' ') : classes;
      var j = -1;
      while (++j < c.length) {
        if (classes.indexOf(c[j]) === -1) {
          classes.push(c[j]);
        }
      }
    } else if (argType === 'object') {
      // var cl = classes.length ? ' '+classes.join(' ') : '';
      var l = classes.length;
      classes = l ? classes.join(' ').split(' ') : classes;
      for (var key in arg) {
        if (hasOwn.call(arg, key)) {
          var index = l ? classes.indexOf(key) : -1;
          if (arg[key]) {
            if (index < 0) {
              // cl += ' '+key;
              classes.push(key);
              ++l;
            }
          } else if (index > -1) {
            // cl.split(key).join('');
            classes.splice(index, 1);
          }
        }
      }
      // classes = cl.split(' ').slice(1);
    }
  }
  return classes;
}

function classString() {
  return classArray.apply(null, arguments).join(' ');
}

module.exports = classString;
