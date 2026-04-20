/**
 * WebSpider Beta Hub - Client Side Logic
 */

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxuCZVk1LMOtPLP9w_dpcNa75CR-dYuChWCW526aZI9CWgVEcYBdMvpPX6s5fG2bV9_9A/exec';

function submitToHub(data) {
    const btn = document.querySelector('.btn-next');
    if (btn) btn.disabled = true;
    
    return fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        showHubSuccess();
    })
    .catch(err => {
        console.error('Hub Error:', err);
        if (btn) btn.disabled = false;
    });
}

function showHubSuccess() {
    const main = document.querySelector('main') || document.body;
    main.innerHTML = `
        <div style="text-align:center; padding: 50px; color: white; background: #202124; border-radius: 20px;">
            <h1 style="color:#34A853;">Registration Successful!</h1>
            <p>Welcome to WebSpider Studios. Check your email and WhatsApp for details.</p>
            <button onclick="location.reload()" style="background:#34A853; color:white; border:none; padding:10px 20px; border-radius:50px; cursor:pointer; margin-top:20px;">Back to Hub</button>
        </div>
    `;
}

// Form Handlers
document.addEventListener('DOMContentLoaded', () => {
    window.submitData = (data) => {
        submitToHub(data);
    };
});
