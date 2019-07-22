//Smooth Link
let headH = document.getElementsByTagName('nav').offsetHeight;
document.body.style.marginTop = headH + "px";

smoothLink(headH);

function smoothLink(headH = 0){
    const interval = 10;
    const divisor = 8;
    const range = (divisor / 2) + 1;
    const links = document.querySelectorAll('a[href^="#"]');

    for(let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e){
            e.preventDefault();
            let toY;
            let nowY = window.pageYOffset;
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            const targetRect = target.getBoundingClientRect();
            const targetY = targetRect.top + nowY - headH;
            (function doScroll(){
                let me = arguments.callee;
                toY - nowY + Math.round((targetY - nowY) / divisor);
                window.scrollTo(0, toY);
                nowY = toY;
                console.log(targetY + " / " + toY);
                if(document.body.clientHeight - window.innerHeight < toY){
                    window.scrollTo(0, document.body.clientHeight);
                    return;
                }
                if(toY >= targetY + range || toY <= targetY - range) {
                    window.setTimeout(doScroll, interval);
                } else {
                    window.scrollTo(0, targetY);
                }
            })();
        });
    }
};
