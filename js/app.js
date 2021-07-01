
document.addEventListener('mousemove', hunter);
document.addEventListener('scroll', scrollTriggers);
window.addEventListener('resize', throttle(reziseTrigger, 200));
let huntTarget;
let huntingZone = document.getElementsByClassName('catch_me')[0];
const topBar = document.getElementById('bar');
const blockC = document.getElementById('block_3');
let featureCards = document.getElementsByClassName('feat_holder');
let bCleftTitles = document.getElementsByClassName('b3_left_zones');
let bCselectedImage = bChoveredImage = document.getElementById('b3_img_1');
let allBcImages = document.getElementsByClassName('b3_imgs');
const imageWrapper = document.getElementsByClassName('b3_image_wrapper')[0];
let selectedTitleC = document.getElementById('zone_1'); //id of the selected zone title in block c
const pluses = document.getElementsByClassName('plus');
let targetBoundary;
let targetText;
let atracted = false;   //if cursor in circle then true
let bCimgId; //id of hovered image
let bCunhovered = true; //if cursor is on title then false 
let freshTitle = false; //if hovered title is new then true
let reset = false //if cursor is out more than 0.5s then true
let pageScroll = 0;
let pageHeight = document.documentElement.clientHeight;
let pageWidth = document.documentElement.clientWidth;
let overallHeigth = document.documentElement.scrollHeight;
let featCardBottom = featureCards[0].getBoundingClientRect().top;
let blockCbottom = blockC.getBoundingClientRect().bottom - 10;

function hunter(e){
    b3Hover(e);
    let cursorPosition = ['x','y']; //get the screen x and y of cursor
    let targetPosition = ['x','y']; //get the screen x and y offset of target position from the centr of it
    let TargetSize = ['x','y']; //width and height of the target
    let gravityOffset = ['x','y'];  //center of target set to 0 boundary left is -max-width / 2 the same for height
    let limit = 100;
    let distance; //distance from the center of circle and cursor 
    let normal = 300;
    let scaled = 350;
    if(e.target.classList.contains('catch_me')){
        huntingZone = e.target;
        huntTarget = e.target.firstElementChild;
        targetBoundary = huntTarget.firstElementChild; 
        targetText = targetBoundary.firstElementChild;
        atracted = true;
        huntingZone.style.width = scaled + 'px';
        huntingZone.style.height = scaled + 'px';
        TargetSize = [e.target.clientWidth, e.target.clientHeight]
        cursorPosition = [e.x, e.y];
        targetPosition = [e.target.offsetLeft  + (TargetSize[0] / 2), e.target.offsetTop  + (TargetSize[1] / 2)];
        gravityOffset = [(cursorPosition[0]-targetPosition[0]), (cursorPosition[1]-targetPosition[1])];
        distance = (Math.sqrt(Math.pow(gravityOffset[0],2)+Math.pow(gravityOffset[1],2)));
        let radian = Math.atan2(gravityOffset[1] ,gravityOffset[0]);    //v1
        let outX = ((TargetSize[0] / 2) - limit) * Math.cos(radian);
        let outY = ((TargetSize[0] / 2) - limit) * Math.sin(radian);   
        let inX = (distance/5) * Math.cos(radian);
        let inY = (distance/5) * Math.sin(radian);
        huntTarget.style.width = '240px';
        huntTarget.style.height = '240px';
        targetBoundary.style.width = '120%';
        targetBoundary.style.height = '120%';
        targetText.style.transform = `translate(${inX}px, ${inY}px) rotate(-20deg)`;
        if(distance > (TargetSize[0] / 2) - limit){atracted = false}else{atracted = true;}
        if(atracted){
            huntTarget.style.transition = 'transform 0s, width 1.2s, height 1.2s';
            huntTarget.style.transform = `translate(${gravityOffset[0]}px, ${gravityOffset[1]}px)`;
        } else {
            huntTarget.style.transform = `translate(${outX}px, ${outY}px)`;
        }
    } else if(huntTarget) {
        huntingZone.style.width = normal + 'px';
        huntingZone.style.height = normal + 'px';
        huntTarget.style.width = '195px';
        huntTarget.style.height = '195px';
        targetBoundary.style.width = '1200px';
        targetBoundary.style.height = '1200px';
        huntTarget.style.transition = 'transform 1s, width 0.5s, height 0.5s';
        huntTarget.style.transform = `translate(0px, 0px)`;
        targetText.style.transform = `translate(0, 0) rotate(-20deg)`;
    }
};
function b3Hover(event){
    let index;
    let setPlan;
    if(event.target.classList.contains('b3_left_zones')){
        bCimgId = bChoveredImage.id;
        index = (event.target.id).split('_')[1];
        bChoveredImage = document.getElementById('b3_img_' + index);
        if(bChoveredImage.id != bCimgId){freshTitle = true}
        if(freshTitle){   
            freshTitle = false;  
            plusCheck({delay: 0.2});   
           setPlan = setTimeout(function(){ 
                if(reset && !bChoveredImage.classList.contains('show_points')){
                    reset = false;
                    for(i of allBcImages){
                        if(i.classList.contains('show_points')){                   
                            imageWrapper.insertAdjacentElement('beforeend', i);            
                        }
                    } 
                    imageWrapper.insertAdjacentElement('beforeend', bChoveredImage);

                } else {
                    imageWrapper.insertAdjacentElement('beforeend', bChoveredImage);
                }
                for(i of allBcImages){
                    if(!i.classList.contains('show_points')){
                        i.classList.remove('b3_img_on');
                    }   
                        i.style.animation = 'unset';
                }
                    bChoveredImage.classList.add('b3_img_on');
                    bChoveredImage.style.animation = 'slide_in 1s ease-in-out 0s 1 forwards';
                bCunhovered = false;
                clearTimeout(setPlan); 
            },100)
            selectedTitleC.classList.add('faded');
        }  
        return;
    }
    
    if(!event.target.classList.contains('b3_left_box') && !bCunhovered){   
        selectedTitleC.classList.remove('faded');
        if(!bChoveredImage.classList.contains('show_points')){
        setPlan = setTimeout(function(){
            freshTitle = true;
            reset = true; //makes selected image second on hover
            clearTimeout(setPlan); 
            if(!bChoveredImage.classList.contains('show_points')){
                bChoveredImage.classList.remove('b3_img_on');
                }
        },500);  
            bCunhovered = true;
            if(!bChoveredImage.classList.contains('show_points')){
                bChoveredImage.style.animation = 'slide_out 1s ease-in-out 0s 1 forwards';
            }
            for(i of allBcImages){
                if(i.classList.contains('show_points')){                   
                     bChoveredImage.insertAdjacentElement('beforebegin', i);            
                }
            } 
        }   
    }
}
function scrollTriggers(e){
    pageScroll = e.target.scrollingElement.scrollTop;
    pageHeight = e.target.scrollingElement.clientHeight;
    featCardBottom = featureCards[0].getBoundingClientRect().top;
    blockCbottom = blockC.getBoundingClientRect().bottom - 10;
    if(pageScroll > 10){
        hunterPark({startOn: true});
        barPark({startOn: true});
    } else {
        hunterPark({startOff: true});
        barPark({startOff: true});
    }
    if(blockCbottom < pageHeight){
        hunterPark({endOff: true});
    } 
    cardIn();
    blockCtransition();
}
function reziseTrigger(e){
    pageHeight = e.target.document.documentElement.clientHeight;
    pageWidth = e.target.document.documentElement.clientWidth;
    featCardBottom = featureCards[0].getBoundingClientRect().top;
    blockCbottom = blockC.getBoundingClientRect().bottom - 10;
    cardIn();
    blockCtransition();
}
function hunterPark(how){
    if(how.startOn){
        huntingZone.style.marginBottom = '-100px';
            huntingZone.firstElementChild.firstElementChild.style.opacity = 1;   
    };
    if(how.startOff){
        huntingZone.style.marginBottom = '10px'; 
    };
    if(how.endOff){
        huntingZone.style.marginBottom = '-300px';
        huntingZone.firstElementChild.firstElementChild.style.opacity = 0;
    };
}
function barPark(how){
    if(how.startOn){
        topBar.style.top = '0px'; 
    }
    if(how.startOff){
        topBar.style.top = '-80px'; 
    }
}
function cardIn(){
    let delay = 0;
    let duration = 0.8;
    if(featCardBottom < pageHeight){
        for(let i=0; i<featureCards.length; i++){
            featureCards[i].style.animation = `fill ${duration}s ease-in-out ${delay}s 1 forwards`;
            delay += (duration / 8)
        }
    }
}
function blockCtransition(){
    let infoBlock = document.getElementById('b3_top_info')
    let leftBluePad = document.getElementById('b3_left_pad');
    if(pageWidth/pageHeight < 1.236){
        hunterPark({startOn: true});
        cardIn();
    };
    if(blockCbottom < pageHeight){
        plused = true;
        hunterPark({endOff: true});
        infoBlock.style.marginTop = `-100px`;
        imageWrapper.classList.add('demo');
        bCselectedImage.classList.add('b3_img_on');
        leftBluePad.classList.remove('left_out');
        plusCheck({delay: 2});
    } else {
        if(pageScroll > 200){
            hunterPark({startOn: true});
        }
        plusCheck({delay: 0, animation: 'plus_off'});
        infoBlock.style.marginTop = `0px`;
        imageWrapper.classList.remove('demo');
        leftBluePad.classList.add('left_out');
    } 
}
function b3Clicked(id){
    selectedTitleC = document.getElementById(id);
    for(i of bCleftTitles){  //remove selections from other titles
        i.classList.remove('b3_selected');
    }
    selectedTitleC.classList.add('b3_selected');  //makes selected title selected
    for(i of allBcImages){
        i.classList.remove('show_points');
        i.classList.remove('b3_img_on');
    }
    let index = id.split('_')[1];
    bCselectedImage = document.getElementById('b3_img_' + index);
    bCselectedImage.classList.add('show_points');
    bCselectedImage.classList.add('b3_img_on');
    plusCheck({delay: 0})
}
function plusCheck(timing){
    if(!timing.animation){timing.animation = 'plus_up'}
    if(!timing.direction){timing.direction = 'normal'}
    for(i of pluses){ 
        i.style.animation = 'unset';
        if(i.parentElement.classList.contains('show_points')){
            timing.delay += 0.1;
            i.style.animation = `${timing.animation} 0.5s ease-in-out ${timing.direction} ${timing.delay}s 1 forwards`;
            }
    }
}
function throttle(func, delay){
    let go = false;
        return function(a){
            if(!go){
                go = setTimeout(function(){
                        func(a);
                        go = false;
                    }, delay)
                }
            }      
};

cardIn();
blockCtransition();

