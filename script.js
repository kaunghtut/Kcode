// =========================================================================
// === ဒီနေရာမှာ သင် Deploy လုပ်လို့ရလာတဲ့ Web App URL ကို ထည့်ပေးပါ ===
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz9jnt2DraDfI_lxnL4IWmOwBBF9nH54LTrkaVNadhGfRFtM5p3-UvQeISVQ_NUTuQN/exec';
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Logic for index.html (Data Entry Page) ---
    const workLogForm = document.getElementById('workLogForm');
    if (workLogForm) {
        // Set default date to today
        document.getElementById('workDate').valueAsDate = new Date();

        // Handle form submission
        workLogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = workLogForm.querySelector('button');
            const messageDiv = document.getElementById('formMessage');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Logging...';
            messageDiv.textContent = '';

            const data = {
                date: document.getElementById('workDate').value,
                startTime: document.getElementById('startTime').value,
                endTime: document.getElementById('endTime').value,
                notes: document.getElementById('notes').value
            };

            fetch(WEB_APP_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            })
            .then(response => response.json())
            .then(result => {
                if (result.result === 'success') {
                    messageDiv.textContent = 'Log submitted successfully!';
                    messageDiv.style.color = '#22c55e'; // Green
                    workLogForm.reset();
                    document.getElementById('workDate').valueAsDate = new Date();
                } else {
                    throw new Error(result.error);
                }
            })
            .catch(error => {
                messageDiv.textContent = 'Error: ' + error.message;
                messageDiv.style.color = '#ef4444'; // Red
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Log In';
            });
        });
    }

    // --- Logic for dashboard.html (Data Display Page) ---
    const logTableBody = document.getElementById('logTableBody');
    if (logTableBody) {
        const refreshBtn = document.getElementById('refreshBtn');
        
        const fetchData = () => {
            logTableBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

            fetch(`${WEB_APP_URL}?page=data`)
                .then(response => response.json())
                .then(data => {
                    logTableBody.innerHTML = ''; // Clear loading message
                    if (data.length === 0) {
                        logTableBody.innerHTML = '<tr><td colspan="5">No data available.</td></tr>';
                    } else {
                        data.reverse().forEach(row => {
                            const tr = document.createElement('tr');
                            // Use data-label for responsive table CSS
                            tr.innerHTML = `
                                <td data-label="Date">${row[1]}</td>
                                <td data-label="Start">${row[2]}</td>
                                <td data-label="End">${row[3]}</td>
                                <td data-label="Duration">${row[4]}</td>
                                <td data-label="Notes">${row[5]}</td>
                            `;
                            logTableBody.appendChild(tr);
                        });
                    }
                })
                .catch(error => {
                    logTableBody.innerHTML = `<tr><td colspan="5" style="color: #ef4444;">Error: ${error.message}</td></tr>`;
                });
        };

        // Fetch data when page loads
        fetchData();
        
        // Add event listener to refresh button
        refreshBtn.addEventListener('click', fetchData);
    }
});
