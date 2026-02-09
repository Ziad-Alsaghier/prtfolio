function showPage(id, el) {
    $('section').removeClass('active-section');
    $('#' + id).addClass('active-section');
    $('.nav-link').removeClass('active');
    $(el).addClass('active');
    // Scroll to top on switch if on mobile
    if (window.innerWidth <= 1024) window.scrollTo(0, 0);
}

// Logic remains exactly the same as provided
function tryLogin() {
    if ($('#adm-user').val() === 'ziad@app.com' && $('#adm-pass').val() === 'Password@123') {
        Swal.fire({
            icon: 'success',
            title: 'Access Granted',
            text: 'Welcome back, Zeyad!',
            timer: 2000,
            showConfirmButton: false
        });
        $('#login-overlay').fadeOut();
        $('#admin-panel').fadeIn();
        initAdminCharts();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'Invalid Email or Password.'
        });
    }
}

function logout() {
    Swal.fire({
        title: 'Logout',
        text: "Are you sure you want to exit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4757',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#admin-panel').hide();
            $('#login-overlay').fadeIn();
        }
    });
}

function saveSub() {
    const mail = $('#sub-email').val();
    if (mail) {
        Swal.fire({
            icon: 'success',
            title: 'Subscribed!',
            text: 'New Subscriber Added: ' + mail,
            confirmButtonColor: '#00d2ff'
        });
        $('#sub-email').val('');
    } else {
        Swal.fire({
            icon: 'question',
            text: 'Please enter a valid email address.'
        });
    }
}

function rate() {
    Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Rating Submitted: 5/5 ⭐',
        confirmButtonColor: '#00d2ff'
    });
}

function addExp() {
    Swal.fire({
        icon: 'info',
        title: 'Updating...',
        text: 'Experience will be visible on next refresh.',
        timer: 2000
    });
}

// Charts
new Chart(document.getElementById('skillsRadar'), {
    type: 'radar',
    data: {
        labels: ['Cold Calling', 'Negotiation', 'Closing', 'Lead Gen', 'CRM'],
        datasets: [{ label: 'Expertise', data: [98, 95, 92, 94, 90], borderColor: '#00d2ff', backgroundColor: 'rgba(0, 210, 255, 0.2)' }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { display: false } } } }
});

function initAdminCharts() {
    new Chart(document.getElementById('subChart'), {
        type: 'line',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'Subscribers', data: [12, 45, 89, 142], borderColor: '#00d2ff', fill: true, backgroundColor: 'rgba(0, 210, 255, 0.1)' }] },
        options: { responsive: true, maintainAspectRatio: false }
    });

    new Chart(document.getElementById('salesFunnel'), {
        type: 'bar',
        data: { labels: ['Leads', 'Qualified', 'Meetings', 'Deals'], datasets: [{ label: 'Conversion', data: [1000, 450, 120, 45], backgroundColor: ['#00d2ff', '#7000ff', '#00d2ff', '#7000ff'] }] },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

(function () {
    // Private variables inside a closure for security
    const storageKey = 'zeyad_portfolio_ratings';

    window.hoverStars = function (n) {
        $('#star-container span').each((i, el) => {
            $(el).css('color', i < n ? '#ffd700' : '#444');
        });
    };

    window.resetStars = function () {
        $('#star-container span').css('color', '#444');
    };

    window.rate = function (val) {
        let data = JSON.parse(localStorage.getItem(storageKey)) || { ratings: [], total: 0, sum: 0 };

        // Add new rating
        data.ratings.push(val);
        data.total++;
        data.sum += val;

        localStorage.setItem(storageKey, JSON.stringify(data));
        updateDisplay();

        Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: `You rated this ${val} stars.`,
            confirmButtonColor: '#00d2ff'
        });
    };

    function updateDisplay() {
        const data = JSON.parse(localStorage.getItem(storageKey)) || { ratings: [], total: 0, sum: 0 };
        const avg = data.total > 0 ? (data.sum / data.total).toFixed(1) : 0;

        $('#avg-val').text(avg);
        $('#count-val').text(data.total);
    }

    // Initialize display on load
    $(document).ready(updateDisplay);
})();


// 1. Disable Right-Click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// 2. Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.onkeydown = function (e) {
    if (event.keyCode == 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Ctrl+Shift+I
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { // Ctrl+Shift+C
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { // Ctrl+Shift+J
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { // Ctrl+U (View Source)
        return false;
    }
};

// 3. DevTools Detection (Optional Loop)
// This makes it very difficult to use the console by triggering a debugger break
setInterval(function () {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
        // If the code paused here, it means DevTools is open.
        // You can redirect them or clear the console.
        console.clear();
    }
}, 500);
$(document).ready(function () {
    // --- 1. Custom Right-Click Menu Logic ---
    $(document).on("contextmenu", function (e) {
        e.preventDefault(); // Stop default menu

        let menu = $("#custom-menu");
        let winWidth = $(window).width();
        let winHeight = $(window).height();
        let posX = e.pageX;
        let posY = e.pageY;

        // Prevent menu from going off-screen
        if (posX + menu.width() > winWidth) posX -= menu.width();
        if (posY + menu.height() > winHeight) posY -= menu.height();

        menu.css({ top: posY, left: posX }).fadeIn(200);
    });

    // Close menu when clicking elsewhere
    $(document).on("click", function () {
        $("#custom-menu").fadeOut(100);
    });

    // --- 2. Dynamic Section Navigation ---
    window.showPage = function (id, el) {
        // Hide all sections, show target
        $('section').hide().removeClass('active-section');
        $('#' + id).fadeIn(600).addClass('active-section');

        // Update Nav Link styling
        $('.nav-link').removeClass('active');
        if (el) {
            $(el).addClass('active');
        } else {
            // Find link by text if called from context menu
            $(`.nav-link:contains('${id}')`).addClass('active');
        }

        // Auto-scroll to section top for better UX
        $('html, body').animate({
            scrollTop: $("main").offset().top - 20
        }, 500);
    };

    // --- 3. Dynamic Rating System ---
    const storageKey = 'zeyad_ratings';
    window.rate = function (val) {
        let data = JSON.parse(localStorage.getItem(storageKey)) || { total: 0, sum: 0 };
        data.total++;
        data.sum += val;
        localStorage.setItem(storageKey, JSON.stringify(data));

        const avg = (data.sum / data.total).toFixed(1);
        $('#avg-val').text(avg);
        $('#count-val').text(data.total);

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Average is now ${avg} stars`,
            background: '#05070a',
            color: '#fff'
        });
    };
});