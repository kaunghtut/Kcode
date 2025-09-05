// script.js

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const balanceEl = document.getElementById('balance');

    let currentUserId = null;

    // Check user auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUserId = user.uid;
            authContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
            fetchTransactions(new Date()); // Fetch current month's data
        } else {
            currentUserId = null;
            authContainer.classList.remove('hidden');
            appContainer.classList.add('hidden');
        }
    });

    // Register
    registerBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Registered:', userCredential.user);
            })
            .catch(error => alert(error.message));
    });

    // Login
    loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Logged in:', userCredential.user);
            })
            .catch(error => alert(error.message));
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // Add transaction
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;

        if (!description || !amount || !date || !currentUserId) return;

        db.collection('transactions').add({
            userId: currentUserId,
            description,
            amount,
            type,
            date: new Date(date),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            transactionForm.reset();
            fetchTransactions(new Date(date));
        })
        .catch(error => console.error("Error adding document: ", error));
    });

    // Fetch and display transactions
    function fetchTransactions(date) {
        if (!currentUserId) return;

        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        db.collection('transactions')
            .where('userId', '==', currentUserId)
            .where('date', '>=', startOfMonth)
            .where('date', '<=', endOfMonth)
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                transactionList.innerHTML = '';
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.docs.forEach(doc => {
                    const transaction = doc.data();
                    const li = document.createElement('li');
                    li.classList.add(transaction.type);
                    
                    const transactionDate = transaction.date.toDate().toLocaleDateString('en-CA'); // YYYY-MM-DD
                    
                    li.innerHTML = `
                        <span>${transaction.description} (${transactionDate})</span>
                        <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
                    `;
                    transactionList.appendChild(li);

                    if (transaction.type === 'income') {
                        totalIncome += transaction.amount;
                    } else {
                        totalExpense += transaction.amount;
                    }
                });
                
                updateDashboard(totalIncome, totalExpense);
            });
    }

    // Update Dashboard UI
    function updateDashboard(income, expense) {
        const balance = income - expense;
        totalIncomeEl.textContent = `$${income.toFixed(2)}`;
        totalExpenseEl.textContent = `$${expense.toFixed(2)}`;
        balanceEl.textContent = `$${balance.toFixed(2)}`;
    }
});
