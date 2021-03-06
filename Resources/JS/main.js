//Variable Declarations and Function Definitions 

// Homepage Variables 
let heading_Pos = [0, 0], 
displayState = ""
hamburger_display_button = Array.from($('.mobile_nav_sticky'))[0]
opened_nav_buttons = document.querySelector('.options')
logo = $(".Actual_Logo_Svg")
viewBox = ""

// Morphing Circles and ellipses to paths to be able to morph them and checking the viewbox for device size
MorphSVGPlugin.convertToPath("ellipse");
shapes = Array.from($('.Logo_In_Shapes path'))

// About Page Variables 

//__________________________________________________________________________________________________

// Homepage Functions
const homeInit = () => {
    logo = $(".Actual_Logo_Svg")
    heading_Pos = [0, 0]
    displayState = ""
    viewBox = ""
    opened_nav_buttons = document.querySelector('.options')
    window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox', '-350 -700 1274 1680') : logo.attr('viewBox', '-680 -380 2074 1080')
    if(Array.from($('.mobile_nav_sticky'))[0])
        hamburger_display_button = Array.from($('.mobile_nav_sticky'))[0]
    // Morphing Circles and ellipses to paths to be able to morph them and checking the viewbox for device size
    MorphSVGPlugin.convertToPath("ellipse");
    shapes = Array.from($('.Logo_In_Shapes path'))
}

const logo_tl_func = () => {
    let logo_tl = gsap.timeline({
        onComplete: moveLogo,
    })
    // Morphing into the Logo
    logo_tl.from(shapes, 1, {
        y: -600,
        autoAlpha: 0,
        ease: "bounce",
        stagger: 0.15
    })
    logo_tl.to(shapes, 1, {
        fill: '#F0C368',
        stagger: 0.05
    })
    let firstAnimation = gsap.to('.shapes', {
        duration: 2,
        morphSVG: ".Logo_Proper_Background"
    });
    let secondAnimation = gsap.to('.textShape', {
        duration: 2,
        fill: '#1D373F',
        morphSVG: ".Logo_Proper_Text"
    });
    logo_tl.add([firstAnimation, secondAnimation])
}

const changeViewBox = media_query => {
    media_query.matches ? viewBox = "-150 -180 2495 890" : viewBox = "-150 -350 3574 880"
    media_query.matches ? heading_Pos = [-511, -15] : heading_Pos = [-1540, 40]
    media_query.matches ? displayState = "none" : displayState = "block"
}

const moveLogo = () => {
    console.log(logo, viewBox)
    gsap.to(logo, {
        attr: { viewBox: viewBox },
        duration: 3
    })
    fadeInHeadingAndLinks();
}

const fadeInHeadingAndLinks = () => {
    gsap.to('.nav_links', {
        display: displayState,
        scale: 1,
        duration: 3
    })
    gsap.to('.logo_heading', {
        display: "block",
        x: heading_Pos[0],
        y: heading_Pos[1],
        duration: 3
    })
    gsap.to('.mobile_nav_sticky', {
        display: "block",
        scale: 1,
        duration: 5
    }, "+=.7")
}

// About Page Functions 
const aboutInit = () => {
    console.log('We have lift off ')
    let horizontalscrollAnim,
    face = $('.my_face')
    cleanGSAP()
    if(typeof horizontalscrollAnim === "undefined") {
        scroll_facts_tl_func();
    }
    window.dispatchEvent(new Event('resize'));
    window.matchMedia("(max-width: 600px)").matches ? face.attr('viewBox', '-100 0 1408 1935') : face.attr('viewBox', '-1500 50 4208 2135')
}

const cleanGSAP = () => {
    const allClasses = [...document.querySelectorAll('[class]')]
    let gsapArray = []
    if(allClasses.length <= 134) return
    for (var i = 0; i < allClasses.length; i++) {
        if (/gsap-/.test(allClasses[i].className)) {
            gsapArray.push(allClasses[i].className);
        } else 
            break
    }
    gsapArray.map(tag => document.querySelector(`.${tag}`).remove())
}

const face_tl_func = () => {
    let face_tl = gsap.timeline(),
        paths = document.querySelectorAll('.My_Face path'),
        filledYellowElements = ['.Main_Hair_Part', '.Eyeball_2', '.Eyeball_1', '.Nostril_1', '.Nostril_2', '.Tongue_Part'],
        filledNavyElements = ['.Pupil_2', '.Pupil_1'];
        face_tl.set(filledNavyElements, { fill: 'unset' }),
        face_tl.set(filledYellowElements, { fill: 'unset' }),
        face_tl.fromTo(paths, { drawSVG: "0%" }, { duration: 1, drawSVG: "100% ", stagger: 0.15 })
    let firstAnimation = gsap.to(filledYellowElements, {
        duration: 2,
        ease: "slow",
        fill: '#F0C368'
    }, "-=.7"),
        secondAnimation = gsap.to(filledNavyElements, {
            duration: 2,
            ease: "bounce",
            fill: '#1D373F'
        }, "-=.7")
    face_tl.add([firstAnimation, secondAnimation])
}


const scroll_para_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.content',
            start: "top center",
            end: "+=600",
            scrub: true
        }
    })
    scroll_tl.to('.first', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: .5,
    }),
        scroll_tl.to('.flag', {
            scale: 1
        }, '-=.1'),
        scroll_tl.addLabel("first_down")
    scroll_tl.to('.second', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 2,
    }, "first_down-=.1")
    scroll_tl.addLabel("second_down")
    scroll_tl.to('.third', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 2,
    }, "second_down-=.01")
}


const scroll_skills_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.skillsContainer',
            start: "top center",
        }
    }),
        barWidth = "",
        bars = [...document.querySelectorAll('.bar')]
    bars.map(bar => {
        barWidth = bar.dataset.width;
        let barAnimation = gsap.to(bar, {
            width: barWidth,
            duration: 1,
            delay : .2,
        }),
        percentageAniamtion = gsap.to('.percentage', {
            scale: 1,
        })
        scroll_tl.add([barAnimation, percentageAniamtion]);
    })

}

const scroll_facts_tl_func = () => {
    const facts = [...document.querySelectorAll('.fact')],
    factsContainer = document.querySelector('.factsContainer');
    let xPercent
    window.matchMedia("(max-width: 600px)").matches ? xPercent = -85 : xPercent = -115
    horizontalscrollAnim = gsap.to(facts, {
        xPercent: xPercent * (facts.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".factsContainer",
            pin: true,
            pinSpacing: true,
            // markers: true,
            scrub: 1,
            snap: 1 / (facts.length - 1),
            start: "top top",
            // base vertical scrolling on how wide the container is so it feels more natural.
            end:  `+=${factsContainer.offsetWidth}` //4320
        }
    });
}

// Transition Functions 
const pageTransition = () => {
    var tl = gsap.timeline();
    tl.set('.loading_container img', {
        scale: 0.3
    })
    tl.to('.loading_container', {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "circ.out",
    })
    .to('.loading_container img', {
        scale: 0.6,
        duration: 1
    }, "-=1.2")

    .to('.loading_container', {
        duration: 1.2,
        width: "0%",
        right: "0%",
        ease: "circ.out",
    })
    .to('.loading_container img', {
        scale: 0.3,
        duration: 1.2
    }, "-=1.3")
}

// Helper Functions
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// aboutInit()

// Initialization Methods
// $(document).ready(() => {
//     // let viewbox = window.matchMedia("(max-width: 600px)")
//     // changeViewBox(viewbox)
// })

if(hamburger_display_button)
    hamburger_display_button.onclick = () => {
        opened_nav_buttons.classList.toggle('open')
    }

barba.init({
    sync: true,
    transitions: [{
        name: 'transition-base',
        async leave() {
            const done = this.async();
            pageTransition();
            await delay(1000);
            done();
        },
        async enter() {
            window.scrollTo(0, 0);
        },
    }],
    views: [
        {
            namespace: 'home',
            afterEnter() {
                homeInit()
                let viewbox = window.matchMedia("(max-width: 600px)")
                changeViewBox(viewbox)
                logo_tl_func()
                hamburger_display_button.onclick = () => {
                    opened_nav_buttons.classList.toggle('open')
                }
            },
        },
        {
            namespace: 'about',
            afterEnter() {
                aboutInit()
                face_tl_func()
                scroll_para_tl_func()
                scroll_skills_tl_func()
            }
        }
    ],
});




