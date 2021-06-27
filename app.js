//Listen for submit

document.getElementById('loan-form').addEventListener('submit',
function(e){
    //Hide result

     document.getElementById('results').style.display = 'none'


     //Show the loader
     document.getElementById('loading').style.display = 'block';

     setTimeout(calculateResult, 2000);

     e.preventDefault();
});

//Calculate result

function calculateResult(){

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment = parseFloat(years.value) * 12;


    //Compute monthly payment

    const x= Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly  = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        //show results

        document.getElementById('results').style.display = 'block';
       
        //Hide loader

        document.getElementById('loading').style.display = 'none';
        
    } else {
        showError('Please check your numbers');
    }
   
}

function showError(error){

    //show results

    document.getElementById('results').style.display = 'none';
       
    //Hide loader

    document.getElementById('loading').style.display = 'none';

    //Create a div

    const errorDiv = document.createElement('div');

    //Get element

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    
    //Add a class

    errorDiv.className = 'alert alert-danger'

    //create textnode and append to div

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds

    setTimeout(clearError, 3000);
}

// clear error function

function clearError(){
    document.querySelector('.alert').remove();
}