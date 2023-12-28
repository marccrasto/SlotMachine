/*
 * 1. Deposit some money (how much money does the user have to play with).
 * 2. Determine number of lines to bet on.
 * 3. Collect a bet amount.
 * 4. Spin the slot machine.
 * 5. Check if the user won.
 * 6. Give the user their winnings (if they won) or take money from them (if they lost).
 * 7. Play again? or Quit? or Check if user has any money left in machine?
 * */

/*function deposit() { Writing a function like this.
    return 1
}*/

// Basically creating a function and giving it a name 'prompt'. We call the package with 'require(<<"packageName">>) and then add parentheses() to obtain the function definition.
// Note this does not return anything yet. We simply have created a function called prompt and obtained its definition from the package. Next we'll have to call the function to return user input.
const prompt = require("prompt-sync")();


// Define no. of rows and columns for slot machine.
const ROWS = 3;
const COLS = 3;

// Define the symbols and the number of a particular symbol in slot machine. Basically a dictionary.
// You don't need quotation marks for the keys in javascript, but you do need them for python.
const SYMBOLS_COUNT = {A: 2, B : 4, C : 6, D : 8};

// To get value of a key in the dictionary, do the following:
// SYMBOLS_COUNT["A"]

// Define the multiplier for each symbol. So for instance, if I get a line of A's, multiply the bet value by 5.
const SYMBOLS_VALUES = {A : 5, B : 4, C : 3, D : 2};


// Writing a function in the ES6 style, which is basically to write a variable and define it as a function, basically the same as the commented function above.
// Inside the deposit function, what we need to do is to ask the user to enter a certain amount. To get user input, we use the package we have installed. Shown above.
const deposit = () => {

    // Keep prompting user infinitely till they enter a valid amount.
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: "); // Basically displays a message and collects whatever user enters and stores it into constant variable.
    
        // We need to convert depositAmount into integer type because by default, prompt returns a string.
        // 'parseFloat' basically takes a string and returns a float value, if string is not a number, will return 'NaN'.
        const numberDepositAmount = parseFloat(depositAmount);

        // So we need to deal with situations where numberDepositAmount is NaN or <=0.
        //isNaN is a function that takes a value and checks to see if it is a number. console.log is similar to system.out.println in java.
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Deposit Amount, try again.\n");
        }
        else { // Return the amount and break the loop.
            return numberDepositAmount;
        }
    }
};

// Basically follows the same structure as the 'deposit' function.
const getNumberOfLines = () => {
    while (true) {
        const stringNumberOfLines = prompt("How many lines do you want to bet on?: ");
        const integerNumberOfLines = parseFloat(stringNumberOfLines);

        if (isNaN(integerNumberOfLines) || integerNumberOfLines <= 0 || integerNumberOfLines > 3) {
            console.log("Invalid Number of Lines, try again.\n");
        }
        else {
            return integerNumberOfLines;
        }
    }
};

// Parameters passed between brackets.
const getBet = (balance, numberOfLines) => {
    while (true) {
        stringBet = prompt("Enter how much you want to bet per line: ");
        numberBet = parseFloat(stringBet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/numberOfLines)) {
            console.log("Invalid Bet Amount, try again.\n");
        }
        else { 
            return numberBet;
        }
    }
};

// Define the function that will spin the slot machine.
const spin = () => {
    // Declaring an array as a const does not mean that you cannot change its values, an array is a reference or address data type. You can change what's in the array without changing the reference or address.
    const symbols = [];
    
    // Create a loop that will iterate through all the keys with their associated values in the SYMBOLS_COUNT dictionary. 
    // const [symbol, count] means that each entry in SYMBOLS_COUNT will be accessed as an array with first entry in array as the symbol and the second entry as the associated count.
    // To call the symbol or count, simply type 'symbol' or 'count', no need for the square brackets. 
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // Now we need to add our symbols into the array 'symbols' created at the start of the function. So if there are two A's in SYMBOLS_COUNT, then we need to add two A's into our array. Use a for loop.
        for (let i = 0; i < count; i++) {
            // 'push' is similar to append.
            symbols.push(symbol);
        }
    }

    // Declaring the reels which is really a nested array with 3 columns.
    const reels = [];
    
    // Now we need to iterate through each one of our reels. Use a for loop.
    for (let i = 0; i < COLS ; i++) {
        // Basically push number of COLS into 'reels'.
        reels.push([]);

        // So for each reel, we have symbols from the 'symbols' array created above. So what the line of code below does is it copies what's stored in the 'symbols' array and then stores those symbols in 'reelSymbols' array.
        const reelSymbols = [...symbols];
        // Now we need to pick each element stored in the rows of each reel. Use another for loop.
        for (let j = 0; j < ROWS; j++) {

            // Math.random() generates a value between zero and 1. So it's a float. Then we take that number and multiply by whatever length of the 'reelSymbols' is. Then that value is rounded-down with Math.floor.
            // This returns a random index which will be used to access the symbol from 'reelSymbols' array.
            const selectedSymbolIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[selectedSymbolIndex];

            // Basically for the element of a row in a column, we push a value into that slot.
            reels[i].push(selectedSymbol);

            // Once we added an element into 'reels', we need to remove that symbol from 'reelSymbols'. So that is what 'splice' does.
            // First parameter takes in the index position of beginning of removal, second parameter takes number of elements to remove from that position onwards.
            reelSymbols.splice(selectedSymbolIndex, 1);
        }
    }

    return reels;
};

// Create a function that corrects the array structure because our array structure is not correct.
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

// Create a function that will print out what the user spun.
const printRows = (rows) => {
    // This is iterating by element in 'rows' which is a nested array. So each element 'row' is technically an array.
    for (const row of rows) {
        let stringRow = "";

        // 'i' represents the index of the array row.
        for (const [i, symbol] of row.entries()) {
            stringRow += symbol;
            if (i != row.length - 1) {
                stringRow += " | ";            }
        }

        console.log(stringRow);
    }
};

// Create a function that will return the user's winnings. It will take in the outcome of the spin (rows), how much the user has bet per line, and the number of lines the user has bet on.
const getWinnings = (rows, bet, lines) => {
    // User begins with $0 as winnings.
    let winnings = 0;

    // Run a for loop that will iterate through the rows of the spin depending on the number of lines the user has bet on. So for instance, if the user has bet on one line, the for loop will iterate through the first row of the spin.
    for (let row = 0; row < lines; row++) {
        // Rows is basically a nested array. So when we iterate through the first row in rows, we are essentially iterating through the first array in the nested array.
        const symbols = rows[row];
        // Create a boolean variable and initialise it to true. The value of the boolean will change if atleast one of the symbols in the row (array) is different than the others.
        let allSame = true;

        // Iterate through the array of symbols.
        for (const symbol of symbols) {
            // Basically check if the second and third symbol in the array is the same as the first symbol. If not, 'allSame' boolean will change to false. Break from the for loop (No point iterating through the rest of the array).
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        // If the boolean 'allSame' has remained true throughout the iteration of the row (all symbols in the array were the same), give the user their winnings.
        if (allSame == true) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {


    // Calling the 'deposit' function.
    // 'let' variable allows change in depositAmount.
    let balance = deposit();
    console.log("You have deposited: " + balance + "\n");

    // Create a while loop to check if user wants to play again or no, or has run out of money.
    while (true) {
        console.log("You have a balance of $" + balance + "\n");
        // Calling the 'getNumberOfLines' function.
        const numberOfLines = getNumberOfLines();
        console.log("You have decided to bet on " + numberOfLines + " lines.\n")

        // Calling the 'getBet' function.
        const bet = getBet(balance, numberOfLines);
        console.log("You have decided to bet " + bet + "\n");
        // Subtract from the user's balance what they have decided to bet in total (bet per line * no. of lines).
        balance -= bet * numberOfLines;

        // Calling the 'spin', 'transpose', and 'printRows' function to get and display to the user the outcome of the spin.
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        // Calling the 'getWinnings' function to show what the user has won after the spin.
        const winnings = getWinnings(rows, bet, numberOfLines);
        console.log("You won $" + winnings + "!\n");

        // Add to the user's winnings after spin.
        balance += winnings;
        console.log("You have a new balance of $" + balance + "\n");

        // Check if the user has run out money. If the user still has money, then prompt the user to ask them if they want to play again.
        if (balance <= 0) {
            console.log("You ran out of money!\n");
            break;
        }
        else {
            const playAgain = prompt("Do you want to play again? (y/n): ");

            if (playAgain != 'y') {
                break;
            }
        }
    }
    
};

game();