// Global App Data
const appState = {
  user: {},
  policy: { active: false, zone: '', premium: 0 },
  claims: [],
  setupComplete: false
};

// Premium Calculation Matrix
const ZONE_PREMIUMS = {
  zone1: { base: 15, coverageFee: 5, total: 20 },
  zone2: { base: 25, coverageFee: 5, total: 30 },
  zone3: { base: 45, coverageFee: 5, total: 50 }
};

// 1. REGISTRATION HANDLER
function previewPremium() {
  const zone = document.getElementById('workZone')?.value;
  const preview = document.getElementById('premiumPreview');
  const nextBtn = document.getElementById('nextBtn');
  
  if (zone && ZONE_PREMIUMS[zone] && preview && nextBtn) {
    const premium = ZONE_PREMIUMS[zone];
    document.getElementById('previewAmount').textContent = `₹${premium.total}`;
    preview.style.display = 'block';
    nextBtn.disabled = false;
  }
}

async function handleRegistration(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('userName').value,
    phone: document.getElementById('userPhone').value,
    zone: document.getElementById('workZone').value
  };

  // 🔗 SEND DATA TO BACKEND
  await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  // existing logic
  appState.user = userData;
  localStorage.setItem('smartcoverApp', JSON.stringify(appState));

  window.location.href = 'policy.html';
}

// 2. POLICY ACTIVATION
function activateCoverage() {
  const data = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  data.policy.active = true;
  localStorage.setItem('smartcoverApp', JSON.stringify(data));
  
  const statusEl = document.getElementById('policyStatus');
  const premiumEl = document.getElementById('policyPremiumAmount');
  
  if (statusEl) {
    statusEl.textContent = 'Active';
    statusEl.style.background = 'rgba(34,197,94,0.25)';
    statusEl.style.color = '#22c55e';
  }
  
  if (premiumEl) {
    premiumEl.textContent = `₹${data.policy.premium}/wk`;
  }
  
  setTimeout(() => window.location.href = 'premium.html', 1200);
}

// 3. PREMIUM CONFIRMATION → SAVE USER & DASHBOARD
function confirmPremium() {
  const data = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  data.setupComplete = true;
  
  // ✅ FINAL USER SAVE
  const finalUserData = {
    ...data.user,
    registrationDate: new Date().toLocaleDateString(),
    policyActive: data.policy.active,
    weeklyPremium: data.policy.premium,
    totalClaims: data.claims.length
  };
  
  localStorage.setItem('smartcoverUser', JSON.stringify(finalUserData));
  localStorage.setItem('smartcoverApp', JSON.stringify(data));
  
  alert(`✅ Setup Complete!\n\nWelcome ${finalUserData.name}!\nPolicy Active: ${finalUserData.policyActive ? '✅' : '❌'}\nWeekly Premium: ₹${finalUserData.weeklyPremium}`);
  
  // 🚀 GO TO DASHBOARD
  window.location.href = 'dashboard.html';
}

// 4. CLAIMS SYSTEM
function testClaim(eventType, payout) {
  const data = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  
  if (!data.policy?.active) {
    alert('❌ Please activate your policy first!');
    window.location.href = 'policy.html';
    return;
  }
  
  const claim = {
    id: `CLM${Date.now().toString().slice(-6)}`,
    type: eventType,
    payout: payout,
    date: new Date().toLocaleString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'PAID ✅'
  };
  
  data.claims.unshift(claim);
  localStorage.setItem('smartcoverApp', JSON.stringify(data));
  
  // UPDATE USER STATS
  const userData = JSON.parse(localStorage.getItem('smartcoverUser') || '{}');
  userData.totalClaims = data.claims.length;
  localStorage.setItem('smartcoverUser', JSON.stringify(userData));
  
  alert(`🎉 INSTANT PARAMETRIC PAYOUT!\n\n${eventType}\n₹${payout.toLocaleString()}\n\n→ Sent to UPI Wallet`);
  renderClaims();
}

// 5. DASHBOARD FUNCTIONS
function loadDashboard() {
  const userData = JSON.parse(localStorage.getElementById('smartcoverUser') || '{}');
  const appData = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  
  // Update Profile
  const profileEl = document.getElementById('userProfile');
  if (profileEl && userData.name) {
    profileEl.textContent = `Hi, ${userData.name.split(' ')[0]}! 👋`;
  }
  
  // Update Premium
  const premiumEl = document.getElementById('dashboardPremium');
  if (premiumEl && appData.policy?.premium) {
    premiumEl.textContent = `₹${appData.policy.premium}/wk`;
  }
  
  // Update Policy Status
  const statusEl = document.getElementById('policyStatusDash');
  if (statusEl && appData.policy?.active) {
    statusEl.textContent = 'Active ✅';
    statusEl.className = 'status-badge active';
  }
  
  // Update Claims Count
  const claimsCountEl = document.getElementById('claimsCount');
  if (claimsCountEl) {
    claimsCountEl.textContent = `${appData.claims?.length || 0} Claims`;
  }
  
  // Total Payouts
  const totalPayoutEl = document.getElementById('totalPayouts');
  if (totalPayoutEl && appData.claims) {
    const total = appData.claims.reduce((sum, claim) => sum + claim.payout, 0);
    totalPayoutEl.textContent = `₹${total.toLocaleString()}`;
  }
}

// Render Claims UI
function renderClaims() {
  const data = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  const container = document.getElementById('claimsContainer');
  const totalEl = document.getElementById('totalPaid');
  
  if (!container) return;
  
  if (data.claims?.length > 0) {
    const totalPayout = data.claims.reduce((sum, claim) => sum + claim.payout, 0);
    
    if (totalEl) totalEl.textContent = `₹${totalPayout.toLocaleString()}`;
    
    container.innerHTML = data.claims.slice(0, 5).map(claim => `
      <div class="claim-card" style="animation: slideIn 0.3s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
          <div style="flex: 1;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">${claim.type}</div>
            <div style="color: var(--text-gray); font-size: 13px;">${claim.id} • ${claim.date}</div>
          </div>
          <div style="font-size: 28px; font-weight: 700; color: #22c55e; white-space: nowrap;">
            ₹${claim.payout.toLocaleString()}
          </div>
        </div>
      </div>
    `).join('');
  } else {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 24px; color: var(--text-gray);">
        <div style="font-size: 64px; margin-bottom: 24px;">🎉</div>
        <h3 style="font-size: 24px; margin-bottom: 12px; color: var(--text-light);">Ready for Claims!</h3>
        <p style="font-size: 16px;">Your policy is active.<br>Test weather events above 👆</p>
      </div>
    `;
  }
}

// 6. UNIVERSAL PAGE LOAD HANDLER
document.addEventListener('DOMContentLoaded', function() {
  const data = JSON.parse(localStorage.getItem('smartcoverApp') || '{}');
  
  // Dashboard auto-load
  if (document.getElementById('userProfile') || window.location.pathname.includes('dashboard')) {
    loadDashboard();
  }
  
  // Policy page updates
  if (document.getElementById('policyStatus')) {
    const statusEl = document.getElementById('policyStatus');
    const premiumEl = document.getElementById('policyPremiumAmount');
    
    if (data.policy?.premium) {
      if (premiumEl) premiumEl.textContent = `₹${data.policy.premium}/wk`;
    }
    
    if (data.policy?.active) {
      statusEl.textContent = 'Active';
      statusEl.className = 'status-badge';
      statusEl.style.background = 'rgba(34,197,94,0.25)';
      statusEl.style.color = '#22c55e';
    }
  }
  
  // Premium page updates
  if (document.getElementById('zonePremium')) {
    const zoneData = ZONE_PREMIUMS[data.policy?.zone || 'zone1'];
    document.getElementById('zonePremium').textContent = `₹${zoneData.base}/wk`;
    document.getElementById('totalPremium').textContent = `₹${zoneData.total}/wk`;
  }
  
  // Claims page - auto render
  if (document.getElementById('claimsContainer')) {
    renderClaims();
  }
  
  // Auto-preview premium on register page
  if (document.getElementById('workZone')) {
    previewPremium();
  }
});

// 7. DASHBOARD NAVIGATION
function goToClaims() {
  window.location.href = 'claims.html';
}

function goToPolicy() {
  window.location.href = 'policy.html';
}

// 8. SMOOTH ANIMATIONS + BACK PROTECTION
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .form-input:focus { transform: translateY(-2px); }
  .btn-primary:active { transform: scale(0.98); }
  .claim-card { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  
  .status-badge.active {
    background: rgba(34,197,94,0.25) !important;
    color: #22c55e !important;
  }
`;
document.head.appendChild(style);

window.addEventListener('popstate', function() {
  if (window.location.pathname.includes('claims.html')) {
    window.location.href = 'dashboard.html';
  } else if (window.location.pathname.includes('premium.html')) {
    window.location.href = 'dashboard.html';
  }
});
