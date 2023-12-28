# SlotMachine
This is my first of (hopefully) many Javascript projects. It is a terminal-based slot machine. It is based on the slot machine created by 'Tech with Tim' (link - https://www.youtube.com/watch?v=E3XxeE7NF30). This is more of a 'tutorial' kind of project as I haven't coded in javascript and this project serves as a starting point for my javascript coding journey.

How it works:
1) Input the amount you want to deposit (for ex. $100).
2) Select the number of lines you want to bet on between 1-3 lines (So for instance, if you decide to bet on one line, it will only check the first row of the spin).
3) Choose how much you are going to bet per line (If I've chosen to bet on 3 lines, then input $10 to bet per line, in essence I'm betting a total of $30).
4) Based on the results of the spin, you're winnings will be calculated. Winnings are calculated by looking at the bet per line and then multiplying that with the multiplier for that specific symbol obtained in the row. 
5) The user is then prompted with the question of whether they want to play again (unless the user has run out of money, in that case, the game ends).

The documentation in the .js file should explain how the code works and the logic behind said code.

How to run it:
1) Once you've downloaded the project/cloned the repository, navigate to folder on terminal, and then run command 'npm init'.
2) Then run command 'npm i prompt-sync'.
3) To compile, run command 'node SlotMachine.js'.

Have fun!
