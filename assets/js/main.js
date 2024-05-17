/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== BLOB =====*/
/* Blob image */
class BlobImage {
    constructor(el) {
        this.el = el
        this.img = el.querySelector('img')
        this.svg = document.querySelector('svg')

        this.totalPoints = 7 /* this will change the number of points and will have less curves*/


        this.mouse = {
            x: 0,
            y: 0
        }

        this.bindEvents()
        this.resizeHandler()
    }

    // Bind events
    bindEvents() {
        window.addEventListener('resize', this.resizeHandler.bind(this))
    }

    // Resize handler
    resizeHandler() {
        const bounding = this.el.getBoundingClientRect()

        this.x = bounding.left
        this.y = bounding.top

        this.width = this.el.offsetWidth
        this.height = this.el.offsetHeight

        this.halfWidth = this.width / 2
        this.halfHeight = this.height / 2

        this.createBlob()
    }

    // Create blob
    createBlob() {
        this.points = []

        this.angle = 360 / this.totalPoints
        this.angleRad = this.angle * (Math.PI / 160)

        this.svg.innerHTML = ''

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new BlobPoint(this.angle * i, this)

            this.points.push(point)
        }
    }

 // Tick
    tick(nowTime) {
        let p0 = this.points[this.points.length - 1]
        let p1 = this.points[0]

        // Start curve
        let d = 'M ' + ((p1.x + p0.x) / 2) + ' ' + ((p1.y + p0.y) / 2) + ' '

        // Draw curve
        this.points.forEach((p1, index) => {
            const p2 = this.points[index + 1] || this.points[0]

            d += 'Q ' + (p1.x) + ' ' + (p1.y) + ' ' + ((p1.x + p2.x) / 2) + ' ' + ((p1.y + p2.y) / 2) + ' '
        })

        // Move points
        this.points.forEach((p1, index) => {
            p1.move(nowTime)
        })

        this.el.style.clipPath = 'path(\'' + d + '\')'
    } 
}

/* Blob point */
class BlobPoint {
    constructor(angle, parent) {
        this.angle = angle
        this.angleRad = angle * (Math.PI / 180)

        this.parent = parent

        this.anchor = {
            x: Math.cos(this.angleRad) * this.parent.halfWidth + this.parent.halfWidth,
            y: Math.sin(this.angleRad) * this.parent.halfHeight + this.parent.halfHeight
        }

        this.position = {
            x: this.anchor.x,
            y: this.anchor.y
        }

        this.x = this.anchor.x
        this.y = this.anchor.y

        this.velocity = { x: 0, y: 0 }
        this.movement = { x: 0, y: 0 }

        this.wave = {
            strength: 30 - 60 * Math.random(),
            progress: 0
        }

        // this.circle = document.createElementNS('http://www.w3.org/2000/svg','circle')
        // this.circle.setAttributeNS(null, 'cx', this.x - 2)
        // this.circle.setAttributeNS(null, 'cy', this.y - 2)
        // this.circle.setAttributeNS(null, 'r', 4)
        // this.parent.svg.append(this.circle)

        this.move()
    }

    // Move
    move(time = 0) {
        this.wave.progress = Math.sin(time * 0.0004 + this.wave.strength)

        this.movement.x = Math.cos(this.angleRad) * (this.wave.progress * this.wave.strength)
        this.movement.y = Math.sin(this.angleRad) * (this.wave.progress * this.wave.strength)

        const distX = (mouse.x - this.parent.x) - this.x
        const distY = (mouse.y - this.parent.y) - this.y
        const dist = Math.max(Math.hypot(distX, distY), 1)

        const angle = Math.atan2(distY, distX)

        const move = (this.parent.width / dist) * (mouse.speed * 0.075)

        if (dist < this.parent.halfWidth * 0.75) {
            this.velocity.x += Math.cos(angle) * -move
            this.velocity.y += Math.sin(angle) * -move
        }

        this.velocity.x *= 0.9
        this.velocity.y *= 0.9

        this.velocity.x = Math.min(Math.max(this.velocity.x, -this.parent.halfWidth), this.parent.halfWidth)
        this.velocity.y = Math.min(Math.max(this.velocity.y, -this.parent.halfHeight), this.parent.halfHeight)

        this.position.x = this.anchor.x + this.velocity.x + this.movement.x
        this.position.y = this.anchor.y + this.velocity.y + this.movement.y

        this.position.x = Math.min(Math.max(this.position.x, -30), this.parent.width + 30)
        this.position.y = Math.min(Math.max(this.position.y, -30), this.parent.height + 30)

        this.x += (this.position.x - this.x) * 0.1
        this.y += (this.position.y - this.y) * 0.1

        // this.circle.setAttributeNS(null, 'cx', this.x - 2)
        // this.circle.setAttributeNS(null, 'cy', this.y - 2)
    }
}

/* Ticker */
function tick(nowTime) {
    blobs.forEach(blob => {
        blob.tick(nowTime)
    })

    requestAnimationFrame(tick)
}

   /* Mouse handler */
 function mouseHandler(e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
}
window.addEventListener('mousemove', this.mouseHandler)

/* Check mouse speed */
function mouseSpeed() {
    const distX = mouse.prevX - mouse.x
    const distY = mouse.prevY - mouse.y
    const dist = Math.hypot(distX, distY)

    mouse.speed += (dist - mouse.speed) * 0.5
    if (mouse.speed < 0.001) {
        mouse.speed = 0
    }

    mouse.prevX = mouse.x
    mouse.prevY = mouse.y

    setTimeout(mouseSpeed, 20)
}
/* Init */
const blobs = []
const mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speed: 0,
    isIn: false,
    dist: 0
}

function init() {
    mouseSpeed()

    document.querySelectorAll('.blob-image').forEach(image => {
        blobs.push(new BlobImage(image))
    })
}

/* Ready */
(() => {
    init()
    tick()
})()


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal ({
    origin: 'top',
    distance: '60px',
    duration: 500,
    delay: 1,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== SEND MAIL =====*/


/*===== BACK TO TOP =====*/
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}