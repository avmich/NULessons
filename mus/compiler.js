var endTime = function (time, expr) {
    if(expr.tag==='note')return time+expr.dur;
    if(expr.tag==='seq')return endTime(endTime(time,expr.left),expr.right);
    if(expr.tag==='par')
        return Math.max(endTime(time,expr.left),endTime(time,expr.right));
};
var flatten = function (e,s) {
    if(e.tag==='note')return [{tag:'note',pitch:e.pitch,start:s,dur:e.dur}];
    if(e.tag==='seq'){
        var l=flatten(e.left,s),d=0;
        for(var i=0;i<l.length;++i)d=Math.max(d,l[i].start+l[i].dur);
        return l.concat(flatten(e.right,d));
    }
    if(e.tag==='par')return flatten(e.left,s).concat(flatten(e.right,s));
};
var compile = function (musexpr) {return flatten(musexpr,0);};
var playMUS = function(e) {return playNOTE(compile(e));};
var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
