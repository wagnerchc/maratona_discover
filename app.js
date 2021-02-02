const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transaction = {
    all: [{
            description: 'Luz',
            amount: -50000,
            date: '29/01/2021',
        },
        {
            description: 'Criação website',
            amount: 500000,
            date: '29/01/2021',
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '29/01/2021',
        }
    ],
    add(transactions){
        transaction.all.push(transactions)
        App.reload()
    },

    remove(index) {
        transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0
        transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
            return income
    },

    expenses() {
        let expense = 0
        transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense
    },

    total() {
        return transaction.incomes() + transaction.expenses()
    }
}

const DOM = {
    
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction (transaction)
        // tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },
    updateBalance () {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(transaction.total())
    },
    clearTransaction () {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    date: document.querySelector('input#date'),
    amount: document.querySelector('input#amount'),    
    
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFields(){
        const { description, amount, date } = Form.getValues()
        if(
            description.trim() === "" ||
            amount.trim() === "" || 
            date.trim() === "" ) {
                throw new Error("Preencha todos os campos")
            }
    },
    formatData() {

    },
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            Form.formatData()
            // salvar dados
            // apagar dados
            // fechar modal
            // atualizar app
        } catch (error) {
            alert(error.message)
        }

    }
}

const App = {
    init() {

        transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()

    },
    reload() {

        DOM.clearTransaction()

        App.init()

    }
}

App.init()