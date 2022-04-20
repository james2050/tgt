import styles from './../sass/aos.scss';import throttle from 'lodash.throttle';import debounce from 'lodash.debounce';import observe from './libs/observer';import detect from './helpers/detector';import handleScroll from './helpers/handleScroll';import prepare from './helpers/prepare';import elements from './helpers/elements';let $aosElements=[];let initialized=false;let options={offset:120,delay:0,easing:'ease',duration:400,disable:false,once:false,startEvent:'DOMContentLoaded',throttleDelay:99,debounceDelay:50,disableMutationObserver:false,};const refresh=function refresh(initialize=false){if(initialize)initialized=true;if(initialized){$aosElements=prepare($aosElements,options);handleScroll($aosElements,options.once);return $aosElements;}};const refreshHard=function refreshHard(){$aosElements=elements();refresh();};const disable=function(){$aosElements.forEach(function(el,i){el.node.removeAttribute('data-aos');el.node.removeAttribute('data-aos-easing');el.node.removeAttribute('data-aos-duration');el.node.removeAttribute('data-aos-delay');});};const isDisabled=function(optionDisable){return optionDisable===true||(optionDisable==='mobile'&&detect.mobile())||(optionDisable==='phone'&&detect.phone())||(optionDisable==='tablet'&&detect.tablet())||(typeof optionDisable==='function'&&optionDisable()===true);};const init=function init(settings){options=Object.assign(options,settings);$aosElements=elements();const browserNotSupported=document.all&&!window.atob;if(isDisabled(options.disable)||browserNotSupported){return disable();}
document.querySelector('body').setAttribute('data-aos-easing',options.easing);document.querySelector('body').setAttribute('data-aos-duration',options.duration);document.querySelector('body').setAttribute('data-aos-delay',options.delay);if(options.startEvent==='DOMContentLoaded'&&['complete','interactive'].indexOf(document.readyState)>-1){refresh(true);}else if(options.startEvent==='load'){window.addEventListener(options.startEvent,function(){refresh(true);});}else{document.addEventListener(options.startEvent,function(){refresh(true);});}
window.addEventListener('resize',debounce(refresh,options.debounceDelay,true));window.addEventListener('orientationchange',debounce(refresh,options.debounceDelay,true));window.addEventListener('scroll',throttle(()=>{handleScroll($aosElements,options.once);},options.throttleDelay));if(!options.disableMutationObserver){observe('[data-aos]',refreshHard);}
return $aosElements;};module.exports={init,refresh,refreshHard};