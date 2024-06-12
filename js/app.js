document.addEventListener('DOMContentLoaded', () => {
    const routes = {
        '/': { page: 'index.html', script: 'script.js' },
        '/dashboard': { page: 'dashboard.html' },
        '/labtestBooking': { page: 'labtestBooking.html'},
        '/labtestBooking/packages': { page: 'profileDetails.html'},
        '/labtestBooking/tests': { page: 'singleTests.html'},
        '/labtestBooking/cart': { page: 'cart.html'},
        '/doctorsBooking': { page: 'doctorsBooking.html'},
        '/doctorsBooking/doctorWithSlot':{page:'doctor_profile_with_slots.html'},
        '/doctorsBooking/doctor': { page: 'demo.html' } // Add a route for demo.html
    };

    const contentDiv = document.getElementById('content');

    async function loadContent(url, scriptPath, queryParams, callback) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            contentDiv.innerHTML = html;
            if (scriptPath) {
                loadScript(scriptPath, callback);
            } else {
                const scriptTags = contentDiv.querySelectorAll('script');
                scriptTags.forEach(script => {
                    eval(script.innerHTML); // Execute internal JS
                });
                if (callback) callback();
            }
            if (queryParams) {
                loadDemoPage(url, queryParams);
            }
        } catch (error) {
            contentDiv.innerHTML = '<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>';
        }
    }

    function loadScript(scriptPath, callback) {
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = callback;
        document.body.appendChild(script);
    }

    function navigate(event) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        window.history.pushState({}, path, window.location.origin + path);
        updateContent();
    }

    function updateContent() {
        const path = window.location.pathname;
        if (routes[path]) {
            const { page, script } = routes[path];
            const queryParams = getQueryParams();
            loadContent(page, script, queryParams);
        } else {
            contentDiv.innerHTML = '<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>';
        }
        updateActiveLink(path);
    }

    function updateActiveLink(path) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === path);
        });
    }

    function getQueryParams() {
        const search = window.location.search.substring(1);
        const queryParams = {};
        search.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            queryParams[key] = decodeURIComponent(value);
        });
        return queryParams;
    }

    function loadDemoPage(url, queryParams) {
        const demoIframe = document.createElement('iframe');
        demoIframe.src = `${url}?${new URLSearchParams(queryParams)}`;
        contentDiv.appendChild(demoIframe);
    }

    window.onpopstate = updateContent;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', navigate);
    });

    updateContent();
});
