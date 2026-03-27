javascript:(function(){
setTimeout(function(){

const old=document.getElementById('igtap-touch-wrap');
if(old) old.remove();

const oldStyle=document.getElementById('igtap-touch-style');
if(oldStyle) oldStyle.remove();

const style=document.createElement('style');
style.id='igtap-touch-style';
style.textContent=`
#igtap-touch-wrap{position:fixed;inset:0;z-index:999999;pointer-events:none}

.btn{
position:fixed;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-weight:700;
color:white;
background:rgba(255,255,255,0.18);
border:2px solid rgba(255,255,255,0.3);
pointer-events:auto;
user-select:none;
-webkit-user-select:none;
font-family:sans-serif;
touch-action:none;
box-sizing:border-box;
text-shadow:0 1px 2px rgba(0,0,0,0.6);
backdrop-filter:blur(2px);
}

.big{width:110px;height:110px;font-size:20px}
.mid{width:80px;height:80px;font-size:16px}
.small{width:55px;height:55px;font-size:14px}

#left{left:20px;bottom:30px}
#right{left:120px;bottom:30px}

#jump{right:20px;bottom:30px}
#dash{right:120px;bottom:95px}

#tab{right:25px;bottom:155px}
#esc{right:90px;bottom:190px}

.pressed{
background:rgba(255,255,255,0.4)!important;
transform:scale(0.96);
}
`;
document.head.appendChild(style);

const wrap=document.createElement('div');
wrap.id='igtap-touch-wrap';

function fire(type,key,code){
  const e=new KeyboardEvent(type,{key:key,code:code,bubbles:true});
  document.dispatchEvent(e);
  window.dispatchEvent(e);
  const canvas=document.querySelector('canvas');
  if(canvas) canvas.dispatchEvent(e);
}

function make(el,key,code){
  let held=false;

  const down=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    if(held)return;
    held=true;
    el.classList.add('pressed');
    fire('keydown',key,code);
  };

  const up=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    if(!held)return;
    held=false;
    el.classList.remove('pressed');
    fire('keyup',key,code);
  };

  el.addEventListener('touchstart',down,{passive:false});
  el.addEventListener('touchend',up,{passive:false});
  el.addEventListener('touchcancel',up,{passive:false});
  el.addEventListener('mousedown',down);
  el.addEventListener('mouseup',up);
  el.addEventListener('mouseleave',up);
}

function add(id,label,cls){
  const b=document.createElement('div');
  b.id=id;
  b.textContent=label;
  b.className='btn '+cls;
  wrap.appendChild(b);
  return b;
}

const left=add('left','◀','mid');
const right=add('right','▶','mid');
const jump=add('jump','JUMP','big');
const dash=add('dash','DASH','mid');
const tab=add('tab','TAB','small');
const esc=add('esc','ESC','small');

make(left,'a','KeyA');
make(right,'d','KeyD');
make(jump,' ','Space');
make(dash,'Shift','ShiftLeft');
make(tab,'Tab','Tab');
make(esc,'Escape','Escape');

document.body.appendChild(wrap);

},5000);
})();
